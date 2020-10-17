import React from "react";
import "./App.css";
import NewItem from "./newItem";
import dateformat from "dateformat";

function Todo({todo, index, completeTodo, removeTodo}) {
    return (
        <div
            className="todo"
            style={{textDecoration: todo.isCompleted ? "line-through" : ""}}
        >
            <button onClick={() => completeTodo(index)}><i className="fa fa-check-circle close-icon"
                                                           style={{color: todo.isCompleted ? 'green' : 'grey'}}></i>
            </button>
            <span>{todo.text}</span>
            <div>
                <span>{`${dateformat(new Date(todo.timestampDue), "dd-mmm-yyyy")}`}</span>
                <span onClick={() => removeTodo(index)}><i className="fa fa-close close-icon"></i></span>
            </div>
        </div>
    );
}

function App() {
    const [adding, setAdding] = React.useState(false);
    const [todos, setTodos] = React.useState([
        {
            text: "Learn about React",
            isCompleted: false,
            timestampDue: 1561881986756
        },
        {
            text: "Meet friend for lunch",
            isCompleted: false,
            timestampDue: 1561881986756
        },
        {
            text: "Build really cool todo app",
            isCompleted: false,
            timestampDue: 1561881986756
        }
    ]);

    const completeTodo = index => {
        const newTodos = [...todos];
        newTodos[index].isCompleted = true;
        setTodos(newTodos);
    };

    const removeTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    const addNewItem = item => {
        setAdding(false);
        const newTodos = [...todos, item];
        setTodos(newTodos);
    };

    return (
        <div className="app">
            <h1>TODO</h1>
            <p>let's get some stuff done today!</p>
            <div className="todo-list">
                {!adding && (
                    <div>
                        <button type="button" className="btn btn-link" onClick={() => setAdding(true)}><i
                            className="fa fa-plus"></i>&nbsp;Add Task
                        </button>
                    </div>
                )}
                {adding && <NewItem cancel={() => setAdding(false)} add={addNewItem}/>}
                {todos.map((todo, index) => (
                    <Todo
                        key={index}
                        index={index}
                        todo={todo}
                        completeTodo={completeTodo}
                        removeTodo={removeTodo}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;