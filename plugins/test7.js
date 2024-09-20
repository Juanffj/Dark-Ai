const { generateWAMessageFromContent, prepareWAMessageMedia,  proto, generateWAMessageContent  } = (await import("@whiskeysockets/baileys")).defaultimport
import { ttdl } from 'ruhend-scraper';

let handler = async (m, { conn, usedPrefix, command, text, args }) => {
    const creador_code = 'KenisawaDev';
        let {
            title,
            author,
            username,
            published,
            like,
            comment,
            share,
            views,
            bookmark,
            video,
            cover,
            duration,
            music,
            profilePicture
        } = await ttdl(args[0]);//variables del resultado de 'ttdl'
        let txt_video_tiktok = ``
    switch (command) {
    
  case 'tiktok': {
   if (!args || !args[0]) return conn.reply(m.chat, '*`INGRESA EL LINK DE TIKTOK`*', m, fake, )//vuelve si no tiene un link
   if (!args[0].match(/tiktok/gi)) return conn.reply(m.chat, `Verifica que el link sea de TikTok`, m, fake).then(_ => m.react('✖️'))//verificar si el link es valido
    const data = {
        title: "Tiktok Download",
        sections: [
            {
                title: "🌸 Elaina AI",
                rows: [{ title: "Descargar Video", description: "", id: '.allmenu' }]
            },
            {
                title: "",
                rows: [{ title: "Descargar Audio", description: "", id: '.menulist' }]
            },
            {
                title: "",
                rows: [{ title: "Videos Relacionados", description: "", id: `.ttsearchslide ${title}` }]
            },
            {
                title: "",
                rows: [{ title: "Descargar Video & Audio", description: "", id: '.rules' }]
            }
        ]
    };

    let msgs = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                "messageContextInfo": {
                    "deviceListMetadata": {},
                    "deviceListMetadataVersion": 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: title
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: creador_code
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: 'Elaina Ai Tiktok Downloader',
                        subtitle: "",
                        hasMediaAttachment: false
                    }),
                    contextInfo: {
                        forwardingScore: 9999,
                        isForwarded: false,
                        mentionedJid: conn.parseMention(m.sender)
                    },
                    externalAdReply: {
                        showAdAttribution: true,
                        renderLargerThumbnail: false,
                        mediaType: 1
                    },
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [
                        { "name": "single_select", "buttonParamsJson": JSON.stringify(data) },
                        { "name": "cta_url", "buttonParamsJson": `{"display_text":"Channel WhatsApp","url":"https://whatsapp.com/channel/0029Vai2U3MAu3aRB0NYFT3h","merchant_url":"https://whatsapp.com/channel/0029Vai2U3MAu3aRB0NYFT3h"}` }
                        ],
                    })
                })
            }
        }
    }, {})

    conn.relayMessage(m.chat, msgs.message, {})
    }
    break
  case 'ttsearchslide': {
  if (!text) return m.reply(`• *Ejemplo:* ${usedPrefix + command} metamorfosis 8d`);
  
  try {
  async function createVideo(url) {
    const { videoMessage } = await generateWAMessageContent({
      video: {
        url
      }
    }, {
      upload: conn.waUploadToServer
    });
    return videoMessage
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  let push = [];
  let { data } = await axios.get(`https://widipe.com/tiktoksearch?text=${text}`);
  let res = data.result.data
  
  shuffleArray(res); // Array XD
  let ult = res.splice(0, 999); 
  let i = 1;
  
  for (let lucuy of ult) {
    push.push({
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `*Titulo:* ${lucuy.title}\n*Autor:* ${lucuy.author.nickname}`
      }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({
        text: `👁️: ${formatViews(lucuy.play_count)}\n️❤️: ${formatViews(lucuy.digg_count)}\n️💬: ${formatViews(lucuy.comment_count)}\n➡️: ${formatViews(lucuy.share_count)}`
      }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        title: '', 
        hasMediaAttachment: true,
        videoMessage: await createVideo(lucuy.play)
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: [{
							"name": "cta_url",
							"buttonParamsJson": `{"display_text":"Channel WhatsApp","url":"https://whatsapp.com/channel/0029Vai2U3MAu3aRB0NYFT3h","merchant_url":"https://whatsapp.com/channel/0029Vai2U3MAu3aRB0NYFT3h"}`
						}]
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
            text: `Resultados de *${text}*`
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: 'Tiktok Search By KenisawaDev',
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
  }, {quoted:m});
  
  await conn.relayMessage(m.chat, bot.message, {
    messageId: bot.key.id
  });
  } catch (e) {
  await m.react('❌');//reacción al fallar con el proceso 
  await m.reply('Error al descargar el video solicitado')
  console.log(e)
  }
  }
  break
  case 'tiktokmp4': {
  try {
   if (!args || !args[0]) return conn.reply(m.chat, '*`INGRESA EL LINK DE TIKTOK`*', m, fake, )//vuelve si no tiene un link
   if (!args[0].match(/tiktok/gi)) return conn.reply(m.chat, `Verifica que el link sea de TikTok`, m, fake).then(_ => m.react('✖️'))//verificar si el link es valido
   await conn.sendFile(m.chat, video, 'tiktok.mp4', txt_video_tiktok, m);
   await m.react('✅');//reacción al completar el proceso con éxito 
  } catch (e) {
  await m.react('❌');//reacción al fallar con el proceso 
  await m.reply('Error al descargar el video solicitado')
  console.log(e)
  }
  }
  break
  case 'tiktokmp3': {
  try {
   if (!args || !args[0]) return conn.reply(m.chat, '*`INGRESA EL LINK DE TIKTOK`*', m, fake, )//vuelve si no tiene un link
   if (!args[0].match(/tiktok/gi)) return conn.reply(m.chat, `Verifica que el link sea de TikTok`, m, fake).then(_ => m.react('✖️'))//verificar si el link es valido
   await conn.sendMessage(m.chat, { audio: { url: music }, mimetype: "audio/mp4", fileName: title + '.mp3' }, { quoted: m })
   await m.react('✅');//reacción al completar el proceso con éxito 
  } catch (e) {
  await m.react('❌');//reacción al fallar con el proceso 
  await m.reply('Error al descargar el audio solicitado')
  console.log(e)
  }
  }
  break
  case 'tiktok2': {
  try {
   if (!args || !args[0]) return conn.reply(m.chat, '*`INGRESA EL LINK DE TIKTOK`*', m, fake, )//vuelve si no tiene un link
   if (!args[0].match(/tiktok/gi)) return conn.reply(m.chat, `Verifica que el link sea de TikTok`, m, fake).then(_ => m.react('✖️'))//verificar si el link es valido
   await conn.sendFile(m.chat, video, 'tiktok.mp4', txt_video_tiktok, m);
   await conn.sendMessage(m.chat, { audio: { url: music }, mimetype: "audio/mp4", fileName: title + '.mp3' }, { quoted: m })
   await m.react('✅');//reacción al completar el proceso con éxito 
  } catch (e) {
  await m.react('❌');//reacción al fallar con el proceso 
  await m.reply('Error al descargar el video y audio solicitado')
  console.log(e)
  }
  }
  break
}
}

handler.help = ['tiktok','tiktok2','tiktokmp3','tiktokmp4','ttsearchslide'];
handler.tags = ['main']
handler.command = ['tiktok','tiktok2','tiktokmp3','tiktokmp4','ttsearchslide'];

export default handler