import {ethers} from 'ethers'
import { useEffect, useState } from 'react';
import './App.css';
import artifacts from "./artifacts/contracts/Token.sol/Token.json";
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

    return(
        <>
            <div className='container'>
                <div className='card'>
                    <h2 className='tokenname'>Jack Ronnie Token (Jr)</h2>
                </div>
            </div>
        </>
    );
}

export default App;
