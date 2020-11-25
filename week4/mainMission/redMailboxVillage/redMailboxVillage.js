class Model {
  constructor() {
    this.village = [];
    this.init();
  }

  init() {
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
      mailbox.size = Math.floor(Math.random() * 10) + 20
    }
    return mailbox;
  }

  createVillage() { //village모델 만들기
    let numToBeName = 0;
    const villageDepth = (width, height, mailbox) => {
      const village = {
        'name': String.fromCharCode((numToBeName++) + 65),
        'width': Math.floor(width),
        'height': Math.floor(height),
        'mailbox': mailbox,
        'child': []
      }

      if (this.checkRandom() && numToBeName < 17) { //numToBeName은 알파벳 Z를 최대한 넘기지 않는 확률까지.. 
        const randomInt = this.getRandomInt(1, 2);
        for (let i = 0; i < randomInt; i++) {
          let villageWidth = this.getVillageWidth(width);
          let villageHeight = this.getVillageHeight(height);
          if(randomInt > 1){
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

    for (let i = 0; i < 4; i++) {
      this.village[i] = villageDepth(this.getVillageWidth(399), this.getVillageHeight(319), this.getRandomMailbox());
    }
  }
}

const model = new Model()
console.dir(model.village, { depth: null });