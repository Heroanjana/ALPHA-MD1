const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0VIaXprSUt0QnpIQWx6ekRlU1pld2xwSWRFSzdJOEFMUFBocS9EMFRuND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWnlwTFdhUVRPYmxYRzRBdnhIbTJZTVo5SnhHTjJQM0ZNRGVWZDBDOFVsOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4QWw0d2pxQlh4L0MwNitPQjBYQVFBZWUrZ1dmSTJjMjc4MmtOTlgrWG5jPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvVXNyR2RJSkt4ZFN0c1pVQ2VDWWcvV0NwdlFNOW9VWEVaeHhQTXhka3o0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVKV0YwN21zVGg1YkNHQ2R0bTFhekhveWhXaTRodklFY01KSXVPeXpuSGM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBoQTVWRXViT0U0T01MUi9yNWtWTENGSmp3OHlXTjFOYWxmSVl0Nm1na1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUplRDlXckZ3cmV3bE1IdVFaQnVLME8vUG14R2JTZXBUVURyK05GU2Jrdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNDQyMTB5Z09WWnNKL2RQK3l6Q21RRUVuUUdReUpUKy9SclNMZC9jVkhEaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldnVmFSRnBFZGI0NVBhUzBNVWxsalB3R2N3S3VWNUJSS3g4NElFRnc5SUNiUzR1Vktudlh0c3E3UWcwNVFScDNTaHVNVTVUbVhNU2VZeUIzNVp0TEFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIsImFkdlNlY3JldEtleSI6IjBaMjNVOHZUK2k1RmNpRmpESmt3UStFaWVPeGpoTUIwb2RwUjY2V1NiRU09IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjZRRm1sQkRsVEtLa0YwZDB0MG9rVXciLCJwaG9uZUlkIjoiZTg1ZjQxM2UtN2RkOS00NzEyLTkzYTktYTIxODQ2ZjBiZjUzIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZtUDVQNmpvSWRKMEVLajNIK2FLUzUxd05tST0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrSWNYQ0N1V1pVQStsTFFJbUdrTEpmblQ5ZFk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNERUMzVOQUEiLCJtZSI6eyJpZCI6Ijk0NzUwMTc3MzY5OjY1QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJYW0rWUFERU1DY3o3Y0dHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJGWWJ6Z0ZYYmJsYmRBaDVLemdkaUE0M3dxZXQ2dUt2Nm4rV09ZZGFFU21nPSIsImFjY291bnRTaWduYXR1cmUiOiJJTDBSUVJlQVZkMUJPcVdsTjg3NWx2VVAySGxiYVRydHNYODMyS3NDcXVweThRU1I1RFBTUXNNcmpGM2pXanVPYjVMMWJxM2dSZ0lwYThQVzFVeHlBQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoicU52OFNrY2EyVHpNOXBINDRyWXZLMDRidmlHVCtqdmtRMThFNVVvaVFMcGxLcWJ5czVPWGhqZnFKWFdDVjZmZmZTYzI3ZVNGRU9PcWNYekNkbm53QXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5NDc1MDE3NzM2OTo2NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJSV0c4NEJWMjI1VzNRSWVTczRIWWdPTjhLbnJlcmlyK3AvbGptSFdoRXBvIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI3MjU0MDkyfQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "🍂🖤𝗞𝗜𝗡𝗚 𝗔𝗡𝗝𝗔𝗡𝗔 𝗕𝗕𝗛 💦🥵🍂",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " keithkeizzah",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
