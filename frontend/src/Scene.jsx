

import {
  Environment,
  Html,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useEffect, useState, useRef } from "react";
import { Car } from "./Car";
import { useFrame, useThree } from "@react-three/fiber";
import { Ground } from "./Ground";
import { Track } from "./Track";
import { useMemo } from "react";
import { Coin } from "./Coin";
import "./index.css";
import { Perf } from "r3f-perf";
import Nature from "./Nature";
import { useCarPosition } from "./CarPositionContext";
import Plant from "./Plant";
import * as THREE from "three";
import TreeModel from "./TreeModel";
import Education from "./Education";


export function Scene({ userAddress }) {
  const { Connex } = require("@vechain/connex");
  const [thirdPerson, setThirdPerson] = useState(false);
  const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);
  const [points, setPoints] = useState(0); // Initialize points state
  const [coins, setCoins] = useState([]);
  const [isBPressed, setIsBPressed] = useState(false);
  const [collectedEnoughCoins, setCollectedEnoughCoins] = useState(false);

  console.log("shert user add", userAddress);

  let connex = new Connex({
    node: "https://testnet.veblocks.net/",
    network: "test",
  });

  

  const contractABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "mintTree",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

// Replace this with the actual contract address
const contractAddress = "0x0D5380D1AfF7a025920eC525c8A3d18e87738bA3";
const mintNFTTree = async () => {
  try {
    // Get the contract instance
    const contract = connex.thor.account(contractAddress);

    // Create a method object for the mintTree function
    const method = contract.method({
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
      ],
      name: "mintTree",
      outputs: [],
      stateMutability: "nonpayable",
    });
    const delegateUrl = 'https://sponsor-testnet.vechain.energy/by/280'
    // Call the mintTree function
    const signingService  = connex.vendor.sign("tx", [method.asClause(userAddress)]);
    const signedTx = await signingService.delegate(delegateUrl).request(); // Replace userAddress with the actual address

    // Log a message indicating that the NFT tree has been minted
    console.log("NFT tree minted successfully!");
  } catch (error) {
    // Handle any errors that occur during the minting process
    console.error("Error minting NFT tree:", error);
  }
};

  // Function to generate coin positions in a circular pattern
  const generateCircularCoinPositions = () => {
    const numCoins = 20; // Adjust the number of coins as needed
    const circleRadius = 5; // Radius of the circular pattern

    const coinPositions = [];

    for (let i = 0; i < numCoins; i++) {
      const angle = (i / numCoins) * Math.PI * 2; // Distribute coins evenly around the circle
      const x = circleRadius * Math.cos(angle);
      const z = circleRadius * Math.sin(angle);
      const y = 0.01; // Adjust the height of the coins as needed

      coinPositions.push([x, y, z]);
    }

    return coinPositions;
  };

  // Generate coin positions in a circular pattern when the component mounts
  useMemo(() => {
    const newCoins = generateCircularCoinPositions();
    setCoins(newCoins);
  }, []);

  // Function to handle picking up a coin
  const handlePickup = (index) => {
    // Update the points and remove the picked-up coin
    setPoints(points + 0.1);
    const updatedCoins = [...coins];
    updatedCoins.splice(index, 1);
    setCoins(updatedCoins);
    // console.log("inside function")
    // Check if the player has collected enough coins
    if (points >= 2){
      setCollectedEnoughCoins(true)
    }
  };

  useEffect(() => {
    function keydownHandler(e) {
      if (e.key === "k") {
        // random is necessary to trigger a state change
        if (thirdPerson)
          setCameraPosition([-6, 4.9, 6.21 + Math.random() * 0.01]);
        setThirdPerson(!thirdPerson);
      }
    }

    window.addEventListener("keydown", keydownHandler);
    return () => window.removeEventListener("keydown", keydownHandler);
  }, [thirdPerson]);

  // Add an event listener to detect 'b' key press
  useEffect(() => {
    function  handleKeyPress(event) {
      if (event.key === "b" && collectedEnoughCoins) {
        
        mintNFTTree();
         setIsBPressed(true)
      } else if (event.key === "b" && !collectedEnoughCoins) {
        alert("Go Finish the modules and come back");
      }
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [collectedEnoughCoins]);

  



  useEffect(() => {
    async function getBalance() {
      // Initialize the Connex contract and method
      const contract = connex.thor.account("0x0D5380D1AfF7a025920eC525c8A3d18e87738bA3");
      const method = contract.method({
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "balanceOfTokens", // Make sure this is the correct method name
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      });
  
      // Call the contract method with the user's address
      const result = await method.call(userAddress); // Replace userAddress with the actual address
  
      // Display the balance in the console
      const balance = result.decoded[0];
      const rbalance = balance/1000000000000
      console.log("balance", rbalance)
      setPoints(rbalance)
    }
  
    if (userAddress === "0xc888636228a82f0f59abae53b9850500d0ba1d41") {
      getBalance();
    }
  }, [userAddress]);
  
  

  return (
    <Suspense fallback={null}>
      <Perf />
      <Environment
        files={process.env.PUBLIC_URL + "/textures/envmap.hdr"}
        background={"both"}
      />

      <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
      {!thirdPerson && <OrbitControls target={[-2.64, -0.71, 0.03]} />}

      <Ground />
      <Track />
      <Nature />
      <Education />

      <Car thirdPerson={thirdPerson} />

      <Html>
        <div className="points-display">Coins: {points}</div>
      </Html>

      {coins.map((position, index) => (
        <Coin
          key={index}
          position={position}
          onPickup={() => handlePickup(index)}
          // Pass the car ref to the Coin component
        />
      ))}

      {isBPressed && <TreeModel position={[3, 0, 3]} userAddress={userAddress} />}
    </Suspense>
  );
}
