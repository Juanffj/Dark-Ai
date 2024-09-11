import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import os from 'os'
import fs from 'fs'
import fetch from 'node-fetch'
//const { generateWAMessageFromContent, proto } = (await import('@adiwajshing/baileys')).default

let tags = {
  'main': '𝐈𝐍𝐅𝐎 𝐁𝐎𝐓',
  'buscador': '𝐁𝐔𝐒𝐐𝐔𝐄𝐃𝐀𝐒',
  'search': '𝐒𝐄𝐀𝐑𝐂𝐇',
  'game': '𝐃𝐈𝐕𝐄𝐑𝐒𝐈𝐎𝐍',
  'jadibot': '𝐒𝐔𝐁 𝐁𝐎𝐓𝐒',
  'rpg': '𝐑𝐏𝐆',
  'rg': '𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎',
  'xp': '𝐄𝐗𝐏',
  'sticker': '𝐒𝐓𝐈𝐂𝐊𝐄𝐑𝐒',
  'anime': '𝐀𝐍𝐈𝐌𝐄𝐒',
  'database': '𝐃𝐀𝐓𝐀𝐁𝐀𝐒𝐄',
  'fix': '𝐅𝐈𝐗𝐌𝐒𝐆𝐄𝐒𝐏𝐄𝐑𝐀',
  'grupo': '𝐆𝐑𝐔𝐏𝐎𝐒',
  'nable': '𝐎𝐍 / 𝐎𝐅𝐅', 
  'dl': '𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐒',
  'fun': '𝐇𝐄𝐑𝐑𝐀𝐌𝐈𝐄𝐍𝐓𝐀𝐒',
  'info': '𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐂𝐈𝐎𝐍',
  'nsfw': '𝐍𝐒𝐅𝐖', 
  'owner': '𝐂𝐑𝐄𝐀𝐃𝐎𝐑',
  'mods': '𝐒𝐓𝐀𝐅𝐅',
  'audio': '𝐀𝐔𝐃𝐈𝐎𝐒', 
  'ai': '𝐀𝐈 𝐁𝐎𝐓',
  'convertir': '𝐂𝐎𝐍𝐕𝐄𝐑𝐓𝐈𝐃𝐎𝐑𝐄𝐒',
  'audios': '𝐀𝐔𝐃𝐈𝐎𝐒',
}

let handler = async (m, { conn, usedPrefix: _p }) => {

let Styles = (text, style = 1) => {
  var xStr = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  var yStr = Object.freeze({
    1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
  });
  var replacer = [];
  xStr.map((v, i) => replacer.push({
    original: v,
    convert: yStr[style].split('')[i]
  }));
  var str = text.toLowerCase().split('');
  var output = [];
  str.map(v => {
    const find = replacer.find(x => x.original == v);
    find ? output.push(find.convert) : output.push(v);
  });
  return output.join('');
};

let kenisawa = { key: { remoteJid: 'status@broadcast', participant: '0@s.whatsapp.net' }, message: { orderMessage: { itemCount: 9999999999, status: 1, thumbnail: await conn.resize(await getBuffer("https://i.ibb.co/4dGjmbT/file.jpg"),300,150), surface: 1, message: 'Elaina ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ', orderTitle: wm, sellerJid: '0@s.whatsapp.net' } } }
let user = `@${m.sender.split('@')[0]}`
    
  
let tags = {}
const defaultMenu = {
  before: `ʜᴏʟᴀ %name 🕊️.
sᴏʏ ᴇʟᴀɪɴᴀ ɪᴀ ᴜɴ ʙᴏᴛ ᴅᴇ ᴡʜᴀᴛsᴀᴘᴘ ᴄʀᴇᴀᴅᴏ ᴘᴀʀᴀ ᴀᴅᴍɪɴɪsᴛʀᴀʀ ʏ ᴅɪᴠᴇʀᴛɪʀ ɢʀᴜᴘᴏs ʏ ᴄʜᴀᴛs ᴘʀɪᴠᴀᴅᴏs  

 乂  `+'_*`E` `S` `T` `A` `D` I `S` `T` `I` `C` `A` `S`*_'+` 乂

. .╭── ︿︿︿︿︿ .   .   .   .   .   . 
. .┊ ‹‹ `+'_*`ɴᴏᴍʙʀᴇ`*_'+` :: %name
. .┊•*⁀➷ °... ℛᥱᥲd thι᥉ ...
. .╰─── ︶︶︶︶ ♡⃕  ⌇. . .
 . . ┊⿻ [ `+'_*`ʀᴜᴛɪɴᴀ`*_'+` :: %muptime] . .
 . . ┊⿻ [ `+'_*`ᴘʀᴇғɪᴊᴏ`*_'+` :: <%p>] . .
 . . ┊⿻ [ `+'_*`ᴜsᴜᴀʀɪᴏs`*_'+` :: %totalreg] . .
 . . ┊⿻ [ `+'_*`ᴘʟᴀᴛᴀғᴏʀᴍᴀ`*_'+` :: %platform]. . 
 . . ┊⿻ [ `+'_*`ᴄʀᴇᴀᴅᴏʀ`*_'+` :: ᴋᴇɴɪsᴀᴡᴀᴅᴇᴠ ]. . 
 . . ╰─────────╮

> ᴇʟᴀɪɴᴀ ᴀɪ ʀᴇᴄᴏᴅᴇ ғʀᴏᴍ ɢᴇɴᴇsɪs ʙᴏᴛ (ᴋᴇɴɪsᴀᴡᴀᴅᴇᴠ & ᴀɴɢᴇʟɪᴛᴏ-ᴏғᴄ)
%readmore
`.trimStart(),
  header: '─₍🤍₎❝┊ *`%category`*',
  body: `┊꒱ ☁   %cmd %islimit %isPremium `,
  footer: '╰─── –',
  after: `ᴇʟᴀɪɴᴀ ᴀɪ 1.0`,
}
  try {
    let name = m.pushName || conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'America/Buenos_Aires'
    })
    let time = d.toLocaleTimeString(locale, { timeZone: 'America/Buenos_Aires' })
    time = time.replace(/[.]/g, ':')
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    
    let _uptime
    if (process.send) {
      process.send('uptime')
      _uptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    
    let bjir = 'https://i.ibb.co/4dGjmbT/file.jpg'
    let totalreg = Object.keys(global.db.data.users).length
    let platform = os.platform()
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag].toUpperCase()) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Ⓛ)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.getName(conn.user.jid),
      name, date, time, platform, _p, totalreg,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

 conn.sendMessage(m.chat, {
      image: { url: "https://i.ibb.co/4dGjmbT/file.jpg" },
//            mimetype: 'video/mp4',
            fileLength: 100000000,
            caption: Styles(text),
//            gifPlayback: true,
//            gifAttribution: 5,
            /*contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    forwardingScore: 2023,
                    title: 'ᴍ ᴇ ɴ ᴜ  ʙ ᴏ ᴛ  ᴇ ʟ ɪ ɴ ᴀ',
                    thumbnailUrl: 'https://i.ibb.co/RB4mPmH/file.jpg',
                    sourceUrl: canal,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    mentionedJid: [m.sender]
                     }
                     }*/
                     }, { quoted: m })
    } catch (e) {
    conn.reply(m.chat, 'Perdon, el menú tiene un error', m)
    throw e
  }
}
handler.command = /^(allmenu|menuall|menunya|reyz)$/i
handler.daftar = false

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}