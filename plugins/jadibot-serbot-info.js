import ws from 'ws'

async function handler(m, { conn: stars, usedPrefix }) {
  let uniqueUsers = new Map()

  global.conns.forEach((conn) => {
    if (conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED) {
      uniqueUsers.set(conn.user.jid, conn)
    }
  })

  let users = [...uniqueUsers.values()]

  let img = await (await fetch(`https://i.ibb.co/LSBGpg4/file.jpg`)).buffer()
  let message = users.map((v, index) => `
*[ \`${index + 1}\` -  ${v.user.name || '𝚂𝚄𝙱-𝙱𝙾𝚃'} ]* 

 * -* @${v.user.jid.replace(/[^0-9]/g, '')}\n│❀ *Link:* https://wa.me/${v.user.jid.replace(/[^0-9]/g, '')}\n│❀ *Nombre:* ╰─⬣`).join('\n\n')

  let replyMessage = message.length === 0 ? '' : message
  global.totalUsers = users.length
  let responseMessage = `*[ _Total Subbots Activos :_ \`${totalUsers || '0'}\` ]*\n\n${replyMessage.trim()}`.trim()

await stars.sendFile(m.chat, img, 'thumbnail.jpg', responseMessage, m, null, fake, false, { mentions: stars.parseMention(responseMessage) })

// await stars.sendMessage(m.chat, { text: responseMessage, mentions: stars.parseMention(responseMessage) }, { quoted: fkontak })
// await conn.reply(m.chat, responseMessage, m, rcanal)
}

handler.help = ['bots']
handler.tags = ['serbot']
handler.command = ['listjadibot', 'bots']
export default handler