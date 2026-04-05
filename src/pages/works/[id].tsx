import Layout from "components/layout/layout";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { WorkData, WorkDTO } from "interface/dto/work";
import { fetchWork } from "libs/firestore";
import { convertImgurUrlToDirectLink, lowerCaseParser } from "libs/textParser";
import workJson from "data/work.json";
import { useRecoilValue } from "recoil";
import { languageState } from "recoil/ui";
import styles from "./workDetail.module.scss";
import cb from "classnames/bind";
import YoutubeVideo from "components/youtubeVideo/youtubeVideo";
import WorkDetailDescriptionPopup from "../../components/popup/workPopup/workDetailDescriptionPopup/workDetailDescriptionPopup";
import WorkDetailInfoPopup from "../../components/popup/workPopup/workDetailInfoPopup/workDetailInfoPopup";
import NotFound from "pages/404";
import ContentImage from "components/contentImage/contentImage";
import { getLocalizedText } from "libs/languageHelper";

const cn = cb.bind(styles);

const WorkDetail: NextPage = ({ work }: any) => {
    const router = useRouter();
    const language = useRecoilValue(languageState);
    const [workId, setWorkId] = useState<string>();
    const [workData, setWorkData] = useState<WorkData>();
    const [isNotfound, setIsNotfound] = useState<any>(null);

    useEffect(() => {
        if (router.isReady) {
            const { id } = router.query;
            if (id) setWorkId(id as string);
        }
    }, [router.isReady]);

    // Firestore에서 작업 데이터 로드 후 workId로 필터링
    useEffect(() => {
        if (!workId) return;
        const splitedWorkId = workId.split("-");
        const category = splitedWorkId[splitedWorkId.length - 1];
        const title = workId.replace(`-${category}`, "");

        fetchWork().then((works: WorkDTO) => {
            const filtered = works.data.filter(
                (item) =>
                    lowerCaseParser(item.title.en) === title &&
                    item.info.category[0]?.toLowerCase() === category,
            );
            setIsNotfound(filtered.length);
            if (filtered.length > 0) setWorkData(filtered[0]);
        });
    }, [workId]);

    if (isNotfound === 0) {
        return <NotFound />;
    }

    if (workData)
        return (
            <Layout
                title={getLocalizedText(workData.title, language)}
                description={
                    getLocalizedText(workData.description, language)
                        ?.substring(0, 80)
                        .trimEnd() + "..."
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
                        {workData.image?.map((image, index) => {
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
                                        src={convertImgurUrlToDirectLink(
                                            image.url,
                                        )}
                                        className={cn("image__content")}
                                        skeletonClassName={cn("skeleton")}
                                        alt={`${getLocalizedText(
                                            workData.title,
                                            language,
                                        )} Image ${index}`}
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
    // 빌드 타임 경로 생성은 로컬 JSON 사용 (Firebase 클라이언트 SDK는 브라우저 전용)
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
    // OG 메타데이터도 빌드 타임이므로 로컬 JSON 사용
    const works: WorkDTO = workJson;
    const workId: string = (context.params?.id as string) || "";
    let workDescription;
    let workTitle;
    let workImage;
    const splitedWorkId = workId.split("-");
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

            // 이미지가 있으면 사용, 없으면 생성된 OG 이미지
            if (item.thumbUrl) {
                workImage = item.thumbUrl;
            } else if (item.image && item.image.length > 0) {
                workImage = item.image[0].url;
            } else {
                // 빌드 타임에 생성된 OG 이미지 사용
                const fileName = `${
                    item.title.en?.toLowerCase().replace(/\s+/g, "-") ||
                    "project"
                }-${item.info.category[0]?.toLowerCase() || "work"}.png`;
                workImage = `/og/${fileName}`;
            }
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
