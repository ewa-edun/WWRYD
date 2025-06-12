import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { sendChatMessage } from "../utils/api"
import { db, auth } from "../utils/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./HedyLamarr.css"

function Hedy() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
      {
        text: "Beauty doesn't mean lack of intelligence. I invented frequency-hopping spread spectrum technology!",
        sender: "hedy",
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
                const response = await sendChatMessage(newMessage, 5); // 5 is Hedy's role_model_id
                const hedyResponse = {
                    text: response.reply,
                    sender: "hedy",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(prev => [...prev, hedyResponse]);

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
        <div className="hedy-page">
            <nav className="hedy-nav">
                <Link to="/" className="home-link">← Back to Home</Link>
                <h1>Chat with Hedy Lamarr</h1>
            </nav>

            <div className="chat-container">
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message-wrapper ${message.sender}`}>
                            {message.sender === "hedy" && (
                                <img 
                                    src="/Lamarr.jpg" 
                                    alt="Hedy Lamarr" 
                                    className="avatar hedy-avatar"
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
                        placeholder="Ask Hedy Lamarr anything..."
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

export default Hedy
