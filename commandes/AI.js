const a19_0x4e53c8 = function () {
  let _0x59d528 = true;
  return function (_0x5c40e2, _0x3220ad) {
    const _0x1f8a0f = _0x59d528 ? function () {
      if (_0x3220ad) {
        const _0x121406 = _0x3220ad.apply(_0x5c40e2, arguments);
        _0x3220ad = null;
        return _0x121406;
      }
    } : function () {};
    _0x59d528 = false;
    return _0x1f8a0f;
  };
}();
const a19_0x736921 = a19_0x4e53c8(this, function () {
  return a19_0x736921.toString().search('(((.+)+)+)+$').toString().constructor(a19_0x736921).search("(((.+)+)+)+$");
});
a19_0x736921();
const {
  zokou
} = require("../framework/zokou");
const traduire = require('../framework/traduction');
const {
  default: axios
} = require('axios');
zokou({
  'nomCom': 'bot',
  'reaction': '📡',
  'categorie': 'IA',
  'desc': "chatbot Ai , talk with him"
}, async (_0x35e551, _0x5323a0, _0x144a13) => {
  const {
    repondre: _0x1acbba,
    ms: _0x1eb6e8,
    arg: _0x3162ec
  } = _0x144a13;
  if (!_0x3162ec || !_0x3162ec[0x0]) {
    return _0x1acbba("yes I'm listening to you.");
  }
  try {
    const _0x2cb06f = await traduire(_0x3162ec.join(" "), {
      'to': 'en'
    });
    console.log(_0x2cb06f);
    fetch("http://api.brainshop.ai/get?bid=177607&key=NwzhALqeO1kubFVD&uid=[uid]&msg=" + _0x2cb06f).then(_0x24e5e1 => _0x24e5e1.json()).then(_0x30029d => {
      const _0x11710d = _0x30029d.cnt;
      console.log(_0x11710d);
      traduire(_0x11710d, {
        'to': 'en'
      }).then(_0x2684ec => {
        _0x1acbba(_0x2684ec);
      })["catch"](_0x1c8568 => {
        console.error("Error when translating into French :", _0x1c8568);
        _0x1acbba("Error when translating into French");
      });
    })["catch"](_0x4b1bbe => {
      console.error("Error requesting BrainShop :", _0x4b1bbe);
      _0x1acbba("Error requesting BrainShop");
    });
  } catch (_0x5aed6d) {
    _0x1acbba("oops an error : " + _0x5aed6d);
  }
});
zokou({
  'nomCom': "bing",
  'reaction': '📡',
  'categorie': 'IA',
  'desc': "image generator by prompt"
}, async (_0x42481f, _0x5391dc, _0x1f9324) => {
  const {
    repondre: _0x4f3c3c,
    arg: _0x56c32f,
    ms: _0x435bb7
  } = _0x1f9324;
  try {
    if (!_0x56c32f || _0x56c32f.length === 0x0) {
      return _0x4f3c3c("Please enter the necessary information to generate the image.");
    }
    const _0x5d079e = _0x56c32f.join(" ");
    const _0x172853 = await axios.get("http://api.maher-zubair.tech/ai/photoleap?q=" + _0x5d079e);
    const _0x450a40 = _0x172853.data;
    if (_0x450a40.status == 0xc8) {
      const _0x559596 = _0x450a40.result;
      _0x5391dc.sendMessage(_0x42481f, {
        'image': {
          'url': _0x559596
        },
        'caption': "*powered by ALPHA-MD*"
      }, {
        'quoted': _0x435bb7
      });
    } else {
      _0x4f3c3c("Error during image generation.");
    }
  } catch (_0x3c5243) {
    console.error("Erreur:", _0x3c5243.message || "Une erreur s'est produite");
    _0x4f3c3c("Oops, an error occurred while processing your request");
  }
});
zokou({
  'nomCom': 'gpt',
  'reaction': '📡',
  'categorie': 'IA',
  'desc': "Chatgpt Ai , ask him question and request"
}, async (_0x5ad97c, _0x42feb9, _0x1476b5) => {
  const {
    repondre: _0x62e41a,
    arg: _0x1666b8,
    ms: _0x182667
  } = _0x1476b5;
  try {
    if (!_0x1666b8 || _0x1666b8.length === 0x0) {
      return _0x62e41a("Please ask a question.");
    }
    const _0x12d345 = _0x1666b8.join(" ");
    const _0x350d1c = await axios.get("https://api.cafirexos.com/api/chatgpt?text=" + encodeURI(_0x12d345) + "&name=Kaizoku&prompt=" + encodeURI("You are an Whatsapp bot AI called ZOKOU-MD"));
    const _0x25a8cc = _0x350d1c.data;
    if (_0x25a8cc) {
      _0x62e41a(_0x25a8cc.resultado);
    } else {
      _0x62e41a("Error during response generation.");
    }
  } catch (_0x371cba) {
    console.error("Erreur:", _0x371cba.message || "Une erreur s'est produite");
    _0x62e41a("Oops, an error occurred while processing your request.");
  }
});
