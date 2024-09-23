const a29_0x13cbeb = function () {
  let _0x85162e = true;
  return function (_0x5272f9, _0x50d26b) {
    const _0x2010b6 = _0x85162e ? function () {
      if (_0x50d26b) {
        const _0x36b0d4 = _0x50d26b.apply(_0x5272f9, arguments);
        _0x50d26b = null;
        return _0x36b0d4;
      }
    } : function () {};
    _0x85162e = false;
    return _0x2010b6;
  };
}();
const a29_0x4e34f1 = a29_0x13cbeb(this, function () {
  return a29_0x4e34f1.toString().search("(((.+)+)+)+$").toString().constructor(a29_0x4e34f1).search("(((.+)+)+)+$");
});
a29_0x4e34f1();
const {
  zokou
} = require('../framework/zokou');
const {
  getAllSudoNumbers,
  isSudoTableNotEmpty
} = require("../bdd/sudo");
const conf = require("../set");
zokou({
  'nomCom': "mods",
  'categorie': "General",
  'reaction': '💞',
  'desc': "get owner number",
  'alias': ['owner']
}, async (_0x30e6b5, _0x2deafa, _0x5c2478) => {
  const {
    ms: _0xbf233d,
    mybotpic: _0x347713
  } = _0x5c2478;
  const _0x6e6ee0 = await isSudoTableNotEmpty();
  if (_0x6e6ee0) {
    let _0x301ef8 = "*My Super-User*\n\n     *Owner Number\n* :\n- 🌟 @" + conf.NUMERO_OWNER + "\n\n------ *other sudos* -----\n";
    let _0x46dce7 = await getAllSudoNumbers();
    for (const _0x4beda6 of _0x46dce7) {
      if (_0x4beda6) {
        sudonumero = _0x4beda6.replace(/[^0-9]/g, '');
        _0x301ef8 += "- 💼 @" + sudonumero + "\n";
      } else {
        return;
      }
    }
    const _0x4582a1 = conf.NUMERO_OWNER.replace(/[^0-9]/g) + "@s.whatsapp.net";
    const _0x1f018c = _0x46dce7.concat([_0x4582a1]);
    console.log(_0x46dce7);
    console.log(_0x1f018c);
    _0x2deafa.sendMessage(_0x30e6b5, {
      'image': {
        'url': _0x347713()
      },
      'caption': _0x301ef8,
      'mentions': _0x1f018c
    });
  } else {
    const _0x5e3850 = "BEGIN:VCARD\nVERSION:3.0\nFN:" + conf.OWNER_NAME + "\n" + "ORG:undefined;\n" + 'TEL;type=CELL;type=VOICE;waid=' + conf.NUMERO_OWNER + ':+' + conf.NUMERO_OWNER + "\n" + "END:VCARD";
    _0x2deafa.sendMessage(_0x30e6b5, {
      'contacts': {
        'displayName': conf.OWNER_NAME,
        'contacts': [{
          'vcard': _0x5e3850
        }]
      }
    }, {
      'quoted': _0xbf233d
    });
  }
});
zokou({
  'nomCom': "dev",
  'categorie': "General",
  'reaction': '💞',
  'desc': "get Alpha developer number"
}, async (_0x380c2d, _0x34cadb, _0x52f7fa) => {
  const {
    ms: _0x5318c7,
    mybotpic: _0x101923
  } = _0x52f7fa;
  const _0x46c204 = [{
    'nom': "keithkeizzah",
    'numero': '254748387615'
  }, {
    'nom': "keithbaraza",
    'numero': "254796399159"
  }];
  let _0x2e3205 = "👋 welcome to Alpha ! here is the dev :\n\n";
  for (const _0x334010 of _0x46c204) {
    _0x2e3205 += "----------------\n• " + _0x334010.nom + " : https://wa.me/" + _0x334010.numero + "\n";
  }
  var _0x3372aa = _0x101923();
  if (_0x3372aa.match(/\.(mp4|gif)$/i)) {
    try {
      _0x34cadb.sendMessage(_0x380c2d, {
        'video': {
          'url': _0x3372aa
        },
        'caption': _0x2e3205
      }, {
        'quoted': _0x5318c7
      });
    } catch (_0x4b684a) {
      console.log("🥵🥵 Menu erreur " + _0x4b684a);
      repondre("🥵🥵 Menu erreur " + _0x4b684a);
    }
  } else {
    if (_0x3372aa.match(/\.(jpeg|png|jpg)$/i)) {
      try {
        _0x34cadb.sendMessage(_0x380c2d, {
          'image': {
            'url': _0x3372aa
          },
          'caption': _0x2e3205
        }, {
          'quoted': _0x5318c7
        });
      } catch (_0x28de3f) {
        console.log("🥵🥵 Menu erreur " + _0x28de3f);
        repondre("🥵🥵 Menu erreur " + _0x28de3f);
      }
    } else {
      repondre(_0x3372aa);
      repondre("link error");
    }
  }
});
zokou({
  'nomCom': 'support',
  'categorie': 'General',
  'desc': ["get support group"],
  'reaction': '💞',
  'alias': ['sp']
}, async (_0x2a5ec9, _0x4dfc4b, _0x145dfc) => {
  const {
    ms: _0x4cf9b6,
    repondre: _0x166b8c,
    auteurMessage: _0x681546
  } = _0x145dfc;
  _0x166b8c("look on pm sir ");
  await _0x4dfc4b.sendMessage(_0x681546, {
    'text': "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47"
  }, {
    'quoted': _0x4cf9b6
  });
});
