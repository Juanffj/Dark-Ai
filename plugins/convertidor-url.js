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

import fs from "fs";
import axios from "axios";
import FormData from "form-data";

let handler = async m => {
  try {
    const q = m.quoted || m;
    const mime = q.mediaType || "";
    
    if (!/^image/.test(mime)) 
      throw "¡Solo se permiten imágenes!";
    
    const media = await q.download(true);
    const fileSizeInBytes = fs.statSync(media).size;

    if (fileSizeInBytes === 0) {
      await m.reply("archivo vacío");
      await fs.promises.unlink(media);
      return;
    }
    
    if (fileSizeInBytes > 5242880) { // 5 MB máximo para imágenes
      await m.reply("El archivo es demasiado grande, el tamaño máximo es 5 MB");
      await fs.promises.unlink(media);
      return;
    }

    const { data } = await uploadImageShack(media);
    const caption = `*Link directo:*\n${data.link}`;
    await m.reply(caption);
  } catch (e) {
    await m.reply(`${e}`);
  }
}

handler.help = ['tourl'];
handler.tags = ['convertir'];
handler.command = /^(tourl3|upload)$/i;
export default handler;

async function uploadImageShack(path) {
  try {
    const form = new FormData();
    form.append("file", fs.createReadStream(path));
    
    const res = await axios.post("https://api.imageshack.com/v2/images", form, {
      headers: {
        ...form.getHeaders(),
        "Authorization": "Bearer YOUR_ACCESS_TOKEN" // Reemplaza con tu token de acceso
      }
    });

    await fs.promises.unlink(path);
    if (!res.data || !res.data.link) throw "Upload failed";
    return res.data;
  } catch (e) {
    await fs.promises.unlink(path);
    throw "Error en la carga";
  }
}
