import React from 'react';

const Todo = (props) => {
    const { todo, setTodo } = props;

    const updateTodo = async (todoId, todoStatus) => {
        try {
            const res = await fetch(`api/todo${todoId}`, {
                method: "PUT",
                body: JSON.stringify({ status: todoStatus }), // Use `todoStatus` instead of `content`
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error(`Failed to update todo: ${res.status} ${res.statusText}`);
            }

            const todoupdate = await res.json();

            if (todoupdate.acknowledged) {
                setTodo(currentodo => {
                    return currentodo.map((currentodo) => {
                        if (currentodo._id === todoId) {
                            return { ...currentodo, status: !currentodo.status };
                        }
                        return currentodo;
                    });
                });
            }
        } catch (error) {
            console.error("Error updating todo:", error);
            // Handle error here, e.g., display a message to the user
        }
    };

    return (
        <div className="mainTodo">
            <p>{todo.todo}</p>
            <div>
                <button className='todoStatusBtn' onClick={() => updateTodo(todo._id, todo.status)}>
                    {todo.status ? "✅" : "❌"}
                </button>
            </div>
        </div>
    );
};

export default Todo;
