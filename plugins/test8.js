import { googleImage } from '@bochilteam/scraper';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import("@whiskeysockets/baileys"))["default"];

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(m.chat, `*🤍 Uso Correcto: ${usedPrefix + command} <consulta>*`, m);
  }

  conn.reply(m.chat, '🤍 *Descargando imágenes...*', m, {
    contextInfo: {
      externalAdReply: {
        mediaUrl: null,
        mediaType: 1,
        showAdAttribution: true,
        title: packname || 'Pack Name',
        body: wm || 'Watermark',
        previewType: 0,
        thumbnail: icons || Buffer.from('base64-image-data'),
        sourceUrl: canal || 'https://example.com'
      }
    }
  });

  let imageUrls = [];
  try {
    const results = await googleImage(text);
    console.log('Resultados de googleImage:', results);

    // Verifica la estructura de los resultados
    if (results && Array.isArray(results) && results.length > 0) {
      imageUrls = results.map(result => result.url).filter(url => url);
      console.log('URLs de imágenes filtradas:', imageUrls);
      if (imageUrls.length === 0) throw new Error("No se encontraron resultados de imagen.");
    } else {
      throw new Error("No se encontraron resultados de imagen.");
    }
  } catch (error) {
    console.error('Error al buscar imágenes:', error);
    return conn.reply(m.chat, "❌ Error al buscar imágenes. Por favor, intenta de nuevo.", m);
  }

  // Limita a 5 imágenes y crea el carrusel
  imageUrls = imageUrls.slice(0, 5);
  console.log('URLs finales para el carrusel:', imageUrls);

  const messages = [];
  let count = 1;
  for (const imageUrl of imageUrls) {
    try {
      const { imageMessage } = await generateWAMessageContent({
        image: { url: imageUrl }
      }, {
        upload: conn.waUploadToServer
      });

      messages.push({
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: `Imagen - ${count++}`,
          hasMediaAttachment: true,
          imageMessage: imageMessage
        }),
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: ''
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: text
        })
      });
    } catch (error) {
      console.error('Error al crear el mensaje de imagen:', error);
      continue;
    }
  }

  // Asegúrate de que hay mensajes para enviar
  if (messages.length === 0) {
    return conn.reply(m.chat, "❌ No se encontraron imágenes para mostrar.", m);
  }

  try {
    const responseMessage = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `🤍 Resultado de: ${text}`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: '🔎 Google - Búsquedas'
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false
            }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: messages
            })
          })
        }
      }
    }, {
      quoted: m
    });

    await conn.relayMessage(m.chat, responseMessage.message, {
      messageId: responseMessage.key.id
    });
  } catch (error) {
    console.error('Error al generar o enviar el mensaje de carrusel:', error);
    return conn.reply(m.chat, "❌ Error al enviar el carrusel de imágenes. Por favor, intenta de nuevo.", m);
  }
};

handler.help = ['imagen <consulta>'];
handler.corazones = 2;
handler.tags = ['buscador'];
handler.command = /^(googleimages)$/i;
handler.register = true;

export default handler;
