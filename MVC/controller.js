/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
class Controller {
    constructor(model, view) {
            this.model = model
            this.view = view

            // Explicit this binding
            this.model.bindTodoListChanged(this.onTodoListChanged)
            this.view.bindAddTodo(this.handleAddTodo)
            this.view.bindEditTodo(this.handleEditTodo)
            this.view.bindDeleteTodo(this.handleDeleteTodo)
            this.view.bindToggleTodo(this.handleToggleTodo)
                // Display initial todos
            this.onTodoListChanged(this.model.todos)
        }
        //On appelle la displayTodo de la view
        //Pour ensuite la mettre dans le model
        //comme celles ci-dessous:
        //qd le model supprime
        //La vue supprime aussi
        //car le controller ici
        //met la méthode du model
        //dans une méthode de la view
        //grâce à une méthode handle...
        //Là c l'inverse:
        //Quand la vue affiche les todos
        //Le modèle récupère ce que la vue affiche
        //grâce à onTodoList...
        //Et c'est grâce à cela que le model peut faire son travail..
    onTodoListChanged = todos => {
        this.view.displayTodos(todos)
    }

    handleAddTodo = todoText => {
        this.model.addTodo(todoText)
    }

    handleEditTodo = (id, todoText) => {
        this.model.editTodo(id, todoText)
    }

    handleDeleteTodo = id => {
        this.model.deleteTodo(id)
    }

    handleToggleTodo = id => {
        this.model.toggleTodo(id)
    }
}