class TetrisModel {
  constructor() {
    this.model = Array.from({ length: 20 }, () =>
      Array.from({ length: 10 }, () => 0));
  }

  getModel() {
    return [...this.model];
  }
}

class RenderView {
  constructor({ tetrisModel, gameView }) {
    this.tetrisModel = tetrisModel;
    this.gameView = gameView;
  }

  run() {
    this.renderingFromModel();
  }

  showGame() {

  }

  renderingFromModel() {
    const template = `<table>` + this.tetrisModel.getModel().map((tr, i) => 
      `<tr>
     ${tr.map((td, j) => 
        `<td>${td}</td>`
      ).join('')}
      </tr>`
    ).join('') + `</table>`
    this.gameView.innerHTML = template;
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const tetrisModel = new TetrisModel();

  const gameView = document.querySelector('.game_view');
  const renderView = new RenderView({ tetrisModel, gameView });
  renderView.run();
})
























// function createView() {
//   let gameView = '<table>'
//   for (let i = 0; i < 20; i++) {
//     gameView += '<tr>'
//     for (let j = 0; j < 10; j++) {
//       gameView += '<td>0</td>'
//     }
//     gameView += '</tr>'
//   }
//   gameView += '</table>'
//   document.querySelector('.game_view').innerHTML = gameView;
// }
// document.addEventListener('DOMContentLoaded', () => {
//   createView();
// })