import React from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

import uuid from "uuid";

function createTodo(name) {
  return {
    name,
    id: uuid(),
    checked: false
  };
}

class App extends React.Component {
  state = {
    todos: this.props.todos
  };
  onCreateTodo = name => {
    const newTodo = createTodo(name);
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  };

  onDeleteTodo = id => {
    this.setState({
      todos: this.state.todos.filter(t => t.id !== id)
    });
  };

  onToggleTodoComplete = id => {
    this.setState({
      todos: this.state.todos.map(t => ({
        ...t,
        checked: t.id === id && !t.checked
      }))
    });
  };

  onUpdateTodoName = (id, name) => {
    this.setState({
      todos: this.state.todos.map(t => {
        if (t.id === id) {
          t.name = name;
        }
        return t;
      })
    });
  };
  render() {
    return (
      <div className="todoapp">
        <TodoForm onCreateTodo={this.onCreateTodo} />
        <ul>
          {this.state.todos.map(d => (
            <Todo
              {...d}
              key={d.id}
              onToggleTodoComplete={this.onToggleTodoComplete}
              onDeleteTodo={this.onDeleteTodo}
              onUpdateTodoName={this.onUpdateTodoName}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
