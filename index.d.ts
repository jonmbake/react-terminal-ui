import React, { ReactNode, ReactElement } from 'react';
import TerminalInput from './linetypes/TerminalInput';
import TerminalOutput from './linetypes/TerminalOutput';
import './style.css';
import { IWindowButtonsProps } from "./ui-elements/WindowButtons";
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
    TopButtonsPanel?: (props: IWindowButtonsProps) => ReactElement | null;
}
declare const Terminal: ({ name, prompt, height, colorMode, onInput, children, startingInputValue, redBtnCallback, yellowBtnCallback, greenBtnCallback, TopButtonsPanel }: Props) => React.JSX.Element;
export { TerminalInput, TerminalOutput };
export default Terminal;
