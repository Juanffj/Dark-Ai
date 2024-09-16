import fetch from 'node-fetch'

var handler = async (m, { conn, args, usedPrefix, command }) => {

if (!args[0]) return conn.reply(m.chat, `*\`Ingresa El link a descargar 🤍\`*`, m, fake, )
if (!args[0].match(/latestmodapks/gi)) return conn.reply(m.chat, `🤍 *Enlace incorrecto*`, m, fake, )

try {

let res = await fetch(`https://api.akuari.my.id/downloader/dlmod?link=${args[0]}`)
let json = await res.json()
await conn.reply(m.chat, `*📁 Peso:* ${json.respon.size}\n⏰ Espere un momento`, m, fake, )
let { linkdl, size } = json.respon

conn.sendMessage(m.chat, { document: { url: linkdl }, mimetype: 'application/videos.android.package-archive', fileName: `Apk modlatest.apk` }, { quoted: m })
} catch {
return conn.reply(m.chat, '🚩 *Ocurrió un fallo*', m, fake, )}

}
handler.help = ['dlmodlatest']
handler.corazones = 2
handler.tags = ['dl']
handler.command = ['dllatest', 'dlmodlatest'] 
handler.register = true
handler.limit = true

export default handler