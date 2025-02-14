import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { sendChatMessage } from "../utils/api"
import "./PrincessDiana.css"

function Diana() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
      {
        text: "Nothing brings me more happiness than trying to help the most vulnerable people in society.",
        sender: "diana",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage.trim() && !isLoading) {
            const userMessage = {
                text: newMessage,
                sender: "user",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            
            setMessages(prev => [...prev, userMessage]);
            setNewMessage("");
            setIsLoading(true);

            try {
                const response = await sendChatMessage(newMessage, 2); // 2 is Princess Diana's role_model_id
                const dianaResponse = {
                    text: response.reply,
                    sender: "diana",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(prev => [...prev, dianaResponse]);
            } catch (error) {
                if (error.message === 'Token is invalid!' || error.message === 'Token is missing!') {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
                console.error('Failed to get response:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="diana-page">
            <nav className="diana-nav">
                <Link to="/" className="home-link">← Back to Home</Link>
                <h1>Chat with Princess Diana</h1>
            </nav>

            <div className="chat-container">
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message-wrapper ${message.sender}`}>
                            {message.sender === "diana" && (
                                <img 
                                    src="/src/images/of wales.jpg" 
                                    alt="Princess Diana" 
                                    className="avatar diana-avatar"
                                />
                            )}
                            <div className="message-content">
                                <div className={`message-bubble ${message.sender}`}>
                                    {message.text}
                                </div>
                                <div className="message-timestamp">{message.timestamp}</div>
                            </div>
                            {message.sender === "user" && (
                                <div className="avatar user-avatar">
                                    U
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="chat-input-form">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Ask Princess Diana anything..."
                        className="chat-input"
                        disabled={isLoading}
                    />
                    <button type="submit" className="send-button" disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Diana