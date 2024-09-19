import fetch from 'node-fetch';
import axios from 'axios';
import {
  proto,
  generateWAMessageFromContent,
  prepareWAMessageMedia
} from "@whiskeysockets/baileys";

let handler = async (m, { command, conn }) => {
  await m.react('🕒');

  try {
    // Fetching the Waifu image
    const waifuRes = await fetch('https://api.waifu.pics/sfw/waifu');
    if (!waifuRes.ok) return;
    const waifuJson = await waifuRes.json();
    if (!waifuJson.url) return;

    // Fetching additional images
    const animeRes = await axios.get(`https://raw.githubusercontent.com/WOTCHITA/YaemoriBot-MD/master/src/JSON/anime-${command}.json`);
    const animeImages = animeRes.data;

    if (!Array.isArray(animeImages) || animeImages.length === 0) {
      throw new Error('No se encontraron imágenes');
    }

    // Shuffle and select images
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };
    shuffleArray(animeImages);
    const selectedImages = [waifuJson.url, ...animeImages.slice(0, 9)]; // Add the waifu image and 9 more

    // Prepare the carousel results
    const results = await Promise.all(selectedImages.map(async (imageUrl) => {
      const imageResponse = await fetch(imageUrl);
      if (!imageResponse.ok) throw new Error('Error al descargar la imagen');
      const mediaMessage = await prepareWAMessageMedia({ image: imageUrl }, { upload: conn.waUploadToServer });
      return {
        body: proto.Message.InteractiveMessage.Body.fromObject({ text: null }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: '*[ GenesisBot By Angel-OFC ]*' }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: '*Imagen*',
          hasMediaAttachment: true,
          imageMessage: mediaMessage.imageMessage
        }),
      };
    }));

    // Send the carousel message
    const messageContent = generateWAMessageFromContent(m.chat, {
      interactiveMessage: proto.Message.InteractiveMessage.fromObject({
        body: proto.Message.InteractiveMessage.Body.create({
          text: `🤍 \`${command}\` 🤍`
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
