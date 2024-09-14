let media = 'https://i.ibb.co/3BppnNL/file.jpg'
let handler = async (m, { conn, command }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
await m.react('☁️');
let str = `ʙʏ: ᴀɴɢᴇʟ-ᴏꜰᴄ ʏ ɢᴇɴᴇꜱɪꜱ`
await conn.sendButton(m.chat, `᥀·࣭࣪̇˖🤍 𝗖𝗢𝗠𝗢 𝗗𝗘𝗦𝗘𝗔 𝗩𝗜𝗡𝗖𝗨𝗟𝗔𝗥\n\n• 𝗦𝗘𝗟𝗘𝗖𝗖𝗜𝗢𝗡𝗔 𝗨𝗡 𝗕𝗢𝗧𝗢𝗡.\n`, str, media, [
['𝗤𝗥 🤍', '.serbotqr'],
['𝗖𝗢𝗗𝗘 🤍', '.serbotcode']], null, [
['Creador', `https://wa.me/59168683798`]], estilo)}
handler.command = /^serbot$/i
export default handler
