import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
    useMemo,
} from "react";
import styles from "./backgroundParticles.module.scss";

interface Particle {
    id: number;
    x: number;
    y: number;
    sides: number;
    targetSides: number; // 목표 도형
    morphProgress: number; // 0~1 사이의 변형 진행도
    offsetX: number;
    offsetY: number;
}

// easeInOutCubic easing 함수 (컴포넌트 외부로 이동)
const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

const BackgroundParticles: React.FC = () => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const animationFrameId = useRef<number>();
    const availableShapes = useMemo(() => [3, 4, 5, 6, 0, -4], []); // 3각, 4각(정사각형), 5각, 6각, 원형(0), 마름모(-4)

    // 폴리곤 좌표 캐시
    const polygonCache = useRef<Map<number, Array<{ x: number; y: number }>>>(
        new Map(),
    );

    // 랜덤 도형 선택 함수 (메모이제이션)
    const getRandomShape = useCallback(() => {
        return availableShapes[
            Math.floor(Math.random() * availableShapes.length)
        ];
    }, [availableShapes]);

    // 초기 파티클 생성 (페이지 로드 시 한 번만)
    useEffect(() => {
        const createParticles = () => {
            const newParticles: Particle[] = [];
            const count = 18 + Math.floor(Math.random() * 5); // 18~22개

            for (let i = 0; i < count; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * 100, // 랜덤 위치
                    y: Math.random() * 100, // 랜덤 위치
                    sides: 4, // 4각형(네모)으로 시작
                    targetSides: 4,
                    morphProgress: 1, // 완전히 변형 완료 상태로 시작
                    offsetX: 0,
                    offsetY: 0,
                });
            }

            setParticles(newParticles);
        };

        createParticles();
    }, []);

    // 시간에 따라 랜덤하게 도형 변경 (5초마다)
    useEffect(() => {
        const interval = setInterval(() => {
            setParticles((prev) => {
                if (prev.length === 0) return prev;

                // 모든 파티클에 적용할 랜덤 도형 하나 선택
                const currentShape = prev[0].targetSides;
                let newShape = getRandomShape();

                // 현재 모양과 같으면 다른 모양 선택
                while (newShape === currentShape) {
                    newShape = getRandomShape();
                }

                // 모든 파티클에 같은 도형 적용
                return prev.map((particle) => ({
                    ...particle,
                    targetSides: newShape,
                    morphProgress: 0, // 변형 시작
                }));
            });
        }, 5000); // 5초마다 변경

        return () => clearInterval(interval);
    }, [getRandomShape]);

    // 부드러운 모양 변형 애니메이션
    useEffect(() => {
        const morphInterval = setInterval(() => {
            setParticles((prev) =>
                prev.map((particle) => {
                    if (particle.morphProgress < 1) {
                        const newProgress = Math.min(
                            particle.morphProgress + 0.02,
                            1,
                        ); // 50프레임에 걸쳐 변형 (1초)

                        // 변형이 완료되면 sides를 targetSides로 업데이트
                        if (newProgress >= 1) {
                            return {
                                ...particle,
                                sides: particle.targetSides,
                                morphProgress: 1,
                            };
                        }

                        return {
                            ...particle,
                            morphProgress: newProgress,
                        };
                    }
                    return particle;
                }),
            );
        }, 20); // 50fps

        return () => clearInterval(morphInterval);
    }, []);

    // 마우스 위치 추적
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // 마우스 인터랙션 애니메이션
    useEffect(() => {
        let lastUpdateTime = 0;
        const updateInterval = 16; // ~60fps (throttling)

        const updateParticlePositions = (timestamp: number) => {
            if (!containerRef.current) {
                animationFrameId.current = requestAnimationFrame(
                    updateParticlePositions,
                );
                return;
            }

            // throttling으로 성능 최적화
            if (timestamp - lastUpdateTime < updateInterval) {
                animationFrameId.current = requestAnimationFrame(
                    updateParticlePositions,
                );
                return;
            }
            lastUpdateTime = timestamp;

            const rect = containerRef.current.getBoundingClientRect();
            const mouseX = mousePos.current.x;
            const mouseY = mousePos.current.y;

            setParticles((prev) =>
                prev.map((particle) => {
                    const particleX =
                        rect.left + (particle.x / 100) * rect.width;
                    const particleY =
                        rect.top + (particle.y / 100) * rect.height;

                    const dx = mouseX - particleX;
                    const dy = mouseY - particleY;
                    const distanceSq = dx * dx + dy * dy; // sqrt 연산 피하기

                    const repelDistance = 150;
                    const repelDistanceSq = repelDistance * repelDistance;
                    let newOffsetX = particle.offsetX;
                    let newOffsetY = particle.offsetY;

                    if (distanceSq < repelDistanceSq && distanceSq > 0) {
                        const distance = Math.sqrt(distanceSq);
                        const force =
                            (repelDistance - distance) / repelDistance;
                        const angle = Math.atan2(dy, dx);
                        newOffsetX = -Math.cos(angle) * force * 50;
                        newOffsetY = -Math.sin(angle) * force * 50;
                    } else {
                        // 원래 위치로 복귀
                        newOffsetX = particle.offsetX * 0.9;
                        newOffsetY = particle.offsetY * 0.9;
                    }

                    return {
                        ...particle,
                        offsetX: newOffsetX,
                        offsetY: newOffsetY,
                    };
                }),
            );

            animationFrameId.current = requestAnimationFrame(
                updateParticlePositions,
            );
        };

        animationFrameId.current = requestAnimationFrame(
            updateParticlePositions,
        );

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    // 다각형의 점 좌표를 계산하는 함수 (0은 원형, -4는 마름모) - 캐싱 적용
    const getPolygonCoordinates = useCallback(
        (sides: number, rotation: number = 0) => {
            // 캐시 확인 (rotation이 0일 때만 캐싱)
            if (rotation === 0 && polygonCache.current.has(sides)) {
                return polygonCache.current.get(sides)!;
            }

            const points = [];
            const radius = 3.5;
            const centerX = 3.5;
            const centerY = 3.5;

            // 원형 처리 (0일 때)
            if (sides === 0) {
                // 원을 24개의 점으로 근사
                const circlePoints = 24;
                for (let i = 0; i < circlePoints; i++) {
                    const angle = (i * 2 * Math.PI) / circlePoints;
                    const x = centerX + radius * Math.cos(angle);
                    const y = centerY + radius * Math.sin(angle);
                    points.push({ x, y });
                }
            } else if (sides === -4) {
                // 마름모 처리 (-4일 때)
                // 마름모는 회전하지 않은 4각형
                for (let i = 0; i < 4; i++) {
                    const angle =
                        (i * 2 * Math.PI) / 4 - Math.PI / 2 + rotation;
                    const x = centerX + radius * Math.cos(angle);
                    const y = centerY + radius * Math.sin(angle);
                    points.push({ x, y });
                }
            } else {
                // 정사각형은 45도 회전
                const rotationOffset = sides === 4 ? Math.PI / 4 : 0;

                for (let i = 0; i < sides; i++) {
                    const angle =
                        (i * 2 * Math.PI) / sides -
                        Math.PI / 2 +
                        rotationOffset +
                        rotation;
                    const x = centerX + radius * Math.cos(angle);
                    const y = centerY + radius * Math.sin(angle);
                    points.push({ x, y });
                }
            }

            // 캐시에 저장 (rotation이 0일 때만)
            if (rotation === 0) {
                polygonCache.current.set(sides, points);
            }

            return points;
        },
        [],
    );

    // 두 도형 사이를 보간하여 부드럽게 변형 (최적화됨)
    const getMorphedPolygonPoints = useCallback(
        (particle: Particle) => {
            if (particle.morphProgress >= 1) {
                // 변형 완료: 목표 도형 표시 (캐시된 좌표 사용)
                const points = getPolygonCoordinates(particle.sides);
                return points.map((p) => `${p.x},${p.y}`).join(" ");
            }

            // 변형 중: 두 도형 사이를 보간
            const startPoints = getPolygonCoordinates(particle.sides);
            const endPoints = getPolygonCoordinates(particle.targetSides);

            // 점의 개수가 다를 경우, 더 많은 점을 가진 쪽에 맞춤
            const maxPoints = Math.max(startPoints.length, endPoints.length);
            const progress = easeInOutCubic(particle.morphProgress);

            // 보간된 점들을 문자열로 직접 생성 (배열 생성 최소화)
            let pointsString = "";
            for (let i = 0; i < maxPoints; i++) {
                // 시작 점과 끝 점의 인덱스 (순환)
                const startIdx = i % startPoints.length;
                const endIdx = i % endPoints.length;

                const startPoint = startPoints[startIdx];
                const endPoint = endPoints[endIdx];

                // 선형 보간
                const x = startPoint.x + (endPoint.x - startPoint.x) * progress;
                const y = startPoint.y + (endPoint.y - startPoint.y) * progress;

                pointsString += (i > 0 ? " " : "") + `${x},${y}`;
            }

            return pointsString;
        },
        [getPolygonCoordinates],
    );

    return (
        <div ref={containerRef} className={styles.container}>
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className={styles.particle}
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        transform: `translate(${particle.offsetX}px, ${particle.offsetY}px)`,
                    }}
                >
                    <svg width="7" height="7" viewBox="0 0 7 7">
                        <polygon points={getMorphedPolygonPoints(particle)} />
                    </svg>
                </div>
            ))}
        </div>
    );
};

export default BackgroundParticles;
