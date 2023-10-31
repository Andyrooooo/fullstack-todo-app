const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 5501
// const fs = require('fs')
// we have cors, body-parser, express, nodemon

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.get('/', (req, res) => {
//   fs.readFile('db.json', (err, data) => {
//     if (err) {
//       res.send('An error occurred')
//       return res.status(500)
//     }
//     const dataObj = JSON.parse(data)
//     res.json(dataObj) 
//   }) 
// })


let categories = [
  {
    categoryName: "Work",
    categoryID: 1
  },
  {
    categoryName: "School",
    categoryID: 2
  },
  {
    categoryName: "Fitness",
    categoryID: 3
  },
] 
  
let todos = [ 
  // {
  //   todoName: "Take out the trash",
  //   todoCategory: 0, 
  //   todoID: 1
  // },
  // {
  //   todoName: "Finish the todo app",
  //   todoCategory: 1,
  //   todoID: 2
  // },
  // {
  //   todoName: "Start my other project",
  //   todoCategory: 1,
  //   todoID: 3
  // },
  // {
  //   todoName: "Go for a walk",
  //   todoCategory: 2,
  //   todoID: 4
  // },
]



// grabs all todos in the array
app.get('/todos', (req, res) => {
    res.send(todos)
  })


  // adds a new todo object to the array
  app.post('/todo', (req, res) => {

    console.log('new todo: ', req.body.todoName, req.body.todoCategory, req.body.todoID)

    let newTodoID = todos.length === 0 ? 1 : todos.at(-1).todoID + 1

    let newTodo = {
      todoName: req.body.todoName,
      todoCategory: req.body.todoCategory,
      todoID: newTodoID
    }
 
    todos = [...todos, newTodo]

    console.log(todos)
    res.send(todos)
  })


  // updates a todo objects name in the array
  app.put('/todos/:id', (req, res) => {

      let requestedTodoID = req.params.id
      let newTodoName = req.body.todoName

      let todoToUpdate = todos.find(todo => todo.todoID == requestedTodoID)
      todoToUpdate.todoName = newTodoName

      console.log('old todo with new name: ', todoToUpdate)
      res.send(todos) 
  })


  // deletes a todo object from the array
  app.delete('/todos/:id', (req, res) => {

    let requestedTodoID = req.params.id

    todos = todos.filter(todo => todo.todoID != requestedTodoID)

    console.log(todos) 
    res.send(todos)
  })


  // gets all todos for a category
  app.get('/todos/categories/:categoryID', (req, res) => {

    let requestedTodoCategory = req.params.categoryID

    let filteredTodos = todos.filter(todo => todo.todoCategory == requestedTodoCategory)

    res.send(filteredTodos)
    console.log(requestedTodoCategory)
    // res.send("I am a get request for the categories")
  })


  // gets just the categories
  app.get('/categories', (req, res) => {
    /* let categoryList = categories.map(category => category.categoryName)

    let uniqueCategoryNames = new Set(categoryList)
    let uniqueCategories = [...uniqueCategoryNames] */

    res.send(categories)
  })

   // adds a new category object to the array 
   app.post('/categories', (req, res) => {

    let newCategoryID = categories.length === 0 ? 1 : categories.at(-1).categoryID + 1

    let newCategory = {
      categoryName: req.body.categoryName,
      categoryID: newCategoryID
    }
 
    categories = [...categories, newCategory]

    console.log(categories)

    res.send(categories)
  })  
 

  // updates a todo objects category in the array
  app.put('/categories/:oldCategoryName', (req, res) => {
     
    let requestedTodoCategory = req.params.oldCategoryName
    let newCategoryName = req.body.categoryName

    let categoryToUpdate = categories.find(category => category.categoryName == requestedTodoCategory)
    categoryToUpdate.categoryName = newCategoryName  

    // let categories = todos.map(todo => todo.todoCategory)
    // let filteredCategories = categories.filter(category => category.todoCategory == newCategoryName)

    // keeping this just incase the object keeps old data inside of it
    // categories.forEach(category => {
    //   if (category.categoryName == newCategoryName) {
    //     category.categoryName = newCategoryName
    //   }  
    // }) 
    // console.log("all categories I requested: ", todos)
    
    console.log(categories, todos)
    res.send(categories)
})   
 
  
// deletes a todo category from the object  
app.delete('/categories/:categoryName', (req, res) => { 

  let requestedTodoCategory = req.params.categoryName
 
  categories = categories.filter(category => category.categoryName != requestedTodoCategory) 
  
  console.log(categories)   
  res.send(categories)  
 
  // categories = categories.map(category => {
  //   if (category.categoryID == requestedTodoCategory) { 
  //     todo.todoCategory = "empty"
  //   } 
  //   return todo
  // })
}) 

 
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})



