// By Jtxs 🐢

// _[ Tiktokb Search 🔎 ]_
import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, '*ingresa el texto de lo que quieres buscar en tiktok*', m);
  

try {
let { data: api } = await axios.get('https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=' + text);
let json = api.data;

let info = json[Math.floor(json.length * Math.random())];

if (info) {
await conn.sendMessage(m.chat, { video: { url: info.nowm }, caption: info.url }, { quoted: m });
} else {
conn.reply('error :v')
}
} catch {
conn.reply('error :v')
}
};

handler.command = ['tiktoksearch'];

export default handler;