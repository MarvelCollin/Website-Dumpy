const draggable = document.getElementById('draggable');
const dropzone = document.getElementById('dropzone');

draggable.addEventListener('dragstart', dragStart);
draggable.addEventListener('dragend', dragEnd);

dropzone.addEventListener('dragover', dragOver);
dropzone.addEventListener('dragenter', dragEnter);
dropzone.addEventListener('dragleave', dragLeave);
dropzone.addEventListener('drop', drop);

function dragStart(e) {
  e.dataTransfer.setData('text/plain', draggable.id);
  setTimeout(() => {
    draggable.classList.add('hide');
  }, 0);
}

function dragEnd() {
  draggable.classList.remove('hide');
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  dropzone.classList.add('hovered');
}

function dragLeave() {
  dropzone.classList.remove('hovered');
}

function drop(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData('text/plain');
  const draggedElement = document.getElementById(data);
  dropzone.appendChild(draggedElement);
  dropzone.classList.remove('hovered');
}
