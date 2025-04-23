import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/todos');
            setTodos(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching todos:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/todos/${id}`);
            fetchTodos(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Todo List</h1>
            <button onClick={() => navigate('/add')}>Add Todo</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <h3>{todo.title}</h3>
                        <p>{todo.description}</p>
                        <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
                        <button onClick={() => navigate(`/edit/${todo.id}`)}>Edit</button>
                        <button onClick={() => handleDelete(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
