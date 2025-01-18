[![CI](https://github.com/jonmbake/react-terminal-ui/workflows/CI/badge.svg)](https://github.com/jonmbake/react-terminal-ui/actions?query=workflow%3ACI)
[![Jest Code Coverage Report](jest-code-coverage-report.svg)](https://jonmbake.github.io/react-terminal-ui/coverage/)
[![Types TypeScript](types-type-script.svg)](https://github.com/jonmbake/react-terminal-ui/blob/gh-pages/index.d.ts)
[![CodeQL Scan](codeql-scan.svg)](https://github.com/jonmbake/react-terminal-ui/security/code-scanning?query=tool%3ACodeQL)

# React Terminal UI
A terminal [React](https://github.com/facebook/react) component with support for light and dark modes. Styling is courtesy of [termynal.js](https://github.com/ines/termynal).

Check out the **[Demo](https://jonmbake.github.io/react-terminal-ui/demo/)** :heart_eyes:

![React Terminal UI Demo Dark](https://github.com/jonmbake/screenshots/raw/master/react-terminal-ui/react-terminal-ui-demo-dark.png)

![React Terminal UI Demo Light](https://github.com/jonmbake/screenshots/raw/master/react-terminal-ui/react-terminal-ui-demo-light.png)

## Installation

```
npm install --save react-terminal-ui
```

## Usage

React Terminal UI is a "dumb component"—it renders whatever props you pass in. Typically, you'll want a controller component to manage the terminal's state. For example:

```jsx
import React, { useState } from 'react';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';

const TerminalController = () => {
  const [terminalLineData, setTerminalLineData] = useState([
    <TerminalOutput>Welcome to the React Terminal UI Demo!</TerminalOutput>,
  ]);

  // Terminal has 100% width by default, so it should usually be wrapped in a container div
  return (
    <div className="container">
      <Terminal
        name="React Terminal Usage Example"
        colorMode={ColorMode.Light}
        onInput={(terminalInput) =>
          console.log(`New terminal input received: '${terminalInput}'`)
        }
      >
        {terminalLineData}
      </Terminal>
    </div>
  );
};
```

## Component Props

| Name                 | Description                                                                                                                                                                                                                            |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`               | Name of the terminal. Displays at the top of the rendered component. In the demo, the name is set to React Terminal UI.                                                                                                                |
| `colorMode`          | Terminal color mode—either Light or Dark. Defaults to Dark.                                                                                                                                                                            |
| `onInput`            | An optional callback function that is invoked when a user presses enter on the prompt. The function is passed the current prompt input. If the `onInput` prop is not provided, the prompt input line will not display in the terminal. |
| `startingInputValue` | Starting input value. If this prop changes, any user-entered input will be overridden by this value. Defaults to an empty string (`""`).                                                                                               |
| `prompt`             | The prompt character. Defaults to `$`.                                                                                                                                                                                                 |
| `height`             | Height of the terminal. Defaults to `600px`.                                                                                                                                                                                           |
| `redBtnCallback`     | Optional callback function for the red button. If provided, the function will be invoked when the red button is clicked.                                                                                                               |
| `yellowBtnCallback`  | Optional callback function for the yellow button. If provided, the function will be invoked when the yellow button is clicked.                                                                                                         |
| `greenBtnCallback`   | Optional callback function for the green button. If provided, the function will be invoked when the green button is clicked.                                                                                                           |
| `TopButtonsPanel`    | Optional - way to control which buttons are displayed in the top buttons panel. Pass `TopButtonsPanel={()=> null}` to hide top buttons panel.                                                                                          |


### Development

After running `npm install`, ensure that peer dependencies are installed by executing `npm run install-peers`.

## License

[MIT](https://opensource.org/licenses/MIT)

Termynal.js is also licensed under MIT, Copyright (C) 2017 Ines Montani.
