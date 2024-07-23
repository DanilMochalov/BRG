require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    const username = ctx.from.username || 'Пользователь';
    ctx.reply(
        `Привет, ${username}! Добро пожаловать в наш бот для покупки битов. Чем могу помочь?`,
        Markup.inlineKeyboard([
            [Markup.button.callback('Купить бит', 'buy_beat')],
            [Markup.button.callback('Связаться с админом', 'contact_admin')]
        ]).extra()
    );
});

bot.action('buy_beat', (ctx) => {
    ctx.reply('Пока что эта кнопка не настроена.');
});

bot.action('contact_admin', (ctx) => {
    const user = ctx.from;
    const message = `Пользователь @${user.username || user.id} хочет связаться с администратором.`;
    bot.telegram.sendMessage('587649362', message);
    ctx.reply('Ваш запрос отправлен администратору.');
});

bot.launch();
