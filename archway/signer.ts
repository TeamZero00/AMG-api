import { SigningArchwayClient } from "@archwayhq/arch3.js";
import { coin, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { GasPrice } from "@cosmjs/stargate";
import { config } from "../config.js";
import { network } from "./network.js";

export async function getSingingClinet(mnemonic: string) {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: network.prefix,
  });

  // const gasPrice = new GasPrice(Decimal.fromAtomics("10000", 0), "uconst");
  const gasPrice = GasPrice.fromString("0.01uconst");

  const singingClinet = await SigningArchwayClient.connectWithSigner(
    network.endpoint,
    wallet,
    {
      gasPrice,
      prefix: network.prefix,
    }
  );
  return singingClinet;
}

// export const signerClienr = await getSigner(config.mnemonic);
export class Signer {
  lpcontract: string;
  fxContract: string;
  address: string;
  signer: SigningArchwayClient;

  constructor(signer: SigningArchwayClient, address: string) {
    this.lpcontract = config.lpContract;
    this.fxContract = config.fxContract;

    this.address = address;
    this.signer = signer;
  }

  async updateMinter() {
    try {
      console.log("Update minter!!");
      const msg = {
        update_minter: {
          new_minter: this.fxContract,
        },
      };
      const result = await this.signer.execute(
        this.address,
        this.lpcontract,
        msg,
        "auto"
      );
      console.log(result);
      //   console.log(transactionHash);
    } catch (err) {
      console.log(err);
    }
  }

  async addAdmin(address: String) {
    try {
      console.log("Add Admin");
      const msg = {
        add_admin: {
          address,
        },
      };
      const result = await this.signer.execute(
        this.address,
        this.fxContract,
        msg,
        "auto"
      );
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }
  async setting(price: string) {
    try {
      // console.log(`Setting is ${this.address}`);
      const msg = {
        setting: {
          price,
        },
      };

      const result = await this.signer.execute(
        this.address,
        this.fxContract,
        msg,
        "auto"
      );
      console.log(result.height);

      return result;
    } catch (err) {
      // console.log(`error is ${err}/ price is ${price}`);
      console.log(err);
    }
  }

  async deposit(amount: number) {
    try {
      const msg = {
        deposit: {},
      };
      const result = await this.signer.execute(
        this.address,
        this.fxContract,
        msg,
        "auto",
        undefined,
        [
          {
            denom: "uconst",
            amount: amount.toString(),
          },
        ]
      );

      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }

  async increaseAllowance(amount: string, expires: number) {
    try {
      const msg = {
        increase_allowance: {
          spender: this.fxContract,
          amount,
          expires: {
            at_height: expires,
          },
        },
      };
      const result = await this.signer.execute(
        this.address,
        this.lpcontract,
        msg,
        "auto"
      );

      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }
  async decreaseAllowance(amount: string, expires: number) {
    try {
      const msg = {
        decrease_allowance: {
          spender: this.fxContract,
          amount,
          expires: {
            at_height: expires,
          },
        },
      };
      const result = await this.signer.execute(
        this.address,
        this.lpcontract,
        msg,
        "auto"
      );

      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }
  async withdraw() {
    try {
      const msg = {
        withdraw: {},
      };
      const result = await this.signer.execute(
        this.address,
        this.fxContract,
        msg,
        "auto"
      );

      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }

  async betting(position: string, duration: number, amount: number) {
    try {
      const msg = {
        betting: {
          position,
          duration,
        },
      };
      const result = await this.signer.execute(
        this.address,
        this.fxContract,
        msg,
        "auto",
        undefined,
        [
          {
            amount: amount.toString(),
            denom: "uconst",
          },
        ]
      );

      console.log(result);
    } catch (err) {
      console.log("betting failed");
      console.error(err);
    }
  }
}
