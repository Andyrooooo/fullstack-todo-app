let displayTodos = document.querySelector(".displayTodos")
let newTodoForm = document.querySelector("#newTodoForm")
let todoInputName = document.querySelector(".todoInputName")
let todoMessages = document.querySelector(".todoMessages")
let todoSelectCategory = document.querySelector(".todoSelectCategory")
let categoryInputName = document.querySelector(".categoryInputName")
let newTodoCategoryForm = document.querySelector("#newTodoCategoryForm")
let deleteCategorySelect = document.querySelector(".deleteCategorySelect")
let deleteCategoryBTN = document.querySelector(".deleteCategoryBTN")
let editCategorySelect = document.querySelector(".editCategorySelect")
let editCategoryBTN = document.querySelector(".editCategoryBTN")
let editCategoryInputName = document.querySelector(".editCategoryInputName")
let toggleCategoriesBTN = document.querySelector(".toggleCategoriesBTN")
let deleteEditAddCategories = document.querySelector(".deleteEditAddCategories")
// deleteEditAddCategories.style.display = "none"

// Function to create a todo item element
function createTodoItem(todo, category) {
    let todoListItem = document.createElement("li")
    let todoInputDisplayName = document.createElement("input")
    todoInputDisplayName.setAttribute("readonly", "true")
    todoInputDisplayName.value = todo.todoName

    let todoInputDisplayCategory = document.createElement("input")
    todoInputDisplayCategory.setAttribute("readonly", "true")
    todoInputDisplayCategory.value = category.categoryName

    todoListItem.appendChild(todoInputDisplayName)
    todoListItem.appendChild(todoInputDisplayCategory)

    return todoListItem
}

async function grabTodosAndCategories() {
    let response = await fetch('http://localhost:5501/todos', { cache: "no-store" })
    let responseTwo = await fetch('http://localhost:5501/categories')
    let todoData = await response.json()
    let categoryData = await responseTwo.json()
    // console.log(todoData, categoryData)

    todoData.forEach(todo => {
        let category = categoryData.find(category => category.categoryID == todo.todoCategory)

        if (category) {
            let todoItem = createTodoItem(todo, category)
            displayTodos.appendChild(todoItem)
        }
    })

    console.log(todoData, categoryData)
}

// Grabs the categories from the server and displays them in the select element
async function grabCategories() {
    let response = await fetch('http://localhost:5501/categories') 
    let categoryData = await response.json()

    
    categoryData.forEach(category => {
        let option = document.createElement("option")
        option.value = category.categoryName 
        option.innerText = category.categoryName
        todoSelectCategory.appendChild(option)
    })
}

grabCategories()
/* grabTodosAndCategories()
 */

async function addNewCategory() {
    let response = await fetch('http://localhost:5501/todos', { cache: "no-store" })
    let responseTwo = await fetch('http://localhost:5501/categories')
    let todoData = await response.json()
    let categoryData = await responseTwo.json()


    let category = categoryData.find(category => category.categoryID == todo.todoCategory)

    if (category) {
        let todoItem = createTodoItem(todo, category)
        displayTodos.appendChild(todoItem)
    }

}


// form to add a new todo
newTodoForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    // fetches the data and assigns it to the todos variable
    let response = await fetch('http://localhost:5501/todos')
    let todos = await response.json()

    if (todoInputName.value === "") {
        alert("Please enter a name")
    } else if (todoSelectCategory.value === "") {
        alert("Please select a category")
    } else {
        let newTodoID = todos.length === 0 ? 1 : todos.at(-1).todoID + 1

        // Create the new todo object
        let newTodo = {
            todoName: todoInputName.value,
            todoCategory: todoSelectCategory.value,
            todoID: newTodoID
        }

        // sends the data to the server
        fetch('http://localhost:5501/todo', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(newTodo), 
        })
        .then(() => {
            // After the POST request is successful, update the display
            todoInputName.value = "";
            todoSelectCategory.value = "";
            addNewCategory();
        })
    }
})