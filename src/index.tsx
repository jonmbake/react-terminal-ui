import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import './style.css';

export enum LineType {
  Input,
  Output
}

export enum ColorMode {
  Light,
  Dark
}

export interface Props {
  name?: string
  prompt?: string
  colorMode?: ColorMode
  lineData: Array<{type: LineType, value: string}>
  onInput: ((input: string) => void) | null | undefined
}

const Terminal = (props: Props) => {
  const [currentLineInput, setCurrentLineInput] = useState('');

  const lastInputRef = useRef<null | HTMLElement>(null)

  const handleKeyPress = (event: KeyboardEvent) => {
    if (props.onInput != null && event.key === 'Enter') {
      props.onInput(currentLineInput);
      setCurrentLineInput('');
    } else if (event.key === 'Backspace' && currentLineInput.length > 0) {
      setCurrentLineInput(currentLineInput.slice(0, -1));
    } else if (event.key.length === 1) {
      setCurrentLineInput(currentLineInput + event.key);
    }
  }

  useEffect(() => lastInputRef?.current?.scrollIntoView({ behavior: "smooth" }), [props.onInput]);

  useEffect(() => {
    document.onclick = () => document.getElementById("terminal-hidden")?.focus();
  });

  const renderedLineData = props.lineData.map((ld, i) => {
    const classes = ['react-terminal-line'];
    if (ld.type === LineType.Input) {
      classes.push('react-terminal-input');
    }
    return (
      <span className={ classes.join(' ') } key={ i }>{ ld.value }</span>
    );
  });

  if (props.onInput != null) {
    renderedLineData.push(
      <span className="react-terminal-line react-terminal-input" data-terminal-prompt={ props.prompt || '$' } key={ props.lineData.length } ref={ lastInputRef }>{ currentLineInput }</span>,
    );
  }

  const classes = ['react-terminal-wrapper'];
  if (props.colorMode === ColorMode.Light) {
    classes.push('react-terminal-light');
  }
  return (
    <div className={ classes.join(' ') } data-terminal-name={ props.name }>
      <div className="react-terminal">
        { renderedLineData }
      </div>
      <div className="hidden-input-wrapper">
        <div className="hidden-input">
          <label htmlFor="terminal-hidden">Terminal Hidden Input</label>
          <input id="terminal-hidden" value={ currentLineInput } autoFocus={ props.onInput != null } onBlur={ e => e.target.focus() } onKeyDown={ handleKeyPress } readOnly={ true }/>
        </div>
      </div>
    </div>
  );
}

export default Terminal;
