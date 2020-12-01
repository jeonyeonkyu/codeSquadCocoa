class TetrisModel {
  constructor() {
    this.model = Array.from({ length: 20 }, () =>
      Array.from({ length: 10 }, () => 0));
    this.isStopOk = true;
    this.currentTopLeft = [-1, 3];
    this.block = null;
    this.shape = [
      { name: 0, color: 'white' },
      { name: 1, pattern: [[[0, 1, 1], [0, 1, 1], [0, 0, 0]]], color: 'yellow' },
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
          [[0, 0, 7, 0], [0, 0, 7, 0], [0, 0, 7, 0], [0, 0, 7, 0]],
          [[0, 0, 0, 0], [0, 0, 0, 0], [7, 7, 7, 7], [0, 0, 0, 0]],
          [[0, 7, 0, 0], [0, 7, 0, 0], [0, 7, 0, 0], [0, 7, 0, 0]]],
        color: 'red'
      }
    ]
  }

  run() {
    this.currentTopLeft = [-1, 3];
    this.block = this.createBlock();
    this.puttingInModel(this.block);
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
    let isStopOk = true;
    const activeBlocks = [];
    let currentBlockShape = this.block;
    for (let i = this.currentTopLeft[0]; i < this.currentTopLeft[0] + currentBlockShape.length; i++) { // 아래 블럭이 있으면
      if (i < 0 || i >= 20) continue;
      for (let j = this.currentTopLeft[1]; j < this.currentTopLeft[1] + currentBlockShape.length; j++) {
        if (this.isActiveBlock(this.model[i][j])) { // 현재 움직이는 블럭이면
          activeBlocks.push([i, j]);
          if (this.isInvalidBlock(this.model[i + 1] && this.model[i + 1][j])) { //밑에 있는 라인으로 움직일 수 있는지 체크
            isStopOk = false;
          }
        }
      }
    }
    if (!isStopOk) {
      console.warn(11111)
      console.log(activeBlocks)
      activeBlocks.forEach(ele => {
        this.model[ele[0]][ele[1]] *= -1;
      });
      console.table(this.model)
      // checkRows(); // 지워질 줄 있나 확인
      this.run();
      return false;
    } else if (isStopOk) {
      for (let i = this.model.length - 1; i >= 0; i--) {
        const tr = this.model[i];
        tr.forEach((td, j) => {
          if (td > 0 && this.model[i + 1] && this.model[i + 1][j] >= 0) {
            this.model[i + 1][j] = td;
            this.model[i][j] = 0;
          }
        });
      }
      this.currentTopLeft = [this.currentTopLeft[0] + 1, this.currentTopLeft[1]];
      return true;
    }
  }

  isActiveBlock = value => (value > 0 && value < 10);
  isInvalidBlock = value => (value === undefined || value < 0);

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