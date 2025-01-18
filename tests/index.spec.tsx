import React from 'react';
import Terminal, { ColorMode, TerminalInput, TerminalOutput } from '../src/index';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.useFakeTimers();

describe('Terminal component', () => {
  let scrollIntoViewFn: (arg?: boolean | ScrollIntoViewOptions) => void;

  beforeAll(() => {
    scrollIntoViewFn = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewFn;
  })

  test('Should render prompt', () => {
    const { container } = render(<Terminal onInput={ (input: string) => '' } />);
    expect(container.querySelectorAll('.react-terminal-line')).toHaveLength(1);
    expect(container.querySelector('.react-terminal-line.react-terminal-active-input[data-terminal-prompt="$"]')).not.toBeNull();
    expect(screen.getByPlaceholderText('Terminal Hidden Input')).toBeInTheDocument();
  });

  test('Should not render prompt if onInput prop is null or not defined', () => {
    const { container } = render(<Terminal onInput={ null }><TerminalOutput>Some terminal output</TerminalOutput></Terminal>);
    // Still renders output line...
    expect(container.querySelectorAll('.react-terminal-line')).toHaveLength(1);
    // ... but not the prompt
    expect(container.querySelector('.react-terminal-active-input')).toBeNull();
  });

  test('Should render terminal lines', () => {
    const { container } = render(
      <Terminal onInput={ (input: string) => '' }>
        <TerminalInput>Some terminal input</TerminalInput>,
        <TerminalOutput>Some terminal output</TerminalOutput>
      </Terminal>
    );
    expect(container.querySelectorAll('.react-terminal-line')).toHaveLength(3);
    let renderedLine = screen.getByText('Some terminal output');
    expect(renderedLine.className).toEqual('react-terminal-line');
    renderedLine = screen.getByText('Some terminal input');
    expect(renderedLine.className).toEqual('react-terminal-line react-terminal-input');
  });

  test('Input prompt should not scroll into view when component first loads', () => {
    render(
      <Terminal onInput={ (input: string) => '' }>
        <TerminalInput>Some terminal input</TerminalInput>,
        <TerminalOutput>Some terminal output</TerminalOutput>
      </Terminal>
    );
    jest.runAllTimers();
    expect(scrollIntoViewFn).not.toHaveBeenCalled();
  });

  test('Should accept input and scroll into view', () => {
    const onInput = jest.fn();
    const { rerender } = render(<Terminal onInput={ onInput }/>);
    const hiddenInput = screen.getByPlaceholderText('Terminal Hidden Input');
    fireEvent.change(hiddenInput, { target: { value: 'a' } });
    expect(screen.getByText('a').className).toEqual('react-terminal-line react-terminal-input react-terminal-active-input');
    screen.getByDisplayValue('a');
    expect(onInput.mock.calls.length).toEqual(0);
    fireEvent.keyDown(hiddenInput, { key: 'Enter', code: 'Enter' });
    expect(onInput).toHaveBeenCalledWith('a');
    rerender(<Terminal onInput={ onInput }><TerminalInput>a</TerminalInput></Terminal>)
    jest.runAllTimers();
    expect(scrollIntoViewFn).toHaveBeenCalledTimes(1);
  });

  test('Should support changing color mode', () => {
    const { container } = render(<Terminal colorMode={ ColorMode.Light } onInput={ (input: string) => '' }/>);
    expect(container.querySelector('.react-terminal-wrapper.react-terminal-light')).not.toBeNull();
  });

  test('Should focus if onInput is defined', () => {
    const { container } = render(<Terminal onInput={ (input: string) => '' }/>)
    expect(container.ownerDocument.activeElement?.nodeName).toEqual('INPUT');
    expect(container.ownerDocument.activeElement?.className).toEqual('terminal-hidden-input');
  });

  test('Should not focus if onInput is undefined', () => {
    const { container } = render(<Terminal />)
    expect(container.ownerDocument.activeElement?.nodeName).toEqual('BODY');
  });

  test('Should take starting input value', () => {
    render(<Terminal onInput={ (input: string) => '' } startingInputValue="cat file.txt " />)
    const renderedLine = screen.getByText('cat file.txt');
    expect(renderedLine.className).toContain('react-terminal-line');
  });

  test('Should render top button panel by default', () => {
    const { container } = render(<Terminal />);
    expect(container.querySelector('.react-terminal-window-buttons')).not.toBeNull();
  });

  test('Should not render top button panel if null props passed', () => {
    const { container } = render(<Terminal TopButtonsPanel={()=> null} />);
    expect(container.querySelector('.react-terminal-window-buttons')).toBeNull();
  });
});
