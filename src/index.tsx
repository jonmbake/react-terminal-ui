import React, { useState, useEffect, useRef, KeyboardEvent, ChangeEvent, ReactNode, ReactNodeArray } from 'react';
import TerminalInput from './linetypes/TerminalInput';
import TerminalOutput from './linetypes/TerminalOutput';
import './style.css';

export enum ColorMode {
  Light,
  Dark
}

export interface Props {
  name?: string
  prompt?: string
  height?: string
  colorMode?: ColorMode
  children?: ReactNode;
  onInput?: ((input: string) => void) | null | undefined,
  startingInputValue?: string
}

const Terminal = ({name, prompt, height = "600px", colorMode, onInput, children, startingInputValue = ""}: Props) => {
  const [currentLineInput, setCurrentLineInput] = useState('');
  const [cursorIndex, setCursorIndex] = useState(0);

  const scrollIntoViewRef = useRef<HTMLDivElement>(null)

  const updateCurrentLineInput = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentLineInput(event.target.value);
  }

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
  
    }

    if (onInput != null && event.key === 'Enter') {
      onInput(currentLineInput);
      setCurrentLineInput('');
    }
  }

  const updateCursorPosition = () => {
    const inputEl = document.getElementById('hidden') as HTMLInputElement;
    if(!inputEl) return;

    const cursorIndex = inputEl.selectionEnd || 0;
    setCursorIndex(cursorIndex)
  }

  const calculateInputWidth = (cursor: HTMLElement, inputElement: HTMLInputElement, inputSuffix: string) => {
    const span = document.createElement('span');
    span.style.visibility = 'hidden';
    span.style.position = 'absolute';
    span.style.fontSize = window.getComputedStyle(inputElement).fontSize;
    span.style.fontFamily = window.getComputedStyle(inputElement).fontFamily;
    span.innerText = inputSuffix;
    document.body.appendChild(span);
    const width = span.getBoundingClientRect().width;
    document.body.removeChild(span);
    return -width;
  };

  useEffect(() => {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;
  
    if (cursorIndex === currentLineInput.length) {
      cursor.style.left = '0';
    } else {
      const inputElement = document.getElementById('hidden') as HTMLInputElement;
      const inputPrefix = currentLineInput.slice(cursorIndex);
      const inputWidth = calculateInputWidth(cursor, inputElement, inputPrefix);
      cursor.style.left = `${inputWidth}px`;
    }

  }, [cursorIndex]);

  useEffect(() => {
    setCurrentLineInput(startingInputValue.trim());
  }, [startingInputValue]);

  useEffect(() => {
    // Update cursor position 60 times a second.
    const interval = setInterval(() => {
      updateCursorPosition();
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, []);

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
      <div className="react-terminal" style={ { height } }>
        { children }
        { onInput && <div className="react-terminal-line react-terminal-input react-terminal-active-input" data-terminal-prompt={ prompt || '$' } key="terminal-line-prompt" >{ currentLineInput }<span id="cursor" style={{ position: 'relative' }}></span></div> }
        <div ref={ scrollIntoViewRef }></div>
      </div>
      <input id="hidden" className="terminal-hidden-input" placeholder="Terminal Hidden Input" value={ currentLineInput } autoFocus={ onInput != null } onChange={ updateCurrentLineInput } onKeyDown={ handleInputKeyDown }/>
    </div>
  );
}

export { TerminalInput, TerminalOutput };
export default Terminal;
