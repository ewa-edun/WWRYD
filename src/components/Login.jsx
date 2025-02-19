import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { auth, googleProvider } from "../firebase"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import "./Auth.css"

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleGoogleSignIn = async () => {
       setIsLoading(true);
                setError('');
                try {
                    const result = await signInWithPopup(auth, googleProvider);
                    const token = await result.user.getIdToken();
                    localStorage.setItem('token', token);
                    navigate('/');
                } catch (err) {
                    setError(err.message || 'Failed to sign in with Google');
                } finally {
                    setIsLoading(false);
                }
          };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const user = userCredential.user;
            // Get the Firebase ID token
            const token = await user.getIdToken();
            // Store the token for API calls
            localStorage.setItem('token', token);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Failed to login');
        } finally {
            setIsLoading(false);
        }
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
                    <button type="submit" className="auth-submit" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    <button
                        type="button" 
                        className="google-auth-button"
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                    >
                        Continue with Google
                    </button>
                </form>
                <p className="auth-switch">
                    Don`t have an account? <Link to="/signin">Sign In</Link>
                </p>
                <Link to="/" className="auth-home-link">← Back to Home</Link>
            </div>
        </div>
    );
}

export default Login
