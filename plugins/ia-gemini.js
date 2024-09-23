/* By Jtxs 🐢 */     
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `*Ingresa un texto para hablar con gemini*`, m)

try {
let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${text}`)
let json = await api.json()

if (json.status === 'true') {
await conn.sendMessage(m.chat, {
text: json.result,
contextInfo: {
externalAdReply: {
title: '[ 𝐆 𝐄 𝐌 𝐈 𝐍 𝐈 - 𝐀 𝐈 ]',
body: '©𝟐𝟎𝟐𝟒 𝐀𝐧𝐠𝐞𝐥𝐢𝐭𝐨-𝐎𝐅𝐂',
thumbnailUrl: 'https://i.ibb.co/235B4nn/file.jpg',
sourceUrl: canal,
mediaType: 1,
renderLargerThumbnail: true
}}},
{ quoted: m})

} else {
conn.reply('error :v')
}
} catch {
conn.reply('error :v')
}
}

handler.help = ['gemini <texto>'];
handler.tags = ['ai'];
handler.command = ['gemini']

export default handler