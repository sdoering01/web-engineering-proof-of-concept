import { FormEvent, useState, useRef } from "react";

import { TodoItem, TodoItemGraph } from "../lib/models";

type Props = {
    itemGraph: TodoItemGraph,
    onItemAdd: (item: TodoItem) => void,
};

function NewTodoItemForm({ itemGraph, onItemAdd }: Props) {
    const [parentIds, setParentIds] = useState<string[]>([]);
    const [childIds, setChildIds] = useState<string[]>([]);
    const nameInput = useRef<HTMLInputElement>(null);

    function addParent() {
        if (Object.values(itemGraph).length > 0) {
            setParentIds(prev => [...prev, Object.values(itemGraph)[0].id]);
        }
    }

    function updateParentId(idx: number, newId: string) {
        setParentIds(prev => {
            const newIds = [...prev];
            newIds[idx] = newId;
            return newIds;
        });
    }

    function removeParent(idx: number) {
        setParentIds(prev => [...prev.slice(0, idx), ...prev.slice(idx + 1)]);
    }

    function addChild() {
        if (Object.values(itemGraph).length > 0) {
            setChildIds(prev => [...prev, Object.values(itemGraph)[0].id]);
        }
    }

    function updateChildId(idx: number, newId: string) {
        setChildIds(prev => {
            const newIds = [...prev];
            newIds[idx] = newId;
            return newIds;
        });
    }

    function removeChild(idx: number) {
        setChildIds(prev => [...prev.slice(0, idx), ...prev.slice(idx + 1)]);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newId = (Math.random() * 1_000_000).toFixed();
        const newItem: TodoItem = {
            id: `id${newId}`,
            name: nameInput.current!.value,
            parents: parentIds,
            children: childIds,
        };
        onItemAdd(newItem);

        setChildIds([]);
        setParentIds([]);
        nameInput.current!.value = "";
    }

    return (
        <div>
            <h3>Add new Todo Item</h3>
            <form onSubmit={handleSubmit}>
                <label>Name: <input ref={nameInput} type="text" required /></label>
                <h4>Parent Todos:</h4>
                <ul>
                    {parentIds.map((id, idx) => (
                        // How to choose the key?
                        <li>
                            <select onInput={(e) => updateParentId(idx, (e.target as HTMLSelectElement).value)} value={id}>
                                {Object.values(itemGraph).map(item => (
                                    <option value={item.id}>{item.name}</option>
                                ))}
                            </select>
                            {" "}
                            <button type="button" onClick={() => removeParent(idx)}>Remove</button>
                        </li>
                    ))}
                </ul>
                <button type="button" onClick={addParent}>Add Parent Todo</button>
                <h4>Child Todos:</h4>
                <ul>
                    {childIds.map((id, idx) => (
                        // How to choose the key?
                        <li>
                            <select onInput={(e) => updateChildId(idx, (e.target as HTMLSelectElement).value)} value={id}>
                                {Object.values(itemGraph).map(item => (
                                    <option value={item.id}>{item.name}</option>
                                ))}
                            </select>
                            {" "}
                            <button type="button" onClick={() => removeChild(idx)}>Remove</button>
                        </li>
                    ))}
                </ul>
                <button type="button" onClick={addChild}>Add Child Todo</button>
                <br /><br />
                <button>Add</button>
            </form>
        </div>
    );
};

export default NewTodoItemForm;
