import { ethers } from "ethers";
import { useEffect, useState } from "react";
import "./App.css";
import artifacts from "./artifacts/contracts/Token.sol/Token.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

// ❗ provider ko yaha define mat karo — inside function banayenge
// const provider = new ethers.BrowserProvider(window.ethereum);

const abi = artifacts.abi;
const contractaddress = "0xFc91B62e9c04EC33e88e2FC663C3C2FFb12b94bB";

function App() {
  const [signer, setSigner] = useState("");
  const [contract, setContract] = useState("");
  const [status, setStatus] = useState("");
  const [reciver, setReciver] = useState("");
  const [payableamount, setPayableamount] = useState("");
  const [bal, setBal] = useState("");
  const [useraddress, setUseraddress] = useState("");

  // async function getwallet() {
  //     try{
  //         if(!window.ethereum){
  //             alert("MetaMask install kar bhai");
  //             return;
  //         }
  //         await window.ethereum.request({
  //             method: "eth_requestAccounts",
  //         });

  //         const dummmysigner = await provider.getSigner();
  //         console.log("Deploying with address:", dummmysigner.address);
  //         setSigner(dummmysigner);
  //         setUseraddress(dummmysigner.address);
  //         const dummycontract = new ethers.Contract(contractaddress,abi,signer);
  //         setContract(dummycontract);
  //         setStatus("Wallet connected ✅");
  //     }catch(err){
  //         console.error(err);
  //     }
  // }

  async function getwallet() {

    try {

      if (!window.ethereum) {
        alert("MetaMask install kar bhai");
        return;
      }

      await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // ✅ provider inside function
      const provider =
        new ethers.BrowserProvider(window.ethereum);

      const signer =
        await provider.getSigner();

      const address =
        await signer.getAddress();

      setSigner(signer);
      setUseraddress(address);

      const contract =
        new ethers.Contract(
          contractaddress,
          abi,
          signer
        );

      setContract(contract);

      setStatus("Wallet connected ✅");

      console.log("Connected:", address);

    } catch (err) {

      console.error(err);

    }

  }

  async function Transfer() {

    try{

        if(!contract){
          alert("Wallet connect kar pehle");
          return;
        }

        const tx = await contract.transfer(
            reciver,
            ethers.parseUnits(payableamount, 18)
        );

        await tx.wait();

        alert("Transfer successful 🚀");

    }catch(err){
        console.error(err);
    }

}

  async function Balancecheck() {

    try{

        if(!contract){
          alert("Wallet connect kar pehle");
          return;
        }

        const balance =
          await contract.balanceOf(useraddress);

        const formattedBalance =
          ethers.formatUnits(balance, 18);

        setBal(formattedBalance);

        console.log("Balance:", formattedBalance);

    }catch(err){
        console.error(err);
    }

}

  return (
    <div className="cafe-wrapper">
      <div className="latte-card">
        {/* Top Section: Shop/Token Logo */}
        <header className="cafe-header">
          <div className="token-logo-warm">JR</div>
          <div className="header-text">
            <h2>Jack Ronnie's Brew</h2>
            <p>Freshly Minted Tokens</p>
          </div>
        </header>

        {/* Wallet Connection */}
        <div className="connection-bar">
          <span className="status-dot"></span>
          <button onClick={getwallet} className="connect-link">
            Connect Your Wallet
          </button>
        </div>

        {/* Balance Section: Menu Style */}
        <section className="menu-section">
          <div className="balance-box">
            <span className="label-cafe">Your JR Balance</span>

            {/* ✅ Balance display fixed */}
            <h1 className="amount-cafe">
              {bal} JR
            </h1>

            <button onClick={Balancecheck} className="refresh-icon-btn">
              ↻ Check Balance
            </button>
          </div>
        </section>

        {/* Transfer Form: Order Style */}
        <section className="order-section">
          <h3 className="section-title">Transfer JR</h3>

          <div className="input-field">
            <label>Recipient's Address</label>

            {/* ✅ onChange added */}
            <input
              type="text"
              placeholder="Paste address here..."
              onChange={(e)=>setReciver(e.target.value)}
            />

          </div>

          <div className="input-field">
            <label>Amount to Send</label>
            <div className="amount-wrapper">

              {/* ✅ onChange added */}
              <input
                type="number"
                placeholder="0.00"
                onChange={(e)=>setPayableamount(e.target.value)}
              />

              <span className="jr-tag">JR</span>

            </div>
          </div>

          <button onClick={Transfer} className="btn-brew">
            Confirm Transfer
          </button>

        </section>

        {/* Small Quote or Footer */}
        <footer className="cafe-footer">
          <p>“Decentralized, just like your favorite coffee blend.”</p>
        </footer>
      </div>
    </div>
  );
}

export default App;