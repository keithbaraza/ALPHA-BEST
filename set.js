const a68_0x27d878 = function () {
  let _0x4238ee = true;
  return function (_0x30fce1, _0x2494c3) {
    const _0x1c7bae = _0x4238ee ? function () {
      if (_0x2494c3) {
        const _0x482f4b = _0x2494c3.apply(_0x30fce1, arguments);
        _0x2494c3 = null;
        return _0x482f4b;
      }
    } : function () {};
    _0x4238ee = false;
    return _0x1c7bae;
  };
}();
const a68_0x12708b = a68_0x27d878(this, function () {
  return a68_0x12708b.toString().search("(((.+)+)+)+$").toString().constructor(a68_0x12708b).search("(((.+)+)+)+$");
});
a68_0x12708b();
const fs = require('fs-extra');
if (fs.existsSync("set.env")) {
  require("dotenv").config({
    'path': __dirname + "/set.env"
  });
}
const path = require("path");
const databasePath = path.join(__dirname, "./database.db");
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
  'session': process.env.SESSION_ID || "",
  'PREFIXE': process.env.PREFIX || '~',
  'OWNER_NAME': process.env.OWNER_NAME || "keithkeizzah",
  'NUMERO_OWNER': process.env.NUMERO_OWNER || '254748387615',
  'AUTO_READ_STATUS': process.env.AUTO_READ_STATUS || "non",
  'AUTO_DOWNLOAD_STATUS': process.env.AUTO_DOWNLOAD_STATUS || "non",
  'BOT': process.env.BOT_NAME || "ALPHA-MD",
  'URL': process.env.BOT_MENU_LINKS || "https://static.animecorner.me/2023/08/op2.jpg",
  'MODE': process.env.PUBLIC_MODE || 'yes',
  'PM_PERMIT': process.env.PM_PERMIT || 'no',
  'HEROKU_APP_NAME': process.env.HEROKU_APP_NAME || null,
  'HEROKU_APY_KEY': process.env.HEROKU_APY_KEY || null,
  'WARN_COUNT': process.env.WARN_COUNT || '3',
  'ETAT': process.env.PRESENCE || '',
  'DP': process.env.STARTING_BOT_MESSAGE || "yes",
  'CHATBOT': process.env.PM_CHATBOT || 'no',
  'HEROKU': process.env.HEROKU || 'yes',
  'ANTI_VV': process.env.ANTI_VIEW_ONCE || 'no',
  'ANTI_CMD_SPAM': process.env.ANTI_COMMAND_SPAM || 'no',
  'DATABASE_URL': DATABASE_URL,
  'DATABASE': DATABASE_URL === databasePath ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : 'postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9'
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
  fs.unwatchFile(fichier);
  console.log("mise à jour " + __filename);
  delete require.cache[fichier];
  require(fichier);
});
