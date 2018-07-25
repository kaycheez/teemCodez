$(document).ready(function() {

  $('.add-player-btn').on('click', function() {
    let newPlayer = $('.new-player').val();

    // determine if users key exists
    if(!localStorage.getItem('players')) {
      let players = [];
      // no, set users key and add new player
      localStorage.setItem('players', JSON.stringify(players));
    }
      // yes, add new player

    addNewPlayer(newPlayer);

    // localStorage.setItem('player1', newPlayer);
    refreshScoreboard();

    updatePlayerList();
  })

  $('#new-game-btn').on('click', function() {
      event.preventDefault()
      console.log("CLICKED!")

      addNewGame();
  })

  // document.getElementById("#new-game").addEventListener("click", function(event){
  // });


  refreshScoreboard();
  
  updatePlayerList()

});

function addNewPlayer(player) {
  let playersArr = JSON.parse(localStorage.getItem('players'));
  let newPlayer = {
    name: player,
    elo: 999
  }

  playersArr.push(newPlayer);
  localStorage.setItem('players', JSON.stringify(playersArr));
}

function refreshScoreboard() {
 let playersArr = JSON.parse(localStorage.getItem('players'));
 let $container = $('.scoreboard-container');

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
  let playersArr = JSON.parse(localStorage.getItem('players'));
  let $playersList = $('.players-list');
  
  sortBy(playersArr, "name");
  
  for (let i = 0; i < playersArr.length; i++) {

    let $player = $(`<option value="${playersArr[i].name}"></option>`);
 
    $player.text(playersArr[i].name);
    $playersList.append($player);
  }
}


function addNewGame() {
  console.log($('#new-game').serializeArray());
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