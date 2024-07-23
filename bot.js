require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    const username = ctx.from.username || ctx.from.first_name;
    ctx.reply(`Привет, ${username}!`, Markup.inlineKeyboard([
        Markup.button.callback('Купить бит', 'buy_beat'),
        Markup.button.callback('Связаться с админом', 'contact_admin')
    ]));
});

bot.action('buy_beat', (ctx) => {
    ctx.reply('Функция "Купить бит" пока не реализована.');
});

bot.action('contact_admin', (ctx) => {
    const userId = '587649362'; 
    const username = ctx.from.username || ctx.from.first_name;
    bot.telegram.sendMessage(userId, `Пользователь ${username} хочет связаться с администратором.`);
    ctx.reply('Ваше сообщение отправлено администратору.');
});

bot.launch();
