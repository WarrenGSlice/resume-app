import React, { useState, useEffect } from 'react';
import './ChatBox.css';

const ChatBox = ({onResumeUpload, onAutoMessage, onDownloadClick}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [autoMessageSent, setAutoMessageSent] = useState(false); // Track if auto message has been sent

  useEffect(() => {
    // Auto-message after 20 seconds
    if (!autoMessageSent) {
      const timer = setTimeout(() => {
        const newMessage = { text: 'Please upload your resume to begin.', isAuto: true };
        setMessages([...messages, newMessage]);
        setAutoMessageSent(true); // Prevent future auto-messages
        onAutoMessage(); // Trigger progress bar update
      }, 5000); // 5 seconds

      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [autoMessageSent, messages, onAutoMessage]);

  const handleSend = async () => {
    if (input.trim()) {

      
      
      
      
      setMessages(messages => [
        ...messages, 
        { role: "user", content: input }
      ]);
    }

    try {
      // Send the user's message to the FastAPI backend
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error("Failed to get response from the server");

      const data = await response.json();
      const aiMessage = { role: "assistant", content: data.response };

      // Append AI response to chat
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      setInput(""); // Clear input field

    } catch (error) {
      console.error("Error:", error);
      
      
      
      
      
      const newMessage = { text: input, isAuto: false }; // Regular user message
      setMessages([...messages, newMessage]);
      setInput("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents adding a new line
      handleSend(); // Call the send function
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const fileURL = URL.createObjectURL(file);
      onResumeUpload(fileURL); // Pass the file URL to the parent component
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  return (
    <div className="chatbox-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div className={`message ${msg.role}`} key={index}>
          {msg.content} {/* Rendering just the content of each message */}
        </div>
          <div
            className={`message ${msg.isAuto ? 'auto-message' : ''}`}
            key={index}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="file"
          id="file-upload"
          accept="application/pdf"
          style={{ display: "none" }}
          onChange={handleFileChange} // Handle file change
        />
        <label htmlFor="file-upload" className="attach-btn">📎</label>
        <input
          type="text"
          placeholder="What are your suggestions for my resume?"
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress} // Add the key press handler
        />
        <button className="send-btn" onClick={handleSend}>Send</button>
        <button className='finished-btn' onClick={onDownloadClick}>Finished</button>
      </div>
    </div>
  );
};

export default ChatBox;