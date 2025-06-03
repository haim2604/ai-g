const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Request body:', JSON.stringify(req.body, null, 2));
  next();
});

// GET endpoint for testing
app.get('/', (req, res) => {
  res.json({ message: 'Gift Finder Server is running!', port: PORT });
});

// Main endpoint for gift recommendations
app.post('/api/gifts/get-gift', (req, res) => {
  try {
    console.log('Received traits:', req.body);
    
    // Validate request
    if (!req.body || !req.body.traits) {
      return res.status(400).json({
        error: 'Missing traits in request body'
      });
    }

    const { traits } = req.body;

    // Simple gift recommendation logic
    const giftRecommendation = generateGiftRecommendation(traits);
    
    console.log('Sending response:', giftRecommendation);
    
    res.json(giftRecommendation);
    
  } catch (error) {
    console.error('Error in get-gift endpoint:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});

// New endpoint for gift alternatives
app.post('/api/gifts/get-alternative', (req, res) => {
  try {
    console.log('Received replacement request:', req.body);
    
    // Validate request
    if (!req.body || !req.body.orderNumber || !req.body.reason) {
      return res.status(400).json({
        error: 'Missing orderNumber or reason in request body'
      });
    }

    const { orderNumber, reason } = req.body;

    // Generate alternative gift based on reason
    const alternativeGift = generateAlternativeGift(reason, orderNumber);
    
    console.log('Sending alternative gift:', alternativeGift);
    
    res.json(alternativeGift);
    
  } catch (error) {
    console.error('Error in get-alternative endpoint:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
});

// Simple gift recommendation function
function generateGiftRecommendation(traits) {
  const gifts = [
    {
      title: "מטחנת קפה חכמה",
      url: "https://www.amazon.com/example-coffee-grinder",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e",
      price: 299,
      description: "מטחנת קפה חכמה עם הגדרות מתקדמות, מושלמת לחובבי קפה",
      greeting: "☕ קפה טעים מתחיל עם טחינה מושלמת! זוהי המתנה שתהפוך כל בוקר שלך לחגיגה של ארומה ובריאות. שתזכו לבוקרים מלאי אנרגיה ומומנטים מתוקים! ☕✨"
    },
    {
      title: "אוזניות אלחוטיות premium",
      url: "https://www.amazon.com/example-headphones",
      image: "https://images.unsplash.com/photo-1484704849700-f032a568e944",
      price: 249,
      description: "אוזניות אלחוטיות עם ביטול רעשים, איכות סאונד מעולה",
      greeting: "🎵 הצליל המושלם מחכה לך! המוזיקה שלך תישמע כמו שלא שמעת אותה מעולם. שתהנה מכל צליל, כל פרט ולכל רגש שהמוזיקה מעביר. תן לעצמך לטוס על כנפי הצלילים! 🎧💫"
    },
    {
      title: "סט כלי בישול מקצועי",
      url: "https://www.amazon.com/example-cooking-set",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136",
      price: 189,
      description: "סט כלי בישול איכותי למטבח, עשוי נירוסטה",
      greeting: "👨‍🍳 המטבח שלך יהפוך לארמון הקולינרי! עם הכלים האלה, כל מנה שתכין תהיה יצירת אמנות. שתזכה לארוחות מפנקות ורגעים מתוקים סביב השולחן עם יקיריך! 🍽️❤️"
    },
    {
      title: "שעון חכם",
      url: "https://www.amazon.com/example-smartwatch",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      price: 199,
      description: "שעון חכם עם מעקב בריאות ותכונות מתקדמות",
      greeting: "⌚ הזמן שלך הוא היום! השעון הזה יהיה השותף שלך למסע לעבר בריאות מושלמת ויום יותר מאורגן. שתזכה לחיים בריאים, פעילים ומלאי הישגים! 💪🌟"
    },
    {
      title: "רובוט שואב",
      url: "https://www.amazon.com/example-robot-vacuum",
      image: "https://images.unsplash.com/photo-1558618666-fbd25c85cd64",
      price: 349,
      description: "רובוט שואב חכם למיפוי אוטומטי של הבית",
      greeting: "🤖 פינוי הזמן לדברים החשובים באמת! בעוד הרובוט יטפל בנקיון, אתה תוכל ליהנות מהחיים. שתזכה לבית נקי ולזמן איכות עם המשפחה והתחביבים שאתה הכי אוהב! 🏠✨"
    }
  ];

  // Simple logic to select gift based on traits
  let selectedGift = gifts[0]; // default

  if (traits.hobby && traits.hobby.includes('בישול')) {
    selectedGift = gifts[2]; // cooking set
  } else if (traits.gadget_preference && traits.gadget_preference.includes('אוזניות')) {
    selectedGift = gifts[1]; // headphones
  } else if (traits.gadget_preference && traits.gadget_preference.includes('שעון')) {
    selectedGift = gifts[3]; // smartwatch
  } else if (traits.daily_need && traits.daily_need.includes('רובוט')) {
    selectedGift = gifts[4]; // robot vacuum
  }

  // Generate order number
  const orderNumber = 'AG-' + Math.random().toString(36).substr(2, 9).toUpperCase();

  // Common replacement reasons
  const replacementReasons = [
    'המחיר גבוה מדי',
    'לא מתאים לטעם שלי',
    'רוצה משהו יותר מעשי',
    'רוצה משהו יותר מיוחד',
    'לא מתאים לגיל'
  ];

  return {
    gift: selectedGift,
    orderNumber: orderNumber,
    replacementReasons: replacementReasons
  };
}

// Function to generate alternative gift based on replacement reason
function generateAlternativeGift(reason, originalOrderNumber) {
  const alternativeGifts = {
    'המחיר גבוה מדי': [
      {
        title: "מטחנת קפה ידנית",
        url: "https://www.amazon.com/example-manual-grinder",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
        price: 89,
        description: "מטחנת קפה ידנית איכותית במחיר נוח",
        greeting: "☕ קפה מעולה לא חייב לעלות הון! עם המטחנה הידנית הזו תיהנה מקפה טעים ומושלם בכל בוקר, בדיוק כמו שמגיע לך. שתזכה לבוקרים ערים ומלאי אנרגיה! ☕💚"
      },
      {
        title: "אוזניות קוויות איכותיות",
        url: "https://www.amazon.com/example-wired-headphones",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        price: 79,
        description: "אוזניות קוויות עם איכות סאונד מעולה",
        greeting: "🎵 המוזיקה הטובה ביותר זמינה תמיד! האוזניות האלה יעניקו לך חוויית שמע מדהימה בכל מקום ובכל זמן. שתזכה לצלילים צלולים ולרגעים מושלמים! 🎧🎶"
      }
    ],
    'לא מתאים לטעם שלי': [
      {
        title: "רמקול נייד אלחוטי",
        url: "https://www.amazon.com/example-speaker",
        image: "https://images.unsplash.com/photo-1558618666-fbd25c85cd64",
        price: 159,
        description: "רמקול נייד עם סאונד איכותי ועיצוב מודרני",
        greeting: "🎶 המוזיקה שלך תתפשט בכל החלל! הרמקול הנייד הזה יהפוך כל מקום למועדון אישי שלך. שתזכה למסיבות נהדרות וקווי צליל מדהימים! 🔊✨"
      },
      {
        title: "מנורת LED חכמה",
        url: "https://www.amazon.com/example-smart-lamp",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
        price: 129,
        description: "מנורה חכמה עם שליטה באפליקציה וצבעים שונים",
        greeting: "💡 האור הנכון יכול לשנות הכל! המנורה החכמה הזו תיצור את האווירה המושלמת לכל רגע ביום. שתזכה לאור מותאם ולאווירה מדהימה! 🌈💫"
      }
    ],
    'רוצה משהו יותר מעשי': [
      {
        title: "מארגן שולחן עבודה",
        url: "https://www.amazon.com/example-desk-organizer",
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07",
        price: 45,
        description: "מארגן שולחן עבודה עם תאים לכל הציוד",
        greeting: "📋 סדר = יעילות = הצלחה! המארגן הזה יהפוך את שולחן העבודה שלך למכונת פרודוקטיביות. שתזכה לימי עבודה מאורגנים ולהישגים מרשימים! 💼⚡"
      },
      {
        title: "תיק גב למחשב נייד",
        url: "https://www.amazon.com/example-laptop-bag",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
        price: 89,
        description: "תיק גב איכותי למחשב נייד עם כיסים נוספים",
        greeting: "💻 הניידות שלך זה הכוח שלך! התיק הזה ישמור על הטכנולוgiה שלך ויאפשר לך לעבוד מכל מקום בנוחות. שתזכה לחופש עבודה ולגמישות מלאה! 🚀💪"
      }
    ],
    'רוצה משהו יותר מיוחד': [
      {
        title: "שעון חכם פרימיום",
        url: "https://www.amazon.com/example-premium-watch",
        image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d",
        price: 399,
        description: "שעון חכם מתקדם עם תכונות בריאות ופעילות",
        greeting: "⌚ הטכנולוגיה הכי מתקדמת על היד שלך! השעון הפרימיום הזה יהיה המאמן האישי שלך ללייף-סטייל בריא ומצליח. שתזכה לבריאות מושלמת ולהישגים יוצאי דופן! 🏆💎"
      },
      {
        title: "מצלמת פעולה 4K",
        url: "https://www.amazon.com/example-action-camera",
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd",
        price: 299,
        description: "מצלמת פעולה באיכות 4K לתיעוד רגעים מיוחדים",
        greeting: "📹 כל רגע של החיים שלך ראוי לתיעוד! המצלמה הזו תקפיד שכל הרפתקה, כל חיוך ורגע מיוחד יישמרו לנצח באיכות מושלמת. שתזכה להרפתקאות נהדרות ולזיכרונות לכל החיים! 🌟📸"
      }
    ],
    'לא מתאים לגיל': [
      {
        title: "פאזל 1000 חלקים",
        url: "https://www.amazon.com/example-puzzle",
        image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5",
        price: 25,
        description: "פאזל יפה ומאתגר ל-1000 חלקים",
        greeting: "🧩 כל חלק מוביל לתמונה השלמה! הפאזל הזה יעניק לך שעות של הנאה, רוגע והרגשת הישג אמיתית. שתזכה לרגעי שקט ולסיפוק עמוק! 🌅🧘‍♀️"
      },
      {
        title: "ספר בישול למתחילים",
        url: "https://www.amazon.com/example-cookbook",
        image: "https://images.unsplash.com/photo-1481671703460-040cb8a2d909",
        price: 35,
        description: "ספר בישול מקיף עם מתכונים קלים וטעימים",
        greeting: "👨‍🍳 המסע הקולינרי שלך מתחיל כאן! הספר הזה יפתח לך עולם שלם של טעמים וארומות שיהפכו את המטבח שלך לגן עדן. שתזכה למנות מדהימות ולקומפלימנטים אין סוף! 🍽️❤️"
      }
    ]
  };

  // Get alternatives for the specific reason, or use default alternatives
  const availableAlternatives = alternativeGifts[reason] || alternativeGifts['לא מתאים לטעם שלי'];
  
  // Select random alternative
  const selectedAlternative = availableAlternatives[Math.floor(Math.random() * availableAlternatives.length)];

  // Generate new order number
  const newOrderNumber = 'AG-' + Math.random().toString(36).substr(2, 9).toUpperCase();

  // Different replacement reasons for the alternative
  const newReplacementReasons = [
    'רוצה אפשרות אחרת',
    'לא מתאים לצרכים שלי', 
    'המחיר לא הולם',
    'אני מחפש משהו אחר'
  ];

  return {
    gift: selectedAlternative,
    orderNumber: newOrderNumber,
    replacementReasons: newReplacementReasons
  };
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: error.message
  });
});

app.listen(PORT, () => {
  console.log(`🎁 Gift Finder Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/gifts/get-gift`);
  console.log(`🔄 Alternative endpoint: http://localhost:${PORT}/api/gifts/get-alternative`);
}); 