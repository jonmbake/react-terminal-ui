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
  const [cursorPos, setCursorPos] = useState(0);

  const scrollIntoViewRef = useRef<HTMLDivElement>(null)

  const updateCurrentLineInput = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentLineInput(event.target.value);
  }

  // Calculates the total width in pixels of the characters to the right of the cursor.
  // Create a temporary span element to measure the width of the characters.
  const calculateInputWidth = (inputElement: HTMLInputElement, chars: string) => {
    const span = document.createElement('span');
    span.style.visibility = 'hidden';
    span.style.position = 'absolute';
    span.style.fontSize = window.getComputedStyle(inputElement).fontSize;
    span.style.fontFamily = window.getComputedStyle(inputElement).fontFamily;
    span.innerText = chars;
    document.body.appendChild(span);
    const width = span.getBoundingClientRect().width;
    document.body.removeChild(span);
    // Return the negative width, since the cursor position is to the left of the input suffix
    return -width;
  };

  const clamp = (value: number, min: number, max: number) => {
    if(value > max) return max;
    if(value < min) return min;
    return value;
  }

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if(!onInput) {
      return;
    };
    if (event.key === 'Enter') {
      onInput(currentLineInput);
      setCursorPos(0);
      setCurrentLineInput('');
    } else if (["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", "Delete"].includes(event.key)) { 
      const inputElement = document.getElementById('hidden') as HTMLInputElement;
      let charsToRightOfCursor = "";
      let cursorIndex = currentLineInput.length - (inputElement.selectionStart || 0);
      cursorIndex = clamp(cursorIndex, 0, currentLineInput.length);

      if(event.key === 'ArrowLeft') {
        if(cursorIndex > currentLineInput.length - 1) cursorIndex --;
        charsToRightOfCursor = currentLineInput.slice(currentLineInput.length -1 - cursorIndex);
      }
      else if (event.key === 'ArrowRight' || event.key === 'Delete') {
        charsToRightOfCursor = currentLineInput.slice(currentLineInput.length - cursorIndex + 1);
      }
      else if (event.key === 'ArrowUp') {
        charsToRightOfCursor = currentLineInput.slice(0)
      }

      const inputWidth = calculateInputWidth(inputElement, charsToRightOfCursor);
      setCursorPos(inputWidth);
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
      <div className="react-terminal" style={ { height } }>
        { children }
        { onInput && <div className="react-terminal-line react-terminal-input react-terminal-active-input" data-terminal-prompt={ prompt || '$' } key="terminal-line-prompt" >{ currentLineInput }<span id="cursor" style={{ left: `${cursorPos+1}px` }}></span></div> }
        <div ref={ scrollIntoViewRef }></div>
      </div>
      <input id="hidden" className="terminal-hidden-input" placeholder="Terminal Hidden Input" value={ currentLineInput } autoFocus={ onInput != null } onChange={ updateCurrentLineInput } onKeyDown={ handleInputKeyDown }/>
    </div>
  );
}

export { TerminalInput, TerminalOutput };
export default Terminal;
