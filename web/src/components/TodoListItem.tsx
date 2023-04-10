import { TodoItem } from "../lib/models";

type Props = {
    item: TodoItem;
    onClick: (id: string) => void;
};

function TodoListItem ({item, onClick}: Props) {
    return <li key={item.id}><button onClick={() => onClick(item.id)}>{item.name}</button></li>;
};

export default TodoListItem;
