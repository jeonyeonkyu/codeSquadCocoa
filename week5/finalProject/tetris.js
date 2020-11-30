class TetrisModel {
  constructor() {
    this.model = Array.from({ length: 20 }, () =>
      Array.from({ length: 10 }, () => 1));
    this.shape = [
      { name: 0, color: 'white' },
      { name: 1, pattern: [[1, 1], [1, 1]], color: 'yellow' },
      { name: 2, pattern: [[0, 2, 0], [2, 2, 2]], color: 'pink' },
      { name: 3, pattern: [[3, 3, 0], [0, 3, 3]], color: 'greenyellow' },
      { name: 4, pattern: [[0, 4, 4], [4, 4, 0]], color: 'coral' },
      { name: 5, pattern: [[5, 5, 5], [0, 0, 5]], color: 'purple' },
      { name: 6, pattern: [[6, 6, 6], [6, 0, 0]], color: 'blue' },
      { name: 7, pattern: [[7, 7, 7, 7]], color: 'red' }
    ]
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



  renderingFromModel() {
    const template = `<table>` + this.tetrisModel.getModel().map((tr, i) =>
      `<tr>
     ${tr.map((td, j) => `<td class="${this.tetrisModel.shape[td].color}"></td>`).join('')}
      </tr>`
    ).join('') + `</table>`;
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