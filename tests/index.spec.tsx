import React from 'react';
import Terminal, { LineType, ColorMode } from '../src/index';
import { render, fireEvent, screen, getByText  } from '@testing-library/react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

jest.useFakeTimers();

describe('Terminal component', () => {
  let scrollIntoViewFn: (arg?: boolean | ScrollIntoViewOptions) => void;

  beforeAll(() => {
    scrollIntoViewFn = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewFn;
  })

  test('Should render prompt', () => {
    const { container } = render(<Terminal lineData={ [] } onInput={ (input: string) => '' }/>);
    expect(container.querySelectorAll('span')).toHaveLength(1);
    expect(container.querySelector('span.react-terminal-line.react-terminal-active-input[data-terminal-prompt="$"]')).not.toBeNull();
    screen.getByPlaceholderText('Terminal Hidden Input');
  });

  test('Should not render prompt if onInput prop is null or not defined', () => {
    const { container } = render(<Terminal lineData={ [{type: LineType.Output, value: 'Some terminal output'}] } onInput={ null }/>);
    // Still renders output line...
    expect(container.querySelectorAll('span.react-terminal-line')).toHaveLength(1);
    // ... but not the prompt
    expect(container.querySelector('span.react-terminal-active-input')).toBeNull();
  });

  test('Should render line data', () => {
    const lineData = [
      {type: LineType.Input, value: 'Some terminal input'},
      {type: LineType.Output, value: 'Some terminal output'}
   ];
    const { container } = render(<Terminal lineData={ lineData } onInput={ (input: string) => '' }/>);
    expect(container.querySelectorAll('span')).toHaveLength(3);
    let renderedLine = screen.getByText('Some terminal output');
    expect(renderedLine.className).toEqual('react-terminal-line');
    renderedLine = screen.getByText('Some terminal input');
    expect(renderedLine.className).toEqual('react-terminal-line react-terminal-input');
  });

  test('Should accept input and scroll into view', () => {
    const onInput = jest.fn();
    render(<Terminal lineData={ [] } onInput={ onInput }/>);
    const hiddenInput = screen.getByPlaceholderText('Terminal Hidden Input');
    fireEvent.change(hiddenInput, { target: { value: 'a' } });
    expect(screen.getByText('a').className).toEqual('react-terminal-line react-terminal-input react-terminal-active-input');
    screen.getByDisplayValue('a');
    expect(onInput.mock.calls.length).toEqual(0);
    fireEvent.keyDown(hiddenInput, { key: 'Enter', code: 'Enter' });
    expect(onInput).toHaveBeenCalledWith('a');
    jest.runAllTimers();
    expect(scrollIntoViewFn).toHaveBeenCalled();
  });

  test('Should support changing color mode', () => {
    const { container } = render(<Terminal colorMode={ ColorMode.Light } lineData={ [] } onInput={ (input: string) => '' }/>);
    expect(container.querySelector('.react-terminal-wrapper.react-terminal-light')).not.toBeNull();
  });

  test('Should focus if onInput is defined', () => {
    const { container } = render(<Terminal lineData={ [] } onInput={ (input: string) => '' }/>)
    expect(container.ownerDocument.activeElement?.nodeName).toEqual('INPUT');
    expect(container.ownerDocument.activeElement?.className).toEqual('terminal-hidden');
  });

  test('Should not focus if onInput is undefined', () => {
    const { container } = render(<Terminal lineData={ [] } />)
    expect(container.ownerDocument.activeElement?.nodeName).toEqual('BODY');
  });

  test('Should take starting input value', () => {
    render(<Terminal lineData={ [] } onInput={ (input: string) => '' } startingInputValue="cat file.txt " />)
    const hiddenInput = screen.getByPlaceholderText('Terminal Hidden Input');
    const renderedLine = screen.getByText('cat file.txt');
    expect(renderedLine.className).toContain('react-terminal-line');
  });
});