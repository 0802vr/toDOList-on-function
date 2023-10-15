import './style.css'
import {v4 as uuid4} from 'uuid'
console.log(uuid4())
 type Task = {
    id: string;
    title: string;
    completed: boolean;
    createAt: Date;
}
const list = document.getElementById("list") as HTMLUListElement;
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-title");

const tasks:Task[] = loadTasks()
tasks.forEach(addListTask)

form?.addEventListener('submit', (e)=> {
    e.preventDefault()
    if(input?.value == "" || input?.value == null) return

    const newTask:Task = {
        id:uuid4(),
        title:input.value,
        completed: false,
        createAt: new Date()
    }
     tasks.push(newTask)
     addListTask(newTask)
     input.value = ''
})
function addListTask(task:Task):void{
    const item = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.addEventListener('change', ()=> {
        task.completed = checkbox.checked
        console.log(tasks)
        saveTasks()
    })
    checkbox.type = 'checkbox';    
    checkbox.checked = task.completed
    console.log(task)
    label.append(checkbox, task.title)
    item.append(label)
    list.append(item)

}
function saveTasks(){
    localStorage.setItem("TASKS", JSON.stringify(tasks))
}
function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS")
  if (taskJSON == null) return []
  return JSON.parse(taskJSON)
} 
 
