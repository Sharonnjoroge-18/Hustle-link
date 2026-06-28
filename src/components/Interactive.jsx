import { useState } from 'react';
import './Interactive.css';

const features = [
  {
    title: '7 skill categories',
    desc: 'Plumbing, electrical, tailoring, barbering, hairstyling, makeup, and carpentry.',
  },
  {
    title: 'Artisan registration includes phone number',
    desc: 'Name, phone number, skill and location — so customers can call you directly.',
  },
  {
    title: 'Customer ratings',
    desc: 'After a job, customers can rate artisans 1–5 stars to build trust on the platform.',
  },
  {
    title: 'Works on any phone',
    desc: 'No internet needed. If it can make calls, it works with Hustle Link.',
  },
];

const USSD_FLOW = `*384#
├── 1. Find Artisan
│   ├── Enter name
│   ├── Enter location
│   └── Pick skill (1-7) → MATCH
└── 2. Register
    ├── Pick skill (1-7)
    ├── Enter full name
    ├── Enter location
    └── Enter phone → SAVED
└── 3. Subscribe → ACTIVE`;

const DIALPAD = [
  ['1','2','3'],
  ['4','5','6'],
  ['7','8','9'],
  ['*','0','#'],
];

function Phone() {
  const [input, setInput] = useState('');
  const [screen, setScreen] = useState('idle'); // idle | dialing | ussd

  function press(key) {
    setInput(prev => prev + key);
  }

  function handleCall() {
    if (input === '*384#') setScreen('ussd');
    else setScreen('dialing');
  }

  function handleEnd() {
    setInput('');
    setScreen('idle');
  }

  function handleBackspace() {
    setInput(prev => prev.slice(0, -1));
  }

  return (
    <div className="phone">
      <div className="phone-notch">
        <span className="phone-carrier">MTN NG</span>
        <span className="phone-battery">▮▮▮ 14:32</span>
      </div>

      <div className="phone-screen">
        {screen === 'ussd' ? (
          <div className="ussd-screen">
            <p className="ussd-label">Enter USSD code:</p>
            <p className="ussd-code">*384#</p>
          </div>
        ) : screen === 'dialing' ? (
          <div className="ussd-screen">
            <p className="ussd-label">Dialing...</p>
            <p className="ussd-code">{input}</p>
          </div>
        ) : (
          <div className="ussd-screen idle">
            <p className="ussd-label">Enter USSD code:</p>
            <p className="ussd-code">*384#</p>
          </div>
        )}
      </div>

      <div className="phone-input-display">{input || '*384#'}</div>

      <div className="dialpad">
        {DIALPAD.map(row =>
          row.map(key => (
            <button key={key} className="dial-key" onClick={() => press(key)}>
              {key}
            </button>
          ))
        )}
      </div>

      <div className="phone-actions">
        <button className="action-btn backspace" onClick={handleBackspace}>⌫</button>
        <button className="action-btn call" onClick={handleCall}>CALL</button>
        <button className="action-btn end" onClick={handleEnd}>END</button>
      </div>

      <p className="phone-brand">HUSTLE LINK v1.4</p>
    </div>
  );
}

function InteractiveDemo() {
  return (
    <section className="demo">
      <div className="demo-left">
        <span className="demo-eyebrow">INTERACTIVE DEMO</span>
        <h2 className="demo-heading">See it work, live</h2>
        <p className="demo-intro">
          Dial <strong>*384#</strong> and navigate the menus. The simulator runs the real Hustle Link
          logic — find artisans across 7 trades, or register with your name, phone
          number, skill, and location.
        </p>

        <ul className="demo-features">
          {features.map(f => (
            <li key={f.title} className="demo-feature">
              <span className="feature-icon">✓</span>
              <div>
                <strong>{f.title}</strong>
                <p>{f.desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="ussd-tree">
          <p className="tree-label">USSD FLOW TREE</p>
          <pre>{USSD_FLOW}</pre>
        </div>
      </div>

      <div className="demo-right">
        <Phone />

        <div className="try-card">
          <strong>Try it yourself</strong>
          <ol>
            <li>Type <code>*384#</code> → CALL</li>
            <li>Press <code>1</code> to find artisan</li>
            <li>Enter name, location, pick skill (1-7)</li>
            <li>Press <code>2</code> to register</li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default InteractiveDemo;
