import React from "react";
import { useEffect, useRef } from "react";
import "./Styles.css";

export default function Constellation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas!.getContext("2d");

        if (!canvas) {
            return;
        }

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener("resize", resize);

        const NUM_POINTS = 120;
        const MOUSE_DIST = 200;
        const points: Array<{ x: number; y: number; vx: number; vy: number }> = [];

        const mouse = { x: null, y: null };

        const onMouseMove = (e: any) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const onMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseleave", onMouseLeave);

        function createPoints() {
            points.length = 0;
            for (let i = 0; i < NUM_POINTS; i++) {
                points.push({
                    x: Math.random() * canvas!.width,
                    y: Math.random() * canvas!.height,
                    vx: (Math.random() - 0.5) * 0.6,
                    vy: (Math.random() - 0.5) * 0.6,
                });
            }
        }

        createPoints();

        function update() {
            for (const p of points) {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas!.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas!.height) p.vy *= -1;
            }
        }

        function draw() {
            if (!ctx) {
                return;
            }

            ctx.clearRect(0, 0, canvas!.width, canvas!.height);

            if (mouse.x !== null && mouse.y !== null) {
                // desenhar apenas pontos próximos do rato
                for (const p of points) {
                    const dx = p.x - mouse.x!;
                    const dy = p.y - mouse.y!;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < MOUSE_DIST) {
                        const alpha = 1 - dist / MOUSE_DIST;
                        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }

                // ligações entre pontos visíveis
                for (let i = 0; i < points.length; i++) {
                    const p1 = points[i];
                    const dx1 = p1.x - mouse.x;
                    const dy1 = p1.y - mouse.y;
                    const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

                    if (dist1 > MOUSE_DIST) continue;

                    for (let j = i + 1; j < points.length; j++) {
                        const p2 = points[j];
                        const dx2 = p2.x - mouse.x;
                        const dy2 = p2.y - mouse.y;
                        const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                        if (dist2 > MOUSE_DIST) continue;

                        const dx = p1.x - p2.x;
                        const dy = p1.y - p2.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        const alpha = 1 - dist / MOUSE_DIST;
                        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
                        ctx.lineWidth = 0.6 * alpha;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }

                // ligações do rato aos pontos visíveis
                for (const p of points) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < MOUSE_DIST) {
                        const alpha = 1 - dist / MOUSE_DIST;
                        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
                        ctx.lineWidth = 0.8 * alpha;
                        ctx.beginPath();
                        ctx.moveTo(mouse.x, mouse.y);
                        ctx.lineTo(p.x, p.y);
                        ctx.stroke();
                    }
                }
            }
        }

        let animationFrame: any;
        function loop() {
            update();
            draw();
            animationFrame = requestAnimationFrame(loop);
        }
        loop();

        // cleanup
        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseleave", onMouseLeave);
        };
    }, []);

    return (
        <canvas id="constellation" ref={canvasRef} />
    );
}