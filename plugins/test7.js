import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, '🤍 *¿Qué personaje de Dragon Ball quieres buscar?*', m);

    await m.react('⏳'); // Espera
    conn.reply(m.chat, `🤍 *Buscando ${text}...*`, m);

    const url = `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const json = await response.json();

    if (!response.ok || json.data.length === 0) {
        await m.react('❌'); // Error
        return conn.reply(m.chat, '🤍 *¡Oops! No se encontró el personaje. Inténtalo de nuevo.*', m);
    }

    const anime = json.data[0]; // Toma el primer anime que coincida
    const characterInfo = `🤍 *Información sobre ${anime.attributes.canonicalTitle}*\n\n` +
                          `🤍 *Sinopsis:* ${anime.attributes.synopsis || 'Sin sinopsis disponible.'}\n` +
                          `🔗 Más detalles en: ${anime.attributes.canonicalTitle}`;

    conn.reply(m.chat, characterInfo, m);
    await m.react('✅'); // Hecho
}

handler.help = ['dragonball *<personaje>*'];
handler.tags = ['buscador'];
handler.command = /^dragonball/i;
export default handler;
