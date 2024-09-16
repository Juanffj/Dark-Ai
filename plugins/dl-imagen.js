import {googleImage} from '@bochilteam/scraper';
const handler = async (m, {conn, text, usedPrefix, command}) => {
if (!text) return conn.reply(m.chat, `*🤍 Uso Correcto: ${usedPrefix + command} la playa*`, m, rcanal);
await m.react('🕓');
let capt = ``
const res = await googleImage(text);
const image = await res.getRandom();
const link = image;
const messages = [['Imagen 1', dev, await res.getRandom(),
[[]], [[]], [[]], [[]]], ['Imagen 2', dev, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 3', dev, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 4', dev, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 5', dev, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 6', dev, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 7', dev, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 8', dev, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 8', dev, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 9', dev, await res.getRandom(), [[]], [[]], [[]], [[]]], ['Imagen 10', dev, await res.getRandom(), [[]], [[]], [[]], [[]]]]
await m.react('✅');
await conn.sendCarousel(m.chat, '🤍 Buscador - Imagenes', `🔍 Resultado de: ${text}`, text, messages, m, null, fake);
};
handler.help = ['imagen <query>'];
handler.tags = ['buscador', 'tools', 'descargas'];
handler.command = ['image', 'imagen'];
handler.register = true;
export default handler;