import { EmojiEmotions, Gif } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import { selectChannelName, selectChannelId } from "./features/appSlice";
import { selectUser } from "./features/userSlice";
import db from "./firebase";
import Message from "./Message";
import firebase from "firebase";

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.length >= 1 && input.length < 300) {
      db.collection("channels").doc(channelId).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user,
      });
    }

    setInput("");
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      {!channelName ? (
        <h2 className="noChatSelected">
          <i className="fas fa-angle-left"></i>Select a Channel
        </h2>
      ) : (
        <div className="chat__messages">
          {messages.map((message) => (
            <Message
              timestamp={message.timestamp}
              message={message.message}
              user={message.user}
            />
          ))}
        </div>
      )}
      <div className="chat__input">
        <EmojiEmotions fontSize="large" />
        <form>
          <input
            value={input}
            disabled={!channelId}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message ${channelName ? channelName : ""}`}
          />
          <button
            disabled={!channelId}
            className="chat__inputButton"
            type="submit"
            onClick={sendMessage}
          >
            Send Message
          </button>
        </form>

        <div className="chat__inputIcons">
          <Gif fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
