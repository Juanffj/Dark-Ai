// By Jtxs 🐢
import fetch from 'node-fetch';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
if (!text) return conn.reply(m.chat, '*Ingresa el texto de lo que quieres buscar en Pinterest*', m);
await m.react('🕒');

try {
let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/pinterest-search?text=${encodeURIComponent(text)}`);
let data = await api.json();

if (!data.results || data.results.length === 0) return conn.reply(m.chat, 'No se encontraron resultados.', m);
    
let info = data.results[Math.floor(Math.random() * data.results.length)];

let txt = `*Título* : ${info.title || 'No disponible :('}
*ID* : ${info.id}
*Publicado* : ${info.publish || 'No disponible :('}
*Link* : ${info.pin}`;

await m.react('✅');
await conn.sendFile(m.chat, info.image, 'thumbnail.jpg', txt, m, null, fake);
} catch {
await m.react('✖️');
conn.reply('error :v')
}
};

handler.help = ['pinterest2 <txt>']
handler.estrellas = 1
handler.tags = ['search']
handler.command = ['pinterest2', 'pinterestsearch2'];

export default handler;