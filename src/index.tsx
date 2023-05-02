import React, { useState, useEffect, useRef, KeyboardEvent, ChangeEvent, ReactNode, ReactNodeArray } from 'react';
import TerminalInput from './linetypes/TerminalInput';
import TerminalOutput from './linetypes/TerminalOutput';
import './style.css';

export enum ColorMode {
  Light,
  Dark
}

export interface Props {
  name?: string;
  prompt?: string;
  height?: string;
  colorMode?: ColorMode;
  children?: ReactNode;
  onInput?: ((input: string) => void) | null | undefined;
  startingInputValue?: string;
  redBtnCallback?: () => void;
  yellowBtnCallback?: () => void;
  greenBtnCallback?: () => void;
}

const Terminal = ({name, prompt, height = "600px", colorMode, onInput, children, startingInputValue = "", redBtnCallback, yellowBtnCallback, greenBtnCallback}: Props) => {
  const [currentLineInput, setCurrentLineInput] = useState('');

  const scrollIntoViewRef = useRef<HTMLDivElement>(null)

  const updateCurrentLineInput = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentLineInput(event.target.value);
  }

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
    }
    if (onInput != null && event.key === 'Enter') {
      onInput(currentLineInput);
      setCurrentLineInput('');
    }
  }

  useEffect(() => {
    setCurrentLineInput(startingInputValue.trim());
  }, [startingInputValue]);

  // An effect that handles scrolling into view the last line of terminal input or output
  const performScrolldown = useRef(false);
  useEffect(() => {
    if (performScrolldown.current) { // skip scrolldown when the component first loads
      setTimeout(() => scrollIntoViewRef?.current?.scrollIntoView({ behavior: "auto", block: "nearest" }), 500);
    }
    performScrolldown.current = true;
  }, [children]);

  // We use a hidden input to capture terminal input; make sure the hidden input is focused when clicking anywhere on the terminal
  useEffect(() => {
    if (onInput == null) {
      return;
    }
    // keep reference to listeners so we can perform cleanup
    const elListeners: { terminalEl: Element; listener: EventListenerOrEventListenerObject }[] = [];
    for (const terminalEl of document.getElementsByClassName('react-terminal-wrapper')) {
      const listener = () => (terminalEl?.querySelector('.terminal-hidden-input') as HTMLElement)?.focus();
      terminalEl?.addEventListener('click', listener);
      elListeners.push({ terminalEl, listener });
    }
    return function cleanup () {
      elListeners.forEach(elListener => {
        elListener.terminalEl.removeEventListener('click', elListener.listener);
      });
    }
  }, [onInput]);

  const classes = ['react-terminal-wrapper'];
  if (colorMode === ColorMode.Light) {
    classes.push('react-terminal-light');
  }
  return (
    <div className={ classes.join(' ') } data-terminal-name={ name }>
      <div className="react-terminal-window-buttons">
        <button className={`${yellowBtnCallback ? "clickable": ""} red-btn`} disabled={!redBtnCallback} onClick={ redBtnCallback } />
        <button className={`${yellowBtnCallback ? "clickable" : ""} yellow-btn`} disabled={!yellowBtnCallback} onClick={ yellowBtnCallback } />
        <button className={`${greenBtnCallback ? "clickable" : ""} green-btn`} disabled={!greenBtnCallback} onClick={ greenBtnCallback } />
      </div>
      <div className="react-terminal" style={ { height } }>
        { children }
        { onInput && <div className="react-terminal-line react-terminal-input react-terminal-active-input" data-terminal-prompt={ prompt || '$' } key="terminal-line-prompt" >{ currentLineInput }</div> }
        <div ref={ scrollIntoViewRef }></div>
      </div>
      <input className="terminal-hidden-input" placeholder="Terminal Hidden Input" value={ currentLineInput } autoFocus={ onInput != null } onChange={ updateCurrentLineInput } onKeyDown={ handleInputKeyDown }/>
    </div>
  );
}

export { TerminalInput, TerminalOutput };
export default Terminal;
