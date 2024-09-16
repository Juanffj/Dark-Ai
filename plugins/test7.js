import yts from 'yt-search'
const {
  proto,
  generateWAMessageFromContent,
  prepareWAMessageMedia,
  generateWAMessageContent,
  getDevice
} = (await import("@whiskeysockets/baileys")).default;

var handler = async (m, { text, conn, args, command, usedPrefix }) => {

if (!text) return conn.reply(m.chat, `🍟 *Escriba el título de algún vídeo de Youtube*\n\nEjemplo, ${usedPrefix + command} Ai Yaemori`, m, rcanal, )

conn.reply(m.chat, wait, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
title: packname,
body: wm,
previewType: 0, thumbnail: icons,
sourceUrl: channel }}})

let results = await yts(text)
let tes = results.all
let teks = results.all.map(v => {
switch (v.type) {
case 'video': return `🍟 *Título:* 
» ${v.title}

🔗 *Enlace:* 
» ${v.url}

🕝 *Duración:*
» ${v.timestamp}

🚩 *Subido:* 
» ${v.ago}

👀 *Vistas:* 
» ${v.views}`}}).filter(v => v).join('\n\n••••••••••••••••••••••••••••••••••••\n\n')

conn.sendFile(m.chat, tes[0].thumbnail, 'yts.jpeg', teks, fkontak, m)

}
handler.help = ['ytsearch']
handler.tags = ['buscador']
handler.command = ['playlist', 'ytbuscar', 'yts', 'ytsearch']

handler.register = true
handler.estrellas = 1

export default handler

import yts from 'yt-search'

var handler = async (m, { text, conn, args, command, usedPrefix }) => {

if (!text) return conn.reply(m.chat, `> _*Escriba el título de algún vídeo de Youtube*_\n\nEjemplo, ${usedPrefix + command} Elaina Edit`, m, rcanal, )

try {
				let yts = require("yt-search")
				let search = await yts(text);
				let videos = search.all;
				console.log(videos)
				if (!videos || videos.length === 0) {
					m.reply('No Video Found');
					return;
				}
				// Choose between 1 and 5 videos at random
				const numVideos = Math.min(videos.length, Math.floor(Math.random() * 10) + 1);
				const selectedVideos = [];
				while (selectedVideos.length < numVideos) {
					const randomIndex = Math.floor(Math.random() * videos.length);
					const randomVideo = videos.splice(randomIndex, 1)[0]; // Avoid selecting the same videos
					selectedVideos.push(randomVideo);
				}
				let push = [];
				for (let i = 0; i < selectedVideos.length; i++) {
					let video = selectedVideos[i];
					let cap = `Titulo : ${video.title}`;
					const mediaMessage = await prepareWAMessageMedia({
						image: {
							url: video.thumbnail
						}
					}, {
						upload: conn.waUploadToServer
					});
					push.push({
						body: proto.Message.InteractiveMessage.Body.fromObject({
							text: cap
						}),
						footer: proto.Message.InteractiveMessage.Footer.fromObject({
							text: "𝑮𝒆𝒏𝒆𝒔𝒊𝒔-𝑩𝒐𝒕 - 𝑪𝒉𝒂𝒏𝒏𝒆𝒍"
						}),
						header: proto.Message.InteractiveMessage.Header.create({
							title: `Video ${i + 1}`,
							subtitle: '',
							hasMediaAttachment: true,
							...mediaMessage
						}),
						nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
							buttons: [{
								"name": "cta_copy",
								"buttonParamsJson": `{"display_text":"Copiar Link","id":"1234","copy_code":"${video.url}"}`
							}]
						})
					});
				}
				const msg = generateWAMessageFromContent(m.chat, {
					viewOnceMessage: {
						message: {
							messageContextInfo: {
								deviceListMetadata: {},
								deviceListMetadataVersion: 2
							},
							interactiveMessage: proto.Message.InteractiveMessage.fromObject({
								body: proto.Message.InteractiveMessage.Body.create({
									text: "𝑮𝒆𝒏𝒆𝒔𝒊𝒔-𝑩𝒐𝒕 - 𝑪𝒉𝒂𝒏𝒏𝒆𝒍"
								}),
								footer: proto.Message.InteractiveMessage.Footer.create({
									text: "𝑮𝒆𝒏𝒆𝒔𝒊𝒔-𝑩𝒐𝒕 - 𝑪𝒉𝒂𝒏𝒏𝒆𝒍"
								}),
								header: proto.Message.InteractiveMessage.Header.create({
									hasMediaAttachment: false
								}),
								carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
									cards: push
								}),
								contextInfo: {
									mentionedJid: [m.sender],
									forwardingScore: 999,
									isForwarded: true,
									forwardedNewsletterMessageInfo: {
										newsletterJid: "120363220939514640@newsletter",
										newsletterName: "𝑮𝒆𝒏𝒆𝒔𝒊𝒔-𝑩𝒐𝒕 - 𝑪𝒉𝒂𝒏𝒏𝒆𝒍",
										serverMessageId: 143
									}
								}
							})
						}
					}
				}, {
					quoted: fakegif3
				});
				await conn.relayMessage(m.chat, msg.message, {
					messageId: msg.key.id
				});
			} catch (e) {
				console.error(e);
				await m.reply(`Error`);
			}
}
handler.help = ['ytsearch']
handler.tags = ['buscador']
handler.command = ['playlist2', 'ytbuscar2', 'yts2', 'ytsearch2']

handler.register = true