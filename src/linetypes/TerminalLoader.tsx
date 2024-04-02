import React, { PropsWithChildren, useEffect, useState } from "react";
export const loaderChars = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

type TerminalLoaderProps = PropsWithChildren<{
    loaderCharacters?: Array<string>
}>;


const TerminalLoader = ({ loaderCharacters = loaderChars }: TerminalLoaderProps) => {
    const [loaderIndex, setLoaderIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setLoaderIndex((loaderIndex + 1) % loaderCharacters.length);
        }, 100);
        return () => clearInterval(interval);
    }, [loaderIndex]);

    return (
        <div className="react-terminal-line react-terminal-loader">
            {loaderCharacters[loaderIndex]}
        </div>
    );
};

export default TerminalLoader;
