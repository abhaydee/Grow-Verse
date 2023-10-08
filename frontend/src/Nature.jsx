import { useGLTF } from "@react-three/drei";

export default function Nature() {
    const nature = useGLTF('./models/apple.glb')

    return <primitive object={nature.scene} position={[-2,-1,-1]} />
}

useGLTF.preload('./models/nature.glb')