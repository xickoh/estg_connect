import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import React from "react";

const MIN_ARC_ALTITUDE = 0.18
const MAX_ARC_ALTITUDE = 0.38

export type ArcDatum = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
};

interface ArcsProps {
  data: ArcDatum[];
  radius?: number;
  color?: string;
  opacity?: number;
  speed?: number;
  trailLength?: number;
  segments?: number;
}

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}

function haversineAngularDistance(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(endLat - startLat);
  const dLng = toRad(endLng - startLng);
  const lat1 = toRad(startLat);
  const lat2 = toRad(endLat);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getArcAltitude(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
) {
  const angularDistance = haversineAngularDistance(
    startLat,
    startLng,
    endLat,
    endLng,
  );

  const normalized = angularDistance / Math.PI;

  return THREE.MathUtils.lerp(MIN_ARC_ALTITUDE, MAX_ARC_ALTITUDE, normalized);
}

function buildArcPoints(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
  radius: number,
  segments: number,
) {
  const start = latLngToVector3(startLat, startLng, radius);
  const end = latLngToVector3(endLat, endLng, radius);

  const altitude = getArcAltitude(startLat, startLng, endLat, endLng);
  const points: THREE.Vector3[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;

    const point = new THREE.Vector3().copy(start).lerp(end, t).normalize();

    const lift = radius * (1 + Math.sin(Math.PI * t) * altitude);
    point.multiplyScalar(lift);

    points.push(point);
  }

  return points;
}

function smoothPulse(x: number) {
  if (x <= 0 || x >= 1) return 0;

  if (x < 0.2) {
    return x / 0.2;
  }

  if (x > 0.8) {
    return (1 - x) / 0.2;
  }

  return 1;
}

interface AnimatedArcProps {
  points: THREE.Vector3[];
  color: string;
  opacity: number;
  speed: number;
  trailLength: number;
  offset: number;
}

function AnimatedArc({
  points,
  color,
  opacity,
  speed,
  trailLength,
  offset,
}: AnimatedArcProps) {
  const segmentData = useMemo(() => {
    return points.slice(0, -1).map((point, i) => ({
      start: point,
      end: points[i + 1],
      t: i / (points.length - 2),
    }));
  }, [points]);

  useFrame(({ scene }) => {
    // const elapsed = clock.getElapsedTime();
    // const head = (elapsed * speed + offset) % (1 + trailLength);

    for (let i = 0; i < scene.children.length; i++) {
      const child = scene.children[i];
      if (!child.userData?.isArcSegment) continue;
    }
  });

  return (
    <group>
      {segmentData.map((segment, index) => (
        <FadingSegment
          key={index}
          start={segment.start}
          end={segment.end}
          t={segment.t}
          color={color}
          opacity={opacity}
          speed={speed}
          trailLength={trailLength}
          offset={offset}
        />
      ))}
    </group>
  );
}

interface FadingSegmentProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
  t: number;
  color: string;
  opacity: number;
  speed: number;
  trailLength: number;
  offset: number;
}

function FadingSegment({
  start,
  end,
  t,
  color,
  opacity,
  speed,
  trailLength,
  offset,
}: FadingSegmentProps) {
  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints([start, end]);
  }, [start, end]);

  const materialRef = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0,
      }),
    [color],
  );

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    const cycle = (elapsed * speed + offset) % (1 + trailLength);

    const relative = (t - (cycle - trailLength)) / trailLength;
    const a = smoothPulse(relative);

    materialRef.opacity = a * opacity;
  });

  // @ts-expect-error line needs geometry
  return <line geometry={geometry} material={materialRef} />;
}

export function Arcs({
  data,
  radius = 6.2,
  color = "#ffffff",
  opacity = 0.95,
  speed = 0.12,
  trailLength = 0.18,
  segments = 80,
}: ArcsProps) {
  const arcPoints = useMemo(() => {
    return data.map((arc, index) => ({
      points: buildArcPoints(
        arc.startLat,
        arc.startLng,
        arc.endLat,
        arc.endLng,
        radius,
        segments,
      ),
      offset: index / data.length,
    }));
  }, [data, radius, segments]);

  return (
    <group>
      {arcPoints.map((arc, index) => (
        <AnimatedArc
          key={index}
          points={arc.points}
          color={color}
          opacity={opacity}
          speed={speed}
          trailLength={trailLength}
          offset={arc.offset}
        />
      ))}
    </group>
  );
}
