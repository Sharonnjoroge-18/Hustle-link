import { useState } from 'react';
import './RegisterModal.css';

const SKILLS = ['Plumber', 'Electrician', 'Tailor', 'Barber', 'Hairstylist', 'Makeup Artist', 'Carpenter'];

const STEPS = [
  {
    key: 'name',
    label: "What's your name?",
    sub: "Enter your full name as you'd like customers to see it.",
    placeholder: 'e.g. Emeka Danladi',
    type: 'text',
  },
  {
    key: 'phone',
    label: 'Your phone number',
    sub: 'This is what customers will use to contact you.',
    placeholder: 'e.g. 08012345678',
    type: 'tel',
  },
  {
    key: 'skill',
    label: 'Your skill',
    sub: 'Select the trade you offer.',
    type: 'skill-picker',
  },
  {
    key: 'location',
    label: 'Your location',
    sub: 'Enter your city and state so customers nearby can find you.',
    placeholder: 'e.g. Ikeja, Lagos',
    type: 'text',
  },
];

function ProgressBar({ step, total }) {
  return (
    <div className="rm-progress">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`rm-progress-segment ${i <= step ? 'filled' : ''}`} />
      ))}
    </div>
  );
}

// ── Success screen ────────────────────────────────────────
function SuccessScreen({ form, onDone }) {
  return (
    <div className="rm-success">
      <button className="rm-close" onClick={onDone}>✕</button>

      <div className="rm-success-icon">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="22" stroke="#1a3d2b" strokeWidth="2.5" />
          <path d="M14 25l7 7 13-14" stroke="#1a3d2b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h2 className="rm-success-heading">You're listed!</h2>

      <p className="rm-success-body">
        <strong>{form.name}</strong> is now on Hustle Link as a{' '}
        <strong>{form.skill}</strong> in <strong>{form.location}</strong>.{' '}
        Customers can reach you at{' '}
        <span className="rm-success-phone">{form.phone}</span>.
      </p>

      <button className="rm-done-btn" onClick={onDone}>
        Done
      </button>
    </div>
  );
}

// ── Main modal ────────────────────────────────────────────
export default function RegisterModal({ onClose, onRegister }) {
  const [step, setStep]     = useState(0);
  const [form, setForm]     = useState({ name: '', phone: '', skill: '', location: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');
  const [success, setSuccess] = useState(false);

  const current = STEPS[step];
  const value   = form[current?.key] ?? '';
  const filled  = current?.type === 'skill-picker' ? !!form.skill : value.trim().length > 0;
  const isLast  = step === STEPS.length - 1;

  function setValue(val) {
    setForm(f => ({ ...f, [current.key]: val }));
    setError('');
  }

  async function handleContinue() {
    if (!filled) return;
    if (!isLast) {
      setStep(s => s + 1);
      return;
    }
    setLoading(true);
    setError('');
    try {
      await onRegister(form);
      setSuccess(true);      // show success screen instead of closing
    } catch (err) {
      setError(err.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && filled) handleContinue();
  }

  // Don't close on overlay click when on success screen
  function handleOverlayClick() {
    if (!success) onClose();
  }

  return (
    <div className="rm-overlay" onClick={handleOverlayClick}>
      <div className="rm-modal" onClick={e => e.stopPropagation()}>

        {success ? (
          <SuccessScreen form={form} onDone={onClose} />
        ) : (
          <>
            <ProgressBar step={step} total={STEPS.length} />
            <button className="rm-close" onClick={onClose}>✕</button>

            <p className="rm-eyebrow">REGISTER AS ARTISAN · STEP {step + 1} OF {STEPS.length}</p>
            <h2 className="rm-heading">{current.label}</h2>
            <p className="rm-sub">{current.sub}</p>

            {current.type === 'skill-picker' ? (
              <div className="rm-skill-grid">
                {SKILLS.map(s => (
                  <button
                    key={s}
                    className={`rm-skill-btn ${form.skill === s ? 'selected' : ''}`}
                    onClick={() => setValue(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            ) : (
              <input
                className="rm-input"
                type={current.type}
                placeholder={current.placeholder}
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={handleKey}
                autoFocus
              />
            )}

            {error && <p className="rm-error">{error}</p>}

            <button
              className={`rm-continue ${filled ? 'active' : ''}`}
              onClick={handleContinue}
              disabled={!filled || loading}
            >
              {loading ? 'Registering...' : isLast ? 'Register' : 'Continue'} ›
            </button>
          </>
        )}

      </div>
    </div>
  );
}
