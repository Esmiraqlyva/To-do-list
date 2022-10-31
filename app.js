let newTodoForm= document.querySelector('.new-todo-form') ;
let newTodoFormText = document.querySelector('.new-todo-form input') ;
let todoFormBtn = document.querySelector('.new-todo-form button') ;
let todoList = document.querySelector('.todo-list');
let enableNewTodoForm = document.querySelector('#add-todo');
let removeSingleTodo = document.querySelectorAll('.remove-todo');
let sortTodosBtn = document.querySelector('.sort-todos');
let sortingType = 'AZ';
let todoApi = [
    {
        id : 1 ,
        task : '1' 
    }
]


enableNewTodoForm.addEventListener('click',()=>{
    newTodoForm.classList.add('enabled')
})

todoFormBtn.addEventListener('click',()=>{
    newTodoForm.classList.remove('enabled')
})

newTodoFormText.addEventListener('keydown',(e)=>{
     if(e.key === 'Enter'){
        createTodoItem(newTodoFormText.value,todoApi.length+1)
        todoApi.push({
            id : todoApi.length+1 ,
            task : newTodoFormText.value
        });
        newTodoFormText.value = '';
     }
})

sortTodosBtn.addEventListener('click',()=>{sortTodos(todoApi)})

function createTodoItem(task , id){
    let newTodoItem = document.createElement('li');
    let TodoItemText = document.createElement('span');
    let TodoItemRemove = document.createElement('i');
    TodoItemText.innerText = task;
    TodoItemRemove.classList.add('fa','fa-close','remove-todo');
    newTodoItem.className='single-todo-item';
    newTodoItem.appendChild(TodoItemText);
    newTodoItem.appendChild(TodoItemRemove);
    newTodoItem.dataset.key = id;
    todoList.appendChild(newTodoItem);
    removeSingleTodo= document.querySelectorAll('.remove-todo')
    initRemoveEvents()
}

function initRemoveEvents(){
    let newTodoList = [] ;
    removeSingleTodo.forEach(element => {
        element.onclick = (e)=>{
           e.target.parentElement.remove();
            todoApi = todoApi.filter(item=> item.id !=e.target.parentElement.dataset.key)
            console.log(todoApi)
        }
    });
}

function initApp(endpoint){
    endpoint.forEach(todo=>{
        createTodoItem(todo.task,todo.id)
    })
}

function sortTodos(endpoint){
    let sortedItems = [] ;

    if(sortingType=='AZ'){
        sortedItems = endpoint.sort((a,b)=>{return b.task-a.task} );
        sortingType = 'ZA' ;
        sortedItems.forEach(todo=>{
            createTodoItem(todo.task)
        })
        if(sortTodosBtn.classList.contains('fa-sort-amount-asc')){
            sortTodosBtn.classList.remove('fa-sort-amount-asc')
            sortTodosBtn.classList.add('fa-sort-amount-desc')
        }
    }else if(sortingType='ZA'){
        sortedItems = endpoint.sort((a,b)=>{ return a.task-b.task});
        sortingType = 'AZ' ;
        sortedItems.forEach(todo=>{
            createTodoItem(todo.task)
        })
        if(sortTodosBtn.classList.contains('fa-sort-amount-desc')){
            sortTodosBtn.classList.remove('fa-sort-amount-desc')
            sortTodosBtn.classList.add('fa-sort-amount-asc')
        }
    }

     removeChildNodes(todoList);
     initApp(sortedItems)
}

function removeChildNodes(parentEl){
 console.log([...parentEl.children]);
 [...parentEl.children].forEach(item=>{item.remove()})
}


initRemoveEvents()

 

initApp(todoApi)