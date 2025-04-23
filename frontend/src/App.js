import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<TodoList />} />
                    <Route path="/add" element={<TodoForm />} />
                    <Route path="/edit/:id" element={<TodoForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
