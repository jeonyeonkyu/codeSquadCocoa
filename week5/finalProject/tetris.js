class TetrisModel {
  constructor() {
    this.model = Array.from({ length: 20 }, () =>
      Array.from({ length: 10 }, () => 0));
    this.isStopOk = true;
    this.shape = [
      { name: 0, color: 'white' },
      { name: 1, pattern: [[[1, 1], [1, 1]]], color: 'yellow' },
      {
        name: 2,
        pattern:
          [[[0, 2, 0], [2, 2, 2], [0, 0, 0]],
          [[0, 2, 0], [0, 2, 2], [0, 2, 0]],
          [[0, 0, 0], [2, 2, 2], [0, 2, 0]],
          [[0, 2, 0], [2, 2, 0], [0, 2, 0]]],
        color: 'pink'
      },
      {
        name: 3,
        pattern:
          [[[3, 3, 0], [0, 3, 3], [0, 0, 0]],
          [[0, 0, 3], [0, 3, 3], [0, 3, 0]],
          [[0, 0, 0], [3, 3, 0], [0, 3, 3]],
          [[0, 3, 0], [3, 3, 0], [3, 0, 0]]],
        color: 'greenyellow'
      },
      {
        name: 4,
        pattern:
          [[[0, 4, 4], [4, 4, 0], [0, 0, 0]],
          [[0, 4, 0], [0, 4, 4], [0, 0, 4]],
          [[0, 0, 0], [0, 4, 4], [4, 4, 0]],
          [[4, 0, 0], [4, 4, 0], [0, 4, 0]]],
        color: 'coral'
      },
      {
        name: 5,
        pattern:
          [[[5, 5, 5], [0, 0, 5], [0, 0, 0]],
          [[0, 0, 5], [0, 0, 5], [0, 5, 5]],
          [[0, 0, 0], [5, 0, 0], [5, 5, 5]],
          [[5, 5, 0], [5, 0, 0], [5, 0, 0]]],
        color: 'purple'
      },
      {
        name: 6,
        pattern:
          [[[6, 6, 6], [6, 0, 0], [0, 0, 0]],
          [[0, 6, 6], [0, 0, 6], [0, 0, 6]],
          [[0, 0, 0], [0, 0, 6], [6, 6, 6]],
          [[6, 0, 0], [6, 0, 0], [6, 6, 0]]],
        color: 'blue'
      },
      {
        name: 7,
        pattern:
          [[[0, 0, 0, 0], [7, 7, 7, 7], [0, 0, 0, 0], [0, 0, 0, 0]],
          [[0, 0, 7, 0], [0, 0, 7, 0], [0, 0, 7, 0], [0, 0, 7, 0]]],
        color: 'red'
      }
    ]
  }

  run() {
    const block = this.createBlock();
    this.puttingInModel(block);
  }

  createBlock() {
    const block = this.shape[Math.ceil(Math.random() * 7)].pattern[0];
    return block;
  }

  puttingInModel(block) {
    block.forEach((tr, i) => {
      tr.forEach((td, j) => {
        this.model[i][j + 3] = td;
      })
    })
  }

  goingDownBlock() {
    for (let i = this.model.length - 1; i >= 0; i--) {
      for (let j = 0; j < this.model[i].length; j++) {
        if (this.model[i + 1] && this.model[i + 1][j] === 0 && this.isStopOk) {
          this.model[i + 1][j] = this.model[i][j];
          this.model[i][j] = 0;
        } else if (this.model[i + 1]) {
          this.isStopOk = false;
          this.model[i][j] = this.model[i][j]*-1;
          break;
        }
      }
      if (this.isStopOk === false) {
        return;
      }
    }
  }

  getModel() {
    return [...this.model];
  }
}

class RenderView {
  constructor({ tetrisModel, gameView }) {
    this.tetrisModel = tetrisModel;
    this.gameView = gameView;
    this.timeClear = null;
    this.timeout = 100;
  }

  run() {
    this.renderingFromModel();
    this.movingGameStart();
  }

  down() {
    this.tetrisModel.goingDownBlock();
    this.renderingFromModel();
  }

  renderingFromModel() {
    const template = `<table>` + this.tetrisModel.getModel().map((tr, i) =>
      `<tr>
     ${tr.map((td, j) => `<td class="${(this.tetrisModel.shape[Math.abs(td)]).color}"></td>`).join('')}
      </tr>`
    ).join('') + `</table>`;
    this.gameView.innerHTML = template;
  }

  movingGameStart() {
    this.timeClear = setTimeout(() => {
      if (this.timeClear) {
        clearTimeout(this.timeClear)
      }
      this.down();
      setTimeout(() => { this.movingGameStart() }, this.timeout);
    }, this.timeout)
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const tetrisModel = new TetrisModel();

  const gameView = document.querySelector('.game_view');
  const renderView = new RenderView({ tetrisModel, gameView });
  tetrisModel.run();
  renderView.run();


  document.querySelector('.time_clear').addEventListener('click', () => clearTimeout(renderView.timeClear))
})