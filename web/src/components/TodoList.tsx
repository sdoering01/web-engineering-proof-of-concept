import { useState } from "react";

import { TodoItem, TodoItemGraph } from "../lib/models";
import TodoListItem from "./TodoListItem";
import NewTodoItemForm from "./NewTodoItemForm";
import TodoTree from "./TodoTree";

// TODO: Add option to remove items (what to do with dependencies?)
// TODO: Edit Todo
// TODO: Check for loops before adding
// TODO: Add persistence in local storage

const initialTodoItemGraph: TodoItemGraph = {
    id1: {
        id: "id1",
        name: "Repair brakes",
        children: ["id2"],
        parents: [],
    },
    id2: {
        id: "id2",
        name: "Get car inspection",
        children: ["id3"],
        parents: ["id1"],
    },
    id3: {
        id: "id3",
        name: "Clean car",
        children: [],
        parents: ["id2"],
    },
    id4: {
        id: "id4",
        name: "Finish Project",
        children: [],
        parents: [],
    },
};

function TodoList() {
    const [todoItemGraph, setTodoItemGraph] = useState(initialTodoItemGraph);
    const [todoIdStack, setTodoIdStack] = useState<string[]>([]);

    function todoIdStackPush(id: string) {
        setTodoIdStack(prev => [...prev, id]);
    }

    function todoIdStackPop() {
        setTodoIdStack(prev => prev.slice(0, prev.length - 1));
    };

    function handleAddTodoItem(item: TodoItem) {
        // Dedup children
        item.children = [...new Set(item.children)];
        setTodoItemGraph(prev => {
            const newGraph = { ...prev, [item.id]: item };
            // Add new item as parent of its children
            for (const childId of item.children) {
                newGraph[childId] = {
                    ...newGraph[childId],
                    parents: [
                        ...newGraph[childId].parents,
                        item.id
                    ]
                };
            }
            // Add new item as child of its parents
            for (const parentId of item.parents) {
                newGraph[parentId] = {
                    ...newGraph[parentId],
                    children: [
                        ...newGraph[parentId].children,
                        item.id,
                    ],
                };
            }
            return newGraph;
        })
    }

    let topStackItem;
    if (todoIdStack.length > 0) {
        const topId = todoIdStack[todoIdStack.length - 1];
        topStackItem = todoItemGraph[topId];

    } else {
        topStackItem = null;
    }

    let relevantTodoItems: TodoItem[];
    if (topStackItem === null) {
        relevantTodoItems = Object.values(todoItemGraph).filter(item => item.parents.length === 0);
    } else {
        relevantTodoItems = topStackItem.children.map(id => todoItemGraph[id]);
    }

    const releventTodoItemElements = relevantTodoItems.map(item => (
        <TodoListItem key={item.id} item={item} onClick={todoIdStackPush} />
    ));

    return (
        <div>
            {topStackItem
                ? (
                    <>
                        <h2>{topStackItem.name}</h2>
                        <button onClick={todoIdStackPop}>Back</button>
                        <ul>
                            {releventTodoItemElements}
                        </ul>
                    </>
                ) : (
                    <>
                        <h1>Todo List</h1>
                        <ul>
                            {releventTodoItemElements}
                        </ul>
                    </>
                )
            }
            <p>Stack: {todoIdStack.length > 0 ? todoIdStack.join(", ") : "-"}</p>
            <NewTodoItemForm onItemAdd={handleAddTodoItem} itemGraph={todoItemGraph} />
            <hr />
            <TodoTree itemGraph={todoItemGraph} />
        </div>
    );
}

export default TodoList;
