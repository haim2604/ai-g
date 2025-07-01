# מדריך Google Analytics - GIFT.P.T

## 🔧 תיקונים שבוצעו

### בעיות שזוהו:
1. **Tag stopped sending data** - התג הפסיק לשלוח מידע
2. **Some pages are not tagged** - חלק מהדפים לא מתויגים
3. חסר קובץ environment variables

### תיקונים שיושמו:

#### 1. הוספת Environment Variables
```javascript
// next.config.js
env: {
  NEXT_PUBLIC_GA_MEASUREMENT_ID: 'G-DHGJR3N05E',
}
```

#### 2. שיפור Google Analytics Component
- ✅ הוספת בדיקות מפורטות
- ✅ שיפור error handling
- ✅ הוספת enhanced configuration
- ✅ בדיקות קישוריות מתקדמות

#### 3. הוספת Tracking לכל הדפים
- ✅ דף הבית - tracking של page views ו-CTA clicks
- ✅ דף השאלון - tracking של התחלה, השלמה ואירועים
- ✅ דף התוצאות - tracking של המלצות ופידבק

## 📊 איך לבדוק שGoogle Analytics עובד

### 1. בדיקה מיידית בדפדפן
1. פתח את הפרויקט: `http://localhost:3000`
2. פתח Developer Tools (F12)
3. עבור לטאב Console
4. חפש הודעות שמתחילות ב-🔍 או 📊

### 2. דף בדיקה מיוחד
פתח את הקובץ: `analytics-verification.html`
- בדיקות אוטומטיות
- קונסולה חזותית
- מידע על מצב ההתחברות

### 3. Google Analytics Dashboard
- כנס ל-[Google Analytics](https://analytics.google.com)
- בחר את הנכס שלך (G-DHGJR3N05E)
- עבור ל-"Real-time" ו"DebugView"

## 🎯 Events שמתועדים

### דף הבית
```javascript
trackEvent('page_view', {
  page_title: 'Home Page',
  page_location: '/'
});

trackEvent('start_quiz_click', {
  event_category: 'engagement',
  event_label: 'home_page_cta'
});
```

### שאלון
```javascript
trackQuizStart(); // התחלת שאלון
trackQuizComplete(questionsAnswered); // השלמת שאלון
trackEvent('quiz_question_answered', {...}); // תשובה לשאלה
```

### תוצאות
```javascript
trackGiftRecommendation(giftType); // המלצת מתנה
trackFeedback(rating, section); // פידבק
trackEvent('gift_replacement_requested', {...}); // החלפת מתנה
trackEvent('social_share', {...}); // שיתוף ברשתות
```

## 🔍 אבחון בעיות

### הודעות שכדאי לחפש בקונסולה:
- ✅ `Google Analytics script loaded successfully`
- ✅ `gtag initialized with config: G-DHGJR3N05E`
- ✅ `Test event sent`

### הודעות שמעידות על בעיה:
- ❌ `Google Analytics script failed to load`
- ❌ `Invalid Google Analytics Measurement ID`
- ❌ `gtag not available for event`

## 📋 רשימת בדיקות

### ✅ בדיקות שהושלמו:
- [x] הגדרת environment variables
- [x] שיפור Google Analytics component
- [x] הוספת enhanced tracking
- [x] יצירת דף בדיקה
- [x] tracking בכל הדפים הראשיים
- [x] error handling משופר

### 🔄 בדיקות לביצוע:
1. **Real-time testing**: כנס לאתר ובדוק ב-Google Analytics Real-time
2. **DebugView**: בדוק שהאירועים מגיעים ל-DebugView
3. **Cross-browser**: בדוק בדפדפנים שונים
4. **Mobile**: בדוק במכשירים ניידים

## 📞 תמיכה נוספת

אם עדיין יש בעיות:

1. **בדוק בדף הבדיקה**: `analytics-verification.html`
2. **חפש בקונסולה**: הודעות עם 🔍 📊 🎯
3. **וודא שהשרת רץ**: `npm run dev`
4. **בדוק ב-Network tab**: שה-gtag script נטען

## 🎭 Debug Mode
להפעלת מצב debug מתקדם, הוסף לקונסולה:
```javascript
gtag('config', 'G-DHGJR3N05E', {
  debug_mode: true
});
```

---

**נקודות חשובות:**
- השינויים ייכנסו לתוקף תוך מספר דקות
- Google Analytics לוקח זמן לעדכן נתונים
- Real-time tracking צריך להראות תוצאות מיידיות
- DebugView מראה אירועים בזמן אמת 