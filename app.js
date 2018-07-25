let newWinnerElo, newLoserElo;
$(document).ready(function() {

  $('.add-player-btn').on('click', function() {
    let newPlayer = $('.new-player').val();
    
    if(newPlayer){
      // determine if users key exists
      if (!localStorage.getItem('players')) {
        let players = [];
        // no, set users key and add new player
        localStorage.setItem('players', JSON.stringify(players));
      }
      // yes, add new player
      
      addNewPlayer(newPlayer);
      
      // localStorage.setItem('player1', newPlayer);
      refreshScoreboard();
      
      updatePlayerList();
      
    } else {
      console.log('you aint nothing');
    }
  })

  $('#new-game-btn').on('click', function() {
      event.preventDefault()

      addNewGame();
  })

  // document.getElementById("#new-game").addEventListener("click", function(event){
  // });


  refreshScoreboard();
  
  updatePlayerList();

  refreshGameLogs();

});

function addNewPlayer(player) {
  let playersArr = JSON.parse(localStorage.getItem('players'));
  let newPlayer = {
    name: player,
    elo: 1000
  }

  playersArr.push(newPlayer);
  localStorage.setItem('players', JSON.stringify(playersArr));
}

function refreshScoreboard() {
 let playersArr = JSON.parse(localStorage.getItem('players')) || [];
 let $container = $('.scoreboard-container');

//  if(playersArr === undefined) 

 sortBy(playersArr, 'elo');
 $container.html('');

 for (let i = 0; i < playersArr.length; i++) {
   let $playerScore = $(`<div class='player-scores'></div>`);

   $playerScore.text(playersArr[i].name + " - ELO: " + playersArr[i].elo);
   $container.prepend($playerScore);
 }
}

function sortBy(playersArray, key) {
  // create first loop
  for(let i = 0; i < playersArray.length; i++) {
    //set i as min
    let minIndex = i;
    let tempStorage = {};
    // loop through rest
    for(let j = (i + 1); j < playersArray.length; j++) {
      // if elo lower, set as min
      if(playersArray[j][key] < playersArray[i][key]) {
        minIndex = j;
      }
    }
    if(minIndex !== i) {
      // set playersArray[i] as temp
      tempStorage = playersArray[i];
      // set playersArray[minIndex] as [i]
      playersArray[i] = playersArray[minIndex];
      // set [i] as temp
      playersArray[minIndex] = tempStorage;
    }
  }
}

function updatePlayerList() {
  //TODO
  // clear field

  let playersArr = JSON.parse(localStorage.getItem('players')) || [];
  let $playersList = $('.players-list');

  $playersList.html('');
  
  sortBy(playersArr, "name");
  
  for (let i = 0; i < playersArr.length; i++) {

    let $player = $(`<option value="${playersArr[i].name}"></option>`);
 
    $player.text(playersArr[i].name);
    $playersList.append($player);
  }
}


function addNewGame() {
  let playersArr = JSON.parse(localStorage.getItem('players')) 
  let $submitArray = $('#new-game').serializeArray();
  let winner = $submitArray[0].value;
  let winnerScore = $submitArray[1].value;
  let loser = $submitArray[2].value;
  let loserScore = $submitArray[3].value;
  var winnerElo, loserElo;

  // filter into array 
  winnerElo = playersArr.filter(((player) => player.name === winner))[0].elo;
  loserElo = playersArr.filter(((player) => player.name === loser))[0].elo;

  calculateElo(winnerElo, loserElo);
  // console.log("In addnewgame " + newWinnerElo + " " + newLoserElo);

  updateElo(winner, newWinnerElo, loser, newLoserElo);

  refreshScoreboard();

  logGame(winner, winnerScore, loser, loserScore);
}

function calculateElo(winnerElo, loserElo) {
  const k = 16;
  let winnerPrct = (1/(1 + Math.pow(10, ((winnerElo - loserElo) / 400))))
  let loserPrct = (1/(1 + Math.pow(10, ((loserElo - winnerElo) / 400))))
  
  newWinnerElo = Math.round(winnerElo + k * (1 - winnerPrct));
  newLoserElo = Math.round(loserElo + k * (0 - loserPrct));
  console.log("In calculateElo " + newWinnerElo + " " + newLoserElo);
}

function updateElo(winner, newWinnerElo, loser, newLoserElo) {
  let playersArr = JSON.parse(localStorage.getItem('players'));
  
  for(let i = 0; i < playersArr.length; i++) {
    if(playersArr[i].name === winner) {
      playersArr[i].elo = newWinnerElo;
      console.log(playersArr)
    }
    if(playersArr[i].name === loser) {
      playersArr[i].elo = newLoserElo;
    }
  }
  localStorage.setItem('players', JSON.stringify(playersArr));
}

function logGame(winner, winnerScore, loser, loserScore) {
  let gamesArr = JSON.parse(localStorage.getItem('games')) || [];

  let newGame = {
    winner: winner,
    winnerScore: winnerScore,
    loser: loser,
    loserScore: loserScore
  };
  gamesArr.push(newGame);

  localStorage.setItem('games', JSON.stringify(gamesArr));

  refreshGameLogs();
}

function refreshGameLogs() {
  let gamesArr = JSON.parse(localStorage.getItem('games')) || [];
  let $gameLogContainer = $('.game-logs');
  $gameLogContainer.html('');
  for(let i = 0; i < gamesArr.length; i++) {
    let $gameLog = $(`<div class='game-log'></div>`);

    $gameLog.text(`${gamesArr[i].winner} Beat ${gamesArr[i].loser}: (${gamesArr[i].winnerScore}-${gamesArr[i].loserScore})`);
    $gameLogContainer.prepend($gameLog);
  }
}


// attach event listener to buttons(input)
// $('.store-btn').on('click', function() {
//   let titleValue = $('.input-field-title').val();
//   let contentValue = $('.input-field-body').val();

//   localStorage.setItem('titleValue', titleValue);
//   localStorage.setItem('contentValue', contentValue);
// })
// $('.get-btn').on('click', function() {

//   let titleValue = localStorage.getItem('titleValue');
//   let contentValue = localStorage.getItem('contentValue');

//   $('.debug').html(`<p>${titleValue} ${contentValue}</p>`)

//   // console.log(localStorage.getItem('hrext'));
// })
// $('.delete-btn').on('click', function(event?) {
//   // TODO confirmation validation Window.confirm
//   // throw .confirm window
//   // capture result
//   // test boolean to delete or not
//   localStorage.removeItem('titleValue')
//   localStorage.removeItem('contentValue')
//   $('.item-display').html(`<p>Items deleted</p>`)
// })
// create function stub for read/write/delete