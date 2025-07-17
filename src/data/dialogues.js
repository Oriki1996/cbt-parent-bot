// ספריית דיאלוגים מובנים לבוט CBT להורי מתבגרים
// מבוסס על הדיאלוגים במסמך "לוגיקה.docx"

export const structuredDialogues = {
  'listening_challenge': {
    title: 'הילד/ה לא מקשיב/ה לי',
    description: 'התמודדות עם מצבים בהם המתבגר/ת לא מקשיב/ה או מתעלם/ת',
    triggerKeywords: ['לא מקשיב', 'לא שומע', 'מתעלם', 'לא מגיב', 'הקשבה'],
    dialogueSteps: [
      {
        botMessage: function(childName) {
          return `אני מבין/ה שאת/ה חווה קושי כש${childName} לא מקשיב/ה. זה יכול להיות מאוד מתסכל. האם תוכל לספר לי מתי זה קורה בדרך כלל?`;
        },
        inputType: 'rubric',
        rubricOptions: [
          { text: 'כשאני מבקש/ת משהו', value: 'request' },
          { text: 'כשאני מנסה לדבר איתו/ה', value: 'conversation' },
          { text: 'בזמן מסכים (טלפון/מחשב)', value: 'screen_time' },
          { text: 'תמיד', value: 'always' },
          { text: 'אחר (אפרט)', value: 'other' }
        ],
        nextStepLogic: {
          'request': { nextStep: 1 },
          'conversation': { nextStep: 2 },
          'screen_time': { nextStep: 3 },
          'always': { nextStep: 4 },
          'other': { nextStep: 'llm_fallback' }
        }
      },
      {
        botMessage: function(childName) {
          return `כשאת/ה מבקש/ת משהו מ${childName} והוא/היא לא מגיב/ה, מה בדרך כלל המחשבה הראשונה שעוברת לך בראש?`;
        },
        inputType: 'text',
        nextStepLogic: { 'default': { nextStep: 5 } }
      },
      {
        botMessage: function(childName) {
          return `כשאת/ה מנסה לדבר עם ${childName} והוא/היא לא מקשיב/ה, איך זה מרגיש לך?`;
        },
        inputType: 'rubric',
        rubricOptions: [
          { text: 'מתוסכל/ת ולא מובן/ת', value: 'frustrated' },
          { text: 'כועס/ת ופגוע/ה', value: 'angry' },
          { text: 'דאוג/ה למערכת היחסים', value: 'worried' },
          { text: 'חסר/ת אונים', value: 'helpless' }
        ],
        nextStepLogic: {
          'frustrated': { nextStep: 6 },
          'angry': { nextStep: 7 },
          'worried': { nextStep: 8 },
          'helpless': { nextStep: 9 }
        }
      },
      {
        botMessage: function(childName) {
          return `שימוש במסכים יכול להפוך מתבגרים לפחות קשובים לסביבה. בואו נחשוב על כמה אסטרטגיות למצב הזה. איזו מהאפשרויות הבאות נראית לך הכי מעשית?`;
        },
        inputType: 'rubric',
        rubricOptions: [
          { text: 'לגשת ולגעת בכתף לפני שאני מדבר/ת', value: 'physical_attention' },
          { text: 'לבקש שיפסיק/תפסיק עם המסך לפני השיחה', value: 'screen_pause' },
          { text: 'לחכות לזמן שהוא/היא לא במסך', value: 'wait_for_time' },
          { text: 'לדבר רק על דברים חשובים כשיש מסכים', value: 'important_only' }
        ],
        nextStepLogic: {
          'physical_attention': { nextStep: 10 },
          'screen_pause': { nextStep: 11 },
          'wait_for_time': { nextStep: 12 },
          'important_only': { nextStep: 13 }
        }
      },
      {
        botMessage: function(childName) {
          return `כש${childName} "תמיד" לא מקשיב/ה, יש לי שאלה חשובה: האם באמת תמיד? האם אין אפילו רגע אחד ביום שהוא/היא מקשיב/ה או מגיב/ה?`;
        },
        inputType: 'text',
        nextStepLogic: { 'default': { nextStep: 14 } }
      },
      {
        botMessage: function() {
          return `אני מבין/ה את התסכול שלך. המחשבה הזו שעברה בראשך היא מה שאנחנו קוראים לה "מחשבה אוטומטית". בואו נבחן יחד - איזה מהמשפטים הבאים מתאר הכי טוב את המחשבה הזו?`;
        },
        inputType: 'rubric',
        rubricOptions: [
          { text: 'הוא/היא עושה זאת בכוונה', value: 'intentional' },
          { text: 'הוא/היא לא מכבד/ת אותי', value: 'disrespect' },
          { text: 'אני נכשל/ת כהורה', value: 'failure' },
          { text: 'הוא/היא אף פעם לא ישתנה', value: 'never_change' }
        ],
        nextStepLogic: {
          'intentional': { nextStep: 15 },
          'disrespect': { nextStep: 16 },
          'failure': { nextStep: 17 },
          'never_change': { nextStep: 18 }
        }
      },
      // המשך הדיאלוג...
      {
        botMessage: function(childName) {
          return `תחושות התסכול והחוסר הבנה הן טבעיות לחלוטין. המטרה שלנו היא לא לחסל אותן, אלא למצוא דרכים יותר יעילות לתקשר. בואו נתחיל עם משהו פשוט - האם תוכל/י לחשוב על דרך שונה לגשת ל${childName} שעוד לא ניסית?`;
        },
        inputType: 'text',
        nextStepLogic: { 'default': { nextStep: 19 } }
      }
    ]
  },
  
  'communication_skills': {
    title: 'שיפור התקשורת עם המתבגר/ת',
    description: 'טכניקות לשיפור התקשורת וההקשבה במערכת היחסים',
    triggerKeywords: ['תקשורת', 'לדבר', 'שיחה', 'הקשבה', 'דיאלוג'],
    dialogueSteps: [
      {
        botMessage: function(childName) {
          return `אני רוצה להציג בפניך טכניקת תקשורת שיכולה לעזור בשיחות עם ${childName}, במיוחד ברגעים של מתח. הטכניקה נקראת 'הקשבה משקפת', והיא יכולה לסייע כשהתקשורת נתקעת. האם זה נשמע שימושי?`;
        },
        inputType: 'rubric',
        rubricOptions: [
          { text: 'כן, אני מעוניין/ת לשמוע', value: 'interested' },
          { text: 'אולי, אבל לא בטוח/ה שזה יעבוד', value: 'skeptical' },
          { text: 'ניסיתי כבר טכניקות דומות בעבר', value: 'tried_before' },
          { text: 'אני מעדיף/ה לדבר על נושא אחר', value: 'change_topic' }
        ],
        nextStepLogic: {
          'interested': { nextStep: 1 },
          'skeptical': { nextStep: 2 },
          'tried_before': { nextStep: 3 },
          'change_topic': { nextStep: 'llm_fallback' }
        }
      },
      {
        botMessage: function() {
          return `מעולה! הקשבה משקפת כוללת שלושה שלבים פשוטים:

1. **הקשבה אמיתית** - מקשיבים באמת למה שהמתבגר/ת אומר/ת, בלי להתכונן לתשובה
2. **שיקוף** - אומרים בחזרה את מה ששמענו, במילים שלנו
3. **בדיקה** - בודקים אם הבנו נכון

למשל, אם המתבגר/ת אומר/ת: "אתה אף פעם לא סומך עליי!", במקום להתגונן, אפשר להגיד: "נשמע שאתה מרגיש שאני לא נותן/ת בך מספיק אמון. האם הבנתי נכון?"

האם תרצה/י לתרגל את זה יחד?`;
        },
        inputType: 'rubric',
        rubricOptions: [
          { text: 'כן, בואו נתרגל', value: 'practice' },
          { text: 'תן/י לי עוד דוגמאות', value: 'more_examples' },
          { text: 'אני לא בטוח/ה איך ליישם את זה', value: 'not_sure' }
        ],
        nextStepLogic: {
          'practice': { nextStep: 4 },
          'more_examples': { nextStep: 5 },
          'not_sure': { nextStep: 6 }
        }
      },
      {
        botMessage: function() {
          return `אני מבין/ה את הספקנות. רבים מההורים שאני עובד/ת איתם מרגישים כך בהתחלה. הקשבה משקפת אינה פתרון קסם, אבל מחקרים מראים שהיא באמת משפרת תקשורת.

הייחוד שלה הוא שהיא מתמקדת קודם בהבנה, לפני ניסיון לפתור או להגיב. כשמתבגרים מרגישים שבאמת מקשיבים להם, הם נפתחים יותר.

האם תהיה/י מוכן/ה לשמוע יותר על איך זה עובד?`;
        },
        inputType: 'rubric',
        rubricOptions: [
          { text: 'בסדר, אני מוכן/ה לשמוע יותר', value: 'proceed' },
          { text: 'עדיין לא משוכנע/ת', value: 'still_skeptical' }
        ],
        nextStepLogic: {
          'proceed': { nextStep: 1 },
          'still_skeptical': { nextStep: 'llm_fallback' }
        }
      }
    ]
  },
  
  'resistance_management': {
    title: 'התמודדות עם התנגדות',
    description: 'טכניקות להתמודדות עם התנגדות מצד המתבגר/ת',
    triggerKeywords: ['מתנגד', 'לא משתף פעולה', 'לא רוצה', 'מסרב', 'מתעקש/ת'],
    dialogueSteps: [
      {
        botMessage: function() {
          return `נראה שאת/ה חווה התנגדות משמעותית מהמתבגר/ת שלך. זה יכול להיות מאוד מתסכל. אני רוצה להבין טוב יותר - איזה סוג של התנגדות אתה נתקל/ת בו?`;
        },
        inputType: 'rubric',
        rubricOptions: [
          { text: 'סירוב מוחלט לשתף פעולה', value: 'complete_refusal' },
          { text: 'ויכוח על כל דבר', value: 'arguing' },
          { text: 'התעלמות פסיבית', value: 'passive_ignoring' },
          { text: 'הסכמה מילולית אך אי-ביצוע בפועל', value: 'verbal_agreement_no_action' },
          { text: 'אחר (אפרט)', value: 'other' }
        ],
        nextStepLogic: {
          'complete_refusal': { nextStep: 1 },
          'arguing': { nextStep: 2 },
          'passive_ignoring': { nextStep: 3 },
          'verbal_agreement_no_action': { nextStep: 4 },
          'other': { nextStep: 'llm_fallback' }
        }
      }
    ]
  }
};

// פונקציה לזיהוי דיאלוג מתאים על פי טקסט הודעה
export function identifyRelevantDialogue(messageText) {
  const normalizedText = messageText.toLowerCase();
  
  for (const dialogueId in structuredDialogues) {
    const dialogue = structuredDialogues[dialogueId];
    if (dialogue.triggerKeywords.some(keyword => normalizedText.includes(keyword))) {
      return {
        id: dialogueId,
        currentStep: 0
      };
    }
  }
  
  return null;
}

// פונקציה לקבלת התגובה הבאה בדיאלוג
export function getNextDialogueResponse(dialogueId, currentStepIndex, userInput, userContext) {
  const dialogue = structuredDialogues[dialogueId];
  if (!dialogue) return null;
  
  const currentStep = dialogue.dialogueSteps[currentStepIndex];
  if (!currentStep) return null;
  
  let nextStepKey = 'default';
  if (currentStep.inputType === 'rubric') {
    nextStepKey = userInput;
  }
  
  const nextAction = currentStep.nextStepLogic[nextStepKey] || currentStep.nextStepLogic['default'];
  
  if (nextAction && nextAction.nextStep === 'llm_fallback') {
    return {
      responseType: 'llm_fallback',
      originalInput: userInput
    };
  }
  
  if (nextAction && typeof nextAction.nextStep === 'number') {
    const nextStep = dialogue.dialogueSteps[nextAction.nextStep];
    if (nextStep) {
      const childName = userContext.childName || 'הילד/ה';
      
      return {
        responseType: 'structured_dialogue',
        message: nextStep.botMessage(childName),
        nextStepIndex: nextAction.nextStep,
        inputType: nextStep.inputType,
        rubricOptions: nextStep.rubricOptions || []
      };
    }
  }
  
  return {
    responseType: 'llm_fallback',
    originalInput: userInput
  };
}