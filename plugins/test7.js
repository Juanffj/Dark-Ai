import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, '🤍 *¿Qué personaje de Dragon Ball quieres buscar?*', m);

    await m.react('⏳'); // Espera
    conn.reply(m.chat, `🤍 *Buscando ${text}...*`, m);

    const url = `https://es.dragonball.fandom.com/api/v1/Articles/List?name=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const json = await response.json();

    if (!response.ok || !json.items || json.items.length === 0) {
        await m.react('❌'); // Error
        return conn.reply(m.chat, '🤍 *¡Oops! No se encontró el personaje. Inténtalo de nuevo.*', m);
    }

    const character = json.items[0]; // Toma el primer personaje que coincida
    const characterInfo = `🤍 *Información sobre ${character.title}*\n\n` +
                          `🤍 *Descripción:* ${character.description || 'Sin descripción disponible.'}\n` +
                          `🔗 Más detalles en: ${character.url}`;

    conn.reply(m.chat, characterInfo, m);
    await m.react('✅'); // Hecho
}

handler.help = ['dragonball *<personaje>*'];
handler.tags = ['buscador'];
handler.command = /^dragonball/i;
export default handler;
