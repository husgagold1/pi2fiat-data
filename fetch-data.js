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

        // // 3. FETCH LIVE NEWS INTELLIGENCE
async function fetchLiveNews() {
    try {
        console.log("Fetching live intelligence...");

        // Define Health Fallbacks (Fruits, Fitness, Nutrition)
        const healthFallbacks = [
            "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80"
        ];

        // 1. Fetch Crypto/Market News
        const cryptoRes = await fetch("https://min-api.cryptocompare.com/data/v2/news/?lang=EN");
        const cryptoData = await cryptoRes.json();
        const cryptoArticles = cryptoData.Data || [];

        // 2. Fetch Pi Ecosystem News (Excluding Exchange/IOU Noise)
        const piQuery = encodeURIComponent('"Pi Network" mainnet OR dApps OR hackathon OR testnet OR merchant -IOU -trading');
        const piRes = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`https://news.google.com/rss/search?q=${piQuery}&hl=en-US&gl=US&ceid=US:en`)}`);
        const piData = await piRes.json();
        const piArticles = piData.items || [];

        // 3. Fetch Health & Lifestyle News (Fruits, Diet, Exercise)
        const healthQuery = encodeURIComponent('"fruit benefits" OR "balanced diet" OR "exercise habits" OR "wellness"');
        const healthRes = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`https://news.google.com/rss/search?q=${healthQuery}&hl=en-US&gl=US&ceid=US:en`)}`);
        const healthData = await healthRes.json();
        const healthArticles = healthData.items || [];

        const newsFeed = [];

        // Helper to map and take top 5
        const addCategoryItems = (articles, categoryName, defaultImg, fallbacks = null) => {
            articles.slice(0, 5).forEach((art, idx) => {
                let imgUrl = art.imageurl || art.thumbnail || art.enclosure?.link || (fallbacks ? fallbacks[idx % fallbacks.length] : defaultImg);
                newsFeed.push({
                    id: "news_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
                    category: categoryName,
                    title: art.title || "Market Intelligence Update",
                    image: imgUrl,
                    source: art.source || art.author || "Melandix Feed",
                    fullNews: art.body || art.description || art.content || art.title
                });
            });
        };

        // Populate Categories (5 items each)
        addCategoryItems(cryptoArticles.slice(0, 5), "Market Wealth", "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80");
        addCategoryItems(cryptoArticles.slice(5, 10), "Asset Defense", "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80");
        addCategoryItems(piArticles, "PI News", "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=600&q=80");
        addCategoryItems(healthArticles, "Health News", null, healthFallbacks);

        return newsFeed;

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
