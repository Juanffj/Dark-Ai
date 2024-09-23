/* By Jtxs 🐢 */     
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `*Ingresa un link de youtube*`, m)

try {
let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/transcribir-youtube?url=${text}`)
let json = await api.json()

await conn.reply(m.chat, json.result, m, rcanal)

} catch {
conn.reply('error :v')
}
}

handler.help = ['transcriptyt'];
handler.tags = ['fun'];
handler.command = ['transcriptyt']

export default handler