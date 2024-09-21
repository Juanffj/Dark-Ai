// créditos para MauroAzcurra
// código adaptado por karim-off 
import fetch from "node-fetch";

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let text;
    if (args.length >= 1) {
        text = args.slice(0).join(" ");
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } else throw "➤ `𝗔𝗩𝗜𝗦𝗢` 🐈‍⬛\n\n*AGREGA TU IDEA DE IMAGEN*\n_.seaArt Gatito Tierno_";
    
    await m.reply(wait);

    try {
        let data = await generateImage(text);
        if (data && data.imageUrl) {
            await conn.sendFile(m.chat, data.imageUrl, '', `🐈‍⬛ 𝗥𝗘𝗦𝗨𝗟𝗧𝗔𝗗𝗢 :`, m, false, {
                mentions: [m.sender]
            });
        }
    } catch (e) {
        await m.reply("Error al generar la imagen");
    }
}

handler.help = ["seaArt"];
handler.tags = ["ai"];
handler.command = /^(seaArt|seaImg)$/i;
handler.register = handler.limit = true;
export default handler;

/* New Line */
async function generateImage(prompt) {
    const data = {
        prompt: prompt,
        // Otros parámetros según la API de SeaArt
    };

    const url = 'https://api.seaart.com/generate'; // Reemplaza con la URL real de la API de SeaArt

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        return result; // Asegúrate de que esto coincida con la respuesta de la API
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
