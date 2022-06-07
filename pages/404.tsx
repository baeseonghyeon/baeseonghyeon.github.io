import cb from 'classnames/bind';
import { NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import styles from './404.module.scss';

const cn = cb.bind(styles);

const NotFound: NextPage = () => {
    const [counter, setCounter] = useState(5);

    useEffect(() => {
        const countdown = setInterval(() => {
            if (counter > 0) {
                setCounter(counter - 1);
            }
            if (counter === 0) {
                clearInterval(countdown);
            }
        }, 1000);
        return () => clearInterval(countdown);
    }, [counter]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            Router.push('/');
        }, 5000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <Layout title="Oops!">
            <div className={cn('container')}>
                <h2 className={cn('num__label')}>404</h2>
                <h3 className={cn('label')}>페이지를 찾을 수 없습니다.</h3>
                <p>
                    {counter}초 후
                    <Link href="/">
                        <a href="/" className={cn('link__label')}>
                            메인페이지
                        </a>
                    </Link>
                    로 이동합니다.
                </p>
            </div>
        </Layout>
    );
};

export default NotFound;
