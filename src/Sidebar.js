import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SidebarChannel from "./SidebarChannel";
import { Settings } from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";
import db, { auth } from "./firebase";
import Popup from "react-animated-popup";
import { store } from "react-notifications-component";

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);
  const [newChannelName, setNewChannelName] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      );
    });
  }, []);

  const channelNameCharExeeded = () => {
    store.addNotification({
      title: "Something went wrong.",
      message:
        "Make sure your new epic channel name doesn't exceed 20 characters 😊",
      type: "danger",
      insert: "top",
      container: "bottom-right",
      animationIn: ["animate__animated", "animate__backInRight"],
      animationOut: ["animate__animated", "animate__backOutRight"],
      showIcon: true,
      dismiss: {
        duration: 6000,
        onScreen: true,
      },
    });
  };

  const handleAddChannel = (e) => {
    e.preventDefault();
    if (newChannelName && newChannelName.length <= 20) {
      db.collection("channels").add({
        channelName: newChannelName,
      });
      hideCreateChannelPopUp();
    } else if (newChannelName && newChannelName.length > 20) {
      channelNameCharExeeded();
    }

    setNewChannelName("");
  };

  const showCreateChannelPopUp = () => {
    setAlertVisible(true);
    setNewChannelName("");
  };

  const hideCreateChannelPopUp = () => {
    setAlertVisible(false);
    setNewChannelName("");
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>HyChatty</h3>
        <ExpandMoreIcon />
      </div>
      <Popup
        className="popup"
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
      >
        <div className="popup__wrap">
          <h4>Create New Channel</h4>
          <h4
            className={`${
              newChannelName.length <= 20 ? "" : "notInLimitChannelName"
            }`}
          >
            {newChannelName.length}
            <span style={{ color: "white" }}>/</span>
            <span style={{ color: "green" }}>20</span>
          </h4>
          <div className="alert__form">
            <form>
              <input
                value={newChannelName}
                onChange={(e) => setNewChannelName(e.target.value)}
                placeholder={`New Channel`}
              />
              <div className="inputButtons__wrap">
                <button
                  className="closeCreateChannel__inputButton"
                  type="button"
                  onClick={hideCreateChannelPopUp}
                >
                  CLOSE
                </button>
                <button
                  className="createChannel__inputButton"
                  type="submit"
                  onClick={handleAddChannel}
                >
                  CREATE
                </button>
              </div>
            </form>
          </div>
        </div>
      </Popup>

      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Channels</h4>
          </div>
          {channels.length < 8 ? (
            <AddIcon
              onClick={showCreateChannelPopUp}
              className="sidebar__addChannel"
            />
          ) : (
            <h6 style={{ color: "red" }}>Channel Limit Reached</h6>
          )}
        </div>

        <div className="sidebar__channelsList">
          {channels.map(({ id, channel }) => (
            <SidebarChannel
              key={id}
              id={id}
              channelName={channel.channelName}
            />
          ))}
        </div>
      </div>

      <div className="sidebar__profile">
        <Avatar onClick={() => auth.signOut()} src={user.photo} />
        <div className="sidebar__profileInfo">
          <h3>{user.name}</h3>
          <p>#{user.uid.substring(0, 8)}</p>
        </div>

        <div className="sidebar__profileIcons">
          <Settings />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
