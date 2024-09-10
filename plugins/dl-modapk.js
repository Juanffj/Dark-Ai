import axios from 'axios'
let handler = async (m, {
   conn,
   usedPrefix,
   command,
   text
}) => {
   try {
      if (!text) return m.reply(`Ejemplo: ${usedPrefix + command} WhatsApp`)
      m.reply(wait)
      let res = await axios.get('https://api.alyachan.dev/api/apk?q='+text+'&apikey=Ariel1')
      let json = res.data
      if (!json.status) return m.reply(Func.jsonFormat(json))
      let { 
      icon, 
      title, 
      size, 
      category, 
      download, 
      rating, 
      url 
      } = json.data[0]
      let response = `
*乂  APK - DESCARGAS* 乂

 ${title}
 
 📦 : ${size}
 🗃️ : ${category}
 ⬇️ : ${download}
 🌟 : ${rating}
`
      await conn.sendMessage(m.chat, {document: {url: url }, mimetype: 'application/vnd.android.package-archive', fileName: title + '.apk', caption: null}, {quoted: m});
   } catch (e) {
      console.log(e)
      return conn.reply(m.chat, Func.jsonFormat(e), m)
   }
}
handler.help = ['apk']
handler.tags = ['dl']
handler.command = /^(apk|app)$/i
handler.limit = 1
export default handler