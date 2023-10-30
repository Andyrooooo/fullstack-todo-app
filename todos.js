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


// Function to create a todo item element also adds edits and deletes the todo --------------------------------------------------------------------------------
function createTodoItem(todo, category) {
    // List Item
    let todoListItem = document.createElement("li")

    // Name
    let todoInputDisplayName = document.createElement("input")
    todoInputDisplayName.setAttribute("readonly", "true")
    todoInputDisplayName.value = todo.todoName

    // Delete Button
    let todoDeleteBTN = document.createElement("button")
    todoDeleteBTN.innerText = "Delete Todo"
    
    // Edit Button
    let todoEditNameBTN = document.createElement("button") 
    todoEditNameBTN.innerText = "Edit Name"

    // Category
    let todoInputDisplayCategory = document.createElement("input")
    todoInputDisplayCategory.setAttribute("readonly", "true")
    todoInputDisplayCategory.value = category.categoryName

    todoListItem.appendChild(todoInputDisplayName)
    todoListItem.appendChild(todoInputDisplayCategory)
    todoListItem.appendChild(todoEditNameBTN)
    todoListItem.appendChild(todoDeleteBTN)

    // Deletes the todo clicked on --------------------------
    todoDeleteBTN.addEventListener("click", async () => {
        let response = await fetch('http://localhost:5501/todos')
        let todos = await response.json()

        // deletes the todo in our API
        fetch(`http://localhost:5501/todos/${todo.todoID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        })
        .then(() => {
            // clears the inputs
            todoInputName.value = ""
            todoSelectCategory.value = ""
            // finds the index of the todo in the array and then deletes it from the array
            let todoDeleteIndex = Array.from(displayTodos.children).indexOf(todoListItem)
            if (todoDeleteIndex !== -1) {
                todos.splice(todoDeleteIndex, 1)
                displayTodos.removeChild(todoListItem)
                console.log(todos)
            }
        })
    }) // end of delete todo


    // Edits a todo --------------------------------------------------------------------
    todoEditNameBTN.addEventListener("click", async () => {

        // makes the input editable
        if (todoEditNameBTN.innerText == "Edit Name") {
            todoInputDisplayName.removeAttribute("readonly")
            todoInputDisplayName.focus()
            todoEditNameBTN.innerText = "Save Name"
        } else {
            // grabs the new input value and assigns it to the todoName
            todo.todoName = todoInputDisplayName.value
            // edits the todo in our API
            fetch(`http://localhost:5501/todos/${todo.todoID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(todo),
            })
            .then(() => {
            // we then return the input back to readonly
            todoInputDisplayName.setAttribute("readonly", "true")
            todoEditNameBTN.innerText = "Edit Name"
            console.log(todo)
            })
        }
    })// end of edit event listener

    return todoListItem
}


// function that will grab all the existing todos in the API to be displayed -----------------------------------------------------------------------------------
async function grabTodosAndCategories() {
    let response = await fetch('http://localhost:5501/todos')
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
// grabTodosAndCategories()


// Grabs the categories from the server and displays them in the select category element ---------------------------------------------------------------------------------
async function grabCategories() {
    let response = await fetch('http://localhost:5501/categories') 
    let categoryData = await response.json()

    
    categoryData.forEach(category => {
        let option = document.createElement("option")
        option.value = category.categoryName 
        option.innerText = category.categoryName
        todoSelectCategory.appendChild(option)
        deleteCategorySelect.appendChild(option.cloneNode(true))
        editCategorySelect.appendChild(option.cloneNode(true))
    })
}

grabCategories()


// will fetch the data, and find the specific todo and category created in the input fields and create a new item for them---------------------------------------------
async function addNewTodo(newTodo) {
    let response = await fetch('http://localhost:5501/todos')
    let responseTwo = await fetch('http://localhost:5501/categories')
    let todoData = await response.json()
    let categoryData = await responseTwo.json()

    let category = categoryData.find(category => category.categoryName == newTodo.todoCategory)
    
    let todo = todoData.find(todo => todo.todoID == newTodo.todoID)

    let todoItem = createTodoItem(todo, category)
    displayTodos.appendChild(todoItem)

}


// form to add a new todo------------------------------------------------
newTodoForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    // fetches the data and assigns it to the todos variable
    let response = await fetch('http://localhost:5501/todos')
    let todos = await response.json()

    // checks for if there is no value put in the inputs
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
            // we then clear the inputs and then create the todo
            todoInputName.value = ""
            todoSelectCategory.value = ""
            addNewTodo(newTodo)
        }) // end of then that adds todo
    } // end of if else statement
}) // end of add new form event listener


// form to add a new category ------------------------------------------------
newTodoCategoryForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    // fetches the data and assigns it to the categories variable
    let response = await fetch('http://localhost:5501/categories')
    let categories = await response.json()

    if (categoryInputName.value === "") {
        alert("No input was detected. Please enter a name.")
    } else {
        let newCategoryID = categories.length === 0 ? 1 : categories.at(-1).categoryID + 1

        // Create the new category object
        let newCategory = {
            categoryName: categoryInputName.value,
            categoryID: newCategoryID
        }

        // sends the data to the API
        fetch('http://localhost:5501/categories', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(newCategory), 
        }) 
        .then(() => {
            // we then clear the inputs and then create the todo
            categoryInputName.value = ""
            addNewCategory(newCategory)
        })
    }
})


// adds a new Category to the select category element ------------------------------------------------
async function addNewCategory(newCategory) {
    let response = await fetch('http://localhost:5501/categories')
    let categoryData = await response.json()

    let category = categoryData.find(category => category.categoryID == newCategory.categoryID)

    let categoryItem = createCategoryItem(category)
    todoSelectCategory.appendChild(categoryItem)
    deleteCategorySelect.appendChild(categoryItem.cloneNode(true))
    editCategorySelect.appendChild(categoryItem.cloneNode(true))
}

// function to create a category item element ------------------------------------------------
function createCategoryItem(category) {
    let option = document.createElement("option")
    option.value = category.categoryName 
    option.innerText = category.categoryName

    console.log(category)

    // Deletes the category you clicked on --------------------------
    deleteCategoryBTN.addEventListener("click", async () => {

        console.log("hello")
        if (category.categoryID === 0) {
            alert("Please Select a Category")
            } else if (category.categoryID !== -1) {

            // deletes the todo in our API
            fetch(`http://localhost:5501/categories/${category.categoryID}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(() => {
                // deleteSelectedCategory(categories.categoryID)
            })
        }
    }) // end of delete todo 
    
    return option
}

// Deletes the category you clicked on --------------------------
// deleteCategoryBTN.addEventListener("click", async () => {

//     if (categories.categoryID === 0) {
//         alert("Please Select a Category")
//         } else if (categories.categoryID !== -1) {

//         // deletes the todo in our API
//         fetch(`http://localhost:5501/categories/${categories.categoryID}`, {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         })
//         .then(() => {
//             deleteSelectedCategory(categories.categoryID)
//         })
//     }
// }) // end of delete todo 

// function deleteSelectedCategory(categoryID) {
//     deleteCategorySelect.remove(categoryID)
//     todoSelectCategory.remove(categoryID)
//     editCategorySelect.remove(categoryID)
// }
