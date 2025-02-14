import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { sendChatMessage } from "../utils/api"
import "./MarieCurie.css"

function Marie() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
      {
        text: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
        sender: "marie",
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
                const response = await sendChatMessage(newMessage, 3); // 3 is Marie Curie's role_model_id
                const marieResponse = {
                    text: response.reply,
                    sender: "marie",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(prev => [...prev, marieResponse]);
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
        <div className="marie-page">
            <nav className="marie-nav">
                <Link to="/" className="home-link">← Back to Home</Link>
                <h1>Chat with Marie Curie</h1>
            </nav>

            <div className="chat-container">
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message-wrapper ${message.sender}`}>
                            {message.sender === "marie" && (
                                <img 
                                    src="/Marie.jpg" 
                                    alt="Marie Curie" 
                                    className="avatar marie-avatar"
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
                        placeholder="Ask Marie Curie anything..."
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

export default Marie
