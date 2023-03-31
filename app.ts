import { setIntervalAsync } from "set-interval-async";

import { Client } from "./archway/client.js";
import { getSingingClinet, Signer } from "./archway/signer.js";
import { config } from "./config.js";

import fetchBtcprirce from "./controller/btc.js";

const signer = await getSingingClinet(config.ownerMnemonic);
const owner = new Signer(signer, config.ownerAddress);
const client = new Client();
// console.log(owner);
// await owner.updateMinter();
// await owner.deposit(20000);

async function init() {
  await client.queryMinter();
  await owner.updateMinter();
  await client.queryMinter();
}
// await init();
async function deposit() {
  await owner.deposit(5000000);
  await client.query_lp_balance(owner.address);
}

// await deposit();

async function setting() {
  const price = await fetchBtcprirce();
  await owner.setting(price);
  await client.queryConfig();
}

setIntervalAsync(setting, 5000);
