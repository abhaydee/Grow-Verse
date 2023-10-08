// import { Routes, Route } from 'react-router-dom';
// import Home from './Home';

// import PlayMe from './PlayMe';
// import Buy from './Buy';
// import Select from './Select';

// const App = () => {
//  return (
//     <>
//        <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/buy" element={<Buy />} />
//           <Route path="/play-me" element={<PlayMe />} />
//           <Route path="/import" element={<Select />} />
//        </Routes>
//     </>
//  );
// };

// export default App;

// App.js
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import PlayMe from "./PlayMe";
import Buy from "./Buy";
import Select from "./Select";
import Connex from "@vechain/connex";
const App = () => {
  const [importedData, setImportedData] = useState(null);
  

  // Callback function to receive imported data from Select
  const handleImportedData = (data) => {
    console.log("not yet");
    setImportedData(data);
    console.log("setImportedData", data);
  };

  const [userAddress, setUserAddress] = useState("");
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    let connex = new Connex({
      node: "https://testnet.veblocks.net/",
      network: "test",
    });

    try {
      const wallet = await connex.vendor
        .sign("cert", {
          purpose: "identification",
          payload: {
            type: "text",
            content: "please sign this certificate to log in",
          },
        })
        .request();

      if (wallet && wallet.annex) {
        console.log("the wallet", wallet);
        setUserAddress(wallet.annex.signer);
        setConnected(true);
      } else {
        // Handle the case where the wallet object is not as expected
        console.error("Wallet object is not as expected:", wallet);
      }
    } catch (error) {
      // Handle any errors that occur during the wallet connection process
      console.error("Error connecting wallet:", error);
    }
  };

  useEffect(() => {
    console.log("the user address", userAddress);
  }, []);
  //  const userAddress = response.annex.signer;

  return (
    <>
      {!connected && <button onClick={connectWallet}>Connect</button>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy />} />

        {/* Pass imported data to PlayMe */}
        <Route
          path="/play-me"
          element={<PlayMe importedData={importedData} userAddress={userAddress}/>}
        />

        {/* Render Select component and provide the callback */}
        <Route
          path="/import"
          element={<Select onFileUpload={handleImportedData} />}
        />
      </Routes>
    </>
  );
};

export default App;
