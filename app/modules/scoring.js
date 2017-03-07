const rackTable = require('./rackTable');
const resetRack = require('./resetRack');

const scoring = (function() {
  const ball = document.querySelectorAll('.ball');
  const playerOneScore = document.querySelector('.player-one-score');
  const playerTwoScore = document.querySelector('.player-two-score');
  const deadBalls = document.querySelector('.dead-ball-score');
    
  const playerOneSkill = document.querySelector('.skill-level.left');
  const playerTwoSkill = document.querySelector('.skill-level.right');
  const playerOneGoal =  document.querySelector('#leftPlayerGoal');
  const playerTwoGoal =  document.querySelector('#rightPlayerGoal');
  
  const increase = obj => obj + 1;
  const decrease = obj => obj - 1;
  //calculates total number of dead balls in rack table and returns that value plus playerOneScore, playerTwoScore and current dead balls
  const calcScore = function() {
    let deadBallTable = document.querySelectorAll('.dead-ball-table') || 0;
    var deadBallTotal = 0;
    for (var i = 0; i < deadBallTable.length; i++) {
      deadBallTotal += Number(deadBallTable[i].innerHTML);
    }

    return Number(playerOneScore.innerHTML) + Number(playerTwoScore.innerHTML) + Number(deadBalls.innerHTML) + Number(deadBallTotal);
  };

  for (let i = 0; i < ball.length; i++) {
    ball[i].addEventListener('click', function(ev) {
      let evTarget = ev.target;
      // If ballLeft
      if (evTarget.classList.contains('left')) { 
        if (evTarget.classList.contains('neutral')) {
          playerOneScore.innerHTML = increase(new Number(playerOneScore.innerHTML));
          if (evTarget.classList.contains('ball-9')) {
            playerOneScore.innerHTML = increase(new Number(playerOneScore.innerHTML));
            let currentScore = calcScore();
            if ((currentScore % 10) === 0) {
              rackTable.appendColumn(ev);
              resetRack.showRackButtons();
            }
            return;
          }
          //end of match checker
          if (playerOneScore.innerHTML == playerOneGoal.innerHTML) {
            console.log('end of match, player one wins');
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
            let currentScore = calcScore();
            if ((currentScore % 10) === 0) {
              rackTable.appendColumn(ev);
              resetRack.showRackButtons();
            }
            return;
          }       
          //end of match checker
          if (playerTwoScore.innerHTML == playerTwoGoal.innerHTML) {
            console.log('end of match, player two wins');
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

  playerOneSkill.addEventListener('change', function(ev) {
    switch(ev.currentTarget.value) {
      case "1" : playerOneGoal.innerHTML = 14;
      break;
      case "2": playerOneGoal.innerHTML = 19;
      break;
      case "3": playerOneGoal.innerHTML = 25;
      break;
      case "4": playerOneGoal.innerHTML = 31;
      break;
      case "5": playerOneGoal.innerHTML = 38;
      break;
      case "6": playerOneGoal.innerHTML = 46;
      break;
      case "7": playerOneGoal.innerHTML = 55;
      break;
      case "8": playerOneGoal.innerHTML = 65;
      break;
      case "9": playerOneGoal.innerHTML = 75;
      break;
    }
})
playerTwoSkill.addEventListener('change', function(ev) {
    switch(ev.currentTarget.value) {
      case "1" : playerTwoGoal.innerHTML = 14;
      break;
      case "2": playerTwoGoal.innerHTML = 19;
      break;
      case "3": playerTwoGoal.innerHTML = 25;
      break;
      case "4": playerTwoGoal.innerHTML = 31;
      break;
      case "5": playerTwoGoal.innerHTML = 38;
      break;
      case "6": playerTwoGoal.innerHTML = 46;
      break;
      case "7": playerTwoGoal.innerHTML = 55;
      break;
      case "8": playerTwoGoal.innerHTML = 65;
      break;
      case "9": playerTwoGoal.innerHTML = 75;
      break;
    }
})

const endOfMatch = function(winningPlayer) {
  const playerOneName = document.querySelector('#player-1-Name');
  const playerTwoName = document.querySelector('#player-2-Name');
  const playerOneSkillVal = document.querySelector('.skill-level.left option:checked').value
  const playerTwoSkillVal = document.querySelector('.skill-level.right option:checked').value
  
  //console.log(playerOneScore.innerHTML + " - " + playerTwoScore.innerHTML)
  if (winningPlayer == 1) {
    console.log("Final Score: " + calculateFinalScore(playerTwoSkillVal, playerTwoScore.innerHTML));
  }
  if (winningPlayer == 2) {
    console.log("Final Score: " + calculateFinalScore(playerOneSkillVal, playerOneScore.innerHTML));

  }
}

const calculateFinalScore = function(loserSL, loserScore) {
switch (loserSL) {
    case 1:
        switch (loserScore) {
            case 0:
            case 1:
            case 2:
                return {
                    winnerScore: 20,
                    loserScore: 0
                }
                break;
            case 3:
                return {
                    winnerScore: 19,
                    loserScore: 1
                }
                break;
            case 4:
                return {
                    winnerScore: 18,
                    loserScore: 2
                }
                break;
            case 5:
            case 6:
                return {
                    winnerScore: 17,
                    loserScore: 3
                }
                break;
            case 7:
                return {
                    winnerScore: 16,
                    loserScore: 4
                }
                break;
            case 8:
                return {
                    winnerScore: 15,
                    loserScore: 5
                }
                break;
            case 9:
            case 10:
                return {
                    winnerScore: 14,
                    loserScore: 6
                }
                break;
            case 11:
                return {
                    winnerScore: 13,
                    loserScore: 7
                }
                break;
            case 12:
            case 13:
                return {
                    winnerScore: 12,
                    loserScore: 8
                }
                break;
        }
        break;
    case 2:
        switch (loserScore) {
            case 0:
            case 1:
            case 2:
            case 3:
                return {
                    winnerScore: 20,
                    loserScore: 0
                }
                break;
            case 4:
            case 5:
                return {
                    winnerScore: 19,
                    loserScore: 1
                }
                break;
            case 6:
            case 7:
                return {
                    winnerScore: 18,
                    loserScore: 2
                }
                break;
            case 8:
                return {
                    winnerScore: 17,
                    loserScore: 3
                }
                break;
            case 9:
            case 10:
                return {
                    winnerScore: 16,
                    loserScore: 4
                }
                break;
            case 11:
            case 12:
                return {
                    winnerScore: 15,
                    loserScore: 5
                }
                break;
            case 13:
            case 14:
                return {
                    winnerScore: 14,
                    loserScore: 6
                }
                break;
            case 15:
            case 16:
                return {
                    winnerScore: 13,
                    loserScore: 7
                }
                break;
            case 17:
            case 18:
                return {
                    winnerScore: 12,
                    loserScore: 8
                }
                break;
        }
        break;
    case 3:
    switch (loserScore) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                return {
                    winnerScore: 20,
                    loserScore: 0
                }
                break;
            case 5:
            case 6:
                return {
                    winnerScore: 19,
                    loserScore: 1
                }
                break;
            case 7:
            case 8:
            case 9:
                return {
                    winnerScore: 18,
                    loserScore: 2
                }
                break;
            case 10:
            case 11:
                return {
                    winnerScore: 17,
                    loserScore: 3
                }
                break;
            case 12:
            case 13:
            case 14:
                return {
                    winnerScore: 16,
                    loserScore: 4
                }
                break;
            case 15:
            case 16:
                return {
                    winnerScore: 15,
                    loserScore: 5
                }
                break;
            case 17:
            case 18:
            case 19:
                return {
                    winnerScore: 14,
                    loserScore: 6
                }
                break;
            case 20:
            case 21:
                return {
                    winnerScore: 13,
                    loserScore: 7
                }
                break;
            case 22:
            case 23:
            case 24:
                return {
                    winnerScore: 12,
                    loserScore: 8
                }
                break;
        }
    break;

    case 4:
    switch (loserScore) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                return {
                    winnerScore: 20,
                    loserScore: 0
                }
                break;
            case 6:
            case 7:
            case 8:
                return {
                    winnerScore: 19,
                    loserScore: 1
                }
                break;
            case 9:
            case 10:
            case 11:
                return {
                    winnerScore: 18,
                    loserScore: 2
                }
                break;
            case 12:
            case 13:
            case 14:
                return {
                    winnerScore: 17,
                    loserScore: 3
                }
                break;
            case 15:
            case 16:
            case 17:
            case 18:
                return {
                    winnerScore: 16,
                    loserScore: 4
                }
                break;
            case 19:
            case 20:
            case 21:
                return {
                    winnerScore: 15,
                    loserScore: 5
                }
                break;
            case 22:
            case 23:
            case 24:
                return {
                    winnerScore: 14,
                    loserScore: 6
                }
                break;
            case 25:
            case 26:
            case 27:
                return {
                    winnerScore: 13,
                    loserScore: 7
                }
                break;
            case 28:
            case 29:
            case 30:
                return {
                    winnerScore: 12,
                    loserScore: 8
                }
                break;
        }
    break;

    case 5:
    switch (loserScore) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                return {
                    winnerScore: 20,
                    loserScore: 0
                }
                break;
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                return {
                    winnerScore: 19,
                    loserScore: 1
                }
                break;
            case 11:
            case 12:
            case 13:
            case 14:
                return {
                    winnerScore: 18,
                    loserScore: 2
                }
                break;
            case 15:
            case 16:
            case 17:
            case 18:
                return {
                    winnerScore: 17,
                    loserScore: 3
                }
                break;
            case 19:
            case 20:
            case 21:
            case 22:
                return {
                    winnerScore: 16,
                    loserScore: 4
                }
                break;
            case 23:
            case 24:
            case 25:
            case 26:
                return {
                    winnerScore: 15,
                    loserScore: 5
                }
                break;
            case 27:
            case 28:
            case 29:
                return {
                    winnerScore: 14,
                    loserScore: 6
                }
                break;
            case 30:
            case 31:
            case 32:
            case 33:
                return {
                    winnerScore: 13,
                    loserScore: 7
                }
                break;
            case 34:
            case 35:
            case 36:
            case 37:
                return {
                    winnerScore: 12,
                    loserScore: 8
                }
                break;
        }
    break;

    case 6:
    //nested cases on individual score
    switch (loserScore) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                return {
                    winnerScore: 20,
                    loserScore: 0
                }
                break;
            case 9:
            case 10:
            case 11:
            case 12:
                return {
                    winnerScore: 19,
                    loserScore: 1
                }
                break;
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
                return {
                    winnerScore: 18,
                    loserScore: 2
                }
                break;
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
                return {
                    winnerScore: 17,
                    loserScore: 3
                }
                break;
            case 23:
            case 24:
            case 25:
            case 26:
            case 27:
                return {
                    winnerScore: 16,
                    loserScore: 4
                }
                break;
            case 28:
            case 29:
            case 30:
            case 31:
                return {
                    winnerScore: 15,
                    loserScore: 5
                }
                break;
            case 32:
            case 33:
            case 34:
            case 35:
            case 36:
                return {
                    winnerScore: 14,
                    loserScore: 6
                }
                break;
            case 37:
            case 38:
            case 39:
            case 40:
                return {
                    winnerScore: 13,
                    loserScore: 7
                }
                break;
            case 41:
            case 42:
            case 43:
            case 44:
            case 45:
                return {
                    winnerScore: 12,
                    loserScore: 8
                }
                break;
        }
    break;

    case 7:
    
    switch (loserScore) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                return {
                    winnerScore: 20,
                    loserScore: 0
                }
                break;
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
                return {
                    winnerScore: 19,
                    loserScore: 1
                }
                break;
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:
            case 21:
                return {
                    winnerScore: 18,
                    loserScore: 2
                }
                break;
            case 22:
            case 23:
            case 24:
            case 25:
            case 26:
                return {
                    winnerScore: 17,
                    loserScore: 3
                }
                break;
            case 27:
            case 28:
            case 29:
            case 30:
            case 31:
            case 32:
                return {
                    winnerScore: 16,
                    loserScore: 4
                }
                break;
            case 33:
            case 34:
            case 35:
            case 36:
            case 37:
                return {
                    winnerScore: 15,
                    loserScore: 5
                }
                break;
            case 38:
            case 39:
            case 40:
            case 41:
            case 42:
            case 43:
                return {
                    winnerScore: 14,
                    loserScore: 6
                }
                break;
            case 44:
            case 45:
            case 46:
            case 47:
            case 48:
            case 49:
                return {
                    winnerScore: 13,
                    loserScore: 7
                }
                break;
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
                return {
                    winnerScore: 12,
                    loserScore: 8
                }
                break;
        }
    break;

    case 8:
    //nested cases on individual score
    switch (loserScore) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
                return {
                    winnerScore: 20,
                    loserScore: 0
                }
                break;
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
                return {
                    winnerScore: 19,
                    loserScore: 1
                }
                break;
            case 21:
            case 22:
            case 23:
            case 24:
            case 25:
            case 26:
                return {
                    winnerScore: 18,
                    loserScore: 2
                }
                break;
            case 27:
            case 28:
            case 29:
            case 30:
            case 31:
            case 32:
                return {
                    winnerScore: 17,
                    loserScore: 3
                }
                break;
            case 33:
            case 34:
            case 35:
            case 36:
            case 37:
            case 38:
            case 39:
                return {
                    winnerScore: 16,
                    loserScore: 4
                }
                break;
            case 40:
            case 41:
            case 42:
            case 43:
            case 44:
            case 45:
                return {
                    winnerScore: 15,
                    loserScore: 5
                }
                break;
            case 46:
            case 47:
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
                return {
                    winnerScore: 14,
                    loserScore: 6
                }
                break;
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
            case 58:
                return {
                    winnerScore: 13,
                    loserScore: 7
                }
                break;
            case 59:
            case 60:
            case 61:
            case 62:
            case 63:
            case 64:
                return {
                    winnerScore: 12,
                    loserScore: 8
                }
                break;
        }
    break;

    case 9:
    //nested cases on individual score
    switch (loserScore) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
                return {
                    winnerScore: 20,
                    loserScore: 0
                }
                break;
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 23:
            case 24:
                return {
                    winnerScore: 19,
                    loserScore: 1
                }
                break;
            case 25:
            case 26:
            case 27:
            case 28:
            case 29:
            case 30:
            case 31:
                return {
                    winnerScore: 18,
                    loserScore: 2
                }
                break;
            case 32:
            case 33:
            case 34:
            case 35:
            case 36:
            case 37:
            case 38:
                return {
                    winnerScore: 17,
                    loserScore: 3
                }
                break;
            case 39:
            case 40:
            case 41:
            case 42:
            case 43:
            case 44:
            case 45:
            case 46:
                return {
                    winnerScore: 16,
                    loserScore: 4
                }
                break;
            case 47:
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
                return {
                    winnerScore: 15,
                    loserScore: 5
                }
                break;
            case 54:
            case 55:
            case 56:
            case 57:
            case 58:
            case 59:
            case 60:
                return {
                    winnerScore: 14,
                    loserScore: 6
                }
                break;
            case 60:
            case 61:
            case 62:
            case 63:
            case 64:
            case 65:
            case 66:
            case 67:
                return {
                    winnerScore: 13,
                    loserScore: 7
                }
                break;
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
                return {
                    winnerScore: 12,
                    loserScore: 8
                }
                break;
        }
    break;
}
}
})();

module.exports = scoring;