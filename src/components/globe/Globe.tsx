import { Canvas } from "@react-three/fiber";
import {
    AdaptiveDpr,
    AdaptiveEvents,
    OrbitControls
} from "@react-three/drei";
import { Suspense, useState } from "react";
import { Dots } from "./Dots";
import { Arcs, type ArcDatum } from "./Arcs";
import React from "react";

const DEFAULT_GLOBE_COLOR = "#555";
const DEFAULT_ARC_COLOR = "#FFF";

interface SphereProps {
    radius?: number;
    globeColor?: string;
    segments?: number;
}

function Sphere({
    radius = 6,
    globeColor = DEFAULT_GLOBE_COLOR,
    segments = 32,
}: SphereProps) {
    return (
        <mesh castShadow>
            <sphereGeometry args={[radius, segments, segments]} />
            <meshPhongMaterial
                opacity={1}
                shininess={20}
                color={globeColor}
                transparent
            />
        </mesh>
    );
}

interface GlobeProps {
    radius?: number;
    dotsOffset?: number;
    arcs?: ArcDatum[];
    globeColor?: string;
    arcColor?: string;
}

const DEFAULT_ARCS = [
    { startLat: 40.7128, startLng: -74.006, endLat: 51.5072, endLng: -0.1276 },
    { startLat: 34.0522, startLng: -118.2437, endLat: 35.6762, endLng: 139.6503 },
    { startLat: 37.7749, startLng: -122.4194, endLat: 1.3521, endLng: 103.8198 },
    { startLat: 48.8566, startLng: 2.3522, endLat: 31.2304, endLng: 121.4737 },
    { startLat: 52.52, startLng: 13.405, endLat: 37.5665, endLng: 126.978 },
    { startLat: -23.5505, startLng: -46.6333, endLat: 40.4168, endLng: -3.7038 },
    { startLat: -34.6037, startLng: -58.3816, endLat: 19.4326, endLng: -99.1332 },
    { startLat: 30.0444, startLng: 31.2357, endLat: 55.7558, endLng: 37.6173 },
    { startLat: 41.0082, startLng: 28.9784, endLat: 28.6139, endLng: 77.209 },
    { startLat: 25.2048, startLng: 55.2708, endLat: 1.3521, endLng: 103.8198 },
    { startLat: 35.6762, startLng: 139.6503, endLat: 22.3193, endLng: 114.1694 },
    { startLat: 39.9042, startLng: 116.4074, endLat: 13.7563, endLng: 100.5018 },
    { startLat: 19.076, startLng: 72.8777, endLat: 13.0827, endLng: 80.2707 },
    { startLat: -33.8688, startLng: 151.2093, endLat: -37.8136, endLng: 144.9631 },
    { startLat: -36.8485, startLng: 174.7633, endLat: -33.8688, endLng: 151.2093 },
    { startLat: 59.3293, startLng: 18.0686, endLat: 41.9028, endLng: 12.4964 },
    { startLat: 52.3676, startLng: 4.9041, endLat: 64.1466, endLng: -21.9426 },
    { startLat: 38.7223, startLng: -9.1393, endLat: 53.3498, endLng: -6.2603 },
    { startLat: 43.6532, startLng: -79.3832, endLat: 49.2827, endLng: -123.1207 },
    { startLat: 25.7617, startLng: -80.1918, endLat: 4.711, endLng: -74.0721 },
    { startLat: -12.0464, startLng: -77.0428, endLat: -33.4489, endLng: -70.6693 },
    { startLat: -26.2041, startLng: 28.0473, endLat: -1.2921, endLng: 36.8219 },
    { startLat: 6.5244, startLng: 3.3792, endLat: 24.7136, endLng: 46.6753 },
    { startLat: 32.0853, startLng: 34.7818, endLat: 30.0444, endLng: 31.2357 },
    { startLat: 45.4642, startLng: 9.19, endLat: 47.4979, endLng: 19.0402 },
    { startLat: 50.1109, startLng: 8.6821, endLat: 59.9139, endLng: 10.7522 },
    { startLat: 14.5995, startLng: 120.9842, endLat: 25.033, endLng: 121.5654 },
    { startLat: 22.3193, startLng: 114.1694, endLat: 37.5665, endLng: 126.978 },
    { startLat: 1.3521, startLng: 103.8198, endLat: -6.2088, endLng: 106.8456 },
    { startLat: 31.2304, startLng: 121.4737, endLat: -33.8688, endLng: 151.2093 },
];

export default function Globe({
    radius = 6,
    dotsOffset = 2,
    globeColor = DEFAULT_GLOBE_COLOR,
    arcColor = "#ffffff",
    arcs = DEFAULT_ARCS
}: GlobeProps) {
    const [isLowPerf, setIsLowPerf] = useState(false);

    const detailRadius = radius + dotsOffset / 10;

    return (
        <Canvas id="globe"
            style={{ width: "640px", height: "640px", position: "absolute" }}
            camera={{ position: [5, 5, 10], near: 1, far: 50 }}
            dpr={[1, 2]}
        >
            <AdaptiveDpr pixelated />
            <AdaptiveEvents />

            {/* <ambientLight intensity={isLowPerf ? 0.6 : 0.7} /> */}
            <ambientLight intensity={1} />

            <Sphere
                radius={radius}
                globeColor={globeColor}
                segments={isLowPerf ? 16 : 32}
            />

            <Suspense>
                <Dots radius={detailRadius} />
            </Suspense>

            <Suspense>
                <Arcs
                    radius={detailRadius}
                    data={
                        isLowPerf ? arcs.slice(0, Math.ceil(arcs.length * 0.5)) : arcs
                    }
                    color={arcColor}
                    speed={isLowPerf ? 0.18 : 0.26}
                    trailLength={isLowPerf ? 0.5 : 0.8}
                    opacity={isLowPerf ? 0.7 : 0.86}
                />
            </Suspense>

            <OrbitControls
                autoRotate
                minDistance={5}
                minPolarAngle={Math.PI * 0.35}
                maxPolarAngle={Math.PI * 0.55}
                enableZoom={false}
                enablePan={false}
            />
        </Canvas>
    );
}
