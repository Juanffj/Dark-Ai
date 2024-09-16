import { googleImage } from '@bochilteam/scraper';
const {
  generateWAMessageContent,
  generateWAMessageFromContent,
  proto
} = (await import("@whiskeysockets/baileys"))["default"];

let handler = async (message, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(message.chat, "🤍 *¿Qué quieres buscar en Google?*", message, rcanal);
  }

  await message.react(rwait);

  async function createImageMessage(imageUrl) {
    if (!imageUrl) {
      throw new Error("Image URL is undefined or null.");
    }
    const { imageMessage } = await generateWAMessageContent({
      'image': {
        'url': imageUrl
      }
    }, {
      'upload': conn.waUploadToServer
    });
    return imageMessage;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  let imageUrls = [];
  try {
    const results = await googleImage(text);
    if (results && results.length > 0) {
      imageUrls = results.map(result => result.url);
    } else {
      throw new Error("No image results found.");
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    return conn.reply(message.chat, "❌ Error al buscar imágenes. Por favor, intenta de nuevo.", message);
  }

  shuffleArray(imageUrls);
  const imagesToSend = imageUrls.slice(0, 5);
  const messages = [];

  let count = 1;
  for (const imageUrl of imagesToSend) {
    try {
      const imageMessage = await createImageMessage(imageUrl);
      messages.push({
        'body': proto.Message.InteractiveMessage.Body.fromObject({
          'text': `Imagen - ${count++}`
        }),
        'footer': proto.Message.InteractiveMessage.Footer.fromObject({
          'text': text
        }),
        'header': proto.Message.InteractiveMessage.Header.fromObject({
          'title': '',
          'hasMediaAttachment': true,
          'imageMessage': imageMessage
        }),
        'nativeFlowMessage': proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          'buttons': [{
            'name': "cta_url",
            'buttonParamsJson': `{"display_text":"url 📫","Url":"https://www.google.com/search?hl=en&tbm=isch&q=${encodeURIComponent(text)}","merchant_url":"https://www.google.com/search?hl=en&tbm=isch&q=${encodeURIComponent(text)}"}`
          }]
        })
      });
    } catch (error) {
      console.error('Error creating image message:', error);
      continue;
    }
  }

  const responseMessage = generateWAMessageFromContent(message.chat, {
    'viewOnceMessage': {
      'message': {
        'messageContextInfo': {
          'deviceListMetadata': {},
          'deviceListMetadataVersion': 2
        },
        'interactiveMessage': proto.Message.InteractiveMessage.fromObject({
          'body': proto.Message.InteractiveMessage.Body.create({
            'text': `🤍 Resultado de: ${text}`
          }),
          'footer': proto.Message.InteractiveMessage.Footer.create({
            'text': '🔎 Google - Búsquedas'
          }),
          'header': proto.Message.InteractiveMessage.Header.create({
            'hasMediaAttachment': false
          }),
          'carouselMessage': proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            'cards': [...messages]
          })
        })
      }
    }
  }, {
    'quoted': message
  });

  await message.react(done);
  await conn.relayMessage(message.chat, responseMessage.message, {
    'messageId': responseMessage.key.id
  });
};

handler.help = ["googleimages"];
handler.tags = ["search"];
handler.premium = 1;
handler.register = true;
handler.command = /^(googleimages)$/i;

export default handler;
