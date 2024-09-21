import axios from "axios";
const { generateWAMessageFromContent, prepareWAMessageMedia, proto, generateWAMessageContent } = (await import("@whiskeysockets/baileys")).default;

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) return m.reply(`• *Ejemplo:* ${usedPrefix + command} metamorfosis 8d`);
    
    await m.reply(wait);
    
    async function createVideo(url) {
        const { videoMessage } = await generateWAMessageContent({
            video: {
                url
            }
        }, {
            upload: conn.waUploadToServer
        });
        return videoMessage;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    let push = [];
    let { data } = await axios.get(`https://likee.com/search?query=${text}`); // Cambia la URL a la API de Likee
    let res = data.results; // Ajusta esto según la estructura de la respuesta de Likee
    
    shuffleArray(res); // Mezclar resultados
    let ult = res.splice(0, 999); 
    let i = 1;
    
    for (let item of ult) {
        push.push({
            body: proto.Message.InteractiveMessage.Body.fromObject({
                text: `*Título:* ${item.title}\n*Autor:* ${item.author.nickname}`
            }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({
                text: `👁️: ${formatViews(item.play_count)}\n️❤️: ${formatViews(item.digg_count)}\n️💬: ${formatViews(item.comment_count)}\n➡️: ${formatViews(item.share_count)}`
            }),
            header: proto.Message.InteractiveMessage.Header.fromObject({
                title: '', 
                hasMediaAttachment: true,
                videoMessage: await createVideo(item.play) // Asegúrate de que item.play tenga la URL del video
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons: [
                    {
                        "name": "cta_url",
                        "buttonParamsJson": `{"display_text":"Canal","url":"${item.canal}"}`
                    }
                ]
            })
        });
    }
    
    const bot = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: `🤍 *\`Resultados de:\`* ${text}`
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: '_\`ᴛ\` \`ᴛ\` \`-\` \`ꜱ\` \`ᴇ\` \`ᴀ\` \`ʀ\` \`ᴄ\` \`ʜ\`_',
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        hasMediaAttachment: false
                    }),
                    carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                        cards: [
                            ...push
                        ]
                    })
                })
            }
        }
    }, { quoted: m });
    
    await conn.relayMessage(m.chat, bot.message, {
        messageId: bot.key.id
    });
}

handler.help = ["likeesearchslide", "lssearchslide"];
handler.tags = ["internet", "search"];
handler.command = /^(likeesearchslide|lssearchslide)$/i;

export default handler;

function formatViews(views) {
    let form = views.toString();
    let formatv;
    if (form.length > 6) {
        formatv = (views / 1000000).toFixed(1) + 'M';
    } else if (form.length > 4) {
        formatv = (views / 1000).toFixed(2) + 'K';
    } else {
        formatv = form;
    }
    
    return formatv;
}
