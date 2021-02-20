import React, { useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from 'react';
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

  const lastLineRef = useRef<null | HTMLElement>(null)

  const updateCurrentLineInput = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentLineInput(event.target.value);
  }

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (props.onInput != null && event.key === 'Enter') {
      props.onInput(currentLineInput);
      setCurrentLineInput('');
    }
  }

  // An effect that handles scrolling into view the last line of terminal input or output
  useEffect(() => {
    setTimeout(() => lastLineRef?.current?.scrollIntoView({ behavior: "smooth" }), 500);
  }, [props.lineData.length]);

  // We use a hidden input to capture terminal input; make sure the hidden input is focused when clicking anywhere on the terminal
  useEffect(() => {
    // keep reference to listeners so we can perform cleanup
    const elListeners: { terminalEl: Element; listener: EventListenerOrEventListenerObject }[] = [];
    for (const terminalEl of document.getElementsByClassName('react-terminal-wrapper')) {
      const listener = () => (terminalEl?.querySelector('.terminal-hidden') as HTMLElement)?.focus();
      terminalEl?.addEventListener('click', listener);
      elListeners.push({ terminalEl, listener });
    }
    return function cleanup () {
      elListeners.forEach(elListener => {
        elListener.terminalEl.removeEventListener('click', elListener.listener);
      });
    }
  });

  const renderedLineData = props.lineData.map((ld, i) => {
    const classes = ['react-terminal-line'];
    if (ld.type === LineType.Input) {
      classes.push('react-terminal-input');
    }
    // `lastLineRef` is used to ensure the terminal scrolls into view to the last line; make sure to add the ref to the last
    // redendered line if input prompt is not shown, i.e. `onInput` is not declared; see 'render prompt' below
    if (props.lineData.length === i + 1 && props.onInput == null) {
      return (
        <span className={ classes.join(' ') } key={ i } ref={ lastLineRef }>{ ld.value }</span>
      );
    } else {
      return (
        <span className={ classes.join(' ') } key={ i }>{ ld.value }</span>
      );
    }
  });

  // render prompt
  if (props.onInput != null) {
    renderedLineData.push(
      <span className="react-terminal-line react-terminal-input react-terminal-active-input" data-terminal-prompt={ props.prompt || '$' } key={ props.lineData.length } ref={ lastLineRef }>{ currentLineInput }</span>,
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
          <input className="terminal-hidden" placeholder="Terminal Hidden Input" value={ currentLineInput } autoFocus={ props.onInput != null } onChange={ updateCurrentLineInput } onKeyDown={ handleEnter } />
        </div>
      </div>
    </div>
  );
}

export default Terminal;
