require('dotenv').config()
const AoiJS = require('aoi.js')

const bot = new AoiJS.Bot({"token":process.env['TOKEN'],"prefix":"aoijson/","intents":"all"})

bot.variables({"variable1name":"variable1dvalue","variable2name":"variable2dvalue","variable3name":"variable3dvalue","variable4name":"variable4dvalue","variable5name":"variable5dvalue"})

bot.status({"type":"PLAYING","text":"Getting Coded","time":12})

bot.onMessage()
bot.onInteractionCreate()

bot.command({"type":"default","name":"test","code":"$randomText[HELLO;HI;HEY;SUP]"})
bot.command({"type":"default","name":"mltest","code":"$randomText[HELLO;HI;HEY;SUP]\nThis Code Is Multiline\nEPIC RIGHT?"})
bot.awaitedCommand({"type":"awaited","name":"await1","code":"HELLO"})
bot.command({"type":"default","name":"awaitedCMD","code":"$loop[3;{};await1]"})
