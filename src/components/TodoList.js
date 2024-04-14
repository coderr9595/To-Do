import React, { useState } from 'react';

const TodoList = () => {
    const [inputTask, setInputTask] = useState('');
    const [list, setList] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedTask, setEditedTask] = useState('');

    const handleAddTodo = () => {
       
        if (!inputTask.trim()) {
            alert("Empty field is not applicable");
            return; 
        }
    
        const newTask = {
            id: Math.random(),
            todo: inputTask
        };
    
        setList([...list, newTask]);
        setInputTask('');
    };

    const handleDeleteTodo = (id) => {
        const newList = list.filter((todo) => todo.id !== id);
        setList(newList);
    };

    const handleEditTodo = (id) => {
        setEditingId(id);
        const taskToEdit = list.find(todo => todo.id === id);
        setEditedTask(taskToEdit.todo);
    };

    const handleSaveEdit = () => {
        const updatedList = list.map(todo => {
            if (todo.id === editingId) {
                return { ...todo, todo: editedTask };
            }
            return todo;
        });
        setList(updatedList);
        setEditingId(null);
    };

    const handleInputChange = (event) => {
        setInputTask(event.target.value);
    };

    const handleEditedInputChange = (event) => {
        setEditedTask(event.target.value);
    };

    return (
        <div className="Todo">
            <h1>QuadB To-Do </h1>

            <div className="Top">
                <input className="input" type="text" value={inputTask}
                   onChange={handleInputChange} placeholder="Enter a task" />

                <button className="btn" onClick={handleAddTodo}>ADD</button>
            </div>

            {list.map((todo) => (
                <div className="task-card" key={todo.id}>
                    {editingId === todo.id ? (
                        <>
                            <input className="input" type="text" value={editedTask} onChange={handleEditedInputChange} />
                            <button onClick={handleSaveEdit}>Save</button>
                        </>
                    ) : (
                        <>
                            <p>{todo.todo}</p>
                            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                            <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TodoList;
