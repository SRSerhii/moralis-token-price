export default async function getprice(req, res) {
    const { address} = req.body;
    const chains = ["eth", "bsc", "polygon", "avalanche", "arbitrum", "base", "optimism", "linea"];
    let price = "N/A";

    const baseURL = "https://deep-index.moralis.io/api/v2.2/erc20/";
    const solanaURL = "https://solana-gateway.moralis.io/token/mainnet/";

    if (!address) {
        return res.status(400).json({ error: "Address is required" });
    }
    
    const headers = {
        "accept": "application/json",
        "X-API-Key": process.env.MORALIS_API_KEY,
        "Content-Type": "application/json",
    };

    try {
        if (address.startsWith("0x")) {
            for (let chain of chains) {
                const response = await fetch(`${baseURL}${encodeURIComponent(address)}/price?chain=${chain}`, { method: "get", headers: headers });
                const json = await response.json();
                if (json.usdPrice) {
                    price = json.usdPrice;
                    break;
                }
            }
        } else {
            //Solana address logic
            const response = await fetch(`${solanaURL}${address}/price`, { method: "get", headers: headers });
            const json = await response.json();
            price = json.usdPrice;
        }
    
        return res.status(200).json({ price });

    } catch (error) {
        console.error("Error fetching price:", error);
        return res.status(500).json({ error: "Failed to fetch price" });
    }




}