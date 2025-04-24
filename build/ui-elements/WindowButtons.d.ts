import React from "react";
interface IWindowButtonsProps {
    redBtnCallback?: () => void;
    yellowBtnCallback?: () => void;
    greenBtnCallback?: () => void;
}
declare const WindowButtons: ({ redBtnCallback, yellowBtnCallback, greenBtnCallback }: IWindowButtonsProps) => React.JSX.Element;
export { WindowButtons, IWindowButtonsProps };
export default WindowButtons;
