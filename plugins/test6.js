import { URL_REGEX } from '@whiskeysockets/baileys';
import { fileTypeFromBuffer } from 'file-type';
import { Pixiv } from '@ibaraki-douji/pixivts';
const pixiv = new Pixiv();

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('🤍 *INGRESA NOMBRE DE LA IMG*');
    await m.react('🕓');

    try {
        let res = await pixivDl(text);
        if (!res) return m.reply('Resultados no encontrados.');

        const caption = *» Nombre :* ${res.caption}\n*» Subido por :* ${res.artist}\n*» Tags* : ${res.tags.join(', ')};
        const messages = [];

        for (let i = 0; i < res.media.length; i++) {
            let mime = (await fileTypeFromBuffer(res.media[i])).mime;
            messages.push([Imagen ${i + 1}, caption, res.media[i], [[]], [[]], [[]], [[]]]);
        }

        await m.react('✅');
        await conn.sendCarousel(m.chat, '🤍 Buscador - Imágenes', 🔍 Resultado de: ${text}, text, messages, fakegif3);

    } catch {
        await m.react('✖️');
        m.reply('Error al procesar la solicitud.');
    }
};

handler.help = ['pixiv *<búsqueda>*'];
handler.tags = ['search'];
handler.command = /^(pixiv|pixivdl)$/i;
handler.register = true;

export default handler;

async function pixivDl(query) {
    if (query.match(URL_REGEX)) {
        if (!/https:\/\/www.pixiv.net\/en\/artworks\/[0-9]+/i.test(query)) return null;
        query = query.replace(/\D/g, '');
        let res = await pixiv.getIllustByID(query).catch(() => null);
        if (!res) return null;
        let media = [];
        for (let x = 0; x < res.urls.length; x++) media.push(await pixiv.download(new URL(res.urls[x].original)));
        return {
            artist: res.user.name, caption: res.title, tags: res.tags.tags.map(v => v.tag), media
        };
    } else {
        let res = await pixiv.getIllustsByTag(query);
        if (!res.length) return null;
        res = res[~~(Math.random() * res.length)].id;
        res = await pixiv.getIllustByID(res);
        let media = [];
        for (let x = 0; x < res.urls.length; x++) media.push(await pixiv.download(new URL(res.urls[x].original)));
        return {
            artist: res.user.name, caption: res.title, tags:
 res.tags.tags.map(v => v.tag), media
        };
    }
}import { URL_REGEX } from '@whiskeysockets/baileys';
import { fileTypeFromBuffer } from 'file-type';
import { Pixiv } from '@ibaraki-douji/pixivts';
const pixiv = new Pixiv();

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('🤍 *`INGRESA NOMBRE DE LA IMG`*');
    await m.react('🕓');

    try {
        let res = await pixivDl(text);
        if (!res) return m.reply('Resultados no encontrados.');

        const caption = `*» Nombre :* ${res.caption}\n*» Subido por :* ${res.artist}\n*» Tags* : ${res.tags.join(', ')}`;
        const messages = [];

        // Obtener un máximo de 6 imágenes aleatorias
        const numImages = Math.min(res.media.length, 5);
        const randomIndices = Array.from({ length: res.media.length }, (_, i) => i)
            .sort(() => Math.random() - Math.random())
            .slice(0, numImages);

        for (let i of randomIndices) {
            let mime = (await fileTypeFromBuffer(res.media[i])).mime;
            messages.push([`Imagen ${messages.length + 1}`, caption, res.media[i], [[]], [[]], [[]], [[]]]);
        }

        await m.react('✅');
        await conn.sendCarousel(m.chat, '🤍 Buscador - Imágenes', `🔍 Resultado de: ${text}`, text, messages, fakegif3);

    } catch {
        await m.react('✖️');
        m.reply('Error al procesar la solicitud.');
    }
};

handler.help = ['pixiv *<búsqueda>*'];
handler.tags = ['search'];
handler.command = /^(pixibgv|pixivdl)$/i;
handler.register = true;

export default handler;

async function pixivDl(query) {
    if (query.match(URL_REGEX)) {
        if (!/https:\/\/www.pixiv.net\/en\/artworks\/[0-9]+/i.test(query)) return null;
        query = query.replace(/\D/g, '');
        let res = await pixiv.getIllustByID(query).catch(() => null);
        if (!res) return null;
        let media = [];
        for (let x = 0; x < res.urls.length; x++) media.push(await pixiv.download(new URL(res.urls[x].original)));
        return {
            artist: res.user.name, caption: res.title, tags: res.tags.tags.map(v => v.tag), media
        };
    } else {
        let res = await pixiv.getIllustsByTag(query);
        if (!res.length) return null;
        const randomIllustIds = res.sort(() => Math.random() - Math.random()).slice(0, 5).map(v => v.id); // Obtener hasta 6 IDs aleatorios
        const media = [];

        for (const id of randomIllustIds) {
            let illust = await pixiv.getIllustByID(id);
            if (illust) {
                for (let x = 0; x < illust.urls.length; x++) {
                    media.push(await pixiv.download(new URL(illust.urls[x].original)));
                }
            }
        }

        return {
            artist: illust.user.name, caption: illust.title, tags: illust.tags.tags.map(v => v.tag), media
        };
    }
}
