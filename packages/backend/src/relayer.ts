import { Router } from "express";
import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const relayer = new ethers.Wallet(process.env.RELAYER_PRIVATE_KEY || "", provider);

const stepsAddr = process.env.STEPS_CONTRACT || "";
const stepsAbi = [
  "function addPoints(address user, uint256 added) external",
  "function addPointsBatch(address[] calldata users, uint256[] calldata adds) external"
];
const steps = new ethers.Contract(stepsAddr, stepsAbi, relayer);

const seen = new Set<string>();

router.post("/report", async (req, res) => {
  try {
    const { user, stepsDelta, ts, nonce, signature } = req.body;
    if (!user || !stepsDelta || !signature) return res.status(400).json({ error: "bad payload" });

    // message hash must match client
    const packed = ethers.solidityPackedKeccak256(
      ["address", "uint256", "uint256", "uint256"],
      [user, stepsDelta.toString(), ts.toString(), nonce.toString()]
    );

    // recover
    const recovered = ethers.recoverAddress(packed, signature);
    if (recovered.toLowerCase() !== user.toLowerCase()) return res.status(400).json({ error: "invalid signature" });

    const key = `${user}:${nonce}`;
    if (seen.has(key)) return res.status(400).json({ error: "replay" });
    seen.add(key);

    // call on-chain
    const tx = await steps.addPoints(user, stepsDelta);
    await tx.wait();

    return res.json({ ok: true, tx: tx.hash });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
});

export default router;
