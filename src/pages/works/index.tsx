import Layout from "components/layout/layout";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getTodoList, Todo } from "../../api/todos";
import cb from "classnames/bind";
import styles from "./works.module.scss";
const cn = cb.bind(styles);

interface PageItem {
    title: string;
}

const Works: NextPage = () => {
    const pageItems: PageItem[] = [
        { title: "page title" },
        { title: "page title" },
        { title: "page title" },
    ];

    const [todoList, setTodoList] = useState<Todo[]>();

    useEffect(() => {
        return () => {
            getTodoList().then((response: Todo[] | Error) => {
                if (response instanceof Error) {
                    alert(response.message);
                } else {
                    setTodoList(response);
                }
            });
        };
    }, []);

    return (
        <Layout title={"Page"}>
            <ul data-testid="list">
                {todoList ? (
                    todoList.map((item, idx) => {
                        return (
                            <li key={idx}>
                                <Link href={`/page/${idx + 1}`}>
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

export default Works;
