# Google Analytics Setup Guide

## הגדרת Google Analytics לאתר Gift Finder

### שלב 1: יצירת חשבון Google Analytics

1. כנס ל-[Google Analytics](https://analytics.google.com/)
2. לחץ על "התחל" או "Start measuring"
3. צור חשבון חדש או השתמש בחשבון קיים
4. הוסף נכס (Property) חדש לאתר שלך
5. בחר "Web" כפלטפורמה
6. הזן את כתובת האתר: `https://gift-finder.vercel.app`
7. העתק את ה-Measurement ID (מתחיל ב-G-)

### שלב 2: הגדרת משתני הסביבה

1. צור קובץ `.env.local` בתיקיית הפרויקט
2. הוסף את השורה הבאה:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```
3. החלף את `G-XXXXXXXXXX` ב-Measurement ID האמיתי שלך

### שלב 3: פריסה ל-Vercel

1. בפאנל הניהול של Vercel, כנס להגדרות הפרויקט
2. לחץ על "Environment Variables"
3. הוסף משתנה חדש:
   - **Name**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value**: ה-Measurement ID שלך (G-XXXXXXXXXX)
4. פרוס מחדש את האתר

### מה נמדד באתר

האנליטיקס שלנו מודד:

#### אירועי מעורבות:
- **התחלת חידון** (`quiz_start`)
- **תשובות לשאלות** (`quiz_answer`)
- **סיום חידון** (`quiz_complete`)
- **פידבק על ברכות ומתנות** (`feedback_given`)
- **החלפת מתנה** (`gift_replacement`)

#### אירועי המרה:
- **המלצת מתנה** (`gift_recommendation`)
- **שיתוף** (`share`)

#### צפיות בדפים:
- דף בית
- דף חידון
- דף תוצאות

### בדיקת תקינות

לאחר ההגדרה, תוכל לראות נתונים ב-Google Analytics תוך 24-48 שעות.
לבדיקה מיידית, השתמש ב-"Realtime" reports ב-Google Analytics. 