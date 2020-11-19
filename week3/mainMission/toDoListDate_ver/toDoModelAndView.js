const keyBy = (arr, key) => {
  const keyByObj = arr.reduce((acc, cur) => {
    if (acc[cur[key]] === undefined) {
      acc[cur[key]] = [];
    }
    acc[cur[key]].push(cur);
    return acc;
  }, {})
  return keyByObj;
}

class Model {
  constructor() {
    this.toDoModel = [];
    this.countId = 1;
    this.toDoModelDividedToDate = {};
  }

  addToArray(task, date) {
    this.toDoModel.push({ 'elementId': this.countId++, 'item': task, 'checked': false, 'date': date });
  }

  changeToChecked(id) {
    const eventTargetIndex = this.toDoModel.findIndex(element => (element.elementId === parseInt(id, 10)));
    if (this.toDoModel[eventTargetIndex]['checked'] === false) {
      this.toDoModel[eventTargetIndex]['checked'] = true;
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

  splitModelByDate() {
    this.toDoModelDividedToDate = keyBy(this.toDoModel, 'date');
  }

  getArraySortedByDate() {
    const arrayWithDateFirstValue = Object.entries(this.toDoModelDividedToDate);
    arrayWithDateFirstValue.sort((a, b) => new Date(a[0]) - new Date(b[0]));
    return arrayWithDateFirstValue;
  }

  getTodoModel() {
    return [...this.toDoModel];
  }
}

class View {
  constructor({ toDoModel }) {
    this.todoModel = toDoModel;
  }
  init(textInput, dateInput, article, addButton, viewByDateButton) {
    this.taskInput = textInput;
    this.dateInput = dateInput;
    this.article = article;
    this.viewByDateButton = viewByDateButton;
    this.addButton = addButton;
    this.viewByWritingOrderButton = this.createViewByWritingOrderButton();
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleRemoveButtonClick = this.handleRemoveButtonClick.bind(this);
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    this.handleEditOkButtonClick = this.handleEditOkButtonClick.bind(this);
    this.handleViewByDateButtonClick = this.handleViewByDateButtonClick.bind(this);
    this.handleViewByWritingOrderButtonClick = this.handleViewByWritingOrderButtonClick.bind(this);
    this.initEvent();
  }

  initEvent() {
    this.addButton.addEventListener('click', this.handleAddButtonClick);
    this.article.addEventListener('click', this.handleCheckBox);
    this.article.addEventListener('click', this.handleRemoveButtonClick);
    this.article.addEventListener('click', this.handleEditButtonClick);
    this.article.addEventListener('click', this.handleEditOkButtonClick);
    this.viewByDateButton.addEventListener('click', this.handleViewByDateButtonClick);
    this.viewByWritingOrderButton.addEventListener('click', this.handleViewByWritingOrderButtonClick)
  }

  handleAddButtonClick(event) {
    this.confirmToInput();
    this.todoModel.addToArray(this.taskInput.value, this.dateInput.value);
    this.togglePage();
    this.taskInput.value = '';
  }

  confirmToInput() {
    if (this.taskInput.value === '') {
      alert('내용을 입력해주세요');
      this.taskInput.focus();
      throw new Error('inputTask is undefined');
    } else if (this.dateInput.value === '') {
      alert('날짜를 입력해주세요');
      this.dateInput.focus();
      throw new Error('inputDate is undefined');
    }
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
      this.togglePage();
    }
  }

  showList(toDoModel) {
    const template = toDoModel.map(({ elementId, checked, item, date }) => (
      `<div class="contents" id="${elementId}">
        <span class="todo_checkbox_wrap">
          <input class="todo_checkbox" type="checkbox" ${checked ? 'checked' : ''}>
          <button class="edit_button">edit</button>
        </span>
        <span class="todo_item" style="text-decoration: ${checked ? 'line-through' : 'none'}">${item}</span><span class="date_view">${date}</span>
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
      this.togglePage();
    }
  }

  handleEditButtonClick(event) {
    if (event.target.className === 'edit_button') {
      const originalTaskTag = event.target.parentElement.parentElement.firstElementChild.nextElementSibling;
      const taskText = originalTaskTag.innerHTML;
      originalTaskTag.innerHTML = `<input class="edit_input" type="text" value="${taskText}">`;
      const editButton = event.target;
      const editOkButton = this.createEditOkButton();
      editButton.replaceWith(editOkButton);
    }
  }

  togglePage() {
    const buttonName = document.querySelector('button').className;
    if (buttonName === 'view_by_date') {
      this.showList(this.todoModel.getTodoModel());
    } else if (buttonName === 'view_by_writing_order') {
      this.todoModel.splitModelByDate();
      this.showListByDate();
    }
  }


  createEditOkButton() {
    const editOkButton = document.createElement('Button');
    editOkButton.className = 'edit_ok_button';
    editOkButton.innerHTML = 'Ok'
    return editOkButton;
  }

  handleEditOkButtonClick(event) {
    if (event.target.className === 'edit_ok_button') {
      const inputTask = event.target.parentElement.parentElement.firstElementChild.nextElementSibling.firstElementChild.value;
      const elementId = event.target.parentElement.parentElement.getAttribute('id');
      this.todoModel.editToArray(elementId, inputTask)
      this.togglePage();
    }
  }

  handleViewByDateButtonClick(event) {
    event.target.replaceWith(this.viewByWritingOrderButton);
    this.togglePage();
  }

  showListByDate() {
    const sortedDateArray = this.todoModel.getArraySortedByDate();
    let template = `<div class="view_by_date_page">`
    template += sortedDateArray.map(([first, second]) => `
      <div class="box_by_date">
      <div class="date_of_writing">${first}</div>
      ${second.map(({ elementId, checked, item, date }) =>
      `<div class="item_box" id = ${elementId}>
          <div>
            <input class="todo_checkbox" type="checkbox" ${checked ? 'checked' : ''}>
            <button class="edit_button">edit</button>
          </div>
          <li class="written" style="text-decoration: ${checked ? 'line-through' : 'none'}">${item}</li>
          <svg class="trash_basket" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            enable-background="new 0 0 32 32" id="Glyph" version="1.1" viewBox="0 0 32 32" xml:space="preserve">
          <path class="trash_basket_path" d="M6,12v15c0,1.654,1.346,3,3,3h14c1.654,0,3-1.346,3-3V12H6z M12,25c0,0.552-0.448,1-1,1s-1-0.448-1-1v-9  c0-0.552,0.448-1,1-1s1,0.448,1,1V25z M17,25c0,0.552-0.448,1-1,1s-1-0.448-1-1v-9c0-0.552,0.448-1,1-1s1,0.448,1,1V25z M22,25  c0,0.552-0.448,1-1,1s-1-0.448-1-1v-9c0-0.552,0.448-1,1-1s1,0.448,1,1V25z"
            id="XMLID_237_" />
          <path class="trash_basket_path" d="M27,6h-6V5c0-1.654-1.346-3-3-3h-4c-1.654,0-3,1.346-3,3v1H5C3.897,6,3,6.897,3,8v1c0,0.552,0.448,1,1,1h24  c0.552,0,1-0.448,1-1V8C29,6.897,28.103,6,27,6z M13,5c0-0.551,0.449-1,1-1h4c0.551,0,1,0.449,1,1v1h-6V5z"
            id="XMLID_243_" /></svg>
        </div>`
    )}
      </div>
    `) + `</div>`
    this.article.innerHTML = template;
  }


  createViewByWritingOrderButton() {
    const viewByWritingOrderButton = document.createElement('Button');
    viewByWritingOrderButton.className = 'view_by_writing_order';
    viewByWritingOrderButton.innerHTML = '작성순으로 보기';
    return viewByWritingOrderButton;
  }

  handleViewByWritingOrderButtonClick(event) {
    event.target.replaceWith(this.viewByDateButton);
    this.togglePage();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const toDoModel = new Model();
  const toDoView = new View({ toDoModel });
  const inputText = document.querySelector('.text_input');
  const inputDate = document.querySelector('.date_input')
  const article = document.querySelector('.article');
  const addButton = document.querySelector('.add_button');
  const viewByDateButton = document.querySelector('.view_by_date');
  toDoView.init(inputText, inputDate, article, addButton, viewByDateButton);
})
