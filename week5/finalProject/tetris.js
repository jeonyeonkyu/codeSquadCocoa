class TetrisModel {
  constructor() {
    this.model = Array.from({ length: 20 }, () =>
      Array.from({ length: 10 }, () => 0));
    this.currentTopLeft = [0, 3];
    this.block = null;
    this.currentShapeIndex = 0;
    this.shape = [
      { name: 0, color: 'white' },
      {
        name: 1,
        pattern:
          [[[0, 1, 1], [0, 1, 1], [0, 0, 0]],
          [[0, 1, 1], [0, 1, 1], [0, 0, 0]],
          [[0, 1, 1], [0, 1, 1], [0, 0, 0]],
          [[0, 1, 1], [0, 1, 1], [0, 0, 0]]],
        color: 'yellow'
      },
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
          [[3, 3, 0], [0, 3, 3], [0, 0, 0]],
          [[0, 0, 3], [0, 3, 3], [0, 3, 0]]],
        color: 'greenyellow'
      },
      {
        name: 4,
        pattern:
          [[[0, 4, 4], [4, 4, 0], [0, 0, 0]],
          [[0, 4, 0], [0, 4, 4], [0, 0, 4]],
          [[0, 4, 4], [4, 4, 0], [0, 0, 0]],
          [[0, 4, 0], [0, 4, 4], [0, 0, 4]]],
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
    this.currentTopLeft = [0, 3];
    this.currentShapeIndex = 0;
    this.block = this.createBlock();
    this.puttingInModel(this.block[0]);
  }

  createBlock() {
    const block = this.shape[Math.ceil(Math.random() * 7)].pattern;
    return block;
  }

  puttingInModel(block) {
    block.forEach((tr, i) => {
      tr.forEach((td, j) => {
        this.model[i][j + 3] = td;
      })
    })
  }

  isActiveBlock = value => (value > 0 && value < 10);

  isInvalidBlock = value => (value === undefined || value < 0);

  goingDownBlock() {
    let isStopOk = true;
    const activeBlocks = [];
    let currentBlockShape = this.block[0];
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
      activeBlocks.forEach(ele => {
        this.model[ele[0]][ele[1]] *= -1;
      });
      this.clearRows(); 
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

  clearRows() { //가득 찬 줄 있으면 지우고 새로 그려주기
    const fullRows = [];
    for (let i = 0; i < this.model.length; i++) {
      let count = 0;
      for (let j = 0; j < this.model[i].length; j++) {
        if (this.model[i][j] < 0) {
          count++;
        }
      }
      if (count === 10) {
        fullRows.push(i);
      }
    }

    fullRows.forEach(ele => {
      this.model.splice(ele, 1);
      this.model.unshift(Array.from({ length: 10 }, () => 0));
    })
  }

  checkRows(){
    if(this.model[4][3] < 0 || this.model[4][4] < 0 || this.model[4][5] < 0){
      if(this.model[3][3] !== 0 || this.model[3][4] !== 0 || this.model[3][5] !== 0){
        if(this.model[2][3] !== 0 || this.model[2][4] !== 0 || this.model[2][5] !== 0){
          return true;
        }
      }
    }
    return false;
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
    this.timer = 500;
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
    const template = `<table>` + this.tetrisModel.getModel().map((tr) =>
      `<tr>
     ${tr.map((td) => `<td class="${(this.tetrisModel.shape[Math.abs(td)]).color}"></td>`).join('')}
      </tr>`
    ).join('') + `</table>`;
    this.gameView.innerHTML = template;
  }

  movingGameStart() {
      this.timeClear = setTimeout(() => { this.movingGameStart() }, this.timer);
      if(this.tetrisModel.checkRows()){
        clearTimeout(this.timeClear);
        alert('game over');
      };
      this.down();
  }
}

class ArrowKeysEventController {
  constructor({ tetrisModel, renderView }) {
    this.tetrisModel = tetrisModel;
    this.renderView = renderView;
  }

  initEvent() {
    document.addEventListener('keydown', this.moveLeftAndRightHandler);
    document.addEventListener('keydown', this.turnHandler);
    document.addEventListener('keydown', this.downHandler);
  }

  moveLeftAndRightHandler = (event) => {
    const left = -1;
    const right = 1;
    let way = 0;
    if (event.code === 'ArrowLeft') {
      way = left;
    } else if (event.code === 'ArrowRight') {
      way = right;
    }
    switch (event.code) {
      case 'ArrowLeft': {
        let isMoveOk = this.placeCheck(way);
        if (isMoveOk) {
          this.tetrisModel.currentTopLeft = [this.tetrisModel.currentTopLeft[0], this.tetrisModel.currentTopLeft[1] - 1];
          this.tetrisModel.model.forEach((tr, i) => {
            for (var j = 0; j < tr.length; j++) {
              const td = tr[j];
              if (this.tetrisModel.model[i][j - 1] === 0 && td > 0) {
                this.tetrisModel.model[i][j - 1] = td;
                this.tetrisModel.model[i][j] = 0;
              }
            }
          });
        }
        this.renderView.renderingFromModel();
        break;
      }
      case 'ArrowRight': {
        let isMoveOk = this.placeCheck(way);
        if (isMoveOk) {
          this.tetrisModel.currentTopLeft = [this.tetrisModel.currentTopLeft[0], this.tetrisModel.currentTopLeft[1] + 1];
          this.tetrisModel.model.forEach((tr, i) => {
            for (var j = tr.length; j >= 0; j--) {
              const td = tr[j];
              if (this.tetrisModel.model[i][j + 1] === 0 && td > 0) {
                this.tetrisModel.model[i][j + 1] = td;
                this.tetrisModel.model[i][j] = 0;
              }
            }
          });
        }
        this.renderView.renderingFromModel();
        break;
      }
    }
  }

  placeCheck(way) { //왼쪽 or 오른쪽 공간체크하기
    let isMoveOk = true;
    let currentBlockShape = this.tetrisModel.block[0];
    for (let i = this.tetrisModel.currentTopLeft[0]; i < this.tetrisModel.currentTopLeft[0] + currentBlockShape.length; i++) {
      if (!isMoveOk) break;
      for (let j = this.tetrisModel.currentTopLeft[1]; j < this.tetrisModel.currentTopLeft[1] + currentBlockShape.length; j++) {
        if (!this.tetrisModel.model[i]) continue;
        if (this.tetrisModel.isActiveBlock(this.tetrisModel.model[i][j]) &&
          this.tetrisModel.isInvalidBlock(this.tetrisModel.model[i] && this.tetrisModel.model[i][j + way])) {
          isMoveOk = false;
        }
      }
    }
    return isMoveOk;
  }


  turnHandler = (event) => {
    if (event.code === 'ArrowUp') {
      let isTurnOk = true;
      let currentShapeIndex = this.tetrisModel.currentShapeIndex;
      let currentBlockShape = this.tetrisModel.block[currentShapeIndex] //이거 바꿔줘야함
      const nextShapeIndex = currentShapeIndex === 3 ? 0 : currentShapeIndex + 1;
      const nextBlockShape = this.tetrisModel.block[nextShapeIndex];

      for (let i = this.tetrisModel.currentTopLeft[0]; i < this.tetrisModel.currentTopLeft[0] + currentBlockShape.length; i++) { // 돌린 이후 공간 체크
        if (!isTurnOk) break;
        if (i === 20) isTurnOk = false;;
        for (let j = this.tetrisModel.currentTopLeft[1]; j < this.tetrisModel.currentTopLeft[1] + currentBlockShape.length; j++) {
          if (!this.tetrisModel.model[i]) continue;
          if (nextBlockShape[i - this.tetrisModel.currentTopLeft[0]][j - this.tetrisModel.currentTopLeft[1]] !== 0 &&
            this.tetrisModel.isInvalidBlock(this.tetrisModel.model[i] && this.tetrisModel.model[i][j])) {
            isTurnOk = false;
          }
        }
      }
      if (isTurnOk) {
        while (this.tetrisModel.currentTopLeft[0] < 0) {
          this.tetrisModel.goingDownBlock();
        }
        for (let i = this.tetrisModel.currentTopLeft[0]; i < this.tetrisModel.currentTopLeft[0] + currentBlockShape.length; i++) { // 돌린 이후 공간 체크
          for (let j = this.tetrisModel.currentTopLeft[1]; j < this.tetrisModel.currentTopLeft[1] + currentBlockShape.length; j++) {
            if (!this.tetrisModel.model[i]) continue;
            let nextBlockShapeCell = nextBlockShape[i - this.tetrisModel.currentTopLeft[0]][j - this.tetrisModel.currentTopLeft[1]];
            if (nextBlockShapeCell !== 0 && this.tetrisModel.model[i][j] === 0) {
              // 다음 모양은 있는데 현재 칸이 없으면
              this.tetrisModel.model[i][j] = this.tetrisModel.block[1][1][2]; //데이터 및 색깔 부여
            } else if (nextBlockShapeCell === 0 && this.tetrisModel.model[i][j] && this.tetrisModel.model[i][j] >= 0) {
              // 다음 모양은 없는데  현재 칸이 있으면
              this.tetrisModel.model[i][j] = 0;
            }
          }
        }
        this.tetrisModel.currentShapeIndex = nextShapeIndex;
      }
      this.renderView.renderingFromModel();
    }
  }

  downHandler = (event) => {
    switch (event.code) {
      case 'ArrowDown': {
        this.renderView.down();
        break;
      }
      case 'Space': {
        while (this.tetrisModel.goingDownBlock()) { this.renderView.renderingFromModel(); };
        break;
      }
    }
  }

}

document.addEventListener('DOMContentLoaded', () => {
  const tetrisModel = new TetrisModel();

  const gameView = document.querySelector('.game_view');
  const renderView = new RenderView({ tetrisModel, gameView });
  const arrowKeysEventController = new ArrowKeysEventController({ tetrisModel, renderView })
  tetrisModel.run();
  renderView.run();
  arrowKeysEventController.initEvent();

  document.querySelector('.time_clear').addEventListener('click', () => clearTimeout(renderView.timeClear))
})