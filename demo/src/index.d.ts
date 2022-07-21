import { ReactNode } from 'react';
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
    colorMode?: ColorMode;
    children?: ReactNode;
    onInput?: ((input: string) => void) | null | undefined;
    startingInputValue?: string;
}
declare const Terminal: ({ name, prompt, colorMode, onInput, children, startingInputValue }: Props) => JSX.Element;
export { TerminalInput, TerminalOutput };
export default Terminal;
