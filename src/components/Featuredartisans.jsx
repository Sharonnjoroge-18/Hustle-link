import { useState, useEffect } from 'react';
import './FeaturedArtisans.css';
import RegisterModal from './RegisterModal';

const CATEGORIES = ['All', 'Plumber', 'Electrician', 'Tailor', 'Barber', 'Hairstylist', 'Makeup Artist', 'Carpenter'];

const SKILL_ICONS = {
  Plumber:        { icon: '🔧', color: '#3b82f6' },
  Electrician:    { icon: '⚡', color: '#f59e0b' },
  Tailor:         { icon: '✂️', color: '#8b5cf6' },
  Barber:         { icon: '💈', color: '#ef4444' },
  Hairstylist:    { icon: '✨', color: '#ec4899' },
  'Makeup Artist':{ icon: '💄', color: '#f472b6' },
  Carpenter:      { icon: '🔨', color: '#b45309' },
};

const SKILL_DOT = {
  Plumber:        '#3b82f6',
  Electrician:    '#f59e0b',
  Tailor:         '#8b5cf6',
  Barber:         '#ef4444',
  Hairstylist:    '#ec4899',
  'Makeup Artist':'#f472b6',
  Carpenter:      '#b45309',
};

const MAX_CARDS = 12;

// ── Validation ────────────────────────────────────────────
function validateArtisan({ name, phone, location }) {
  if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ' -]{2,60}$/.test(name.trim())) {
    throw new Error('Name should be 2–60 characters and contain letters only.');
  }
  if (!/^\+?\d{7,15}$/.test(phone.replace(/[\s\-().]/g, ''))) {
    throw new Error('Enter a valid phone number. Digits only, + allowed at start (e.g. +447911123456 or 08012345678).');
  }
  if (!location.trim().includes(',') || location.trim().length < 5) {
    throw new Error('Enter location as "City, State" (e.g. Ikeja, Lagos).');
  }
}

// ── Seed data ─────────────────────────────────────────────
const SEED_ARTISANS = [
  { id: 1, name: 'Chukwuemeka Obi',  skill: 'Plumber',       location: 'Surulere, Lagos',    phone: '08012345678', rating: 4.8, reviews: 61,  jobs: 142 },
  { id: 2, name: 'Fatima Al-Hassan', skill: 'Electrician',   location: 'Kano, Kano State',   phone: '08023456789', rating: 4.9, reviews: 89,  jobs: 218 },
  { id: 3, name: 'Blessing Nwosu',   skill: 'Tailor',        location: 'Nnewi, Anambra',     phone: '08034567890', rating: 4.7, reviews: 42,  jobs: 95  },
  { id: 4, name: 'Emeka Danladi',    skill: 'Barber',        location: 'Wuse, Abuja',        phone: '08045678901', rating: 4.9, reviews: 120, jobs: 310 },
  { id: 5, name: 'Adaeze Okonkwo',   skill: 'Hairstylist',   location: 'GRA, Port Harcourt', phone: '08056789012', rating: 5.0, reviews: 74,  jobs: 187 },
  { id: 6, name: 'Zainab Umar',      skill: 'Makeup Artist', location: 'Kaduna, Kaduna',     phone: '08067890123', rating: 4.8, reviews: 55,  jobs: 130 },
  { id: 7, name: 'Taiwo Adeyemi',    skill: 'Electrician',   location: 'Ibadan, Oyo',        phone: '08078901234', rating: 4.8, reviews: 67,  jobs: 203 },
  { id: 8, name: 'Ngozi Eze',        skill: 'Tailor',        location: 'Enugu, Enugu',       phone: '08089012345', rating: 5.0, reviews: 98,  jobs: 274 },
  { id: 9, name: 'Babatunde Lawal',  skill: 'Carpenter',     location: 'Abeokuta, Ogun',     phone: '08090123456', rating: 4.6, reviews: 38,  jobs: 88  },
];

// ── Artisan Card ──────────────────────────────────────────
function ArtisanCard({ artisan }) {
  const meta = SKILL_ICONS[artisan.skill] || { icon: '👤', color: '#888' };
  const dot  = SKILL_DOT[artisan.skill]   || '#888';

  return (
    <div className="artisan-card">
      <div className="card-top">
        <div className="card-icon" style={{ backgroundColor: `${meta.color}18` }}>
          <span>{meta.icon}</span>
        </div>
        <div className="card-rating">
          <span className="star">★</span>
          <span className="rating-val">{artisan.rating?.toFixed(1)}</span>
          <span className="rating-count">({artisan.reviews ?? 0})</span>
        </div>
      </div>

      <h3 className="card-name">{artisan.name}</h3>

      <p className="card-skill">
        <span className="skill-dot" style={{ backgroundColor: dot }}></span>
        {artisan.skill}
      </p>

      <p className="card-meta"><span className="meta-icon">📍</span> {artisan.location}</p>
      <p className="card-meta"><span className="meta-icon">📞</span> {artisan.phone}</p>

      <div className="card-footer">
        <span className="jobs-count">{artisan.jobs ?? 0} jobs</span>
        <button className="rate-btn">★ Rate</button>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────
function FeaturedArtisans({ showRegister = false, onRegisterClose }) {
  const [artisans, setArtisans] = useState(SEED_ARTISANS);
  const [active, setActive]     = useState('All');
  const [localModal, setLocalModal] = useState(false);
  const [apiBase]               = useState(''); // set to your backend URL when ready

  // Combined: opens if either the Navbar prop or internal button triggers it
  const showModal = showRegister || localModal;

  function closeModal() {
    setLocalModal(false);
    onRegisterClose?.();
  }

  // Fetch from backend when apiBase is set
  useEffect(() => {
    if (!apiBase) return;
    fetch(`${apiBase}/api/artisans`)
      .then(r => r.json())
      .then(data => setArtisans(data))
      .catch(() => {});
  }, [apiBase]);

  async function handleRegister(form) {
    validateArtisan(form);

    const newArtisan = {
      ...form,
      id:      Date.now(),
      rating:  0,
      reviews: 0,
      jobs:    0,
    };

    // Prepend new artisan, drop oldest if over cap
    setArtisans(prev => [newArtisan, ...prev].slice(0, MAX_CARDS));

    // POST to backend when ready
    if (apiBase) {
      const res = await fetch(`${apiBase}/api/artisans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Server error — please try again.');
      const saved = await res.json();
      setArtisans(prev => prev.map(a => a.id === newArtisan.id ? saved : a));
    }
  }

  const visible = active === 'All'
    ? artisans
    : artisans.filter(a => a.skill === active);

  return (
    <section className="featured" id="artisans">
      {/* Header */}
      <div className="featured-header">
        <div>
          <span className="featured-eyebrow">ON THE PLATFORM</span>
          <h2 className="featured-heading">Featured artisans</h2>
        </div>
        <button className="register-btn" onClick={() => setLocalModal(true)}>
          ✦ Register as Artisan
        </button>
      </div>

      {/* Filter tabs */}
      <div className="filter-tabs">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`filter-tab ${active === cat ? 'active' : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="artisan-grid">
        {visible.length > 0
          ? visible.map(a => <ArtisanCard key={a.id} artisan={a} />)
          : <p className="empty-state">No artisans found in this category yet.</p>
        }
      </div>

      {/* Modal — from either button */}
      {showModal && (
        <RegisterModal
          onClose={closeModal}
          onRegister={handleRegister}
        />
      )}
    </section>
  );
}

export default FeaturedArtisans;
