//https://www.taniarascia.com/javascript-mvc-todo-app/


// Concentrons-nous d'abord sur le modèle, 
// car c'est la plus simple des trois parties. 
// Cela n'implique aucun événement ou manipulation du DOM. 
// ****** Il s'agit simplement de stocker et de modifier des données.
// add ajoute une nouvelle todo au tableau, 
// edit trouve l'identifiant de la todo à modifier et la remplace, 
// delete filtre une todo du tableau et 
// toggle switche la propriété booléenne.
class Model {
    constructor() {
        // The state of the model, an array of todo objects, prepopulated with some data
        // this.todos = [
        //     { id: 1, text: 'Run a marathon', complete: false },
        //     { id: 2, text: 'Plant a garden', complete: false },
        // ]
        //Initialisation dans le local storage
        this.todos = JSON.parse(localStorage.getItem('todos')) || []
    }


    //Calcul de l'id lorsqu'on ajoute la todo::::
    // si la longueur de la propriété "todos" est supérieure à 0, 
    // alors cette expression renvoie l'ID du dernier élément de la 
    // liste "todos" augmenté de 1. 
    // Autrement dit, elle crée un nouvel ID unique pour le prochain élément à ajouter à la liste.
    // Si la longueur de la liste "todos" est égale à 0,
    // alors l'expression renvoie simplement la valeur 1, qui sera l'ID du premier élément ajouté à la liste "todos".

    addTodo(todoText) {
        const todo = {
            id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
            text: todoText,
            complete: false,
        }

        this.todos.push(todo)
    }

    // Fonction qui permet de modifier la todo
    // Map through all todos, and replace the text of the todo with the specified id
    // Ce code utilise la méthode "map()" pour mettre à jour une liste d'objets "todos" 
    // en remplaçant un objet avec un ID spécifié par un nouvel objet qui contient un nouveau texte fourni en argument.
    // Plus précisément, chaque élément de la liste "todos" est remplacé par un nouvel objet "todo", 
    // qui est soit une copie de l'objet original avec la propriété "text" mise à jour, soit l'objet original inchangé.
    // La condition pour savoir si la propriété "text" doit être mise à jour 
    // est basée sur la comparaison de la propriété "id" de chaque objet "todo" 
    // avec la valeur de "id" fournie en argument. Si les valeurs "id" sont identiques, 
    // l'objet original est remplacé par un nouvel objet qui a les mêmes propriétés 
    // que l'objet original, à l'exception de la propriété "text" 
    // qui est remplacée par la valeur "updatedText". Sinon, l'objet "todo" est simplement renvoyé sans modification.
    // En résumé, ce code permet de mettre à jour la propriété "text" d'un 
    // objet "todo" dans la liste "todos", en fonction de la valeur de l'ID fournie en argument.
    editTodo(id, updatedText) {
        this.todos = this.todos.map((todo) =>
            todo.id === id ? { id: todo.id, text: updatedText, complete: todo.complete } : todo,
        )
    }

    // Filter a todo out of the array by id
    // Ce code utilise la méthode "filter()" pour supprimer 
    // un objet d'une liste d'objets "todos" ayant un ID spécifié.
    // Plus précisément, la méthode "filter()" crée une nouvelle liste de "todos" 
    // en excluant tous les éléments de la liste originale 
    // qui ont un ID égal à celui fourni en argument. 
    // Lorsqu'un objet "todo" est passé en tant que paramètre de la fonction de rappel, 
    // l'expression "todo.id !== id" est évaluée pour déterminer si l'objet doit être conservé ou non. 
    // Si l'ID de l'objet ne correspond pas à l'ID fourni en argument, 
    // l'objet est conservé dans la nouvelle liste ; sinon, il est exclu de la nouvelle liste.
    // En fin de compte, le résultat est affecté à la propriété "todos" de l'objet appelant, 
    // ce qui signifie que la liste "todos" est mise à jour sans l'objet qui avait l'ID correspondant.
    // En résumé, ce code permet de supprimer un objet "todo" 
    // ayant un ID spécifié de la liste "todos". (mais améliorée plus bas..)
    // deleteTodo(id) {
    //     this.todos = this.todos.filter((todo) => todo.id !== id)
    // }

    //Retourne le booléen sur la tâche spécifiée
    // Ce code utilise la méthode "map()" pour mettre à jour 
    // une liste d'objets "todos". Plus précisément, chaque élément de 
    // la liste "todos" est remplacé par un nouvel objet "todo", 
    // qui est soit une copie de l'objet original avec la propriété 
    // "complete" inversée, soit l'objet original inchangé.
    // La condition pour savoir si la propriété "complete" 
    // doit être inversée est basée sur la comparaison de 
    // la propriété "id" de chaque objet "todo" avec la valeur de "id" 
    // fournie en argument. Si les valeurs "id" sont identiques, 
    // la propriété "complete" est inversée à l'aide de l'opérateur "!" (non logique).
    //  Sinon, l'objet "todo" est simplement renvoyé sans modification.
    // En résumé, ce code permet de mettre à jour la propriété "complete" 
    // d'un objet "todo" dans la liste "todos", 
    // en fonction de la valeur de l'ID fournie en argument, 
    // en inversant sa valeur. Si la propriété "complete" était "true", 
    // elle sera changée en "false" et si elle était "false", elle sera changée en "true".
    toggleTodo(id) {
            this.todos = this.todos.map((todo) =>
                todo.id === id ? { id: todo.id, text: todo.text, complete: !todo.complete } : todo,
            )
        }
        //Rajout pour lier le controller au modèle
    bindTodoListChanged(callback) {
            this.onTodoListChanged = callback
        }
        //Maintenant, après chaque méthode du modèle, vous appellerez le rappel onTodoListChanged.
        // deleteTodo(id) {
        //         this.todos = this.todos.filter(todo => todo.id !== id)

    //         this.onTodoListChanged(this.todos)
    //     }
    //Mise à jour du local storage
    _commit(todos) {
            this.onTodoListChanged(todos)
            localStorage.setItem('todos', JSON.stringify(todos))
        }
        //On l'appelle après chaque changement..
    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id)

        this._commit(this.todos)
    }
}


////VIEW//////////////////////////////////////////
////VIEW//////////////////////////////////////////
////VIEW//////////////////////////////////////////
////VIEW//////////////////////////////////////////
////VIEW//////////////////////////////////////////
// Nous allons créer la vue en manipulant le DOM - 
// le modèle objet du document. Puisque nous le 
// faisons en JavaScript simple sans l'aide de JSX de React ou 
// d'un langage de modèle, ce sera un peu verbeux et laid, 
// mais telle est la nature de la manipulation directe du DOM.
// Ni le contrôleur ni le modèle ne doivent rien savoir du DOM, 
// des éléments HTML, du CSS ou de tout cela. Tout ce 
// qui s'y rapporte devrait être dans la vue.


// La première chose que je vais faire est de créer 
// des méthodes d'assistance pour récupérer un élément et créer un élément.

// class View {
//     constructor() {}
//         // Create an element with an optional CSS class
//     createElement(tag, className) {
//             const element = document.createElement(tag)
//             if (className) element.classList.add(className)
//             return element
//         }
//         // Retrieve (récupérer) an element from the DOM
//     getElement(selector) {
//         const element = document.querySelector(selector)
//         return element
//     }
// }
// Jusqu'ici, tout va bien. Maintenant, dans le constructeur, je vais mettre en place tout ce dont j'ai besoin pour ma vue. Ce sera:

//     L'élément racine de l'application - #root
//     L'en-tête du titre - h1
//     Un formulaire, une entrée et un bouton d'envoi pour ajouter une tâche - formulaire, entrée, bouton
//     La liste de tâches - ul

// Je vais en faire toutes des variables dans le constructeur afin que nous puissions facilement nous y référer.

// class View {
//     constructor() {
//             // The root element
//             this.app = this.getElement('#root')

//             // The title of the app
//             this.title = this.createElement('h1')
//             this.title.textContent = 'Todos'

//             // The form, with a [type="text"] input, and a submit button
//             this.form = this.createElement('form')

//             this.input = this.createElement('input')
//             this.input.type = 'text'
//             this.input.placeholder = 'Add todo'
//             this.input.name = 'todo'

//             this.submitButton = this.createElement('button')
//             this.submitButton.textContent = 'Submit'

//             // The visual representation of the todo list
//             this.todoList = this.createElement('ul', 'todo-list')

//             // Append the input and submit button to the form
//             this.form.append(this.input, this.submitButton)

//             // Append the title, form, and todo list to the app
//             this.app.append(this.title, this.form, this.todoList)
//         }
//         // Create an element with an optional CSS class
//     createElement(tag, className) {
//             const element = document.createElement(tag)
//             if (className) element.classList.add(className)
//             return element
//         }
//         // Retrieve (récupérer) an element from the DOM
//     getElement(selector) {
//         const element = document.querySelector(selector)
//         return element
//     }
// }

// Deux autres petites choses - un getter et un resetter de la valeur d'entrée (nouvelle tâche).
// J'utilise des traits de soulignement dans les noms de méthodes pour signifier qu'il s'agit de méthodes privées (locales) 
// qui ne seront pas utilisées en dehors de la classe.

class View {
    constructor() {
            // The root element
            this.app = this.getElement('#root')

            // The title of the app
            this.title = this.createElement('h1')
            this.title.textContent = 'Todos'

            // The form, with a [type="text"] input, and a submit button
            this.form = this.createElement('form')

            this.input = this.createElement('input')
            this.input.type = 'text'
            this.input.placeholder = 'Add todo'
            this.input.name = 'todo'

            this.submitButton = this.createElement('button')
            this.submitButton.textContent = 'Submit'

            // The visual representation of the todo list
            this.todoList = this.createElement('ul', 'todo-list')

            // Append the input and submit button to the form
            this.form.append(this.input, this.submitButton)

            // Append the title, form, and todo list to the app
            this.app.append(this.title, this.form, this.todoList)
                //Rajout après intégration local storage
            this._temporaryTodoText
            this._initLocalListeners()
        }
        // Create an element with an optional CSS class
    createElement(tag, className) {
            const element = document.createElement(tag)
            if (className) element.classList.add(className)
            return element
        }
        // Retrieve (récupérer) an element from the DOM
    getElement(selector) {
        const element = document.querySelector(selector)
        return element
    }
    get _todoText() {
        return this.input.value
    }

    _resetInput() {
            this.input.value = ''
        }
        // Toute la configuration est maintenant terminée. La partie la plus complexe 
        // est l'affichage de la liste des tâches, 
        // qui est la partie qui changera à chaque fois qu'une modification est apportée aux tâches.
    displayTodos(todos) {
            // La méthode displayTodos créera les ul et li 
            // qui composent la liste de tâches et les affichera. 
            // Chaque fois qu'une tâche est modifiée, ajoutée ou supprimée, 
            // la méthode displayTodos sera appelée à nouveau avec les tâches du modèle, 
            // réinitialisant la liste et les réaffichant. Cela permet de synchroniser la vue avec l'état du modèle.
            // La première chose que nous allons faire est de supprimer tous les nœuds 
            // todo à chaque fois qu'il est appelé. Ensuite, nous vérifierons si des tâches existent. 
            // S'ils ne le font pas, nous afficherons un message de liste vide.
            // Delete all nodes


            // Ce code supprime tous les éléments enfants (nodes) du premier 
            // élément enfant du nœud appelant, qui est stocké dans la variable "todoList".
            // Le code s'exécute dans une boucle while, qui continuera à supprimer 
            // les éléments enfants tant qu'il y a un premier élément enfant présent dans le nœud "todoList".
            // En d'autres termes, ce code permet de vider complètement une liste de tâches à faire, 
            // qui est stockée dans le nœud "todoList".
            while (this.todoList.firstChild) {
                this.todoList.removeChild(this.todoList.firstChild)
            }

            // Show default message
            // Ce code vérifie si la variable "todos" contient des éléments (c'est-à-dire, si la longueur de l'array est égale à 0).
            // Si c'est le cas, cela signifie qu'il n'y a pas de tâches à faire et 
            // le code crée un élément de paragraphe (p) à l'aide de la méthode "createElement" 
            // et ajoute un texte au paragraphe avec la propriété "textContent".
            // Ensuite, le code ajoute cet élément de paragraphe au nœud "todoList" à l'aide de la méthode "append".
            // En résumé, si la variable "todos" est vide, le code affiche un message "Nothing to do! 
            // Add a task?" dans le nœud "todoList".
            if (todos.length === 0) {
                const p = this.createElement('p')
                p.textContent = 'Nothing to do! Add a task?'
                this.todoList.append(p)
                    // Maintenant, nous allons simplement parcourir les tâches et afficher une case à cocher, 
                    // une span et un bouton de suppression pour chaque tâche existante.
            } else {
                // Create todo item nodes for each todo in state
                todos.forEach(todo => {
                    const li = this.createElement('li')
                    li.id = todo.id

                    // Each todo item will have a checkbox you can toggle
                    const checkbox = this.createElement('input')
                    checkbox.type = 'checkbox'
                    checkbox.checked = todo.complete

                    // The todo item text will be in a contenteditable (contenu modifiable) span
                    const span = this.createElement('span')
                    span.contentEditable = true
                    span.classList.add('editable')

                    // If the todo is complete, it will have a strikethrough (un barré)
                    if (todo.complete) {
                        const strike = this.createElement('s')
                        strike.textContent = todo.text
                        span.append(strike)
                    } else {
                        // Otherwise just display the text
                        span.textContent = todo.text
                    }

                    // The todos will also have a delete button
                    const deleteButton = this.createElement('button', 'delete')
                    deleteButton.textContent = 'Delete'
                    li.append(checkbox, span, deleteButton)
                        // Ajoute des nœuds à la liste de tâches
                    this.todoList.append(li)
                })
            }
        }
        ///RAJOUT DES ECOUTEURS APRES PREMIERES CONFIG DU CONTROLLER
        // Ce code définit une méthode appelée "bindAddTodo" qui prend une fonction "handler" 
        // en tant que paramètre.
        // La méthode attache un événement "submit" à 
        // l'élément de formulaire HTML qui est stocké dans la propriété "form" de l'objet.
        // Lorsque l'événement "submit" est déclenché, la méthode empêche le comportement 
        // par défaut du formulaire d'envoyer une requête HTTP en appelant la méthode "preventDefault" sur l'objet "event".
        // Ensuite, la méthode vérifie si la propriété privée "_todoText" (qui doit être définie ailleurs) 
        // contient du texte (c'est-à-dire, si la valeur de la propriété n'est pas vide, null ou undefined). 
        // Si c'est le cas, la méthode "handler" est appelée avec l'argument "_todoText", 
        // et la méthode "_resetInput" est appelée pour vider l'entrée utilisateur.
        // En résumé, ce code attache un événement de soumission de formulaire qui appelle
        // une fonction de rappel lorsqu'un utilisateur envoie le formulaire. 
        // La fonction de rappel est appelée uniquement si l'entrée utilisateur 
        // contient du texte, et la méthode "_resetInput" est appelée pour effacer 
        // l'entrée utilisateur après que la fonction de rappel ait été exécutée.
    bindAddTodo(handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault()

            if (this._todoText) {
                handler(this._todoText)
                this._resetInput()
            }
        })
    }

    bindDeleteTodo(handler) {
        this.todoList.addEventListener('click', event => {
            if (event.target.className === 'delete') {
                const id = parseInt(event.target.parentElement.id)

                handler(id)
            }
        })
    }

    bindToggleTodo(handler) {
        this.todoList.addEventListener('change', event => {
            if (event.target.type === 'checkbox') {
                const id = parseInt(event.target.parentElement.id)

                handler(id)
            }
        })
    }

    //MAJ après local storage
    // Update temporary state
    _initLocalListeners() {
            this.todoList.addEventListener('input', event => {
                if (event.target.className === 'editable') {
                    this._temporaryTodoText = event.target.innerText
                }
            })
        }
        // Send the completed value to the model
    bindEditTodo(handler) {
        this.todoList.addEventListener('focusout', event => {
            if (this._temporaryTodoText) {
                const id = parseInt(event.target.parentElement.id)

                handler(id, this._temporaryTodoText)
                this._temporaryTodoText = ''
            }
        })
    }
}
// Maintenant, la vue est configurée et le modèle est configuré. 
// Nous n'avons tout simplement aucun moyen de les connecter - 
// aucun événement ne surveille qu'un utilisateur fasse une entrée, 
// et aucun gestionnaire ne gère la sortie d'un tel événement.
// La console existe toujours en tant que contrôleur temporaire 
// et vous pouvez y ajouter et supprimer des tâches.


///CONTROLLER////////////////////////////////////
///CONTROLLER////////////////////////////////////
///CONTROLLER////////////////////////////////////
///CONTROLLER////////////////////////////////////
///CONTROLLER////////////////////////////////////
///CONTROLLER////////////////////////////////////
///CONTROLLER////////////////////////////////////
///CONTROLLER////////////////////////////////////
///CONTROLLER////////////////////////////////////
// Enfin, le contrôleur est le lien entre le modèle (les données) 
// et la vue (ce que l'utilisateur voit). Voici ce 
// que nous avons jusqu'à présent dans le contrôleur.
// class Controller {
//     constructor(model, view) {
//         this.model = model
//         this.view = view
//     }
// }
// Notre premier lien entre la vue et le modèle consiste à créer 
// une méthode qui appelle displayTodos à chaque fois qu'une tâche change. 
// Nous pouvons également l'appeler une fois dans 
// le constructeur pour afficher les todos initiaux s'il y en a.
// class Controller {
//     constructor(model, view) {
//         this.model = model
//         this.view = view

//         // Display initial todos
//         this.onTodoListChanged(this.model.todos)
//     }

//     onTodoListChanged = (todos) => {
//         this.view.displayTodos(todos)
//     }
// }
// Le contrôleur gérera les événements après leur déclenchement. 
// Lorsque vous soumettez une nouvelle tâche, ou cliquez sur le bouton Supprimer, 
// ou cliquez sur la case à cocher d'une tâche, un événement sera déclenché. 
// La vue doit écouter ces événements car ce sont des entrées utilisateur de la vue, 
// mais elle répartira la responsabilité de ce qui se passera en réponse à l'événement au contrôleur.
// Nous allons créer des gestionnaires pour les événements dans le contrôleur.
class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view

        // Display initial todos
        // Désormais, lorsqu'un événement submit, 
        // click ou change se produit sur les éléments spécifiés, 
        // les gestionnaires correspondants seront invoqués.
        this.onTodoListChanged(this.model.todos)
        this.view.bindAddTodo(this.handleAddTodo)
        this.view.bindDeleteTodo(this.handleDeleteTodo)
        this.view.bindToggleTodo(this.handleToggleTodo)
            //Et ici aussi, on lie le controller à la vue...
        this.model.bindTodoListChanged(this.onTodoListChanged)
        this.view.bindEditTodo(this.handleEditTodo) //- We'll do this one last
    }

    onTodoListChanged = (todos) => {
        this.view.displayTodos(todos)
    }
    andleAddTodo = (todoText) => {
        this.model.addTodo(todoText)
    }

    handleEditTodo = (id, todoText) => {
        this.model.editTodo(id, todoText)
    }

    handleDeleteTodo = (id) => {
        this.model.deleteTodo(id)
    }

    handleToggleTodo = (id) => {
            this.model.toggleTodo(id)
        }
        // Nous avons maintenant ces gestionnaires, mais le contrôleur ne sait toujours pas quand les appeler.
        // Nous devons mettre des écouteurs d'événements sur les éléments DOM de la vue. 
        // Nous répondrons à l'événement de soumission sur le formulaire, et cliquerons et modifierons 
        // les événements sur la liste de tâches. (Je saute "Edit" pour l'instant car c'est un peu plus compliqué.)
        //CF Rajout méthodes dans la view....


    // Nous devons appeler le gestionnaire depuis la vue, 
    // nous allons donc lier les méthodes qui écoutent les événements à la vue.
    // Nous avons utilisé des fonctions fléchées sur tous les handle événements.
    // Cela nous permet de les appeler depuis la vue en utilisant le contexte this du contrôleur.
    // Si nous n 'utilisions pas les fonctions fléchées, nous devrions les lier manuellement, 
    // comme this.view.bindAddTodo(this.handleAddTodo.bind(this)). Ouais.
    //CF constructeur

}
// Il y a quelque chose que nous avons laissé de côté - les événements écoutent, 
// les gestionnaires sont invoqués, mais rien ne se passe. 
// En effet, le modèle ne sait pas que la vue doit être mise à jour et 
// ne sait pas quoi faire pour que la vue soit mise à jour. 
// Nous avons la méthode displayTodos sur la vue pour résoudre ce problème, 
// mais comme mentionné précédemment, le modèle et la vue ne doivent pas se connaître.
// Tout comme pour l'écoute des événements, le modèle doit renvoyer au contrôleur 
// pour lui faire savoir que quelque chose s'est passé.
// Nous avons déjà créé la méthode onTodoListChanged sur le 
// contrôleur pour gérer cela, nous devons juste en informer le modèle. 
// Nous allons le lier au modèle de la même manière que nous l'avons fait avec les gestionnaires de la vue.
// Dans le modèle, ajoutez bindTodoListChanged pour onTodoListChanged.
//CF MODEL


const app = new Controller(new Model(), new View())

//Pour tester
app.model.addTodo('Take a nap')
console.log(app);