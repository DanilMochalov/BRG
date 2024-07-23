require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const fs = require('fs');
const path = require('path');

const bot = new Telegraf(process.env.BOT_TOKEN);

const beatsFilePath = path.resolve(__dirname, 'beats.json');
const beats = JSON.parse(fs.readFileSync(beatsFilePath, 'utf8'));

bot.start((ctx) => {
    const username = ctx.from.username || ctx.from.first_name;
    ctx.reply(`Привет, ${username}! 🎉
    Добро пожаловать в мир крутых битов! Мы рады видеть тебя здесь. Если ты готов открыть для себя потрясающие треки и 
    уникальные ритмы, просто нажми на кнопку ниже. Давай сделаем твой день музыкально незабываемым! 🎵`, Markup.inlineKeyboard([
        Markup.button.callback('Купить бит', 'buy_beat'),
        Markup.button.callback('Связаться с админом', 'contact_admin')
    ]));
});

bot.action('buy_beat', async (ctx) => {
    const buttons = beats.map(beat => Markup.button.callback(beat.name, `select_beat_${beat.id}`));
    await ctx.reply('Выберите бит:', Markup.inlineKeyboard(buttons));
});

bot.action(/select_beat_(.+)/, async (ctx) => {
    const beatId = ctx.match[1];
    const beat = beats.find(b => b.id === beatId);

    if (beat) {
        await ctx.reply(`${beat.name}\n${beat.description}\nЦена: ${beat.price}`, Markup.inlineKeyboard([
            Markup.button.callback('Купить', `buy_${beat.id}`)
        ]));
    } else {
        await ctx.reply('Бит не найден.');
    }
});

bot.action(/buy_(.+)/, async (ctx) => {
    const beatId = ctx.match[1];
    const beat = beats.find(b => b.id === beatId);

    if (beat) {
        const userId = '587649362'; 
        const username = ctx.from.username || ctx.from.first_name;
        const userLink = `<a href="tg://user?id=${ctx.from.id}">${username}</a>`;
        await bot.telegram.sendMessage(userId, `${userLink} хочет купить ${beat.name}.`);
        await ctx.reply(`Спасибо за то, что выбрал наш сервис! 🎉 Твой заказ уже передан администратору, 
        и мы сделаем всё возможное, чтобы ты остался доволен. Мы свяжемся с тобой как можно скорее. Если 
        у тебя есть ещё какие-либо вопросы или пожелания, не стесняйся обращаться. Благодарим за доверие 
        и приятного прослушивания! 🎧
        `);
    } else {
        await ctx.reply('Бит не найден.');
    }
});

bot.action('contact_admin', async (ctx) => {
    const userId = '587649362'; 
    const username = ctx.from.username || ctx.from.first_name;
    const userLink = `<a href="tg://user?id=${ctx.from.id}">${username}</a>`;
    await bot.telegram.sendMessage(userId, `${userLink} хочет связаться с администратором.`);
    await ctx.reply('Ваше сообщение отправлено администратору.');
});

bot.launch();
