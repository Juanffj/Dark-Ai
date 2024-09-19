import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import FormData from "form-data";
import Jimp from "jimp";
const {
  proto,
  generateWAMessageFromContent,
  prepareWAMessageMedia,
  generateWAMessageContent,
  getDevice
} = (await import("@whiskeysockets/baileys")).default;

let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, '*Ingresa el texto de lo que quieres buscar en YouTube Music*', m);
    await m.react('🕒');

    try {
        let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/youtube-music-search?text=${encodeURIComponent(text)}`);
        let json = await api.json();
        if (!Array.isArray(json) || json.length === 0) return conn.reply(m.chat, 'No se encontraron resultados.', m);

        let results = [];

        // Preparar los mensajes de cada resultado para el carrusel
        for (let i = 0; i < json.length; i++) {
            const mediaMessage = await prepareWAMessageMedia({ image: json[i].thumbnail }, { upload: conn.waUploadToServer });
            results.push({
                body: proto.Message.InteractiveMessage.Body.fromObject({
                    text: `*Título:* ${json[i].title}\n*Artista:* ${json[i].artists.join(', ')}\n*Álbum:* ${json[i].album}\n*Duración:* ${json[i].duration.label}\n*Url:* ${json[i].link}`
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: '*[ GenesisBot By Angel-OFC ]*' }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: `*\`Nro: ${i + 1}\`*`,
                    hasMediaAttachment: true,
                    imageMessage: mediaMessage.imageMessage
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ buttons: [] }),
            });
        }

        // Enviar el mensaje en carrusel
        const messageContent = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: `🤍 \`${command}\` 🤍`
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: "_\`ᴀ\` \`ɴ\` \`ɪ\` \`ᴍ\` \`ᴇ\` - \`2\` \`0\` \`2\` \`4\`_"
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            hasMediaAttachment: false
                        }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                            cards: results
                        }),
                        contextInfo: {
                            mentionedJid: [m.sender],
                            forwardingScore: 999,
                            isForwarded: true,
                        }
                    })
                }
            }
        }, {
            quoted: m
        });

        await conn.sendMessage(m.chat, messageContent, { quoted: m });
        await m.react('✅');

    } catch (error) {
        console.error(error);
        conn.reply(m.chat, 'Error al procesar la solicitud', m);
        await m.react('✖️');
    }
};

handler.help = ['ytmssearch <txt>'];
handler.estrellas = 1;
handler.tags = ['search'];
handler.command = ['youtubemusicsearch', 'ytmssearch'];

export default handler;
