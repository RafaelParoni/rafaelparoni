import { useState, useEffect } from 'react';
import { ExternalLink, FileText, MessageCircle, Briefcase } from 'lucide-react';
import { Link } from 'react-scroll';
import { useLanguage } from '../contexts/LanguageContext';
import rafaelParoniImg from '../assets/rafaelparoni.png';

const GithubIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.54 6.5-7.17A5.1 5.1 0 0 0 19 4.3a5.2 5.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a11.5 11.5 0 0 0-6 0C6.9 1.1 5.8 1.4 5.8 1.4a5.2 5.2 0 0 0-.1 3.2 5.1 5.1 0 0 0-1.5 3.5c0 5.61 3.33 6.78 6.47 7.15a4.8 4.8 0 0 0-1 2.87V22" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Hero({ onOpenResume }) {
  const { t } = useLanguage();
  const roles = t('hero.roles');

  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [githubRepos, setGithubRepos] = useState(null);

  useEffect(() => {
    let timeout;
    const fullText = roles[roleIndex] || "Desenvolvedor";

    const handleType = () => {
      if (!isDeleting && currentText === fullText) {
        timeout = setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % (roles.length || 1));
        setTypingSpeed(150);
      } else {
        const nextText = isDeleting
          ? fullText.substring(0, currentText.length - 1)
          : fullText.substring(0, currentText.length + 1);

        setCurrentText(nextText);
        setTypingSpeed(isDeleting ? 50 : 150);
        timeout = setTimeout(handleType, typingSpeed);
      }
    };

    timeout = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, roleIndex, typingSpeed, roles]);

  useEffect(() => {
    const fetchGithub = async () => {
      try {
        const githubUser = import.meta.env.VITE_GITHUB_LINK?.split('/').pop() || 'RafaelParoni';
        const res = await fetch(`https://api.github.com/users/${githubUser}`);
        const data = await res.json();
        if (data.public_repos !== undefined) {
          setGithubRepos(data.public_repos);
        }
      } catch (error) {
        console.error('Erro ao buscar API do Github:', error);
      }
    };
    fetchGithub();
  }, []);

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '';
  const githubLink = import.meta.env.VITE_GITHUB_LINK || '#';
  const linkedin = import.meta.env.VITE_LINKEDIN || 'rafael-paroni-43961a301';

  const formatWhatsappLink = () => {
    return `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`;
  };
  const formatLinkedinLink = () => {
    return `https://www.linkedin.com/in/${linkedin}`;
  };

  return (
    <section id="sobre" className="hero">
      <div className="hero-wrapper">
        <div className="hero-content">
          <p className="greeting text-gradient">{t('hero.greeting')}</p>
          <h1 className="title">Rafael Paroni</h1>

          <h3 className="subtitle">
            {t('hero.rolePrefix')} <span className="typewriter-text text-gradient">{currentText}</span>
          </h3>

          <p className="description">
            {t('hero.description')}
          </p>

          <div className="btn-group" style={{ marginBottom: '1rem' }}>
            <button onClick={onOpenResume} className="btn btn-primary">
              <FileText size={20} />
              {t('hero.resumeBtn')}
            </button>


            <Link to="trabalhos" smooth={true} duration={500} offset={-70} className="btn btn-outline" style={{ cursor: 'pointer' }}>
              <Briefcase size={20} />
              {t('hero.worksBtn')}
            </Link>

            <a
              href={formatLinkedinLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <div className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </div>
              Linkedin
            </a>
          </div>

          <div className="btn-group">
            <a
              href={formatWhatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <MessageCircle size={20} />
              Whatsapp
            </a>



            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <GithubIcon size={20} />
              Github
              {githubRepos !== null && (
                <span style={{ fontSize: '0.85rem', marginLeft: '6px', opacity: 0.8 }}>
                  ({githubRepos} {t('hero.githubProjects')})
                </span>
              )}
            </a>
          </div>
        </div>

        <div className="hero-image-container">
          <img
            src={rafaelParoniImg}
            alt="Rafael Paroni"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
}
