import { config } from "../config.js";
import { ArchwayClient } from "@archwayhq/arch3.js";

async function getClient() {
  const client = await ArchwayClient.connect(
    "https://rpc.constantine-1.archway.tech"
  );

  return client;
}

const queryClient = await getClient();

export class Client {
  lpcontract: string;
  fxContract: string;
  client: ArchwayClient;
  constructor() {
    this.lpcontract = config.lpContract;
    this.fxContract = config.fxContract;
    this.client = queryClient;
  }
  async queryHeight() {
    const height = await this.client.getHeight();

    return height;
  }
  //======lp==========
  async queryMinter() {
    try {
      console.log("query minter!");
      const msg = {
        minter: {},
      };

      const result = await this.client.queryContractSmart(this.lpcontract, msg);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  async query_lp_balance(address: String) {
    try {
      console.log("Query Latest Price");
      const msg = {
        balance: { address: address },
      };
      const result = await this.client.queryContractSmart(this.lpcontract, msg);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  async query_lp_allowance(owner: string) {
    try {
      console.log("Query Latest Price");
      const msg = {
        allowance: { owner: owner, spender: this.fxContract },
      };
      const result = await this.client.queryContractSmart(this.lpcontract, msg);

      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
  //============fx==================
  async queryPool() {
    try {
      console.log("Query Pool");
      const msg = {
        get_pool: {},
      };
      const result = await this.client.queryContractSmart(this.fxContract, msg);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  async queryConfig() {
    try {
      const msg = {
        config: {},
      };
      const result = await this.client.queryContractSmart(this.fxContract, msg);
      console.log(`state = ${result}`);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }
  async queryRoundPrice(height: number) {
    try {
      console.log("query price!");
      const msg = {
        get_round_price: { height: height },
      };
      const price = await this.client.queryContractSmart(this.fxContract, msg);
      console.log(price);
      return price;
    } catch (err) {
      console.log(err);
    }
  }
  async queryLatestPrice() {
    try {
      console.log("Query Latest Price");
      const msg = {
        get_lastest_price: {},
      };
      const result = await this.client.queryContractSmart(this.fxContract, msg);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
}
