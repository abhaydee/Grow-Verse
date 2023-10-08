import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three'
import { Vector3 } from "three";

import { useCarPosition } from './CarPositionContext';

export function Coin({ position, onPickup }) {
  const coinRadius = 0.1; // Adjust the size of the coin as needed
  const coinRef = useRef();
  const { carPosition } = useCarPosition();


useFrame(() => {
    if (!coinRef.current) return;
    

    const coin = coinRef.current;
    const coinPosition = new Vector3(position[0], position[1], position[2]);

    // Calculate the distance between the car and the coin using the context
    const distance = Math.sqrt(
      Math.pow(carPosition.x - coinPosition.x, 2) +
      Math.pow(carPosition.y - coinPosition.y, 2) +
      Math.pow(carPosition.z - coinPosition.z, 2)
    );
    

    const pickupThreshold = 0.5;

    if (distance < pickupThreshold) {
        // console.log("inside if loop")
      onPickup();
      coin.visible = false;
    }
  });

  return (
    <Sphere
      args={[coinRadius, 32, 32]}
      position={position}
      ref={coinRef}
      onClick ={onPickup}
    >
      <meshBasicMaterial attach="material" color="gold" />
    </Sphere>
  );
}






