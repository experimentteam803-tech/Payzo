export default async function handler(req, res) {
    // ⚠️ Yahan apna BotFather wala Token paste karein
    const BOT_TOKEN = "8390464598:AAEk04NIJ-hRo62XMdcnSTs7YeKJP_VoY1M"; 

    if (req.method === 'POST') {
        const update = req.body;

        if (update && update.message && update.message.text) {
            const text = update.message.text;
            const chatId = update.message.chat.id;
            const firstName = update.message.from.first_name || "Miner";

            // Jab koi /start bhejta hai
            if (text.startsWith('/start')) {
                const parts = text.split(' ');
                
                // Referral capture
                let appUrl = "https://payzo-wine.vercel.app";
                if (parts.length > 1 && parts[1].trim() !== "") {
                    const referrerId = parts[1].trim();
                    appUrl = `https://payzo-wine.vercel.app/?start=${referrerId}`;
                }

                const telegramApiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
                
                await fetch(telegramApiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: `👋 Welcome ${firstName}!\n\nCoinMine Hub me aapka swagat hai. Neeche diye gaye button par click karke apni free mining shuru karein:`,
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    { text: "🚀 Open CoinMine App", web_app: { url: appUrl } }
                                ]
                            ]
                        }
                    })
                });
            }
        }
        return res.status(200).send('OK');
    }

    return res.status(200).send('PayZo Bot Server is Running Online!');
}
