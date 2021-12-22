import React from "react";

const PrivateScreen = ({error, privateData}) => {

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <div>{privateData}</div>
  );
};

export default PrivateScreen;
