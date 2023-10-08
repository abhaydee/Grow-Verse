import { Billboard, Html, OrbitControls, Text } from '@react-three/drei'
import React, { useRef, useState } from 'react'
import './index.css'
import { MeshBasicMaterial } from 'three'
import { rewardTokens } from './blockchain/contractInteract'
import { Connex } from '@vechain/connex'

const Education = () => {
  const connex = new Connex({
    node : "https://vethor-node-test.vechaindev.com/", 
    network:"test"
  })
  const [focusIframe, setFocusIframe] = useState(false);

  /*async function setupConnex() { 
    const { Connex } = require("@vechain/connex"); 
    const connex = new Connex({ node: "https://vethor-node-test.vechaindev.com/", network: "test", }); 
    const createTokenMethod = connex.thor .account(contractAddress) .method(createTokenabi); 
    const tx = createTokenMethod.asClause("https://www.google.com"); 
    connex.vendor .sign("tx", [tx]) .request() .then((res: any) => { console.log(res); }); 
  }*/

  const handleFocusClick = async () => {
    // When the button is clicked, set the focusIframe state to true
    // const contract = connex.thor.account("0x02719a6B5EC98480cD57beDad6fd1F5a9E8AEE95");
    // const method  = contract.method(
    // {
    //   "inputs": [
    //     {
    //       "internalType": "address",
    //       "name": "account",
    //       "type": "address"
    //     },
    //     {
    //       "internalType": "uint256",
    //       "name": "amount",
    //       "type": "uint256"
    //     }
    //   ],
    //   "name": "rewardTokens",
    //   "outputs": [],
    //   "stateMutability": "nonpayable",
    //   "type": "function"
    // })

    // const signingService  = connex.vendor.sign("tx", [method.asClause("0xc888636228a82f0F59ABAe53B9850500d0ba1d41", "2000000000000")]);
    // const signedTx = await signingService.request();
    setFocusIframe(true);
    
  };

  const iframePosition = focusIframe ? [0, 0, 0] : [0, 1, 0];

  
  return (
    <group position={[-9,0,0]}  >

        {/* <mesh position={[0,1,0]} >
            <planeGeometry/>
            <meshBasicMaterial/>
        </mesh> */}

        {/* <Html castShadow receiveShadow occlude="blending" transform scale={0.1} position={[0,1,0]} >
          <iframe title="embed" width={700} height={500} src="https://threejs.org/" frameBorder={0} />
        </Html> */}
        {/* Button to focus */}
      {!focusIframe && (
        <Html  >
          <button onClick={handleFocusClick} className="focus-button">
            Click to Focus
          </button>

        </Html>
      )}

      {/* iframe */}
      <Html castShadow receiveShadow occlude="blending" transform scale={0.1} position={iframePosition} rotation={[0, Math.PI / 2.5, 0]} >
        <iframe title="embed" width={700} height={500} src="http://localhost:3001/" frameBorder={0} allowfullscreen />
      </Html>

        <mesh position={[-0.3,0.2,0.8]}  >
        <cylinderGeometry args={[0.05,0.05,0.6,8]} />
        <meshBasicMaterial color="brown" />
        </mesh>

        <mesh position={[0.3,0.2,-0.8]}  >
        <cylinderGeometry args={[0.05,0.05,0.6,8]} />
        <meshBasicMaterial color="brown" />
        </mesh>

        

    </group>
    

  )
}

export default Education
