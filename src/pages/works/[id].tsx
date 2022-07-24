import Layout from "components/layout/layout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import workJson from "data/work.json";
import { WorkData, WorkDTO } from "interface/dto/work";
import { firsttLetterCapitalizer, lowerCaseParser } from "libs/textParser";
import { useRecoilValue } from "recoil";
import { languageState } from "recoil/ui";
import Popup from "components/popup/popup";
import styles from "./works.module.scss";
import cb from "classnames/bind";
const cn = cb.bind(styles);

const Detail: NextPage = () => {
    const router = useRouter();
    const language = useRecoilValue(languageState);
    const works: WorkDTO = workJson;
    const [workId, setWorkId] = useState<string>();
    const [workData, setWorkData] = useState<WorkData>();
    const [workInfo, setWorkInfo] = useState<[string, any][]>();

    useEffect(() => {
        if (router.isReady) {
            const { id } = router.query;
            if (id) setWorkId(id as string);
        }
    }, [router.isReady]);

    useEffect(() => {
        if (workId) {
            let splitedWorkId = workId.split("-");
            const category = splitedWorkId[splitedWorkId.length - 1];
            const title = workId.replace(`-${category}`, "");

            works.data
                .filter(
                    (item) =>
                        lowerCaseParser(item.title.en) === title &&
                        item.info.category[0]?.toLowerCase() === category,
                )
                .map((item) => setWorkData(item));
        }
    }, [workId]);

    useEffect(() => {
        if (workData) {
            setWorkInfo(Object.entries(workData.info));
        }
    }, [workData]);

    if (workData)
        return (
            <Layout title={workData.title[language]}>
                <Popup
                    title={workData.title[language]}
                    isActive={true}
                    idx={0}
                    className={cn("info__popup")}
                >
                    {workInfo &&
                        workInfo.map((item) => {
                            return (
                                <li className={cn("info__list")}>
                                    <p>
                                        <strong>
                                            {firsttLetterCapitalizer(item[0])} :{" "}
                                        </strong>
                                        {typeof item[1] === "string"
                                            ? item[1]
                                            : Array.isArray(item[1])
                                            ? item[1].map(
                                                  (
                                                      item: string,
                                                      idx,
                                                      { length },
                                                  ) => {
                                                      let isLast: boolean =
                                                          idx === length - 1;
                                                      return `${item}${
                                                          !isLast ? ", " : ""
                                                      }`;
                                                  },
                                              )
                                            : item[1][language]}
                                    </p>
                                </li>
                            );
                        })}
                </Popup>
                <Popup
                    title={workData.title[language]}
                    idx={1}
                    className={cn("description__popup")}
                >
                    {workData.description[language]}
                </Popup>
            </Layout>
        );
    else return <Layout>Wait for Second</Layout>;
};
export default Detail;
