import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './pages/Home'
import ParoniDownloader from './pages/ParoniDownloader'
import QrCustom from './pages/QrCustom'
import FocalFrame from './pages/FocalFrame'

import AudioSync from './pages/AudioSync'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/downloader" element={<ParoniDownloader />} />
        <Route path="/qr-custom" element={<QrCustom />} />
        <Route path="/focal-frame" element={<FocalFrame />} />
        <Route path="/audio-sync" element={<AudioSync />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
