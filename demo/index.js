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

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
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

    var css_248z = "/**\n * Modfied version of [termynal.js](https://github.com/ines/termynal/blob/master/termynal.css).\n *\n * @author Ines Montani <ines@ines.io>\n * @version 0.0.1\n * @license MIT\n */\n .react-terminal-wrapper {\n  width: 100%;\n  background: #252a33;\n  color: #eee;\n  font-size: 18px;\n  font-family: 'Fira Mono', Consolas, Menlo, Monaco, 'Courier New', Courier, monospace;\n  border-radius: 4px;\n  padding: 75px 45px 35px;\n  position: relative;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n }\n\n.react-terminal {\n  height: 600px;\n  overflow: auto;\n  display: flex;\n  flex-direction: column;\n}\n\n.react-terminal-wrapper.react-terminal-light {\n  background: #ddd;\n  color: #1a1e24;\n}\n\n.react-terminal-wrapper:before {\n  content: '';\n  position: absolute;\n  top: 15px;\n  left: 15px;\n  display: inline-block;\n  width: 15px;\n  height: 15px;\n  border-radius: 50%;\n  /* A little hack to display the window buttons in one pseudo element. */\n  background: #d9515d;\n  -webkit-box-shadow: 25px 0 0 #f4c025, 50px 0 0 #3ec930;\n          box-shadow: 25px 0 0 #f4c025, 50px 0 0 #3ec930;\n}\n\n.react-terminal-wrapper:after {\n  content: attr(data-terminal-name);\n  position: absolute;\n  color: #a2a2a2;\n  top: 5px;\n  left: 0;\n  width: 100%;\n  text-align: center;\n}\n\n.react-terminal-wrapper.react-terminal-light:after {\n  color: #D76D77;\n}\n\n.react-terminal-line {\n  display: block;\n  line-height: 1.5;\n}\n\n.react-terminal-line:before {\n  /* Set up defaults and ensure empty lines are displayed. */\n  content: '';\n  display: inline-block;\n  vertical-align: middle;\n  color: #a2a2a2;\n}\n\n.react-terminal-light .react-terminal-line:before {\n  color: #D76D77;\n}\n\n.react-terminal-input:before {\n  margin-right: 0.75em;\n  content: '$';\n}\n\n.react-terminal-input[data-terminal-prompt]:before {\n  content: attr(data-terminal-prompt);\n}\n\n.react-terminal-wrapper:focus-within .react-terminal-active-input:after {\n  content: '▋';\n  font-family: monospace;\n  margin-left: 0.2em;\n  -webkit-animation: blink 1s infinite;\n          animation: blink 1s infinite;\n}\n\n/* Cursor animation */\n\n@-webkit-keyframes blink {\n  50% {\n      opacity: 0;\n  }\n}\n\n@keyframes blink {\n  50% {\n      opacity: 0;\n  }\n}\n\n.hidden-input-wrapper {\n  overflow: hidden;\n  position: relative;\n}\n\n.hidden-input {\n    position: fixed;\n}\n\n/* .react-terminal-progress {\n  display: flex;\n  margin: .5rem 0;\n}\n\n.react-terminal-progress-bar {\n  background-color: #fff;\n  border-radius: .25rem;\n  width: 25%;\n}\n\n.react-terminal-wrapper.react-terminal-light .react-terminal-progress-bar {\n  background-color: #000;\n} */\n";
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
    var Terminal = function (_a) {
        var name = _a.name, prompt = _a.prompt, colorMode = _a.colorMode, lineData = _a.lineData, onInput = _a.onInput, _b = _a.startingInputValue, startingInputValue = _b === void 0 ? "" : _b;
        var _c = __read(React.useState(''), 2), currentLineInput = _c[0], setCurrentLineInput = _c[1];
        var lastLineRef = React.useRef(null);
        var updateCurrentLineInput = function (event) {
            setCurrentLineInput(event.target.value);
        };
        var handleEnter = function (event) {
            if (onInput != null && event.key === 'Enter') {
                onInput(currentLineInput);
                setCurrentLineInput('');
            }
        };
        React.useEffect(function () {
            setCurrentLineInput(startingInputValue.trim());
        }, [startingInputValue]);
        // An effect that handles scrolling into view the last line of terminal input or output
        var performScrolldown = React.useRef(false);
        React.useEffect(function () {
            if (performScrolldown.current) { // skip scrolldown when the component first loads
                setTimeout(function () { var _a; return (_a = lastLineRef === null || lastLineRef === void 0 ? void 0 : lastLineRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, 500);
            }
            performScrolldown.current = true;
        }, [lineData.length]);
        // We use a hidden input to capture terminal input; make sure the hidden input is focused when clicking anywhere on the terminal
        React.useEffect(function () {
            var e_1, _a;
            if (onInput == null) {
                return;
            }
            // keep reference to listeners so we can perform cleanup
            var elListeners = [];
            var _loop_1 = function (terminalEl) {
                var listener = function () { var _a; return (_a = terminalEl === null || terminalEl === void 0 ? void 0 : terminalEl.querySelector('.terminal-hidden')) === null || _a === void 0 ? void 0 : _a.focus(); };
                terminalEl === null || terminalEl === void 0 ? void 0 : terminalEl.addEventListener('click', listener);
                elListeners.push({ terminalEl: terminalEl, listener: listener });
            };
            try {
                for (var _b = __values(document.getElementsByClassName('react-terminal-wrapper')), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var terminalEl = _c.value;
                    _loop_1(terminalEl);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return function cleanup() {
                elListeners.forEach(function (elListener) {
                    elListener.terminalEl.removeEventListener('click', elListener.listener);
                });
            };
        }, [onInput]);
        var renderedLineData = lineData.map(function (ld, i) {
            var classes = ['react-terminal-line'];
            if (ld.type === LineType.Input) {
                classes.push('react-terminal-input');
            }
            // `lastLineRef` is used to ensure the terminal scrolls into view to the last line; make sure to add the ref to the last
            // redendered line if input prompt is not shown, i.e. `onInput` is not declared; see 'render prompt' below
            if (lineData.length === i + 1 && onInput == null) {
                return (React__default.createElement("span", { className: classes.join(' '), key: i, ref: lastLineRef }, ld.value));
            }
            else {
                return (React__default.createElement("span", { className: classes.join(' '), key: i }, ld.value));
            }
        });
        // render prompt
        if (onInput != null) {
            renderedLineData.push(React__default.createElement("span", { className: "react-terminal-line react-terminal-input react-terminal-active-input", "data-terminal-prompt": prompt || '$', key: lineData.length, ref: lastLineRef }, currentLineInput));
        }
        var classes = ['react-terminal-wrapper'];
        if (colorMode === ColorMode.Light) {
            classes.push('react-terminal-light');
        }
        return (React__default.createElement("div", { className: classes.join(' '), "data-terminal-name": name },
            React__default.createElement("div", { className: "react-terminal" }, renderedLineData),
            React__default.createElement("div", { className: "hidden-input-wrapper" },
                React__default.createElement("div", { className: "hidden-input" },
                    React__default.createElement("input", { className: "terminal-hidden", placeholder: "Terminal Hidden Input", value: currentLineInput, autoFocus: onInput != null, onChange: updateCurrentLineInput, onKeyDown: handleEnter })))));
    };

    var css_248z$1 = "body {\n  padding-top: 5rem;\n}\n";
    styleInject(css_248z$1);

    var TerminalController = function (props) {
        var _a = __read(React.useState(ColorMode.Dark), 2), colorMode = _a[0], setColorMode = _a[1];
        var _b = __read(React.useState([
            { type: LineType.Output, value: 'Welcome to the React Terminal UI Demo!' },
            { type: LineType.Output, value: '' },
            { type: LineType.Output, value: 'The following example commands are provided:' },
            { type: LineType.Output, value: '\'view-source\' will navigate to the React Terminal UI github source.' },
            { type: LineType.Output, value: '\'view-react-docs\' will naviagate to the react docs.' },
            { type: LineType.Output, value: '\'clear\' will clear the terminal.' },
        ]), 2), lineData = _b[0], setLineData = _b[1];
        function toggleColorMode(e) {
            e.preventDefault();
            setColorMode(colorMode === ColorMode.Light ? ColorMode.Dark : ColorMode.Light);
        }
        function onInput(input) {
            var ld = __spread(lineData);
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
