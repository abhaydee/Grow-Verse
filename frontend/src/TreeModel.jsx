import React, { useEffect, useRef, useState } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import './index.css'

export default function TreeModel(props) {
  const { Connex } = require("@vechain/connex");
  const { nodes, materials } = useGLTF("./models/tree.glb");
  const [growth, setGrowth] = useState(0.1); // Initialize growth state
  const plantRef = useRef();
  const [isFullyGrown, setIsFullyGrown] = useState(false); // Track if the tree is fully grown
  const [wateringCount, setWateringCount] = useState(0); // Track the number of times the tree is watered
  const [contractTreeLevel, setContractTreeLevel] = useState(0)
  // Function to make the plant grow
  const growPlant = () => {
    let connex = new Connex({
      node: "https://testnet.veblocks.net/",
      network: "test",
    });


    async function getBalance() {
      // Initialize the Connex contract and method
      const contract = connex.thor.account("0x0D5380D1AfF7a025920eC525c8A3d18e87738bA3");
      const method = contract.method({
        "inputs": [
          {
            "internalType": "address",
            "name": "treeOwner",
            "type": "address"
          }
        ],
        "name": "tokensAndLevelsOfTreeOwner",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      });
  
      // Call the contract method with the user's address
      const result = await method.call(props.userAddress); 
      // Replace userAddress with the actual address
      console.log("user in levels", result.decoded[0][result.decoded[0].length - 1])
      setContractTreeLevel(result.decoded[0][result.decoded[0].length - 1])
      // Display the balance in the console
      
    }
  
    
    getBalance();
  
    
  
    const contractABI = [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "levelUpTree",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];
  
  // Replace this with the actual contract address
  const contractAddress = "0x0D5380D1AfF7a025920eC525c8A3d18e87738bA3";
  const levelUpTree = async (value) => {
    try {
      // Get the contract instance
      const contract = connex.thor.account(contractAddress);
  
      // Create a method object for the mintTree function
      const method = contract.method({
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "levelUpTree",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      });

      const delegateUrl = 'https://sponsor-testnet.vechain.energy/by/280'
  
      // Call the mintTree function
      const signingService  = connex.vendor.sign("tx", [method.asClause(value)]);
      const signedTx = await signingService.delegate(delegateUrl).request(); // Replace userAddress with the actual address
  
      // Log a message indicating that the NFT tree has been minted
      console.log("NFT tree leveledup successfully!");
    } catch (error) {
      // Handle any errors that occur during the minting process
      console.error("Error minting NFT tree:", error);
    }
  };
    // Check if the plant has reached its max height (1.5 in this case)
    if (growth < 1.5) {
      // Increment the growth by a certain amount (you can adjust this)
      setGrowth(growth + 0.5);
      // Increment the watering count
      setWateringCount(wateringCount + 1);
    } else {
      // If fully grown, set the isFullyGrown state to true
      setIsFullyGrown(true);

      const treeVal = localStorage.getItem("userValues");
      levelUpTree(contractTreeLevel)
      console.log("val val; ", treeVal)
    }
  };

  useEffect(()=>{
      localStorage.setItem("userValues", JSON.stringify({
        userAddress : props.userAddress,
        treelevel : wateringCount
      }))
  }, [growth])

  useFrame(() => {
    // Scale the plant based on the growth state
    plantRef.current.scale.x = growth;
    plantRef.current.scale.y = growth;
    plantRef.current.scale.z = growth;
  });
  
  return (
    <group position={props} onClick={growPlant} ref={plantRef} {...props} dispose={null}>
      <group scale={0.005}>
        <mesh
          geometry={nodes.Mobile_Tree_2_Tree_Trunk_0.geometry}
          material={materials.Tree_Trunk}
        />
        <mesh
          geometry={nodes.Mobile_Tree_2_Tree_Leaf_0.geometry}
          material={materials.Tree_Leaf}
        />
      </group>
      {/* Conditionally render HTML content */}
      {isFullyGrown ? (
        <Html
          position={[0, 2, 0]}
          wrapperClass="label"
        >
          Your tree is fully grown🌳<br/>
          And is ready to be planted in the real world
        </Html>
      ) : (
        <Html
          position={[0, 2, 0]}
          wrapperClass="label"
        >
          💦 Click on the tree to water
          <br />
          Plant Level {wateringCount} 
        </Html>
      )}
    </group>
  );
}

useGLTF.preload("./models/tree.glb");
