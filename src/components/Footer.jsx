import "./Footer.css";
import { Phone, Users, MapPin, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: <Users />,
    value: "12,400+",
    label: "Registered artisans",
  },
  {
    icon: <MapPin />,
    value: "31 states",
    label: "Nationwide reach",
  },
  {
    icon: <TrendingUp />,
    value: "₦820M+",
    label: "Earnings facilitated",
  },
  {
    icon: <Phone />,
    value: "98.7%",
    label: "Network uptime",
  },
];

function Footer() {
  return (
    <>
      <section className="footer-stats">

        {stats.map((stat, index) => (
          <div className="stat" key={index}>
            <div className="stat-icon">
              {stat.icon}
            </div>

            <h2>{stat.value}</h2>

            <p>{stat.label}</p>
          </div>
        ))}

      </section>

      <footer className="footer">

        <a href="#hero" className="footer-logo">

          <div className="footer-logo-icon">
            <Phone size={14} />
          </div>

          <span>Hustle Link</span>

        </a>

        <p>
          Dial <strong>*384#</strong> · MTN, Airtel, Glo · © 2025
        </p>

      </footer>
    </>
  );
}

export default Footer;