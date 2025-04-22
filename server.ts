import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { ethers } from "ethers";
dotenv.config();

const privateKey = process.env.PRIVATE_KEY;
const rpcUrl = process.env.RPC_URL;

const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const wallet = new ethers.Wallet(privateKey!, provider);

const app = express();
app.use(express.json());

const port = 1337;

app.post("/cosign", (req: Request, res: Response) => {
  const hash = req.body.cosignerHash;

  const signature = ethers.utils.joinSignature(
    wallet._signingKey().signDigest(hash),
  );
  res.send(signature);
});

app.listen(port, () => {
  console.log(`OX Cosigner listening on port ${port}`);
});
