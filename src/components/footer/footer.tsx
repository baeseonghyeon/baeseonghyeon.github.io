import cb from "classnames/bind";
import { NextPage } from "next";
import styles from "./footer.module.scss";
import moment from "moment";
import "moment/locale/ko";

const cn = cb.bind(styles);

const Footer: NextPage = () => {
    const currentYear = moment().format("YYYY");

    return (
        <div className={cn("container")}>
            <span className={cn("copy-right")}>
                <a
                    href="https://analytics.google.com/analytics/web/?authuser=1#/report-home/a174985234w242601509p226122997"
                    target="blank"
                    rel="noopener noreferrer"
                />
                <span>
                    {currentYear ? currentYear : "2022"} Bae Seonghyeon
                    (github.io).
                </span>
            </span>
        </div>
    );
};

export default Footer;
