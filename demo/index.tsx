import React, { useState, MouseEvent } from 'react'
import { createRoot } from 'react-dom/client';
import Terminal, { ColorMode, TerminalInput, TerminalOutput } from '../src/index';

import './style.css';

const TerminalController = () => {
  const [isPasswordMode, setIsPasswordMode] = useState<boolean>(false);
  const [colorMode, setColorMode] = useState(ColorMode.Dark);
  const [lineData, setLineData] = useState([
    <TerminalOutput key="welcome">Welcome to the React Terminal UI Demo!&#128075;</TerminalOutput>,
    <TerminalOutput key="empty"></TerminalOutput>,
    <TerminalOutput key="commands">The following example commands are provided:</TerminalOutput>,
    <TerminalOutput key="view-source">&apos;view-source&apos; will navigate to the React Terminal UI github source.</TerminalOutput>,
    <TerminalOutput key="view-react">&apos;view-react-docs&apos; will navigate to the react docs.</TerminalOutput>,
    <TerminalOutput key="login">&apos;login&apos; will show input password with &quot;*&quot; instead of real string</TerminalOutput>,
    <TerminalOutput key="clear">&apos;clear&apos; will clear the terminal.</TerminalOutput>,
  ]);

  function toggleColorMode(e: MouseEvent) {
    e.preventDefault();
    setColorMode(colorMode === ColorMode.Light ? ColorMode.Dark : ColorMode.Light);
  }

  function onInput(input: string) {
    let ld = [...lineData];
    if (isPasswordMode) {
      ld.push(<TerminalInput>{'*'.repeat(input.length)}</TerminalInput>);
      ld.push(<TerminalOutput>Your password received successfully</TerminalOutput>);
      setIsPasswordMode(false);
      setLineData(ld);
    } else {
      ld.push(<TerminalInput>{input}</TerminalInput>);
      if (input.toLocaleLowerCase().trim() === 'view-source') {
        window.open('https://github.com/jonmbake/react-terminal-ui', '_blank');
      } else if (input.toLocaleLowerCase().trim() === 'view-react-docs') {
        window.open('https://reactjs.org/docs/getting-started.html', '_blank');
      } else if (input.toLocaleLowerCase().trim() === 'clear') {
        ld = [];
      } else if (input.toLocaleLowerCase().trim() === 'login') {
        ld.push(<TerminalOutput>Please enter your password:</TerminalOutput>);
        setIsPasswordMode(true);
      } else if (input) {
        ld.push(<TerminalOutput>Unrecognized command</TerminalOutput>);
      }
      setLineData(ld);
    }
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
        <button className={btnClasses.join(' ')} onClick={toggleColorMode} >Enable {colorMode === ColorMode.Light ? 'Dark' : 'Light'} Mode</button>
      </div>
      <Terminal
        name='React Terminal UI'
        colorMode={colorMode}
        onInput={onInput}
        redBtnCallback={redBtnClick}
        yellowBtnCallback={yellowBtnClick}
        greenBtnCallback={greenBtnClick}
        passwordField={isPasswordMode}
      >
        {lineData}
      </Terminal>
    </div>
  )
};

const container = document.getElementById('terminal')!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <TerminalController />
  </React.StrictMode>
);