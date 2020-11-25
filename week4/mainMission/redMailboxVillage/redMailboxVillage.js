
//width : 399, height: 319 가 최대치로 잡는다
class Model {
  constructor() {
    this.village = [];
    this.init();
  }

  init() {
    this.createVillage();
    // this.createVillageForm();
    // this.shuffleToVillage();
  }

  checkRandom() {
    return Math.round(Math.random());
  }


  getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  createVillage() {
    let numToBeName = 0;

    const villageDepth = (height, width, mailbox) => {
      const village = {
        'name': String.fromCharCode((numToBeName++) + 65),
        'height': height,
        'width': width,
        'mailbox': mailbox,
        'child': []
      }

      if (this.checkRandom() && numToBeName < 17) {
        let randomInt = this.getRandomInt(1, 2);
        for (let i = 0; i < randomInt; i++) {
          village.child.push(villageDepth(1, 1, 1));
        }
      }
      return village;
    }

    for (let i = 0; i < 4; i++) {
      this.village[i] = villageDepth(2, 2, 2);
    }
  }

}

const model = new Model()
console.dir(model.village,{depth:null});



  // createVillageForm() {
  //   let count = 0;
  //   while (true) {
  //     this.village[String.fromCharCode(count + 65)] = {
  //       width: 0,
  //       height: 0,
  //       mailbox: {
  //         count: 0,
  //         size: 0
  //       },
  //       child: []
  //     };
  //     count++;
  //     if (count >= 12) {
  //       if (this.checkRandom()) {
  //         break;
  //       }
  //     }
  //   }
  // }

  // shuffleToVillage() {
  //   Object.keys(this.village);
  //   for (let key in this.village) {
  //     console.log(`${JSON.stringify(key)} : ${JSON.stringify(this.village[key])}`)
  //   }
  // }
