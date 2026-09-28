export default async function handler(req, res) {
    // ⚠️ 1. Apna Bot Token yahan daalein
    const BOT_TOKEN = "8390464598:AAEk04NIJ-hRo62XMdcnSTs7YeKJP_VoY1M"; 

    // 🖼️ 2. Apni Banner Photo ka Direct Link yahan daalein
    const BANNER_IMAGE_URL = "https://i.postimg.cc/9FtdPSWK/IMG-20260928-235341-745.jpg"; 

    if (req.method === 'POST') {
        const update = req.body;

        if (update && update.message && update.message.text) {
            const text = update.message.text;
            const chatId = update.message.chat.id;

            // Jab koi user /start bhejta hai
            if (text.startsWith('/start')) {
                const parts = text.split(' ');
                
                // Referral capture karna
                let appUrl = "https://payzo-wine.vercel.app";
                if (parts.length > 1 && parts[1].trim() !== "") {
                    const referrerId = parts[1].trim();
                    appUrl = `https://payzo-wine.vercel.app/?start=${referrerId}`;
                }

                // 📝 Exact wahi Caption Text jo aapke screenshot me tha
                const captionText = 
`⛏️ Start smart mining and earn coins by staying active.
📈 Grow your balance step by step with daily activity.
✨ Simple, smooth, and designed for long-term use.`;

                // 🚀 Photo + Caption + Button bhejna
                try {
                    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            chat_id: chatId,
                            photo: BANNER_IMAGE_URL,
                            caption: captionText,
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "Start Mining ⛏️", web_app: { url: appUrl } }
                                    ]
                                ]
                            }
                        })
                    });

                    // Agar kisi wajah se photo load na ho, toh text message chala jaye
                    if (!response.ok) {
                        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                chat_id: chatId,
                                text: captionText,
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "Start Mining ⛏️", web_app: { url: appUrl } }
                                        ]
                                    ]
                                }
                            })
                        });
                    }
                } catch (err) {
                    console.error("Telegram send error:", err);
                }
            }
        }
        return res.status(200).send('OK');
    }

    return res.status(200).send('PayZo Bot Server is Running Online!');
}
