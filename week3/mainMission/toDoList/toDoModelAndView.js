class Model {
  constructor() {
    this.toDoList = [];
    this.countId = 1;
  }
  addList(task) {
    if (task !== '') {
      this.toDoList.push({ 'elementId': this.countId++, 'item': task, 'checked': false });
    }
  }

  updateChecked(id) {
    const eventTargetIndex = this.toDoList.findIndex(element => (element.elementId === parseInt(id, 10)));
    if (this.toDoList[eventTargetIndex]['checked'] === false) {
      this.toDoList[eventTargetIndex]['checked'] = true
    } else {
      this.toDoList[eventTargetIndex]['checked'] = false;
    }
  }

  removeList(id) {
    const eventTargetIndex = this.toDoList.findIndex(element => (element.elementId === parseInt(id, 10)));
    this.toDoList.splice(eventTargetIndex, 1);
  }

  getTodoList() {
    return [...this.toDoList]
  }
}

class View {
  constructor({ toDoModel }) {
    this.task = document.querySelector('.text_input');
    this.article = document.querySelector('.article');
    this.todoModel = toDoModel;
  }
  init() {
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
    this.initEvent();
  }

  initEvent() {
    document.querySelector('.add_button').addEventListener('click', this.handleAddButtonClick);
    document.querySelector('.article').addEventListener('click', this.handleCheckBox);
    document.querySelector('.article').addEventListener('click', this.handleRemoveButtonClick);
  }

  handleAddButtonClick(event) {
    this.todoModel.addList(this.task.value);
    this.showList(this.todoModel.getTodoList());
  }

  handleRemoveButtonClick(event) {
    const className = {
      'trash_basket': (target) => target.parentElement.getAttribute('id'),
      'trash_basket_path': (target) => target.parentElement.parentElement.getAttribute('id')
    }
    const getIdFunc = className[event.target.getAttribute('class')]
    if (getIdFunc) {
      const id = getIdFunc(event.target)
      this.todoModel.removeList(id);
      this.showList(this.todoModel.getTodoList());
    }
  }


  showList(toDoList) {
    const template = toDoList.map(({ elementId, checked, item }) => (
      `<div class="contents" id="${elementId}">
        <span class="todo_checkbox_wrap">
          <input class="todo_checkbox" type="checkbox" ${checked ? 'checked' : ''}>
        </span>
        <span class="todo_item" style="text-decoration: ${checked ? 'line-through' : 'none'}">${item}</span>
        <svg class="trash_basket" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        enable-background="new 0 0 32 32" id="Glyph" version="1.1" viewBox="0 0 32 32" xml:space="preserve">
          <path class="trash_basket_path" d="M6,12v15c0,1.654,1.346,3,3,3h14c1.654,0,3-1.346,3-3V12H6z M12,25c0,0.552-0.448,1-1,1s-1-0.448-1-1v-9  c0-0.552,0.448-1,1-1s1,0.448,1,1V25z M17,25c0,0.552-0.448,1-1,1s-1-0.448-1-1v-9c0-0.552,0.448-1,1-1s1,0.448,1,1V25z M22,25  c0,0.552-0.448,1-1,1s-1-0.448-1-1v-9c0-0.552,0.448-1,1-1s1,0.448,1,1V25z"
          id="XMLID_237_" />
          <path class="trash_basket_path" d="M27,6h-6V5c0-1.654-1.346-3-3-3h-4c-1.654,0-3,1.346-3,3v1H5C3.897,6,3,6.897,3,8v1c0,0.552,0.448,1,1,1h24  c0.552,0,1-0.448,1-1V8C29,6.897,28.103,6,27,6z M13,5c0-0.551,0.449-1,1-1h4c0.551,0,1,0.449,1,1v1h-6V5z"
          id="XMLID_243_" /></svg>
       </div>`
    )).join('')
    this.article.innerHTML = template;
  }


  handleCheckBox(event) {
    if (event.target.className === "todo_checkbox") {
      const elementId = event.target.parentElement.parentElement.getAttribute('id');
      this.todoModel.updateChecked(elementId);
      this.showList(this.todoModel.getTodoList());
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const toDoModel = new Model();
  const toDoView = new View({ toDoModel });
  toDoView.init();
})
