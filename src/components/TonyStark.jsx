import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { sendChatMessage } from "../utils/api"
import "./TonyStark.css"

function Tony() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
      {
        text: "I am Iron Man!",
        sender: "tony",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Check if user is authenticated
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
                const response = await sendChatMessage(newMessage, 1); // 1 is Tony Stark's role_model_id
                const tonyResponse = {
                    text: response.reply,
                    sender: "tony",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(prev => [...prev, tonyResponse]);
            } catch (error) {
                console.error('Failed to get response:', error);
                // Optionally show error to user
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="tony-page">
            <nav className="tony-nav">
                <Link to="/" className="home-link">← Back to Home</Link>
                <h1>Chat with Tony Stark</h1>
            </nav>

            <div className="chat-container">
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message-wrapper ${message.sender}`}>
                            {message.sender === "tony" && (
                                <img 
                                    src="/src/images/iron man.jpg" 
                                    alt="Tony Stark" 
                                    className="avatar tony-avatar"
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
                        placeholder="Ask Tony Stark anything..."
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

export default Tony