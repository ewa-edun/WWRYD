import { Link } from "react-router-dom"
import { useState } from "react"
import "./JensenHuang.css"

function Jensen() {
    const [messages, setMessages] = useState([
      {
        text: "AI is eating software, and software is eating the world. The more software there is, the more AI will consume.",
        sender: "jensen",
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
        // Simulate Jensen's response
        setTimeout(() => {
          setMessages(prev => [...prev, {
            text: "The computing industry is transforming. The future of computing is energy-efficient accelerated computing, and NVIDIA is at the center of it.",
            sender: "jensen",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
        }, 1000);
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
                    src="/src/images/Jensen.jpg" 
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
            />
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
        </div>
      </div>
    );
}

export default Jensen