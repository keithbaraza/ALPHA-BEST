const a11_0x230916=a11_0x11e5;(function(_0x4a1efb,_0x417796){const _0x5d82b7=a11_0x11e5,_0xadbfc6=_0x4a1efb();while(!![]){try{const _0x532da7=-parseInt(_0x5d82b7(0xab))/0x1+parseInt(_0x5d82b7(0xb3))/0x2*(-parseInt(_0x5d82b7(0xa8))/0x3)+parseInt(_0x5d82b7(0x98))/0x4+-parseInt(_0x5d82b7(0xb5))/0x5+parseInt(_0x5d82b7(0x9b))/0x6*(-parseInt(_0x5d82b7(0xa4))/0x7)+parseInt(_0x5d82b7(0xae))/0x8+parseInt(_0x5d82b7(0xa3))/0x9;if(_0x532da7===_0x417796)break;else _0xadbfc6['push'](_0xadbfc6['shift']());}catch(_0x12218f){_0xadbfc6['push'](_0xadbfc6['shift']());}}}(a11_0x7c6c,0x5b118));function a11_0x11e5(_0x4a6785,_0xb6bd8a){const _0x1345b1=a11_0x7c6c();return a11_0x11e5=function(_0xb5032a,_0x533bf1){_0xb5032a=_0xb5032a-0x96;let _0x7c6c93=_0x1345b1[_0xb5032a];return _0x7c6c93;},a11_0x11e5(_0x4a6785,_0xb6bd8a);}const a11_0x533bf1=(function(){let _0x118400=!![];return function(_0x143800,_0x5817c8){const _0x20ebca=_0x118400?function(){if(_0x5817c8){const _0x1d2504=_0x5817c8['apply'](_0x143800,arguments);return _0x5817c8=null,_0x1d2504;}}:function(){};return _0x118400=![],_0x20ebca;};}()),a11_0xb5032a=a11_0x533bf1(this,function(){const _0x8f6f8e=a11_0x11e5;return a11_0xb5032a[_0x8f6f8e(0xaa)]()[_0x8f6f8e(0xb0)](_0x8f6f8e(0xaf))[_0x8f6f8e(0xaa)]()['constructor'](a11_0xb5032a)['search'](_0x8f6f8e(0xaf));});a11_0xb5032a(),require('dotenv')[a11_0x230916(0x9e)]();const {Pool}=require('pg'),s=require('../set');var dbUrl=s[a11_0x230916(0xa5)]?s[a11_0x230916(0xa5)]:a11_0x230916(0xb4);function a11_0x7c6c(){const _0x1ac534=['Erreur\x20lors\x20de\x20l\x27ajout\x20du\x20groupe\x20onlyAdmin\x20:','1123660uBsFDQ','Une\x20erreur\x20est\x20survenue\x20lors\x20de\x20la\x20création\x20de\x20la\x20table\x20\x27onlyAdmin\x27:','Erreur\x20lors\x20de\x20la\x20suppression\x20du\x20groupe\x20onlyAdmin\x20:','24TrmKql','connect','SELECT\x20*\x20FROM\x20onlyAdmin','config','DELETE\x20FROM\x20onlyAdmin\x20WHERE\x20groupeJid\x20=\x20$1','release','Erreur\x20lors\x20de\x20la\x20vérification\x20du\x20groupe\x20onlyAdmin\x20:','INSERT\x20INTO\x20onlyAdmin\x20(groupeJid)\x20VALUES\x20($1)','4832064oZXcuX','325353iHjeKe','DATABASE_URL','log','groupejid','3kPETlI','rows','toString','38166hwXiHJ','error','Groupe\x20JID\x20','3273960hAGPvr','(((.+)+)+)+$','search','exports','La\x20table\x20\x27onlyAdmin\x27\x20a\x20été\x20créée\x20avec\x20succès.','319326jiwCUI','postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9','2351475nhMhVC','query'];a11_0x7c6c=function(){return _0x1ac534;};return a11_0x7c6c();}const proConfig={'connectionString':dbUrl,'ssl':{'rejectUnauthorized':![]}},pool=new Pool(proConfig),creerTableOnlyAdmin=async()=>{const _0x70537e=a11_0x230916;try{await pool['query']('\x0a\x20\x20\x20\x20\x20\x20CREATE\x20TABLE\x20IF\x20NOT\x20EXISTS\x20onlyAdmin\x20(\x0a\x20\x20\x20\x20\x20\x20\x20\x20groupeJid\x20text\x20PRIMARY\x20KEY\x0a\x20\x20\x20\x20\x20\x20);\x0a\x20\x20\x20\x20'),console[_0x70537e(0xa6)](_0x70537e(0xb2));}catch(_0x282bd8){console['error'](_0x70537e(0x99),_0x282bd8);}};creerTableOnlyAdmin();async function addGroupToOnlyAdminList(_0x3a63cc){const _0x3b4e06=a11_0x230916,_0x250493=await pool[_0x3b4e06(0x9c)]();try{const _0x139295=_0x3b4e06(0xa2),_0x8a36de=[_0x3a63cc];await _0x250493[_0x3b4e06(0x96)](_0x139295,_0x8a36de),console[_0x3b4e06(0xa6)](_0x3b4e06(0xad)+_0x3a63cc+'\x20ajouté\x20à\x20la\x20liste\x20des\x20groupes\x20onlyAdmin.');}catch(_0x2e2336){console[_0x3b4e06(0xac)](_0x3b4e06(0x97),_0x2e2336);}finally{_0x250493['release']();}}async function isGroupOnlyAdmin(){const _0x1e2b91=a11_0x230916,_0x4d9364=await pool['connect']();try{const _0xdee18a=_0x1e2b91(0x9d),_0x416119=await _0x4d9364[_0x1e2b91(0x96)](_0xdee18a);let _0x569777=[];return _0x416119[_0x1e2b91(0xa9)]['forEach'](_0xdc00c8=>{const _0x36c8d0=_0x1e2b91;_0x569777['push'](_0xdc00c8[_0x36c8d0(0xa7)]);}),_0x569777;}catch(_0x3ed11c){return console[_0x1e2b91(0xac)](_0x1e2b91(0xa1),_0x3ed11c),[];}finally{_0x4d9364[_0x1e2b91(0xa0)]();}}async function removeGroupFromOnlyAdminList(_0x3cf848){const _0x79e0d=a11_0x230916,_0x1d1463=await pool['connect']();try{const _0x5e2fbe=_0x79e0d(0x9f),_0x154407=[_0x3cf848];await _0x1d1463[_0x79e0d(0x96)](_0x5e2fbe,_0x154407),console[_0x79e0d(0xa6)](_0x79e0d(0xad)+_0x3cf848+'\x20supprimé\x20de\x20la\x20liste\x20des\x20groupes\x20onlyAdmin.');}catch(_0x2fa7b3){console[_0x79e0d(0xac)](_0x79e0d(0x9a),_0x2fa7b3);}finally{_0x1d1463[_0x79e0d(0xa0)]();}}module[a11_0x230916(0xb1)]={'addGroupToOnlyAdminList':addGroupToOnlyAdminList,'isGroupOnlyAdmin':isGroupOnlyAdmin,'removeGroupFromOnlyAdminList':removeGroupFromOnlyAdminList};