import { Link } from "react-router-dom"
import { useState } from "react"
import "./TonyStark.css"

function Tony() {
    const [messages, setMessages] = useState([
      {
        text: "I am Iron Man!",
        sender: "tony",
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
        // Here you would typically make an API call to get Tony's response
        // For now, let's simulate a response after 1 second
        setTimeout(() => {
          setMessages(prev => [...prev, {
            text: "I'm a genius, billionaire, playboy, philanthropist. And yes, I can help with that.",
            sender: "tony",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
        }, 1000);
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
            />
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
        </div>
      </div>
    );
}

export default Tony