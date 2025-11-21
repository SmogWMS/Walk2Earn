import { useState } from "react";

export default function Home(){
  const [steps, setSteps] = useState(0);
  const [address, setAddress] = useState<string | null>(null);

  async function connectWallet(){
    if ((window as any).ethereum) {
      const accs = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      setAddress(accs[0]);
    } else alert("Install MetaMask / Valora");
  }

  async function sendReport(){
    if(!address) return alert("connect");
    const stepsDelta = steps;
    const ts = Math.floor(Date.now() / 1000);
    const nonce = Math.floor(Math.random()*1e9);

    // Client must sign the packed hash
    const msgHash = ethers.utils.solidityKeccak256(
      ["address","uint256","uint256","uint256"],
      [address, stepsDelta, ts, nonce]
    );
    // ethers v6: signer.signMessage(arrayify(msgHash))
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    const sig = await signer.signMessage(ethers.utils.arrayify(msgHash));

    const res = await fetch(process.env.NEXT_PUBLIC_RELAYER_API || "/api/report", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ user: address, stepsDelta, ts, nonce, signature: sig })
    });
    const json = await res.json();
    alert(JSON.stringify(json));
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <img src="/logo/Walk2Earn-logo.png" alt="Walk2Earn" width={120}/>
      <h1 className="text-2xl font-bold">Walk2Earn</h1>
      <p>Address: {address ?? 'not connected'}</p>
      <p>Local steps: {steps}</p>
      <div className="mt-4">
        <button onClick={()=> setSteps(s=>s+100)} className="mr-2 px-4 py-2 bg-green-600 text-white rounded">+100 steps (mock)</button>
        <button onClick={connectWallet} className="mr-2 px-4 py-2 bg-blue-600 text-white rounded">Connect Wallet</button>
        <button onClick={sendReport} className="px-4 py-2 bg-indigo-600 text-white rounded">Send Report</button>
      </div>
    </main>
  );
}
