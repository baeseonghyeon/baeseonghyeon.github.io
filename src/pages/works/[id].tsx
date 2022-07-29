import Layout from "components/layout/layout";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import workJson from "data/work.json";
import { WorkData, WorkDTO } from "interface/dto/work";
import { googleCloudImageUrl, lowerCaseParser } from "libs/textParser";
import { useRecoilValue } from "recoil";
import { languageState } from "recoil/ui";
import styles from "./workDetail.module.scss";
import cb from "classnames/bind";
import YoutubeVideo from "components/youtubeVideo/youtubeVideo";
import WorkDetailDescriptionPopup from "./workPopup/workDetailDescriptionPopup/workDetailDescriptionPopup";
import WorkDetailInfoPopup from "./workPopup/workDetailInfoPopup/workDetailInfoPopup";
import NotFound from "pages/404";
import ContentImage from "components/contentImage/contentImage";

const cn = cb.bind(styles);

const WorkDetail: NextPage = ({ work }: any) => {
    const router = useRouter();
    const language = useRecoilValue(languageState);
    const works: WorkDTO = workJson;
    const [workId, setWorkId] = useState<string>();
    const [workData, setWorkData] = useState<WorkData>();
    const [isNotfound, setIsNotfound] = useState<any>(null);

    useEffect(() => {
        if (router.isReady) {
            const { id } = router.query;
            if (id) setWorkId(id as string);

            console.log(work);
        }
    }, [router.isReady]);

    useEffect(() => {
        if (workId) {
            let splitedWorkId = workId.split("-");
            const category = splitedWorkId[splitedWorkId.length - 1];
            const title = workId.replace(`-${category}`, "");

            const filtereData = works.data
                .filter(
                    (item) =>
                        lowerCaseParser(item.title.en) === title &&
                        item.info.category[0]?.toLowerCase() === category,
                )
                .map((item) => setWorkData(item));

            setIsNotfound(filtereData.length);
        }
    }, [workId]);

    if (isNotfound === 0) {
        return <NotFound />;
    }

    if (workData)
        return (
            <Layout
                title={workData.title[language]}
                description={
                    workData.description[language]?.substring(0, 80).trimEnd() +
                    "..."
                }
            >
                <WorkDetailInfoPopup workData={workData} />
                <WorkDetailDescriptionPopup workData={workData} />

                <div className={cn("container")}>
                    <div className={cn("content__container")}>
                        {workData.video?.map((video) => {
                            return (
                                <div
                                    className={cn(
                                        video.fullSize
                                            ? "col-md-12"
                                            : "col-md-6",
                                    )}
                                    key={video.url}
                                >
                                    <div className={cn("video__wrapper")}>
                                        <YoutubeVideo
                                            iframeClassName={cn(
                                                "video__content",
                                            )}
                                            skeletonClassName={cn(
                                                cn("video__content"),
                                            )}
                                            link={video.url}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className={cn("content__container")}>
                        {workData.image?.map((image) => {
                            return (
                                <div
                                    className={cn(
                                        image.fullSize
                                            ? "col-md-12"
                                            : "col-md-6",
                                    )}
                                    key={image.url}
                                >
                                    <ContentImage
                                        src={googleCloudImageUrl(image.url)}
                                        className={cn("image__content")}
                                        skeletonClassName={cn("skeleton")}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Layout>
        );
    else
        return (
            <Layout
                title={work.title}
                description={work.content}
                image={work.image}
            >
                <div className={cn("loading")}>
                    <h1>{work.title}</h1>
                    <p>{work.content}</p>
                    <p style={{ textAlign: "center" }}>Loading...</p>
                </div>
            </Layout>
        );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const works: WorkDTO = workJson;

    const getWorkPopupId = (title: string | undefined, category: string) => {
        return `${lowerCaseParser(title)}-${lowerCaseParser(category)}`;
    };

    const paths = works.data.map((item) => ({
        params: {
            id: getWorkPopupId(item.title.en, item.info.category[0]),
        },
    }));
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const works: WorkDTO = workJson;
    const workId: string = (context.params?.id as string) || "";
    let workDescription;
    let workTitle;
    let workImage;
    let splitedWorkId = workId.split("-");
    const category = splitedWorkId[splitedWorkId.length - 1];
    const title = workId.replace(`-${category}`, "");

    works.data
        .filter(
            (item) =>
                lowerCaseParser(item.title.en) === title &&
                item.info.category[0]?.toLowerCase() === category,
        )
        .map((item) => {
            workDescription = item.description.ko;
            workTitle = item.title.ko;
            workImage = item.image ? item.image[0].url : null;
        });

    const work = {
        id: workId,
        title: workTitle,
        content: workDescription,
        image: workImage,
    };

    return { props: { work } };
};

export default WorkDetail;
