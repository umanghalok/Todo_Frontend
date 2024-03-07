import React, { useState } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const TodoForm = ({ fetchData }) => {
    const [newTodoData, setNewTodoData] = useState("");

    const onFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/todos`, { data: newTodoData });
            fetchData();
        } catch (error) {
            console.log(error);
        }
        setNewTodoData("");
    };

    const onInputChange = (e) => {
        setNewTodoData(e.target.value);
    };

    return (
        <form className="form" onSubmit={onFormSubmit}>
            <input
                placeholder="Enter new todo..."
                className="input"
                onChange={onInputChange}
                value={newTodoData}
            />
            <button type="submit" className="button">Add Todo</button>
        </form>
    );
};

export default TodoForm;
