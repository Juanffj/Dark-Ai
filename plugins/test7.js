import{ prepareWAMessageMedia } from '@whiskeysockets/baileys';
import pkg from '@whiskeysockets/baileys';
import axios from 'axios';
const { generateWAMessageFromContent, proto } = pkg
const handler = async (m, { conn, usedPrefix, command }) => {
    // جلب بيانات كريستيانو رونالدو من الملف JSON
    const messi = (await axios.get('https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/CristianoRonaldo.json')).data;
    const goat = messi[Math.floor(messi.length * Math.random())];

    // إرسال رد فعل الرموز التعبيرية
    await conn.sendMessage(m.chat, { react: { text: '7️⃣', key: m.key } });

    // إعداد رسالة الوسائط
    const mediaMessage = await prepareWAMessageMedia({ image: { url: goat } }, { upload: conn.waUploadToServer });

    let msg =   const _0x1ca5c6 = generateWAMessageFromContent(_0x10bd40.chat, {
    'viewOnceMessage': {
      'message': {
        'messageContextInfo': {
          'deviceListMetadata': {},
          'deviceListMetadataVersion': 0x2
        },
        'interactiveMessage': proto.Message.InteractiveMessage.fromObject({
          'body': proto.Message.InteractiveMessage.Body.create({
            'text': "🤍 Resultado de : " + _0x27db11
          }),
          'footer': proto.Message.InteractiveMessage.Footer.create({
            'text': "🔎 Pinterest - Busquedas"
          }),
          'header': proto.Message.InteractiveMessage.Header.create({
            'hasMediaAttachment': false
          }),
          'carouselMessage': proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            'cards': [..._0x51323f]
          })
        })
      }
    }
  }, {
    'quoted': _0x10bd40
  });
  await _0x10bd40.react(done);
  await _0x9c7141.relayMessage(_0x10bd40.chat, _0x1ca5c6.message, {
    'messageId': _0x1ca5c6.key.id })
    } 
handler.help = ['Cristiano6', 'cr7', 'Ronaldo'];
handler.tags = ['internet'];
handler.command = /^(test7)$/i;

export default handler;