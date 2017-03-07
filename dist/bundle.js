/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var resetRack = function () {
  var nineBall = document.querySelectorAll('.ball-9');
  var rack = document.querySelector('.rack');
  var ballArray = document.querySelectorAll('.ball');
  var rackButtons = document.querySelector('.rack-buttons');
  var resetRackLink = document.querySelector('.next-rack');
  var deadBallScore = document.querySelector('.dead-ball-score');

  var showRackButtons = function showRackButtons() {
    rackButtons.classList.remove('hidden');
  };

  var hideRackButtons = function hideRackButtons() {
    rackButtons.classList.add('hidden');
  };

  var resetRack = function resetRack() {
    for (var i = 0; i < ballArray.length; i++) {
      ballArray[i].classList.remove('active');
      ballArray[i].classList.remove('inactive');
      ballArray[i].classList.remove('dead');
      ballArray[i].classList.add('neutral');
    }
  };

  var resetInnings = function resetInnings() {
    var innings = document.querySelector('.number-innings');
    innings.innerHTML = 0;
  };

  var resetDeadBalls = function resetDeadBalls() {
    deadBallScore.innerHTML = 0;
  };

  document.body.addEventListener('click', function (ev) {
    if (ev.target.classList.contains('next-rack')) {
      resetRack();
      resetInnings();
      resetDeadBalls();
      rack.innerHTML++;
      hideRackButtons();
    }
  });

  return {
    showRackButtons: showRackButtons,
    hideRackButtons: hideRackButtons
  };
}();

module.exports = resetRack;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var scoring = __webpack_require__(4);

var diamond = function () {
  var ball = document.querySelectorAll('.ball');
  var deadBallScore = document.querySelector('.dead-ball-score');

  var _loop = function _loop(i) {
    // Dead Balls
    var mc = new Hammer(ball[i]);

    mc.on('press', function (ev) {
      var deadBallTarget = ev.target;
      var ballArray = Array.from(ball);
      var classListArray = Array.from(ev.target.classList);
      var targetClass = classListArray[1];

      /*  Prevents ball-9 from being marked dead
          Toggles dead state */
      if (deadBallTarget.classList.contains('neutral') && !deadBallTarget.classList.contains('ball-9')) {

        ballArray.filter(function (b) {
          return b.classList.contains(targetClass);
        }).forEach(function (b) {
          b.classList.add('dead');
          b.classList.remove('neutral');
        });
      } else if (deadBallTarget.classList.contains('dead')) {
        deadBallTarget.classList.remove('dead');

        ballArray.filter(function (b) {
          return b.classList.contains(targetClass);
        }).forEach(function (b) {
          b.classList.remove('dead');
          b.classList.add('neutral');
        });
        ev.target.click(); //this is a really stupid temporary fix. please don't let this live for very long.
      }
      var deadBalls = document.querySelectorAll('.left-grid .dead');
      deadBallScore.innerHTML = deadBalls.length;
    });

    // Active / Inactive
    ball[i].addEventListener('click', function (ev) {
      var evTarget = ev.target;
      var clickedTargetClassList = evTarget.classList;
      var ballLeft = ball[i].classList.contains('left');
      var ballRight = ball[i].classList.contains('right');

      // Determine left or right, then inactive the opposite
      if (ballLeft && clickedTargetClassList.contains('neutral')) {
        var opposite = document.querySelector('.' + clickedTargetClassList[1] + '.right');
        clickedTargetClassList.remove('neutral');
        opposite.classList.remove('neutral');
        opposite.classList.add('inactive');
        clickedTargetClassList.add('active');
        return;
      }
      if (ballLeft && clickedTargetClassList.contains('active')) {
        var _opposite = document.querySelector('.' + clickedTargetClassList[1] + '.right');
        _opposite.classList.remove('inactive');
        clickedTargetClassList.remove('active');
        _opposite.classList.add('neutral');
        clickedTargetClassList.add('neutral');
        return;
      }
      if (ballLeft && clickedTargetClassList.contains('inactive')) {
        var _opposite2 = document.querySelector('.' + clickedTargetClassList[1] + '.right');
        _opposite2.classList.remove('active');
        clickedTargetClassList.remove('inactive');
        _opposite2.classList.add('neutral');
        clickedTargetClassList.add('neutral');
        return;
      }
      if (ballRight && clickedTargetClassList.contains('neutral')) {
        var _opposite3 = document.querySelector('.' + clickedTargetClassList[1] + '.left');
        clickedTargetClassList.remove('neutral');
        _opposite3.classList.remove('neutral');
        _opposite3.classList.add('inactive');
        clickedTargetClassList.add('active');
        return;
      }
      if (ballRight && clickedTargetClassList.contains('active')) {
        var _opposite4 = document.querySelector('.' + clickedTargetClassList[1] + '.left');
        _opposite4.classList.remove('inactive');
        clickedTargetClassList.remove('active');
        _opposite4.classList.add('neutral');
        clickedTargetClassList.add('neutral');
        return;
      }
      if (ballRight && clickedTargetClassList.contains('inactive')) {
        var _opposite5 = document.querySelector('.' + clickedTargetClassList[1] + '.left');
        _opposite5.classList.remove('active');
        clickedTargetClassList.remove('inactive');
        _opposite5.classList.add('neutral');
        clickedTargetClassList.add('neutral');
        return;
      }
    });
  };

  for (var i = 0; i < ball.length; i++) {
    _loop(i);
  }
}();

module.exports = diamond;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var incrementer = function () {
  var incrementButton = document.querySelectorAll('.increment');
  var decrementButton = document.querySelectorAll('.decrement');

  var counter = function counter(increment, context) {
    if (increment) {
      var number = context.target.previousElementSibling;
      var numberHtml = number.innerHTML;
      numberHtml++;
    } else {
      var number = context.target.nextElementSibling;
      var numberHtml = number.innerHTML;
      if (numberHtml === '0') {
        return;
      }
      numberHtml--;
    }
    number.innerHTML = numberHtml;
  };

  for (var i = 0; i < incrementButton.length; i++) {
    incrementButton[i].addEventListener('click', counter.bind(null, true));
  }
  for (var _i = 0; _i < decrementButton.length; _i++) {
    decrementButton[_i].addEventListener('click', counter.bind(null, false));
  }
}();

module.exports = incrementer;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var resetRack = __webpack_require__(0);

var rackTable = function () {
  var table = document.querySelector('.rack-table');
  var nineBall = document.querySelectorAll('.ball-9');
  var rackNumber = document.querySelector('.rack');
  var playerOneScore = document.querySelector('.player-one-score');
  var playerTwoScore = document.querySelector('.player-two-score');
  var innings = document.querySelector('.number-innings');
  var deadBalls = document.querySelector('.dead-ball-score');
  var editScore = document.querySelector('.edit-score');
  var nextRack = document.querySelector('.next-rack');

  var createCell = function createCell(cell, text, style) {
    var div = document.createElement('div'); // create DIV element
    var txt = document.createTextNode(text); // create text node
    div.appendChild(txt); // append text node to the DIV
    div.setAttribute('class', style); // set DIV class attribute
    cell.appendChild(div); // append DIV to the table cell
  };
  var appendColumn = function appendColumn(ev) {
    if (ev.target.classList.contains('neutral')) {
      createCell(table.rows[0].insertCell(table.rows[0].cells.length), rackNumber.innerHTML, 'label');
      createCell(table.rows[1].insertCell(table.rows[1].cells.length), playerOneScore.innerHTML, 'col-' + 1);
      createCell(table.rows[2].insertCell(table.rows[2].cells.length), innings.innerHTML, 'innings-table col-' + 1);
      createCell(table.rows[3].insertCell(table.rows[3].cells.length), deadBalls.innerHTML, 'dead-ball-table');
      createCell(table.rows[4].insertCell(table.rows[4].cells.length), playerTwoScore.innerHTML, 'col-' + 1);
    } else {
      deleteColumn();
    }

    //adds rack-table-sm class to rack-table in order to restrict width and add scroll
    if (table.offsetWidth >= 250) {
      table.classList.add('rack-table-sm');
    }
  };
  var deleteColumn = function deleteColumn() {
    var lastCol = table.rows[0].cells.length - 1;

    for (var i = 0; i < table.rows.length; i++) {
      table.rows[i].deleteCell(lastCol);
    }
  };
  //decrements the score by 2 based on which nine ball is active, marks both nine balls neutral
  var nineBallsNeutral = function nineBallsNeutral() {
    for (var i = 0; i < nineBall.length; i++) {
      if (nineBall[i].classList.contains('active') && nineBall[i].classList.contains('left')) {
        playerOneScore.innerHTML = decrementPlayerScore(playerOneScore.innerHTML);
      }
      if (nineBall[i].classList.contains('active') && nineBall[i].classList.contains('right')) {
        playerTwoScore.innerHTML = decrementPlayerScore(playerTwoScore.innerHTML);
      }
      nineBall[i].classList.remove('active');
      nineBall[i].classList.remove('inactive');
      nineBall[i].classList.add('neutral');
    }
  };
  var decrementPlayerScore = function decrementPlayerScore(obj) {
    return obj - 2;
  };

  editScore.addEventListener('click', function () {
    deleteColumn();
    nineBallsNeutral();
    resetRack.hideRackButtons();
  });

  return {
    appendColumn: appendColumn,
    deleteColumn: deleteColumn
  };
}();

module.exports = rackTable;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*jshint esversion: 6 */
var rackTable = __webpack_require__(3);
var resetRack = __webpack_require__(0);

var scoring = function () {
    var ball = document.querySelectorAll('.ball');
    var playerOneScore = document.querySelector('.player-one-score');
    var playerTwoScore = document.querySelector('.player-two-score');
    var deadBalls = document.querySelector('.dead-ball-score');

    var playerOneSkill = document.querySelector('.skill-level.left');
    var playerTwoSkill = document.querySelector('.skill-level.right');
    var playerOneGoal = document.querySelector('#leftPlayerGoal');
    var playerTwoGoal = document.querySelector('#rightPlayerGoal');

    var increase = function increase(obj) {
        return obj + 1;
    };
    var decrease = function decrease(obj) {
        return obj - 1;
    };
    //calculates total number of dead balls in rack table and returns that value plus playerOneScore, playerTwoScore and current dead balls
    var calcScore = function calcScore() {
        var deadBallTable = document.querySelectorAll('.dead-ball-table') || 0;
        var deadBallTotal = 0;
        for (var i = 0; i < deadBallTable.length; i++) {
            deadBallTotal += Number(deadBallTable[i].innerHTML);
        }

        return Number(playerOneScore.innerHTML) + Number(playerTwoScore.innerHTML) + Number(deadBalls.innerHTML) + Number(deadBallTotal);
    };

    for (var i = 0; i < ball.length; i++) {
        ball[i].addEventListener('click', function (ev) {
            var evTarget = ev.target;
            // If ballLeft
            if (evTarget.classList.contains('left')) {
                if (evTarget.classList.contains('neutral')) {
                    playerOneScore.innerHTML = increase(new Number(playerOneScore.innerHTML));
                    if (evTarget.classList.contains('ball-9')) {
                        playerOneScore.innerHTML = increase(new Number(playerOneScore.innerHTML));
                        var currentScore = calcScore();
                        if (currentScore % 10 === 0) {
                            rackTable.appendColumn(ev);
                            resetRack.showRackButtons();
                        }
                        return;
                    }
                    //end of match checker
                    if (Number(playerOneScore.innerHTML) >= Number(playerOneGoal.innerHTML)) {
                        endOfMatch(1);
                    }
                    return;
                }
                if (evTarget.classList.contains('active')) {
                    playerOneScore.innerHTML = decrease(new Number(playerOneScore.innerHTML));
                    if (evTarget.classList.contains('ball-9')) {
                        playerOneScore.innerHTML = decrease(new Number(playerOneScore.innerHTML));
                        return;
                    }
                    return;
                }
                if (evTarget.classList.contains('inactive')) {
                    playerTwoScore.innerHTML = decrease(new Number(playerTwoScore.innerHTML));
                    if (evTarget.classList.contains('ball-9')) {
                        playerTwoScore.innerHTML = decrease(new Number(playerTwoScore.innerHTML));
                        return;
                    }
                    return;
                }
            }
            // If ballRight
            if (evTarget.classList.contains('right')) {
                if (evTarget.classList.contains('neutral')) {
                    playerTwoScore.innerHTML = increase(new Number(playerTwoScore.innerHTML));
                    if (evTarget.classList.contains('ball-9')) {
                        playerTwoScore.innerHTML = increase(new Number(playerTwoScore.innerHTML));
                        var _currentScore = calcScore();
                        if (_currentScore % 10 === 0) {
                            rackTable.appendColumn(ev);
                            resetRack.showRackButtons();
                        }
                        return;
                    }
                    //end of match checker
                    if (Number(playerTwoScore.innerHTML) >= Number(playerTwoGoal.innerHTML)) {
                        endOfMatch(2);
                    }
                    return;
                }
                if (evTarget.classList.contains('active')) {
                    playerTwoScore.innerHTML = decrease(new Number(playerTwoScore.innerHTML));
                    if (evTarget.classList.contains('ball-9')) {
                        playerTwoScore.innerHTML = decrease(new Number(playerTwoScore.innerHTML));
                        return;
                    }
                    return;
                }
                if (evTarget.classList.contains('inactive')) {
                    playerOneScore.innerHTML = decrease(new Number(playerOneScore.innerHTML));
                    if (evTarget.classList.contains('ball-9')) {
                        playerOneScore.innerHTML = decrease(new Number(playerOneScore.innerHTML));
                        return;
                    }
                }
            }
        });
    }

    playerOneSkill.addEventListener('change', function (ev) {
        switch (ev.currentTarget.value) {
            case "1":
                playerOneGoal.innerHTML = 14;
                break;
            case "2":
                playerOneGoal.innerHTML = 19;
                break;
            case "3":
                playerOneGoal.innerHTML = 25;
                break;
            case "4":
                playerOneGoal.innerHTML = 31;
                break;
            case "5":
                playerOneGoal.innerHTML = 38;
                break;
            case "6":
                playerOneGoal.innerHTML = 46;
                break;
            case "7":
                playerOneGoal.innerHTML = 55;
                break;
            case "8":
                playerOneGoal.innerHTML = 65;
                break;
            case "9":
                playerOneGoal.innerHTML = 75;
                break;
        }
    });
    playerTwoSkill.addEventListener('change', function (ev) {
        switch (ev.currentTarget.value) {
            case "1":
                playerTwoGoal.innerHTML = 14;
                break;
            case "2":
                playerTwoGoal.innerHTML = 19;
                break;
            case "3":
                playerTwoGoal.innerHTML = 25;
                break;
            case "4":
                playerTwoGoal.innerHTML = 31;
                break;
            case "5":
                playerTwoGoal.innerHTML = 38;
                break;
            case "6":
                playerTwoGoal.innerHTML = 46;
                break;
            case "7":
                playerTwoGoal.innerHTML = 55;
                break;
            case "8":
                playerTwoGoal.innerHTML = 65;
                break;
            case "9":
                playerTwoGoal.innerHTML = 75;
                break;
        }
    });

    var endOfMatch = function endOfMatch(winningPlayer) {
        var playerOneName = document.querySelector('#player-1-Name').innerHTML.toString();
        var playerTwoName = document.querySelector('#player-2-Name').innerHTML.toString();
        var playerOneSkillVal = document.querySelector('.skill-level.left option:checked').value;
        var playerTwoSkillVal = document.querySelector('.skill-level.right option:checked').value;

        if (!playerOneName) {
            playerOneName = "Player One";
        }

        if (!playerTwoName) {
            playerTwoName = "Player Two";
        }

        var inningsTable = document.querySelectorAll('.innings-table') || 0;
        var inningsTotal = 0;
        for (var i = 0; i < inningsTable.length; i++) {
            inningsTotal += Number(inningsTable[i].innerHTML);
        }
        inningsTotal += Number(document.querySelector(".number-innings").innerHTML);

        if (winningPlayer == 1) {
            var matchScore = calculateFinalScore(playerTwoSkillVal, playerTwoScore.innerHTML);
            alert(playerOneName + " wins! Match Points Earned: " + matchScore.winnerScore + " - " + matchScore.loserScore + " | Total Innings: " + inningsTotal);
        }
        if (winningPlayer == 2) {
            var _matchScore = calculateFinalScore(playerOneSkillVal, playerOneScore.innerHTML);
            alert(playerTwoName + " wins! Match Points Earned: " + _matchScore.winnerScore + " - " + _matchScore.loserScore + " | Total Innings: " + inningsTotal);
        }
    };

    var calculateFinalScore = function calculateFinalScore(loserSL, loserScore) {
        switch (loserSL) {
            case '1':
                switch (loserScore) {
                    case '0':
                    case '1':
                    case '2':
                        return {
                            winnerScore: 20,
                            loserScore: 0
                        };

                    case '3':
                        return {
                            winnerScore: 19,
                            loserScore: 1
                        };

                    case '4':
                        return {
                            winnerScore: 18,
                            loserScore: 2
                        };

                    case '5':
                    case '6':
                        return {
                            winnerScore: 17,
                            loserScore: 3
                        };

                    case '7':
                        return {
                            winnerScore: 16,
                            loserScore: 4
                        };

                    case '8':
                        return {
                            winnerScore: 15,
                            loserScore: 5
                        };

                    case '9':
                    case '10':
                        return {
                            winnerScore: 14,
                            loserScore: 6
                        };

                    case '11':
                        return {
                            winnerScore: 13,
                            loserScore: 7
                        };

                    case '12':
                    case '13':
                        return {
                            winnerScore: 12,
                            loserScore: 8
                        };
                }
                break;
            case '2':
                switch (loserScore) {
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                        return {
                            winnerScore: 20,
                            loserScore: 0
                        };

                    case '4':
                    case '5':
                        return {
                            winnerScore: 19,
                            loserScore: 1
                        };

                    case '6':
                    case '7':
                        return {
                            winnerScore: 18,
                            loserScore: 2
                        };

                    case '8':
                        return {
                            winnerScore: 17,
                            loserScore: 3
                        };

                    case '9':
                    case '10':
                        return {
                            winnerScore: 16,
                            loserScore: 4
                        };

                    case '11':
                    case '12':
                        return {
                            winnerScore: 15,
                            loserScore: 5
                        };

                    case '13':
                    case '14':
                        return {
                            winnerScore: 14,
                            loserScore: 6
                        };

                    case '15':
                    case '16':
                        return {
                            winnerScore: 13,
                            loserScore: 7
                        };

                    case '17':
                    case '18':
                        return {
                            winnerScore: 12,
                            loserScore: 8
                        };

                }
                break;
            case '3':
                switch (loserScore) {
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                        return {
                            winnerScore: 20,
                            loserScore: 0
                        };

                    case '5':
                    case '6':
                        return {
                            winnerScore: 19,
                            loserScore: 1
                        };

                    case '7':
                    case '8':
                    case '9':
                        return {
                            winnerScore: 18,
                            loserScore: 2
                        };

                    case '10':
                    case '11':
                        return {
                            winnerScore: 17,
                            loserScore: 3
                        };

                    case '12':
                    case '13':
                    case '14':
                        return {
                            winnerScore: 16,
                            loserScore: 4
                        };

                    case '15':
                    case '16':
                        return {
                            winnerScore: 15,
                            loserScore: 5
                        };

                    case '17':
                    case '18':
                    case '19':
                        return {
                            winnerScore: 14,
                            loserScore: 6
                        };

                    case '20':
                    case '21':
                        return {
                            winnerScore: 13,
                            loserScore: 7
                        };

                    case '22':
                    case '23':
                    case '24':
                        return {
                            winnerScore: 12,
                            loserScore: 8
                        };

                }
                break;
            case '4':
                switch (loserScore) {
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                        return {
                            winnerScore: 20,
                            loserScore: 0
                        };

                    case '6':
                    case '7':
                    case '8':
                        return {
                            winnerScore: 19,
                            loserScore: 1
                        };

                    case '9':
                    case '10':
                    case '11':
                        return {
                            winnerScore: 18,
                            loserScore: 2
                        };

                    case '12':
                    case '13':
                    case '14':
                        return {
                            winnerScore: 17,
                            loserScore: 3
                        };

                    case '15':
                    case '16':
                    case '17':
                    case '18':
                        return {
                            winnerScore: 16,
                            loserScore: 4
                        };

                    case '19':
                    case '20':
                    case '21':
                        return {
                            winnerScore: 15,
                            loserScore: 5
                        };

                    case '22':
                    case '23':
                    case '24':
                        return {
                            winnerScore: 14,
                            loserScore: 6
                        };

                    case '25':
                    case '26':
                    case '27':
                        return {
                            winnerScore: 13,
                            loserScore: 7
                        };

                    case '28':
                    case '29':
                    case '30':
                        return {
                            winnerScore: 12,
                            loserScore: 8
                        };

                }

                break;
            case '5':
                switch (loserScore) {
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                        return {
                            winnerScore: 20,
                            loserScore: 0
                        };

                    case '6':
                    case '7':
                    case '8':
                    case '9':
                    case '10':
                        return {
                            winnerScore: 19,
                            loserScore: 1
                        };

                    case '11':
                    case '12':
                    case '13':
                    case '14':
                        return {
                            winnerScore: 18,
                            loserScore: 2
                        };

                    case '15':
                    case '16':
                    case '17':
                    case '18':
                        return {
                            winnerScore: 17,
                            loserScore: 3
                        };

                    case '19':
                    case '20':
                    case '21':
                    case '22':
                        return {
                            winnerScore: 16,
                            loserScore: 4
                        };

                    case '23':
                    case '24':
                    case '25':
                    case '26':
                        return {
                            winnerScore: 15,
                            loserScore: 5
                        };

                    case '27':
                    case '28':
                    case '29':
                        return {
                            winnerScore: 14,
                            loserScore: 6
                        };

                    case '30':
                    case '31':
                    case '32':
                    case '33':
                        return {
                            winnerScore: 13,
                            loserScore: 7
                        };

                    case '34':
                    case '35':
                    case '36':
                    case '37':
                        return {
                            winnerScore: 12,
                            loserScore: 8
                        };

                }

                break;
            case '6':
                switch (loserScore) {
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                        return {
                            winnerScore: 20,
                            loserScore: 0
                        };

                    case '9':
                    case '10':
                    case '11':
                    case '12':
                        return {
                            winnerScore: 19,
                            loserScore: 1
                        };

                    case '13':
                    case '14':
                    case '15':
                    case '16':
                    case '17':
                        return {
                            winnerScore: 18,
                            loserScore: 2
                        };

                    case '18':
                    case '19':
                    case '20':
                    case '21':
                    case '22':
                        return {
                            winnerScore: 17,
                            loserScore: 3
                        };

                    case '23':
                    case '24':
                    case '25':
                    case '26':
                    case '27':
                        return {
                            winnerScore: 16,
                            loserScore: 4
                        };

                    case '28':
                    case '29':
                    case '30':
                    case '31':
                        return {
                            winnerScore: 15,
                            loserScore: 5
                        };

                    case '32':
                    case '33':
                    case '34':
                    case '35':
                    case '36':
                        return {
                            winnerScore: 14,
                            loserScore: 6
                        };

                    case '37':
                    case '38':
                    case '39':
                    case '40':
                        return {
                            winnerScore: 13,
                            loserScore: 7
                        };

                    case '41':
                    case '42':
                    case '43':
                    case '44':
                    case '45':
                        return {
                            winnerScore: 12,
                            loserScore: 8
                        };

                }

                break;
            case '7':

                switch (loserScore) {
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                    case '10':
                        return {
                            winnerScore: 20,
                            loserScore: 0
                        };

                    case '11':
                    case '12':
                    case '13':
                    case '14':
                    case '15':
                        return {
                            winnerScore: 19,
                            loserScore: 1
                        };

                    case '16':
                    case '17':
                    case '18':
                    case '19':
                    case '20':
                    case '21':
                        return {
                            winnerScore: 18,
                            loserScore: 2
                        };

                    case '22':
                    case '23':
                    case '24':
                    case '25':
                    case '26':
                        return {
                            winnerScore: 17,
                            loserScore: 3
                        };

                    case '27':
                    case '28':
                    case '29':
                    case '30':
                    case '31':
                    case '32':
                        return {
                            winnerScore: 16,
                            loserScore: 4
                        };

                    case '33':
                    case '34':
                    case '35':
                    case '36':
                    case '37':
                        return {
                            winnerScore: 15,
                            loserScore: 5
                        };

                    case '38':
                    case '39':
                    case '40':
                    case '41':
                    case '42':
                    case '43':
                        return {
                            winnerScore: 14,
                            loserScore: 6
                        };

                    case '44':
                    case '45':
                    case '46':
                    case '47':
                    case '48':
                    case '49':
                        return {
                            winnerScore: 13,
                            loserScore: 7
                        };

                    case '50':
                    case '51':
                    case '52':
                    case '53':
                    case '54':
                        return {
                            winnerScore: 12,
                            loserScore: 8
                        };

                }

                break;
            case '8':
                switch (loserScore) {
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                    case '10':
                    case '11':
                    case '12':
                    case '13':
                        return {
                            winnerScore: 20,
                            loserScore: 0
                        };

                    case '14':
                    case '15':
                    case '16':
                    case '17':
                    case '18':
                    case '19':
                        return {
                            winnerScore: 19,
                            loserScore: 1
                        };

                    case '21':
                    case '22':
                    case '23':
                    case '24':
                    case '25':
                    case '26':
                        return {
                            winnerScore: 18,
                            loserScore: 2
                        };

                    case '27':
                    case '28':
                    case '29':
                    case '30':
                    case '31':
                    case '32':
                        return {
                            winnerScore: 17,
                            loserScore: 3
                        };

                    case '33':
                    case '34':
                    case '35':
                    case '36':
                    case '37':
                    case '38':
                    case '39':
                        return {
                            winnerScore: 16,
                            loserScore: 4
                        };

                    case '40':
                    case '41':
                    case '42':
                    case '43':
                    case '44':
                    case '45':
                        return {
                            winnerScore: 15,
                            loserScore: 5
                        };

                    case '46':
                    case '47':
                    case '48':
                    case '49':
                    case '50':
                    case '51':
                    case '52':
                        return {
                            winnerScore: 14,
                            loserScore: 6
                        };

                    case '53':
                    case '54':
                    case '55':
                    case '56':
                    case '57':
                    case '58':
                        return {
                            winnerScore: 13,
                            loserScore: 7
                        };

                    case '59':
                    case '60':
                    case '61':
                    case '62':
                    case '63':
                    case '64':
                        return {
                            winnerScore: 12,
                            loserScore: 8
                        };

                }

                break;
            case '9':
                switch (loserScore) {
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                    case '10':
                    case '11':
                    case '12':
                    case '13':
                    case '14':
                    case '15':
                    case '16':
                    case '17':
                        return {
                            winnerScore: 20,
                            loserScore: 0
                        };

                    case '18':
                    case '19':
                    case '20':
                    case '21':
                    case '22':
                    case '23':
                    case '24':
                        return {
                            winnerScore: 19,
                            loserScore: 1
                        };

                    case '25':
                    case '26':
                    case '27':
                    case '28':
                    case '29':
                    case '30':
                    case '31':
                        return {
                            winnerScore: 18,
                            loserScore: 2
                        };

                    case '32':
                    case '33':
                    case '34':
                    case '35':
                    case '36':
                    case '37':
                    case '38':
                        return {
                            winnerScore: 17,
                            loserScore: 3
                        };

                    case '39':
                    case '40':
                    case '41':
                    case '42':
                    case '43':
                    case '44':
                    case '45':
                    case '46':
                        return {
                            winnerScore: 16,
                            loserScore: 4
                        };

                    case '47':
                    case '48':
                    case '49':
                    case '50':
                    case '51':
                    case '52':
                    case '53':
                        return {
                            winnerScore: 15,
                            loserScore: 5
                        };

                    case '54':
                    case '55':
                    case '56':
                    case '57':
                    case '58':
                    case '59':
                    case '60':
                        return {
                            winnerScore: 14,
                            loserScore: 6
                        };

                    case '60':
                    case '61':
                    case '62':
                    case '63':
                    case '64':
                    case '65':
                    case '66':
                    case '67':
                        return {
                            winnerScore: 13,
                            loserScore: 7
                        };

                    case '68':
                    case '69':
                    case '70':
                    case '71':
                    case '72':
                    case '73':
                    case '74':
                        return {
                            winnerScore: 12,
                            loserScore: 8
                        };
                }
        }
    };
}();
module.exports = scoring;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var incrementer = __webpack_require__(2);
var diamond = __webpack_require__(1);
//const scoring = require('./modules/scoring');
var resetRack = __webpack_require__(0);
//const rackTable = require('./modules/rackTable');

var lock = document.querySelector('.lock');

lock.addEventListener('click', function () {
  document.documentElement.webkitRequestFullscreen();
  screen.orientation.lock('landscape');
});

/***/ })
/******/ ]);