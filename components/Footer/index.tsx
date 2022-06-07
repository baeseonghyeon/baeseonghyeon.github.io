import cb from 'classnames/bind';
import { NextPage } from 'next';
import styles from './Footer.module.scss';

const cn = cb.bind(styles);

const Footer: NextPage = () => {
    return (
        <div className={cn('container')}>
            <a
                href="https://baeseonghyeon.github.io/"
                target="_blank"
                className={cn('label')}
                rel="noreferrer"
            >
                © 2022 배성현(Bae Seonghyeon)
            </a>
        </div>
    );
};

export default Footer;
