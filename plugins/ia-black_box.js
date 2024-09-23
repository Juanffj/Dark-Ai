/* By Jtxs 🐢 */     
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `*Ingresa un texto para hablar con blackbox*`, m)

try {
let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/blackbox?system=Eres+una+ai+llamada+blackbox&text=hola soy ${m.pushName} ${text}`)
let json = await api.json()

if (json.results) {
await conn.reply(m.chat, json.results, m)
} else {
conn.reply('error :v')
}
} catch {
conn.reply('error :v')
}
}

handler.help = ['blackbox <texto>']
handler.tags = ['ai']
handler.command = ['blackbox']

export default handler
