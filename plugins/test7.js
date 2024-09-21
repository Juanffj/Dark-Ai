import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, '🤍 *¿Qué personaje de Dragon Ball quieres buscar?*', m);

    await m.react('⏳'); // Espera
    conn.reply(m.chat, `🤍 *Buscando ${text}...*`, m);

    const url = `https://dragonball.dev/api/characters?name=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const json = await response.json();

    if (!response.ok || json.length === 0) {
        await m.react('❌'); // Error
        return conn.reply(m.chat, '🤍 *¡Oops! Parece que hubo un error al buscar el personaje. Por favor, inténtalo de nuevo más tarde.*', m);
    }

    const character = json[0]; // Tomar el primer personaje que coincida
    const characterInfo = `🤍 *Información de ${character.name}*\n\n` +
                          `🤍 *Nombre:* ${character.name}\n` +
                          `🤍 *Raza:* ${character.race || 'Desconocido'}\n` +
                          `🤍 *Poder:* ${character.power || 'Desconocido'}\n` +
                          `🤍 *Altura:* ${character.height || 'Desconocido'}\n` +
                          `🤍 *Peso:* ${character.weight || 'Desconocido'}\n\n` +
                          `📖 *Descripción:*\n${character.description || 'Sin descripción disponible.'}\n\n` +
                          `🔍 ¡Encuentra más detalles sobre este personaje en la wiki de Dragon Ball! 🔍\n` +
                          `🔗 https://dragonball.fandom.com/wiki/${character.name.replace(' ', '_')}`;

    conn.reply(m.chat, characterInfo, m);
    await m.react('✅'); // Hecho
}

handler.help = ['dragonball *<personaje>*'];
handler.tags = ['buscador'];
handler.command = /^dragonball/i;
export default handler;
