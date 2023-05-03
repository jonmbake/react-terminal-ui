import React, { useState, MouseEvent } from 'react'
import ReactDOM from 'react-dom';
import Terminal, { ColorMode, TerminalInput, TerminalOutput } from '../src/index';

import './style.css';

const TerminalController = (props = {}) => {
  const [colorMode, setColorMode] = useState(ColorMode.Dark);
  const [lineData, setLineData] = useState([
    <TerminalOutput>Welcome to the React Terminal UI Demo!&#128075;</TerminalOutput>,
    <TerminalOutput></TerminalOutput>,
    <TerminalOutput>The following example commands are provided:</TerminalOutput>,
    <TerminalOutput>'view-source' will navigate to the React Terminal UI github source.</TerminalOutput>,
    <TerminalOutput>'view-react-docs' will navigate to the react docs.</TerminalOutput>,
    <TerminalOutput>'clear' will clear the terminal.</TerminalOutput>,
  ]);

  function toggleColorMode (e: MouseEvent) {
    e.preventDefault();
    setColorMode(colorMode === ColorMode.Light ? ColorMode.Dark : ColorMode.Light);
  }

  function onInput (input: string) {
      let ld = [...lineData];
      ld.push(<TerminalInput>{input}</TerminalInput>);
    if (input.toLocaleLowerCase().trim() === 'view-source') {
      window.open('https://github.com/jonmbake/react-terminal-ui', '_blank');
    } else if (input.toLocaleLowerCase().trim() === 'view-react-docs') {
      window.open('https://reactjs.org/docs/getting-started.html', '_blank');
    } else if (input.toLocaleLowerCase().trim() === 'clear') {
      ld = [];
    } else if (input) {
      ld.push(<TerminalOutput>Unrecognized command</TerminalOutput>);
    }
    setLineData(ld);
  }

  const redBtnClick = () => {
    console.log("Clicked the red button.");
  }

  const yellowBtnClick = () => {
    console.log("Clicked the yellow button.");
  }

  const greenBtnClick = () => {
    console.log("Clicked the green button.");
  }

  const btnClasses = ['btn'];
  if (colorMode === ColorMode.Light) {
    btnClasses.push('btn-dark');
  } else {
    btnClasses.push('btn-light');
  }
  return (
    <div className="container" >
      <div className="d-flex flex-row-reverse p-2">
        <button className={ btnClasses.join(' ') } onClick={ toggleColorMode } >Enable { colorMode === ColorMode.Light ? 'Dark' : 'Light' } Mode</button>
      </div>
      <Terminal 
        name='React Terminal UI' 
        colorMode={ colorMode }  
        onInput={ onInput } 
        redBtnCallback={ redBtnClick } 
        yellowBtnCallback={ yellowBtnClick } 
        greenBtnCallback={ greenBtnClick }
      >
        {lineData}
      </Terminal>
    </div>
  )
};

ReactDOM.render(
  <React.StrictMode>
    <TerminalController />
  </React.StrictMode>,
  document.getElementById('terminal')
);