import React, { ReactNode } from 'react';
import TerminalInput from './linetypes/TerminalInput';
import TerminalOutput from './linetypes/TerminalOutput';
import './style.css';
export declare enum ColorMode {
    Light = 0,
    Dark = 1
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
    scrollToPosition?: boolean;
}
declare const Terminal: ({ name, prompt, height, colorMode, onInput, children, startingInputValue, redBtnCallback, yellowBtnCallback, greenBtnCallback, scrollToPosition }: Props) => React.JSX.Element;
export { TerminalInput, TerminalOutput };
export default Terminal;
