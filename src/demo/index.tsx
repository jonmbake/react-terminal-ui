import React, { useState, MouseEvent } from 'react'
import ReactDOM from 'react-dom';
import Terminal, { ColorMode, LineType } from '../index';

import './style.css';

const TerminalController = (props = {}) => {
  const [colorMode, setColorMode] = useState(ColorMode.Dark);
  const [lineData, setLineData] = useState([
    {type: LineType.Output, value: 'Welcome to the React Terminal UI Demo!'},
    {type: LineType.Output, value: ''},
    {type: LineType.Output, value: 'The following example commands are provided:'},
    {type: LineType.Output, value: '\'view-source\' will navigate to the React Terminal UI github source.'},
    {type: LineType.Output, value: '\'view-react-docs\' will naviagate to the react docs.'},
    {type: LineType.Output, value: '\'clear\' will clear will clear the terminal.'},
  ]);

  function toggleColorMode (e: MouseEvent) {
    e.preventDefault();
    setColorMode(colorMode === ColorMode.Light ? ColorMode.Dark : ColorMode.Light);
  }

  function onInput (input: string) {
      let ld = [...lineData];
      ld.push({type: LineType.Input, value: input});
    if (input.toLocaleLowerCase() === 'view-source') {
      window.open('https://github.com/jonmbake/react-terminal-ui', '_blank');
    } else if (input.toLocaleLowerCase() === 'view-react-docs') {
      window.open('https://reactjs.org/docs/getting-started.html', '_blank');
    } else if (input.toLocaleLowerCase() === 'clear') {
      ld = [];
    } else if (input) {
      ld.push({type: LineType.Output, value: 'Unrecognized command'});
    }
    setLineData(ld);
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
      <Terminal name='React Terminal UI' colorMode={ colorMode }  lineData={ lineData } onInput={ onInput }/>
    </div>
  )
};

ReactDOM.render(
  <React.StrictMode>
    <TerminalController />
  </React.StrictMode>,
  document.getElementById('terminal')
);