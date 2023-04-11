/**
 * @class Model
 *
 * Manages the data of the application.
 */
class Model {
    constructor() {
            //we can set the initial todo value to what's in local storage or an empty array.
            this.todos = JSON.parse(localStorage.getItem('todos')) || []
        }
        //Fonction qui permet de récupérer ce que la vue affiche
        //cf constructeur du controller
        //Et met à jour le commit
    bindTodoListChanged(callback) {
            this.onTodoListChanged = callback
        }
        //Nous allons créer une méthode privée commit pour mettre à jour la valeur de localStorage ainsi que l'état du modèle.
        //Cette methode met à jour le modèle
        //à chaque fois qu'on qu'on ajoute
        //qu'on supprime, toggle etc.
    _commit(todos) {
        this.onTodoListChanged(todos)
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    addTodo(todoText) {
        const todo = {
            id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
            text: todoText,
            complete: false,
        }

        this.todos.push(todo)

        this._commit(this.todos)
    }

    editTodo(id, updatedText) {
        this.todos = this.todos.map(todo =>
            todo.id === id ? { id: todo.id, text: updatedText, complete: todo.complete } : todo
        )

        this._commit(this.todos)
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id)

        this._commit(this.todos)
    }

    toggleTodo(id) {
        this.todos = this.todos.map(todo =>
            todo.id === id ? { id: todo.id, text: todo.text, complete: !todo.complete } : todo
        )

        this._commit(this.todos)
    }
}