import './HowItWorks.css';

const steps = [
  {
    number: '01',
    title: 'Dial *384#',
    titleHighlight: '*384#',
    description: 'Open the USSD menu on any mobile phone — no internet, no app required.',
  },
  {
    number: '02',
    title: 'Select your need',
    titleHighlight: null,
    description: 'Find a skilled artisan nearby or register yourself to receive work.',
  },
  {
    number: '03',
    title: 'Connect instantly',
    titleHighlight: null,
    description: "Get the artisan's name, location, and phone number in seconds.",
  },
];

function HowItWorks() {
  return (
    <section className="hiw" id='hiw'>
      <div className="hiw-header">
        <span className="hiw-eyebrow">SIMPLE BY DESIGN</span>
        <h2 className="hiw-heading">Three steps, zero data required</h2>
      </div>

      <div className="hiw-cards">
        {steps.map((step) => (
          <div className="hiw-card" key={step.number}>
            <div className="hiw-card-top">
              <span className="hiw-badge">{step.number}</span>
              <span className="hiw-big-num">{step.number}</span>
            </div>
            <h3 className="hiw-card-title">{step.title}</h3>
            <p className="hiw-card-desc">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
