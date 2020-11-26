class Model {
  constructor() {
    this.village = [];
    this.createVillage();
  }

  checkRandom() { //50%의 확률
    return Math.round(Math.random());
  }

  getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  getVillageWidth(width) { // width는 큰 마을이 4개가 있다는 전제 하에 (마을 지도/4 === 399px)의 랜덤한 크기(너무 작지 않게)
    let randomWidth = Math.random();
    if (randomWidth < 0.5) {
      randomWidth += 0.5;
    }
    return randomWidth * width;
  }

  getVillageHeight(height) { // height는 큰 마을이 4개가 있다는 전제 하에 (마을 지도/4 === 319px)의 랜덤한 크기(너무 작지 않게)
    let randomHeight = Math.random();
    if (randomHeight < 0.5) {
      randomHeight += 0.5;
    }
    return randomHeight * height;
  }

  getRandomMailbox() { //마을은 25% 확률로 우체통을 가질 수 있도록 함 크기는 20~29px
    const mailbox = { count: 0, size: 0 };
    if (this.checkRandom() && this.checkRandom()) {
      mailbox.count = 1;
      mailbox.size = Math.floor(Math.random() * 10) + 20;
    }
    return mailbox;
  }

  createVillage() { //village모델 만들기
    let numToBeName = 0;
    const villageDepth = (width, height, mailbox) => {
      const village = {
        name: String.fromCharCode((numToBeName++) + 65),
        width: Math.floor(width),
        height: Math.floor(height),
        mailbox: mailbox,
        child: []
      }

      if (this.checkRandom()) {
        const randomInt = this.getRandomInt(1, 3);
        for (let i = 0; i < randomInt; i++) {
          let villageWidth = this.getVillageWidth(width);
          let villageHeight = this.getVillageHeight(height);
          if (randomInt > 1) {
            villageWidth /= randomInt;
            villageHeight /= randomInt;
          }
          if (villageWidth > 30 && villageHeight > 30) {
            village.child.push(villageDepth(villageWidth, villageHeight, this.getRandomMailbox()));
          }
        }
      }
      return village;
    }

    for (let i = 0; i < 4; i++) { //제일 큰 마을이 4개라는 전제
      this.village[i] = villageDepth(this.getVillageWidth(399), this.getVillageHeight(319), this.getRandomMailbox());
    }
  }

  getVillage() {
    return [...this.village];
  }
}

class View {
  constructor({ model, villageMap }) {
    this.model = model;
    this.villageMap = villageMap;
  }

  run() {
    this.showVillage();
  }

  showVillage() {
    const villageArray = this.model.getVillage();
    const getModelInKey = ({ width, height, name, mailbox, child }) => {
      let template =
        `<div class="village" style="width:${width}px; height: ${height}px;">
        <span class="name">${name}</span>
        ${mailbox.count ?
          `<img class="red_mailbox_img"src="https://user-images.githubusercontent.com/61257242/100299908-2aa79800-2fd8-11eb-9759-763be50517fb.png"
          alt="" style="width:${mailbox.size}px;height:${mailbox.size}px">` : ''}`
      if (child) {
        child.forEach(ele => {
          template += getModelInKey(ele);
        })
      }
      template += `</div>`
      return template;
    }

    let villageTemplate = '';
    villageArray.forEach(ele => {
      villageTemplate += getModelInKey(ele);
    })
    this.villageMap.innerHTML = villageTemplate;
  }
}

class RedMailResultView {
  constructor({ resultButton }) {
    this.resultButton = resultButton;
  }
  run() {
    this.initEvent();
  }

  initEvent() {
    this.resultButton.addEventListener('click', this.confirmHandler);
  }

  confirmHandler = ({ target }) => {
    const villageNodeArray = this.getVillageNodeHavingMailbox();
    this.changeColorOfArray(villageNodeArray);
    const villageModel = this.convertToModel(villageNodeArray);

    target.nextElementSibling.firstElementChild.innerHTML =
      `${this.getVillageName(villageModel)} 총 ${this.getVillageName(villageModel).length}개의 마을입니다`;
    target.nextElementSibling.lastElementChild.innerHTML =
      `우체통의 크기는 ${this.getSortedVillageName(villageModel)} 순 입니다`;
  }

  getVillageNodeHavingMailbox() {
    const villageNodeArray = [];
    const searchForDom = ([...parentNode]) => {
      parentNode.forEach(ele => {
        const child = ele.firstElementChild;
        if (child && child.nextElementSibling && child.nextElementSibling.tagName === 'IMG') {
          villageNodeArray.push(ele);
        }
        if (ele.tagName === 'DIV') {
          searchForDom(ele.children);
        }
      })
    }
    searchForDom(document.body.children);
    return villageNodeArray;
  }

  changeColorOfArray(villageNodeArray) {
    villageNodeArray.forEach(ele => {
      ele.style.border = '2px solid red';
    })
  }

  convertToModel(villageNodeArray) {
    return villageNodeArray.map(ele => {
      return {
        name: ele.firstElementChild.innerHTML,
        size: ele.firstElementChild.nextElementSibling.style.width
      }
    })
  }

  getVillageName(villageModel) {
    return villageModel.map(ele => ele.name);
  }

  getSortedVillageName([...villageModel]) { //sort 알고리즘 구현 해야함
    return [...villageModel].sort((a, b) => b.size.substring(0, 2) - a.size.substring(0, 2)).map(ele => ele.name);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const model = new Model();
  const view = new View({ model, villageMap: document.querySelector('.village_map') });
  const redMailResultView = new RedMailResultView({ resultButton: document.querySelector('.red_mailbox_confirm') });

  view.run();
  redMailResultView.run();
})
