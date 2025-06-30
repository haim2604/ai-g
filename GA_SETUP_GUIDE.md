# מדריך הגדרת Google Analytics - GIFT.P.T

## 🎯 סקירה כללית

מדריך זה יעזור לך להגדיר Google Analytics נכון עבור פרויקט Gift Finder ולזהות בעיות אפשריות.

## 📋 רשימת בדיקות

### ✅ מה שכבר מוגדר בפרויקט:
- [x] רכיב GoogleAnalytics מוכן ופועל
- [x] פונקציות מעקב לכל האירועים
- [x] אינטגרציה עם Next.js
- [x] תמיכה בסביבות פיתוח ופרודקשן

### ❓ מה שצריך לבדוק:
- [ ] Measurement ID נכון ב-Google Analytics
- [ ] משתנה סביבה מוגדר ב-Vercel
- [ ] האתר מאושר ב-Google Analytics
- [ ] נתונים מגיעים ל-Google Analytics

## 🔧 שלבי ההגדרה

### שלב 1: יצירת Google Analytics Property

1. **כנס ל-Google Analytics**
   - לך ל-[analytics.google.com](https://analytics.google.com)
   - התחבר עם חשבון Google

2. **צור Account חדש (אם צריך)**
   - לחץ על "Start measuring"
   - בחר שם לחשבון: `Gift Finder`

3. **צור Property**
   - שם Property: `Gift Finder - GIFT.P.T`
   - אזור זמן: `Israel`
   - מטבע: `Israeli Shekel (ILS)`

4. **הגדר Data Stream**
   - בחר "Web"
   - URL: `https://gift-pt.com`
   - שם Stream: `Gift Finder Website`

5. **העתק את ה-Measurement ID**
   - יהיה בפורמט: `G-XXXXXXXXXX`
   - שמור אותו - תצטרך אותו בשלב הבא

### שלב 2: הגדרת משתני סביבה

#### לפיתוח מקומי:
```bash
# צור קובץ .env.local בתיקיית הפרויקט
echo "NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR-MEASUREMENT-ID" > .env.local
```

#### לפרודקשן ב-Vercel:
1. כנס לפאנל Vercel
2. בחר את הפרויקט `gift-finder`
3. לך ל-Settings → Environment Variables
4. הוסף משתנה חדש:
   - **Name**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value**: `G-YOUR-MEASUREMENT-ID`
   - **Environment**: בחר את כל הסביבות (Production, Preview, Development)
5. לחץ Save
6. פרוס מחדש את האתר (Redeploy)

### שלב 3: אימות ההגדרה

#### בדיקה מקומית:
```bash
# הרץ את הפרויקט מקומית
npm run dev

# בדוק בקונסולת הדפדפן:
# צריך לראות הודעות מ-GoogleAnalytics component
```

#### בדיקה בפרודקשן:
1. לך לאתר: `https://gift-pt.com`
2. פתח Developer Tools (F12)
3. בדוק בקונסול הודעות של GA
4. בדוק ב-Network tab בקשות ל-`googletagmanager.com`

### שלב 4: בדיקה ב-Google Analytics

1. **Realtime Reports**
   - לך ל-Google Analytics
   - בחר Reports → Realtime
   - גלוש באתר ובדוק שאתה רואה פעילות

2. **אירועים**
   - לך ל-Events בתוך Realtime
   - צריך לראות:
     - `page_view`
     - `quiz_start` (כשמתחילים חידון)
     - `quiz_complete` (כשמסיימים חידון)
     - `gift_recommendation` (כשמקבלים המלצה)

## 🛠️ כלי בדיקה

יצרתי עבורך 3 סקריפטי בדיקה:

### 1. בדיקה מקיפה
```bash
# פתח את הקובץ:
analytics-test-script.html
```
- בדיקת מערכת מלאה
- סימולציית אירועים
- ניטור בזמן אמת
- ניתוח רשת

### 2. בדיקה מהירה
```bash
# פתח את הקובץ:
quick-analytics-test.html
```
- בדיקה מהירה של GA
- שליחת אירועי בדיקה
- אימות חיבור

### 3. בדיקת האתר החי
```bash
# פתח את הקובץ:
site-analytics-checker.html
```
- בדיקה ישירה של האתר
- זיהוי בעיות באתר החי
- ניתוח ביצועים

### 4. בדיקת הגדרות
```bash
# פתח את הקובץ:
env-check-script.html
```
- הוראות הגדרה מפורטות
- בדיקת משתני סביבה
- פתרון בעיות נפוצות

## 🐛 פתרון בעיות נפוצות

### בעיה: "לא רואה נתונים ב-Google Analytics"

**פתרונות אפשריים:**

1. **בדוק Measurement ID**
   ```javascript
   // בקונסולת הדפדפן:
   console.log(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
   ```

2. **בדוק שהמשתנה מוגדר ב-Vercel**
   - Vercel Dashboard → Settings → Environment Variables
   - וודא שהמשתנה קיים ופרוס מחדש

3. **בדוק שהאתר מאושר ב-GA**
   - Google Analytics → Admin → Data Streams
   - וודא שה-URL תואם לאתר

4. **בדוק חוסמי פרסומות**
   - נסה במצב פרטי
   - נטרל חוסמי פרסומות

### בעיה: "סקריפט GA לא נטען"

**פתרונות:**

1. **בדוק רשת**
   ```bash
   # בדוק גישה ל-GA:
   curl -I https://www.googletagmanager.com/gtag/js?id=G-B8TVNSFXJC
   ```

2. **בדוק HTTPS**
   - GA עובד רק על HTTPS
   - וודא שהאתר רץ על HTTPS

3. **בדוק CSP Headers**
   - ייתכן שיש חסימה ב-Content Security Policy

### בעיה: "אירועים לא נשלחים"

**פתרונות:**

1. **בדוק קונסול**
   ```javascript
   // צריך לראות:
   console.log(window.gtag); // function
   console.log(window.dataLayer); // array
   ```

2. **בדוק קוקיז**
   - GA זקוק לקוקיז
   - וודא שקוקיז מופעלים

3. **בדוק טיימינג**
   - וודא שgtag נטען לפני שליחת אירועים

## 📊 מה צריך לראות ב-Google Analytics

### Realtime Reports:
- **Users**: מספר המשתמשים הפעילים
- **Page views**: צפיות בדפים
- **Events**: האירועים שמוגדרים בקוד

### Events שצריכים להופיע:
1. `page_view` - כל כניסה לדף
2. `quiz_start` - התחלת החידון
3. `quiz_answer` - תשובה לשאלה
4. `quiz_complete` - סיום החידון
5. `gift_recommendation` - קבלת המלצה
6. `gift_click` - לחיצה על קישור מתנה
7. `share` - שיתוף ברשתות חברתיות
8. `feedback_given` - מתן פידבק
9. `gift_replacement` - החלפת מתנה

## 🔍 בדיקה שלב אחר שלב

### 1. בדיקה בסיסית
```bash
# הרץ את quick-analytics-test.html
# צריך לראות הכל ירוק
```

### 2. בדיקת האתר
```bash
# הרץ את site-analytics-checker.html
# בדוק שהאתר מזוהה נכון
```

### 3. בדיקה מקיפה
```bash
# הרץ את analytics-test-script.html
# בדוק את כל הרכיבים
```

### 4. בדיקה ב-GA
```bash
# לך ל-Google Analytics → Realtime
# בצע פעולות באתר ובדוק שהן מופיעות
```

## 📞 תמיכה

אם אחרי כל הבדיקות עדיין לא רואה נתונים:

1. **חכה 24-48 שעות** - לפעמים לוקח זמן
2. **בדוק ב-Realtime** - לא ב-Reports הרגילים
3. **נסה מכשירים שונים** - מחשב, נייד, טאבלט
4. **בדוק מדפדפנים שונים** - Chrome, Firefox, Safari

## 🎯 מטרות המעקב

הפרויקט מודד:
- **מעורבות**: כמה אנשים מתחילים ומסיימים את החידון
- **המרות**: כמה אנשים לוחצים על קישורי המתנות
- **שיתוף**: כמה אנשים משתפים את התוצאות
- **פידבק**: מה אנשים חושבים על ההמלצות
- **ביצועים**: כמה זמן לוקח לכל שלב

## ✅ רשימת בדיקות לסיום

- [ ] Measurement ID נוצר ב-Google Analytics
- [ ] משתנה סביבה מוגדר ב-Vercel
- [ ] האתר פרוס מחדש אחרי הגדרת המשתנה
- [ ] כל סקריפטי הבדיקה עוברים בהצלחה
- [ ] רואה פעילות ב-Google Analytics Realtime
- [ ] כל האירועים מופיעים כשמבצעים פעולות באתר

---

**💡 טיפ:** השתמש בסקריפטי הבדיקה שיצרתי כדי לזהות בדיוק איפה הבעיה ולפתור אותה צעד אחר צעד. 