let media = 'https://i.ibb.co/jWWZv2T/file.jpg'; // Asegúrate de que imagen10 contenga la ruta de la imagen que deseas enviar
let handler = async (m, { conn, command }) => {
    let fkontak = {
        "key": {
            "participants": "0@s.whatsapp.net",
            "remoteJid": "status@broadcast",
            "fromMe": false,
            "id": "Halo"
        },
        "message": {
            "contactMessage": {
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        },
        "participant": "0@s.whatsapp.net"
    };

    let str = `𝖡𝗂𝖾𝗇𝗏𝖾𝗇𝖽𝗂𝗈 𝖠 𝖢𝗎𝖾𝗇𝗍𝖺𝗌 𝖮𝖿𝗂𝖼𝗂𝖺𝗅𝖾𝗌
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
🤍 *Propietario:*
Wa.me/59897246324
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
🤍 *Colaborador 1:*
Wa.me/56983298345
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
🤍 *Colaborador 2:*
wa.me/50242073893
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
🤍 *Canal Oficial:*
1) *${canal}*
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈`;

    // Enviar la imagen como documento con el mensaje estructurado
    await conn.sendFile(m.chat, media, 'imagen.jpg', str, fakegif3, true);
};

handler.command = ['cuentas','cuentasoficiales'];
handler.exp = 35;
handler.register = true;

export default handler;