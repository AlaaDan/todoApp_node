const { request, response } = require("express");
const express = require("express");
const app = express();
const PORT = 8000;

app.use(express.json());

const todosList = [ 
    {
        toDo: "Cleadning",
        id: 1,
        done: false,
        createdAt: new Date
    },
    {
        toDo: "Laundry",
        id: 2,
        done: false,
        createdAt: new Date
    },
    {
        toDo: "Cook food",
        id: 3,
        done: false,
        createdAt: new Date
    },

]

app.get('/api/todo', (request, response)=>{
    response.json(todosList)
})


app.post('/api/todo', (request, response)=>{
    const requestedTodo = request.body;

    const result = {
        success: true
    }

    if (requestedTodo.hasOwnProperty('toDo') &&
        requestedTodo.hasOwnProperty('done')){
            todosList.forEach(todo =>{
                if (todo.toDo === requestedTodo.toDo){
                    result.success = false
                    console.log(`The ${todo} to already exests in the list`)
                }
            }) 
        }
    if (result.success) {
        const id = todosList.length + 1
        const date = new Date
        requestedTodo.id = id
        requestedTodo.date = date
        todosList.push(requestedTodo)
    }
    response.json(result)
})

app.delete('/api/todo/:id', (request, response) =>{
    const deleteId = request.params.id;
    function remove(list, id){
        return list.filter(eve, eve.id !== id )

    } 
    const result = remove(todosList, deleteId)
    response.json(result)
})

app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT} started!`)
})