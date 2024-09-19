import { URL_REGEX } from '@whiskeysockets/baileys';
import { fileTypeFromBuffer } from 'file-type';
import { Pixiv } from '@ibaraki-douji/pixivts';
import { prepareWAMessageMedia, generateWAMessageFromContent, proto } from '@whiskeysockets/baileys';
const pixiv = new Pixiv();

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('🤍 *`INGRESA NOMBRE DE LA IMG`*');
    await m.react('🕓');

    try {
        let res = await pixivDl(text);
        if (!res) return m.reply('No se encontraron resultados.');

        let results = [];
        for (let i = 0; i < res.media.length; i++) {
            const mediaMessage = await prepareWAMessageMedia({ image: res.media[i] }, { upload: conn.waUploadToServer });
            results.push({
                body: proto.Message.InteractiveMessage.Body.fromObject({
                    text: `*» Nombre:* ${res.caption}\n*» Subido por:* ${res.artist}\n*» Tags:* ${res.tags.join(', ')}`
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: '*[ Pixiv Search ]*' }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: `*Imagen ${i + 1}*`,
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
                            text: `🤍 *Resultados de búsqueda para:* \`${text}\``
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: "_\`Pixiv Search\`_"
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

    } catch {
        await m.react('✖️');
        m.reply('Ocurrió un error.');
    }
};

handler.help = ['pixiv *<búsqueda>*'];
handler.tags = ['search'];
handler.command = /^(pixivthg|pixivdl)$/i;
handler.register = true;

export default handler;

async function pixivDl(query) {
    if (query.match(URL_REGEX)) {
        if (!/https:\/\/www.pixiv.net\/en\/artworks\/[0-9]+/i.test(query)) return null;
        query = query.replace(/\D/g, '');
        let res = await pixiv.getIllustByID(query).catch(() => null);
        if (!res) return null; // Cambiar a 'null' para evitar enviar un mensaje si no se encuentra nada
        let media = [];
        for (let x = 0; x < res.urls.length; x++) media.push(await pixiv.download(new URL(res.urls[x].original)));
        return {
            artist: res.user.name, caption: res.title, tags: res.tags.tags.map(v => v.tag), media
        };
    } else {
        let res = await pixiv.getIllustsByTag(query);
        if (!res.length) return null; // Cambiar a 'null' para evitar enviar un mensaje si no se encuentra nada
        res = res[~~(Math.random() * res.length)].id;
        res = await pixiv.getIllustByID(res);
        let media = [];
        for (let x = 0; x < res.urls.length; x++) media.push(await pixiv.download(new URL(res.urls[x].original)));
        return {
            artist: res.user.name, caption: res.title, tags: res.tags.tags.map(v => v.tag), media
        };
    }
}
