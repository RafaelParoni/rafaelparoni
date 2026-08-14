import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUpload, FaCamera, FaDownload, FaTimes,
  FaGithub, FaInstagram, FaSpinner, FaInfoCircle,
  FaPlay, FaPause, FaVolumeUp, FaVolumeMute
} from 'react-icons/fa';

import { Moon, Sun } from 'lucide-react';

import './FocalFrame.css';
import translations from './data/translations.json';

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

export default function FocalFrame() {
  const [videoSrc, setVideoSrc] = useState(null);
  const [capturedFrames, setCapturedFrames] = useState([]);
  const [videoName, setVideoName] = useState('');

  // Timeline and Player states
  const [thumbnails, setThumbnails] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // 0.0 to 1.0
  const [isMuted, setIsMuted] = useState(false);

  // Theme and Language
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'pt');
  const t = translations[lang] || translations['pt'];

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const githubLink = import.meta.env.VITE_GITHUB_LINK || '#';
  const instagramUser = import.meta.env.VITE_INSTAGRAM || '';
  const instagramLink = instagramUser ? `https://instagram.com/${instagramUser}` : '#';

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setVideoName(file.name);
      setCapturedFrames([]);
      setThumbnails([]);
      setCurrentTime(0);
      setIsPlaying(false);
      generateThumbnails(url);
    }
  };

  const generateThumbnails = (url) => {
    setIsGenerating(true);
    const video = document.createElement('video');
    video.src = url;
    video.crossOrigin = 'anonymous';
    video.muted = true;

    video.addEventListener('loadedmetadata', async () => {
      const vidDuration = video.duration;
      setDuration(vidDuration);

      const thumbCount = 10;
      const interval = vidDuration / thumbCount;
      const generated = [];
      const tempCanvas = document.createElement('canvas');
      const ctx = tempCanvas.getContext('2d', { willReadFrequently: true });

      const captureFrameAt = (time) => {
        return new Promise((resolve) => {
          const onSeeked = () => {
            video.removeEventListener('seeked', onSeeked);
            tempCanvas.width = video.videoWidth;
            tempCanvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);
            resolve(tempCanvas.toDataURL('image/jpeg', 0.5));
          };
          video.addEventListener('seeked', onSeeked);
          video.currentTime = time;
        });
      };

      video.addEventListener('loadeddata', async () => {
        for (let i = 0; i < thumbCount; i++) {
          const time = i * interval;
          const dataUrl = await captureFrameAt(time);
          generated.push(dataUrl);
        }
        setThumbnails(generated);
        setIsGenerating(false);
      }, { once: true });
    });
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0) setIsMuted(false);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);

      if (newMutedState) {
        setVolume(0);
      } else {
        setVolume(1);
        videoRef.current.volume = 1;
      }
    }
  };

  const skipTime = (amount) => {
    if (videoRef.current) {
      let newTime = videoRef.current.currentTime + amount;
      if (newTime < 0) newTime = 0;
      if (newTime > duration) newTime = duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);

      setCapturedFrames(prev => [...prev, {
        id: Date.now(),
        url: dataUrl,
        rawTime: video.currentTime.toFixed(2),
        displayTime: formatTime(video.currentTime)
      }]);
    }
  };

  const handleDownload = (imageUrl, time) => {
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `frame-${time}s.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleRemoveFrame = (idToRemove) => {
    setCapturedFrames(prev => prev.filter(frame => frame.id !== idToRemove));
  };

  const handleReset = () => {
    if (videoSrc) {
      URL.revokeObjectURL(videoSrc);
    }
    setVideoSrc(null);
    setCapturedFrames([]);
    setThumbnails([]);
    setVideoName('');
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  const handleScrubberChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  useEffect(() => {
    return () => {
      if (videoSrc) {
        URL.revokeObjectURL(videoSrc);
      }
    };
  }, [videoSrc]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLangChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Focal Frame";
    return () => {
      document.title = originalTitle;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!videoSrc) return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const key = e.key.toLowerCase();
      if (key === 'k') {
        e.preventDefault();
        togglePlay();
      } else if (key === 'm') {
        e.preventDefault();
        toggleMute();
      } else if (key === 'p') {
        e.preventDefault();
        handleCapture();
      } else if ((e.ctrlKey && key === 'd') || key === 'arrowright') {
        e.preventDefault();
        skipTime(1);
      } else if ((e.ctrlKey && key === 'a') || key === 'arrowleft') {
        e.preventDefault();
        skipTime(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });


  const navLinks = [

  ];

  return (
    <div className="ic-page">
      <>
        <div className="mobile-brand">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, letterSpacing: '-0.5px' }}>
            Focal Frame
          </h2>
        </div>

        <nav className="navbar">
          <div className="nav-brand">

            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, letterSpacing: '-0.5px' }}>
              Focal Frame
            </h2>
            <a className="navbar-subtitle" href='https://github.com/rafaelparoni' target='_blank' rel='noopener noreferrer' >By: Rafael Paroni</a>
            <a href={`https://www.instagram.com/${import.meta.env.VITE_INSTAGRAM}`} target="_blank" rel="noopener noreferrer" className="deck-icon-btn" aria-label="Instagram">
              <FaInstagram size={24} />
            </a>
            <a href={import.meta.env.VITE_FOCALFRAME_GITHUB} target="_blank" rel="noopener noreferrer" className="deck-icon-btn" aria-label="Github">
              <FaGithub size={24} />
            </a>
          </div>

          <div className="nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth={true}
                duration={500}
                offset={-70}
                className="nav-link"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="nav-controls">
            <select
              className="lang-select"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              <option value="pt">PT</option>
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>

            <button onClick={toggleTheme} className="icon-button" aria-label="Toggle Theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </nav>
      </>

      <div className="ic-content">
        {!videoSrc ? (
          <div className="ic-welcome-container">
            <div className="ic-welcome-text">
              <h2>{t.welcomeHeadline}</h2>
              <p dangerouslySetInnerHTML={{ __html: t.welcomeDesc }}></p>
            </div>

            <div className="ic-upload-box">
              <input
                type="file"
                id="video-upload"
                accept="video/*"
                onChange={handleFileChange}
                className="ic-hidden-input"
              />
              <label htmlFor="video-upload" className="ic-upload-label">
                <FaUpload size={48} className="ic-upload-icon" />
                <h3>{t.selectVideo}</h3>
                <p>{t.dragDrop}</p>
              </label>
            </div>
          </div>
        ) : (
          <div className="ic-workspace">
            <div className="ic-controls-top">
              <span className="ic-filename">{videoName}</span>
              <div className="ic-top-actions">
                <div className="ic-info-tooltip-container">
                  <FaInfoCircle size={20} className="ic-info-icon" />
                  <div className="ic-info-tooltip">
                    <p><strong>{t.shortcutsTitle}</strong></p>
                    <p><code>K</code> {t.shortcutPlay}</p>
                    <p><code>M</code> {t.shortcutMute}</p>
                    <p><code>P</code> {t.shortcutCapture}</p>
                    <p><code>➔</code> / <code>Ctrl+D</code> {t.shortcutForward}</p>
                    <p><code>⬅</code> / <code>Ctrl+A</code> {t.shortcutBackward}</p>
                  </div>
                </div>
                <button className="ic-btn ic-btn-danger" onClick={handleReset}>
                  <FaTimes size={18} /> {t.changeVideo}
                </button>
              </div>
            </div>

            <div className="ic-video-section">
              <div className="ic-video-player-container" onClick={togglePlay}>
                <video
                  ref={videoRef}
                  src={videoSrc}
                  className="ic-video-player-compact"
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={handleVideoEnded}
                  onClick={(e) => e.stopPropagation()} // Prevent double trigger if clicking directly
                />
              </div>

              {/* Custom Controls & Timeline Editor */}
              <div className="ic-editor-panel">

                {/* Timeline Visualizer */}
                <div className="ic-timeline-container">
                  {isGenerating ? (
                    <div className="ic-timeline-loading">
                      <FaSpinner className="ic-spinner" />
                      <span>{t.generatingTimeline}</span>
                    </div>
                  ) : (
                    <>
                      <div className="ic-timeline-thumbs">
                        {thumbnails.map((thumb, i) => (
                          <div key={i} className="ic-thumb-item" style={{ backgroundImage: `url(${thumb})` }}></div>
                        ))}
                      </div>
                      <input
                        type="range"
                        className="ic-timeline-scrubber"
                        min="0"
                        max={duration || 100}
                        step="0.01"
                        value={currentTime}
                        onChange={handleScrubberChange}
                      />
                    </>
                  )}
                </div>

                {/* Playback Controls Row */}
                <div className="ic-playback-controls">
                  <div className="ic-play-group">
                    <button className="ic-control-btn" onClick={togglePlay}>
                      {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                    </button>
                    <span className="ic-time-display">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="ic-action-group">
                    <button className="ic-btn ic-btn-primary" onClick={handleCapture}>
                      <FaCamera size={18} /> {t.capture}
                    </button>
                  </div>

                  <div className="ic-volume-group">
                    <button className="ic-control-btn" onClick={toggleMute}>
                      {isMuted || volume === 0 ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
                    </button>
                    <input
                      type="range"
                      className="ic-volume-slider"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={handleVolumeChange}
                    />
                  </div>
                </div>

              </div>
            </div>

            {capturedFrames.length > 0 && (
              <div className="ic-gallery-section">
                <h3>{t.capturedFrames} ({capturedFrames.length})</h3>
                <div className="ic-frames-grid">
                  {capturedFrames.map((frame) => (
                    <div key={frame.id} className="ic-frame-card">
                      <div className="ic-frame-image-wrapper">
                        <img src={frame.url} alt={`Frame at ${frame.displayTime}`} />
                        <span className="ic-frame-time">{frame.displayTime}</span>
                        <button className="ic-frame-delete" onClick={() => handleRemoveFrame(frame.id)} title={t.remove}>
                          <FaTimes size={16} />
                        </button>
                      </div>
                      <button
                        className="ic-btn ic-btn-success ic-download-btn-small"
                        onClick={() => handleDownload(frame.url, frame.rawTime)}
                      >
                        <FaDownload size={16} /> {t.download}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>
        )}
      </div>
    </div>
  );
}
