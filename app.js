//Define all the vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const inputTask = document.querySelector('#task');
const clearbtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter'); 

//load all event listeners
loadEventListerners();

//load all event listeners
function loadEventListerners(){
  // DOM event load
  document.addEventListener('DOMContentLoaded', getTask); 
  //Add task to list
  form.addEventListener('submit', addTask);
  //Remove task 
  taskList.addEventListener('click', removeTask);
  //clear tasks list
  clearbtn.addEventListener('click', clearTasks);
  //filter tasks list
  filter.addEventListener('keyup', filterTasks)
}
// get taskItem from taskArr & display it 
function getTask(){
//define taskArr
  let taskArr;
  if (localStorage.getItem('taskArr') == null){
    taskArr = [];
  }
  else{
    //when some taskItem is already present in taskArr --> get that taskItem from taskArr
    taskArr = JSON.parse(localStorage.getItem('taskArr')); 
  }
//for each taskItem, create a li(with link) & append it to ui 
taskArr.forEach(function(taskItem){
  //create li element
  const li = document.createElement('li');
  //Add class
  li.className = 'collection-item';
  // Create text node & append
  li.appendChild(document.createTextNode(taskItem));
  //create link element
  const link = document.createElement('a');
  //Add class
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fas fa-trash"></i>';
  //append  link to li
  li.appendChild(link);
  //append li to ul
  taskList.appendChild(li);
})
}

//Add task 
function addTask(e){
  if (inputTask.value === ''){
    alert("Add a task")
  }
  else{
  //create li element
  const li = document.createElement('li');
  //Add class 
  li.className = 'collection-item';
  // Create text node & append
  li.appendChild(document.createTextNode(inputTask.value));
  //create link element
  const link = document.createElement('a');
  //Add class
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fas fa-trash"></i>';
  //append  link to li
  li.appendChild(link);
  //append li to ul
  taskList.appendChild(li); 

//add inputTask.value to LS
  storeTaskItemInLocalStorage(inputTask.value);

  inputTask.value='';
  }
  inputTask.value='';
  e.preventDefault();
}

 //To add inputTask.value (i.e. taskItem) to LS in a taskArr (which is an array of taskItems)
function storeTaskItemInLocalStorage(taskItem){
  let taskArr;
  if (localStorage.getItem('taskArr') == null){
    taskArr = [];
  }
  else{
    //when some taskItem is already present in taskArr --> get that taskItem from taskArr
    taskArr = JSON.parse(localStorage.getItem('taskArr')); 
  }
  //taskArr is defined & ready to take new input
  //now push taskItem (i.e inputTask.value) into taskArr
  taskArr.push(taskItem);
  //store taskArr to LS; Keyword = taskArr (can be different also)
  localStorage.setItem('taskArr',JSON.stringify(taskArr)); 
}


//EVENT DELEGATION --> for deleting task 

//Delete task
function removeTask(e){
  if (e.target.parentElement.classList.contains('delete-item')){
    if(confirm('u sure, dude?')){
    e.target.parentElement.parentElement.remove(); 

    //remove from local storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}


function removeTaskFromLocalStorage(itemToBeDeleted){
  let taskArr;
  if (localStorage.getItem('taskArr') == null){
    taskArr = [];
  }
  else{
    //when some taskItem is already present in taskArr --> get that taskItem from taskArr
    taskArr = JSON.parse(localStorage.getItem('taskArr')); 
  }
  //taskArr is defined

  taskArr.forEach(function(taskItem, index){
    if(itemToBeDeleted.textContent === taskItem ){
      taskArr.splice(index, 1);
    }
    //update local storage 
    localStorage.setItem('taskArr', JSON.stringify(taskArr)); 
  })
}


//clear tasks 
function clearTasks(){
  taskList.innerHTML='';
  clearTaskFromLocalStorage();
}


function clearTaskFromLocalStorage(){
  localStorage.clear(); 
}


//filter tasks
 function filterTasks(e){
  const searchItem = e.target.value.toLowerCase();
  //NodeList of li tags 
  const collectionItems = document.querySelectorAll(".collection-item");
  collectionItems.forEach(function(collectionItem){
    if(collectionItem.innerText.toLowerCase().indexOf(searchItem) != -1){
      collectionItem.style.display = "block";
    } else {
      collectionItem.style.display = "none";
    }
  })
 }




 //ADDITION TO LS 
 //STEP1: save to local storage -->  storeTaskItemInLocalStorage(inputTask);
 //STEP2: display on User interface; need an (which is 'DOMContentLoaded') event listener on 'document' --> getTask  