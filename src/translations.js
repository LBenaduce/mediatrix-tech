import { digitalJunkDrawerTranslations } from "./digitalJunkDrawerTranslations.js";

export const languages = [
  ["en", "EN", "English"],
  ["pt-BR", "PT", "Português"],
  ["es", "ES", "Español"],
  ["fr", "FR", "Français"],
  ["de", "DE", "Deutsch"],
  ["zh-CN", "中文", "中文"],
  ["hi", "HI", "हिन्दी"],
  ["ar", "AR", "العربية"],
];

export const rtlLanguages = new Set(["ar"]);

const easterEggTranslations = {
  en: {
    common: { achievementUnlocked: "Achievement unlocked: {achievement}" },
    achievements: {
      digitalExplorer: { name: "Digital Explorer", description: "You discovered something that was not in the menu." },
      bugHunter: { name: "Bug Hunter", description: "You tracked down an unstable object on the lost page." },
    },
    lab: { title: "MEDIATRIX LAB", accessGranted: "> access granted", lead: "Experimental digital solutions.", congratulations: "Congratulations! Your curiosity unlocked this secret area.", storyPrompt: "Capture the discovery and share it in your Story.", close: "Close" },
    modal: { eyebrow: "Achievement unlocked", close: "Close the {achievement} achievement" },
    share: {
      regionLabel: "Share the {achievement} achievement", shareAria: "Share the {achievement} achievement on an Instagram Story",
      creating: "Creating Story…", shareButton: "Share on Instagram Story", copyAria: "Copy the suggested Instagram Story text", copied: "Copied!", copyButton: "Copy Story text",
      note: "Choose Instagram from your device’s sharing menu and complete the Story manually.", assetUnavailable: "The Story image is temporarily unavailable. Please try again.",
      copySuccess: "Story text copied.", copyFailure: "We couldn’t copy the Story text automatically. Please try again.", shareCompleted: "Your device completed the share action. Story publication remains under your control.",
      shareCanceled: "Sharing canceled. Nothing was published automatically.", createFailure: "We couldn’t create the Story image. Please try again.",
      fallbackInstructions: "Story image saved. Open Instagram, create a new Story, select the image, and add @mediatrixtech as a mention.",
      fallbackCopyFailure: "The Story text could not be copied automatically. Use “Copy Story text” above.", instagramAria: "Open @mediatrixtech on Instagram in a new tab", openInstagram: "Open @mediatrixtech",
      dialogTitle: "Mediatrix Tech — {achievement}",
    },
    story: { discovery: "I discovered a secret on the Mediatrix Tech website!", question: "Can you find it too?", achievementUnlocked: "ACHIEVEMENT UNLOCKED", secretFound: "> SECRET FOUND_", tagline: "Create. Connect. Convert." },
    notFound: { pageTitle: "404 | Mediatrix Tech", homeAria: "Mediatrix Tech homepage", code: "HTTP / LOST_SIGNAL", message: "This page escaped into another dimension.", returnHome: "Return to homepage", objectAria: "Interactive code object. Activate five times to investigate.", objectHint: "unstable object" },
    console: "You opened the console. Good.\nCurious people build better things.\nCreate. Connect. Convert.",
  },
  "pt-BR": {
    common: { achievementUnlocked: "Conquista desbloqueada: {achievement}" },
    achievements: { digitalExplorer: { name: "Explorador Digital", description: "Você descobriu algo que não estava no menu." }, bugHunter: { name: "Caçador de Bugs", description: "Você encontrou um objeto instável na página perdida." } },
    lab: { title: "LABORATÓRIO MEDIATRIX", accessGranted: "> acesso concedido", lead: "Soluções digitais experimentais.", congratulations: "Parabéns! Sua curiosidade desbloqueou esta área secreta.", storyPrompt: "Registre a descoberta e compartilhe no seu Story.", close: "Fechar" },
    modal: { eyebrow: "Conquista desbloqueada", close: "Fechar a conquista {achievement}" },
    share: { regionLabel: "Compartilhar a conquista {achievement}", shareAria: "Compartilhar a conquista {achievement} em um Story do Instagram", creating: "Criando Story…", shareButton: "Compartilhar no Story do Instagram", copyAria: "Copiar o texto sugerido para o Story do Instagram", copied: "Copiado!", copyButton: "Copiar texto do Story", note: "Escolha o Instagram no menu de compartilhamento do dispositivo e conclua o Story manualmente.", assetUnavailable: "A imagem do Story está temporariamente indisponível. Tente novamente.", copySuccess: "Texto do Story copiado.", copyFailure: "Não foi possível copiar o texto do Story automaticamente. Tente novamente.", shareCompleted: "Seu dispositivo concluiu a ação de compartilhamento. A publicação do Story continua sob seu controle.", shareCanceled: "Compartilhamento cancelado. Nada foi publicado automaticamente.", createFailure: "Não foi possível criar a imagem do Story. Tente novamente.", fallbackInstructions: "Imagem do Story salva. Abra o Instagram, crie um novo Story, selecione a imagem e adicione @mediatrixtech como menção.", fallbackCopyFailure: "O texto do Story não pôde ser copiado automaticamente. Use “Copiar texto do Story” acima.", instagramAria: "Abrir @mediatrixtech no Instagram em uma nova aba", openInstagram: "Abrir @mediatrixtech", dialogTitle: "Mediatrix Tech — {achievement}" },
    story: { discovery: "Descobri um segredo no site da Mediatrix Tech!", question: "Você também consegue encontrá-lo?", achievementUnlocked: "CONQUISTA DESBLOQUEADA", secretFound: "> SEGREDO ENCONTRADO_", tagline: "Crie. Conecte. Converta." },
    notFound: { pageTitle: "404 | Mediatrix Tech", homeAria: "Página inicial da Mediatrix Tech", code: "HTTP / SINAL_PERDIDO", message: "Esta página escapou para outra dimensão.", returnHome: "Voltar à página inicial", objectAria: "Objeto de código interativo. Ative cinco vezes para investigar.", objectHint: "objeto instável" },
    console: "Você abriu o console. Ótimo.\nPessoas curiosas criam coisas melhores.\nCrie. Conecte. Converta.",
  },
  es: {
    common: { achievementUnlocked: "Logro desbloqueado: {achievement}" }, achievements: { digitalExplorer: { name: "Explorador digital", description: "Descubriste algo que no estaba en el menú." }, bugHunter: { name: "Cazador de errores", description: "Rastreaste un objeto inestable en la página perdida." } },
    lab: { title: "LABORATORIO MEDIATRIX", accessGranted: "> acceso concedido", lead: "Soluciones digitales experimentales.", congratulations: "¡Enhorabuena! Tu curiosidad desbloqueó esta área secreta.", storyPrompt: "Guarda el descubrimiento y compártelo en tu historia.", close: "Cerrar" }, modal: { eyebrow: "Logro desbloqueado", close: "Cerrar el logro {achievement}" },
    share: { regionLabel: "Compartir el logro {achievement}", shareAria: "Compartir el logro {achievement} en una historia de Instagram", creating: "Creando historia…", shareButton: "Compartir en una historia de Instagram", copyAria: "Copiar el texto sugerido para la historia de Instagram", copied: "¡Copiado!", copyButton: "Copiar texto de la historia", note: "Elige Instagram en el menú para compartir de tu dispositivo y completa la historia manualmente.", assetUnavailable: "La imagen de la historia no está disponible temporalmente. Inténtalo de nuevo.", copySuccess: "Texto de la historia copiado.", copyFailure: "No pudimos copiar automáticamente el texto de la historia. Inténtalo de nuevo.", shareCompleted: "Tu dispositivo completó la acción de compartir. Tú mantienes el control de la publicación.", shareCanceled: "Se canceló el uso compartido. No se publicó nada automáticamente.", createFailure: "No pudimos crear la imagen de la historia. Inténtalo de nuevo.", fallbackInstructions: "Imagen de la historia guardada. Abre Instagram, crea una historia nueva, selecciona la imagen y añade @mediatrixtech como mención.", fallbackCopyFailure: "El texto de la historia no pudo copiarse automáticamente. Usa «Copiar texto de la historia» arriba.", instagramAria: "Abrir @mediatrixtech en Instagram en una pestaña nueva", openInstagram: "Abrir @mediatrixtech", dialogTitle: "Mediatrix Tech — {achievement}" },
    story: { discovery: "¡Descubrí un secreto en el sitio web de Mediatrix Tech!", question: "¿Tú también puedes encontrarlo?", achievementUnlocked: "LOGRO DESBLOQUEADO", secretFound: "> SECRETO ENCONTRADO_" }, notFound: { pageTitle: "404 | Mediatrix Tech", homeAria: "Página de inicio de Mediatrix Tech", code: "HTTP / SEÑAL_PERDIDA", message: "Esta página escapó a otra dimensión.", returnHome: "Volver al inicio", objectAria: "Objeto de código interactivo. Actívalo cinco veces para investigar.", objectHint: "objeto inestable" }, console: "Abriste la consola. Bien.\nLas personas curiosas crean cosas mejores.\nCrea. Conecta. Convierte.",
  },
  fr: {
    common: { achievementUnlocked: "Succès débloqué : {achievement}" }, achievements: { digitalExplorer: { name: "Explorateur numérique", description: "Vous avez découvert quelque chose qui ne figurait pas dans le menu." }, bugHunter: { name: "Chasseur de bugs", description: "Vous avez repéré un objet instable sur la page perdue." } }, lab: { title: "LABORATOIRE MEDIATRIX", accessGranted: "> accès autorisé", lead: "Solutions numériques expérimentales.", congratulations: "Félicitations ! Votre curiosité a déverrouillé cette zone secrète.", storyPrompt: "Immortalisez votre découverte et partagez-la dans votre story.", close: "Fermer" }, modal: { eyebrow: "Succès débloqué", close: "Fermer le succès {achievement}" },
    share: { regionLabel: "Partager le succès {achievement}", shareAria: "Partager le succès {achievement} dans une story Instagram", creating: "Création de la story…", shareButton: "Partager dans une story Instagram", copyAria: "Copier le texte suggéré pour la story Instagram", copied: "Copié !", copyButton: "Copier le texte de la story", note: "Choisissez Instagram dans le menu de partage de votre appareil et terminez la story manuellement.", assetUnavailable: "L’image de la story est temporairement indisponible. Réessayez.", copySuccess: "Texte de la story copié.", copyFailure: "Impossible de copier automatiquement le texte de la story. Réessayez.", shareCompleted: "Votre appareil a terminé l’action de partage. Vous gardez le contrôle de la publication.", shareCanceled: "Partage annulé. Rien n’a été publié automatiquement.", createFailure: "Impossible de créer l’image de la story. Réessayez.", fallbackInstructions: "Image de la story enregistrée. Ouvrez Instagram, créez une nouvelle story, sélectionnez l’image et ajoutez la mention @mediatrixtech.", fallbackCopyFailure: "Le texte de la story n’a pas pu être copié automatiquement. Utilisez « Copier le texte de la story » ci-dessus.", instagramAria: "Ouvrir @mediatrixtech sur Instagram dans un nouvel onglet", openInstagram: "Ouvrir @mediatrixtech", dialogTitle: "Mediatrix Tech — {achievement}" },
    story: { discovery: "J’ai découvert un secret sur le site Mediatrix Tech !", question: "Saurez-vous le trouver aussi ?", achievementUnlocked: "SUCCÈS DÉBLOQUÉ", secretFound: "> SECRET TROUVÉ_" }, notFound: { pageTitle: "404 | Mediatrix Tech", homeAria: "Accueil de Mediatrix Tech", code: "HTTP / SIGNAL_PERDU", message: "Cette page s’est échappée dans une autre dimension.", returnHome: "Retour à l’accueil", objectAria: "Objet de code interactif. Activez-le cinq fois pour enquêter.", objectHint: "objet instable" }, console: "Vous avez ouvert la console. Bien.\nLes personnes curieuses créent de meilleures choses.\nCréez. Connectez. Convertissez.",
  },
  de: {
    common: { achievementUnlocked: "Erfolg freigeschaltet: {achievement}" }, achievements: { digitalExplorer: { name: "Digitaler Entdecker", description: "Sie haben etwas entdeckt, das nicht im Menü stand." }, bugHunter: { name: "Bug-Jäger", description: "Sie haben auf der verlorenen Seite ein instabiles Objekt aufgespürt." } }, lab: { title: "MEDIATRIX LABOR", accessGranted: "> Zugriff gewährt", lead: "Experimentelle digitale Lösungen.", congratulations: "Glückwunsch! Ihre Neugier hat diesen geheimen Bereich freigeschaltet.", storyPrompt: "Halten Sie die Entdeckung fest und teilen Sie sie in Ihrer Story.", close: "Schließen" }, modal: { eyebrow: "Erfolg freigeschaltet", close: "Erfolg {achievement} schließen" },
    share: { regionLabel: "Erfolg {achievement} teilen", shareAria: "Erfolg {achievement} in einer Instagram-Story teilen", creating: "Story wird erstellt…", shareButton: "In Instagram-Story teilen", copyAria: "Vorgeschlagenen Instagram-Story-Text kopieren", copied: "Kopiert!", copyButton: "Story-Text kopieren", note: "Wählen Sie Instagram im Teilen-Menü Ihres Geräts und stellen Sie die Story manuell fertig.", assetUnavailable: "Das Story-Bild ist vorübergehend nicht verfügbar. Bitte versuchen Sie es erneut.", copySuccess: "Story-Text kopiert.", copyFailure: "Der Story-Text konnte nicht automatisch kopiert werden. Bitte versuchen Sie es erneut.", shareCompleted: "Ihr Gerät hat den Teilen-Vorgang abgeschlossen. Die Veröffentlichung bleibt unter Ihrer Kontrolle.", shareCanceled: "Teilen abgebrochen. Es wurde nichts automatisch veröffentlicht.", createFailure: "Das Story-Bild konnte nicht erstellt werden. Bitte versuchen Sie es erneut.", fallbackInstructions: "Story-Bild gespeichert. Öffnen Sie Instagram, erstellen Sie eine neue Story, wählen Sie das Bild und erwähnen Sie @mediatrixtech.", fallbackCopyFailure: "Der Story-Text konnte nicht automatisch kopiert werden. Verwenden Sie oben „Story-Text kopieren“.", instagramAria: "@mediatrixtech auf Instagram in einem neuen Tab öffnen", openInstagram: "@mediatrixtech öffnen", dialogTitle: "Mediatrix Tech — {achievement}" },
    story: { discovery: "Ich habe ein Geheimnis auf der Mediatrix Tech Website entdeckt!", question: "Können Sie es auch finden?", achievementUnlocked: "ERFOLG FREIGESCHALTET", secretFound: "> GEHEIMNIS GEFUNDEN_" }, notFound: { pageTitle: "404 | Mediatrix Tech", homeAria: "Startseite von Mediatrix Tech", code: "HTTP / SIGNAL_VERLOREN", message: "Diese Seite ist in eine andere Dimension entkommen.", returnHome: "Zurück zur Startseite", objectAria: "Interaktives Codeobjekt. Fünfmal aktivieren, um es zu untersuchen.", objectHint: "instabiles Objekt" }, console: "Sie haben die Konsole geöffnet. Gut.\nNeugierige Menschen erschaffen bessere Dinge.\nErschaffen. Verbinden. Verwandeln.",
  },
  "zh-CN": {
    common: { achievementUnlocked: "已解锁成就：{achievement}" }, achievements: { digitalExplorer: { name: "数字探索者", description: "你发现了一个菜单中没有的内容。" }, bugHunter: { name: "漏洞猎人", description: "你在迷失页面找到了一个不稳定对象。" } }, lab: { title: "MEDIATRIX 实验室", accessGranted: "> 已获准访问", lead: "实验性数字解决方案。", congratulations: "恭喜！你的好奇心解锁了这个秘密区域。", storyPrompt: "记录这次发现并分享到你的 Instagram 快拍。", close: "关闭" }, modal: { eyebrow: "成就已解锁", close: "关闭“{achievement}”成就" },
    share: { regionLabel: "分享“{achievement}”成就", shareAria: "在 Instagram 快拍中分享“{achievement}”成就", creating: "正在创建快拍…", shareButton: "分享到 Instagram 快拍", copyAria: "复制建议的 Instagram 快拍文字", copied: "已复制！", copyButton: "复制快拍文字", note: "请从设备的分享菜单中选择 Instagram，并手动完成快拍。", assetUnavailable: "快拍图片暂时不可用，请重试。", copySuccess: "快拍文字已复制。", copyFailure: "无法自动复制快拍文字，请重试。", shareCompleted: "你的设备已完成分享操作，是否发布快拍仍由你决定。", shareCanceled: "已取消分享，未自动发布任何内容。", createFailure: "无法创建快拍图片，请重试。", fallbackInstructions: "快拍图片已保存。请打开 Instagram，创建新快拍，选择图片并添加 @mediatrixtech 提及。", fallbackCopyFailure: "无法自动复制快拍文字，请使用上方的“复制快拍文字”。", instagramAria: "在新标签页中打开 Instagram 上的 @mediatrixtech", openInstagram: "打开 @mediatrixtech", dialogTitle: "Mediatrix Tech — {achievement}" },
    story: { discovery: "我在 Mediatrix Tech 网站发现了一个隐藏彩蛋！", question: "你也能找到它吗？", achievementUnlocked: "成就已解锁", secretFound: "> 已发现秘密_" }, notFound: { pageTitle: "404 | Mediatrix Tech", homeAria: "Mediatrix Tech 首页", code: "HTTP / 信号丢失", message: "这个页面逃到了另一个维度。", returnHome: "返回首页", objectAria: "交互式代码对象。激活五次即可调查。", objectHint: "不稳定对象" }, console: "你打开了控制台。很好。\n好奇的人会创造更好的作品。\n创造。连接。转化。",
  },
  hi: {
    common: { achievementUnlocked: "उपलब्धि अनलॉक हुई: {achievement}" }, achievements: { digitalExplorer: { name: "डिजिटल खोजकर्ता", description: "आपने कुछ ऐसा खोजा जो मेन्यू में नहीं था।" }, bugHunter: { name: "बग हंटर", description: "आपने खोए हुए पेज पर एक अस्थिर ऑब्जेक्ट ढूँढ लिया।" } }, lab: { title: "MEDIATRIX प्रयोगशाला", accessGranted: "> पहुँच स्वीकृत", lead: "प्रयोगात्मक डिजिटल समाधान।", congratulations: "बधाई! आपकी जिज्ञासा ने इस गुप्त क्षेत्र को अनलॉक कर दिया।", storyPrompt: "इस खोज को सहेजें और अपनी Story में साझा करें।", close: "बंद करें" }, modal: { eyebrow: "उपलब्धि अनलॉक हुई", close: "{achievement} उपलब्धि बंद करें" },
    share: { regionLabel: "{achievement} उपलब्धि साझा करें", shareAria: "{achievement} उपलब्धि Instagram Story पर साझा करें", creating: "Story बनाई जा रही है…", shareButton: "Instagram Story पर साझा करें", copyAria: "सुझाया गया Instagram Story टेक्स्ट कॉपी करें", copied: "कॉपी हो गया!", copyButton: "Story टेक्स्ट कॉपी करें", note: "अपने डिवाइस के शेयर मेन्यू से Instagram चुनें और Story को स्वयं पूरा करें।", assetUnavailable: "Story की इमेज अभी उपलब्ध नहीं है। फिर से कोशिश करें।", copySuccess: "Story टेक्स्ट कॉपी हो गया।", copyFailure: "Story टेक्स्ट अपने आप कॉपी नहीं हो सका। फिर से कोशिश करें।", shareCompleted: "आपके डिवाइस ने शेयर कार्रवाई पूरी कर दी। Story प्रकाशित करना आपके नियंत्रण में है।", shareCanceled: "शेयर करना रद्द हुआ। अपने आप कुछ प्रकाशित नहीं हुआ।", createFailure: "Story इमेज नहीं बनाई जा सकी। फिर से कोशिश करें।", fallbackInstructions: "Story इमेज सेव हो गई। Instagram खोलें, नई Story बनाएँ, इमेज चुनें और @mediatrixtech को मेंशन करें।", fallbackCopyFailure: "Story टेक्स्ट अपने आप कॉपी नहीं हो सका। ऊपर “Story टेक्स्ट कॉपी करें” इस्तेमाल करें।", instagramAria: "Instagram पर @mediatrixtech को नए टैब में खोलें", openInstagram: "@mediatrixtech खोलें", dialogTitle: "Mediatrix Tech — {achievement}" },
    story: { discovery: "मैंने Mediatrix Tech की वेबसाइट पर एक रहस्य खोजा!", question: "क्या आप भी इसे खोज सकते हैं?", achievementUnlocked: "उपलब्धि अनलॉक हुई", secretFound: "> रहस्य मिला_" }, notFound: { pageTitle: "404 | Mediatrix Tech", homeAria: "Mediatrix Tech होमपेज", code: "HTTP / सिग्नल_खोया", message: "यह पेज दूसरी दुनिया में भाग गया।", returnHome: "होमपेज पर लौटें", objectAria: "इंटरैक्टिव कोड ऑब्जेक्ट। जाँचने के लिए पाँच बार सक्रिय करें।", objectHint: "अस्थिर ऑब्जेक्ट" }, console: "आपने कंसोल खोला। बढ़िया।\nजिज्ञासु लोग बेहतर चीज़ें बनाते हैं।\nबनाएँ। जोड़ें। बदलें।",
  },
  ar: {
    common: { achievementUnlocked: "تم فتح الإنجاز: {achievement}" }, achievements: { digitalExplorer: { name: "المستكشف الرقمي", description: "لقد اكتشفت شيئًا لم يكن موجودًا في القائمة." }, bugHunter: { name: "صياد الأخطاء", description: "لقد تعقبت عنصرًا غير مستقر في الصفحة المفقودة." } }, lab: { title: "مختبر MEDIATRIX", accessGranted: "> تم منح الوصول", lead: "حلول رقمية تجريبية.", congratulations: "تهانينا! لقد فتح فضولك هذه المنطقة السرية.", storyPrompt: "وثّق اكتشافك وشاركه في قصتك.", close: "إغلاق" }, modal: { eyebrow: "تم فتح الإنجاز", close: "إغلاق إنجاز {achievement}" },
    share: { regionLabel: "مشاركة إنجاز {achievement}", shareAria: "مشاركة إنجاز {achievement} في قصة Instagram", creating: "جارٍ إنشاء القصة…", shareButton: "المشاركة في قصة Instagram", copyAria: "نسخ النص المقترح لقصة Instagram", copied: "تم النسخ!", copyButton: "نسخ نص القصة", note: "اختر Instagram من قائمة المشاركة في جهازك وأكمل القصة يدويًا.", assetUnavailable: "صورة القصة غير متاحة مؤقتًا. حاول مرة أخرى.", copySuccess: "تم نسخ نص القصة.", copyFailure: "تعذر نسخ نص القصة تلقائيًا. حاول مرة أخرى.", shareCompleted: "أكمل جهازك إجراء المشاركة. يظل نشر القصة تحت سيطرتك.", shareCanceled: "أُلغيت المشاركة. لم يُنشر شيء تلقائيًا.", createFailure: "تعذر إنشاء صورة القصة. حاول مرة أخرى.", fallbackInstructions: "تم حفظ صورة القصة. افتح Instagram وأنشئ قصة جديدة واختر الصورة وأضف @mediatrixtech كإشارة.", fallbackCopyFailure: "تعذر نسخ نص القصة تلقائيًا. استخدم «نسخ نص القصة» أعلاه.", instagramAria: "فتح @mediatrixtech على Instagram في علامة تبويب جديدة", openInstagram: "فتح @mediatrixtech", dialogTitle: "Mediatrix Tech — {achievement}" },
    story: { discovery: "لقد اكتشفت سراً في موقع Mediatrix Tech!", question: "هل يمكنك العثور عليه أيضًا؟", achievementUnlocked: "تم فتح الإنجاز", secretFound: "> تم العثور على السر_" }, notFound: { pageTitle: "404 | Mediatrix Tech", homeAria: "الصفحة الرئيسية لـ Mediatrix Tech", code: "HTTP / إشارة_مفقودة", message: "هربت هذه الصفحة إلى بُعد آخر.", returnHome: "العودة إلى الصفحة الرئيسية", objectAria: "عنصر برمجي تفاعلي. فعّله خمس مرات للتحقيق.", objectHint: "عنصر غير مستقر" }, console: "لقد فتحت وحدة التحكم. جيد.\nالأشخاص الفضوليون يصنعون أشياء أفضل.\nابتكر. تواصل. حوّل.",
  },
};

easterEggTranslations.es.story.tagline = "Crea. Conecta. Convierte.";
easterEggTranslations.fr.story.tagline = "Créez. Connectez. Convertissez.";
easterEggTranslations.de.story.tagline = "Erschaffen. Verbinden. Verwandeln.";
easterEggTranslations["zh-CN"].story.tagline = "创造。连接。转化。";
easterEggTranslations.hi.story.tagline = "बनाएँ। जोड़ें। बदलें।";
easterEggTranslations.ar.story.tagline = "ابتكر. تواصل. حوّل.";

Object.entries(digitalJunkDrawerTranslations).forEach(([locale, copy]) => {
  easterEggTranslations[locale].digitalJunkDrawer = copy;
});

export const translations = {
  "pt-BR": {
    easterEggs: easterEggTranslations["pt-BR"],
    metaDescription: "A Mediatrix Tech cria sites e conteúdos visuais profissionais para negócios em todo o mundo.",
    skip: "Pular para o conteúdo",
    nav: ["Início", "Serviços", "Portfólio", "Empresa", "Contato"],
    primaryNavigation: "Navegação principal",
    mobileNavigation: "Navegação mobile",
    language: "Idioma",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    quote: "Solicitar orçamento",
    hero: {
      logoAlt: "Logo da Mediatrix Tech",
      title: "Tecnologia e conteúdo que fazem sua marca avançar.",
      description: "Criamos sites e conteúdos visuais profissionais para negócios em todo o mundo.",
      services: "Ver serviços",
    },
    servicesSection: {
      eyebrow: "Serviços",
      title: "O essencial para apresentar sua marca com qualidade.",
      description: "Quatro soluções claras, adaptadas ao objetivo e ao momento do seu negócio.",
    },
    services: [
      { id: "web", title: "Desenvolvimento Web", description: "Sites rápidos, responsivos e fáceis de usar em qualquer tela.", benefit: "Transforme visitas em novas oportunidades." },
      { id: "photo", title: "Edição de Fotos", description: "Tratamento profissional para produtos, eventos e redes sociais.", benefit: "Valorize sua marca em cada imagem." },
      { id: "video", title: "Edição de Vídeos", description: "Vídeos claros e envolventes para marcas, criadores e eventos.", benefit: "Prenda a atenção e comunique melhor." },
      { id: "audio", title: "Edição de Áudio", description: "Tratamento, limpeza e mixagem de áudio para vídeos, podcasts e conteúdos digitais.", benefit: "Som claro e profissional em cada projeto." },
    ],
    portfolioSection: { eyebrow: "Portfólio", title: "Projetos selecionados.", description: "Alguns trabalhos que unem clareza, experiência e resultado.", view: "Ver projeto", videoDemo: "Demonstração do projeto", screenshot: "Captura de tela do projeto" },
    projects: [
      { name: "AgriClimate Pro", category: "Desenvolvimento Web · AgTech", description: "Experiência digital para apoiar decisões agrícolas com dados climáticos." },
      { name: "Frasson LLC", category: "Desenvolvimento Web", description: "Site empresarial objetivo, criado para apresentar serviços e facilitar o contato." },
      { name: "Event QR Code", category: "Experiência digital para eventos", description: "Fluxo simples por QR Code para convidados enviarem fotos e vídeos." },
      { name: "Cafeteria", category: "Desenvolvimento Web · Alimentação", description: "Site acolhedor e responsivo para apresentar a experiência da cafeteria e facilitar o acesso ao cardápio." },
    ],
    company: {
      eyebrow: "Empresa", title: "Sobre a Mediatrix Tech", description: "Criatividade e tecnologia trabalhando para aproximar marcas e pessoas.",
      facts: [
        ["Quem somos", "Uma empresa de tecnologia e criação focada em soluções digitais úteis."],
        ["O que fazemos", "Unimos desenvolvimento web e edição visual em uma entrega consistente."],
        ["Como trabalhamos", "Entendemos o objetivo, simplificamos o caminho e mantemos você por perto."],
        ["Onde atendemos", "Planeta Terra e arredores."],
      ],
    },
    contact: {
      eyebrow: "Contato", title: "Vamos conversar sobre seu projeto?", description: "Escolha o canal mais prático ou envie uma mensagem pelo formulário.", channelsLabel: "Canais de contato",
      channels: [["WhatsApp EN", "Atendimento em inglês"], ["WhatsApp PT", "Atendimento em português"], ["E-mail", "mediatrixtech@proton.me"], ["Perfil na Upwork", "Projetos internacionais"]],
      form: { title: "Envie uma mensagem", description: "Conte brevemente o que você precisa.", name: "Nome", email: "E-mail", service: "Serviço de interesse", chooseService: "Selecione um serviço", message: "Mensagem", send: "Enviar mensagem", sending: "Enviando...", success: "Mensagem enviada com sucesso. Em breve entraremos em contato.", error: "Não foi possível enviar. Tente novamente ou fale conosco pelo WhatsApp.", subject: "Nova mensagem pelo site Mediatrix Tech" },
    },
    rights: "Todos os direitos reservados.",
  },

  en: {
    easterEggs: easterEggTranslations.en,
    metaDescription: "Mediatrix Tech creates professional websites and visual content for businesses worldwide.",
    skip: "Skip to content",
    nav: ["Home", "Services", "Portfolio", "Company", "Contact"],
    primaryNavigation: "Primary navigation",
    mobileNavigation: "Mobile navigation",
    language: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    quote: "Request a quote",
    hero: { logoAlt: "Mediatrix Tech logo", title: "Technology and content that move your brand forward.", description: "We create professional websites and visual content for businesses worldwide.", services: "View services" },
    servicesSection: { eyebrow: "Services", title: "Everything your brand needs to make a strong impression.", description: "Four clear solutions tailored to your goals and stage of business." },
    services: [
      { id: "web", title: "Web Development", description: "Fast, responsive websites that are easy to use on every screen.", benefit: "Turn visits into new opportunities." },
      { id: "photo", title: "Photo Editing", description: "Professional retouching for products, events, and social media.", benefit: "Make your brand stand out in every image." },
      { id: "video", title: "Video Editing", description: "Clear, engaging videos for brands, creators, and events.", benefit: "Capture attention and communicate better." },
      { id: "audio", title: "Audio Editing", description: "Audio cleanup, mixing, and mastering for videos, podcasts, and digital content.", benefit: "Give every project clear, professional sound." },
    ],
    portfolioSection: { eyebrow: "Portfolio", title: "Selected projects.", description: "Work that combines clarity, experience, and results.", view: "View project", videoDemo: "Project demo", screenshot: "Project screenshot" },
    projects: [
      { name: "AgriClimate Pro", category: "Web Development · AgTech", description: "A digital experience supporting agricultural decisions with climate data." },
      { name: "Frasson LLC", category: "Web Development", description: "A focused business website designed to present services and simplify contact." },
      { name: "Event QR Code", category: "Digital event experience", description: "A simple QR Code flow for guests to upload photos and videos." },
      { name: "Cafeteria", category: "Web Development · Food & Beverage", description: "A warm, responsive website presenting the café experience and providing easy access to the menu." },
    ],
    company: { eyebrow: "Company", title: "About Mediatrix Tech", description: "Creativity and technology working together to connect brands and people.", facts: [["Who we are", "A technology and creative company focused on useful digital solutions."], ["What we do", "We combine web development and visual editing in one consistent delivery."], ["How we work", "We understand the goal, simplify the path, and keep you involved."], ["Where we work", "Planet Earth and its surroundings."]] },
    contact: {
      eyebrow: "Contact", title: "Shall we talk about your project?", description: "Choose the easiest channel or send us a message through the form.", channelsLabel: "Contact channels",
      channels: [["WhatsApp EN", "Service in English"], ["WhatsApp PT", "Service in Portuguese"], ["Email", "mediatrixtech@proton.me"], ["Upwork profile", "International projects"]],
      form: { title: "Send a message", description: "Briefly tell us what you need.", name: "Name", email: "Email", service: "Service of interest", chooseService: "Select a service", message: "Message", send: "Send message", sending: "Sending...", success: "Message sent successfully. We will be in touch soon.", error: "We could not send your message. Please try again or contact us on WhatsApp.", subject: "New message from the Mediatrix Tech website" },
    },
    rights: "All rights reserved.",
  },

  es: {
    easterEggs: easterEggTranslations.es,
    metaDescription: "Mediatrix Tech crea sitios web y contenido visual profesional para empresas de todo el mundo.",
    skip: "Saltar al contenido",
    nav: ["Inicio", "Servicios", "Portafolio", "Empresa", "Contacto"],
    primaryNavigation: "Navegación principal", mobileNavigation: "Navegación móvil", language: "Idioma", openMenu: "Abrir menú", closeMenu: "Cerrar menú", quote: "Solicitar presupuesto",
    hero: { logoAlt: "Logotipo de Mediatrix Tech", title: "Tecnología y contenido que impulsan tu marca.", description: "Creamos sitios web y contenido visual profesional para empresas de todo el mundo.", services: "Ver servicios" },
    servicesSection: { eyebrow: "Servicios", title: "Lo esencial para presentar tu marca con calidad.", description: "Cuatro soluciones claras, adaptadas a los objetivos y al momento de tu negocio." },
    services: [
      { id: "web", title: "Desarrollo Web", description: "Sitios rápidos, responsivos y fáciles de usar en cualquier pantalla.", benefit: "Convierte visitas en nuevas oportunidades." },
      { id: "photo", title: "Edición de Fotos", description: "Retoque profesional para productos, eventos y redes sociales.", benefit: "Haz que tu marca destaque en cada imagen." },
      { id: "video", title: "Edición de Videos", description: "Videos claros y atractivos para marcas, creadores y eventos.", benefit: "Capta la atención y comunica mejor." },
      { id: "audio", title: "Edición de Audio", description: "Limpieza, mezcla y masterización para videos, podcasts y contenido digital.", benefit: "Dale a cada proyecto un sonido claro y profesional." },
    ],
    portfolioSection: { eyebrow: "Portafolio", title: "Proyectos seleccionados.", description: "Trabajos que combinan claridad, experiencia y resultados.", view: "Ver proyecto", videoDemo: "Demostración del proyecto", screenshot: "Captura de pantalla del proyecto" },
    projects: [{ name: "AgriClimate Pro", category: "Desarrollo Web · AgTech", description: "Una experiencia digital que apoya decisiones agrícolas con datos climáticos." }, { name: "Frasson LLC", category: "Desarrollo Web", description: "Un sitio empresarial claro, creado para presentar servicios y facilitar el contacto." }, { name: "Event QR Code", category: "Experiencia digital para eventos", description: "Un flujo sencillo con código QR para que los invitados envíen fotos y videos." }, { name: "Cafeteria", category: "Desarrollo Web · Gastronomía", description: "Un sitio cálido y responsivo para presentar la experiencia de la cafetería y facilitar el acceso al menú." }],
    company: { eyebrow: "Empresa", title: "Sobre Mediatrix Tech", description: "Creatividad y tecnología trabajando juntas para conectar marcas y personas.", facts: [["Quiénes somos", "Una empresa tecnológica y creativa centrada en soluciones digitales útiles."], ["Qué hacemos", "Unimos desarrollo web y edición visual en una entrega coherente."], ["Cómo trabajamos", "Entendemos el objetivo, simplificamos el camino y te mantenemos cerca."], ["Dónde trabajamos", "El planeta Tierra y sus alrededores."]] },
    contact: { eyebrow: "Contacto", title: "¿Hablamos de tu proyecto?", description: "Elige el canal más cómodo o envíanos un mensaje mediante el formulario.", channelsLabel: "Canales de contacto", channels: [["WhatsApp EN", "Atención en inglés"], ["WhatsApp PT", "Atención en portugués"], ["Correo electrónico", "mediatrixtech@proton.me"], ["Perfil en Upwork", "Proyectos internacionales"]], form: { title: "Envía un mensaje", description: "Cuéntanos brevemente qué necesitas.", name: "Nombre", email: "Correo electrónico", service: "Servicio de interés", chooseService: "Selecciona un servicio", message: "Mensaje", send: "Enviar mensaje", sending: "Enviando...", success: "Mensaje enviado correctamente. Nos pondremos en contacto pronto.", error: "No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.", subject: "Nuevo mensaje desde el sitio de Mediatrix Tech" } },
    rights: "Todos los derechos reservados.",
  },

  fr: {
    easterEggs: easterEggTranslations.fr,
    metaDescription: "Mediatrix Tech crée des sites web et des contenus visuels professionnels pour les entreprises du monde entier.",
    skip: "Aller au contenu", nav: ["Accueil", "Services", "Portfolio", "Entreprise", "Contact"], primaryNavigation: "Navigation principale", mobileNavigation: "Navigation mobile", language: "Langue", openMenu: "Ouvrir le menu", closeMenu: "Fermer le menu", quote: "Demander un devis",
    hero: { logoAlt: "Logo de Mediatrix Tech", title: "La technologie et le contenu qui font avancer votre marque.", description: "Nous créons des sites web et des contenus visuels professionnels pour les entreprises du monde entier.", services: "Voir les services" },
    servicesSection: { eyebrow: "Services", title: "L’essentiel pour présenter votre marque avec qualité.", description: "Quatre solutions claires, adaptées à vos objectifs et au stade de votre entreprise." },
    services: [{ id: "web", title: "Développement Web", description: "Des sites rapides, responsives et faciles à utiliser sur tous les écrans.", benefit: "Transformez les visites en nouvelles opportunités." }, { id: "photo", title: "Retouche Photo", description: "Des retouches professionnelles pour produits, événements et réseaux sociaux.", benefit: "Valorisez votre marque dans chaque image." }, { id: "video", title: "Montage Vidéo", description: "Des vidéos claires et attrayantes pour marques, créateurs et événements.", benefit: "Captez l’attention et communiquez mieux." }, { id: "audio", title: "Montage Audio", description: "Nettoyage, mixage et mastering pour vidéos, podcasts et contenus numériques.", benefit: "Offrez à chaque projet un son clair et professionnel." }],
    portfolioSection: { eyebrow: "Portfolio", title: "Projets sélectionnés.", description: "Des réalisations qui allient clarté, expérience et résultats.", view: "Voir le projet", videoDemo: "Démonstration du projet", screenshot: "Capture d’écran du projet" },
    projects: [{ name: "AgriClimate Pro", category: "Développement Web · AgTech", description: "Une expérience digitale qui facilite les décisions agricoles grâce aux données climatiques." }, { name: "Frasson LLC", category: "Développement Web", description: "Un site d’entreprise clair, conçu pour présenter les services et faciliter le contact." }, { name: "Event QR Code", category: "Expérience digitale événementielle", description: "Un parcours simple par QR Code permettant aux invités d’envoyer photos et vidéos." }, { name: "Cafeteria", category: "Développement Web · Restauration", description: "Un site chaleureux et responsive qui présente l’expérience du café et facilite l’accès au menu." }],
    company: { eyebrow: "Entreprise", title: "À propos de Mediatrix Tech", description: "Créativité et technologie réunies pour rapprocher les marques et les personnes.", facts: [["Qui sommes-nous ?", "Une entreprise technologique et créative axée sur des solutions digitales utiles."], ["Ce que nous faisons", "Nous réunissons développement web et retouche visuelle dans une prestation cohérente."], ["Notre méthode", "Nous comprenons l’objectif, simplifions le parcours et restons à vos côtés."], ["Où intervenons-nous ?", "La planète Terre et ses environs."]] },
    contact: { eyebrow: "Contact", title: "Parlons de votre projet.", description: "Choisissez le canal le plus pratique ou envoyez-nous un message via le formulaire.", channelsLabel: "Canaux de contact", channels: [["WhatsApp EN", "Service en anglais"], ["WhatsApp PT", "Service en portugais"], ["E-mail", "mediatrixtech@proton.me"], ["Profil Upwork", "Projets internationaux"]], form: { title: "Envoyer un message", description: "Expliquez-nous brièvement ce dont vous avez besoin.", name: "Nom", email: "E-mail", service: "Service recherché", chooseService: "Sélectionnez un service", message: "Message", send: "Envoyer le message", sending: "Envoi en cours...", success: "Message envoyé. Nous vous répondrons bientôt.", error: "Votre message n’a pas pu être envoyé. Réessayez ou contactez-nous sur WhatsApp.", subject: "Nouveau message depuis le site Mediatrix Tech" } },
    rights: "Tous droits réservés.",
  },

  de: {
    easterEggs: easterEggTranslations.de,
    metaDescription: "Mediatrix Tech erstellt professionelle Websites und visuelle Inhalte für Unternehmen weltweit.",
    skip: "Zum Inhalt springen", nav: ["Start", "Leistungen", "Portfolio", "Unternehmen", "Kontakt"], primaryNavigation: "Hauptnavigation", mobileNavigation: "Mobile Navigation", language: "Sprache", openMenu: "Menü öffnen", closeMenu: "Menü schließen", quote: "Angebot anfordern",
    hero: { logoAlt: "Logo von Mediatrix Tech", title: "Technologie und Inhalte, die Ihre Marke voranbringen.", description: "Wir erstellen professionelle Websites und visuelle Inhalte für Unternehmen weltweit.", services: "Leistungen ansehen" },
    servicesSection: { eyebrow: "Leistungen", title: "Alles Wesentliche für einen professionellen Markenauftritt.", description: "Vier klare Lösungen, abgestimmt auf Ihre Ziele und Ihre aktuelle Unternehmensphase." },
    services: [{ id: "web", title: "Webentwicklung", description: "Schnelle, responsive Websites, die auf jedem Bildschirm leicht zu bedienen sind.", benefit: "Machen Sie aus Besuchen neue Chancen." }, { id: "photo", title: "Fotobearbeitung", description: "Professionelle Bearbeitung für Produkte, Veranstaltungen und soziale Medien.", benefit: "Setzen Sie Ihre Marke in jedem Bild in Szene." }, { id: "video", title: "Videobearbeitung", description: "Klare, ansprechende Videos für Marken, Kreative und Veranstaltungen.", benefit: "Gewinnen Sie Aufmerksamkeit und kommunizieren Sie besser." }, { id: "audio", title: "Audiobearbeitung", description: "Bereinigung, Mischung und Mastering für Videos, Podcasts und digitale Inhalte.", benefit: "Geben Sie jedem Projekt einen klaren, professionellen Klang." }],
    portfolioSection: { eyebrow: "Portfolio", title: "Ausgewählte Projekte.", description: "Arbeiten, die Klarheit, Erfahrung und Ergebnisse verbinden.", view: "Projekt ansehen", videoDemo: "Projektvorführung", screenshot: "Projekt-Screenshot" },
    projects: [{ name: "AgriClimate Pro", category: "Webentwicklung · AgTech", description: "Eine digitale Lösung, die landwirtschaftliche Entscheidungen mit Klimadaten unterstützt." }, { name: "Frasson LLC", category: "Webentwicklung", description: "Eine klare Unternehmenswebsite zur Präsentation von Leistungen und für eine einfache Kontaktaufnahme." }, { name: "Event QR Code", category: "Digitale Event-Lösung", description: "Ein einfacher QR-Code-Ablauf, über den Gäste Fotos und Videos hochladen können." }, { name: "Cafeteria", category: "Webentwicklung · Gastronomie", description: "Eine einladende, responsive Website, die das Café-Erlebnis präsentiert und den Zugang zur Speisekarte erleichtert." }],
    company: { eyebrow: "Unternehmen", title: "Über Mediatrix Tech", description: "Kreativität und Technologie verbinden Marken und Menschen.", facts: [["Wer wir sind", "Ein Technologie- und Kreativunternehmen mit Fokus auf nützliche digitale Lösungen."], ["Was wir tun", "Wir verbinden Webentwicklung und visuelle Bearbeitung zu einem stimmigen Gesamtpaket."], ["Wie wir arbeiten", "Wir verstehen das Ziel, vereinfachen den Weg und beziehen Sie eng ein."], ["Wo wir arbeiten", "Planet Erde und Umgebung."]] },
    contact: { eyebrow: "Kontakt", title: "Sprechen wir über Ihr Projekt.", description: "Wählen Sie den bequemsten Kanal oder senden Sie uns eine Nachricht über das Formular.", channelsLabel: "Kontaktmöglichkeiten", channels: [["WhatsApp EN", "Service auf Englisch"], ["WhatsApp PT", "Service auf Portugiesisch"], ["E-Mail", "mediatrixtech@proton.me"], ["Upwork-Profil", "Internationale Projekte"]], form: { title: "Nachricht senden", description: "Beschreiben Sie kurz, was Sie benötigen.", name: "Name", email: "E-Mail", service: "Gewünschte Leistung", chooseService: "Leistung auswählen", message: "Nachricht", send: "Nachricht senden", sending: "Wird gesendet...", success: "Nachricht erfolgreich gesendet. Wir melden uns in Kürze.", error: "Ihre Nachricht konnte nicht gesendet werden. Versuchen Sie es erneut oder kontaktieren Sie uns über WhatsApp.", subject: "Neue Nachricht von der Mediatrix-Tech-Website" } },
    rights: "Alle Rechte vorbehalten.",
  },

  "zh-CN": {
    easterEggs: easterEggTranslations["zh-CN"],
    metaDescription: "Mediatrix Tech 为全球企业打造专业网站和视觉内容。",
    skip: "跳到主要内容", nav: ["首页", "服务", "作品集", "公司", "联系"], primaryNavigation: "主导航", mobileNavigation: "移动端导航", language: "语言", openMenu: "打开菜单", closeMenu: "关闭菜单", quote: "获取报价",
    hero: { logoAlt: "Mediatrix Tech 标志", title: "以技术与内容，推动您的品牌向前。", description: "我们为全球企业打造专业网站和视觉内容。", services: "查看服务" },
    servicesSection: { eyebrow: "服务", title: "以专业品质呈现品牌所需的一切。", description: "四项清晰的解决方案，契合您的目标与业务发展阶段。" },
    services: [{ id: "web", title: "网站开发", description: "快速、响应式，并在各种屏幕上都易于使用的网站。", benefit: "将访问转化为新的商机。" }, { id: "photo", title: "图片编辑", description: "适用于产品、活动和社交媒体的专业修图。", benefit: "让品牌在每张图片中更具吸引力。" }, { id: "video", title: "视频剪辑", description: "为品牌、创作者和活动制作清晰且引人入胜的视频。", benefit: "抓住注意力，更有效地传达信息。" }, { id: "audio", title: "音频编辑", description: "为视频、播客和数字内容提供降噪、混音与母带处理。", benefit: "让每个项目拥有清晰专业的声音。" }],
    portfolioSection: { eyebrow: "作品集", title: "精选项目。", description: "兼具清晰体验、专业能力与成果的代表作品。", view: "查看项目", videoDemo: "项目演示", screenshot: "项目截图" },
    projects: [{ name: "AgriClimate Pro", category: "网站开发 · 农业科技", description: "利用气候数据辅助农业决策的数字化体验。" }, { name: "Frasson LLC", category: "网站开发", description: "简洁的企业网站，用于展示服务并方便客户联系。" }, { name: "Event QR Code", category: "活动数字体验", description: "宾客可通过二维码轻松上传照片和视频。" }, { name: "Cafeteria", category: "网站开发 · 餐饮", description: "温馨的响应式网站，展示咖啡馆体验并让访客轻松查看菜单。" }],
    company: { eyebrow: "公司", title: "关于 Mediatrix Tech", description: "让创意与技术协同工作，连接品牌与人。", facts: [["我们是谁", "一家专注于实用数字解决方案的科技与创意公司。"], ["我们做什么", "将网站开发与视觉编辑整合为一致的交付体验。"], ["我们的工作方式", "理解目标、简化流程，并与您保持紧密沟通。"], ["我们的服务范围", "地球及其周边地区。"]] },
    contact: { eyebrow: "联系", title: "聊聊您的项目吧。", description: "请选择最方便的联系方式，或通过表单给我们留言。", channelsLabel: "联系方式", channels: [["WhatsApp EN", "英语服务"], ["WhatsApp PT", "葡萄牙语服务"], ["电子邮件", "mediatrixtech@proton.me"], ["Upwork 主页", "国际项目"]], form: { title: "发送消息", description: "请简要说明您的需求。", name: "姓名", email: "电子邮件", service: "感兴趣的服务", chooseService: "请选择一项服务", message: "消息", send: "发送消息", sending: "正在发送...", success: "消息已成功发送。我们会尽快与您联系。", error: "消息发送失败。请重试或通过 WhatsApp 联系我们。", subject: "来自 Mediatrix Tech 网站的新消息" } },
    rights: "保留所有权利。",
  },

  hi: {
    easterEggs: easterEggTranslations.hi,
    metaDescription: "Mediatrix Tech दुनिया भर के व्यवसायों के लिए पेशेवर वेबसाइट और विज़ुअल कंटेंट बनाता है।",
    skip: "मुख्य सामग्री पर जाएँ", nav: ["होम", "सेवाएँ", "पोर्टफोलियो", "कंपनी", "संपर्क"], primaryNavigation: "मुख्य नेविगेशन", mobileNavigation: "मोबाइल नेविगेशन", language: "भाषा", openMenu: "मेन्यू खोलें", closeMenu: "मेन्यू बंद करें", quote: "कोटेशन माँगें",
    hero: { logoAlt: "Mediatrix Tech का लोगो", title: "तकनीक और कंटेंट जो आपके ब्रांड को आगे बढ़ाएँ।", description: "हम दुनिया भर के व्यवसायों के लिए पेशेवर वेबसाइट और विज़ुअल कंटेंट बनाते हैं।", services: "सेवाएँ देखें" },
    servicesSection: { eyebrow: "सेवाएँ", title: "आपके ब्रांड को बेहतरीन ढंग से प्रस्तुत करने के लिए जरूरी समाधान।", description: "आपके लक्ष्य और व्यवसाय के चरण के अनुसार चार स्पष्ट समाधान।" },
    services: [{ id: "web", title: "वेब डेवलपमेंट", description: "हर स्क्रीन पर तेज़, रेस्पॉन्सिव और इस्तेमाल में आसान वेबसाइट।", benefit: "वेबसाइट विज़िट को नए अवसरों में बदलें।" }, { id: "photo", title: "फ़ोटो एडिटिंग", description: "उत्पादों, आयोजनों और सोशल मीडिया के लिए पेशेवर एडिटिंग।", benefit: "हर तस्वीर में अपने ब्रांड को बेहतर दिखाएँ।" }, { id: "video", title: "वीडियो एडिटिंग", description: "ब्रांड, क्रिएटर और आयोजनों के लिए स्पष्ट और आकर्षक वीडियो।", benefit: "ध्यान आकर्षित करें और बेहतर संवाद करें।" }, { id: "audio", title: "ऑडियो एडिटिंग", description: "वीडियो, पॉडकास्ट और डिजिटल कंटेंट के लिए ऑडियो क्लीनअप, मिक्सिंग और मास्टरिंग।", benefit: "हर प्रोजेक्ट को साफ़ और पेशेवर ध्वनि दें।" }],
    portfolioSection: { eyebrow: "पोर्टफोलियो", title: "चुनिंदा प्रोजेक्ट।", description: "ऐसे काम जो स्पष्टता, अनुभव और परिणामों को साथ लाते हैं।", view: "प्रोजेक्ट देखें", videoDemo: "प्रोजेक्ट डेमो", screenshot: "प्रोजेक्ट का स्क्रीनशॉट" },
    projects: [{ name: "AgriClimate Pro", category: "वेब डेवलपमेंट · AgTech", description: "जलवायु डेटा से कृषि निर्णयों में मदद करने वाला डिजिटल अनुभव।" }, { name: "Frasson LLC", category: "वेब डेवलपमेंट", description: "सेवाएँ प्रस्तुत करने और संपर्क आसान बनाने के लिए तैयार स्पष्ट व्यावसायिक वेबसाइट।" }, { name: "Event QR Code", category: "आयोजनों के लिए डिजिटल अनुभव", description: "मेहमानों के लिए QR Code से फ़ोटो और वीडियो भेजने का आसान तरीका।" }, { name: "Cafeteria", category: "वेब डेवलपमेंट · खाद्य एवं पेय", description: "कैफ़े के अनुभव को प्रस्तुत करने और मेन्यू तक आसान पहुँच देने वाली आकर्षक, रेस्पॉन्सिव वेबसाइट।" }],
    company: { eyebrow: "कंपनी", title: "Mediatrix Tech के बारे में", description: "ब्रांड और लोगों को जोड़ने के लिए रचनात्मकता और तकनीक का मेल।", facts: [["हम कौन हैं", "उपयोगी डिजिटल समाधानों पर केंद्रित एक तकनीकी और रचनात्मक कंपनी।"], ["हम क्या करते हैं", "हम वेब डेवलपमेंट और विज़ुअल एडिटिंग को एक सुसंगत सेवा में जोड़ते हैं।"], ["हम कैसे काम करते हैं", "हम लक्ष्य समझते हैं, प्रक्रिया सरल बनाते हैं और आपको साथ रखते हैं।"], ["हम कहाँ काम करते हैं", "पृथ्वी ग्रह और उसके आसपास।"]] },
    contact: { eyebrow: "संपर्क", title: "आइए आपके प्रोजेक्ट पर बात करें।", description: "सबसे सुविधाजनक माध्यम चुनें या फ़ॉर्म से हमें संदेश भेजें।", channelsLabel: "संपर्क माध्यम", channels: [["WhatsApp EN", "अंग्रेज़ी में सेवा"], ["WhatsApp PT", "पुर्तगाली में सेवा"], ["ईमेल", "mediatrixtech@proton.me"], ["Upwork प्रोफ़ाइल", "अंतरराष्ट्रीय प्रोजेक्ट"]], form: { title: "संदेश भेजें", description: "संक्षेप में बताएँ कि आपको क्या चाहिए।", name: "नाम", email: "ईमेल", service: "रुचि की सेवा", chooseService: "एक सेवा चुनें", message: "संदेश", send: "संदेश भेजें", sending: "भेजा जा रहा है...", success: "संदेश सफलतापूर्वक भेजा गया। हम जल्द संपर्क करेंगे।", error: "संदेश नहीं भेजा जा सका। दोबारा कोशिश करें या WhatsApp पर संपर्क करें।", subject: "Mediatrix Tech वेबसाइट से नया संदेश" } },
    rights: "सर्वाधिकार सुरक्षित।",
  },

  ar: {
    easterEggs: easterEggTranslations.ar,
    metaDescription: "تصمم Mediatrix Tech مواقع إلكترونية ومحتوى بصريًا احترافيًا للشركات حول العالم.",
    skip: "الانتقال إلى المحتوى", nav: ["الرئيسية", "الخدمات", "الأعمال", "الشركة", "التواصل"], primaryNavigation: "التنقل الرئيسي", mobileNavigation: "التنقل عبر الهاتف", language: "اللغة", openMenu: "فتح القائمة", closeMenu: "إغلاق القائمة", quote: "طلب عرض سعر",
    hero: { logoAlt: "شعار Mediatrix Tech", title: "تقنية ومحتوى يدفعان علامتك التجارية إلى الأمام.", description: "نصمم مواقع إلكترونية ومحتوى بصريًا احترافيًا للشركات حول العالم.", services: "عرض الخدمات" },
    servicesSection: { eyebrow: "الخدمات", title: "كل ما تحتاجه علامتك التجارية لتظهر بجودة واحتراف.", description: "أربعة حلول واضحة تتكيف مع أهدافك ومرحلة نمو أعمالك." },
    services: [{ id: "web", title: "تطوير المواقع", description: "مواقع سريعة ومتجاوبة وسهلة الاستخدام على جميع الشاشات.", benefit: "حوّل الزيارات إلى فرص جديدة." }, { id: "photo", title: "تحرير الصور", description: "معالجة احترافية للمنتجات والفعاليات ووسائل التواصل الاجتماعي.", benefit: "أبرز علامتك التجارية في كل صورة." }, { id: "video", title: "تحرير الفيديو", description: "فيديوهات واضحة وجذابة للعلامات التجارية وصنّاع المحتوى والفعاليات.", benefit: "اجذب الانتباه وتواصل بصورة أفضل." }, { id: "audio", title: "تحرير الصوت", description: "تنقية الصوت ومزجه وإتقانه للفيديوهات والبودكاست والمحتوى الرقمي.", benefit: "امنح كل مشروع صوتًا واضحًا واحترافيًا." }],
    portfolioSection: { eyebrow: "الأعمال", title: "مشاريع مختارة.", description: "أعمال تجمع بين الوضوح والخبرة والنتائج.", view: "عرض المشروع", videoDemo: "عرض توضيحي للمشروع", screenshot: "لقطة شاشة للمشروع" },
    projects: [{ name: "AgriClimate Pro", category: "تطوير المواقع · التقنية الزراعية", description: "تجربة رقمية تدعم القرارات الزراعية بالاعتماد على بيانات المناخ." }, { name: "Frasson LLC", category: "تطوير المواقع", description: "موقع أعمال واضح صُمم لعرض الخدمات وتسهيل التواصل." }, { name: "Event QR Code", category: "تجربة رقمية للفعاليات", description: "مسار بسيط عبر رمز QR يتيح للضيوف إرسال الصور والفيديوهات." }, { name: "Cafeteria", category: "تطوير المواقع · الأغذية والمشروبات", description: "موقع دافئ ومتجاوب يعرض تجربة المقهى ويسهّل الوصول إلى قائمة الطعام." }],
    company: { eyebrow: "الشركة", title: "عن Mediatrix Tech", description: "الإبداع والتقنية يعملان معًا لربط العلامات التجارية بالناس.", facts: [["من نحن", "شركة تقنية وإبداعية تركز على حلول رقمية مفيدة."], ["ما الذي نقدمه", "نجمع تطوير المواقع والتحرير البصري في خدمة متكاملة ومتناسقة."], ["كيف نعمل", "نفهم الهدف ونبسّط الطريق ونبقيك على اطلاع دائم."], ["أين نعمل", "كوكب الأرض وما حوله."]] },
    contact: { eyebrow: "التواصل", title: "لنتحدث عن مشروعك.", description: "اختر وسيلة التواصل الأنسب أو أرسل لنا رسالة عبر النموذج.", channelsLabel: "وسائل التواصل", channels: [["WhatsApp EN", "خدمة باللغة الإنجليزية"], ["WhatsApp PT", "خدمة باللغة البرتغالية"], ["البريد الإلكتروني", "mediatrixtech@proton.me"], ["حساب Upwork", "مشاريع دولية"]], form: { title: "إرسال رسالة", description: "أخبرنا بإيجاز بما تحتاج إليه.", name: "الاسم", email: "البريد الإلكتروني", service: "الخدمة المطلوبة", chooseService: "اختر خدمة", message: "الرسالة", send: "إرسال الرسالة", sending: "جارٍ الإرسال...", success: "تم إرسال رسالتك بنجاح. سنتواصل معك قريبًا.", error: "تعذر إرسال الرسالة. حاول مرة أخرى أو تواصل معنا عبر WhatsApp.", subject: "رسالة جديدة من موقع Mediatrix Tech" } },
    rights: "جميع الحقوق محفوظة.",
  },
};

function mergeWithEnglishFallback(englishValue, localizedValue) {
  if (!englishValue || typeof englishValue !== "object" || Array.isArray(englishValue)) {
    return localizedValue ?? englishValue;
  }

  return Object.fromEntries(
    Object.keys(englishValue).map((key) => [
      key,
      mergeWithEnglishFallback(englishValue[key], localizedValue?.[key]),
    ]),
  );
}

export function getEasterEggCopy(locale) {
  return mergeWithEnglishFallback(
    translations.en.easterEggs,
    translations[locale]?.easterEggs,
  );
}
