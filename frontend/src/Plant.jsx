
// import React, { useRef } from "react";
// import { useThree } from "@react-three/fiber";
// import { useFrame } from "@react-three/fiber";

// const Plant = ({position }) => {
  

//   return (
//     <mesh position={position} >
//       <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
//       <meshBasicMaterial color={0x8B4513 } />
//     </mesh>
//   );
// };

// export default Plant;

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

const Plant = ({ position }) => {
  const [growth, setGrowth] = useState(1); // Initialize growth state
  const plantRef = useRef();

  // Function to make the plant grow
  const growPlant = () => {
    // Check if the plant has reached its max height (5 in this case)
    if (growth < 5) {
      // Increment the growth by a certain amount (you can adjust this)
      setGrowth(growth + 0.5);
    }
  };

  useFrame(() => {
    // Scale the plant based on the growth state
    plantRef.current.scale.y = growth;
  });

  return (
    <mesh position={position} onClick={growPlant} ref={plantRef}>
      <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
      <meshBasicMaterial color={0x8B4513} />
    </mesh>
  );
};

export default Plant;
