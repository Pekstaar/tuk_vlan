import React from "react";

import { useState } from "react";

import CallMessanger from "./CallMessanger";
import CallPageDetails from "./CallPageDetails";
import CallPageFooter from "./CallPageFooter";
import CallPageHeader from "./CallPageHeader";

// const socket = io.connect("http://localhost:5500");

const Call = () => {
  const isAdmin = React.useMemo(() => window.location.hash === "#init", []);

  const url = React.useMemo(
    () => `${window.location.origin}${window.location.pathname}`,
    []
  );
  // const { stream, peers, shareScreen } = useContext(RoomContext);

  const [showMessanger, setShowMessanger] = useState(false);
  const [showDetails, setShowDetails] = useState(isAdmin);

  // effect to hide details pane

  return (
    <div className=" ">
      {isAdmin && (
        <CallPageDetails
          isOpen={showDetails}
          onClose={() => setShowDetails(false)}
          url={url}
        />
      )}
      <CallPageHeader
        toggleMessanger={() => setShowMessanger(!showMessanger)}
      />
      <CallPageFooter
        // shareScreen={shareScreen}
        showMessanger={() => setShowMessanger(!showMessanger)}
      />
      <CallMessanger
        isOpen={showMessanger}
        hideMessanger={() => setShowMessanger(false)}
      />
    </div>
  );
};

export default Call;
