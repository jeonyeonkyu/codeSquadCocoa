const _ = {
  $(selector, base = document) {
    return base.querySelector(selector)
  }
}

class Model {
  constructor() {
    this.fruitObj = {};
  }

  addData(fruitType) {
    if (!this.fruitObj.hasOwnProperty(fruitType)) {
      this.fruitObj[fruitType] = 1;
    } else {
      this.fruitObj[fruitType]++;
    }
  }
}

class FruitView {
  constructor() { }

  init({ listTitle, fruitList }) {
    this.listTitle = listTitle;
    this.fruitList = fruitList;
    this.contents = null;
    this.initEvent();
  }

  initEvent() {
    this.listTitle.addEventListener('mouseenter', this.mouseEnterTitleHandler);
    this.listTitle.addEventListener('mouseleave', this.mouseLeaveTitleHandler);
  }

  mouseEnterTitleHandler = () => {
    this.contents = window.setTimeout(() => this.showList(), 1000);
  }

  mouseLeaveTitleHandler = () => {
    window.clearTimeout(this.contents);
  }

  showList = () => {
    this.fruitList.style.display = 'block';
  }
}

class DataView {
  constructor() { }

  init({ model, fruitDataList, fruitList }) {
    this.model = model;
    this.fruitDataList = fruitDataList;
    this.fruitList = fruitList;
    this.movementTimer = null;
    this.initEvent();
  }

  initEvent() {
    this.fruitList.addEventListener('mousemove', this.mouseMoveDataHandler);
  }

  mouseMoveDataHandler = (event) => {
    if (!this.movementTimer) {
      this.movementTimer = window.setTimeout(() => {
        this.movementTimer = null;
        this.moveToAdd(event);
      }, 500);
    }
  }

  moveToAdd = (event) => {
    if (event.target.tagName === 'LI') {
      this.model.addData(event.target.innerHTML);
      this.showData();
    }
  }

  showData = () => {
    const template = Object.keys(this.model.fruitObj).map(ele =>
      `<li> ${ele} : ${this.model.fruitObj[ele]} </li>`
    ).join('');
    this.fruitDataList.innerHTML = template;
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const listTitle = _.$('.list_title');
  const fruitList = _.$('.fruit_list');
  const fruitDataList = _.$('.fruit_data_list');

  const model = new Model();

  const fruitView = new FruitView();
  const dataView = new DataView();
  fruitView.init({ listTitle, fruitList });
  dataView.init({ model, fruitDataList, fruitList })

})