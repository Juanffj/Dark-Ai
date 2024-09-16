import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';
const {
  proto,
  generateWAMessageFromContent,
  prepareWAMessageMedia,
  generateWAMessageContent,
  getDevice
} = (await import("@whiskeysockets/baileys")).default;

let handler = async (m, { command, conn, usedPrefix }) => {
await m.react('🕒');

  try {
    // Fetch the JSON data from the URL
    const res = (await axios.get(`https://raw.githubusercontent.com/Incongnito45/ExoticoBot-MD/master/NODE_EXOTICO_JSON/node-exotico-anime-boy/hot-${command}.json`)).data;
    
    // Ensure the array contains items
    if (!Array.isArray(res) || res.length === 0) {
      throw new Error('No se encontraron imágenes');
    }

    // Select random images
    const images = res.slice(0, 6); // Limiting to 6 images for the carousel

    // Prepare the results for the carousel
    const results = await Promise.all(images.map(async (imageUrl, index) => {
      const imageResponse = await fetch(imageUrl);
      if (!imageResponse.ok) {
        throw new Error('Error al descargar la imagen');
      }
      const imageBuffer = await imageResponse.buffer();
      const mediaMessage = await prepareWAMessageMedia({ image: imageBuffer }, { upload: conn.waUploadToServer });
      return {
        body: proto.Message.InteractiveMessage.Body.fromObject({ text: null }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: 'Desliza para ver más' }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: `Imagen ${index + 1}`,
          hasMediaAttachment: true,
          imageMessage: mediaMessage.imageMessage
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] })
      };
    }));

    // Send the carousel message
    const messageContent = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `🔥🐻🍃 _${command}_ 🍃🐻🔥`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: "Desliza para ver más imágenes"
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false
            }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: results
            })
          })
        }
      }
    }, {
      quoted: m
    });

    await conn.relayMessage(m.chat, messageContent.message, {
      messageId: messageContent.key.id
    });

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `❌️ *OCURRIÓ UN ERROR:* ${error.message}`, m);
  }
};

handler.command = handler.help = ['takeda', 'asuma', 'endeavor'];
handler.tags = ['nsfw'];

export default handler;
