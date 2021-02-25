/// <reference types="react" />
import './style.css';
export declare enum LineType {
    Input = 0,
    Output = 1
}
export declare enum ColorMode {
    Light = 0,
    Dark = 1
}
export interface Props {
    name?: string;
    prompt?: string;
    colorMode?: ColorMode;
    lineData: Array<{
        type: LineType;
        value: string;
    }>;
    onInput?: ((input: string) => void) | null | undefined;
}
declare const Terminal: ({ name, prompt, colorMode, lineData, onInput }: Props) => JSX.Element;
export default Terminal;
