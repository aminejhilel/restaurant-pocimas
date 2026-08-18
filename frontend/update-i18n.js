const fs = require('fs');
const path = require('path');

const es = {
  NAV: {
    HOME: "Inicio",
    OUR_STORY: "Nuestra Historia",
    MENU: "Menú",
    CONTACT: "Contacto",
    LOGIN: "Iniciar Sesión",
    MY_RESERVATIONS: "Mis Reservas",
    LOGOUT: "Cerrar Sesión",
    RESERVE: "Reservar"
  },
  HERO: {
    EYEBROW: "Alta Gastronomía - Est. 1987",
    TITLE_1: "Pócimas",
    TITLE_2: "Restaurante",
    SUBTITLE: "Donde el arte culinario se une a la elegancia atemporal. Le espera una experiencia gastronómica inolvidable.",
    BTN_RESERVE: "Reservar una Mesa",
    BTN_EXPLORE: "Explorar el Menú",
    SCROLL: "Desplazarse"
  },
  ABOUT: {
    SUBTITLE: "Un Sabor de Excelencia",
    TITLE_1: "Elaborado con Pasión,",
    TITLE_2: "Servido con Amor",
    P1: "Ubicado en el corazón de París, Pócimas Restaurante ha sido un santuario para aquellos que aprecian las cosas buenas de la vida. Nuestra cocina está dirigida por chefs galardonados que transforman los mejores ingredientes de temporada en extraordinarias obras maestras.",
    P2: "Cada comida es un viaje por la tradición culinaria francesa, reimaginada con un estilo contemporáneo y presentada con una atención inquebrantable a los detalles.",
    BTN: "Nuestra Historia"
  },
  FEATURED: {
    SUBTITLE: "Selección del Chef",
    TITLE: "Platos Destacados",
    BTN: "Ver Menú Completo"
  },
  HOME_DISHES: {
    DISH1_NAME: "Boeuf Bourguignon",
    DISH1_DESC: "Ternera tierna estofada en vino de Borgoña con champiñones, cebollitas y panceta.",
    DISH1_CAT: "Plato Principal",
    DISH2_NAME: "Crème Brûlée",
    DISH2_DESC: "Clásica crema de vainilla de Madagascar con una costra de azúcar perfectamente caramelizada.",
    DISH2_CAT: "Postre",
    DISH3_NAME: "Escargots de Bourgogne",
    DISH3_DESC: "Caracoles horneados en mantequilla de ajo a las finas hierbas, un clásico francés elevado.",
    DISH3_CAT: "Entrante"
  },
  HOME_STATS: {
    STAT1: "Años de Excelencia",
    STAT2: "Huéspedes Felices",
    STAT3: "Estrellas Michelin",
    STAT4: "Platos de Autor"
  },
  GALLERY: {
    SUBTITLE: "Momentos",
    TITLE: "Un Vistazo al Interior"
  },
  CTA: {
    SUBTITLE: "Experimente la Alta Cocina",
    TITLE: "Reserve su Mesa Esta Noche",
    TEXT: "Reserve su mesa y permítanos crear una velada inolvidable para usted y sus invitados.",
    BTN: "Hacer una Reserva"
  },
  FOOTER: {
    DESC: "Una experiencia de alta cocina donde cada plato cuenta una historia de pasión, tradición y excelencia culinaria.",
    QUICK_LINKS: "Navegación",
    CONTACT_INFO: "Datos de Contacto",
    OPENING_HOURS: "Horario de Apertura",
    WEEKDAYS: "Lunes - Viernes",
    WEEKENDS: "Sábado - Domingo",
    ALL_RIGHTS: "Pócimas Restaurante. Todos los derechos reservados."
  },
  STORY: {
    SUBTITLE: "Herencia y Pasión",
    TITLE: "Nuestra Historia",
    CH1_TITLE: "El Comienzo",
    CH1_P1: "Fundado en 1987 por el Chef Antoine Laurent, Pócimas Restaurante comenzó como un pequeño bistró en el corazón de París. La visión de Antoine era simple: servir auténtica cocina francesa utilizando solo los ingredientes más frescos de los mercados locales.",
    CH1_P2: "Rápidamente se corrió la voz sobre la calidad excepcional y la calidez del servicio, convirtiendo el modesto establecimiento en una joya local muy querida.",
    CH2_TITLE: "Nuestra Filosofía",
    CH2_P1: "Creemos que la gran comida comienza con grandes ingredientes. Por eso colaboramos estrechamente con agricultores, artesanos y viticultores locales que comparten nuestro compromiso con la sostenibilidad y la excelencia.",
    CH2_P2: "Cada plato es un testimonio de las estaciones, cambiando dinámicamente para reflejar lo que la naturaleza ofrece en su punto más alto.",
    CH3_TITLE: "El Futuro",
    CH3_P1: "Hoy, Pócimas Restaurante es honrado con tres estrellas Michelin, sin embargo, nuestros valores fundamentales permanecen inalterados. Continuamos empujando los límites de la gastronomía mientras honramos las ricas tradiciones que nos trajeron aquí.",
    CH3_P2: "Le invitamos a unirse a nosotros en este viaje culinario continuo, donde cada comida está diseñada para ser una experiencia memorable."
  },
  MENU: {
    SUBTITLE: "Viaje Culinario",
    TITLE: "Nuestro Menú",
    DESC: "Elaborado con los mejores ingredientes de temporada, nuestro menú es una celebración de la tradición culinaria francesa.",
    ALL: "Todo",
    UNAVAILABLE: "No disponible",
    EMPTY: "No se encontraron artículos."
  },
  CONTACT: {
    SUBTITLE: "Póngase en Contacto",
    TITLE: "Contáctenos",
    VISIT: "Visítenos",
    ADDRESS: "Dirección",
    PHONE: "Teléfono",
    EMAIL: "Correo",
    HOURS: "Horario",
    HOURS_VAL: "Lunes – Domingo",
    FORM_TITLE: "Enviar un Mensaje",
    FORM_SUB: "Le responderemos en 24 horas.",
    SUCCESS: "✓ Su mensaje ha sido enviado. ¡Nos pondremos en contacto pronto!",
    NAME: "Nombre Completo *",
    NAME_PH: "Juan García",
    NAME_REQ: "El nombre es obligatorio",
    EMAIL_LABEL: "Correo Electrónico *",
    EMAIL_REQ: "El correo es obligatorio",
    PHONE_LABEL: "Teléfono",
    MESSAGE: "Mensaje *",
    MESSAGE_PH: "¿Cómo podemos ayudarle?",
    MESSAGE_REQ: "El mensaje es obligatorio",
    SEND: "Enviar Mensaje",
    SENDING: "Enviando..."
  },
  SEO: {
    TITLE: "Pócimas Restaurante | Alta Gastronomía",
    DESCRIPTION: "Experimente la alta gastronomía en Pócimas Restaurante."
  }
};

const en = {
  NAV: {
    HOME: "Home",
    OUR_STORY: "Our Story",
    MENU: "Menu",
    CONTACT: "Contact",
    LOGIN: "Login",
    MY_RESERVATIONS: "My Reservations",
    LOGOUT: "Logout",
    RESERVE: "Reserve"
  },
  HERO: {
    EYEBROW: "Haute Gastronomy - Est. 1987",
    TITLE_1: "Pócimas",
    TITLE_2: "Restaurante",
    SUBTITLE: "Where culinary art meets timeless elegance. An unforgettable gastronomic experience awaits you.",
    BTN_RESERVE: "Reserve a Table",
    BTN_EXPLORE: "Explore Menu",
    SCROLL: "Scroll"
  },
  ABOUT: {
    SUBTITLE: "A Taste of Excellence",
    TITLE_1: "Crafted With Passion,",
    TITLE_2: "Served With Love",
    P1: "Nestled in the heart of Paris, Pócimas Restaurante has been a sanctuary for those who appreciate the finer things in life. Our kitchen is led by award-winning chefs who transform the finest seasonal ingredients into extraordinary masterpieces.",
    P2: "Every meal is a journey through French culinary tradition, reimagined with contemporary flair and presented with unwavering attention to detail.",
    BTN: "Our Story"
  },
  FEATURED: {
    SUBTITLE: "Chef's Selection",
    TITLE: "Featured Dishes",
    BTN: "View Full Menu"
  },
  HOME_DISHES: {
    DISH1_NAME: "Boeuf Bourguignon",
    DISH1_DESC: "Tender beef braised in Burgundy wine with mushrooms, pearl onions and lardons.",
    DISH1_CAT: "Main Course",
    DISH2_NAME: "Crème Brûlée",
    DISH2_DESC: "Classic Madagascan vanilla custard with a perfectly caramelized sugar crust.",
    DISH2_CAT: "Dessert",
    DISH3_NAME: "Escargots de Bourgogne",
    DISH3_DESC: "Snails baked in herbed garlic butter — a true French classic, elevated.",
    DISH3_CAT: "Starter"
  },
  HOME_STATS: {
    STAT1: "Years of Excellence",
    STAT2: "Happy Guests",
    STAT3: "Michelin Stars",
    STAT4: "Signature Dishes"
  },
  GALLERY: {
    SUBTITLE: "Moments",
    TITLE: "A Glimpse Inside"
  },
  CTA: {
    SUBTITLE: "Experience Fine Dining",
    TITLE: "Book Your Table Tonight",
    TEXT: "Reserve your table and let us craft an unforgettable evening for you and your guests.",
    BTN: "Make a Reservation"
  },
  FOOTER: {
    DESC: "A fine dining experience where every dish tells a story of passion, tradition, and culinary excellence.",
    QUICK_LINKS: "Quick Links",
    CONTACT_INFO: "Contact Info",
    OPENING_HOURS: "Opening Hours",
    WEEKDAYS: "Monday - Friday",
    WEEKENDS: "Saturday - Sunday",
    ALL_RIGHTS: "Pócimas Restaurante. All rights reserved."
  },
  STORY: {
    SUBTITLE: "Heritage & Passion",
    TITLE: "Our Story",
    CH1_TITLE: "The Beginning",
    CH1_P1: "Founded in 1987 by Chef Antoine Laurent, Pócimas Restaurante began as a small bistro in the heart of Paris. Antoine's vision was simple: to serve authentic French cuisine using only the freshest ingredients from local markets.",
    CH1_P2: "Word quickly spread about the exceptional quality and warmth of the service, turning the modest establishment into a beloved local gem.",
    CH2_TITLE: "Our Philosophy",
    CH2_P1: "We believe that great food starts with great ingredients. That's why we partner closely with local farmers, artisans, and winemakers who share our commitment to sustainability and excellence.",
    CH2_P2: "Every dish is a testament to the seasons, changing dynamically to reflect what nature offers at its absolute peak.",
    CH3_TITLE: "The Future",
    CH3_P1: "Today, Pócimas Restaurante is honored with three Michelin stars, yet our core values remain unchanged. We continue to push the boundaries of gastronomy while honoring the rich traditions that got us here.",
    CH3_P2: "We invite you to join us on this ongoing culinary journey, where every meal is designed to be a memorable experience."
  },
  MENU: {
    SUBTITLE: "Culinary Journey",
    TITLE: "Our Menu",
    DESC: "Crafted with the finest seasonal ingredients, our menu is a celebration of French culinary tradition.",
    ALL: "All",
    UNAVAILABLE: "Unavailable",
    EMPTY: "No items found."
  },
  CONTACT: {
    SUBTITLE: "Get in Touch",
    TITLE: "Contact Us",
    VISIT: "Visit Us",
    ADDRESS: "Address",
    PHONE: "Phone",
    EMAIL: "Email",
    HOURS: "Hours",
    HOURS_VAL: "Monday – Sunday",
    FORM_TITLE: "Send a Message",
    FORM_SUB: "We'll get back to you within 24 hours.",
    SUCCESS: "✓ Your message has been sent. We'll be in touch shortly!",
    NAME: "Full Name *",
    NAME_PH: "John Doe",
    NAME_REQ: "Name is required",
    EMAIL_LABEL: "Email *",
    EMAIL_REQ: "Email is required",
    PHONE_LABEL: "Phone",
    MESSAGE: "Message *",
    MESSAGE_PH: "How can we help you?",
    MESSAGE_REQ: "Message is required",
    SEND: "Send Message",
    SENDING: "Sending..."
  },
  SEO: {
    TITLE: "Pócimas Restaurante | Fine Dining",
    DESCRIPTION: "Experience fine dining at Pócimas Restaurante."
  }
};

const fr = {
  NAV: {
    HOME: "Accueil",
    OUR_STORY: "Notre Histoire",
    MENU: "Menu",
    CONTACT: "Contact",
    LOGIN: "Connexion",
    MY_RESERVATIONS: "Mes Réservations",
    LOGOUT: "Déconnexion",
    RESERVE: "Réserver"
  },
  HERO: {
    EYEBROW: "Haute Gastronomie - Est. 1987",
    TITLE_1: "Pócimas",
    TITLE_2: "Restaurante",
    SUBTITLE: "Où l'art culinaire rencontre l'élégance intemporelle. Une expérience gastronomique inoubliable vous attend.",
    BTN_RESERVE: "Réserver une Table",
    BTN_EXPLORE: "Explorer le Menu",
    SCROLL: "Défiler"
  },
  ABOUT: {
    SUBTITLE: "Un Goût d'Excellence",
    TITLE_1: "Créé avec Passion,",
    TITLE_2: "Servi avec Amour",
    P1: "Niché au cœur de Paris, Pócimas Restaurante a été un sanctuaire pour ceux qui apprécient les bonnes choses de la vie. Notre cuisine est dirigée par des chefs primés qui transforment les meilleurs ingrédients de saison en chefs-d'œuvre extraordinaires.",
    P2: "Chaque repas est un voyage à travers la tradition culinaire française, réimaginée avec une touche contemporaine et présentée avec une attention inébranlable aux détails.",
    BTN: "Notre Histoire"
  },
  FEATURED: {
    SUBTITLE: "Sélection du Chef",
    TITLE: "Plats Signature",
    BTN: "Voir le Menu Complet"
  },
  HOME_DISHES: {
    DISH1_NAME: "Bœuf Bourguignon",
    DISH1_DESC: "Bœuf tendre braisé au vin de Bourgogne avec champignons, petits oignons et lardons.",
    DISH1_CAT: "Plat Principal",
    DISH2_NAME: "Crème Brûlée",
    DISH2_DESC: "Crème pâtissière classique à la vanille de Madagascar avec une croûte de sucre parfaitement caramélisée.",
    DISH2_CAT: "Dessert",
    DISH3_NAME: "Escargots de Bourgogne",
    DISH3_DESC: "Escargots cuits au beurre d'ail aux herbes — un grand classique français.",
    DISH3_CAT: "Entrée"
  },
  HOME_STATS: {
    STAT1: "Années d'Excellence",
    STAT2: "Clients Satisfaits",
    STAT3: "Étoiles Michelin",
    STAT4: "Plats Signature"
  },
  GALLERY: {
    SUBTITLE: "Moments",
    TITLE: "Un Aperçu à l'Intérieur"
  },
  CTA: {
    SUBTITLE: "Expérience Gastronomique",
    TITLE: "Réservez Votre Table Ce Soir",
    TEXT: "Réservez votre table et laissez-nous créer une soirée inoubliable pour vous et vos invités.",
    BTN: "Faire une Réservation"
  },
  FOOTER: {
    DESC: "Une expérience gastronomique où chaque plat raconte une histoire de passion, de tradition et d'excellence culinaire.",
    QUICK_LINKS: "Navigation",
    CONTACT_INFO: "Contact",
    OPENING_HOURS: "Heures d'Ouverture",
    WEEKDAYS: "Lundi - Vendredi",
    WEEKENDS: "Samedi - Dimanche",
    ALL_RIGHTS: "Pócimas Restaurante. Tous droits réservés."
  },
  STORY: {
    SUBTITLE: "Héritage & Passion",
    TITLE: "Notre Histoire",
    CH1_TITLE: "Le Début",
    CH1_P1: "Fondé en 1987 par le Chef Antoine Laurent, Pócimas Restaurante a commencé comme un petit bistrot au cœur de Paris. La vision d'Antoine était simple : servir une cuisine française authentique en utilisant uniquement les ingrédients les plus frais des marchés locaux.",
    CH1_P2: "Le bouche-à-oreille s'est rapidement répandu sur la qualité exceptionnelle et la chaleur du service, transformant le modeste établissement en un joyau local bien-aimé.",
    CH2_TITLE: "Notre Philosophie",
    CH2_P1: "Nous croyons que la grande cuisine commence par de grands ingrédients. C'est pourquoi nous collaborons étroitement avec des agriculteurs, artisans et viticulteurs locaux qui partagent notre engagement envers la durabilité et l'excellence.",
    CH2_P2: "Chaque plat est un témoignage des saisons, changeant dynamiquement pour refléter ce que la nature offre de meilleur.",
    CH3_TITLE: "L'Avenir",
    CH3_P1: "Aujourd'hui, Pócimas Restaurante est honoré de trois étoiles Michelin, pourtant nos valeurs fondamentales restent inchangées. Nous continuons à repousser les limites de la gastronomie tout en honorant les riches traditions qui nous ont amenés ici.",
    CH3_P2: "Nous vous invitons à vous joindre à nous dans ce voyage culinaire continu, où chaque repas est conçu pour être une expérience mémorable."
  },
  MENU: {
    SUBTITLE: "Voyage Culinaire",
    TITLE: "Notre Menu",
    DESC: "Préparé avec les meilleurs ingrédients de saison, notre menu est une célébration de la tradition culinaire française.",
    ALL: "Tout",
    UNAVAILABLE: "Indisponible",
    EMPTY: "Aucun article trouvé."
  },
  CONTACT: {
    SUBTITLE: "Nous Contacter",
    TITLE: "Contactez-nous",
    VISIT: "Visitez-nous",
    ADDRESS: "Adresse",
    PHONE: "Téléphone",
    EMAIL: "Email",
    HOURS: "Horaires",
    HOURS_VAL: "Lundi – Dimanche",
    FORM_TITLE: "Envoyer un Message",
    FORM_SUB: "Nous vous répondrons dans les 24 heures.",
    SUCCESS: "✓ Votre message a été envoyé. Nous vous contacterons bientôt !",
    NAME: "Nom Complet *",
    NAME_PH: "Jean Dupont",
    NAME_REQ: "Le nom est requis",
    EMAIL_LABEL: "Email *",
    EMAIL_REQ: "L'email est requis",
    PHONE_LABEL: "Téléphone",
    MESSAGE: "Message *",
    MESSAGE_PH: "Comment pouvons-nous vous aider ?",
    MESSAGE_REQ: "Le message est requis",
    SEND: "Envoyer le Message",
    SENDING: "Envoi en cours..."
  },
  SEO: {
    TITLE: "Pócimas Restaurante | Haute Gastronomie",
    DESCRIPTION: "Expérimentez la haute gastronomie au Pócimas Restaurante."
  }
};

const ar = {
  NAV: {
    HOME: "الرئيسية",
    OUR_STORY: "قصتنا",
    MENU: "القائمة",
    CONTACT: "اتصل بنا",
    LOGIN: "تسجيل الدخول",
    MY_RESERVATIONS: "حجوزاتي",
    LOGOUT: "تسجيل الخروج",
    RESERVE: "احجز"
  },
  HERO: {
    EYEBROW: "فن الطهي الراقي - منذ 1987",
    TITLE_1: "بوسيماس",
    TITLE_2: "مطعم",
    SUBTITLE: "حيث يلتقي فن الطهي بالأناقة الخالدة. تجربة لا تُنسى في انتظارك.",
    BTN_RESERVE: "احجز طاولة",
    BTN_EXPLORE: "استكشف القائمة",
    SCROLL: "قم بالتمرير"
  },
  ABOUT: {
    SUBTITLE: "طعم التميز",
    TITLE_1: "صُنع بشغف،",
    TITLE_2: "يُقدم بحب",
    P1: "يقع مطعم بوسيماس في قلب باريس، وكان ملاذاً لأولئك الذين يقدرون الأشياء الجميلة في الحياة. يقود مطبخنا طهاة حائزون على جوائز يحولون أفضل المكونات الموسمية إلى تحف غير عادية.",
    P2: "كل وجبة هي رحلة عبر تقاليد الطهي الفرنسية، أعيد تصورها بلمسة عصرية وتم تقديمها باهتمام لا يتزعزع بالتفاصيل.",
    BTN: "قصتنا"
  },
  FEATURED: {
    SUBTITLE: "اختيار الشيف",
    TITLE: "أطباق مميزة",
    BTN: "عرض القائمة كاملة"
  },
  HOME_DISHES: {
    DISH1_NAME: "لحم بقر بورغينيون",
    DISH1_DESC: "لحم بقر طري مطهو في نبيذ بورجوندي مع الفطر والبصل ولحم الخنزير المقدد.",
    DISH1_CAT: "الطبق الرئيسي",
    DISH2_NAME: "كريم بروليه",
    DISH2_DESC: "كاسترد الفانيليا المدغشقرية الكلاسيكية مع قشرة سكر بالكراميل تمامًا.",
    DISH2_CAT: "حلوى",
    DISH3_NAME: "حلزون بورغوندي",
    DISH3_DESC: "حلزون مخبوز في زبدة الثوم بالأعشاب - طبق فرنسي كلاسيكي بامتياز.",
    DISH3_CAT: "مقبلات"
  },
  HOME_STATS: {
    STAT1: "سنوات من التميز",
    STAT2: "ضيوف سعداء",
    STAT3: "نجوم ميشلان",
    STAT4: "أطباق مميزة"
  },
  GALLERY: {
    SUBTITLE: "لحظات",
    TITLE: "نظرة من الداخل"
  },
  CTA: {
    SUBTITLE: "جرب تناول الطعام الفاخر",
    TITLE: "احجز طاولتك الليلة",
    TEXT: "احجز طاولتك ودعنا نصنع أمسية لا تُنسى لك ولضيوفك.",
    BTN: "قم بالحجز"
  },
  FOOTER: {
    DESC: "تجربة طعام راقية حيث يحكي كل طبق قصة شغف وتقاليد وتميز في الطهي.",
    QUICK_LINKS: "روابط سريعة",
    CONTACT_INFO: "معلومات الاتصال",
    OPENING_HOURS: "ساعات العمل",
    WEEKDAYS: "الاثنين - الجمعة",
    WEEKENDS: "السبت - الأحد",
    ALL_RIGHTS: "مطعم بوسيماس. جميع الحقوق محفوظة."
  },
  STORY: {
    SUBTITLE: "التراث والشغف",
    TITLE: "قصتنا",
    CH1_TITLE: "البداية",
    CH1_P1: "تأسس مطعم بوسيماس في عام 1987 على يد الشيف أنطوان لوران، وبدأ كحانة صغيرة في قلب باريس. كانت رؤية أنطوان بسيطة: تقديم مأكولات فرنسية أصيلة باستخدام المكونات الطازجة فقط من الأسواق المحلية.",
    CH1_P2: "انتشرت الأخبار بسرعة حول الجودة الاستثنائية ودفء الخدمة، مما حول المؤسسة المتواضعة إلى جوهرة محلية محبوبة.",
    CH2_TITLE: "فلسفتنا",
    CH2_P1: "نعتقد أن الطعام الرائع يبدأ بمكونات رائعة. لهذا السبب نتشارك بشكل وثيق مع المزارعين والحرفيين وصانعي النبيذ المحليين الذين يشاركوننا التزامنا بالاستدامة والتميز.",
    CH2_P2: "كل طبق هو شهادة على المواسم، ويتغير ديناميكياً ليعكس ما تقدمه الطبيعة في ذروتها.",
    CH3_TITLE: "المستقبل",
    CH3_P1: "اليوم، يحظى مطعم بوسيماس بثلاث نجوم ميشلان، ومع ذلك تظل قيمنا الأساسية دون تغيير. نستمر في دفع حدود فن الطهي مع تكريم التقاليد الغنية التي أوصلتنا إلى هنا.",
    CH3_P2: "ندعوك للانضمام إلينا في رحلة الطهي المستمرة هذه، حيث تم تصميم كل وجبة لتكون تجربة لا تُنسى."
  },
  MENU: {
    SUBTITLE: "رحلة الطهي",
    TITLE: "قائمتنا",
    DESC: "مُعدّ بأجود المكونات الموسمية، قائمتنا احتفاء بتقاليد الطهي الفرنسية.",
    ALL: "الكل",
    UNAVAILABLE: "غير متوفر",
    EMPTY: "لم يتم العثور على عناصر."
  },
  CONTACT: {
    SUBTITLE: "تواصل معنا",
    TITLE: "اتصل بنا",
    VISIT: "زورونا",
    ADDRESS: "العنوان",
    PHONE: "الهاتف",
    EMAIL: "البريد الإلكتروني",
    HOURS: "ساعات العمل",
    HOURS_VAL: "الاثنين – الأحد",
    FORM_TITLE: "أرسل رسالة",
    FORM_SUB: "سنرد عليك خلال 24 ساعة.",
    SUCCESS: "✓ تم إرسال رسالتك. سنتواصل معك قريباً!",
    NAME: "الاسم الكامل *",
    NAME_PH: "محمد أمين",
    NAME_REQ: "الاسم مطلوب",
    EMAIL_LABEL: "البريد الإلكتروني *",
    EMAIL_REQ: "البريد الإلكتروني مطلوب",
    PHONE_LABEL: "الهاتف",
    MESSAGE: "الرسالة *",
    MESSAGE_PH: "كيف يمكننا مساعدتك؟",
    MESSAGE_REQ: "الرسالة مطلوبة",
    SEND: "إرسال الرسالة",
    SENDING: "جارٍ الإرسال..."
  },
  SEO: {
    TITLE: "مطعم بوسيماس | طعام فاخر",
    DESCRIPTION: "جرب تناول الطعام الفاخر في مطعم بوسيماس."
  }
};

const dist = path.join(__dirname, 'src', 'assets', 'i18n');
fs.writeFileSync(path.join(dist, 'es.json'), JSON.stringify(es, null, 2));
fs.writeFileSync(path.join(dist, 'en.json'), JSON.stringify(en, null, 2));
fs.writeFileSync(path.join(dist, 'fr.json'), JSON.stringify(fr, null, 2));
fs.writeFileSync(path.join(dist, 'ar.json'), JSON.stringify(ar, null, 2));

console.log('i18n files updated successfully.');
