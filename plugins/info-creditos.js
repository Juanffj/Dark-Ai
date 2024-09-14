let handler = async (m, { conn, command, usedPrefix }) => {
let staff = `☁️ *EQUIPO DE AYUDANTES*
☕ *Bot:* ${global.botname}
☕ *Versión:* ${global.vs}

🤍 *Propietario:* 🤍

• Angel-OFC
☁️ *Rol:* Propietario
☁️ *Número:* ${creador}
☁️ *GitHub:* https://github.com/Angelito-OFC

🤍 *Colaboradores:* 🤍

• Maxz
☁️ *Rol:* Colab
☁️ *GitHub:* https://github.com/Maxz-on

• Alermz
☁️ *Rol:* Colab
☁️ *GitHub:* https://github.com/ale-rmz

• Kenisawa Dev
☁️ *Rol:* Colab
☁️ *GitHub:* https://github.com/MauroAzcurra`
await conn.sendFile(m.chat, icons, 'yaemori.jpg', staff.trim(), fkontak, true, {
contextInfo: {
'forwardingScore': 200,
'isForwarded': false,
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: false,
title: `☁️ Colaboradores ☁️`,
body: `🤍 Staff Oficial`,
mediaType: 1,
sourceUrl: redes,
thumbnailUrl: icono
}}
}, { mentions: m.sender })
m.react(emoji)

}
handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.register = true
handler.tags = ['main']

export default handler
