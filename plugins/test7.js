import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, '🤍 *¿Qué personaje de Dragon Ball quieres buscar?*', m);

    await m.react('⏳'); // Espera
    conn.reply(m.chat, `🤍 *Buscando ${text}...*`, m);

    const url = `https://es.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(text)}&utf8=1`;
    const response = await fetch(url);
    const json = await response.json();

    if (!response.ok || json.query.search.length === 0) {
        await m.react('❌'); // Error
        return conn.reply(m.chat, '🤍 *¡Oops! No se encontró el personaje. Inténtalo de nuevo.*', m);
    }

    const pageTitle = json.query.search[0].title;
    const pageUrl = `https://es.wikipedia.org/wiki/${encodeURIComponent(pageTitle)}`;
    
    const characterInfo = `🤍 *Información sobre ${pageTitle}*\n🔗 Más detalles en: ${pageUrl}`;

    conn.reply(m.chat, characterInfo, m);
    await m.react('✅'); // Hecho
}

handler.help = ['dragonball *<personaje>*'];
handler.tags = ['buscador'];
handler.command = /^dragonball/i;
export default handler;
