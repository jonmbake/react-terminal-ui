import React from "react";

interface IWindowButtonsProps {
	redBtnCallback?: () => void;
	yellowBtnCallback?: () => void;
	greenBtnCallback?: () => void;
}

const WindowButtons = ({ redBtnCallback, yellowBtnCallback, greenBtnCallback }: IWindowButtonsProps) => (
	<div className="react-terminal-window-buttons">
		<button className={`${yellowBtnCallback ? "clickable": ""} red-btn`} disabled={!redBtnCallback} onClick={ redBtnCallback } />
		<button className={`${yellowBtnCallback ? "clickable" : ""} yellow-btn`} disabled={!yellowBtnCallback} onClick={ yellowBtnCallback } />
		<button className={`${greenBtnCallback ? "clickable" : ""} green-btn`} disabled={!greenBtnCallback} onClick={ greenBtnCallback } />
	</div>
);

export { WindowButtons, IWindowButtonsProps};
export default WindowButtons;