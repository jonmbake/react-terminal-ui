import React, { PropsWithChildren } from "react";
import TerminalLoader from "./TerminalLoader";

type TerminalProgressProps = PropsWithChildren<{
    progressPercentage?: number;
    progressLength?: number;
    progressChar?: string;
}>;

const TerminalProgress = ({
    progressPercentage = 0,
    progressLength = 20,
    progressChar = "█",
}: TerminalProgressProps) => {
    return (
        <div
            className="react-terminal-line react-terminal-progress"
            data-terminal-percentage={progressPercentage || 0}
        >
            <span className="react-terminal-progress-filled">
                {progressChar.repeat(progressPercentage * progressLength)}
            </span>
            <span className="react-terminal-progress-empty">
                {progressChar.repeat(
                    progressLength - progressPercentage * progressLength
                )}
            </span>
            <TerminalLoader />
            <span className="react-terminal-progress-label">{Math.round(progressPercentage * 100).toString()}%</span>
        </div>
    );
};

export default TerminalProgress;
