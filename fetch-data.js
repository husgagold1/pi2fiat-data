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

        // 3. CURATED INTEL FEED (Placeholders for MVP)
        const newsFeed = [
    {
        id: "news_" + Date.now() + "_1",
        category: "Health News",
        title: "Men Above 40: Why Sitting While Urinating Is Better",
        image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600",
        source: "MELANDIX Intelligence",
        fullNews: "Medical research indicates that for men over the age of 40, sitting while urinating helps relax the pelvic floor and abdominal muscles. This allows the bladder to empty more completely and reduces strain on an enlarging prostate, promoting better long-term urinary and bladder health."
    },
    {
        category: "Market Wealth",
        id: "news_" + Date.now() + "_2",
        title: "Global Fiat Corridors Preparing Liquidity Rails",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600",
        source: "MELANDIX Intelligence",
        fullNews: "Cross-border financial systems and regional liquidity corridors are rapidly adopting modern automated settlement protocols. Developing deep, decentralized liquidity networks is critical for ensuring seamless conversion between emerging digital assets and local fiat currencies."
    },
    {
        category: "Asset Defense",
        id: "news_" + Date.now() + "_3",
        title: "The 24-Word Rule: Guarding Your Passphrase",
        image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=600",
        source: "MELANDIX Intelligence",
        fullNews: "Your 24-word secret passphrase is the only key to your wallet. Neither the Core Team nor official administrators will ever ask you to enter it on external websites, forms, or customer support chats. Write it down physically on paper and store it securely offline."
    },
    {
        category: "PI News",
        id: "news_" + Date.now() + "_4",
        title: "Regulatory Milestones & Open Network Expansion",
        image: "https://images.unsplash.com/photo-1621504450181-5d156f065317?auto=format&fit=crop&w=600",
        source: "MELANDIX Intelligence",
        fullNews: "Decentralized utility platforms and digital currency frameworks continue to gain momentum with expanding developer ecosystems and peer-to-peer commerce. Global regulatory developments are paving the way for standardized compliance, driving ecosystem maturity toward open network adoption."
    }
];


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
