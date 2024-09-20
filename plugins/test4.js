import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        await m.react('🔍');
        conn.reply(m.chat, '🤍 Buscando Su *Waifu*', m, {
            contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, showAdAttribution: true,
            title: packname,
            body: wm,
            previewType: 0, thumbnail: icons,
            sourceUrl: canal }}
        });

        const messages = [];
        for (let i = 0; i < 4; i++) {
            let res = await fetch('https://api.waifu.pics/sfw/waifu');
            if (!res.ok) return;
            let json = await res.json();
            if (!json.url) return;

            messages.push([
                `Imagen ${i + 1}`,
                json.url,
                `Imagen ${i + 1}`,
                [[]],
                [[]],
                [[]],
                [[]]
            ]);
        }

        await conn.sendCarousel(m.chat, `🚩 Resultado de *Waifu*`, '🔎 Imagen - Descargas', null, messages, m);
        await m.react('✅');
    } catch (error) {
        console.error(error);
        await m.react('❌');
    }
};

handler.help = ['waifu'];
handler.tags = ['anime'];
handler.command = ['waifu'];
handler.register = true;

export default handler;
