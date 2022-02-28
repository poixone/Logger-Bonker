import { Client, Guild, Intents, TextChannel } from "discord.js";
import { token } from "./config.json";

export const randomChoice = <T>(l: Array<T>): T =>
  l[~~(Math.random() * l.length)];

const CHANNELS = [
  755597803102928966, 925392822239105074, 845328432715923487,
  385428211091111947, 804322074167869489,
];

const SERVER = 385387666415550474;

// Create a new client instance
const client = new Client({
  partials: ["CHANNEL"],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
  ],
});

// When the client is ready, run this code (only once)

let sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
let guild: Guild | null = null;

client.once("ready", () => {
  setInterval(async () => {
    const targetChannel = await guild?.channels.fetch(
      randomChoice(CHANNELS).toString()
    );

    (targetChannel as TextChannel)?.send("yourMother").then((message) => {
      console.log(message);

      message.delete();
    });
  }, 5000);
});

client.on("messageCreate", async (message) => {
  guild = message.guild;
  console.log(guild);
});

// Login to Discord with your client's token
client.login(token);
