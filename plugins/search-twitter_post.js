// By Jtxs 🐢
import fetch from 'node-fetch';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
if (!text) return conn.reply(m.chat, '*Ingresa el texto de lo que quieres buscar en Twitter*', m);
await m.react('🕒');

try {
let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/Twitter-Posts?text=${encodeURIComponent(text)}`);
let json = await api.json();

if (!json.result || json.result.length === 0) return conn.reply(m.chat, 'No se encontraron resultados.', m);

let info = json.result[Math.floor(Math.random() * json.result.length)];

let txt = `*Usuario* : ${info.user || 'No disponible :('}
*Post* : ${info.post}
*Link* : ${info.user_link}\n\n> ʙʏ : ɢᴇɴᴇꜱɪꜱ ʏ ᴀɴɢᴇʟ-ᴏꜰᴄ`;

await m.react('✅');
await conn.sendFile(m.chat, info.profile, 'thumbnail.jpg', txt, m, null, fake);
} catch {
await m.react('✖️');
conn.reply(m.chat, 'Error al procesar la solicitud. Inténtalo de nuevo más tarde.', m);
}
};

handler.help = ['twitterposts <txt>']
handler.estrellas = 1
handler.tags = ['search']
handler.command = ['twitterposts', 'xposts'];

export default handler;