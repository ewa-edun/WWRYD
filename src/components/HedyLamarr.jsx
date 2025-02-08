import { Link } from "react-router-dom"
import { useState } from "react"
import "./HedyLamarr.css"

function Hedy() {
    const [messages, setMessages] = useState([
      {
        text: "Beauty doesn't mean lack of intelligence. I invented frequency-hopping spread spectrum technology!",
        sender: "hedy",
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
        // Simulate Hedy's response
        setTimeout(() => {
          setMessages(prev => [...prev, {
            text: "Any girl can be glamorous. All you have to do is stand still and look stupid. But I chose to be inventive!",
            sender: "hedy",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
        }, 1000);
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
                    src="/images/Hedy.jpg" 
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
            />
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
        </div>
      </div>
    );
}

export default Hedy