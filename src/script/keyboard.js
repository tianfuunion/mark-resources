(function(window, storage, undefined) {
    'use strict'

    window.keyBoard = function() {
        var keyBoardDiv, keyBoard, commit, dialog, input, label, span, table, tbody, tr, td;
        var keyBoardClick, keyBoardDivClick, keyBoardTranstionEnd;
        var body = document.getElementsByTagName("body")[0];
        var keyModels = {
            SIMPLE: {
                COLS: 3,
                WIDTH: '33.3%',
                TYPE: 1,
                KEYS: [7, 8, 9, 4, 5, 6, 1, 2, 3, '-', 0, '<']
            },
            PLUS: {
                COLS: 4,
                WIDTH: '25%',
                TYPE: 1,
                KEYS: [7, 8, 9, 'C', 4, 5, 6, '↑', 1, 2, 3, '↓', '-', 0, '.', '<']
            }
        };

        var transtion;
        var currModel;
        var closeCB;
        var inputText = "",
            currText, fixed = 0,
            offset = -1;
        var popEvent = function() {
            this.closeKeyBoard(true);
        };
        var statusUtils = function() {
            var changing = false;
            return {
                setChanging: function(status) {
                    changing = status;
                },
                getChanging: function() {
                    return changing;
                }
            }
        }();

        return {
            openKeyBoard: openKeyBoard,
            closeKeyBoard: closeKeyBoard,
            keyModels: keyModels
        };

        function openKeyBoard(notice, initNumber, model, callbackEvery, callbackLast, openCallback, closeCallback) {
            if(statusUtils.getChanging()) {
                return false;
            }
            statusUtils.setChanging(true);
            var _this = this;

            /*****   处理返回事件    *******/
            if(window.history && window.history.pushState) {
                window.history.pushState(null, null, document.URL);
                window.addEventListener("popstate", popEvent.bind(_this), false);
            }
            /*****   处理返回事件结束    *******/

            // 参数置换
            if(typeof model === "function") {
                closeCallback = openCallback;
                openCallback = callbackLast;
                callbackLast = callbackEvery;
                callbackEvery = model;
                model = undefined;
            }

            // 关闭事件回调赋值
            closeCB = closeCallback;

            // UI
            model = model || keyModels.SIMPLE;
            if(!keyBoardDiv || model !== currModel) {
                inputText = "";
                currModel = model;

                if(keyBoardDiv) {
                    body.removeChild(keyBoardDiv);
                }

                // 键盘上的对话框
                dialog = document.createElement("DIV");
                label = document.createElement("DIV");
                span = document.createElement("SPAN");
                input = document.createElement("SPAN");
                commit = document.createElement("BUTTON");

                dialog.className = 'qs-keyBoard-dialog';
                commit.innerHTML = "完成";
                input.className = "qs-inset-input";
                input.style.textAlign = 'center';
                label.appendChild(input);
                label.appendChild(commit);
                dialog.appendChild(span);
                dialog.appendChild(label);

                keyBoardDiv = document.createElement("DIV");
                keyBoardDiv.className = "qs-key-board-bg";

                // 键盘部分
                keyBoard = document.createElement("DIV");
                table = document.createElement("TABLE");
                tbody = document.createElement("TBODY");
                keyBoard.className = "qs-key-board";
                keyBoard.id = 'qs-keyboard-id';
                table.border = '0';
                for(var i = 0; i < currModel.KEYS.length; i++) {
                    if(i % currModel.COLS === 0) {
                        tr = document.createElement("TR");
                    }
                    if(currModel.KEYS[i] || currModel.KEYS[i] === 0) {
                        td = document.createElement("TD");
                        td.style.width = currModel.WIDTH;
                        if(typeof(currModel.KEYS[i]) === "object") {
                            currModel.KEYS[i].icon ? td.className = currModel.KEYS[i].icon : td.innerHTML = currModel.KEYS[i].text;
                            currModel.KEYS[i].rows && td.setAttribute('rowspan', currModel.KEYS[i].rows);
                            td.setAttribute("qs-data-value", currModel.KEYS[i].text);
                        } else {
                            td.innerHTML = currModel.KEYS[i];
                            td.setAttribute("qs-data-value", currModel.KEYS[i]);
                        }
                        tr.appendChild(td);
                    }
                    if(i % currModel.COLS === currModel.COLS - 1) {
                        tbody.appendChild(tr);
                    }
                }
                table.appendChild(tbody);
                keyBoard.appendChild(dialog);
                keyBoard.appendChild(table);
                keyBoardDiv.appendChild(keyBoard);
                body.appendChild(keyBoardDiv);
            }

            input.innerHTML = inputText = (initNumber + "") || "";
            span.innerHTML = notice || '';

            //预移除事件（快速点击时动画误差）
            transtion = whichTransitionEvent(keyBoardDiv);//判断当前使用的事件类型
            if(keyBoardClick) {
                keyBoard.removeEventListener("click", keyBoardClick);
                keyBoardDiv.removeEventListener("click", keyBoardDivClick);
                keyBoardDiv.removeEventListener(transtion, keyBoardTranstionEnd);
            }

            // 监听事件
            keyBoardDivClick = function() {
                inputText = inputText === '-' ? '' : inputText;
                callbackLast && callbackLast(inputText ? Number(inputText) : '');
                _this.closeKeyBoard();
            };

            keyBoardClick = function(e) {
                switch(e.target.nodeName) {
                    case 'TD':
                        e.stopPropagation();
                        e.preventDefault();
                        doKeys(e);
                        break;
                    case 'BUTTON':
                        break;
                    default:
                        e.stopPropagation();
                        e.preventDefault();
                        break;
                }
            };

            keyBoardTranstionEnd = function() {
                statusUtils.setChanging(false);
                openCallback && openCallback();
            };

            function doKeys(e) {
                currText = e.target.getAttribute("qs-data-value");
                inputText = inputText === '0' ? '' : inputText;
                switch(currText) {
                    case '-':
                        inputText = inputText.indexOf('-') === -1 ? '-' + inputText : inputText.slice(1);
                        break;
                    case '.':
                        inputText = inputText ? inputText === '-' ? inputText = '-0.' : (inputText.indexOf('.') === -1 ? inputText + '.' : inputText) : '0.';
                        break;
                    case '<':
                        inputText = inputText ? inputText.slice(0, -1) : '';
                        break;
                    case 'C':
                        inputText = '';
                        break;
                    case '↑':
                        inputText = calcNumber(inputText, 2);
                        break;
                    case '↓':
                        inputText = calcNumber(inputText, 1);
                        break;
                    default:
                        inputText = inputText === '-0' ? '-' : inputText;
                        inputText += currText;
                        break;
                }
                input.innerHTML = inputText;
                callbackEvery && callbackEvery(inputText ? Number(inputText) : '');
            }

            function calcNumber(str, type) {
                str = str === '-' ? "0" : str;
                offset = str.indexOf('.');
                fixed = offset > -1 ? str.length - offset - 1 : 0;
                str = Math.round(Number(str) * Math.pow(10, fixed) + Math.pow(10, fixed) * Math.pow(-1, type)) / Math.pow(10, fixed);
                return str.toString();
            }

            // 注册监听事件
            keyBoard.addEventListener("click", keyBoardClick, false);
            keyBoardDiv.addEventListener("click", keyBoardDivClick, false);
            keyBoardDiv.addEventListener(transtion, keyBoardTranstionEnd, false);

            keyBoardDiv.className = "qs-key-board-bg";
            setTimeout(function(){
                keyBoardDiv.className = "qs-key-board-bg qs-keyboard-up";
            });
        }

        /**
         * 关闭键盘
         * @param doBack 是否执行一次回退（不是导航栏返回触发的需要执行一次回退）
         */
        function closeKeyBoard(doBack) {
            if(statusUtils.getChanging()) {
                return false;
            }
            statusUtils.setChanging(true);

            // 动画完成事件
            var closeKeyBoardTranstionEnd = function() {
                keyBoardDiv.className = "qs-key-board-bg display-none";
                statusUtils.setChanging(false);
                keyBoardDiv.removeEventListener(transtion, closeKeyBoardTranstionEnd);

                // 键盘关闭回调事件
                closeCB && closeCB();
            };
            keyBoardDiv.addEventListener(transtion, closeKeyBoardTranstionEnd, false);
            keyBoardDiv.className = "qs-key-board-bg";
            inputText = '';

            // 处理回退事件
            if(window.history && window.history.pushState) {
                if(!doBack) {
                    window.history.back();
                }
                window.removeEventListener("popstate", popEvent);
            }
            // 移除监听事件
            keyBoard.removeEventListener("click", keyBoardClick);
            keyBoardDiv.removeEventListener("click", keyBoardDivClick);
            keyBoardDiv.removeEventListener(transtion, keyBoardTranstionEnd);
        }

        function whichTransitionEvent(el) {
            var transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            }

            for(var t in transitions) {
                if(el.style[t] !== undefined) {
                    return transitions[t];
                }
            }
        }
    }();
})(window, window.localStorage)