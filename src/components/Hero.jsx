import './Hero.css';
function Hero(){
    return(
        <section className="hero">
            <div className='hero-pattern'></div>
            <div className="hero-content">
                <div className="badge">
                    <span className="dot"></span>
                    LIVE ON MTN,AIRTEL & GLO NETWORKS
                </div>
                <h1>Every skilled hand <br/>
                    <span className="accent">deserves </span> 
                    to be found
                </h1>
                <p>
                    Hustle link connects rural artisans- plumber barbers,<br/>
                    carpenter,makeup artists and more -to customers <br/>
                    through a simple USSD menu.No internet.No smartphone.<br/>
                    Just <strong>*384#</strong>
                </p>
                <div className="hero-stats">
                    <div className="hero-stat">
                        <h2>12,400+</h2>
                        <span>Artisans Listed</span>
                    </div>
                    <div className="hero-stat">
                        <h2>7 Skills</h2>
                        <span>Trade Categories</span>
                    </div>
                    <div className="hero-stat">
                        <h2>NGN 5k/mo</h2>
                        <span>Unlimited Access</span>
                    </div>
                </div>
            </div>
        </section>

    );
}
export default Hero;