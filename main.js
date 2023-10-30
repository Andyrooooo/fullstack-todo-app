let todos = []

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
deleteEditAddCategories.style.display = "none"


// Todo messages
const message = () => {
 todoMessages.innerText =
  todos.length === 0
   ? "Whooohooo there's no more todos! nice"
   : todos.length === 1
   ? `You have ${todos.length} todo`
   : `You have ${todos.length} todos left`
}
message()


// Updates the categoryList----------------------------------------------------------------
function updateCategoryList() {
   deleteCategorySelect.innerText = ""
   editCategorySelect.innerText = ""
  
   todoSelectCategory.childNodes.forEach((option) => {
    if (option.tagName === "OPTION") {
     let newOption = document.createElement("option")
     newOption.textContent = option.textContent
     deleteCategorySelect.appendChild(newOption)
   //   editCategorySelect.appendChild(newOption)
     editCategorySelect.appendChild(newOption.cloneNode(true))
    }
   })
  }
updateCategoryList()


// EVENT LISTENER TO TAKE VALUES AND CREATE A NEW TODO IN THE LIST ------------
newTodoForm.addEventListener("submit", (e) => {
 e.preventDefault()

 let createNewTodo = () => {
//   Makes sure the user does not put in an empty field
  if (todoInputName.value === "") {
   alert("Please enter a name")
  } else if (todoSelectCategory.value === "") {
   alert("Please select a category")
  } else {
   // gives us a new ID and if there is no id's then it will assign 1 to it
   newTodoID = todos.length === 0 ? 1 : todos.at(-1).todoID + 1

   let todoListItem = document.createElement("li")
   todoListItem.classList.add("todoListItem")
   let todoInputDisplayName = document.createElement("input")
   todoInputDisplayName.classList.add("todoInputDisplayName")
   let todoInputDisplayCategory = document.createElement("input")
   todoInputDisplayCategory.classList.add("todoInputDisplayCategory")
   let todoInputDisplayContainer = document.createElement("div")
   todoInputDisplayContainer.classList.add("todoInputDisplayContainer")
   todoInputDisplayCategory.setAttribute("readonly", "true")
   let todoNameBTNsContainer = document.createElement("div")
   todoNameBTNsContainer.classList.add("todoNameBTNsContainer")
   let todoEditNameBTN = document.createElement("button")
   todoEditNameBTN.classList.add("todoEditNameBTN")
   let todoDeleteBTN = document.createElement("button")
   todoDeleteBTN.classList.add("todoDeleteBTN")

   todoInputDisplayCategory.value = todoSelectCategory.value
   todoInputDisplayName.value = todoInputName.value
   todoEditNameBTN.innerText = "Edit Name"
   todoDeleteBTN.innerText = "Delete Todo"

   todoInputDisplayName.setAttribute("readonly", "true")
   todoInputDisplayContainer.appendChild(todoInputDisplayName)
   todoInputDisplayContainer.appendChild(todoInputDisplayCategory)
   todoListItem.appendChild(todoInputDisplayContainer)
   todoNameBTNsContainer.appendChild(todoEditNameBTN)
   todoNameBTNsContainer.appendChild(todoDeleteBTN)
   todoListItem.appendChild(todoNameBTNsContainer)
   displayTodos.appendChild(todoListItem)

   // create new object for todos array
   let todo = {
    todoName: todoInputName.value,
    todoCategory: todoSelectCategory.value,
    todoID: newTodoID,
   }

   // add new todo to array
   todos = [...todos, todo]

   // clear out name input
   todoInputName.value = ""
   todoSelectCategory.value = ""


   // DELETES A TODO ------------------------------------------------------------------
   todoDeleteBTN.addEventListener("click", () => {
    let todoDeleteIndex = Array.from(displayTodos.children).indexOf(
     todoListItem
    )

    if (todoDeleteIndex !== -1) {
     todos.splice(todoDeleteIndex, 1)
     displayTodos.removeChild(todoListItem)
     console.log(todos)
    }
    message()
   })

   // Edits a todo --------------------------------------------------------------------
   todoEditNameBTN.addEventListener("click", () => {
    if (todoEditNameBTN.innerText == "Edit Name") {
     todoInputDisplayName.removeAttribute("readonly")
     todoInputDisplayName.classList.add("editTheInput")
     todoInputDisplayName.focus()
     todoEditNameBTN.innerText = "Save Name"
    } else {
     todo.todoName = todoInputDisplayName.value
     todoInputDisplayName.setAttribute("readonly", "true")
     todoInputDisplayName.classList.remove("editTheInput")
     todoEditNameBTN.innerText = "Edit Name"
    }
    console.log(todos)
   })
  }
 }
 //  Calls the event listener
 createNewTodo()

 message()
 console.log(todos)


 // DELETES ALL TODOS ----------------------------------------------------------------
 let removeAllTodos = document.querySelector(".removeAllTodos")
 removeAllTodos.addEventListener("click", () => {
  todos = []

  // removes all the children from the list
  while (displayTodos.firstChild) {
   displayTodos.removeChild(displayTodos.firstChild)
  }

  message()
  console.log(todos)
 })
})

// creates a new category ----------------------------------------------------------
newTodoCategoryForm.addEventListener("submit", (e) => { 
   e.preventDefault()

   // checks to see if there is no input
   if (categoryInputName.value === "") {
      alert("No input was detected. Please enter a name.")
   } else {
      let newCategoryOption = document.createElement("option")
      newCategoryOption.innerText = categoryInputName.value
      todoSelectCategory.appendChild(newCategoryOption)
   }
   categoryInputName.value = ""
})

// deletes a category --------------------------------------------------------------
deleteCategoryBTN.addEventListener("click", () => {
   // variable that gets the index of the selected option
   let selectedOptionIndex = deleteCategorySelect.selectedIndex

   if (selectedOptionIndex === 0) {
      alert("Please Select a Category")
      } else if (selectedOptionIndex !== -1) {
         // removes the selected option from the list with the specified index
         deleteCategorySelect.removeChild(deleteCategorySelect.options[selectedOptionIndex])
         todoSelectCategory.removeChild(todoSelectCategory.options[selectedOptionIndex])
         updateCategoryList()
      }
})

// edits a category --------------------------------------------------------------
editCategorySelect.addEventListener("change", () => {
   let selectedOptionIndex = editCategorySelect.selectedIndex

   if (selectedOptionIndex === 0) {
      editCategoryInputName.removeAttribute("readonly")
      editCategoryInputName.value = ""
      } else if (selectedOptionIndex !== 0) {
         editCategoryInputName.removeAttribute("readonly")
         editCategoryInputName.value = editCategorySelect.value
         editCategoryInputName.focus()
      }
})

// edits a category button --------------------------------------------------------------
editCategoryBTN.addEventListener("click", () => {
   let selectedOptionIndex = editCategorySelect.selectedIndex

   if (selectedOptionIndex === 0) {
      alert("You cannot edit this option")
      editCategoryInputName.value = ""
   } else if (selectedOptionIndex !== 0) {

      // stores the old innertext of the option that is at the specified index
      let oldName = editCategorySelect.options[selectedOptionIndex].innerText
      // stores the new innertext from the input
      let newName = editCategoryInputName.value
      // editCategorySelect.options[selectedOptionIndex].innerText = editCategoryInputName.value

      // loops through the todos and checks if the category matches the old name 
      // if it does it assigns it the new value
      todos.forEach((todo) => {
         if (todo.todoCategory === oldName) {
            todo.todoCategory = newName
            // todo.todoCategory.value = newName
         }
      })

      // creates a variable to store all the todo items and checks to see if they
      // match the old name and if they do it assigns it the new value for the category 
      // inputs
      let todoItems = document.querySelectorAll(".todoListItem");
        todoItems.forEach((todoItem) => {
            let todoCategoryInput = todoItem.querySelector(".todoInputDisplayCategory");
            if (todoCategoryInput.value === oldName) {
                todoCategoryInput.value = newName;
            }
        });

      // updates the main category option and from there it will update the rest of the 
      // options
      todoSelectCategory.options[selectedOptionIndex].value = editCategoryInputName.value
      todoSelectCategory.options[selectedOptionIndex].innerText = editCategoryInputName.value
      editCategoryInputName.setAttribute("readonly", "true")
      editCategoryInputName.value = ""
      updateCategoryList()
      console.log(todos)
   }

  
})

// toggles the categories --------------------------------------------------------------
toggleCategoriesBTN.addEventListener("click", () => {

   if (deleteEditAddCategories.style.display === "none") {
      deleteEditAddCategories.style.display = "block"
      deleteEditAddCategories.classList.add("active")
   } else {
      deleteEditAddCategories.style.display = "none"
      deleteEditAddCategories.classList.remove("active")
   }
})

// OLD CODE ----------------------------------------------------------------------

/* if (todos.length === 0) {
    todoMessages.innerText = "Whooohooo there's no more todos! nice"
   } else if (todos.length === 1) {
    todoMessages.innerText = `You have ${todos.length} todo left`
   } else {
    todoMessages.innerText = `You have ${todos.length} todos left`
   } */

/*   todos = [...todos] */
