const fs = require('fs');

async function updateData() {
    try {
        console.log("MELANDIX Engine waking up...");

        // 1. FETCH LIVE GLOBAL RATES
        const rateRes = await fetch('https://open.er-api.com/v6/latest/USD');
        const rateData = await rateRes.json();

        // 2. GENERATE INTELLIGENCE FEED
        // (We are using high-tier MELANDIX placeholders for MVP testing before connecting a paid news API)
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

        // 3. PACKAGE THE DATA
        const finalPayload = {
            lastUpdated: new Date().toISOString(),
            rates: rateData.rates,
            news: newsFeed
        };

        // 4. SAVE TO STATIC FILE
        fs.writeFileSync('feed.json', JSON.stringify(finalPayload, null, 2));
        console.log("Update complete. feed.json successfully generated.");

    } catch (error) {
        console.error("Critical Engine Failure:", error);
    }
}

updateData();
