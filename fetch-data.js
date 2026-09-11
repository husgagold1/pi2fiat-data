const fs = require('fs');

async function updateData() {
    try {
        console.log("MELANDIX Engine waking up (Keyless Mode)...");

        // 1. FETCH FIAT RATES (Free Public API)
        let fiatRates = {};
        try {
            const openRes = await fetch('https://open.er-api.com/v6/latest/USD');
            const openData = await openRes.json();
            fiatRates = openData.rates;
            console.log("Fiat rates fetched successfully.");
        } catch (err) {
            console.error("Fiat fetch failed:", err.message);
        }

        // 2. FETCH BINANCE CRYPTO BENCHMARKS (Public Endpoint)
        let cryptoBenchmarks = {};
        try {
            const binanceRes = await fetch('https://api.binance.com/api/v3/ticker/price?symbols=["BTCUSDT","ETHUSDT"]');
            const binanceData = await binanceRes.json();
            
            binanceData.forEach(item => {
                cryptoBenchmarks[item.symbol] = parseFloat(item.price).toFixed(2);
            });
            console.log("Crypto benchmarks fetched successfully.");
        } catch (err) {
            console.warn("Binance fetch issue:", err.message);
            cryptoBenchmarks = { BTCUSDT: "0.00", ETHUSDT: "0.00" };
        }
        
    // 3. FETCH LIVE NEWS INTELLIGENCE
async function fetchLiveNews() {
    try {
        console.log("Fetching live intel from APIs...");
        
        const cryptoRes = await fetch("https://min-api.cryptocompare.com/data/v2/news/?lang=EN");
        const cryptoData = await cryptoRes.json();
        const cryptoArticles = cryptoData.Data || [];

        const piRes = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnews.google.com%2Frss%2Fsearch%3Fq%3DPi%2BNetwork%2BCrypto%26hl%3Den-US%26gl%3DUS%26ceid%3DUS%3Aen");
        const piData = await piRes.json();
        const piArticles = piData.items || [];

        const healthRes = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnews.google.com%2Frss%2Fheadlines%2Fsection%2Ftopic%2FHEALTH%3Fhl%3Den-US%26gl%3DUS%26ceid%3DUS%3Aen");
        const healthData = await healthRes.json();
        const healthArticles = healthData.items || [];

        return [
            {
                id: "news_" + Date.now() + "_1",
                category: "Market Wealth",
                title: cryptoArticles[0]?.title || "Market Liquidity Expanding",
                image: cryptoArticles[0]?.imageurl || "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600",
                source: cryptoArticles[0]?.source_info?.name || "CryptoCompare",
                fullNews: cryptoArticles[0]?.body || "Global market liquidity continues to shift toward digital utility assets."
            },
            {
                id: "news_" + Date.now() + "_2",
                category: "Asset Defense",
                title: cryptoArticles[1]?.title || "Security Alert: Defend Your Wallet",
                image: cryptoArticles[1]?.imageurl || "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=600",
                source: cryptoArticles[1]?.source_info?.name || "CryptoCompare",
                fullNews: cryptoArticles[1]?.body || "Always protect your 24-word passphrase and verify official domain signatures."
            },
            {
                id: "news_" + Date.now() + "_3",
                category: "PI News",
                title: piArticles[0]?.title || "Pi Network Global Ecosystem Expansion",
                image: "https://images.unsplash.com/photo-1621504450181-5d156f065317?auto=format&fit=crop&w=600",
                source: piArticles[0]?.author || "Google News",
                fullNews: (piArticles[0]?.description || "Network milestones and developer ecosystems continue to mature.").replace(/(<([^>]+)>)/gi, "")
            },
            {
                id: "news_" + Date.now() + "_4",
                category: "Health News",
                title: healthArticles[0]?.title || "Trader Wellness & Performance Habits",
                image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600",
                source: healthArticles[0]?.author || "Health Journal",
                fullNews: (healthArticles[0]?.description || "Maintaining physical conditioning and recovery protocols improves mental stamina.").replace(/(<([^>]+)>)/gi, "")
            }
        ];
    } catch (error) {
        console.error("Failed to fetch live news:", error);
        return [];
    }
}

  
    const newsFeed = await fetchLiveNews();


        // 4. PACKAGE FINAL PAYLOAD
        const finalPayload = {
            lastUpdated: new Date().toISOString(),
            rates: fiatRates,
            benchmarks: cryptoBenchmarks,
            news: newsFeed
        };

        fs.writeFileSync('feed.json', JSON.stringify(finalPayload, null, 2));
        console.log("Update complete. feed.json successfully populated!");

    } catch (error) {
        console.error("Critical Engine Failure:", error);
        process.exit(1);
    }
}

updateData();
