import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { sendChatMessage } from "../utils/api"
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./ManmohanSingh.css"

function Singh() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
      {
        text: "The time has come for us to ensure that the road ahead is not blocked by intolerant and extremist forces.",
        sender: "manmohan",
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
                const response = await sendChatMessage(newMessage, 6); // 6 is Manmohan Singh's role_model_id
                const manmohanResponse = {
                    text: response.reply,
                    sender: "manmohan",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(prev => [...prev, manmohanResponse]);

                // Store the conversation in Firestore
                const user = auth.currentUser;
                if (user) {
                    await addDoc(collection(db, "conversations"), {
                        userId: user.uid,
                        roleModel: "Dr. Manmohan Singh",
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
        <div className="manmohan-page">
            <nav className="manmohan-nav">
                <Link to="/" className="home-link">← Back to Home</Link>
                <h1>Chat with Dr. Manmohan Singh</h1>
            </nav>

            <div className="chat-container">
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message-wrapper ${message.sender}`}>
                            {message.sender === "manmohan" && (
                                <img 
                                    src="/Manmohan.jpg" 
                                    alt="Manmohan Singh" 
                                    className="avatar manmohan-avatar"
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
                        placeholder="Ask Dr. Manmohan Singh anything..."
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

export default Singh
