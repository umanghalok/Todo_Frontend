import React, { useState } from "react";
import { FaSave, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const TodoItem = ({ todo, onDeleteTodo, toggleTodoDone, fetchData }) => {
    const [editData, setEditData] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const onTodoEdit = () => {
        setIsEditing(true);
        setEditData(todo.data);
    };

    const onSaveEdit = async (id, newData) => {
        if (newData !== "") {
            try {
                await axios.put(`${API_URL}/todos/${id}`, { data: newData });
                fetchData();
            } catch (error) {
                console.log(error);
            }
        } else {
            onDeleteTodo(id);
        }
        setIsEditing(false);
        setEditData("");
    };

    return (
        <li className={`todo-item ${todo.done ? 'done' : ''}`}>
            {isEditing ? (
                <form onSubmit={(e) => { e.preventDefault(); onSaveEdit(todo._id, editData); }}>
                    <input
                        type="text"
                        value={editData}
                        onChange={(e) => setEditData(e.target.value)}
                        className="edit-input"
                    />
                    <FaSave className="icon save" onClick={() => onSaveEdit(todo._id, editData)} />
                </form>
            ) : (
                <>
                    <input
                        type="checkbox"
                        checked={todo.done}
                        onChange={() => toggleTodoDone(todo._id)}
                        className="todo-checkbox"
                    />
                    <span className="todo-text">{todo.data}</span>
                    <div className="todo-actions">
                        <FaEdit className="icon edit" onClick={onTodoEdit} />
                        <FaTrash className="icon delete" onClick={() => onDeleteTodo(todo._id)} />
                    </div>
                </>
            )}
        </li>
    );
};

export default TodoItem;
