import "./Navbar.css";
import { Phone } from "lucide-react";
import {useState} from 'react';

function Navbar() {
  const [activeLink, setActiveLink]=useState("");
  const handleLinkClick =(link) => {
    setActiveLink(link);
  };
  return (
    <nav className="navbar">
      <a href="#Hero" className="logo">
        <div className="logo-icon">
          <Phone size={14} />
        </div>

        <span>Hustle Link</span>
      </a>

      <ul className="nav-links">
        <li><a href="#hiw" className={activeLink === '#hiw' ? 'active' : ''} 
        onClick={() => handleLinkClick('#hiw')}
        >How It Works</a></li>
        <li><a href="#demo" className={activeLink === '#demo' ? 'active' : ''} 
        onClick={() => handleLinkClick('#Interactive')}
        >Demo</a></li>
        <li><a href="#" className={activeLink === '#Artisans' ? 'active' : ''} 
        onClick={() => handleLinkClick('#Artisans')}
        >Artisans</a></li>
        
        
      </ul>

      <button className="register-btn">
        ✨ Register as Artisan
      </button>
    </nav>
  );
}

export default Navbar;