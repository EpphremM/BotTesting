import { Telegraf, Markup } from "telegraf";

const TOKEN = "7578510001:AAEAmMM6VeOEmCXZkr8k5T_BOD-2Wwih1zM"; 
const bot = new Telegraf(TOKEN);
const web_link='https://t.me/telbingo_bot/WaseBingo';

bot.start((ctx) => {
    ctx.reply("Welcome, Ephrem",
    Markup.inlineKeyboard([
        Markup.button.url('Open Mini App', web_link),
    ])
)}
);

bot.launch().then(() => {
    console.log("Bot is up and running!");
}).catch(err => { 
    console.error("Error launching the bot:", err);
});
