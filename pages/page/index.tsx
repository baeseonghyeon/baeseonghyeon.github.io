import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { getTodoList, Todo } from '../api/todos';

interface PageItem {
    title: string;
}

const Page: NextPage = () => {
    const pageItems: PageItem[] = [
        { title: 'page title' },
        { title: 'page title' },
        { title: 'page title' },
    ];

    const [todoList, setTodoList] = useState<Todo[]>();

    useEffect(() => {
        getTodoList().then((response: Todo[] | Error) => {
            if (response instanceof Error) {
                alert(response.message);
            } else {
                setTodoList(response);
            }
        });
    }, []);

    return (
        <Layout title="Page">
            <ul>
                {todoList ? (
                    todoList.map((item, idx) => {
                        return (
                            <li>
                                <Link href={`/page/${idx + 1}`} key={idx}>
                                    {`${item.title}`}
                                </Link>
                            </li>
                        );
                    })
                ) : (
                    <li>Loading...</li>
                )}
            </ul>
        </Layout>
    );
};

export default Page;
