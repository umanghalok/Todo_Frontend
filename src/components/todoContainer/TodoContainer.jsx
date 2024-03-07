import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "../todoForm/TodoForm.jsx";
import TodoItem from "../todoItem/TodoItem.jsx";

const API_URL = process.env.REACT_APP_API_URL;

const TodoContainer = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/todos`);
            setTodos(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const onDeleteTodo = async (id) => {
        try {
            await axios.delete(`${API_URL}/todos/${id}`);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    const toggleTodoDone = async (id) => {
        try {
            const response = await axios.put(`${API_URL}/todos/toggle/${id}`);
            console.log(response.data);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="todos-container">
            <TodoForm fetchData={fetchData} />
            <div className="container">
                <h2>Todos:</h2>
                <ul className="todos-list">
                    {todos.map((todo) => (
                        <TodoItem
                            key={todo._id}
                            todo={todo}
                            onDeleteTodo={onDeleteTodo}
                            toggleTodoDone={toggleTodoDone}
                            fetchData={fetchData}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoContainer;
