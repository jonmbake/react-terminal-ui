import React from 'react';
import Terminal, { LineType } from '..';
import { render, fireEvent, screen } from '@testing-library/react';

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn()
})

test('Should render prompt', () => {
  const { container } = render(<Terminal lineData={ [] } onInput={ (input: string) => '' }/>);
  expect(container.querySelectorAll('span')).toHaveLength(1);
  expect(container.querySelector('span.react-terminal-line.react-terminal-input[data-terminal-prompt="$"]')).not.toBeNull();
  screen.getByLabelText('Terminal Hidden Input');
});

test('Should render line data', () => {
  const lineData = [{type: LineType.Output, value: 'Some terminal output'}];
  const { container } = render(<Terminal lineData={ lineData } onInput={ (input: string) => '' }/>);
  expect(container.querySelectorAll('span')).toHaveLength(2);
  const renderedLine = screen.getByText('Some terminal output');
  expect(renderedLine.className).toEqual('react-terminal-line');
});

test('Should accept input', () => {
  const onInput = jest.fn();
  render(<Terminal lineData={ [] } onInput={ onInput }/>);
  const hiddenInput = screen.getByLabelText('Terminal Hidden Input');
  fireEvent.keyDown(hiddenInput, { key: 'a', code: 'KeyA' });
  expect(screen.getByText('a').className).toEqual('react-terminal-line react-terminal-input');
  screen.getByDisplayValue('a');
  expect(onInput.mock.calls.length).toEqual(0);
  fireEvent.keyDown(hiddenInput, { key: 'Enter', code: 'Enter' });
  expect(onInput).toHaveBeenCalledWith('a');
});

test('Should delete input on Backspace', () => {
  render(<Terminal lineData={ [] } onInput={ (input: string) => '' }/>);
  const hiddenInput = screen.getByLabelText('Terminal Hidden Input');
  fireEvent.keyDown(hiddenInput, { key: 'a', code: 'KeyA' });
  fireEvent.keyDown(hiddenInput, { key: 'b', code: 'KeyB' });
  fireEvent.keyDown(hiddenInput, { key: 'c', code: 'KeyC' });
  fireEvent.keyDown(hiddenInput, { key: 'Backspace', code: 'Backspace' });
  expect(screen.getByText('ab').className).toEqual('react-terminal-line react-terminal-input');
  screen.getByDisplayValue('ab');
});