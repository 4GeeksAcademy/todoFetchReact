import React, { useState, useEffect } from "react";
import {
    createUser,
    deleteUser,
    readUser,
    readUserList,
    createUserTodo,
    updateTodo,
    deleteTodo
} from '../component/home';



export const Todolist = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);
    return (
        <div className="container">
            <h1>todos</h1>
            <ul>
                <li>
                    <input type="text"
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                setTodos(todos.concat([inputValue]))
                                setInputValue("");
                            }
                        }}
                        placeholder="What needs to be done?" />
                </li>
                {todos.map((item, index) => (
                    <li className="icon">
                        {item}{""}
                        <i className="fa-duotone fa-solid fa-xmark"
                            onClick={() =>
                                setTodos(
                                    todos.filter(
                                        (t, currentIndex) =>
                                            index != currentIndex))}></i>
                    </li>
                ))}

            </ul>
            <div className="items-left" > {todos.length} items left</div>
        </div>
    );

    const createUser = async (username) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/users/alexcastaño`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error en la creación del usuario: ' + response.statusText);
            }

            const data = await response.json();
            readUser(username);
        } catch (error) {
            console.error('Error creando usuario:', error);
            throw error;
        }
    };

    const deleteUser = async (username) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/users/alexcastaño`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }

    const readUser = async (username) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/users/alexcastaño`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                // Aquí se manejan las respuestas que no son exitosas
                createUser(username)
            }

            const data = await response.json();
            console.log(data.todos);
            return (data.todos);
        } catch (error) {
            console.error('Error leyendo usuario:', error);
            throw error;
        }
    };

    const readUserList = async (offset, limit) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/users?offset=${offset}&limit=${limit}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error reading user list:', error);
            throw error;
        }
    }

    const createUserTodo = async (username, label, is_done) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/alexcastaño`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    label: label,
                    is_done: is_done,
                }),
            });
            const data = await response.json();
            return await readUser(username);
        } catch (error) {
            console.error('Error creating TODO:', error);
            throw error;
        }
    }

    const updateTodo = async (todoId, todoData) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todoData),
            });
            if (!response.ok) {
                throw new Error('Failed to update TODO');
            }
            return await response.json();
        } catch (error) {
            console.error('Error updating TODO:', error);
            throw error;
        }
    }

    const deleteTodo = async (todoId) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/alexcastaño`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error deleting TODO');
            }

            const data = response.status === 204 ? {} : await response.json();
            return data;
        } catch (error) {
            console.error('Error deleting TODO:', error);
            throw error;
        }
    };
    export {
        createUser,
        deleteUser,
        readUser,
        readUserList,
        createUserTodo,
        updateTodo,
        deleteTodo,
    };