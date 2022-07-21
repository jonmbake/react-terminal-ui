import React from "react";

const TerminalInput = ({children} : {children?: React.ReactChild}) => {
  return (
    <div className="react-terminal-line react-terminal-input">{ children }</div>
  );
} 

export default TerminalInput;