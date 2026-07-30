import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './pages/Home'
import ParoniDownloader from './pages/ParoniDownloader'
import QrCustom from './pages/QrCustom'
import ParoniDeck from './pages/ParoniDeck'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/downloader" element={<ParoniDownloader />} />
        <Route path="/qr-custom" element={<QrCustom />} />
        <Route path="/paroni-deck" element={<ParoniDeck />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
