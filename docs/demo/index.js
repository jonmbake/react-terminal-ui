(function (React, ReactDOM) {
    'use strict';

    var React__default = 'default' in React ? React['default'] : React;
    ReactDOM = ReactDOM && Object.prototype.hasOwnProperty.call(ReactDOM, 'default') ? ReactDOM['default'] : ReactDOM;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css_248z = "/**\n * Modfied version of [termynal.js](https://github.com/ines/termynal/blob/master/termynal.css).\n *\n * @author Ines Montani <ines@ines.io>\n * @version 0.0.1\n * @license MIT\n */\n .react-terminal-wrapper {\n  width: 100%;\n  background: #252a33;\n  color: #eee;\n  font-size: 18px;\n  font-family: 'Fira Mono', Consolas, Menlo, Monaco, 'Courier New', Courier, monospace;\n  border-radius: 4px;\n  padding: 75px 45px 35px;\n  position: relative;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n }\n\n.react-terminal {\n  height: 600px;\n  overflow: auto;\n  display: flex;\n  flex-direction: column;\n}\n\n.react-terminal-wrapper.react-terminal-light {\n  background: #ddd;\n  color: #1a1e24;\n}\n\n.react-terminal-wrapper:before {\n  content: '';\n  position: absolute;\n  top: 15px;\n  left: 15px;\n  display: inline-block;\n  width: 15px;\n  height: 15px;\n  border-radius: 50%;\n  /* A little hack to display the window buttons in one pseudo element. */\n  background: #d9515d;\n  -webkit-box-shadow: 25px 0 0 #f4c025, 50px 0 0 #3ec930;\n          box-shadow: 25px 0 0 #f4c025, 50px 0 0 #3ec930;\n}\n\n.react-terminal-wrapper:after {\n  content: attr(data-terminal-name);\n  position: absolute;\n  color: #a2a2a2;\n  top: 5px;\n  left: 0;\n  width: 100%;\n  text-align: center;\n}\n\n.react-terminal-wrapper.react-terminal-light:after {\n  color: #D76D77;\n}\n\n.react-terminal-line {\n  display: block;\n  line-height: 1.5;\n}\n\n.react-terminal-line:before {\n  /* Set up defaults and ensure empty lines are displayed. */\n  content: '';\n  display: inline-block;\n  vertical-align: middle;\n  color: #a2a2a2;\n}\n\n.react-terminal-light .react-terminal-line:before {\n  color: #D76D77;\n}\n\n.react-terminal-input:before {\n  margin-right: 0.75em;\n  content: '$';\n}\n\n.react-terminal-input[data-terminal-prompt]:before {\n  content: attr(data-terminal-prompt);\n}\n\n.react-terminal-input:last-child:after {\n  content: '▋';\n  font-family: monospace;\n  margin-left: 0.2em;\n  -webkit-animation: blink 1s infinite;\n          animation: blink 1s infinite;\n}\n\n/* Cursor animation */\n\n@-webkit-keyframes blink {\n  50% {\n      opacity: 0;\n  }\n}\n\n@keyframes blink {\n  50% {\n      opacity: 0;\n  }\n}\n\n.hidden-input-wrapper {\n  overflow: hidden;\n  position: relative;\n}\n\n.hidden-input {\n    position: absolute;\n}\n/* .react-terminal-progress {\n  display: flex;\n  margin: .5rem 0;\n}\n\n.react-terminal-progress-bar {\n  background-color: #fff;\n  border-radius: .25rem;\n  width: 25%;\n}\n\n.react-terminal-wrapper.react-terminal-light .react-terminal-progress-bar {\n  background-color: #000;\n} */\n";
    styleInject(css_248z);

    var LineType;
    (function (LineType) {
        LineType[LineType["Input"] = 0] = "Input";
        LineType[LineType["Output"] = 1] = "Output";
    })(LineType || (LineType = {}));
    var ColorMode;
    (function (ColorMode) {
        ColorMode[ColorMode["Light"] = 0] = "Light";
        ColorMode[ColorMode["Dark"] = 1] = "Dark";
    })(ColorMode || (ColorMode = {}));
    var Terminal = function (props) {
        var _a = React.useState(''), currentLineInput = _a[0], setCurrentLineInput = _a[1];
        var lastInputRef = React.useRef(null);
        var handleKeyPress = function (event) {
            if (props.onInput != null && event.key === 'Enter') {
                props.onInput(currentLineInput);
                setCurrentLineInput('');
            }
            else if (event.key === 'Backspace' && currentLineInput.length > 0) {
                setCurrentLineInput(currentLineInput.slice(0, -1));
            }
            else if (event.key.length === 1) {
                setCurrentLineInput(currentLineInput + event.key);
            }
        };
        React.useEffect(function () { var _a; return (_a = lastInputRef === null || lastInputRef === void 0 ? void 0 : lastInputRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" }); }, [props.onInput]);
        var renderedLineData = props.lineData.map(function (ld, i) {
            var classes = ['react-terminal-line'];
            if (ld.type === LineType.Input) {
                classes.push('react-terminal-input');
            }
            return (React__default.createElement("span", { className: classes.join(' '), key: i }, ld.value));
        });
        if (props.onInput != null) {
            renderedLineData.push(React__default.createElement("span", { className: "react-terminal-line react-terminal-input", "data-terminal-prompt": props.prompt || '$', key: props.lineData.length, ref: lastInputRef }, currentLineInput));
        }
        var classes = ['react-terminal-wrapper'];
        if (props.colorMode === ColorMode.Light) {
            classes.push('react-terminal-light');
        }
        return (React__default.createElement("div", { className: classes.join(' '), "data-terminal-name": props.name },
            React__default.createElement("div", { className: "react-terminal" }, renderedLineData),
            React__default.createElement("div", { className: "hidden-input-wrapper" },
                React__default.createElement("div", { className: "hidden-input" },
                    React__default.createElement("label", { htmlFor: "terminal-hidden" }, "Terminal Hidden Input"),
                    React__default.createElement("input", { id: "terminal-hidden", value: currentLineInput, autoFocus: props.onInput != null, onBlur: function (e) { return e.target.focus(); }, onKeyDown: handleKeyPress, readOnly: true })))));
    };

    var css_248z$1 = "body {\n  padding-top: 5rem;\n}\n";
    styleInject(css_248z$1);

    var TerminalController = function (props) {
        var _a = React.useState(ColorMode.Dark), colorMode = _a[0], setColorMode = _a[1];
        var _b = React.useState([
            { type: LineType.Output, value: 'Welcome to the React Terminal UI Demo!' },
            { type: LineType.Output, value: '' },
            { type: LineType.Output, value: 'The following example commands are provided:' },
            { type: LineType.Output, value: '\'view-source\' will navigate to the React Terminal UI github source.' },
            { type: LineType.Output, value: '\'view-react-docs\' will naviagate to the react docs.' },
            { type: LineType.Output, value: '\'clear\' will clear the terminal.' },
        ]), lineData = _b[0], setLineData = _b[1];
        function toggleColorMode(e) {
            e.preventDefault();
            setColorMode(colorMode === ColorMode.Light ? ColorMode.Dark : ColorMode.Light);
        }
        function onInput(input) {
            var ld = __spreadArrays(lineData);
            ld.push({ type: LineType.Input, value: input });
            if (input.toLocaleLowerCase() === 'view-source') {
                window.open('https://github.com/jonmbake/react-terminal-ui', '_blank');
            }
            else if (input.toLocaleLowerCase() === 'view-react-docs') {
                window.open('https://reactjs.org/docs/getting-started.html', '_blank');
            }
            else if (input.toLocaleLowerCase() === 'clear') {
                ld = [];
            }
            else if (input) {
                ld.push({ type: LineType.Output, value: 'Unrecognized command' });
            }
            setLineData(ld);
        }
        var btnClasses = ['btn'];
        if (colorMode === ColorMode.Light) {
            btnClasses.push('btn-dark');
        }
        else {
            btnClasses.push('btn-light');
        }
        return (React__default.createElement("div", { className: "container" },
            React__default.createElement("div", { className: "d-flex flex-row-reverse p-2" },
                React__default.createElement("button", { className: btnClasses.join(' '), onClick: toggleColorMode },
                    "Enable ",
                    colorMode === ColorMode.Light ? 'Dark' : 'Light',
                    " Mode")),
            React__default.createElement(Terminal, { name: 'React Terminal UI', colorMode: colorMode, lineData: lineData, onInput: onInput })));
    };
    ReactDOM.render(React__default.createElement(React__default.StrictMode, null,
        React__default.createElement(TerminalController, null)), document.getElementById('terminal'));

}(React, ReactDOM));
//# sourceMappingURL=index.js.map
