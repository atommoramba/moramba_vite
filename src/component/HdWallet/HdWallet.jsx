import { useState } from "react";
import { Buffer } from "buffer";
import "../HdWallet/HdWallet.css";
import { ethers } from "ethers";
import * as bip39 from "bip39";

window.Buffer = Buffer; // Ensure Buffer is globally available

function HdWallet() {
  const [keys, setKeys] = useState([]);
  const [mnemonic, setMnemonic] = useState("");
  const [masterPrivateKey, setMasterPrivateKey] = useState("");
  const [masterPublicKey, setMasterPublicKey] = useState("");
  const [masterAddress, setMasterAddress] = useState("");

  const generateKeys = async () => {
    try {
      // Generate mnemonic
      const newMnemonic = bip39.generateMnemonic();
      setMnemonic(newMnemonic);
  
      // Create seed from mnemonic
      const seed = bip39.mnemonicToSeedSync(newMnemonic);
  
      // Create master HD node (Ethers v6)
      const masterNode = ethers.HDNodeWallet.fromSeed(seed);
      console.log("Master Node:", masterNode);
  
      // Set master keys
      setMasterPrivateKey(masterNode.privateKey);
      setMasterPublicKey(masterNode.publicKey);
      setMasterAddress(masterNode.address);
  
      const derivedKeys = [];
  
      // Derive child keys using the master node
      for (let i = 0; i < 5; i++) {
        const path = `m/44'/60'/0'/0/${i}`;
        
        // Derive the child node using the correct method
        const childNode = masterNode.derivePath(path); // Correct method in Ethers v6
        
        console.log(`Child Node ${i + 1}:`, childNode);
  
        derivedKeys.push({
          index: i + 1,
          privateKey: childNode.privateKey,
          publicKey: childNode.publicKey,
          address: childNode.address,
        });
      }
  
      console.log("Derived Keys:", derivedKeys);
      setKeys(derivedKeys);
    } catch (error) {
      console.error("Error generating keys:", error);
    }
  };
  

  return (
    <div className="hd-wallet p-3">
      <div className="max-w-6xl mx-auto">
        <div className="hd-wallet-row-1">
          <h1 className="text-3xl font-bold text-center mb-6">
            HD Wallet Key Generator
          </h1>

          <div className="text-center mb-6">
            <button
              onClick={generateKeys}
              className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
            >
              Generate Keys
            </button>
          </div>
        </div>

        {/* <br /> */}
        <center>
          {/* {mnemonic && (
            <div className="space-y-4 mb-6">
              <div className="break-all">
                <span className="fw-bold">Mnemonic:</span> {mnemonic}
              </div>
              <div className="break-all">
                <span className="fw-bold">Master PrivateKey:</span>{" "}
                {masterPrivateKey}
              </div>
              <div className="break-all">
                <span className="fw-bold">Master PublicKey:</span>{" "}
                {masterPublicKey}
              </div>
              <div className="break-all">
                <span className="fw-bold">Master Address:</span> {masterAddress}
              </div>
            </div>
          )} */}
          <br />
          <br />

          {mnemonic && (
            <table>
              <tr>
                <td className="fw-bold">Mnemonic:</td>
                <td>{mnemonic}</td>
              </tr>
              <tr>
                <td className="fw-bold">Master PrivateKey:</td>
                <td>{masterPrivateKey}</td>
              </tr>
              <tr>
                <td className="fw-bold">Master PublicKey:</td>
                <td>{masterPublicKey}</td>
              </tr>
              <tr>
                <td className="fw-bold">Master Address:</td>
                <td>{masterAddress}</td>
              </tr>
            </table>
          )}
          <br />
          {keys.length > 0 && (
  <div className="overflow-x-auto ">
    <div className="hd-wallet-table">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="hd-wallet-index-number border border-gray-300 p-2">
              No.
            </th>
            <th className="border border-gray-300 p-2">Private Key</th>
            <th className="border border-gray-300 p-2">Public Key</th>
            <th className="border border-gray-300 p-2">Address</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((key) => (
            <tr key={key.index}>
              <td className="hd-wallet-index-number border border-gray-300 p-2 text-center">
                {key.index}
              </td>
              <td className="border border-gray-300 p-2 break-all font-mono text-sm">
                {key.privateKey}
              </td>
              <td className="border border-gray-300 p-2 break-all font-mono text-sm">
                {key.publicKey}
              </td>
              <td className="border border-gray-300 p-2 break-all font-mono text-sm">
                {key.address}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

        </center>
      </div>
    </div>
  );
}

export default HdWallet;
