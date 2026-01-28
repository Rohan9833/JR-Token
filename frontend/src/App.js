import {ethers} from 'ethers'
import { useEffect, useState } from 'react';
import './App.css';
import artifacts from "./artifacts/contracts/Token.sol/Token.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
const provider = new ethers.BrowserProvider(window.ethereum);
const abi = artifacts.abi;
const contractaddress = "0xDE4C532C009E2BD44D412D68BD9482E142b2527D";



function App() {
    const [signer,setSigner]= useState("");
    const [contract,setContract]= useState("");
    const [status,setStatus] = useState("");
    const[reciver,setReciver]=useState("");
    const[payableamount,setPayableamount] = useState("");
    const[balacc,setBalacc] = useState("");


    async function getwallet() {
        try{
            if(!window.ethereum){
                alert("MetaMask install kar bhai");
                return;
            }
            await window.ethereum.request({
                method: "eth_requestAccounts",
            });


            const dummmysigner = await provider.getSigner();
            console.log("Deploying with address:", dummmysigner.address);
            setSigner(dummmysigner);
            const dummycontract = new ethers.Contract(contractaddress,abi,signer);
            setContract(dummycontract);
            setStatus("Wallet connected ✅");
        }catch(err){
            console.error(err);
        }
    }

    async function Transfer() {
        await contract.transfer(reciver,payableamount);
    }

    async function Balancecheck() {
        await contract.balanceOf(balacc);
    }

    return (
        <div className="app-container">
            <div className="card">
            {/* Header */}
            <div className="header">
                <h2>Jack Ronnie Token (JR)</h2>
                <button className="btn connect-btn">
                <i className="fa-solid fa-wallet"></i> Connect Wallet
                </button>
            </div>

            {/* Wallet Status */}
            <p className="wallet-status">
                Wallet Connected: <span>0xABC...1234</span> ✅
            </p>

            {/* Balance Card */}
            <div className="balance-card">
                <div className="token-icon">JR</div>
                <div>
                <p className="label">JR Token Balance:</p>
                <h1>100.00 JR</h1>
                <p className="sub-text">(Total supply: 100 JR)</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="tabs">
                <button className="tab active">Transfer Tokens</button>
                <button className="tab">Check Balance</button>
            </div>

            {/* Transfer Section */}
            <div className="section">
                <label>Recipient Address:</label>
                <div className="input-group">
                <input type="text" placeholder="Enter recipient address" />
                <button className="max-btn">Max</button>
                </div>

                <label>Amount:</label>
                <input type="number" placeholder="Enter amount" />

                <p className="available">Available Balance: 100.00 JR</p>

                <button className="btn send-btn">Send Tokens</button>
            </div>

            {/* Check Balance */}
            <div className="section">
                <h3>Check Balance</h3>
                <input type="text" placeholder="Enter address to check balance" />
                <button className="btn check-btn">Check Balance</button>
            </div>

            {/* Status */}
            <p className="status error">
                Status: Wallet not connected ❌
            </p>
            </div>
        </div>
    );

}

export default App;
