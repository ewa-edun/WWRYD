import { Link } from "react-router-dom"
import { useState } from "react"
import "./ManmohanSingh.css"

function Singh() {
    const [messages, setMessages] = useState([
      {
        text: "The time has come for us to ensure that the road ahead is not blocked by intolerant and extremist forces.",
        sender: "manmohan",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    const [newMessage, setNewMessage] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      if (newMessage.trim()) {
        setMessages([
          ...messages,
          {
            text: newMessage,
            sender: "user",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setNewMessage("");
        // Simulate Manmohan's response
        setTimeout(() => {
          setMessages(prev => [...prev, {
            text: "Education is a liberating force, and in our age it is also a democratizing force, cutting across the barriers of caste and class, smoothing out inequalities imposed by birth and other circumstances.",
            sender: "manmohan",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
        }, 1000);
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
                    src="/src/images/Manmohan.jpg" 
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
            />
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
        </div>
      </div>
    );
}

export default Singh