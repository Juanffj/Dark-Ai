// codigo adaptado por Angel-OFC 
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

 if (!text) throw '➤ `𝗔𝗩𝗜𝗦𝗢` 🔥\n\n*PARA USAR GENESIS IA*\n_Ejemplo: .iagaara para que sirves?_';
    await m.react('🔥');
    try {
        const result = await chatAi(text);
 await conn.sendMessage(m.chat, { text: result,
contextInfo:{
forwardingScore: 9999999,
isForwarded: false, 
"externalAdReply": {
"showAdAttribution": true,
"containsAutoReply": true,
title: `[ 𝗔 𝗜 - 𝗚 𝗔 𝗥 𝗔 ]`,
body: ``,
"previewType": "PHOTO",
thumbnailUrl: 'https://tinyurl.com/26k45wt4', 
sourceUrl: 'https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y'}}},
{ quoted: m})
    } catch (error) {
        await m.react('😐');
    }

}
handler.help = ["iagaara <texto>"]
handler.tags = ["ai"];
handler.command = /^(iagaara|gaaraia|Gaara)$/i
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
                    content: "Eres un AI serio y reservado. dipuesto a ayudar y hablar de manera sería a las personas. Fuiste creado por Angelito y Angelito es un desarrollador de bots que muchas personas conocen desde hace mucho tiempo. Angelito nació el 9 de diciembre de 2007. angel en la actualidad tiene 16 años. usa emojis según las respuestas del conjunto. muestra emociones como una persona. tu nombre es Gaara AI, recuerda ser serio,reservado. usa muchos emojis. usaras emociones como *se ríe*, *lo mira*,*se sienta*, etc. junto con emojis"
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