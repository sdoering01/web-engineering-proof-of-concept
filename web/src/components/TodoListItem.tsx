import { TodoItem } from "../lib/models";
import "./TodoListItem.css";

type Props = {
    item: TodoItem;
    onClick: (id: string) => void;
};

function TodoListItem ({item, onClick}: Props) {
    return <li key={item.id}>
        <button className="todo-list-item-button" onClick={() => onClick(item.id)}>{item.name}</button>
        <button className="todo-list-item-delete-button">X</button>
    </li>;
};

export default TodoListItem;
