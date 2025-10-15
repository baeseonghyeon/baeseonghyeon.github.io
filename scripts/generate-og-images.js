const { createCanvas, loadImage, registerFont } = require("canvas");
const fs = require("fs");
const path = require("path");
const works = require("../src/data/work.json");

// Noto Sans KR 폰트 등록 (프로젝트에서 사용 중인 폰트)
// 정적 Bold TTF 파일 사용
registerFont(path.join(__dirname, "../src/assets/fonts/NotoSansKR-Bold.ttf"), {
    family: "Noto Sans KR",
    weight: "bold",
});

// OG 이미지 크기
const WIDTH = 1200;
const HEIGHT = 630;

// WorkPlaceholder 디자인 스타일 (OG 이미지에 맞게 스케일 조정)
// 전체 크기 20% 증가
const STYLES = {
    background: "#171717",
    speechBubble: {
        background: "rgba(255, 255, 255, 1)",
        border: "#000000",
        borderWidth: 7, // 선명하게 (20% 증가)
        borderRadius: 70, // 곡률 조정 (20% 증가)
        padding: { x: 58, y: 29 }, // 패딩 20% 증가
        gap: 22, // 간격 20% 증가
    },
    text: {
        fontSize: 50, // 텍스트 20% 증가
        fontWeight: "bold",
        color: "#1a1a1a",
    },
    icon: {
        size: 270, // 파비콘 크기 20% 증가
    },
};

// 비대칭 둥근 사각형 그리기 (border-radius: 50px 50px 50px 0)
// quadraticCurveTo를 사용한 부드러운 곡선
function roundRectAsymmetric(ctx, x, y, width, height, radius) {
    ctx.beginPath();

    // 왼쪽 위 모서리 시작점 (곡선 중간)
    ctx.moveTo(x, y + radius);

    // 왼쪽 위 → 상단 (quadraticCurveTo로 부드러운 곡선)
    ctx.quadraticCurveTo(x, y, x + radius, y);

    // 상단 → 오른쪽 위 모서리
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);

    // 오른쪽 위 → 오른쪽 아래 모서리
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);

    // 오른쪽 아래 → 왼쪽 아래 (각진 모서리)
    ctx.lineTo(x, y + height);

    // 왼쪽 아래 → 왼쪽 위 (직선, 시작점으로 돌아감)
    ctx.closePath();
}

async function generateOGImage(title, category, outputPath) {
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    // 배경
    ctx.fillStyle = STYLES.background;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // 파비콘 로드
    const iconPath = path.join(
        __dirname,
        "../public/favicon/apple-touch-icon.png",
    );
    const icon = await loadImage(iconPath);

    // 폰트 설정 (bold) - 프로젝트와 동일한 Noto Sans KR 사용
    ctx.font = `bold ${STYLES.text.fontSize}px "Noto Sans KR", sans-serif`;

    // title이 3단어 초과일 경우 줄바꿈 처리
    let titleWords = title.split(/\s+/);
    let titleLines = [];
    if (titleWords.length > 3) {
        // 3단어씩 끊어서 줄바꿈
        for (let i = 0; i < titleWords.length; i += 3) {
            titleLines.push(titleWords.slice(i, i + 3).join(" "));
        }
    } else {
        titleLines = [title];
    }

    // 말풍선 크기 계산
    const titleText = titleLines.join("\n") + ".";
    const categoryText = category + ".";
    // 말풍선 높이: 줄 수에 따라 동적으로, 1줄일 때는 카테고리와 동일하게
    const lineHeight = STYLES.text.fontSize * 1.2;
    const categoryBubbleHeight =
        STYLES.text.fontSize * 1.5 + STYLES.speechBubble.padding.y * 2;
    const titleBubbleHeight =
        titleLines.length > 1
            ? lineHeight * titleLines.length + STYLES.speechBubble.padding.y * 2
            : categoryBubbleHeight;

    const titleMetrics = ctx.measureText(titleText);
    const categoryMetrics = ctx.measureText(categoryText);

    const titleWidth = titleMetrics.width + STYLES.speechBubble.padding.x * 2;
    const categoryWidth =
        categoryMetrics.width + STYLES.speechBubble.padding.x * 2;
    const bubbleHeight = Math.max(titleBubbleHeight, categoryBubbleHeight);

    // 가장 긴 말풍선 너비 계산
    const maxBubbleWidth = Math.max(titleWidth, categoryWidth);

    // 전체 요소 그룹의 너비 계산 (파비콘 + 간격 + 말풍선)
    const iconAndGap = STYLES.icon.size + 5; // 파비콘 + 간격
    const totalWidth = iconAndGap + maxBubbleWidth;

    // totalWidth를 기준으로 이미지 정가운데에 배치
    // 그룹의 시작점 = 중앙 - (전체 너비 / 2)
    const groupStartX = (WIDTH - totalWidth) / 2;

    // 말풍선 시작 위치 = 그룹 시작점 + 파비콘 + 간격
    const bubblesStartX = groupStartX + iconAndGap;

    // 전체 그룹(파비콘+버블) 높이 계산 (파비콘, 두 말풍선 모두 포함)
    const groupHeight = Math.max(
        STYLES.icon.size,
        titleBubbleHeight + STYLES.speechBubble.gap + categoryBubbleHeight,
    );
    // 그룹의 시작 Y 위치 (상하 중앙)
    const groupStartY = (HEIGHT - groupHeight) / 2;
    // 타이틀 말풍선 Y 위치
    const titleY = groupStartY;
    // 카테고리 말풍선 Y 위치
    const categoryY = titleY + titleBubbleHeight + STYLES.speechBubble.gap;
    // 파비콘 위치 (그룹 내 세로 중앙)
    const iconX = groupStartX;
    const iconY = groupStartY + (groupHeight - STYLES.icon.size) / 2;

    ctx.drawImage(icon, iconX, iconY, STYLES.icon.size, STYLES.icon.size);

    // 타이틀 말풍선
    const titleX = bubblesStartX;

    ctx.fillStyle = STYLES.speechBubble.background;
    roundRectAsymmetric(
        ctx,
        titleX,
        titleY,
        titleWidth,
        titleBubbleHeight,
        STYLES.speechBubble.borderRadius,
    );
    ctx.fill();

    ctx.strokeStyle = STYLES.speechBubble.border;
    ctx.lineWidth = STYLES.speechBubble.borderWidth;
    roundRectAsymmetric(
        ctx,
        titleX,
        titleY,
        titleWidth,
        titleBubbleHeight,
        STYLES.speechBubble.borderRadius,
    );
    ctx.stroke();

    ctx.fillStyle = STYLES.text.color;
    ctx.textBaseline = "middle";
    // 줄바꿈된 텍스트를 여러 줄로 그리기
    if (titleLines.length > 1) {
        for (let i = 0; i < titleLines.length; i++) {
            ctx.fillText(
                titleLines[i],
                titleX + STYLES.speechBubble.padding.x,
                titleY +
                    STYLES.speechBubble.padding.y +
                    lineHeight * i +
                    lineHeight / 2,
            );
        }
        // 마지막 줄에 마침표 추가
        ctx.fillText(
            ".",
            titleX +
                STYLES.speechBubble.padding.x +
                ctx.measureText(titleLines[titleLines.length - 1]).width,
            titleY +
                STYLES.speechBubble.padding.y +
                lineHeight * (titleLines.length - 1) +
                lineHeight / 2,
        );
    } else {
        ctx.fillText(
            titleText,
            titleX + STYLES.speechBubble.padding.x,
            titleY + titleBubbleHeight / 2,
        );
    }

    // 카테고리 말풍선
    const categoryX = bubblesStartX;
    // titleBubbleHeight와 관계없이 categoryY 계산
    ctx.fillStyle = STYLES.speechBubble.background;
    roundRectAsymmetric(
        ctx,
        categoryX,
        categoryY,
        categoryWidth,
        categoryBubbleHeight,
        STYLES.speechBubble.borderRadius,
    );
    ctx.fill();

    ctx.strokeStyle = STYLES.speechBubble.border;
    ctx.lineWidth = STYLES.speechBubble.borderWidth;
    roundRectAsymmetric(
        ctx,
        categoryX,
        categoryY,
        categoryWidth,
        categoryBubbleHeight,
        STYLES.speechBubble.borderRadius,
    );
    ctx.stroke();

    ctx.fillStyle = STYLES.text.color;
    ctx.fillText(
        categoryText,
        categoryX + STYLES.speechBubble.padding.x,
        categoryY + categoryBubbleHeight / 2,
    );

    // 이미지 저장
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(outputPath, buffer);
    console.log(`✅ Generated: ${outputPath}`);
}

async function generateAllOGImages() {
    const outputDir = path.join(__dirname, "../public/og");

    // og 폴더 생성
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log("🎨 Generating OG images...\n");

    for (const work of works.data) {
        // 이미지가 없는 프로젝트만 생성
        if (!work.thumbUrl && (!work.image || work.image.length === 0)) {
            const title = work.title.ko;
            const category = work.info.category.join(" · ");

            // 파일명: title-en-category.png
            const fileName = `${work.title.en
                .toLowerCase()
                .replace(
                    /\s+/g,
                    "-",
                )}-${work.info.category[0].toLowerCase()}.png`;
            const outputPath = path.join(outputDir, fileName);

            await generateOGImage(title, category, outputPath);
        }
    }

    console.log("\n✨ All OG images generated!");
}

generateAllOGImages().catch(console.error);
