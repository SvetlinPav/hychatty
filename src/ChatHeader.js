import { HelpRounded, PeopleAltRounded, Send } from "@material-ui/icons";
import React from "react";
import "./ChatHeader.css";
import { store } from "react-notifications-component";

function ChatHeader({ channelName }) {
  const buttonNotConfigured = () => {
    store.addNotification({
      title: "Not Configured",
      message: "Functionality is not added for this button!",
      type: "warning",
      insert: "bottom",
      container: "top-right",
      animationIn: ["animate__animated", "animate__backInRight"],
      animationOut: ["animate__animated", "animate__backOutRight"],
      showIcon: true,
      dismiss: {
        duration: 6000,
        onScreen: true,
      },
    });
  };

  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
        {!channelName ? null : (
          <h3>
            <span className="chatHeader__hash">
              <Send fontSize="small" />
            </span>
            {channelName}
          </h3>
        )}
      </div>

      <div className="chatHeader__right">
        {/* Icon */}
        <PeopleAltRounded onClick={buttonNotConfigured} />

        {/* Icon */}
        <HelpRounded onClick={buttonNotConfigured} />
      </div>
    </div>
  );
}

export default ChatHeader;
