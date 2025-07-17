# מדריך התקנה פשוט - CBT Bot להורים

## שלב 1: הורדה והתקנה של תוכנות נדרשות

### הורד את Node.js
1. עבור לאתר: https://nodejs.org/
2. הורד את הגרסה המומלצת (LTS)
3. הרץ את הקובץ שהורדת והתקן (פשוט לחץ "הבא" על הכל)

### הורד עורך טקסט (לא חובה אבל מומלץ)
1. עבור לאתר: https://code.visualstudio.com/
2. הורד את Visual Studio Code
3. התקן אותו

## שלב 2: יצירת התיקייה והקבצים

### יצור תיקייה חדשה
1. פתח את סייר הקבצים (File Explorer)
2. בחר מקום נוח (למשל שולחן העבודה)
3. לחץ ימין → "תיקייה חדשה"
4. קרא לתיקייה: `cbt-parent-bot`

### יצור תיקיות משנה
בתוך התיקייה `cbt-parent-bot`, צור את התיקיות הבאות:
```
cbt-parent-bot/
├── public/
├── src/
│   ├── components/
│   └── data/
```

**איך ליצור תיקיות:**
1. היכנס לתיקיית `cbt-parent-bot`
2. לחץ ימין → "תיקייה חדשה"
3. כתוב את השם (public, src, וכו')
4. חזור על זה לכל תיקייה

## שלב 3: יצירת הקבצים

### בתיקייה הראשית `cbt-parent-bot`:
צור קבצים חדשים:
1. `package.json`
2. `.gitignore`
3. `README.md`
4. `SETUP-GUIDE.md`

### בתיקיית `public`:
צור קובץ:
1. `index.html`

### בתיקיית `src`:
צור קבצים:
1. `App.js`
2. `App.css`
3. `index.js`

### בתיקיית `src/components`:
צור קבצים:
1. `Chat.js`
2. `Profile.js`
3. `Articles.js`
4. `Exercises.js`

### בתיקיית `src/data`:
צור קבצים:
1. `dialogues.js`
2. `exercises.js`
3. `articles.js`
4. `reflection.js`

## שלב 4: העתקת התוכן לקבצים

### איך להעתיק תוכן לקובץ:
1. לחץ כפול על הקובץ (יפתח בחלון הטקסט)
2. העתק את התוכן המתאים מהחלון של Claude
3. הדבק בקובץ (Ctrl+V)
4. שמור (Ctrl+S)

### רשימת הקבצים והתוכן:
1. **package.json** - העתק תוכן מהקובץ הראשון שיצרתי
2. **public/index.html** - העתק תוכן מהקובץ השני
3. **src/data/dialogues.js** - העתק תוכן מהקובץ השלישי
4. **src/data/exercises.js** - העתק תוכן מהקובץ הרביעי
5. **src/App.js** - העתק תוכן מהקובץ החמישי
6. **src/index.js** - העתק תוכן מהקובץ השישי
7. **src/App.css** - העתק תוכן מהקובץ השביעי
8. **src/components/Chat.js** - העתק תוכן מהקובץ השמיני
9. **src/components/Profile.js** - העתק תוכן מהקובץ התשיעי
10. **src/components/Exercises.js** - העתק תוכן מהקובץ העשירי
11. **src/components/Articles.js** - העתק תוכן מהקובץ האחד עשר
12. **src/data/articles.js** - העתק תוכן מהקובץ השנים עשר
13. **src/data/reflection.js** - העתק תוכן מהקובץ השלושה עשר
14. **.gitignore** - העתק תוכן מהקובץ הארבעה עשר
15. **README.md** - העתק תוכן מהקובץ החמישה עשר

## שלב 5: הרצת הפרויקט

### פתח Command Prompt (שורת פקודה):
1. לחץ על מקש Windows
2. כתוב: `cmd`
3. לחץ Enter

### נווט לתיקיית הפרויקט:
```bash
cd Desktop\cbt-parent-bot
```
(אם שמת את התיקייה במקום אחר, שנה את הנתיב)

### התקן את ה-dependencies:
```bash
npm install
```
(זה יקח כמה דקות - זה נורמלי)

### הרץ את הפרויקט:
```bash
npm start
```

### פתח בדפדפן:
הפרויקט יפתח אוטומטית בדפדפן בכתובת:
```
http://localhost:3000
```

## שלב 6: העלאה לגיטהאב (אופציונלי)

### צור חשבון בגיטהאב:
1. עבור לאתר: https://github.com/
2. הירשם לחשבון חדש
3. צור repository חדש בשם `cbt-parent-bot`

### התקן Git:
1. עבור לאתר: https://git-scm.com/
2. הורד והתקן Git

### העלה את הפרויקט:
בשורת הפקודה, בתיקיית הפרויקט:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/cbt-parent-bot.git
git push -u origin main
```

## שלב 7: הרצה על Render (אופציונלי)

### צור חשבון ב-Render:
1. עבור לאתר: https://render.com/
2. הירשם (אפשר עם חשבון הגיטהאב)

### צור Static Site:
1. בחר "New" → "Static Site"
2. חבר את הרפוזיטורי מגיטהאב
3. הגדר:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `build`
4. לחץ "Create Static Site"

### האתר יהיה זמין בכתובת שRender יספק לך!

## פתרון בעיות נפוצות

### הפרויקט לא מתחיל:
1. וודא שהתקנת Node.js נכון
2. נסה לרוץ: `npm cache clean --force`
3. מחק את תיקיית `node_modules` ורוץ `npm install` שוב

### קבצים לא נמצאים:
1. וודא שהקבצים נמצאים בתיקיות הנכונות
2. בדוק שאין שגיאות כתיב בשמות הקבצים
3. וודא שהתוכן הועתק במלואו

### שגיאות בדפדפן:
1. פתח Developer Tools (F12)
2. בדוק את הקונסולה לשגיאות
3. רענן את הדף

## צור קשר
אם נתקלת בבעיות, אל תהסס לפנות לעזרה!

---

**בהצלחה! המערכת מוכנה לשימוש! 🎉**