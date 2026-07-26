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
    appSubtitle: "🔒 프라이빗하게 지켜 드리는 화장실 소리 에티켓",
    installApp: "📲 앱 설치",
    pwaPrompt: "📱 홈 화면에 추가하여 앱처럼 사용하세요!",
    install: "설치",
    wakeLockActive: "✨ 100% 소음 커버 중",
    wakeLockInactive: "🔒 프라이빗하게 지켜 드리는 화장실 소리 에티켓",
    selectSound: "음원 선택",
    soundDryer: "드라이기",
    soundPowerShower: "강력 샤워기",
    soundHeavyDownpour: "장대비",
    selectTimer: "타이머 설정",
    setTimer: "타이머 설정",
    volumeControl: "볼륨 설정 (소리 증폭)",
    buyCoffee: "💖 \"덕분에 민망함 해결했어요!\" 응원하기",
    adsenseLabel: "광고 영역",
    donationTitle: "❤️ \"덕분에 민망함 해결했어요!\" 응원하기",
    donationDesc: "무료 에티켓 서비스를 유용하게 쓰셨다면 개발자에게 따뜻한 응원의 마음을 전해보세요!",
    donationThankYou: "당신의 따뜻한 마음이 이 서비스를 지켜나가는 힘이 됩니다. 진심으로 감사드려요.",
    laterBtn: "나중에 할게요",
    bathroomEssential: "화장실 추천템",
    affiliateText: "🧻 급할 때 유용한 물에 잘 녹는 비데 물티슈 핫딜 보기"
  },
  en: {
    appSubtitle: "🔒 Privately Protecting Your Bathroom Sound Etiquette",
    installApp: "📲 Install App",
    pwaPrompt: "📱 Add to Home Screen for app experience!",
    install: "Install",
    wakeLockActive: "✨ 100% Noise Masking",
    wakeLockInactive: "🔒 Privately Protecting Your Etiquette",
    selectSound: "Select Sound",
    soundDryer: "Hair Dryer",
    soundPowerShower: "Power Shower",
    soundHeavyDownpour: "Heavy Downpour",
    selectTimer: "Timer Setting",
    setTimer: "Timer Setting",
    volumeControl: "Volume Boost & Level",
    buyCoffee: "💖 \"Thanks for solving the embarrassing sound!\" Support Us",
    adsenseLabel: "Advertisement",
    donationTitle: "❤️ \"Thanks for solving the embarrassing sound!\" Support Us",
    donationDesc: "Your warm support helps SoundCover protect your small private moments. Thank you!",
    donationThankYou: "Your warm heart is the power that keeps this service going. We sincerely thank you!",
    laterBtn: "Later",
    bathroomEssential: "Bathroom Essential",
    affiliateText: "🧻 Flushable Moist Wipes Special Deal →"
  },
  ja: {
    appSubtitle: "🔒 プライベートを守るトイレ音エチケット",
    installApp: "📲 アプリインストール",
    pwaPrompt: "📱 ホーム画面に追加してアプリとして使用！",
    install: "インストール",
    wakeLockActive: "✨ 100% 騒音遮断中",
    wakeLockInactive: "🔒 プライベートを守るエチケット",
    selectSound: "サウンド選択",
    soundDryer: "ヘアド라이ヤー",
    soundPowerShower: "強力シャワー",
    soundHeavyDownpour: "土砂降り",
    selectTimer: "タイマー設定",
    setTimer: "タイマー設定",
    volumeControl: "音量ブースト設定",
    buyCoffee: "💖 「おかげで助かりました！」 応援する",
    adsenseLabel: "広告エリア",
    donationTitle: "❤️ 「おかげで助かりました！」 応援する",
    donationDesc: "快適なマナー音サービスが役に立ったら、温かいご支援をお願いします！",
    donationThankYou: "あなたの温かい気持ちがサービスを続ける力になります。心より感謝いたします。",
    laterBtn: "あとで",
    bathroomEssential: "トイレおすすめアイテム",
    affiliateText: "🧻 水に流せるトイレ用ウエットティッシュ →"
  },
  zh: {
    appSubtitle: "🔒 保护隐私的洗手间礼仪音效",
    installApp: "📲 安装应用",
    pwaPrompt: "📱 添加到主屏幕，体验原生应用！",
    install: "安装",
    wakeLockActive: "✨ 100% 噪音遮盖中",
    wakeLockInactive: "🔒 隐私守护礼仪",
    selectSound: "选择音效",
    soundDryer: "吹风机",
    soundPowerShower: "强力花洒",
    soundHeavyDownpour: "倾盆大雨",
    selectTimer: "定时设置",
    setTimer: "定时设置",
    volumeControl: "音量增强设置",
    buyCoffee: "💖 “多亏了这个，帮大忙了！” 给予支持",
    adsenseLabel: "赞助广告",
    donationTitle: "❤️ “多亏了这个，帮大忙了！” 给予支持",
    donationDesc: "如果这个免费礼仪音效帮到了您，欢迎支持开发者一杯咖啡！",
    donationThankYou: "您的温暖支持是维持本服务运营的力量。衷心感谢您！",
    laterBtn: "稍后再说",
    bathroomEssential: "洗手间推荐",
    affiliateText: "🧻 可冲水湿厕纸特惠 →"
  },
  es: {
    appSubtitle: "🔒 Protocolo de etiqueta privada para baños",
    installApp: "📲 Instalar App",
    pwaPrompt: "📱 ¡Añade a la pantalla de inicio para la experiencia de app!",
    install: "Instalar",
    wakeLockActive: "✨ Enmascaramiento de ruido al 100%",
    wakeLockInactive: "🔒 Protocolo de etiqueta privada",
    selectSound: "Seleccionar sonido",
    soundDryer: "Secador de pelo",
    soundPowerShower: "Ducha potente",
    soundHeavyDownpour: "Lluvia torrencial",
    selectTimer: "Ajuste de temporizador",
    setTimer: "Ajuste de temporizador",
    volumeControl: "Aumento de volumen",
    buyCoffee: "💖 \"¡Gracias por salvar el momento!\" Apoyar",
    adsenseLabel: "Publicidad",
    donationTitle: "❤️ \"¡Gracias por salvar el momento!\" Apoyar",
    donationDesc: "Si este servicio gratuito de etiqueta te ayudó, ¡envía un cálido café al desarrollador!",
    donationThankYou: "Tu apoyo es la fuerza que mantiene este servicio. ¡Gracias de todo corazón!",
    laterBtn: "Más tarde",
    bathroomEssential: "Recomendado para el baño",
    affiliateText: "🧻 Oferta especial de toallitas húmedas desechables →"
  },
  pt: {
    appSubtitle: "🔒 Etiqueta Privada de Som para Banheiro",
    installApp: "📲 Instalar Aplicativo",
    pwaPrompt: "📱 Adicione à tela inicial para uma experiência de aplicativo!",
    install: "Instalar",
    wakeLockActive: "✨ 100% Mascaramento de Ruído",
    wakeLockInactive: "🔒 Protocolo de Etiqueta Privada",
    selectSound: "Selecionar Som",
    soundDryer: "Secador de Cabelo",
    soundPowerShower: "Chuveiro Forte",
    soundHeavyDownpour: "Chuva Forte",
    selectTimer: "Definir Temporizador",
    setTimer: "Definir Temporizador",
    volumeControl: "Aumento de Volume",
    buyCoffee: "💖 \"Obrigado por salvar o momento!\" Apoiar",
    adsenseLabel: "Anúncio",
    donationTitle: "❤️ \"Obrigado por salvar o momento!\" Apoiar",
    donationDesc: "Se este serviço gratuito ajudou você, envie um café para o desenvolvedor!",
    donationThankYou: "Seu apoio é a força que mantém este serviço funcionando. Nosso muito obrigado!",
    laterBtn: "Mais tarde",
    bathroomEssential: "Recomendado para Banheiro",
    affiliateText: "🧻 Oferta especial de lenços umedecidos laváveis →"
  },
  de: {
    appSubtitle: "🔒 Schützen Sie Ihre Privatsphäre im Badezimmer",
    installApp: "📲 App Installieren",
    pwaPrompt: "📱 Zum Startbildschirm hinzufügen!",
    install: "Installieren",
    wakeLockActive: "✨ 100% Geräuschüberdeckung",
    wakeLockInactive: "🔒 Private Etikette schützend",
    selectSound: "Sound auswählen",
    soundDryer: "Haartrockner",
    soundPowerShower: "Power-Dusche",
    soundHeavyDownpour: "Starkregen",
    selectTimer: "Timer-Einstellung",
    setTimer: "Timer-Einstellung",
    volumeControl: "Lautstärke-Verstärkung",
    buyCoffee: "💖 \"Danke für die Rettung!\" Unterstützen",
    adsenseLabel: "Werbung",
    donationTitle: "❤️ \"Danke für die Rettung!\" Unterstützen",
    donationDesc: "Wenn dir dieser kostenlose Service geholfen hat, unterstütze den Entwickler mit einem Kaffee!",
    donationThankYou: "Deine Unterstützung hält diesen Dienst am Leben. Herzlichen Dank!",
    laterBtn: "Später",
    bathroomEssential: "Badezimmer-Empfehlung",
    affiliateText: "🧻 Feuchttücher Spezialangebot →"
  },
  fr: {
    appSubtitle: "🔒 Protéger votre étiquette de confidentialité aux toilettes",
    installApp: "📲 Installer l'application",
    pwaPrompt: "📱 Ajouter à l'écran d'accueil pour l'application !",
    install: "Installer",
    wakeLockActive: "✨ Masquage sonore à 100%",
    wakeLockInactive: "🔒 Protéger votre étiquette privée",
    selectSound: "Sélectionner le son",
    soundDryer: "Sèche-cheveux",
    soundPowerShower: "Douche puissante",
    soundHeavyDownpour: "Pluie battante",
    selectTimer: "Réglage du minuteur",
    setTimer: "Réglage du minuteur",
    volumeControl: "Amplification du volume",
    buyCoffee: "💖 \"Merci d'avoir sauvé la situation !\" Soutenir",
    adsenseLabel: "Publicité",
    donationTitle: "❤️ \"Merci d'avoir sauvé la situation !\" Soutenir",
    donationDesc: "Si ce service gratuit vous a aidé, soutenez le développeur en lui offrant un café !",
    donationThankYou: "Votre soutien permet de maintenir ce service. Merci du fond du cœur !",
    laterBtn: "Plus tard",
    bathroomEssential: "Recommandation salle de bain",
    affiliateText: "🧻 Offre spéciale lingettes humides jetables →"
  },
  vi: {
    appSubtitle: "🔒 Bảo vệ lịch sự riêng tư trong nhà vệ sinh",
    installApp: "📲 Cài đặt ứng dụng",
    pwaPrompt: "📱 Thêm vào màn hình chính để dùng như ứng dụng!",
    install: "Cài đặt",
    wakeLockActive: "✨ Che phủ tiếng ồn 100%",
    wakeLockInactive: "🔒 Bảo vệ sự riêng tư lịch sự",
    selectSound: "Chọn âm thanh",
    soundDryer: "Máy sấy tóc",
    soundPowerShower: "Vòi sen mạnh",
    soundHeavyDownpour: "Mưa rào lớn",
    selectTimer: "Cài đặt hẹn giờ",
    setTimer: "Cài đặt hẹn giờ",
    volumeControl: "Tăng cường âm lượng",
    buyCoffee: "💖 \"Cảm ơn vì đã cứu nguy!\" Ủng hộ",
    adsenseLabel: "Quảng cáo",
    donationTitle: "❤️ \"Cảm ơn vì đã cứu nguy!\" Ủng hộ",
    donationDesc: "Nếu dịch vụ miễn phí này giúp ích cho bạn, hãy mời nhà phát triển một tách cà phê!",
    donationThankYou: "Tấm lòng của bạn là động lực duy trì dịch vụ này. Chân thành cảm ơn!",
    laterBtn: "Để sau",
    bathroomEssential: "Gợi ý phòng tắm",
    affiliateText: "🧻 Khăn giấy ướt vệ sinh xả được giá tốt →"
  },
  id: {
    appSubtitle: "🔒 Etiket Suara Toilet Menjaga Privasi Anda",
    installApp: "📲 Instal Aplikasi",
    pwaPrompt: "📱 Tambahkan ke Layar Utama untuk aplikasi!",
    install: "Instal",
    wakeLockActive: "✨ 100% Meredam Kebisingan",
    wakeLockInactive: "🔒 Menjaga Etiket Privasi Anda",
    selectSound: "Pilih Suara",
    soundDryer: "Pengering Rambut",
    soundPowerShower: "Kran Pancuran Kencang",
    soundHeavyDownpour: "Hujan Lebat",
    selectTimer: "Pengaturan Timer",
    setTimer: "Pengaturan Timer",
    volumeControl: "Penguat Volume",
    buyCoffee: "💖 \"Terima kasih sudah menyelamatkan momen!\" Dukung",
    adsenseLabel: "Iklan",
    donationTitle: "❤️ \"Terima kasih sudah menyelamatkan momen!\" Dukung",
    donationDesc: "Jika layanan gratis ini membantu Anda, dukung pengembang dengan secangkir kopi!",
    donationThankYou: "Dukungan hangat Anda adalah energi untuk menjaga layanan ini. Terima kasih tulus!",
    laterBtn: "Nanti",
    bathroomEssential: "Rekomendasi Kamar Mandi",
    affiliateText: "🧻 Promo Spesial Tisu Basah Toilet →"
  },
  th: {
    appSubtitle: "🔒 มารยาทเสียงในห้องน้ำเพื่อความเป็นส่วนตัว",
    installApp: "📲 ติดตั้งแอปพลิเคชัน",
    pwaPrompt: "📱 เพิ่มไปยังหน้าจอหลักเพื่อใช้งานแอป!",
    install: "ติดตั้ง",
    wakeLockActive: "✨ กลบเสียงรบกวน 100%",
    wakeLockInactive: "🔒 ปกป้องมารยาทความเป็นส่วนตัว",
    selectSound: "เลือกเสียง",
    soundDryer: "ไดร์เป่าผม",
    soundPowerShower: "ฝักบัวแรงสูง",
    soundHeavyDownpour: "ฝนตกหนัก",
    selectTimer: "ตั้งเวลา",
    setTimer: "ตั้งเวลา",
    volumeControl: "เร่งระดับเสียง",
    buyCoffee: "💖 \"ขอบคุณที่ช่วยแก้สถานการณ์!\" สนับสนุน",
    adsenseLabel: "โฆษณา",
    donationTitle: "❤️ \"ขอบคุณที่ช่วยแก้สถานการณ์!\" สนับสนุน",
    donationDesc: "หากบริการฟรีนี้ช่วยคุณได้ มอบกาแฟเป็นกำลังใจให้ผู้พัฒนาได้นะครับ!",
    donationThankYou: "กำลังใจของคุณคือแรงขับเคลื่อนบริการนี้ ขอบพระคุณจากใจจริง!",
    laterBtn: "ไว้ทีหลัง",
    bathroomEssential: "ของแนะนำในห้องน้ำ",
    affiliateText: "🧻 โปรโมชั่น ทิชชู่เปียกชักโครก →"
  },
  ar: {
    appSubtitle: "🔒 آداب الصوت في المرحاض لحماية الخصوصية",
    installApp: "📲 تثبيت التطبيق",
    pwaPrompt: "📱 أضف إلى الشاشة الرئيسية لتجربة التطبيق!",
    install: "تثبيت",
    wakeLockActive: "✨ تغطية الضوضاء بنسبة 100%",
    wakeLockInactive: "🔒 حماية الخصوصية واللياقة",
    selectSound: "اختر الصوت",
    soundDryer: "مجفف الشعر",
    soundPowerShower: "دش قوي",
    soundHeavyDownpour: "مطر غزير",
    selectTimer: "إعداد المؤقت",
    setTimer: "إعداد المؤقت",
    volumeControl: "تعزيز مستوى الصوت",
    buyCoffee: "💖 \"شكراً على إنقاذ الموقف!\" دعم",
    adsenseLabel: "إعلان",
    donationTitle: "❤️ \"شكراً على إنقاذ الموقف!\" دعم",
    donationDesc: "إذا ساعدتك هذه الخدمة المجانية، أدعم المطور بفنجان قهوة!",
    donationThankYou: "دعمك الدافئ هو القوة التي تحافظ على هذه الخدمة. شكراً جزيلاً!",
    laterBtn: "لاحقاً",
    bathroomEssential: "توصيات الحمام",
    affiliateText: "🧻 عرض خاص على مناديل الميمون المبللة →"
  },
  ru: {
    pwaPrompt: "📱 Добавьте на главный экран как приложение!",
    install: "Установить",
    wakeLockActive: "✨ 100% Маскировка шума",
    wakeLockInactive: "🔒 Конфиденциальный этикет",
    selectSound: "Выбор звука",
    soundDryer: "Фен",
    soundPowerShower: "Мощный душ",
    soundHeavyDownpour: "Сильный проливной дождь",
    selectTimer: "Таймер",
    volumeControl: "Усиление громкости",
    buyCoffee: "💖 «Спасибо, спасли ситуацию!» Поддержать",
    adsenseLabel: "Реклама",
    donationTitle: "❤️ «Спасибо, спасли ситуацию!» Поддержать",
    donationDesc: "Если этот бесплатный сервис вам помог, угостите разработчика чашечкой кофе!",
    donationThankYou: "Ваша поддержка — сила, поддерживающая этот сервис. Огромное спасибо!",
    laterBtn: "Позже",
    bathroomEssential: "Рекомендуем для ванной",
    affiliateText: "🧻 Смываемая влажная туалетная бумага со скидкой →"
  },
  hi: {
    pwaPrompt: "📱 ऐप अनुभव के लिए होम स्क्रीन पर जोड़ें!",
    install: "इंस्टॉल",
    wakeLockActive: "✨ 100% शोर छुपाएं",
    wakeLockInactive: "🔒 आपकी गोपनीयता शिष्टाचार",
    selectSound: "ध्वनि चुनें",
    soundDryer: "हेयर ड्रायर",
    soundPowerShower: "तेज़ शावर",
    soundHeavyDownpour: "मुसलाधार बारिश",
    selectTimer: "टाइमर सेट करें",
    volumeControl: "आवाज़ बूस्ट सेटिंग्स",
    buyCoffee: "💖 \"शर्मिंदगी से बचाने के लिए धन्यवाद!\" समर्थन दें",
    adsenseLabel: "विज्ञापन",
    donationTitle: "❤️ \"शर्मिंदगी से बचाने के लिए धन्यवाद!\" समर्थन दें",
    donationDesc: "यदि इस मुफ्त सेवा ने आपकी मदद की, तो डेवलपर को एक कॉफी से समर्थन दें!",
    donationThankYou: "आपका समर्थन ही इस सेवा को जारी रखने की ताकत है। हार्दिक धन्यवाद!",
    laterBtn: "बाद में",
    bathroomEssential: "बाथरूम सुझाव",
    affiliateText: "🧻 फ्लशेबल वेट वाइप्स ऑफर →"
  },
  la: {
    pwaPrompt: "📱 Adde ad tegulam primariam pro applicatione!",
    install: "Instituere",
    wakeLockActive: "✨ 100% Cooperiendo Clamore",
    wakeLockInactive: "🔒 Etiquetta Privata et Tutela",
    selectSound: "Elige Sonum",
    soundDryer: "Siccator Capillorum",
    soundPowerShower: "Cataracta Balnei",
    soundHeavyDownpour: "Imber Magnificus",
    selectTimer: "Constitue Horologium",
    volumeControl: "Amplificatio Voluminis",
    buyCoffee: "💖 \"Gratias pro auxilio secreto!\" Sustinere",
    adsenseLabel: "Publicitas",
    donationTitle: "❤️ \"Gratias pro auxilio secreto!\" Sustinere",
    donationDesc: "Si hoc servitium gratuitum tibi profuit, fave architecto poculum cafei!",
    donationThankYou: "Animus tuus benignus est vis quae hoc servitium conservat. Gratias maximas agimus!",
    laterBtn: "Postea",
    bathroomEssential: "Commendatio Balnei",
    affiliateText: "🧻 Mappa humida aquosa balnei specialis →"
  }
};

const AFFILIATE_LINKS = {
  ko: { url: "https://link.coupang.com/a/fFeFuNicFg", text: "🧻 급할 때 유용한 물에 잘 녹는 비데 물티슈 핫딜 보기 →" },
  en: { url: "https://www.amazon.com/dp/B000000000", text: "🧻 Flushable Moist Wipes Special Deal →" },
  ja: { url: "https://www.amazon.co.jp/dp/B000000000", text: "🧻 水に流せるトイレ用ウエットティッシュ 特価 →" },
  zh: { url: "https://www.amazon.com/dp/B000000000", text: "🧻 可冲水湿厕纸特惠 →" },
  es: { url: "https://www.amazon.es/dp/B000000000", text: "🧻 Oferta especial de toallitas húmedas desechables →" },
  pt: { url: "https://www.amazon.com.br/dp/B000000000", text: "🧻 Oferta especial de lenços umedecidos laváveis →" },
  de: { url: "https://www.amazon.de/dp/B000000000", text: "🧻 Feuchttücher Spezialangebot →" },
  fr: { url: "https://www.amazon.fr/dp/B000000000", text: "🧻 Offre spéciale lingettes humides jetables →" },
  vi: { url: "https://www.shopee.vn", text: "🧻 Khăn giấy ướt vệ sinh xả được giá tốt →" },
  id: { url: "https://www.tokopedia.com", text: "🧻 Promo Spesial Tisu Basah Toilet →" },
  th: { url: "https://www.lazada.co.th", text: "🧻 โปรโมชั่น ทิชชู่เปียกชักโครก →" },
  ar: { url: "https://www.amazon.sa/dp/B000000000", text: "🧻 عرض خاص على مناديل الميمون المبللة →" },
  ru: { url: "https://www.amazon.com/dp/B000000000", text: "🧻 Смываемая влажная туалетная бумага со скидкой →" },
  hi: { url: "https://www.amazon.in/dp/B000000000", text: "🧻 फ्लशेबल वेट वाइप्स ऑफर →" },
  la: { url: "https://www.amazon.com/dp/B000000000", text: "🧻 Mappa humida aquosa balnei specialis →" }
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
    installBtnText.textContent = dict['installApp'] || (I18N['en'] && I18N['en']['installApp']) || '📲 Install App';
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

  // PWA Benefit Card Modal Elements & Logic (Global Standard Engine)
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

  // Action inside the White Benefit Modal Card: 100% Clean PWA Installation (Zero File Download Popup)
  if (btnDirectAndroidInstall) {
    btnDirectAndroidInstall.addEventListener('click', () => {
      var ua = navigator.userAgent.toLowerCase();
      var isKakao = /kakaotalk/i.test(ua);

      // 1. KakaoTalk In-App WebView ➔ Auto Escape to Chrome/Safari standard scheme
      if (isKakao) {
        showToast(currentLanguage === 'ko' ? '🚀 외부 브라우저로 이동하여 설치를 진행합니다...' : '🚀 Opening external browser for installation...');
        if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
          location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(window.location.href);
        } else {
          location.href = 'intent://' + window.location.host + window.location.pathname + '#Intent;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.android.chrome;end;';
        }
        closePwaModalFunc();
        return;
      }

      // 2. Native Chrome PWA Prompt Direct Launch if active
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            showToast(currentLanguage === 'ko' ? '🎉 바탕화면에 앱이 성공적으로 설치되었습니다!' : '🎉 App installed on home screen!');
          }
          deferredPrompt = null;
        });
        closePwaModalFunc();
        return;
      }

      // 3. iOS Safari Guide Notice
      if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
        closePwaModalFunc();
        showToast(currentLanguage === 'ko' ? '🍎 하단 공유(⬆️) 버튼 ➔ [홈 화면에 추가] 선택' : '🍎 Tap Share (⬆️) ➔ Add to Home Screen');
        return;
      }

      // 4. Fallback: Clean Direct Location APK Download (Bypasses gesture blocks)
      closePwaModalFunc();
      showToast(currentLanguage === 'ko' ? '🚀 앱 다운로드를 시작합니다!' : '🚀 Starting App Download!');
      setTimeout(() => {
        window.location.href = './public/assets/SoundCover.apk';
      }, 300);
    });
  }

  // Main Home Footer Button: Open 1:06 Benefit Modal Instantly
  const btnFooterInstall = document.getElementById('btnFooterInstall');
  if (btnFooterInstall) {
    btnFooterInstall.addEventListener('click', () => {
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
    if (shape) shape.textContent = '❚❚';
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
    if (shape) shape.textContent = '▶';
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
    timerCountdown.textContent = '∞';
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
