import { Telegraf, Markup } from 'telegraf';

const TOKEN = "7578510001:AAHwnlq-eXvcMzGZdNvzM-BgeCWLjL33Bv4";
const web_link='http://t.me/telbingo_bot/WaseBingo';

const bot = new Telegraf(TOKEN);

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

bot.catch((err, ctx) => {
    console.error(`Error in update handling for ${ctx.updateType}`, err);
    ctx.reply('Oops! Something went wrong. Please try again later.');
});

bot.start((ctx) => {
    const options = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: '🎮 Play Game', callback_data: 'play' },
                    { text: '📝 Register', callback_data: 'register' },
                ],
                [
                    { text: '💰 Check Balance', callback_data: 'check_balance' },
                    { text: '💳 Deposit', callback_data: 'deposit' },
                ],
                [
                    { text: '📞 Contact Us', callback_data: 'contact_us' },
                    { text: '📜 Game Rules', callback_data: 'rules' },
                ],
                [
                    { text: '🎉 Invite', callback_data: 'invite' },
                ],
            ],
        },
    };
    ctx.reply('Choose an option:', options);
});

bot.command('play', async (ctx) => {
    await playGame(ctx);
});

bot.on('contact', async (ctx) => {
    const contact = ctx.message.contact;
    await ctx.reply('You are registered successfully! 🎮 Click the button below to start the game.', {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🎮 Play Game', callback_data: 'play' }],
            ],
        },
    });
});
const playGame = async (ctx) => {
    try {
        await ctx.reply('🎮 The game is starting! Select an amount:', {
            reply_markup: {
                inline_keyboard: [
                    [
                      Markup.button.url('🎮 Play 10',web_link),
                        Markup.button.url('🎮 Play 20',web_link),
                    ],
                    [
                        Markup.button.url('🎮 Play 50',web_link),
                        Markup.button.url('🎮 Play 100',web_link),
                    ],
                    [
                        Markup.button.url('🎮 Play Demo',web_link),
                    ],
                ],
            },
        });
    } catch (error) {
        console.error('Error in playGame function:', error);
        await ctx.reply('An error occurred while starting the game. Please try again.');
    }
};

bot.on('callback_query', async (ctx) => {
    const action = ctx.callbackQuery.data;
    const currentId=ctx.from.id;

    try {
        switch (action) {
            case 'play':
                await playGame(ctx);
                break;
            case 'play10':
                await ctx.reply('You selected Play 10');
                break;
            case 'play20':
                await ctx.reply('You selected Play 20');
                break;
            case 'play50':
                await ctx.reply('You selected Play 50');
                break;
            case 'play100':
                await ctx.reply('You selected Play 100');
                break;
            case 'play_demo':
                await ctx.reply('You selected Play Demo');
                break;
            case 'deposit':
                await ctx.reply('💳 You clicked Deposit!');
                break;
            case 'register':
                await ctx.reply('Please share your contact information!', {
                    reply_markup: {
                        keyboard: [
                            [
                                Markup.button.contactRequest('📞 Share Contact'),
                                Markup.button.callback('❌ Cancel', 'cancel'),
                            ],
                        ],
                        one_time_keyboard: true,
                        resize_keyboard: true,
                    },
                });
                break;
            case 'check_balance':
                await ctx.reply('💰 You clicked Check Balance!');
                break;
            case 'contact_us':
                await ctx.reply('📞 You clicked Contact Us!');
                break;
            case 'rules':
                await ctx.reply('📜 You clicked Game Rules!');
                break;
                case 'invite':
    const referralLink = `https://t.me/telbingo_bot?start=${currentId}`;
    await ctx.reply(`🎉 Invite your friends by clicking the button below! ${referralLink}`, {
        reply_markup: {
            inline_keyboard: [
                [
                  
                    Markup.button.switchToChat('Invite your friends', referralLink),
                ]
            ]
        }
    });
    break;
                
            case 'cancel':
                await ctx.reply('❌ Registration canceled.',{
                    reply_markup:{
                        remove_keyboard:true
                    }
                });
                
                break;
            default:
                await ctx.reply('Unknown option selected.');
        }

        await ctx.answerCbQuery();
    } catch (error) {
        console.error('Error in callback query handler:', error);
        await ctx.reply('An error occurred while processing your request.');
        await ctx.answerCbQuery('An error occurred.');
    }
});

bot.launch()
    .then(() => {
        console.log('Bot is running...');
    })
    .catch((error) => {
        console.error('Failed to launch the bot:', error);
    });

process.once('SIGINT', () => {
    bot.stop('SIGINT');
    console.log('Bot gracefully stopped');
});
process.once('SIGTERM', () => {
    bot.stop('SIGTERM');
    console.log('Bot gracefully stopped');
});
