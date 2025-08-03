// src/App.js
import React, { useEffect, useState } from "react";
import { Heart, Users, Code, Coffee, Star, Sparkles } from "lucide-react";
import "./App.css";

const Confetti = () => {
  const [particles, setParticles] = useState([]);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const colors = ["#ff6b6b", "#4ecdc4", "#ffeaa7", "#dda0dd"];
    const createParticle = (id) => ({
      id,
      x: Math.random() * window.innerWidth,
      y: -20,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 5,
      speedX: (Math.random() - 0.5) * 2,
      speedY: Math.random() * 1.5 + 1,
    });

    const initialParticles = Array.from({ length: 25 }, (_, i) =>
      createParticle(i)
    );
    setParticles(initialParticles);

    let idCounter = 25;
    const interval = setInterval(() => {
      setParticles((prev) => {
        const updated = prev
          .map((p) => ({
            ...p,
            x: p.x + p.speedX,
            y: p.y + p.speedY,
          }))
          .filter((p) => p.y < window.innerHeight);
        return [...updated, createParticle(idCounter++)];
      });
      // setParticles((prev) => {
      //   const updated = prev
      //     .map((p) => ({ ...p, x: p.x + p.speedX, y: p.y + p.speedY }))
      //     .filter((p) => p.y < window.innerHeight);
      //   return [...updated, createParticle(idCounter++)];
      // });
    }, 10);

    // setTimeout(() => clearInterval(interval), 50000);
    // return () => clearInterval(interval);

    const stopTimeout = setTimeout(() => {
      clearInterval(interval);
      setFadeOut(true);

      // Remove all particles after fade-out duration (5s)
      setTimeout(() => {
        setParticles([]);
      }, 5000);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(stopTimeout);
    };
  }, []);

  return (
    <div className="confetti">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`particle ${fadeOut ? "fade-out" : ""}`}
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            // borderRadius: '50%',
          }}
        />
      ))}
    </div>
  );
};

function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <div className="App">
      {showConfetti && <Confetti />}

      {showImageModal && (
        <div className="modal-overlay" onClick={() => setShowImageModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowImageModal(false)}
            >
              &times;
            </button>
            <img src={modalImageSrc} className="modal-image" />
          </div>
        </div>
      )}

      <header className="header">
        <h1 className="title">Farewell, Lokesh! 👋</h1>
        <p className="subtitle">
          A celebration of your incredible journey with our team
        </p>
        <div className="icon-group">
          <Sparkles size={24} color="#f5c518" />
          <Star size={24} color="#3b82f6" />
          <Sparkles size={24} color="#ec4899" />
        </div>
      </header>

      <main>
        <section className="section hero">
          <Heart size={48} color="#e11d48" className="pulse" />
          <h2 className="section-title">We Will Miss You ❤️</h2>
          <p className="message">
            Your dedication, creativity, and positive spirit have made our team
            stronger. While we're sad to see you go, we're excited for your new
            adventure. You'll always be part of our developer family!
          </p>
        </section>

        <section className="section photo-qr">
          <div className="photo-card">
            <h3>
              <Users size={20} /> Our Amazing Teammate
            </h3>
            <div className="photo-placeholder">
              {/* <Users size={48} color="#6366f1" />
              <p>Add your photo here</p> */}
              <img
                src="/Lokesh.png"
                alt="Team member"
                width={120}
                height={120}
              />
            </div>
            <div className="badge" onClick={() => {
  setModalImageSrc('/Lokesh.png');
  setShowImageModal(true);
}} title="Click to enlarge">
  <Code size={20} />
</div>
          </div>

          <div className="qr-card">
            <h3>Surprise! 📱</h3>
            <div className="qr-placeholder">
              <img
                className="qr-inner"
                src="/QR_Code.png"
                alt="QR Code"
                width={240}
                height={240}
              />
            </div>
            <p className="qr-text">Scan it, buddy!</p>
<div className="badge" onClick={() => {
  setModalImageSrc('/QR_Code.png');
  setShowImageModal(true);
}} title="Click to enlarge">
  <Code size={20} />
</div>
          </div>
        </section>

        <section className="section memories">
          <h3 className="section-title">What We'll Remember Most 🌟</h3>
          <div className="memory-grid">
            <div className="memory">
              <Code size={32} />
              <h4>Clean Code</h4>
              <p>Elegant solutions and attention to detail</p>
            </div>
            <div className="memory">
              <Users size={32} />
              <h4>Team Spirit</h4>
              <p>Always ready to help and collaborate</p>
            </div>
            <div className="memory">
              <Coffee size={32} />
              <h4>Great Vibes</h4>
              <p>Made every standup and review enjoyable</p>
            </div>
          </div>
        </section>

        <section className="section final-message">
          <h3>Thank You for Everything! 🙏</h3>
          <p>
            Your contributions left a lasting impact. We wish you success in
            your new role and hope our paths cross again soon!
          </p>
          <div className="emojis">🚀 ✨ 💫 🌟 ⭐ 🎉 🎊 🌈</div>
          <div className="farewell-box">
            <p>
              <strong>Stay in touch!</strong>
            </p>
            <p>You'll always be part of our team family</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Made with ❤️ by your amazing team</p>
        <p>© {new Date().getFullYear()} - A farewell tribute</p>
      </footer>
    </div>
  );
}

export default App;
