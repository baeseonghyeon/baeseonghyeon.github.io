import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./backgroundParticles.module.scss";

interface Particle {
    id: number;
    x: number;
    y: number;
    sides: number;
    offsetX: number;
    offsetY: number;
}

const BackgroundParticles: React.FC = () => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const animationFrameId = useRef<number>();

    // 랜덤 다각형 생성 (4~6각형)
    const getRandomSides = () => Math.floor(Math.random() * 3) + 4;

    // 초기 파티클 생성 (페이지 로드 시 한 번만)
    useEffect(() => {
        const createParticles = () => {
            const newParticles: Particle[] = [];
            const count = 18 + Math.floor(Math.random() * 5); // 18~22개
            const sides = getRandomSides(); // 랜덤 도형

            for (let i = 0; i < count; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * 100, // 랜덤 위치
                    y: Math.random() * 100, // 랜덤 위치
                    sides: sides,
                    offsetX: 0,
                    offsetY: 0,
                });
            }

            setParticles(newParticles);
        };

        createParticles();
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

    // 다각형 SVG 경로 생성 (메모이제이션으로 캐싱)
    const polygonCache = useRef<Map<number, string>>(new Map());

    const getPolygonPoints = useCallback((sides: number) => {
        // 캐시에 있으면 재사용
        if (polygonCache.current.has(sides)) {
            return polygonCache.current.get(sides)!;
        }

        const points = [];
        const radius = 3.5; // 7px / 2
        const centerX = 3.5;
        const centerY = 3.5;

        // 4각형(사각형)은 45도 회전시켜서 정사각형으로 보이게 함
        const rotationOffset = sides === 4 ? Math.PI / 4 : 0;

        for (let i = 0; i < sides; i++) {
            const angle =
                (i * 2 * Math.PI) / sides - Math.PI / 2 + rotationOffset;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            points.push(`${x},${y}`);
        }

        const result = points.join(" ");
        polygonCache.current.set(sides, result);
        return result;
    }, []);

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
                        <polygon points={getPolygonPoints(particle.sides)} />
                    </svg>
                </div>
            ))}
        </div>
    );
};

export default BackgroundParticles;
