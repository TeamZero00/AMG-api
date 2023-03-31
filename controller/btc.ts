import axios from "axios";

const fetchBtcprirce = async (): Promise<string> => {
  const { data } = await axios.get(
    "https://api.binance.com/api/v3/ticker/price",
    {
      params: {
        symbol: "BTCUSDT",
      },
    }
  );

  return data.price;
};

export default fetchBtcprirce;
