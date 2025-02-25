import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import "./PastChats.css";

function PastChats() {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    const fetchChats = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          navigate('/login');
          return;
        }
        const conversationsRef = collection(db, "conversations");
        const q = query(
          conversationsRef,
          where("userId", "==", user.uid),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        const chatsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setChats(chatsData);
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, [navigate]);

  if (loading) {
    return <div className="past-chats-page"><p>Loading past chats...</p></div>;
  }

  return (
    <div className="past-chats-page">
      <nav className="past-chats-nav">
        <Link to="/" className="home-link">← Back to Home</Link>
        <h1>Past Chats</h1>
      </nav>
      <div className="chats-list">
        {chats.length === 0 ? (
          <p>No past chats found.</p>
        ) : (
          chats.map(chat => (
            <div key={chat.id} className="chat-entry">
              <div className="chat-header">
                <strong>{chat.roleModel}</strong> -{" "}
                {chat.timestamp && chat.timestamp.seconds 
                  ? new Date(chat.timestamp.seconds * 1000).toLocaleString() 
                  : "N/A"}
              </div>
              <div className="chat-body">
                <p><strong>You:</strong> {chat.userMessage}</p>
                <p>
                  <strong>{chat.roleModel.split(" ")[0]}:</strong> {chat.aiResponse}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PastChats;
