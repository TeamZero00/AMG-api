import dotenv from "dotenv";

dotenv.config();

export const config = {
  ownerMnemonic: process.env.OWNER_MNEMONIC || "",
  ownerAddress: process.env.OWNER_ADDRESS || "",
  playerMnemonic: process.env.PLAYER_MNEMONIC || "",
  playerAddress: process.env.PLAYER_ADDRESS || "",
  owner2Mnemonic: process.env.OWNER2_MNEMONIC || "",
  owner2Address: process.env.OWNER2_ADDRESS || "",
  fxContract:
    "archway1zadyympxahdy6upzm9td8jsqg3dakl4nn3aqq30x32uyt3fus9nq2wasf4",
  lpContract:
    "archway1lp54ruawagkdz6hg7g7vqdhzajfldhf6usvpqvl8vl60j5rdkdgs6406mg",
};
