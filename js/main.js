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

  });
}

addTask();

function addBoard() {
  const boards = document.querySelector('.boards');
  const newBoard = document.createElement('div');
  newBoard.classList.add('boards__item');
  newBoard.innerHTML = `
   <span contenteditable="true" class="title">Enter name</span>
   <div class="list"></div>
`
  boards.append(newBoard);
  changeTitle();
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


}

dragNDrop();
