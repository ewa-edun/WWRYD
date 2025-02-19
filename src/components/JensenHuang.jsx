import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { sendChatMessage } from "../utils/api"
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./JensenHuang.css"

function Jensen() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
      {
        text: "AI is eating software, and software is eating the world. The more software there is, the more AI will consume.",
        sender: "jensen",
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
                const response = await sendChatMessage(newMessage, 4); // 4 is Jensen's role_model_id
                const jensenResponse = {
                    text: response.reply,
                    sender: "jensen",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(prev => [...prev, jensenResponse]);

                // Store the conversation in Firestore
                const user = auth.currentUser;
                if (user) {
                    await addDoc(collection(db, "conversations"), {
                        userId: user.uid,
                        roleModel: "Jensen Huang",
                        userMessage: newMessage,
                        aiResponse: response.reply,
                        timestamp: serverTimestamp(),
                    });
                }
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
        <div className="jensen-page">
            <nav className="jensen-nav">
                <Link to="/" className="home-link">← Back to Home</Link>
                <h1>Chat with Jensen Huang</h1>
            </nav>

            <div className="chat-container">
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message-wrapper ${message.sender}`}>
                            {message.sender === "jensen" && (
                                <img 
                                    src="/Jensen.jpg" 
                                    alt="Jensen Huang" 
                                    className="avatar jensen-avatar"
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
                        placeholder="Ask Jensen Huang anything..."
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

export default Jensen
