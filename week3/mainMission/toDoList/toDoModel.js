class Model {
  constructor() {
    this.toDoList = [];
    this.countId = 1;
  }
  addList(task) {
    this.toDoList.push({ 'id': this.countId++, item: task });
  }
  removeList(countId) {
    const eventTargetIndex = this.toDoList.findIndex(element => (element.id === countId))
    this.toDoList.splice(eventTargetIndex, 1);
  }
}

const model = new Model();
model.addList('aa');
model.addList('bbasd');
console.log(model.toDoList);
model.removeList(2);
console.log(model.toDoList);




// let checkBox = document.querySelector('.todo_checkbox');
// checkBox.addEventListener('click', (event) => {
//   if (checkBox.checked === false) {
//     event.target.parentElement.nextElementSibling.style.textDecoration = 'none';
//   } else {
//     event.target.parentElement.nextElementSibling.style.textDecoration = 'line-through';
//   }
// })



