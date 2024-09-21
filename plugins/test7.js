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
    const url = 'https://api.bing.microsoft.com/v7.0/images/generate'; // Verifica la URL correcta de la API de Bing
    const data = {
        prompt: prompt,
        // Otros parámetros según la API de Bing
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': 'TU_CLAVE_API', // Sustituye con tu clave API
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const text = await response.text(); // Obtener la respuesta como texto
        console.log(text); // Imprimir la respuesta para debug

        if (!response.ok) {
            console.error('Error en la respuesta:', response.status, text);
            throw new Error(`Error en la API: ${response.status}`);
        }

        const result = JSON.parse(text); // Intentar convertir a JSON
        return result; // Asegúrate de que esto coincida con la respuesta de la API
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
