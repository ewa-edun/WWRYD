import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { auth, googleProvider } from "../firebase"
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import "./Auth.css"

function SignIn() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        
        setIsLoading(true);
        setError('');
        
        try {
            const userCredential = await createUserWithEmailAndPassword(
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
            setError(err.message || 'Failed to create account');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1>Create Account</h1>
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
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="auth-submit" disabled={isLoading}>
                        {isLoading ? 'Creating Account...' : 'Sign In'}
                    </button>
                    <button 
                        type="button"
                        className="google-auth-button" 
                        onClick={handleGoogleSignIn}
                    >
                        Continue with Google
                    </button>    
                </form>
                <p className="auth-switch">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
                <Link to="/" className="auth-home-link">← Back to Home</Link>
            </div>
        </div>
    );
}

export default SignIn;
