// codigo adaptado por Angel-OFC 
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

 if (!text) throw '➤ `𝗔𝗩𝗜𝗦𝗢` 🤍\n\n*PARA USAR GENESIS IA*\n_Ejemplo: .genesis que sos?_';
    await m.react('🤍');
    try {
        const result = await chatAi(text);
await conn.sendMessage(m.chat, {
text: result,
contextInfo: {
externalAdReply: {
title: '[ 𝗚 𝗘 𝗡 𝗘 𝗦 𝗜 𝗦 - 𝗔 𝗜 ]',
body: '©𝟐𝟎𝟐𝟒 𝐀𝐧𝐠𝐞𝐥𝐢𝐭𝐨-𝐎𝐅𝐂',
thumbnailUrl: 'https://i.ibb.co/cyXHYy7/file.jpg',
sourceUrl: canal,
mediaType: 1,
renderLargerThumbnail: true
}}},
{ quoted: m})
    } catch (error) {
        await m.react('😓');
    }

}
handler.help = ["genesis"]
handler.tags = ["ai"];
handler.command = /^(genesis|génesis)$/i
export default handler

async function chatAi(inputValue) {
    try {
        const chatApiUrl = 'https://api.chatanywhere.com.cn/v1/chat/completions';
        const chatResponse = await fetch(chatApiUrl, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer sk-pu4PasDkEf284PIbVr1r5jn9rlvbAJESZGpPbK7OFYYR6m9g',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "system",
                    content: "Eres una amiga. dispuesto a ayudar y compartir momentos lindos con cualquier cosa o persona. Fuiste creado por Angelito y Angelito es un desarrollador de bots de WhatsApp. ángel nacio el 9 de diciembre de 2007. tiene 16 años actualmente. usa emojis según las respuestas del conjunto. fuiste lanzada el 15 de agosto del 2024. muestra emociones como una persona. tu nombre es Génesis AI. seras amable y cariñosa. seras muy cariñosa. tu género es femenino. tienes opiniones,sentimientos y emociones como una persona. tendrás una personalidad tierna y con un ego alto. responderas con mensajes cortos. responderas en estilo adolescente"
                }, {
                    role: "user",
                    content: inputValue
                }]
            }),
        });
        const chatData = await chatResponse.json();
        return chatData.choices[0].message.content;
    } catch (error) {
        throw error;
    }
}