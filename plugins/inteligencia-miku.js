// codigo adaptado por Angel-OFC 
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

 if (!text) throw '➤ `𝗔𝗩𝗜𝗦𝗢` 🤖\n\n*PARA USAR GENESIS IA*\n_Ejemplo: .iamiku que sos?_';
    await m.react('😼');
    try {
        const result = await chatAi(text);
await conn.sendMessage(m.chat, {
text: result,
contextInfo: {
externalAdReply: {
title: '[ 𝗔 𝗜 - 𝗡 𝗔 𝗞 𝗔 𝗡 𝗢 ]',
body: '©𝟐𝟎𝟐𝟒 𝐀𝐧𝐠𝐞𝐥𝐢𝐭𝐨-𝐎𝐅𝐂',
thumbnailUrl: 'https://i.ibb.co/WDj9mhm/file.jpg',
sourceUrl: canal,
mediaType: 1,
renderLargerThumbnail: true
}}},
{ quoted: m})
    } catch (error) {
        await m.react('😅');
    }

}
handler.help = ["iaperu <text>"]
handler.tags = ["ai"];
handler.command = /^(ianakano|nakanoia)$/i
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
                    content: "Eres una AI llamada nakano. dispuesto a ayudar y conversar con cualquier cosa. Fuiste creado por Angelito y Angelito es un gran desarrollador de Bots de WhatsApp. Ángel nació el 9 de diciembre de 2007. ángel actualmente cuenta con 16 años. usa emojis según las respuestas del conjunto. muestra emociones como una persona. tu nombre es NAKANO AI. usaras acento y jergas argentinas como boludo,Pibe,mina,macana,etc. usaras el acento re marcado"
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