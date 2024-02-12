const draggable = document.getElementById('draggable');
const dropzone = document.getElementById('dropzone');

// Drag event listeners for the draggable element
draggable.addEventListener('dragstart', dragStart);
draggable.addEventListener('dragend', dragEnd);

// Drop event listeners for the dropzone element
dropzone.addEventListener('dragover', dragOver);
dropzone.addEventListener('dragenter', dragEnter);
dropzone.addEventListener('dragleave', dragLeave);
dropzone.addEventListener('drop', drop);

// Functions for drag events
function dragStart(e) {
  e.dataTransfer.setData('text/plain', draggable.id);
  setTimeout(() => {
    draggable.classList.add('hide');
  }, 0);
}

function dragEnd() {
  draggable.classList.remove('hide');
}

// Functions for drop events
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
