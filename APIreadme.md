## Todo App API Server

#### GET TODOS - To get the todos, you will use URL '/todos' with a GET request

#### POST TODO and POST CATEGORIES - These will BOTH work at the same time. The URL will be '/todo', and set your first key to "todoName" and then input your value. Below there you will also enter in your second key "todoCategory" and input that value as a number for a GET request. If you do not enter either key the new object will be generated without it.

#### PUT TODO (update) - To update an existing todo you use the URL '/todos/`the todos id`'. Once you do that you will use the key "todoName" and enter the value you want to change with a PUT request.

#### DELETE TODO - To delete a todo you will use the url '/todos/`the todos id`' with a DELETE request.

#### GET ALL TODOS for a CATEGORY - to grab all todos containing a specific category you will use the url '/todos/categories/`the todo category`' with a GET request.

#### GET CATEGORIES - To get all objects inside the categories array you will use the url: '/categories' with a GET request

#### POST CATEGORIES - To add a new category you will use the url: '/categories'. You will then use a key name "categoryName" and then enter in the value you want (school, work, fitness), it should not be a number, finally using a POST request.

#### PUT CATEGORIES (update) - To update a category name value, you will use the url '/categories/`id of category`'. You will then use the key "categoryName", and then enter the new value (string name value) with a PUT request.

#### DELETE CATEGORIES - To delete a category, you will enter the url '/categories/`id of category`' with a DELETE request. 