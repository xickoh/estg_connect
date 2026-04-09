import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";

import React from "react";

const DEFAULT_DOT_COLOR = "#FFF"

const centerVector = new THREE.Vector3(0, 0, 0);
const tempObject = new THREE.Object3D();

const mapImage: string = "/assets/images/map.png";

const getUvFromSpherePoint = (
  point: THREE.Vector3,
): THREE.Vector2 => {
  const direction = new THREE.Vector3()
    .subVectors(centerVector, point)
    .normalize();

  const { x, y, z } = direction;

  const u = 1 - (0.5 + Math.atan2(z, x) / (2 * Math.PI));
  const v = 0.5 + Math.asin(y) / Math.PI;

  return new THREE.Vector2(u, v);
};

const getAlpha = (
  uv: THREE.Vector2,
  imageData: ImageData,
): number => {
  const { width, height, data } = imageData;
  const px = Math.min(width - 1, Math.max(0, Math.floor(uv.x * width)));
  const py = Math.min(
    height - 1,
    Math.max(0, Math.floor(uv.y * height)),
  );

  const index = 4 * (px + py * width);

  return data[index + 3];
};

const getImageData = (imageEl: HTMLImageElement): ImageData => {
  const canvas = document.createElement("canvas");
  canvas.width = imageEl.width;
  canvas.height = imageEl.height;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Could not get canvas context");
  }

  context.drawImage(imageEl, 0, 0);

  return context.getImageData(0, 0, canvas.width, canvas.height);
};

interface DotsProps {
  count?: number;
  radius?: number;
  dotRadius?: number;
  dotColor?: string
}

export function Dots({
  count = 20000,
  radius = 6.2,
  dotRadius = 0.04,
  dotColor = DEFAULT_DOT_COLOR
}: DotsProps) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const mapElement = useLoader(THREE.ImageLoader, mapImage);

  useEffect(() => {
    if (!ref.current) return;

    const imageData = getImageData(mapElement as HTMLImageElement);
    let visibleCount = 0;

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const position = new THREE.Vector3().setFromSphericalCoords(
        radius,
        phi,
        theta,
      );

      const alpha = getAlpha(getUvFromSpherePoint(position), imageData);

      if (alpha > 0) {
        tempObject.position.copy(position);
        tempObject.lookAt(centerVector);
        tempObject.updateMatrix();

        ref.current.setMatrixAt(visibleCount, tempObject.matrix);
        visibleCount++;
      }
    }

    ref.current.count = visibleCount;
    ref.current.instanceMatrix.needsUpdate = true;
  }, [count, mapElement, radius]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <circleGeometry args={[dotRadius, 6]} />
      <meshBasicMaterial side={THREE.DoubleSide} color={dotColor} toneMapped={false} />
    </instancedMesh>
  );
}