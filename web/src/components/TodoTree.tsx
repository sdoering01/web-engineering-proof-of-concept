import { TodoItemGraph } from "../lib/models";

type Props = {
    id?: string;
    itemGraph: TodoItemGraph;
};

function TodoTree({ id, itemGraph }: Props) {
    if (id == null) {
        const rootItems = Object.values(itemGraph).filter(item => item.parents.length === 0);
        return (
            <>
                <h2>Tree</h2>
                <ul>
                    {rootItems.map(item => <TodoTree key={item.id} id={item.id} itemGraph={itemGraph} />)}
                </ul>
            </>
        );
    } else {
        const item = itemGraph[id];

        return (
            <li>
                <p>{item.name}</p>
                {item.children.length > 0
                    ? <ul>{item.children.map(id => <TodoTree key={id} id={id} itemGraph={itemGraph} />)}</ul>
                    : null}
            </li>
        );
    }
};

export default TodoTree;
