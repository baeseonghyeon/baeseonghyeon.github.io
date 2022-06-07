import axios from 'axios';

export interface Todo {
    userId: number;
    id: number;
    title: string;
    complated: boolean;
}

export const getTodoList = async () => {
    try {
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/todos',
        );
        return response.data;
    } catch (e) {
        return e as Error;
    }
};

export const getTodo = async (id: number) => {
    try {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/todos/${id}`,
        );
        return response.data;
    } catch (e) {
        return e as Error;
    }
};
