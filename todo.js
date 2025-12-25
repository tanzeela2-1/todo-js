const addList = document.querySelector('#list'); // display list
const myTodo = document.querySelector('.todo'); // add new task
const inputTaskEl = document.querySelector('#text'); //enter task
const priorityEl = document.querySelector('#priority'); //priority tasks
const resetButton = document.querySelector('#reset'); // reset button
let arrTask = JSON.parse(localStorage.getItem('tasks')) || [];
function saveTask() {
  localStorage.setItem('tasks', JSON.stringify(arrTask));
}
function deleteFn(index) {
  arrTask.splice(index, 1);
  renderTask(); //to display changes
  saveTask();
}
function renderTask() {
  addList.innerHTML = '';
  arrTask.forEach((task, index) => {
    //index+1 so that numbering starts at 1 and if we delete some list el numbering changes accordingly
    const newTask = `<li class="task-item">
    <div class="task-left">
     <input 
      type="checkbox"
      onclick="toggleTask(${index})"
      ${task.completed ? 'checked' : ''}
    >
    <span class="${task.completed ? 'completed' : ''}">
      ${index + 1}. ${task.text}
    </span>
    </div>
    <div class="task-right">
     <strong class="priority-${task.priority}">
      (${task.priority})
    </strong>
     <button onclick="editTask(${index})">Edit</button>
   <button class="delete-item" onclick="deleteFn(${index})">Delete</button>
   </div></li>
    `;

    addList.insertAdjacentHTML('beforeend', newTask);
  });
}
myTodo.addEventListener('click', () => {
  const inputText = inputTaskEl.value; //value of input type stored in new variable
  if (inputText === '') {
    alert('Please Enter a Task');
    return;
  }
  arrTask.push({
    text: inputText,
    completed: false,
    priority: priorityEl.value,
  });
  saveTask();

  renderTask();
  inputTaskEl.value = ''; //make value zero after we add a task
  inputTaskEl.focus(); //focus mouse to input again
});
function toggleTask(index) {
  arrTask[index].completed = !arrTask[index].completed;
  saveTask();
  renderTask();
}
function editTask(index) {
  const newTask = prompt('Edit Task', arrTask[index].text);
  if (newTask === ' ') return;
  const newPriority = prompt('Edit priority', arrTask[index].priority);
  arrTask[index].text = newTask;
  if (newPriority) {
    arrTask[index].priority = newPriority;
  }
  saveTask();
  renderTask();
}
renderTask(); //initial render
resetButton.addEventListener('click', () => {
  arrTask = [];
  saveTask();
  renderTask();
});
