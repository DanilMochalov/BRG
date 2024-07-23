require('dotenv').config();
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Добро пожаловать!'));
bot.help((ctx) => ctx.reply('Как я могу помочь?'));
bot.on('text', (ctx) => ctx.reply(`Вы сказали: ${ctx.message.text}`));

bot.launch();
