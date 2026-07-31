import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Trabalhos from './components/Trabalhos';
import ModalCurriculo from './components/ModalCurriculo';
import QRCodeImg from './assets/QRCODE.png';
import { LanguageProvider } from './contexts/LanguageContext';
import './Home.css';

function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const githubLink = import.meta.env.VITE_GITHUB_LINK || 'https://github.com/RafaelParoni';
  const instagramUser = import.meta.env.VITE_INSTAGRAM || 'rafaeparroni';
  const linkedin = import.meta.env.VITE_LINKEDIN || 'rafael-paroni-43961a301';
  const instagramLink = `https://instagram.com/${instagramUser}`;
  const email = import.meta.env.VITE_EMAIL || 'rafaelparonisilvaa@gmail.com';
  
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '5512982087099';
  const whatsappDisplay = whatsappNumber.replace(/^55/, '').replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        <Trabalhos />

        <section id="contato" style={{ padding: '80px 5% 100px' }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Entre em <span className="text-gradient">Contato</span>
          </h2>
          <p className="contact-subtitle" style={{ textAlign: 'center', maxWidth: '600px', margin: '-1.5rem auto 4rem', color: 'var(--text-muted)' }}>
            Se você gostou do meu trabalho ou tem uma oportunidade para discutirmos, sinta-se à vontade para me mandar uma mensagem em qualquer uma destas redes.
          </p>

          <div className="contact-grid">
            <a href={githubLink} target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-icon" style={{ color: '#ffffff' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.54 6.5-7.17A5.1 5.1 0 0 0 19 4.3a5.2 5.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a11.5 11.5 0 0 0-6 0C6.9 1.1 5.8 1.4 5.8 1.4a5.2 5.2 0 0 0-.1 3.2 5.1 5.1 0 0 0-1.5 3.5c0 5.61 3.33 6.78 6.47 7.15a4.8 4.8 0 0 0-1 2.87V22"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </div>
              <h3>GitHub</h3>
              <p>{githubLink.split('/').pop()}</p>
            </a>

            <a href={`https://www.linkedin.com/in/${linkedin}/`} target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-icon" style={{ color: '#2593d3ff' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </div>
              <h3>Linkedin</h3>
              <p>{linkedin}</p>
            </a>

            <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-icon" style={{ color: '#E1306C' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </div>
              <h3>Instagram</h3>
              <p>@{instagramUser}</p>
            </a>

            <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-icon" style={{ color: '#EA4335' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <h3>Email</h3>
              <p>{email}</p>
            </a>

            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-icon" style={{ color: '#25D366' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <h3>WhatsApp</h3>
              <p>{whatsappDisplay || '(12) 98208-7099'}</p>
            </a>
          </div>

          {/* QR Code Extra */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
            <div className="contact-card" style={{ flexDirection: 'row', gap: '2rem', padding: '1.5rem 2rem', alignItems: 'center', maxWidth: '500px', cursor: 'default' }}>
              <div style={{ background: '#fff', padding: '10px', borderRadius: '12px' }}>
                <img 
                  src={QRCodeImg} 
                  alt="WhatsApp QR Code" 
                  style={{ display: 'block', width: '120px', height: '120px' }}
                />
              </div>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>Escaneie-me</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>
                  Use a câmera do seu celular para ler o QR Code e iniciar uma conversa diretamente pelo WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ModalCurriculo
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </LanguageProvider>
  );
}

export default App;
