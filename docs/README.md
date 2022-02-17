# @lightner/aoi.json
This is a project that I made for fun. It allows you to code aoi.js in JSON (JavaScript Object Notation)

## Usage
To get started install this and aoi.js `npm install @lightner/aoi.json aoi.js` (You could install `@lightner/aoi.js` globally).

Now create a `.json` file. Name it anything.

### Bot Info
To declare the bot info create a property named `bot` with type `object`. Now make the property `bot.token` and put your token there. If your token is saved in a `.env` file, make the value of `bot.token` `ENV_WHAT-YOU-NAMED-THE-TOKEN`. You can add the rest of the configurations such as `prefix`, `intents` in the object `bot`

### Variables
To make variables, make an object named `variables` in global. Create a property named whatever you want the variable to be named and the value to be the default value.

### Status
To create statuses, make an array named `statuses` in global. For each status make an object in `statuses` with these 3 properties: `type`, `text`, `time`. If you used `aoi.js` statuses you will know what to put as the values of the properties.

### Cal1backs
To listen for certain events, make an array named `callbacks` in global. Add properties with the name of the callback (First letter must be uppercase). 

### Commands
To add commands, make an array named `commands` in global. Add objects to it with the properties you would normally use with `bot.command({...})` in `aoi.js` except with an extra proprerty named `type`. The value should be `default` for normal commands, and `awaited` for awaited commands and etcetera.

## Compiling
Run `npx aoi.json compile <filePath>` to compile the `.json` to `.js`

## Running Directly
Run `npx aoi.json run <filePath>` to run the `.json` file.