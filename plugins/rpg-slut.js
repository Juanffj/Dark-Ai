let cooldowns = {}

let handler = async (m, { conn, isPrems }) => {
let user = global.db.data.users[m.sender]
  let tiempoEspera = 5 * 60
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    const tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
    conn.reply(m.chat, `✧ Espera *${tiempoRestante}* para volver a usar el comando.`, m, rcanal)
    return
  }
  let resultado = Math.floor(Math.random() * 1000)
  cooldowns[m.sender] = Date.now()
  await conn.reply(m.chat, `✧ ${pickRandom(works)} *${toNum(resultado)}* ( *${resultado}* ) Corazónes ✧.`, m, rcanal)
  user.corazones += resultado
}

handler.help = ['slut']
handler.tags = ['rpg']
handler.command = ['slut']
handler.register = true 
export default handler

function toNum(number) {
    if (number >= 1000 && number < 1000000) {
        return (number / 1000).toFixed(1) + 'k'
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M'
    } else if (number <= -1000 && number > -1000000) {
        return (number / 1000).toFixed(1) + 'k'
    } else if (number <= -1000000) {
        return (number / 1000000).toFixed(1) + 'M'
    } else {
        return number.toString()
    }
}

function segundosAHMS(segundos) {
  let minutos = Math.floor((segundos % 3600) / 60)
  let segundosRestantes = segundos % 60
  return `${minutos} minutos y ${segundosRestantes} segundos`
}

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}

const works = [
   "Le acaricias el pene a un cliente habitual y ganas",
   "El admin se viene en tu boca, ganas",
   "El admin te manosea las tetas, ganas",
   "Te vistieron de neko kwai en publico, ganas",
   "Te haces la Loli del admin por un día, ganas",
   "Te dejas manosear por un extraño por dinero, ganas",
   "Eres la maid del admin por un día, ganas",
   "Un gay te paga para que lo hagas con el, ganas",
   "Tu SuggarMommy muere, ganas",
   "Tu SuggarDaddy muere, ganas",
   "Dejaste que un extraño te toque el culo por dinero, ganas",
   "Dejaste que un extraño te toque el culo por dinero, ganas",
   "Alguien te pone una correa y eres su mascota sexual por una hora, ganas",
   "Un loco te usa para sus experimentos y pociones, ganas",
   "Te vistieron de colegiala en público, ganas",
   "Te vistieron de una milf en público, ganas",
   "Golpeas a una seguidora de Taylor, ganas",
   "Ahora trabajas como exclavista, ganas",
   "Los integrantes del grupo te usaron como saco de cum, ganas",
   "Eres la perra de los admins por un día, ganas",
   "Quemas vivo a un furro, ganas"
]