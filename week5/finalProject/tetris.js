
function createView() {
  let gameView = '<table>'
  for (let i = 0; i < 20; i++) {
    gameView += '<tr>'
    for (let j = 0; j < 10; j++) {
      gameView += '<td></td>'
    }
    gameView += '</tr>'
  }
  gameView += '</table>'
  document.querySelector('.game_view').innerHTML = gameView;
}
createView();