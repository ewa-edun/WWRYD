import { Link, useNavigate } from "react-router-dom"
import './Home.css'

function Home() {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
      <div className="home-container">
        <nav className="home-nav">
          <div className="auth-buttons">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="auth-button">Logout</button>
            ) : (
              <>
                <Link to="/signin" className="auth-button">Sign Up</Link>
                <Link to="/login" className="auth-button">Login</Link>
              </>
            )}
          </div>
        </nav>

        <section className="intro-section">
          <h1>What Would Your Role Model Do?</h1>
          <p>
            WWYRD is an interactive decision-making assistant inspired by iconic role models. 
            Whether you are trying to solve a problem or need guidance, WWYRD channels the 
            wisdom and humor of your favorite role models to help you navigate life&apos;s challenges.
          </p>
          <p>
            Choose your role model below and get personalized, witty responses that reflect 
            their unique personalities and outlooks on life.
          </p>
        </section>

        <section className="cards-grid">
          <Link to="/tony-stark" className="card" style={{'--order': 1}}>
            <img src="/tony stark.jpg" alt="Tony Stark" />
            <div className="card-content">
              <h2>Tony Stark</h2>
              <p>Innovative genius, charismatic leader, and visionary inventor</p>
            </div>
          </Link>

          <Link to="/jensen-huang" className="card" style={{'--order': 2}}>
            <img src="/Jensen.jpg" alt="Jensen Huang" />
            <div className="card-content">
              <h2>Jensen Huang</h2>
              <p>Visionary tech leader and pioneer in AI & GPU computing</p>
            </div>
          </Link>

          <Link to="/manmohan-singh" className="card" style={{'--order': 3}}>
            <img src="/Manmohan.jpg" alt="Manmohan Singh" />
            <div className="card-content">
              <h2>Manmohan Singh</h2>
              <p>Economist and reformer who transformed India&apos;s economy</p>
            </div>
          </Link>

          <Link to="/hedy-lamarr" className="card" style={{'--order': 4}}>
            <img src="/Hedy.jpg" alt="Hedy Lamarr" />
            <div className="card-content">
              <h2>Hedy Lamarr</h2>
              <p>Inventor and actress who pioneered wireless communications</p>
            </div>
          </Link>

          <Link to="/marie-curie" className="card" style={{'--order': 5}}>
            <img src="/Curie.jpg" alt="Marie Curie" />
            <div className="card-content">
              <h2>Marie Curie</h2>
              <p>Pioneering physicist and chemist, double Nobel Prize winner</p>
            </div>
          </Link>

          <Link to="/princess-diana" className="card" style={{'--order': 6}}>
            <img src="/princess diana.jpg" alt="Princess Diana" />
            <div className="card-content">
              <h2>Princess Diana</h2>
              <p>Humanitarian icon known for compassion and advocacy</p>
            </div>
          </Link>
        </section>
      </div>
    )
}

export default Home
