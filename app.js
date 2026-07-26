// SoundCover - Mobile Etiquette Sound App JS
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log('[PWA] beforeinstallprompt captured!');
});

// Multi-Language Localization Data (15 Worldwide Languages: KO/EN/JA/ZH/ES/PT/DE/FR/VI/ID/TH/AR/RU/HI/LA)
const I18N = {
  ko: {
    appSubtitle: "?뵏 ?꾨씪?대퉿?섍쾶 吏耳??쒕━???붿옣???뚮━ ?먰떚耳?,
    installApp: "?벒 ???ㅼ튂",
    pwaPrompt: "?벑 ???붾㈃??異붽??섏뿬 ?깆쿂???ъ슜?섏꽭??",
    install: "?ㅼ튂",
    wakeLockActive: "??100% ?뚯쓬 而ㅻ쾭 以?,
    wakeLockInactive: "?뵏 ?꾨씪?대퉿?섍쾶 吏耳??쒕━???붿옣???뚮━ ?먰떚耳?,
    selectSound: "?뚯썝 ?좏깮",
    soundDryer: "?쒕씪?닿린",
    soundPowerShower: "媛뺣젰 ?ㅼ썙湲?,
    soundHeavyDownpour: "?λ?鍮?,
    selectTimer: "??대㉧ ?ㅼ젙",
    setTimer: "??대㉧ ?ㅼ젙",
    volumeControl: "蹂쇰ⅷ ?ㅼ젙 (?뚮━ 利앺룺)",
    buyCoffee: "?뮇 \"?뺣텇??誘쇰쭩???닿껐?덉뼱??\" ?묒썝?섍린",
    adsenseLabel: "愿묎퀬 ?곸뿭",
    donationTitle: "?ㅿ툘 \"?뺣텇??誘쇰쭩???닿껐?덉뼱??\" ?묒썝?섍린",
    donationDesc: "臾대즺 ?먰떚耳??쒕퉬?ㅻ? ?좎슜?섍쾶 ?곗뀲?ㅻ㈃ 媛쒕컻?먯뿉寃??곕쑜???묒썝??留덉쓬???꾪빐蹂댁꽭??",
    donationThankYou: "?뱀떊???곕쑜??留덉쓬?????쒕퉬?ㅻ? 吏耳쒕굹媛???섏씠 ?⑸땲?? 吏꾩떖?쇰줈 媛먯궗?쒕젮??",
    laterBtn: "?섏쨷???좉쾶??,
    bathroomEssential: "?붿옣??異붿쿇??,
    affiliateText: "?㎉ 湲됲븷 ???좎슜??臾쇱뿉 ???밸뒗 鍮꾨뜲 臾쇳떚???ル뵜 蹂닿린"
  },
  en: {
    appSubtitle: "?뵏 Privately Protecting Your Bathroom Sound Etiquette",
    installApp: "?벒 Install App",
    pwaPrompt: "?벑 Add to Home Screen for app experience!",
    install: "Install",
    wakeLockActive: "??100% Noise Masking",
    wakeLockInactive: "?뵏 Privately Protecting Your Etiquette",
    selectSound: "Select Sound",
    soundDryer: "Hair Dryer",
    soundPowerShower: "Power Shower",
    soundHeavyDownpour: "Heavy Downpour",
    selectTimer: "Timer Setting",
    setTimer: "Timer Setting",
    volumeControl: "Volume Boost & Level",
    buyCoffee: "?뮇 \"Thanks for solving the embarrassing sound!\" Support Us",
    adsenseLabel: "Advertisement",
    donationTitle: "?ㅿ툘 \"Thanks for solving the embarrassing sound!\" Support Us",
    donationDesc: "Your warm support helps SoundCover protect your small private moments. Thank you!",
    donationThankYou: "Your warm heart is the power that keeps this service going. We sincerely thank you!",
    laterBtn: "Later",
    bathroomEssential: "Bathroom Essential",
    affiliateText: "?㎉ Flushable Moist Wipes Special Deal ??
  },
  ja: {
    appSubtitle: "?뵏 ?쀣꺀?ㅳ깧?쇈깉?믣츍?뗣깉?ㅳ꺃?녈궓?곥궞?껁깉",
    installApp: "?벒 ?㏂깤?ゃ궎?녈궧?덀꺖??,
    pwaPrompt: "?벑 ?쎼꺖?좂뵽?㏂겓瓦썲뒥?쀣겍?㏂깤?ゃ겏?쀣겍鵝욜뵪竊?,
    install: "?ㅳ꺍?밤깉?쇈꺂",
    wakeLockActive: "??100% 蟯믧윹??뼪訝?,
    wakeLockInactive: "?뵏 ?쀣꺀?ㅳ깧?쇈깉?믣츍?뗣궓?곥궞?껁깉",
    selectSound: "?듐궑?녈깋?멩뒢",
    soundDryer: "?섅궋?됰씪?담깶??,
    soundPowerShower: "凉룟뒟?룔깵??꺖",
    soundHeavyDownpour: "?잏쟼?띲굤",
    selectTimer: "?욍궎?욁꺖鼇?츣",
    setTimer: "?욍궎?욁꺖鼇?츣",
    volumeControl: "?녜뇧?뽧꺖?밤깉鼇?츣",
    buyCoffee: "?뮇 ?뚣걡?뗣걩?㎩뒰?뗣굤?얇걮?잞펯??恙쒏뤃?쇻굥",
    adsenseLabel: "佯껃몜?ⓦ꺁??,
    donationTitle: "?ㅿ툘 ?뚣걡?뗣걩?㎩뒰?뗣굤?얇걮?잞펯??恙쒏뤃?쇻굥",
    donationDesc: "恙ラ겑?ゃ깯?듽꺖?녈궢?쇈깛?밤걣壤밤겓塋뗣겂?잆굢?곫릇?뗣걚?붹뵱?담굮?딃줁?꾠걮?얇걲竊?,
    donationThankYou: "?귙겒?잆겗歷⒲걢?꾣컱?곥걾?뚣궢?쇈깛?밤굮泳싥걨?뗥뒟?ャ겒?듽겲?쇻귛퓘?덀굤?잒쵛?꾠걼?쀣겲?쇻?,
    laterBtn: "?귙겏??,
    bathroomEssential: "?덀궎?с걡?쇻걲?곥궋?ㅳ깇??,
    affiliateText: "?㎉ 麗담겓役곥걵?뗣깉?ㅳ꺃?ⓦ궑?ⓦ긿?덀깇?ｃ긿?룔깷 ??
  },
  zh: {
    appSubtitle: "?뵏 岳앮뒪?먪쭅?꾣킋?뗩뿴鹽쇌빽?녔븞",
    installApp: "?벒 若됭즳佯붺뵪",
    pwaPrompt: "?벑 曆삣뒥?겻말掠뤷퉽竊뚥퐪謠뚦렅?잌틪?⑨펯",
    install: "若됭즳",
    wakeLockActive: "??100% ?ら윹??썣訝?,
    wakeLockInactive: "?뵏 ?먪쭅若덃뒪鹽쇌빽",
    selectSound: "?됪떓?녔븞",
    soundDryer: "?백즼??,
    soundPowerShower: "凉뷴뒟?길킆",
    soundHeavyDownpour: "?양썓鸚㏝썾",
    selectTimer: "若싨뿶溫양쉰",
    setTimer: "若싨뿶溫양쉰",
    volumeControl: "?녜뇧罌욃성溫양쉰",
    buyCoffee: "?뮇 ?쒎쩀雅뤶틙瓦쇾릉竊뚦리鸚㎩퓳雅놅펯??瀯쇾틛??똻",
    adsenseLabel: "壅욃뒰亮욕몜",
    donationTitle: "?ㅿ툘 ?쒎쩀雅뤶틙瓦쇾릉竊뚦리鸚㎩퓳雅놅펯??瀯쇾틛??똻",
    donationDesc: "倻귝옖瓦쇾릉?띹뉩鹽쇌빽?녔븞躍?댆雅녷궓竊뚧Б瓦롦뵱?곩??묋끺???뮇?∽펯",
    donationThankYou: "?①쉪歷⒵슄??똻??뺨?곫쑍?띶뒦瓦먫맓?꾢뒟?뤵귟》恙껅꽏瘟€궓竊?,
    laterBtn: "葉띶릮?띹?",
    bathroomEssential: "域쀦뎸?닸렓??,
    affiliateText: "?㎉ ??넳麗닸뮈?뺟보?방깲 ??
  },
  es: {
    appSubtitle: "?뵏 Protocolo de etiqueta privada para ba챰os",
    installApp: "?벒 Instalar App",
    pwaPrompt: "?벑 징A챰ade a la pantalla de inicio para la experiencia de app!",
    install: "Instalar",
    wakeLockActive: "??Enmascaramiento de ruido al 100%",
    wakeLockInactive: "?뵏 Protocolo de etiqueta privada",
    selectSound: "Seleccionar sonido",
    soundDryer: "Secador de pelo",
    soundPowerShower: "Ducha potente",
    soundHeavyDownpour: "Lluvia torrencial",
    selectTimer: "Ajuste de temporizador",
    setTimer: "Ajuste de temporizador",
    volumeControl: "Aumento de volumen",
    buyCoffee: "?뮇 \"징Gracias por salvar el momento!\" Apoyar",
    adsenseLabel: "Publicidad",
    donationTitle: "?ㅿ툘 \"징Gracias por salvar el momento!\" Apoyar",
    donationDesc: "Si este servicio gratuito de etiqueta te ayud처, 징env챠a un c찼lido caf챕 al desarrollador!",
    donationThankYou: "Tu apoyo es la fuerza que mantiene este servicio. 징Gracias de todo coraz처n!",
    laterBtn: "M찼s tarde",
    bathroomEssential: "Recomendado para el ba챰o",
    affiliateText: "?㎉ Oferta especial de toallitas h첬medas desechables ??
  },
  pt: {
    appSubtitle: "?뵏 Etiqueta Privada de Som para Banheiro",
    installApp: "?벒 Instalar Aplicativo",
    pwaPrompt: "?벑 Adicione 횪 tela inicial para uma experi챗ncia de aplicativo!",
    install: "Instalar",
    wakeLockActive: "??100% Mascaramento de Ru챠do",
    wakeLockInactive: "?뵏 Protocolo de Etiqueta Privada",
    selectSound: "Selecionar Som",
    soundDryer: "Secador de Cabelo",
    soundPowerShower: "Chuveiro Forte",
    soundHeavyDownpour: "Chuva Forte",
    selectTimer: "Definir Temporizador",
    setTimer: "Definir Temporizador",
    volumeControl: "Aumento de Volume",
    buyCoffee: "?뮇 \"Obrigado por salvar o momento!\" Apoiar",
    adsenseLabel: "An첬ncio",
    donationTitle: "?ㅿ툘 \"Obrigado por salvar o momento!\" Apoiar",
    donationDesc: "Se este servi챌o gratuito ajudou voc챗, envie um caf챕 para o desenvolvedor!",
    donationThankYou: "Seu apoio 챕 a for챌a que mant챕m este servi챌o funcionando. Nosso muito obrigado!",
    laterBtn: "Mais tarde",
    bathroomEssential: "Recomendado para Banheiro",
    affiliateText: "?㎉ Oferta especial de len챌os umedecidos lav찼veis ??
  },
  de: {
    appSubtitle: "?뵏 Sch체tzen Sie Ihre Privatsph채re im Badezimmer",
    installApp: "?벒 App Installieren",
    pwaPrompt: "?벑 Zum Startbildschirm hinzuf체gen!",
    install: "Installieren",
    wakeLockActive: "??100% Ger채usch체berdeckung",
    wakeLockInactive: "?뵏 Private Etikette sch체tzend",
    selectSound: "Sound ausw채hlen",
    soundDryer: "Haartrockner",
    soundPowerShower: "Power-Dusche",
    soundHeavyDownpour: "Starkregen",
    selectTimer: "Timer-Einstellung",
    setTimer: "Timer-Einstellung",
    volumeControl: "Lautst채rke-Verst채rkung",
    buyCoffee: "?뮇 \"Danke f체r die Rettung!\" Unterst체tzen",
    adsenseLabel: "Werbung",
    donationTitle: "?ㅿ툘 \"Danke f체r die Rettung!\" Unterst체tzen",
    donationDesc: "Wenn dir dieser kostenlose Service geholfen hat, unterst체tze den Entwickler mit einem Kaffee!",
    donationThankYou: "Deine Unterst체tzung h채lt diesen Dienst am Leben. Herzlichen Dank!",
    laterBtn: "Sp채ter",
    bathroomEssential: "Badezimmer-Empfehlung",
    affiliateText: "?㎉ Feuchtt체cher Spezialangebot ??
  },
  fr: {
    appSubtitle: "?뵏 Prot챕ger votre 챕tiquette de confidentialit챕 aux toilettes",
    installApp: "?벒 Installer l'application",
    pwaPrompt: "?벑 Ajouter 횪 l'챕cran d'accueil pour l'application !",
    install: "Installer",
    wakeLockActive: "??Masquage sonore 횪 100%",
    wakeLockInactive: "?뵏 Prot챕ger votre 챕tiquette priv챕e",
    selectSound: "S챕lectionner le son",
    soundDryer: "S챔che-cheveux",
    soundPowerShower: "Douche puissante",
    soundHeavyDownpour: "Pluie battante",
    selectTimer: "R챕glage du minuteur",
    setTimer: "R챕glage du minuteur",
    volumeControl: "Amplification du volume",
    buyCoffee: "?뮇 \"Merci d'avoir sauv챕 la situation !\" Soutenir",
    adsenseLabel: "Publicit챕",
    donationTitle: "?ㅿ툘 \"Merci d'avoir sauv챕 la situation !\" Soutenir",
    donationDesc: "Si ce service gratuit vous a aid챕, soutenez le d챕veloppeur en lui offrant un caf챕 !",
    donationThankYou: "Votre soutien permet de maintenir ce service. Merci du fond du c흹ur !",
    laterBtn: "Plus tard",
    bathroomEssential: "Recommandation salle de bain",
    affiliateText: "?㎉ Offre sp챕ciale lingettes humides jetables ??
  },
  vi: {
    appSubtitle: "?뵏 B梳즣 v沼?l沼땉h s沼?ri챗ng t튼 trong nh횪 v沼?sinh",
    installApp: "?벒 C횪i 휃梳톞 沼쯰g d沼쩸g",
    pwaPrompt: "?벑 Th챗m v횪o m횪n h챙nh ch챠nh 휃沼?d첫ng nh튼 沼쯰g d沼쩸g!",
    install: "C횪i 휃梳톞",
    wakeLockActive: "??Che ph沼?ti梳퓆g 沼뱊 100%",
    wakeLockInactive: "?뵏 B梳즣 v沼?s沼?ri챗ng t튼 l沼땉h s沼?,
    selectSound: "Ch沼뛫 창m thanh",
    soundDryer: "M찼y s梳쪅 t처c",
    soundPowerShower: "V챵i sen m梳죒h",
    soundHeavyDownpour: "M튼a r횪o l沼썀",
    selectTimer: "C횪i 휃梳톞 h梳퉚 gi沼?,
    setTimer: "C횪i 휃梳톞 h梳퉚 gi沼?,
    volumeControl: "T훱ng c튼沼쓓g 창m l튼沼즢g",
    buyCoffee: "?뮇 \"C梳즡 퉤n v챙 휃찾 c沼쯷 nguy!\" 沼쫚g h沼?,
    adsenseLabel: "Qu梳즢g c찼o",
    donationTitle: "?ㅿ툘 \"C梳즡 퉤n v챙 휃찾 c沼쯷 nguy!\" 沼쫚g h沼?,
    donationDesc: "N梳퓎 d沼땉h v沼?mi沼꿳 ph챠 n횪y gi첬p 챠ch cho b梳죒, h찾y m沼쓎 nh횪 ph찼t tri沼긪 m沼셳 t찼ch c횪 ph챗!",
    donationThankYou: "T梳쩷 l챵ng c沼쬪 b梳죒 l횪 휃沼셬g l沼켧 duy tr챙 d沼땉h v沼?n횪y. Ch창n th횪nh c梳즡 퉤n!",
    laterBtn: "휂沼?sau",
    bathroomEssential: "G沼즜 첵 ph챵ng t梳칖",
    affiliateText: "?㎉ Kh훱n gi梳쪅 튼沼썇 v沼?sinh x梳?휃튼沼즓 gi찼 t沼몋 ??
  },
  id: {
    appSubtitle: "?뵏 Etiket Suara Toilet Menjaga Privasi Anda",
    installApp: "?벒 Instal Aplikasi",
    pwaPrompt: "?벑 Tambahkan ke Layar Utama untuk aplikasi!",
    install: "Instal",
    wakeLockActive: "??100% Meredam Kebisingan",
    wakeLockInactive: "?뵏 Menjaga Etiket Privasi Anda",
    selectSound: "Pilih Suara",
    soundDryer: "Pengering Rambut",
    soundPowerShower: "Kran Pancuran Kencang",
    soundHeavyDownpour: "Hujan Lebat",
    selectTimer: "Pengaturan Timer",
    setTimer: "Pengaturan Timer",
    volumeControl: "Penguat Volume",
    buyCoffee: "?뮇 \"Terima kasih sudah menyelamatkan momen!\" Dukung",
    adsenseLabel: "Iklan",
    donationTitle: "?ㅿ툘 \"Terima kasih sudah menyelamatkan momen!\" Dukung",
    donationDesc: "Jika layanan gratis ini membantu Anda, dukung pengembang dengan secangkir kopi!",
    donationThankYou: "Dukungan hangat Anda adalah energi untuk menjaga layanan ini. Terima kasih tulus!",
    laterBtn: "Nanti",
    bathroomEssential: "Rekomendasi Kamar Mandi",
    affiliateText: "?㎉ Promo Spesial Tisu Basah Toilet ??
  },
  th: {
    appSubtitle: "?뵏 錫□림錫｀륭錫꿋툠仙錫む링錫№툏仙꺺툢錫ム퉱錫?툏錫쇸퉱錫녀?錫왽막仙댽릎錫꾝름錫꿋륫仙錫쎹퉯錫쇸릉仙댽름錫쇸툞錫긍름",
    installApp: "?벒 錫뺖릿錫붲툞錫긍퉱錫뉋퉩錫?툤錫왽른錫닮?錫꾝툓錫긍툢",
    pwaPrompt: "?벑 仙錫왽릿仙댽륫仙꾝툤錫№릴錫뉋릊錫쇸퉱錫꿋툑錫?릊錫?릴錫곟?錫왽막仙댽릎仙꺺툓仙됢툏錫꿋툢仙곟릎錫?",
    install: "錫뺖릿錫붲툞錫긍퉱錫?,
    wakeLockActive: "??錫곟른錫싟?錫む링錫№툏錫｀툣錫곟름錫?100%",
    wakeLockInactive: "?뵏 錫쎹툈錫쎹퉱錫?툏錫□림錫｀륭錫꿋툠錫꾝름錫꿋륫仙錫쎹퉯錫쇸릉仙댽름錫쇸툞錫긍름",
    selectSound: "仙錫?막錫?툈仙錫む링錫№툏",
    soundDryer: "仙꾝툝錫｀퉴仙錫쎹퉰錫꿋툥錫?,
    soundPowerShower: "錫앧릴錫곟툣錫긍름仙곟르錫뉋릉錫밝툏",
    soundHeavyDownpour: "錫앧툢錫뺖툈錫ム툢錫긍툈",
    selectTimer: "錫뺖릴仙됢툏仙錫㏅른錫?,
    setTimer: "錫뺖릴仙됢툏仙錫㏅른錫?,
    volumeControl: "仙錫｀퉰錫뉋르錫겯툝錫긍툣仙錫む링錫№툏",
    buyCoffee: "?뮇 \"錫귖릎錫싟툌錫멘툜錫쀠링仙댽툓仙댽름錫№퉩錫곟퉱錫む툟錫꿋툢錫곟림錫｀툜仙?\" 錫む툢錫긍툣錫む툢錫멘툢",
    adsenseLabel: "仙귖툎錫⒯툜錫?,
    donationTitle: "?ㅿ툘 \"錫귖릎錫싟툌錫멘툜錫쀠링仙댽툓仙댽름錫№퉩錫곟퉱錫む툟錫꿋툢錫곟림錫｀툜仙?\" 錫む툢錫긍툣錫む툢錫멘툢",
    donationDesc: "錫ム림錫곟툣錫｀릿錫곟림錫｀툨錫｀링錫쇸링仙됢툓仙댽름錫№툌錫멘툜仙꾝툝仙?錫□릎錫싟툈錫꿋퉩錫잀?錫쎹퉯錫쇸툈錫녀른錫긍툏仙꺺툑仙꺺릊仙됢툥錫밝퉱錫왽릴錫믞툢錫꿋퉬錫붲퉱錫쇸린錫꾝르錫긍툣!",
    donationThankYou: "錫곟립錫?릴錫뉋퉫錫댽툊錫?툏錫꾝만錫볙툌錫룅릎仙곟르錫뉋툊錫긍툣仙錫꾝른錫룅퉰錫?툢錫싟르錫닮툈錫꿋르錫쇸링仙?錫귖릎錫싟툧錫｀린錫꾝만錫볙툑錫꿋툈仙꺺툑錫댽르錫닮툏!",
    laterBtn: "仙꾝름仙됢툠錫듀릊錫?릴錫?,
    bathroomEssential: "錫귖릎錫뉋퉩錫쇸린錫쇸립仙꺺툢錫ム퉱錫?툏錫쇸퉱錫?,
    affiliateText: "?㎉ 仙귖툤錫｀퉪錫□툓錫긍퉰錫?錫쀠릿錫듺툓錫밝퉰仙錫쎹링錫№툈錫듺릴錫곟퉪錫꾝르錫???
  },
  ar: {
    appSubtitle: "?뵏 笠膜碼磨 碼?巒?魔 ?? 碼??邈幕碼彎 ?幕?碼?馬 碼?漠巒?巒?馬",
    installApp: "?벒 魔麻磨?魔 碼?魔慢磨??",
    pwaPrompt: "?벑 粒彎? 瑪?? 碼?娩碼娩馬 碼?邈痲?卍?馬 ?魔寞邈磨馬 碼?魔慢磨??!",
    install: "魔麻磨?魔",
    wakeLockActive: "??魔曼慢?馬 碼?彎?彎碼立 磨?卍磨馬 100%",
    wakeLockInactive: "?뵏 幕?碼?馬 碼?漠巒?巒?馬 ?碼???碼?馬",
    selectSound: "碼漠魔邈 碼?巒?魔",
    soundDryer: "?寞?? 碼?娩晩邈",
    soundPowerShower: "膜娩 ???",
    soundHeavyDownpour: "?慢邈 曼万?邈",
    selectTimer: "瑪晩膜碼膜 碼??摩?魔",
    setTimer: "瑪晩膜碼膜 碼??摩?魔",
    volumeControl: "魔晩万?万 ?卍魔?? 碼?巒?魔",
    buyCoffee: "?뮇 \"娩?邈碼? 晩?? 瑪??碼莫 碼?????!\" 膜晩?",
    adsenseLabel: "瑪晩?碼?",
    donationTitle: "?ㅿ툘 \"娩?邈碼? 晩?? 瑪??碼莫 碼?????!\" 膜晩?",
    donationDesc: "瑪莫碼 卍碼晩膜魔? ?莫? 碼?漠膜?馬 碼??寞碼??馬? 粒膜晩? 碼??慢?邈 磨??寞碼? ???馬!",
    donationThankYou: "膜晩?? 碼?膜碼?痲 ?? 碼???馬 碼?魔? 魔幕碼?挽 晩?? ?莫? 碼?漠膜?馬. 娩?邈碼? 寞万??碼?!",
    laterBtn: "?碼幕?碼?",
    bathroomEssential: "魔?巒?碼魔 碼?幕?碼?",
    affiliateText: "?㎉ 晩邈彎 漠碼巒 晩?? ??碼膜?? 碼?????? 碼??磨??馬 ??
  },
  ru: {
    pwaPrompt: "?벑 ?棘閨逵勻??筠 戟逵 均剋逵勻戟?橘 ?克?逵戟 克逵克 極?龜剋棘菌筠戟龜筠!",
    install: "叫??逵戟棘勻龜??",
    wakeLockActive: "??100% ?逵?克龜?棘勻克逵 ??劇逵",
    wakeLockInactive: "?뵏 ?棘戟?龜畇筠戟?龜逵剋?戟?橘 ??龜克筠?",
    selectSound: "??閨棘? 鈞勻?克逵",
    soundDryer: "圭筠戟",
    soundPowerShower: "?棘?戟?橘 畇??",
    soundHeavyDownpour: "鬼龜剋?戟?橘 極?棘剋龜勻戟棘橘 畇棘菌畇?",
    selectTimer: "龜逵橘劇筠?",
    volumeControl: "叫?龜剋筠戟龜筠 均?棘劇克棘??龜",
    buyCoffee: "?뮇 짬鬼極逵?龜閨棘, ?極逵?剋龜 ?龜??逵?龜?!쨩 ?棘畇畇筠?菌逵??",
    adsenseLabel: "?筠克剋逵劇逵",
    donationTitle: "?ㅿ툘 짬鬼極逵?龜閨棘, ?極逵?剋龜 ?龜??逵?龜?!쨩 ?棘畇畇筠?菌逵??",
    donationDesc: "??剋龜 ??棘? 閨筠?極剋逵?戟?橘 ?筠?勻龜? 勻逵劇 極棘劇棘均, ?均棘??龜?筠 ?逵鈞?逵閨棘??龜克逵 ?逵?筠?克棘橘 克棘?筠!",
    donationThankYou: "?逵?逵 極棘畇畇筠?菌克逵 ???龜剋逵, 極棘畇畇筠?菌龜勻逵??逵? ??棘? ?筠?勻龜?. ?均?棘劇戟棘筠 ?極逵?龜閨棘!",
    laterBtn: "?棘鈞菌筠",
    bathroomEssential: "?筠克棘劇筠戟畇?筠劇 畇剋? 勻逵戟戟棘橘",
    affiliateText: "?㎉ 鬼劇?勻逵筠劇逵? 勻剋逵菌戟逵? ??逵剋筠?戟逵? 閨?劇逵均逵 ?棘 ?克龜畇克棘橘 ??
  },
  hi: {
    pwaPrompt: "?벑 西먣ㄺ 西끶ㄸ誓곟ㄽ西?西뺖쪍 西꿋ㅏ西?西밝쪑西?西멘쪓西뺖쪓西겯?西?西むㅀ 西쒉쪑西□ㅌ誓뉋쨧!",
    install: "西뉋쨧西멘쪓西잀쪏西?,
    wakeLockActive: "??100% 西뜩쪑西?西쎹쪇西むㅎ西뤲쨧",
    wakeLockInactive: "?뵏 西녱ㄺ西뺖? 西쀠쪑西むㄸ誓西?ㄴ西?西뜩ㅏ西룅쪓西잀ㅎ西싟ㅎ西?,
    selectSound: "西㏅쪓西듀ㄸ西?西싟쪇西ⓣ쪍西?,
    soundDryer: "西밝쪍西?ㅀ 西□쪓西겯ㅎ西?ㅀ",
    soundPowerShower: "西ㅰ쪍西쒉ㅌ 西뜩ㅎ西듀ㅀ",
    soundHeavyDownpour: "西?쪇西멘ㅂ西약ㄷ西약ㅀ 西оㅎ西겯ㅏ西?,
    selectTimer: "西잀ㅎ西뉋ㄾ西?西멘쪍西?西뺖ㅀ誓뉋쨧",
    volumeControl: "西녱ㅅ西약쩂西?西о쪈西멘쪓西?西멘쪍西잀ㅏ西귖쨽誓띭ㅈ",
    buyCoffee: "?뮇 \"西뜩ㅀ誓띭ㄾ西욈쨧西╆쨽誓 西멘쪍 西о쩀西약ㄸ誓?西뺖쪍 西꿋ㅏ西?西㏅ㄸ誓띭ㄿ西듀ㅎ西?\" 西멘ㄾ西겯쪓西?ㄸ 西╆쪍西?,
    adsenseLabel: "西듀ㅏ西쒉쪓西왽ㅎ西むㄸ",
    donationTitle: "?ㅿ툘 \"西뜩ㅀ誓띭ㄾ西욈쨧西╆쨽誓 西멘쪍 西о쩀西약ㄸ誓?西뺖쪍 西꿋ㅏ西?西㏅ㄸ誓띭ㄿ西듀ㅎ西?\" 西멘ㄾ西겯쪓西?ㄸ 西╆쪍西?,
    donationDesc: "西?ㄶ西?西뉋ㅈ 西?쪇西ム쪓西?西멘쪍西듀ㅎ 西ⓣ쪍 西녱ㄺ西뺖? 西?ㄶ西?西뺖?, 西ㅰ쪑 西□쪍西듀ㅂ西むㅀ 西뺖쪑 西뤲쨻 西뺖쪏西ム? 西멘쪍 西멘ㄾ西겯쪓西?ㄸ 西╆쪍西?",
    donationThankYou: "西녱ㄺ西뺖ㅎ 西멘ㄾ西겯쪓西?ㄸ 西밝? 西뉋ㅈ 西멘쪍西듀ㅎ 西뺖쪑 西쒉ㅎ西겯? 西겯쨼西ⓣ쪍 西뺖? 西ㅰㅎ西뺖ㄴ 西밝쪎誓?西밝ㅎ西겯쪓西╆ㅏ西?西㏅ㄸ誓띭ㄿ西듀ㅎ西?",
    laterBtn: "西оㅎ西?西?쪍西?,
    bathroomEssential: "西оㅎ西?ㅀ誓귖ㄾ 西멘쪇西앧ㅎ西?,
    affiliateText: "?㎉ 西ム쪓西꿋ㅆ誓뉋ㄼ西?西듀쪍西?西듀ㅎ西뉋ㄺ誓띭ㅈ 西묂ㄻ西???
  },
  la: {
    pwaPrompt: "?벑 Adde ad tegulam primariam pro applicatione!",
    install: "Instituere",
    wakeLockActive: "??100% Cooperiendo Clamore",
    wakeLockInactive: "?뵏 Etiquetta Privata et Tutela",
    selectSound: "Elige Sonum",
    soundDryer: "Siccator Capillorum",
    soundPowerShower: "Cataracta Balnei",
    soundHeavyDownpour: "Imber Magnificus",
    selectTimer: "Constitue Horologium",
    volumeControl: "Amplificatio Voluminis",
    buyCoffee: "?뮇 \"Gratias pro auxilio secreto!\" Sustinere",
    adsenseLabel: "Publicitas",
    donationTitle: "?ㅿ툘 \"Gratias pro auxilio secreto!\" Sustinere",
    donationDesc: "Si hoc servitium gratuitum tibi profuit, fave architecto poculum cafei!",
    donationThankYou: "Animus tuus benignus est vis quae hoc servitium conservat. Gratias maximas agimus!",
    laterBtn: "Postea",
    bathroomEssential: "Commendatio Balnei",
    affiliateText: "?㎉ Mappa humida aquosa balnei specialis ??
  }
};

const AFFILIATE_LINKS = {
  ko: { url: "https://link.coupang.com/a/fFeFuNicFg", text: "?㎉ 湲됲븷 ???좎슜??臾쇱뿉 ???밸뒗 鍮꾨뜲 臾쇳떚???ル뵜 蹂닿린 ?? },
  en: { url: "https://www.amazon.com/dp/B000000000", text: "?㎉ Flushable Moist Wipes Special Deal ?? },
  ja: { url: "https://www.amazon.co.jp/dp/B000000000", text: "?㎉ 麗담겓役곥걵?뗣깉?ㅳ꺃?ⓦ궑?ⓦ긿?덀깇?ｃ긿?룔깷 ?밥쐴 ?? },
  zh: { url: "https://www.amazon.com/dp/B000000000", text: "?㎉ ??넳麗닸뮈?뺟보?방깲 ?? },
  es: { url: "https://www.amazon.es/dp/B000000000", text: "?㎉ Oferta especial de toallitas h첬medas desechables ?? },
  pt: { url: "https://www.amazon.com.br/dp/B000000000", text: "?㎉ Oferta especial de len챌os umedecidos lav찼veis ?? },
  de: { url: "https://www.amazon.de/dp/B000000000", text: "?㎉ Feuchtt체cher Spezialangebot ?? },
  fr: { url: "https://www.amazon.fr/dp/B000000000", text: "?㎉ Offre sp챕ciale lingettes humides jetables ?? },
  vi: { url: "https://www.shopee.vn", text: "?㎉ Kh훱n gi梳쪅 튼沼썇 v沼?sinh x梳?휃튼沼즓 gi찼 t沼몋 ?? },
  id: { url: "https://www.tokopedia.com", text: "?㎉ Promo Spesial Tisu Basah Toilet ?? },
  th: { url: "https://www.lazada.co.th", text: "?㎉ 仙귖툤錫｀퉪錫□툓錫긍퉰錫?錫쀠릿錫듺툓錫밝퉰仙錫쎹링錫№툈錫듺릴錫곟퉪錫꾝르錫??? },
  ar: { url: "https://www.amazon.sa/dp/B000000000", text: "?㎉ 晩邈彎 漠碼巒 晩?? ??碼膜?? 碼?????? 碼??磨??馬 ?? },
  ru: { url: "https://www.amazon.com/dp/B000000000", text: "?㎉ 鬼劇?勻逵筠劇逵? 勻剋逵菌戟逵? ??逵剋筠?戟逵? 閨?劇逵均逵 ?棘 ?克龜畇克棘橘 ?? },
  hi: { url: "https://www.amazon.in/dp/B000000000", text: "?㎉ 西ム쪓西꿋ㅆ誓뉋ㄼ西?西듀쪍西?西듀ㅎ西뉋ㄺ誓띭ㅈ 西묂ㄻ西??? },
  la: { url: "https://www.amazon.com/dp/B000000000", text: "?㎉ Mappa humida aquosa balnei specialis ?? }
};

// Global App State
let currentLanguage = 'ko';
let currentSoundName = 'dryer';
let isPlaying = false;
let timer = null;
let timeLeft = 180;
let chosenTimer = 180;
let currentVolumeBoost = 100;
let wakeLock = null;
// deferredPrompt declared at top of file

// Web Audio API Master Processing Chain Nodes
let audioCtx = null;
let masterCompressor = null;
let masterGainNode = null;
let currentBufferSource = null;
let synthNode = null;
const audioBuffers = {};

// Pre-load WAV Audio Files into AudioBuffers
async function loadAudioBuffers() {
  const soundPaths = {
    dryer: './public/assets/dryer.wav',
    power_shower: './public/assets/power_shower.wav',
    heavy_downpour: './public/assets/heavy_downpour.wav'
  };

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!audioCtx && AudioContextClass) {
    audioCtx = new AudioContextClass();
  }

  for (const [key, path] of Object.entries(soundPaths)) {
    try {
      const response = await fetch(path);
      const arrayBuffer = await response.arrayBuffer();
      if (audioCtx) {
        audioBuffers[key] = await audioCtx.decodeAudioData(arrayBuffer);
      }
    } catch (e) {
      console.warn(`Failed to decode audio buffer for ${key}:`, e);
    }
  }
}

// Unlock Audio Context & Build Processing Pipeline
function unlockAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }

  if (audioCtx) {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    if (!masterGainNode) {
      masterCompressor = audioCtx.createDynamicsCompressor();
      masterCompressor.threshold.setValueAtTime(-12, audioCtx.currentTime);
      masterCompressor.knee.setValueAtTime(10, audioCtx.currentTime);
      masterCompressor.ratio.setValueAtTime(4, audioCtx.currentTime);
      masterCompressor.attack.setValueAtTime(0.005, audioCtx.currentTime);
      masterCompressor.release.setValueAtTime(0.15, audioCtx.currentTime);

      masterGainNode = audioCtx.createGain();
      masterGainNode.gain.setValueAtTime(currentVolumeBoost / 100, audioCtx.currentTime);

      masterCompressor.connect(masterGainNode);
      masterGainNode.connect(audioCtx.destination);
    }
  }
}

// Procedural Audio Synthesizer (Fallback Node)
function createSynthSoundNode(soundType) {
  if (!audioCtx) unlockAudioContext();
  if (!audioCtx) return null;

  const bufferSize = audioCtx.sampleRate * 2;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);

  let b0=0, b1=0, b2=0, b3=0, b4=0, b5=0, b6=0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
    b6 = white * 0.115926;
    
    let motorHum = 0;
    if (soundType === 'dryer') {
      const t = i / audioCtx.sampleRate;
      motorHum = 0.25 * Math.sin(2 * Math.PI * 120 * t);
    }
    
    data[i] = pink * 0.11 + motorHum;
  }

  const noiseSource = audioCtx.createBufferSource();
  noiseSource.buffer = buffer;
  noiseSource.loop = true;

  const filter = audioCtx.createBiquadFilter();
  if (soundType === 'dryer') {
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(900, audioCtx.currentTime);
    filter.Q.setValueAtTime(0.6, audioCtx.currentTime);
  } else if (soundType === 'power_shower') {
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(2500, audioCtx.currentTime);
  } else if (soundType === 'flush') {
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, audioCtx.currentTime);
    filter.Q.setValueAtTime(0.8, audioCtx.currentTime);
  } else { // heavy_downpour
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, audioCtx.currentTime);
  }

  noiseSource.connect(filter);
  filter.connect(masterCompressor ? masterCompressor : audioCtx.destination);

  return noiseSource;
}

function stopSynthSound() {
  if (synthNode) {
    try {
      synthNode.stop();
      synthNode.disconnect();
    } catch (e) {}
    synthNode = null;
  }
}

function startSynthSound(soundType) {
  stopSynthSound();
  unlockAudioContext();
  synthNode = createSynthSoundNode(soundType);
  if (synthNode) {
    synthNode.start(0);
  }
}

// DOM Elements
const mainPlayBtn = document.getElementById('mainPlayBtn');
const playBtn = document.getElementById('playBtn') || mainPlayBtn;
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const buttonContainer = mainPlayBtn || document.querySelector('.button-container');
const timerCountdown = document.getElementById('timerText') || document.getElementById('timerCountdown');
const wakeLockBadge = document.getElementById('wakeLockBadge');
const wakeLockText = document.getElementById('wakeLockText');
const langSelect = document.getElementById('langSelect');
const soundBtns = document.querySelectorAll('.sound-btn');
const timerBtns = document.querySelectorAll('.timer-btn');
const volumeRange = document.getElementById('volumeRange');
const volumeBadge = document.getElementById('volumeBadge');

const supportBtn = document.getElementById('supportBtn');
const supportModal = document.getElementById('supportModal');
const closeModal = document.getElementById('closeModal');
const laterBtn = document.getElementById('laterBtn');

const payTabKr = document.getElementById('payTabKr');
const payTabGlobal = document.getElementById('payTabGlobal');
const payTabJa = document.getElementById('payTabJa');
const payTabZh = document.getElementById('payTabZh');
const payTabEs = document.getElementById('payTabEs');
const payTabPt = document.getElementById('payTabPt');
const payTabLa = document.getElementById('payTabLa');

const krDonationList = document.getElementById('krDonationList');
const globalDonationList = document.getElementById('globalDonationList');
const jaDonationList = document.getElementById('jaDonationList');
const zhDonationList = document.getElementById('zhDonationList');
const esDonationList = document.getElementById('esDonationList');
const ptDonationList = document.getElementById('ptDonationList');
const laDonationList = document.getElementById('laDonationList');

const installBanner = document.getElementById('installBanner');
const btnInstall = document.getElementById('btnInstall');
const btnCloseInstall = document.getElementById('btnCloseInstall');

const affiliateLink = document.getElementById('affiliateLink');
const bannerText = document.getElementById('bannerText');

// Initial Setup
document.addEventListener('DOMContentLoaded', async () => {
  detectLanguage();
  setupEventListeners();
  updateTimerDisplay();
  updateAffiliateBanner();
  
  if (volumeRange) {
    volumeRange.value = 300;
  }
  updateVolumeUI();
  
  loadAudioBuffers();

  // beforeinstallprompt listener is at top of file
});

function detectLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  const langCode = browserLang ? browserLang.substring(0, 2) : 'ko';
  if (I18N[langCode]) {
    currentLanguage = langCode;
  } else {
    currentLanguage = 'en';
  }
  if (langSelect) langSelect.value = currentLanguage;
  applyLocalization();
}

function applyLocalization() {
  const dict = I18N[currentLanguage] || I18N['en'];
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = dict[key] || (I18N['en'] && I18N['en'][key]) || (I18N['ko'] && I18N['ko'][key]);
    if (translation) {
      el.textContent = translation;
    }
  });

  // Explicitly guarantee bottom install button & disclaimer translation
  const installBtnText = document.getElementById('installBtnText');
  if (installBtnText) {
    installBtnText.textContent = dict['installApp'] || (I18N['en'] && I18N['en']['installApp']) || '?벒 Install App';
  }

  if (currentLanguage === 'ko') {
    switchPaymentTab('kr');
  } else if (currentLanguage === 'ja') {
    switchPaymentTab('ja');
  } else if (currentLanguage === 'zh') {
    switchPaymentTab('zh');
  } else if (currentLanguage === 'es') {
    switchPaymentTab('es');
  } else if (currentLanguage === 'pt') {
    switchPaymentTab('pt');
  } else if (currentLanguage === 'la') {
    switchPaymentTab('la');
  } else {
    switchPaymentTab('global');
  }

  updateTimerDisplay();
  updateAffiliateBanner();
}

function switchPaymentTab(type) {
  [payTabKr, payTabGlobal, payTabJa, payTabZh, payTabEs, payTabPt, payTabLa].forEach(t => t && t.classList.remove('active'));
  if (krDonationList) krDonationList.classList.add('hidden');
  if (globalDonationList) globalDonationList.classList.add('hidden');

  if (type === 'kr') {
    if (payTabKr) payTabKr.classList.add('active');
    if (krDonationList) krDonationList.classList.remove('hidden');
  } else {
    if (type === 'ja' && payTabJa) payTabJa.classList.add('active');
    else if (type === 'zh' && payTabZh) payTabZh.classList.add('active');
    else if (type === 'es' && payTabEs) payTabEs.classList.add('active');
    else if (type === 'pt' && payTabPt) payTabPt.classList.add('active');
    else if (type === 'la' && payTabLa) payTabLa.classList.add('active');
    else if (payTabGlobal) payTabGlobal.classList.add('active');
    
    if (globalDonationList) globalDonationList.classList.remove('hidden');
  }
}

function updateAffiliateBanner() {
  if (!affiliateLink || !bannerText) return;
  const data = AFFILIATE_LINKS[currentLanguage] || AFFILIATE_LINKS['en'];
  affiliateLink.href = data.url;
  bannerText.textContent = data.text;
}

function updateVolumeUI() {
  if (!volumeBadge || !volumeRange) return;
  const val = parseInt(volumeRange.value, 10);
  currentVolumeBoost = val;
  
  if (val > 100) {
    volumeBadge.textContent = `${val}% BOOST`;
    volumeBadge.style.color = 'var(--accent-purple)';
  } else {
    volumeBadge.textContent = `${val}%`;
    volumeBadge.style.color = 'var(--text-sub)';
  }
  
  if (masterGainNode && audioCtx) {
    masterGainNode.gain.setValueAtTime(val / 100, audioCtx.currentTime);
  }
}

function setupEventListeners() {
  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      currentLanguage = e.target.value;
      applyLocalization();
    });
  }

  // Payment Tab Switches (Korea, Global, Japan, China, Spain, Brasil, Latina)
  if (payTabKr) {
    payTabKr.addEventListener('click', () => switchPaymentTab('kr'));
  }
  if (payTabGlobal) {
    payTabGlobal.addEventListener('click', () => switchPaymentTab('global'));
  }
  if (payTabJa) {
    payTabJa.addEventListener('click', () => switchPaymentTab('ja'));
  }
  if (payTabZh) {
    payTabZh.addEventListener('click', () => switchPaymentTab('zh'));
  }
  if (payTabEs) {
    payTabEs.addEventListener('click', () => switchPaymentTab('es'));
  }
  if (payTabPt) {
    payTabPt.addEventListener('click', () => switchPaymentTab('pt'));
  }
  if (payTabLa) {
    payTabLa.addEventListener('click', () => switchPaymentTab('la'));
  }

  // Volume Range Slider
  if (volumeRange) {
    volumeRange.addEventListener('input', () => {
      unlockAudioContext();
      updateVolumeUI();
    });
  }

  // Play / Pause Toggle
  if (mainPlayBtn) {
    mainPlayBtn.addEventListener('click', () => {
      unlockAudioContext();
      togglePlayback();
    });
  }
  if (playBtn && playBtn !== mainPlayBtn) {
    playBtn.addEventListener('click', () => {
      unlockAudioContext();
      togglePlayback();
    });
  }

  // Sound selection buttons
  soundBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      unlockAudioContext();
      soundBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const newSound = btn.dataset.sound;
      const wasPlaying = isPlaying;
      
      if (isPlaying) {
        stopSoundOnly();
      }
      
      currentSoundName = newSound;
      
      if (wasPlaying) {
        startSound();
      }
    });
  });

  // Timer selection buttons
  timerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timerBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const selectedVal = btn.dataset.time;
      if (selectedVal === 'infinite') {
        chosenTimer = 'infinite';
        timeLeft = 0;
      } else {
        chosenTimer = parseInt(selectedVal, 10);
        timeLeft = chosenTimer;
      }
      
      updateTimerDisplay();
      if (isPlaying) {
        resetTimerCountdown();
      }
    });
  });

  if (supportBtn) {
    supportBtn.addEventListener('click', () => {
      if (supportModal) supportModal.classList.remove('hidden');
    });
  }

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      if (supportModal) supportModal.classList.add('hidden');
    });
  }

  if (laterBtn) {
    laterBtn.addEventListener('click', () => {
      if (supportModal) supportModal.classList.add('hidden');
    });
  }

  if (supportModal) {
    supportModal.addEventListener('click', (e) => {
      if (e.target === supportModal) {
        supportModal.classList.add('hidden');
      }
    });
  }

  function showToast(message) {
    let toast = document.getElementById('appToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'appToast';
      toast.className = 'app-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // PWA Benefit Card Modal Elements & Logic (1:06 exact flow)
  const pwaModal = document.getElementById('pwaModal');
  const closePwaModal = document.getElementById('closePwaModal');
  const btnPwaModalCancel = document.getElementById('btnPwaModalCancel');
  const btnDirectAndroidInstall = document.getElementById('btnDirectAndroidInstall');

  function openPwaModal() {
    if (pwaModal) pwaModal.classList.remove('hidden');
  }

  function closePwaModalFunc() {
    if (pwaModal) pwaModal.classList.add('hidden');
  }

  if (closePwaModal) closePwaModal.addEventListener('click', closePwaModalFunc);
  if (btnPwaModalCancel) btnPwaModalCancel.addEventListener('click', closePwaModalFunc);
  if (pwaModal) {
    pwaModal.addEventListener('click', (e) => {
      if (e.target === pwaModal) closePwaModalFunc();
    });
  }

  // Action inside the 1:06 White Benefit Modal Card
  if (btnDirectAndroidInstall) {
    btnDirectAndroidInstall.addEventListener('click', () => {
      closePwaModalFunc();
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            showToast(currentLanguage === 'ko' ? '🎉 바탕화면에 앱이 성공적으로 설치되었습니다!' : '🎉 App installed on home screen!');
          }
          deferredPrompt = null;
        });
      } else {
        // Direct Fallback Download: Restored local same-origin link
        try {
          var a = document.createElement('a');
          a.href = './public/assets/SoundCover.apk';
          a.download = 'SoundCover.apk';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } catch (e) {}
      }
    });
  }

  // Main Home Footer Button: Open 1:06 Benefit Modal Instantly
  const btnFooterInstall = document.getElementById('btnFooterInstall');
  if (btnFooterInstall) {
    btnFooterInstall.addEventListener('click', () => {
      var ua = navigator.userAgent.toLowerCase();
      var isKakao = /kakaotalk/i.test(ua);

      // 1. KakaoTalk WebView: Unified escape to open external browser
      if (isKakao) {
        showToast(currentLanguage === 'ko' ? '🚀 외부 브라우저로 이동하여 설치를 진행합니다...' : '🚀 Opening external browser for installation...');
        location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(window.location.href);
        return;
      }

      // 2. Normal Browsers: Open 4-line benefit modal card
      openPwaModal();
    });
  }
}

function togglePlayback() {
  if (isPlaying) {
    stopSound();
  } else {
    startSound();
  }
}

function stopSoundOnly() {
  stopSynthSound();
  if (currentBufferSource) {
    try {
      currentBufferSource.stop(0);
      currentBufferSource.disconnect();
    } catch (e) {}
    currentBufferSource = null;
  }
  if (masterGainNode) {
    try {
      if (audioCtx) masterGainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      masterGainNode.disconnect();
    } catch (e) {}
    masterGainNode = null;
  }
  if (masterCompressor) {
    try {
      masterCompressor.disconnect();
    } catch (e) {}
    masterCompressor = null;
  }
  if (audioCtx) {
    try {
      audioCtx.close();
    } catch (e) {}
    audioCtx = null;
  }
}

async function startSound() {
  stopSoundOnly();
  unlockAudioContext();
  
  if (masterGainNode && audioCtx) {
    try {
      masterGainNode.gain.setValueAtTime(currentVolumeBoost / 100, audioCtx.currentTime);
    } catch (e) {}
  }
  
  const buffer = audioBuffers[currentSoundName];
  
  if (buffer && audioCtx && masterCompressor) {
    currentBufferSource = audioCtx.createBufferSource();
    currentBufferSource.buffer = buffer;
    currentBufferSource.loop = true;
    currentBufferSource.connect(masterCompressor);
    currentBufferSource.start(0);
  } else {
    startSynthSound(currentSoundName);
  }

  isPlaying = true;
  const targetBtn = mainPlayBtn || playBtn;
  if (targetBtn) {
    targetBtn.classList.add('playing');
    const shape = targetBtn.querySelector('.play-icon-shape');
    if (shape) shape.textContent = '?싢씂';
  }
  if (playIcon) playIcon.classList.add('hidden');
  if (pauseIcon) pauseIcon.classList.remove('hidden');

  resetTimerCountdown();
  requestWakeLock();
}

function stopSound() {
  stopSoundOnly();

  isPlaying = false;
  const targetBtn = mainPlayBtn || playBtn;
  if (targetBtn) {
    targetBtn.classList.remove('playing');
    const shape = targetBtn.querySelector('.play-icon-shape');
    if (shape) shape.textContent = '??;
  }
  if (playIcon) playIcon.classList.remove('hidden');
  if (pauseIcon) pauseIcon.classList.add('hidden');

  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  timeLeft = chosenTimer === 'infinite' ? 0 : chosenTimer;
  updateTimerDisplay();
  releaseWakeLock();
}

function resetTimerCountdown() {
  if (timer) {
    clearInterval(timer);
  }
  
  if (chosenTimer === 'infinite') {
    updateTimerDisplay();
    return;
  }
  
  timeLeft = chosenTimer;
  updateTimerDisplay();
  
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    
    if (timeLeft <= 0) {
      stopSound();
    }
  }, 1000);
}

function updateTimerDisplay() {
  if (!timerCountdown) return;
  if (chosenTimer === 'infinite') {
    timerCountdown.textContent = '??;
    return;
  }
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerCountdown.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

async function requestWakeLock() {
  if ('wakeLock' in navigator) {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
      if (wakeLockBadge) {
        wakeLockBadge.classList.remove('badge-inactive');
        wakeLockBadge.classList.add('badge-active');
      }
      if (wakeLockText && I18N[currentLanguage]) {
        wakeLockText.textContent = I18N[currentLanguage].wakeLockActive;
      }
    } catch (err) {
      console.warn(`Wake Lock error: ${err.message}`);
    }
  }
}

function releaseWakeLock() {
  if (wakeLock) {
    wakeLock.release().then(() => {
      wakeLock = null;
      if (wakeLockBadge) {
        wakeLockBadge.classList.add('badge-inactive');
        wakeLockBadge.classList.remove('badge-active');
      }
      if (wakeLockText && I18N[currentLanguage]) {
        wakeLockText.textContent = I18N[currentLanguage].wakeLockInactive;
      }
    });
  }
}

document.addEventListener('visibilitychange', async () => {
  if (wakeLock !== null && document.visibilityState === 'visible' && isPlaying) {
    await requestWakeLock();
  }
});
