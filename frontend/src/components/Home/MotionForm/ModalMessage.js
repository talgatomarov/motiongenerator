import React from "react";

import LoadingMessage from "./LoadingMessage.js";
import MotionList from "./MotionList.js";

const ModalMessage = ({ data }) => {
  if (data.error) {
    return <div data-testid="error-message">Error: {data.error.message}</div>;
  } else if (data.isLoading) {
    return <LoadingMessage />;
  } else {
    return <MotionList motions={data.motions} />;
  }
};

export default ModalMessage;
