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
    addBtn.style.display = 'none';

    textarea.addEventListener('input', (e) => {
      value = e.target.value;

      if (value) {
        addBtn.style.display = 'flex';
      } else {
        addBtn.style.display = 'none';
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
    const newItem = document.createElement('div');
    newItem.classList.add('list__item');
    newItem.draggable = true;
    newItem.textContent = value;

    lists[0].append(newItem);
    textarea.value = '';
    value = '';
    form.style.display = 'none';
    btn.style.display = 'flex';

    dragNDrop();
  });
}

addTask();

function addBoard() {
  const boards = document.querySelector('.boards');
  const newBoard = document.createElement('div');
  newBoard.classList.add('boards__item');
  newBoard.innerHTML = `
   <span contenteditable="true" class="title">Enter name of your board</span>
   <div class="list"></div>
`
  boards.append(newBoard);
  changeTitle();
  dragNDrop();
}

btnAddBoards.addEventListener('click', addBoard);

function changeTitle() {
  const titles = document.querySelectorAll('.title');
  titles.forEach(title => {
    title.addEventListener('click', e => e.target.textContent = '')
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
  }

  for (const list of lists) {
  //
  // }
  // for (let j = 0; j < lists.length; j++) {
  //   const list = lists[j];
    list.addEventListener('dragover', (e) => e.preventDefault());

    list.addEventListener('dragenter', function(e){
      this.style.backgroundColor = "rgba(155, 155, 155, 0.3)";

    });

    list.addEventListener('dragleave', function(e){
      this.style.backgroundColor = "rgba(0, 0, 0, 0)";
    });

    list.addEventListener('drop', function(e){
      this.style.backgroundColor = "rgba(0, 0, 0, 0)";
      this.append(draggedItem);
      // draggedItem = null;
    });

  }

}

dragNDrop();
