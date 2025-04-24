import React, {
  useState,
  useEffect,
  useRef,
  KeyboardEvent,
  ChangeEvent,
  ReactNode,
  ReactElement
} from 'react';
import TerminalInput from './linetypes/TerminalInput';
import TerminalOutput from './linetypes/TerminalOutput';
import './style.css';
import {IWindowButtonsProps, WindowButtons} from "./ui-elements/WindowButtons";

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
  TopButtonsPanel?: (props: IWindowButtonsProps) => ReactElement | null;
}

const Terminal = ({name, prompt, height = "600px", colorMode, onInput, children, startingInputValue = "", redBtnCallback, yellowBtnCallback, greenBtnCallback, TopButtonsPanel = WindowButtons}: Props) => {
  const [currentLineInput, setCurrentLineInput] = useState('');
  const [cursorPos, setCursorPos] = useState(0);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
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
    if (!onInput) return;
  
    const inputElement = event.currentTarget;
  
    if (event.key === 'Enter') {
      if (currentLineInput.trim()) {
        setCommandHistory(prev => [...prev, currentLineInput]);
      }
      setHistoryIndex(null);
      onInput(currentLineInput);
      setCursorPos(0);
      setCurrentLineInput('');
      setTimeout(() => scrollIntoViewRef?.current?.scrollIntoView({ behavior: "auto", block: "nearest" }), 500);
    } 
    else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (commandHistory.length === 0) return;
      setHistoryIndex(prev => {
        const newIndex = prev === null ? commandHistory.length - 1 : Math.max(prev - 1, 0);
        setCurrentLineInput(commandHistory[newIndex]);
        return newIndex;
      });
    } 
    else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHistoryIndex(prev => {
        if (prev === null) return null;
        const newIndex = prev + 1;
        if (newIndex >= commandHistory.length) {
          setCurrentLineInput('');
          return null;
        } else {
          setCurrentLineInput(commandHistory[newIndex]);
          return newIndex;
        }
      });
    } 
    else if (["ArrowLeft", "ArrowRight", "Delete"].includes(event.key)) {
      let charsToRightOfCursor = "";
      let cursorIndex = currentLineInput.length - (inputElement.selectionStart || 0);
      cursorIndex = clamp(cursorIndex, 0, currentLineInput.length);
  
      if (event.key === 'ArrowLeft') {
        if(cursorIndex > currentLineInput.length - 1) cursorIndex--;
        charsToRightOfCursor = currentLineInput.slice(currentLineInput.length - 1 - cursorIndex);
      } else if (event.key === 'ArrowRight' || event.key === 'Delete') {
        charsToRightOfCursor = currentLineInput.slice(currentLineInput.length - cursorIndex + 1);
      }
  
      const inputWidth = calculateInputWidth(inputElement, charsToRightOfCursor);
      setCursorPos(inputWidth);
    }
  };

  useEffect(() => {
    const storedHistory = localStorage.getItem('terminal-command-history');
    if (storedHistory) {
      setCommandHistory(JSON.parse(storedHistory));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('terminal-command-history', JSON.stringify(commandHistory));
  }, [commandHistory]);

  useEffect(() => {
    setCurrentLineInput(startingInputValue.trim());
  }, [startingInputValue]);

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
      <TopButtonsPanel {...{redBtnCallback, yellowBtnCallback, greenBtnCallback}}/>
      <div className="react-terminal" style={ { height } }>
        { children }
        { typeof onInput === 'function' && <div className="react-terminal-line react-terminal-input react-terminal-active-input" data-terminal-prompt={ prompt || '$' } key="terminal-line-prompt" >{ currentLineInput }<span className="cursor" style={{ left: `${cursorPos+1}px` }}></span></div> }
        <div ref={ scrollIntoViewRef }></div>
      </div>
      <input className="terminal-hidden-input" placeholder="Terminal Hidden Input" value={ currentLineInput } autoFocus={ onInput != null } onChange={ updateCurrentLineInput } onKeyDown={ handleInputKeyDown }/>
    </div>
  );
}

export { TerminalInput, TerminalOutput };
export default Terminal;
