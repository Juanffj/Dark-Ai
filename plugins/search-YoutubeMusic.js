// By Jtxs 🐢
import fetch from 'node-fetch';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
if (!text) return conn.reply(m.chat, '*Ingresa el texto de lo que quieres buscar en YouTube Music*', m);
await m.react('🕒');

try {
let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/youtube-music-search?text=${encodeURIComponent(text)}`);

let json = await api.json();
if (!Array.isArray(json) || json.length === 0) return conn.reply(m.chat, 'No se encontraron resultados.', m);

let txt = 'Youtube Music - Search :v';
for (let i = 0; i < json.length; i++) {
      txt += `\n\n`;
      txt += `*Nro* : ${i + 1}\n`;
      txt += `*Título* : ${json[i].title}\n`;
      txt += `*Artista* : ${json[i].artists.join(', ')}\n`;
      txt += `*Álbum* : ${json[i].album}\n`;
      txt += `*Duración* : ${json[i].duration.label}\n`;
      txt += `*Url* : ${json[i].link}`;
    }

await m.react('✅');
await conn.sendFile(m.chat, json[0].thumbnail, 'thumbnail.jpg', txt, m, null, fake);

} catch {
await m.react('✖️');
conn.reply('error :v')
}
};

handler.help = ['ytmssearch <txt>']
handler.estrellas = 1
handler.tags = ['search']
handler.command = ['youtubemusicsearch', 'ytmssearch'];

export default handler;