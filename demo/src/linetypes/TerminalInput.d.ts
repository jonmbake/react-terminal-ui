import React, { PropsWithChildren } from "react";
declare type TerminalInputProps = PropsWithChildren<{
    prompt?: string;
}>;
declare const TerminalInput: ({ children, prompt }: TerminalInputProps) => React.JSX.Element;
export default TerminalInput;
