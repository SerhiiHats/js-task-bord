const lists = document.querySelectorAll('.list');
const btnAddBoards = document.querySelector('.button-add-boards');


function addTask() {
  const btn = document.querySelector('.add__btn');
  const addBtn = document.querySelector('.item-btn-add');
  const cancelBtn = document.querySelector('.item-btn-cancel');
  const textarea = document.querySelector('.textarea');
  const form = document.querySelector('.form');

  let value;

  btn.addEventListener('click', () => {
    form.style.display = 'block';
    btn.style.display = 'none';
    textarea.focus();

    textarea.addEventListener('input', (e) => {
      value = e.target.value;
    })

    textarea.addEventListener('blur', () => {
      if (!value) {
        form.style.display = 'none';
        btn.style.display = 'flex';
      }
    })
  });

  cancelBtn.addEventListener('click', () => {
    textarea.value = '';
    value = '';
    form.style.display = 'none';
    btn.style.display = 'flex';

  });

  addBtn.addEventListener('click', () => {
    if (value) {
      const newItem = document.createElement('div');
      newItem.classList.add('list__item');
      newItem.draggable = true;
      newItem.textContent = value;
      newItem.innerHTML += ` <i class="fa-regular fa-trash-can"></i>`;

      lists[0].append(newItem);
      textarea.value = '';
      value = '';
      form.style.display = 'none';
      btn.style.display = 'flex';

      dragNDrop();
    }

  });
}

addTask();

function addBoard() {
  const newBoard = document.createElement('div');
  newBoard.classList.add('boards__item');
  newBoard.innerHTML = `
   <span class="title">
       <span contenteditable="true" class="title__text">Enter name of your board</span>
       <i class="fa-regular fa-pen-to-square"></i>
   </span>
   <div class="list"></div>
`
  // todo: add correct title

  btnAddBoards.before(newBoard);
  changeTitle();
  dragNDrop();
}

btnAddBoards.addEventListener('click', addBoard);

function changeTitle() {
  const titles = document.querySelectorAll('.title__text');

  titles.forEach(titleText => {

    //------- click title  -----------
    titleText.addEventListener('click', e => e.target.textContent = '')

    //------- lost focus title  -----------
    titleText.addEventListener('blur', e => {
      if (!e.target.textContent) {
        e.target.textContent = 'Enter name of your board';
      }
    });

    //------- click icon edit  -----------
    titleText.nextElementSibling.addEventListener('click', (e) => {
      e.target.previousElementSibling.click();
      e.target.previousElementSibling.focus();
    });

  });
}

changeTitle();

let draggedItem = null;

function dragNDrop() {
  const listItems = document.querySelectorAll('.list__item')
  const lists = document.querySelectorAll('.list');


  for (const item of listItems) {

    item.addEventListener('dragstart', () => {
      draggedItem = item;
      setTimeout(() => {
        item.style.display = "none";
      }, 0);
    });

    item.addEventListener('dragend', () => {

      setTimeout(() => {
        item.style.display = "block";
        draggedItem = null;
      }, 0);
    });

    item.addEventListener('dblclick', () => {
      item.remove();
    });

    // ------- remove list__item   -----------
    item.firstElementChild.addEventListener('click', (e) => {
      e.target.parentElement.remove();
    });
  }

  for (const list of lists) {

    list.addEventListener('dragover', (e) => e.preventDefault());

    list.addEventListener('dragenter', function () {
      this.style.backgroundColor = "rgba(155, 155, 155, 0.3)";

    });

    list.addEventListener('dragleave', function () {
      this.style.backgroundColor = "rgba(0, 0, 0, 0)";
    });

    list.addEventListener('drop', function () {
      this.style.backgroundColor = "rgba(0, 0, 0, 0)";
      this.append(draggedItem);
    });

  }

}


dragNDrop();
