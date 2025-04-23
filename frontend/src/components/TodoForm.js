import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const TodoForm = () => {
    const [todo, setTodo] = useState({
        title: '',
        description: '',
        completed: false
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchTodo();
        }
    }, [id]);

    const fetchTodo = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/todos/${id}`);
            setTodo(response.data);
        } catch (error) {
            console.error('Error fetching todo:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTodo(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`http://localhost:8080/api/todos/${id}`, todo);
            } else {
                await axios.post('http://localhost:8080/api/todos', todo);
            }
            navigate('/');
        } catch (error) {
            console.error('Error saving todo:', error);
        }
    };

    return (
        <div>
            <h1>{id ? 'Edit Todo' : 'Add Todo'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={todo.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={todo.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="completed"
                            checked={todo.completed}
                            onChange={handleChange}
                        />
                        Completed
                    </label>
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate('/')}>Cancel</button>
            </form>
        </div>
    );
};

export default TodoForm;
