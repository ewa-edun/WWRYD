import { Link } from "react-router-dom"
import { useState } from "react"
import "./PrincessDiana.css"

function Diana() {
    const [messages, setMessages] = useState([
      {
        text: "Nothing brings me more happiness than trying to help the most vulnerable people in society.",
        sender: "diana",
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
        // Simulate Diana's response
        setTimeout(() => {
          setMessages(prev => [...prev, {
            text: "Carry out a random act of kindness, with no expectation of reward, safe in the knowledge that one day someone might do the same for you.",
            sender: "diana",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
        }, 1000);
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
            />
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
        </div>
      </div>
    );
}

export default Diana