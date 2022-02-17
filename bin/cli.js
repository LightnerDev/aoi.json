#!/usr/bin/env node

const { Command } = require('commander')
const path = require('path')
const fs = require('fs')
const execSync = require('child_process').execSync

//~

const program = new Command()

program
    .name('aoi.json')
    .description('Compiles json files to AoiJS code')
    .version('v0.1.0-Beta', '-v, --version', 'output the version number')
    .usage('[command] [options]')
    .helpOption('-h, --help', 'display help for command')
    .addHelpCommand('help', 'display help for command')

program
    .command('compile <filePath>')
    .description('Compile a JSON file to AoiJS')
    .action((filePath) => {
        compile(filePath)
    })

program
    .command('run <filePath>')
    .description('Run a JSON file as AoiJS')
    .action((filePath) => {
        run(filePath)
    })

program.parse()

function interpreter(fp) {
    const file = require(path.join(process.cwd(), fp))

    var id = Date.now().toString(36) + Math.random().toString(36)

    var c = ""

    c += `const AoiJS = require('aoi.js')\n\n`

    var botopt = file?.bot
    var t = botopt.token

    if (botopt?.token.startsWith('ENV_')) {
        c = `require('dotenv').config()\n` + c
        botopt.token = id
    }

    var botopt = JSON.stringify(botopt)

    botopt = botopt.replace(`"${id}"`, `process.env['${t.replace('ENV_', '')}']`)

    c += `const bot = new AoiJS.Bot(${botopt})\n\n`

    c += `bot.variables(${JSON.stringify(file?.variables)})\n\n`

    var status = "";

    file?.statuses?.forEach(st => {
        status += `bot.status(${JSON.stringify(st)})\n`
    })

    c += `${status}\n`

    var cbs = "";

    file?.callbacks?.forEach(cb => {
        cbs += `bot.on${cb}()\n`
    })

    c += `${cbs}\n`

    var cmds = "";

    file?.commands?.forEach(cmd => {
        if (typeof cmd.code == 'object') cmd.code = cmd.code.join('\n');

        if (cmd?.type == "default" || !cmd?.type) {
            cmds += `bot.command(${JSON.stringify(cmd)})\n`
        } else {
            cmds += `bot.${cmd?.type}Command(${JSON.stringify(cmd)})\n`
        }
    })

    c += `${cmds}`

    return c;
}

function compile(fp) {
    let code = interpreter(fp)

    let dir = path.dirname(path.join(process.cwd(), fp))
    let name = path.basename(path.join(process.cwd(), fp), path.extname(path.join(process.cwd(), fp)))

    fs.writeFileSync(`${dir}/${name}.js`, code)

    console.log('Compiled!')
}
function run(fp) {
    let code = interpreter(fp)

    execSync(`node -e "${code.replaceAll('"', '\\"').replaceAll('$', '\\$')}"`, { stdio: 'inherit' })
}