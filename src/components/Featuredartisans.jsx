import { useState, useEffect } from 'react';
import './FeaturedArtisans.css';

const CATEGORIES = ['All', 'Plumber', 'Electrician', 'Tailor', 'Barber', 'Hairstylist', 'Makeup Artist', 'Carpenter'];

const SKILL_ICONS = {
  Plumber:       { icon: '🔧', color: '#3b82f6' },
  Electrician:   { icon: '⚡', color: '#f59e0b' },
  Tailor:        { icon: '✂️', color: '#8b5cf6' },
  Barber:        { icon: '💈', color: '#ef4444' },
  Hairstylist:   { icon: '✨', color: '#ec4899' },
  'Makeup Artist':{ icon: '💄', color: '#f472b6' },
  Carpenter:     { icon: '🔨', color: '#b45309' },
};

const SKILL_DOT = {
  Plumber:       '#3b82f6',
  Electrician:   '#f59e0b',
  Tailor:        '#8b5cf6',
  Barber:        '#ef4444',
  Hairstylist:   '#ec4899',
  'Makeup Artist':'#f472b6',
  Carpenter:     '#b45309',
};

// Seed data shown before any backend data loads
const SEED_ARTISANS = [
  { id: 1, name: 'Chukwuemeka Obi',  skill: 'Plumber',       location: 'Surulere, Lagos',     phone: '08012345678', rating: 4.8, reviews: 61,  jobs: 142 },
  { id: 2, name: 'Fatima Al-Hassan', skill: 'Electrician',   location: 'Kano, Kano State',    phone: '08023456789', rating: 4.9, reviews: 89,  jobs: 218 },
  { id: 3, name: 'Blessing Nwosu',   skill: 'Tailor',        location: 'Nnewi, Anambra',      phone: '08034567890', rating: 4.7, reviews: 42,  jobs: 95  },
  { id: 4, name: 'Emeka Danladi',    skill: 'Barber',        location: 'Wuse, Abuja',         phone: '08045678901', rating: 4.9, reviews: 120, jobs: 310 },
  { id: 5, name: 'Adaeze Okonkwo',   skill: 'Hairstylist',   location: 'GRA, Port Harcourt',  phone: '08056789012', rating: 5.0, reviews: 74,  jobs: 187 },
  { id: 6, name: 'Zainab Umar',      skill: 'Makeup Artist', location: 'Kaduna, Kaduna',      phone: '08067890123', rating: 4.8, reviews: 55,  jobs: 130 },
  { id: 7, name: 'Taiwo Adeyemi',    skill: 'Electrician',   location: 'Ibadan, Oyo',         phone: '08078901234', rating: 4.8, reviews: 67,  jobs: 203 },
  { id: 8, name: 'Ngozi Eze',        skill: 'Tailor',        location: 'Enugu, Enugu',        phone: '08089012345', rating: 5.0, reviews: 98,  jobs: 274 },
  { id: 9, name: 'Babatunde Lawal',  skill: 'Carpenter',     location: 'Abeokuta, Ogun',      phone: '08090123456', rating: 4.6, reviews: 38,  jobs: 88  },
];

// ── Register Modal ────────────────────────────────────────
function RegisterModal({ onClose, onRegister }) {
  const [form, setForm] = useState({ name: '', skill: 'Plumber', location: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handle(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function submit() {
    if (!form.name || !form.location || !form.phone) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await onRegister(form);
      onClose();
    } catch (err) {
      setError(err.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Register as Artisan</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <label>Full Name
            <input name="name" value={form.name} onChange={handle} placeholder="e.g. Chukwuemeka Obi" />
          </label>
          <label>Skill
            <select name="skill" value={form.skill} onChange={handle}>
              {CATEGORIES.filter(c => c !== 'All').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
          <label>Location
            <input name="location" value={form.location} onChange={handle} placeholder="e.g. Surulere, Lagos" />
          </label>
          <label>Phone Number
            <input name="phone" value={form.phone} onChange={handle} placeholder="e.g. 08012345678" />
          </label>
          {error && <p className="modal-error">{error}</p>}
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-submit" onClick={submit} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </div>
    </div>
  );
}

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

      <p className="card-meta">
        <span className="meta-icon">📍</span> {artisan.location}
      </p>
      <p className="card-meta">
        <span className="meta-icon">📞</span> {artisan.phone}
      </p>

      <div className="card-footer">
        <span className="jobs-count">{artisan.jobs ?? 0} jobs</span>
        <button className="rate-btn">★ Rate</button>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────
function FeaturedArtisans() {
  const [artisans, setArtisans]     = useState(SEED_ARTISANS);
  const [active, setActive]         = useState('All');
  const [showModal, setShowModal]   = useState(false);
  const [apiBase, setApiBase]       = useState('');   // set this once backend is live

  // Fetch from backend when apiBase is set
  useEffect(() => {
    if (!apiBase) return;
    fetch(`${apiBase}/api/artisans`)
      .then(r => r.json())
      .then(data => setArtisans(data))
      .catch(() => {/* keep seed data on failure */});
  }, [apiBase]);

  async function handleRegister(form) {
    const newArtisan = {
      ...form,
      id:      Date.now(),
      rating:  0,
      reviews: 0,
      jobs:    0,
    };

    // Optimistic UI update
    setArtisans(prev => [newArtisan, ...prev]);

    // POST to backend when ready
    if (apiBase) {
      const res = await fetch(`${apiBase}/api/artisans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Server error — please try again.');
      const saved = await res.json();
      // Replace optimistic entry with server response
      setArtisans(prev => prev.map(a => a.id === newArtisan.id ? saved : a));
    }
  }

  const visible = active === 'All'
    ? artisans
    : artisans.filter(a => a.skill === active);

  return (
    <section className="featured">
      {/* Header row */}
      <div className="featured-header">
        <div>
          <span className="featured-eyebrow">ON THE PLATFORM</span>
          <h2 className="featured-heading">Featured artisans</h2>
        </div>
        <button className="register-btn" onClick={() => setShowModal(true)}>
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

      {/* Modal */}
      {showModal && (
        <RegisterModal
          onClose={() => setShowModal(false)}
          onRegister={handleRegister}
        />
      )}
    </section>
  );
}

export default FeaturedArtisans;
