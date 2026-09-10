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
                title: "Global Health Protocols: Safeguarding Pioneer Wellness in 2026",
                source: "MELANDIX Intelligence"
            },
            {
                id: "news_" + Date.now() + "_2",
                category: "Market Wealth",
                title: "Market Expansion: Fiat Corridors Strengthening for GCV Integration",
                source: "MELANDIX Intelligence"
            },
            {
                id: "news_" + Date.now() + "_3",
                category: "Asset Defense",
                title: "Security Alert: Best Practices for Cold Wallet Storage Verification",
                source: "MELANDIX Intelligence"
            },
            {
                id: "news_" + Date.now() + "_4",
                category: "PI News",
                title: "Network Diagnostics: Node Synchronization Reaching All-Time Highs",
                source: "MELANDIX Intelligence"
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
