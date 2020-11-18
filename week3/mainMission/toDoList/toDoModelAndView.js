class Model {
  constructor() {
    this.toDoModel = [];
    this.countId = 1;
  }
  addToArray(task) {
    if (task !== '') {
      this.toDoModel.push({ 'elementId': this.countId++, 'item': task, 'checked': false });
    }
  }

  changeToChecked(id) {
    const eventTargetIndex = this.toDoModel.findIndex(element => (element.elementId === parseInt(id, 10)));
    if (this.toDoModel[eventTargetIndex]['checked'] === false) {
      this.toDoModel[eventTargetIndex]['checked'] = true
    } else {
      this.toDoModel[eventTargetIndex]['checked'] = false;
    }
  }

  editToArray(id, task) {
    const eventTargetIndex = this.toDoModel.findIndex(element => (element.elementId === parseInt(id, 10)));
    this.toDoModel[eventTargetIndex]['item'] = task;
  }

  removeToArray(id) {
    const eventTargetIndex = this.toDoModel.findIndex(element => (element.elementId === parseInt(id, 10)));
    this.toDoModel.splice(eventTargetIndex, 1);
  }

  getTodoModel() {
    return [...this.toDoModel]
  }
}

class View {
  constructor({ toDoModel }) {
    this.todoModel = toDoModel;
  }
  init(input, article) {
    this.task = input;
    this.article = article;
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    this.handleEditOkButtonClick = this.handleEditOkButtonClick.bind(this);
    this.initEvent();
  }

  initEvent() {
    const articleTag = this.article;
    document.querySelector('.add_button').addEventListener('click', this.handleAddButtonClick);
    articleTag.addEventListener('click', this.handleCheckBox);
    articleTag.addEventListener('click', this.handleRemoveButtonClick);
    articleTag.addEventListener('click', this.handleEditButtonClick);
    articleTag.addEventListener('click', this.handleEditOkButtonClick);
  }

  handleAddButtonClick(event) {
    this.todoModel.addToArray(this.task.value);
    this.showList(this.todoModel.getTodoModel());
    this.task.value = '';
  }

  handleRemoveButtonClick(event) {
    const className = {
      'trash_basket': (target) => target.parentElement.getAttribute('id'),
      'trash_basket_path': (target) => target.parentElement.parentElement.getAttribute('id')
    }
    const getIdFunc = className[event.target.getAttribute('class')]
    if (getIdFunc) {
      const id = getIdFunc(event.target)
      this.todoModel.removeToArray(id);
      this.showList(this.todoModel.getTodoModel());
    }
  }

  showList(toDoModel) {
    const template = toDoModel.map(({ elementId, checked, item }) => (
      `<div class="contents" id="${elementId}">
        <span class="todo_checkbox_wrap">
          <input class="todo_checkbox" type="checkbox" ${checked ? 'checked' : ''}>
          <button class="edit_button">edit</button>
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
      this.todoModel.changeToChecked(elementId);
      this.showList(this.todoModel.getTodoModel());
    }
  }

  handleEditButtonClick(event) {
    if (event.target.className === 'edit_button') {
      const originalTask = event.target.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
      event.target.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML = `<input class="edit_input" type="text" value="${originalTask}">`;
      const editButton = event.target.parentElement.parentElement.firstElementChild.firstElementChild.nextElementSibling;
      const editOkButton = document.createElement('Button');
      editOkButton.className = 'edit_ok_button';
      editOkButton.innerHTML = 'Ok';
      editButton.replaceWith(editOkButton);
    }
  }

  handleEditOkButtonClick(event) {
    if (event.target.className === 'edit_ok_button') {
      const inputTask = event.target.parentElement.parentElement.firstElementChild.nextElementSibling.firstElementChild.value;
      const elementId = event.target.parentElement.parentElement.getAttribute('id');
      this.todoModel.editToArray(elementId, inputTask)
      this.showList(this.todoModel.getTodoModel());
    }
  }

}


document.addEventListener('DOMContentLoaded', () => {
  const toDoModel = new Model();
  const toDoView = new View({ toDoModel });
  const inputText = document.querySelector('.text_input');
  const article = document.querySelector('.article');
  toDoView.init(inputText, article);
})
