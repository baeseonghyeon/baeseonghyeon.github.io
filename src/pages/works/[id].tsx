import Layout from "components/layout/layout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getTodo, Todo } from "../../api/todos";

const Detail: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const [todo, setTodo] = useState<Todo>();

    useEffect(() => {
        return () => {
            if (id) {
                getTodo(parseInt(id.toString())).then(
                    (response: Todo | Error) => {
                        if (response instanceof Error) {
                            alert(response.message);
                        } else {
                            setTodo(response);
                        }
                    },
                );
            }
        };
    }, []);

    if (todo)
        return (
            <Layout title={todo.title}>
                {todo.complated ? "Not Complated" : "Is Done"}
            </Layout>
        );
    else return <Layout title="Loading...">Wait for Second</Layout>;
};
export default Detail;
