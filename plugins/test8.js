import axios from "axios";
const { generateWAMessageFromContent, prepareWAMessageMedia, proto, generateWAMessageContent } = (await import("@whiskeysockets/baileys")).default;

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) return m.reply(`• *Ejemplo:* ${usedPrefix + command} dedicatorias`);

    await m.reply(wait);

    async function createVideo(url) {
        const { videoMessage } = await generateWAMessageContent({
            video: { url }
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
    let res;

    try {
        let { data } = await axios.get(`https://likee.com/api/search?query=${text}`);
        res = data.result.data;
    } catch (error) {
        console.error('Error al buscar en Likee:', error);
        return m.reply('Error al buscar, verifica la consulta o intenta más tarde.');
    }

    shuffleArray(res);
    let ult = res.splice(0, 999);
    
    for (let lucuy of ult) {
        push.push({
            body: proto.Message.InteractiveMessage.Body.fromObject({
                text: `*Título:* ${lucuy.title}\n*Autor:* ${lucuy.author.nickname}`
            }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({
                text: `👁️: ${formatViews(lucuy.play_count)}\n❤️: ${formatViews(lucuy.digg_count)}\n💬: ${formatViews(lucuy.comment_count)}\n➡️: ${formatViews(lucuy.share_count)}`
            }),
            header: proto.Message.InteractiveMessage.Header.fromObject({
                title: '', 
                hasMediaAttachment: true,
                videoMessage: await createVideo(lucuy.play)
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons: [
                    {
                        "name": "cta_url",
                        "buttonParamsJson": `{"display_text":"Canal","url":"${lucuy.author.channel_url}"}`
                    }
                ]
            })
        });
    }

    const bot = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: `🤍 *Resultados de: ${text}*`
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: '_\`ᴛ\` \`ᴛ\` \`-\` \`ꜱ\` \`ᴇ\` \`ᴀ\` \`ʀ\` \`ᴄ\` \`ʜ\`_',
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        hasMediaAttachment: false
                    }),
                    carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                        cards: [...push]
                    })
                })
            }
        }
    }, { quoted: m });

    await conn.relayMessage(m.chat, bot.message, {
        messageId: bot.key.id
    });
}

handler.help = ["likeesearchslide", "ls"];
handler.tags = ["internet", "search"];
handler.command = /^(likeesearchslide|ls)$/i;

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
