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
    case '1':
        switch (loserScore) {
            case '0':
            case '1':
            case '2':
                return "20-0";
                break;
            case '3':
                return "19-1";
                break;
            case '4':
                return "18-2";
                break;
            case '5':
            case '6':
                return "17-3";
                break;
            case '7':
                return "16-4";
                break;
            case '8':
                return "15-5";
                break;                
            case '9':
            case '10':
                return "14-6";
                break;
            case '11':
                return "13-7";
                break;
            case '12':
            case '13':
                return "12-8";
                break;
        }
        break;
}
}
})();

module.exports = scoring;