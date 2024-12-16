import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the shape of the event object
interface MessageEvent {
    msg: string;
}

const ChatRoom: React.FC = () => {
    // Define the types for the state variables
    const [messages, setMessages] = useState<string[]>([]); // To store messages
    const [message, setMessage] = useState<string>(""); // To bind message input

    useEffect(() => {
        // Listen ke nama channel
        window.Echo.channel("lobby-chat").listen(
            ".chat", // dapat dari broadcastAs di event, harus ada .chat
            (event: { msg: string }) => {
                console.log("event msg: ", event.msg);
                setMessages((prev) => [...prev, event.msg]); // Update the state
            }
        );

        return () => {
            window.Echo.leave("lobby-chat");
        };
    }, []);

    const sendMessage = async () => {
        if (message.trim()) {
            // Send message to Laravel backend (use Inertia for the request)
            const t = await axios.post("/send-message", {
                message: message,
            });
            if (t.status === 200) {
                console.log("ok");
            }

            setMessage(""); // Clear input field
        }
    };

    return (
        <div>
            <h1>Chat Room</h1>

            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>

            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter a message"
            />
            <button onClick={sendMessage}>Send Message</button>
        </div>
    );
};

export default ChatRoom;
