import axios from 'axios'

const query = [
  'canciones%20famosas%20latinoamerica', 
  'musica%20latina%20popular',
  'video%20musical%20latino',
  'canciones%20famosas%20de%20latinoamerica',
  'musica%20latina',
  'videos%20de%20canciones%20latinas',
  'canciones%20viral%20latino',
  'hits%20latinos'
]

let handler = async (m, {
    conn,
    args,
    text,
    usedPrefix,
    command
}) => {
  m.reply('Buscando video...')
  tiktoks(`${query.getRandom()}`).then(a => {
    let cap = a.title
    conn.sendMessage(m.chat, {video: {url: a.no_watermark}, caption: cap}, {quoted: m})
  }).catch(err => {
    m.reply('Error al obtener el video.')
  })
}
handler.help = ['tiktokrandom']
handler.tags = ['dl']
handler.command = /^(tiktokmusic)$/i
handler.limit = true 
handler.register = true

export default handler

async function tiktoks(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://tikwm.com/api/feed/search',
        headers: {
          'Content-Type'
