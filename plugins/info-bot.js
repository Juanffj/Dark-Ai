import fs from 'fs';
const handler = (m) => m;
handler.all = async function(m) {
  const vn = './media/audios/bot.mp3';
  const chat = global.db.data.chats[m.chat];
  
  if (/^bot$/i.test(m.text) && !chat.isBanned) {
    conn.sendPresenceUpdate('recording', m.chat);
conn.reply(m.chat, `🤍 ¡Hola! Soy Ai Genesis, en que puedo ayudarte hoy?\n\n✰ Usa *!menu* para ver mis comandos.`, m, rcanal, )
    m.conn.sendMessage(m.chat, {audio: {url: vn}, fileName: 'error.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: m});
    // conn.sendFile(m.chat, vn, 'HolaXiaBot.mp3', null, m, true, { type: 'audioMessage', seconds: '4556', ptt: true, sendEphemeral: true, quoted: m })
  }
  return !0;
};
export default handler;