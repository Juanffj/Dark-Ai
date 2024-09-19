import fetch from 'node-fetch';
import {
  proto,
  generateWAMessageFromContent,
  prepareWAMessageMedia
} from "@whiskeysockets/baileys";

let handler = async (m, { conn }) => {
  await m.react('🕒');

  try {
    // Número de imágenes a solicitar
    const imageCount = 10;
    const results = [];

    // Obtener imágenes de la API
    for (let i = 0; i < imageCount; i++) {
      const res = await fetch('https://api.waifu.pics/sfw/waifu');
      if (!res.ok) throw new Error('Error al obtener imagen de waifu');
      const json = await res.json();
      if (!json.url) throw new Error('No se encontró la URL de la imagen');
      
      // Preparar el mensaje de la imagen
      const mediaMessage = await prepareWAMessageMedia({ image: json.url }, { upload: conn.waUploadToServer });
      results.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({ text: null }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: '*[ GenesisBot By Angel-OFC ]*' }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: '*Imagen de Waifu*',
          hasMediaAttachment: true,
          imageMessage: mediaMessage.imageMessage
        }),
      });
    }

    // Enviar el mensaje en carrusel
    const messageContent = generateWAMessageFromContent(m.chat, {
      interactiveMessage: proto.Message.InteractiveMessage.fromObject({
        body: proto.Message.InteractiveMessage.Body.create({
          text: `🤍 Waifus para ti 🤍`
        }),
        footer: proto.Message.InteractiveMessage.Footer.create({
          text: "_\`ᴀ\` \`ɴ\` \`ɪ\` \`ᴍ\` \`ᴇ\` - \`2\` \`0\` \`2\` \`4\`_"
        }),
        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
          cards: results
        }),
      })
    });

    await conn.sendMessage(m.chat, messageContent, { quoted: m });
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'Error al procesar la solicitud', m);
  }
};

handler.help = ['waifu'];
handler.tags = ['anime'];
handler.command = ['waifu'];
handler.register = true;

export default handler;
