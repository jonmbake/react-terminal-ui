import React from "react";

const TerminalOutput = ({children} : {children?: React.ReactChild}) => {
  return (
    <div className="react-terminal-line">{ children }</div>
  );
} 

export default TerminalOutput;