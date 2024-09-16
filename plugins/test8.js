import { googleImage } from '@bochilteam/scraper';
const {
  generateWAMessageContent,
  generateWAMessageFromContent,
  proto
} = (await import("@whiskeysockets/baileys"))["default"];

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*🤍 Uso Correcto: ${usedPrefix + command} La playa*`;

  conn.reply(m.chat, '🤍 *Descargando imágenes...*', m, {
    contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, showAdAttribution: true,
    title: packname,
    body: wm,
    previewType: 0, thumbnail: icons,
    sourceUrl: canal } }
  });

  let imageUrls = [];
  try {
    const results = await googleImage(text);
    console.log('Results from googleImage:', results); // Debugging line

    if (results && results.length > 0) {
      imageUrls = results.map(result => result.url).filter(url => url); // Filter out invalid URLs
      console.log('Filtered image URLs:', imageUrls); // Debugging line
      if (imageUrls.length === 0) throw new Error("No image results found.");
    } else {
      throw new Error("No image results found.");
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    return conn.reply(m.chat, "❌ Error al buscar imágenes. Por favor, intenta de nuevo.", m);
  }

  // Ensure we have images to show
  if (imageUrls.length === 0) {
    return conn.reply(m.chat, "❌ No se encontraron imágenes para mostrar.", m);
  }

  // Shuffle and limit to 5 images
  imageUrls = imageUrls.slice(0, 5);
  console.log('Final image URLs for carousel:', imageUrls); // Debugging line

  // Generate carousel messages
  const messages = [];
  let count = 1;
  for (const imageUrl of imageUrls) {
    try {
      const { imageMessage } = await generateWAMessageContent({
        'image': {
          'url': imageUrl
        }
      }, {
        'upload': conn.waUploadToServer
      });

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

  // Ensure messages array is not empty
  if (messages.length === 0) {
    return conn.reply(m.chat, "❌ No se encontraron imágenes para mostrar.", m);
  }

  const responseMessage = generateWAMessageFromContent(m.chat, {
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
            'cards': messages
          })
        })
      }
    }
  }, {
    'quoted': m
  });

  await conn.relayMessage(m.chat, responseMessage.message, {
    'messageId': responseMessage.key.id
  });
};

handler.help = ['imagen <query>'];
handler.corazones = 2;
handler.tags = ['buscador'];
handler.command = /^(image|imagen)$/i;
handler.register = true;

export default handler;
