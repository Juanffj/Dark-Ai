/* import fs from "fs"
import fetch from "node-fetch"
import FormData from "form-data"

let handler = async m => {
  try {
    const q = m.quoted || m
    const mime = q.mediaType || ""    
    if (!/image|video|audio|sticker|document/.test(mime)) 
      throw "¡No se proporcionan medios!"
    const media = await q.download(true)
    const fileSizeInBytes = fs.statSync(media).size    
    if (fileSizeInBytes === 0) {
      await m.reply("archivo vacio")
      await fs.promises.unlink(media)
      return
    }   
    if (fileSizeInBytes > 1073741824) {
      await m.reply("El archivo es demasiado grande, el tamaño máximo es 1 GB")
      await fs.promises.unlink(media)
      return
    }    
    const { files } = await uploadUguu(media)
    const caption = `*Link:*\n${files[0]?.url}`
    await m.reply(caption)
  } catch (e) {
    await m.reply(`${e}`)
  }
}

handler.help = ['tourl']
handler.tags = ['convertir']
handler.command = /^(tourl3|upload)$/i
export default handler

async function uploadUguu(path) {
  try {
    const form = new FormData()
    form.append("files[]", fs.createReadStream(path))   
    const res = await fetch("https://uguu.se/upload.php", {
      method: "POST",
      headers: form.getHeaders(),
      body: form
    })    
    const json = await res.json()
    await fs.promises.unlink(path)   
    return json
  } catch (e) {
    await fs.promises.unlink(path)
    throw "Upload failed"
  }
} */

import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';

let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';

  await m.react('🕒');
  if (!mime.startsWith('image/')) {
    return m.reply('Responde a una *Imagen.*');
  }

  let media = await q.download();
  let formData = new FormData();
  formData.append('file', fs.createReadStream(media));

  try {
    let api = await axios.post('https://freeimage.host/api/upload', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    await m.react('✅');
    if (api.data.success) {
      let imgData = api.data.image;
      let txt = '`F R E E I M A G E - U P L O A D E R`\n\n';
      txt += `*🔖 Titulo* : ${q.filename || 'x'}\n`;
      txt += `*🔖 Enlace* : ${imgData.url}\n`;
      txt += `*🔖 Directo* : ${imgData.url}\n`; // Puedes ajustar esto según sea necesario
      txt += `*🔖 Mime* : ${mime}\n`;
      txt += `*🔖 File* : ${q.filename || 'x.jpg'}\n`;
      txt += `*🔖 Extension* : ${imgData.extension}\n`;
      txt += `© By: Genesis`;
      await conn.sendFile(m.chat, imgData.url, 'freeimage.jpg', txt, m);
    } else {
      await m.reply('Error al subir la imagen.');
    }
  } catch (error) {
    await m.reply('Error en la carga: ' + error.message);
  }
};

handler.tags = ['convertir'];
handler.help = ['tofreeimage'];
handler.command = /^(tourl3)$/i;
handler.register = true;
export default handler;
