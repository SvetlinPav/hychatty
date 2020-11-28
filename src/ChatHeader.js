import {
  HelpRounded,
  PeopleAltRounded,
  SearchRounded,
  Send,
} from "@material-ui/icons";
import React from "react";
import "./ChatHeader.css";

function ChatHeader({ channelName }) {
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
        <PeopleAltRounded />

        <div className="chatHeader__search">
          <input placeholder="Search" />
          {/* Icon */}
          <SearchRounded />
        </div>

        {/* Icon */}
        <HelpRounded />
      </div>
    </div>
  );
}

export default ChatHeader;
