export interface transactionResponse {
  logs: any;
  height: number;
  transactionHash: string;
  gasWanted: number;
  gasUsed: number;
}
