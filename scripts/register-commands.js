import "dotenv/config";
import { Client, GatewayIntentBits, Collection } from "discord.js";
import config from "../src/config/application.js";
import { loadCommands, registerCommands } from "../src/handlers/commandLoader.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

client.once("ready", async () => {
  try {
    console.log(`Logged in as ${client.user.tag}`);
    console.log(`Guild ID: ${config.bot.guildId}`);

    console.log("Loading commands...");
    await loadCommands(client);

    console.log(`Loaded ${client.commands.size} commands`);
    console.log("Registering slash commands...");

    await registerCommands(client, config.bot.guildId);

    console.log("Slash commands registered successfully.");
    await client.destroy();
    process.exit(0);
  } catch (error) {
    console.error("Failed to register slash commands:", error);
    await client.destroy();
    process.exit(1);
  }
});

client.login(config.bot.token);
