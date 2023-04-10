export type TodoItemGraph = {
    [id: string]: TodoItem;
}

export type TodoItem = {
    id: string;
    name: string;
    children: string[];
    parents: string[];
}
