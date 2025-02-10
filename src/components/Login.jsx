import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import "./Auth.css"

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically make an API call to authenticate the user
        console.log('Login data:', formData);
        navigate('/'); // Redirect to home after successful login
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1>Welcome Back</h1>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="auth-submit">Login</button>
                </form>
                <p className="auth-switch">
                    Don't have an account? <Link to="/signin">Sign In</Link>
                </p>
                <Link to="/" className="auth-home-link">← Back to Home</Link>
            </div>
        </div>
    );
}

export default Login
