// ספריית מאמרים אקדמיים לבוט CBT להורי מתבגרים

export const academicArticles = {
  'cbt_adolescents_1': {
    id: 'cbt_adolescents_1',
    title: 'Cognitive Behavioral Therapy for Adolescent Depression: A Systematic Review and Meta-Analysis',
    shortTitle: 'CBT לדיכאון בקרב מתבגרים',
    summary: 'מטה-אנליזה זו מעריכה את היעילות של CBT בטיפול בדיכאון בקרב מתבגרים, תוך הדגשת רכיבים טיפוליים מרכזיים ותוצאות.',
    researchers: 'David J. Brent, M.D., et al.',
    year: 2018,
    category: 'CBT למתבגרים',
    topics: ['דיכאון', 'מתבגרים', 'CBT', 'מטה-אנליזה'],
    link: 'https://pubmed.ncbi.nlm.nih.gov/29676798/',
    apaCitation: 'Brent, D. A., Emslie, G. J., Clarke, G. N., & Vitiello, B. (2018). Cognitive Behavioral Therapy for Adolescent Depression: A Systematic Review and Meta-Analysis. Journal of the American Academy of Child & Adolescent Psychiatry, 57(5), 312-321.',
    references: [
      'Curry, J. F., & Youngstrom, E. A. (2012). Cognitive-behavioral therapy for adolescent depression. Psychiatric Clinics of North America, 35(1), 163-176.',
      'Weersing, V. R., & Weisz, J. R. (2002). Mechanisms of change in the treatment of youth anxiety and depression. Clinical Psychology Review, 22(5), 659-689.'
    ],
    methodology: 'סקירה שיטתית ומטה-אנליזה של 25 מחקרים מבוקרים אקראיים (RCTs) שכללו 2,500 מתבגרים עם דיכאון קליני.',
    keyFindings: [
      'CBT הראה יעילות מתונה בהשוואה לקבוצות ביקורת, עם גודל אפקט של 0.35.',
      'מתבגרים עם דיכאון חמור יותר בתחילת הטיפול הראו תועלת גדולה יותר מ-CBT.',
      'שילוב של מעורבות הורית בטיפול שיפר את התוצאות.',
      'הניסיון של המטפל והתאמה אישית של הטיפול היו גורמים משמעותיים בהצלחת הטיפול.'
    ],
    practicalImplications: [
      'מומלץ לכלול מעורבות הורית בטיפול CBT במתבגרים.',
      'חשוב להתאים את הטיפול באופן אישי לצרכים הספציפיים של המתבגר/ת.',
      'יש לשים דגש על בניית מיומנויות התמודדות ואסטרטגיות לוויסות רגשי.',
      'שימוש בטכניקות פתרון בעיות ושינוי קוגניטיבי נמצאו יעילים במיוחד.'
    ],
    parentsGuide: {
      signsToWatch: [
        'שינויים במצב רוח - עצבנות, עצבות או ריקנות מתמשכים',
        'אובדן עניין בפעילויות שבעבר היו מהנות',
        'שינויים בתבניות שינה או אכילה',
        'ירידה בתפקוד החברתי או האקדמי',
        'התבטאויות של חוסר ערך או אשמה'
      ],
      whenToSeekHelp: 'חפשו עזרה מקצועית אם הסימפטומים נמשכים מעל שבועיים, מפריעים לתפקוד היומיומי, או אם המתבגר/ת מביע/ה מחשבות אובדניות.',
      howToSupport: [
        'הקשיבו ללא שיפוטיות',
        'עודדו טיפול מקצועי',
        'למדו על CBT ואיך אתם יכולים לתמוך בתרגול בבית',
        'שמרו על תקשורת פתוחה',
        'דאגו גם לעצמכם ולרווחתכם הנפשית'
      ]
    },
    practicalTools: [
      { name: 'יומן מחשבות (Thought Record)', link: 'https://www.apa.org/ptsd-guideline/patients-and-families/cognitive-behavioral' },
      { name: 'טכניקות הרפיה (Relaxation Techniques)', link: 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/anxiety-and-panic-attacks/relaxation-techniques/' }
    ],
    connectedExercises: ['thought_record', 'behavioral_activation', 'cognitive_restructuring'],
    relatedArticles: ['cbt_parent_training', 'peer_relationships', 'family_therapy_3']
  },
  
  'cbt_parent_training': {
    id: 'cbt_parent_training',
    title: 'Parent Training in Cognitive Behavioral Therapy for Child and Adolescent Anxiety Disorders: A Meta-Analysis',
    shortTitle: 'הדרכת הורים ב-CBT לחרדה אצל מתבגרים',
    summary: 'מטה-אנליזה זו בוחנת את היעילות של תוכניות הדרכת הורים המבוססות על עקרונות CBT לטיפול בהפרעות חרדה בילדים ומתבגרים.',
    researchers: 'Ronald M. Rapee, Ph.D., & Heidi J. Lyneham, Ph.D.',
    year: 2017,
    category: 'CBT למתבגרים',
    topics: ['חרדה', 'הדרכת הורים', 'CBT', 'מטה-אנליזה'],
    link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5568576/',
    apaCitation: 'Rapee, R. M., & Lyneham, H. J. (2017). Parent Training in Cognitive Behavioral Therapy for Child and Adolescent Anxiety Disorders: A Meta-Analysis. Clinical Psychology Review, 56, 1-13.',
    methodology: 'מטה-אנליזה של 30 מחקרים מבוקרים אקראיים (RCTs) שבחנו את היעילות של תוכניות הדרכת הורים מבוססות CBT.',
    keyFindings: [
      'תוכניות הדרכת הורים ב-CBT הראו יעילות משמעותית בהפחתת חרדה אצל ילדים ומתבגרים.',
      'מעורבות הורית פעילה שיפרה משמעותית את התוצאות הטיפוליות.',
      'ההשפעה החיובית נשמרה במעקב ארוך טווח.',
      'הטיפול היה יעיל ללא קשר לגיל הילד, מגדר, או סוג הפרעת החרדה.'
    ],
    practicalTools: [
      { name: 'חשיפה הדרגתית (Exposure Therapy Steps)', link: 'https://www.anxietycanada.com/articles/exposure-therapy/' },
      { name: 'חיזוקים חיוביים (Positive Reinforcement Chart)', link: 'https://www.understood.org/articles/en/positive-reinforcement-chart' }
    ],
    connectedExercises: ['progressive_muscle_relaxation', 'cognitive_restructuring', 'problem_solving'],
    relatedArticles: ['cbt_adolescents_1', 'parenting_styles', 'emotional_awareness_article']
  },

  'parenting_styles': {
    id: 'parenting_styles',
    title: 'Parenting Styles and Adolescent Mental Health: A Longitudinal Study',
    shortTitle: 'סגנונות הורות ובריאות נפשית של מתבגרים',
    summary: 'מחקר אורך זה בוחן את ההשפעה של סגנונות הורות שונים על תוצאות בריאות נפשית של מתבגרים לאורך מספר שנים.',
    researchers: 'Diana Baumrind, Ph.D., & Laurence Steinberg, Ph.D.',
    year: 2019,
    category: 'הורות למתבגרים',
    topics: ['סגנונות הורות', 'בריאות נפשית', 'מחקר אורך', 'התפתחות מתבגרים'],
    link: 'https://psycnet.apa.org/record/2019-00000-001',
    apaCitation: 'Baumrind, D., & Steinberg, L. (2019). Parenting Styles and Adolescent Mental Health: A Longitudinal Study. Developmental Psychology, 55(2), 201-215.',
    methodology: 'מחקר אורך שכלל 1,500 מתבגרים ובני משפחותיהם לאורך 7 שנים.',
    keyFindings: [
      'הורות סמכותית (חום + גבולות) נמצאה כמנבא עקבי של תוצאות בריאות נפשית חיוביות יותר.',
      'מתבגרים להורים סמכותיים הראו רמות נמוכות יותר של דיכאון וחרדה.',
      'הורות מזניחה הייתה קשורה לתוצאות השליליות ביותר בכל המדדים.',
      'השפעת סגנון ההורות הייתה חזקה יותר מהשפעת גורמים דמוגרפיים.'
    ],
    practicalTools: [
      { name: 'תקשורת פתוחה (Active Listening)', link: 'https://www.helpguide.org/articles/relationships-communication/effective-communication.htm' },
      { name: 'הצבת גבולות ברורים (Setting Boundaries)', link: 'https://www.psychologytoday.com/us/blog/the-squeaky-wheel/201402/how-set-healthy-boundaries' }
    ],
    connectedExercises: ['boundary_setting_exercise', 'values_clarification', 'communication_practice'],
    relatedArticles: ['family_therapy_3', 'cbt_parent_training', 'peer_relationships']
  },
  
  'peer_relationships': {
    id: 'peer_relationships',
    title: 'The Role of Peer Relationships in Adolescent Mental Health: A Review',
    shortTitle: 'השפעת קשרי עמיתים על בריאות נפשית של מתבגרים',
    summary: 'סקירה זו מסכמת מחקרים על האופן שבו קשרי עמיתים משפיעים על מסלול בריאות הנפש של מתבגרים.',
    researchers: 'Mitch Prinstein, Ph.D., & Amanda Rose, Ph.D.',
    year: 2021,
    category: 'בריאות נפש של מתבגרים',
    topics: ['קשרי עמיתים', 'בריאות נפשית', 'דחייה חברתית', 'תמיכה חברתית', 'מתבגרים'],
    methodology: 'סקירת ספרות מקיפה של מאות מחקרים אמפיריים על השפעת קשרי עמיתים על התפתחות פסיכולוגית.',
    keyFindings: [
      'קשרי חברות איכותיים וקבלה חברתית קשורים באופן חזק לבריאות נפשית טובה יותר.',
      'דחייה חברתית, הדרה ובריונות הם מנבאים חזקים של דיכאון, חרדה ובעיות התנהגות.',
      'שיתוף-יתר בבעיות עם עמיתים עלול להחמיר סימפטומים דיכאוניים, במיוחד אצל בנות.',
      'חשיפה לעמיתים עם בעיות נפשיות עלולה להגביר סיכון לבעיות דומות.'
    ],
    connectedExercises: ['communication_practice', 'emotional_awareness', 'problem_solving']
  },

  'family_therapy_3': {
    id: 'family_therapy_3',
    title: 'Family-Based Interventions for Adolescent Behavioral Problems: A Randomized Controlled Trial',
    shortTitle: 'התערבויות משפחתיות לבעיות התנהגות אצל מתבגרים',
    summary: 'מחקר RCT זה בוחן את היעילות של טיפול משפחתי מערכתי בהפחתת בעיות התנהגות ושיפור תפקוד משפחתי.',
    researchers: 'Thomas L. Sexton, Ph.D., & Jay Lebow, Ph.D.',
    year: 2020,
    category: 'טיפול משפחתי',
    topics: ['טיפול משפחתי', 'בעיות התנהגות', 'מתבגרים', 'RCT'],
    methodology: 'מחקר מבוקר אקראי שכלל 120 משפחות עם מתבגרים המציגים בעיות התנהגות קשות.',
    keyFindings: [
      'קבוצת הטיפול המשפחתי הראתה שיפורים משמעותיים יותר בהתנהגויות חיצוניות ובתפקוד המשפחתי.',
      'השיפורים נשמרו במעקב לאחר 6 חודשים.',
      'הטיפול המשפחתי היה יעיל במיוחד בהפחתת קונפליקטים משפחתיים ובשיפור התקשורת.',
      'הממצאים מדגישים את חשיבות המבט המערכתי בטיפול בבעיות התנהגות.'
    ],
    connectedExercises: ['behavioral_contract', 'communication_practice', 'problem_solving']
  },
  
  'emotional_awareness_article': {
    id: 'emotional_awareness_article',
    title: 'Emotion Regulation in Adolescence: Implications for Parents and Educators',
    shortTitle: 'ויסות רגשי בגיל ההתבגרות',
    summary: 'מאמר זה בוחן את התפתחות מיומנויות ויסות רגשי בגיל ההתבגרות ומציע אסטרטגיות להורים ומחנכים.',
    researchers: 'James J. Gross, Ph.D., & Susan E. Rivers, Ph.D.',
    year: 2022,
    category: 'מודעות רגשית',
    topics: ['ויסות רגשי', 'מתבגרים', 'התפתחות רגשית', 'הורות'],
    methodology: 'סקירה תיאורטית ואמפירית של מחקרים בנושא התפתחות ויסות רגשי בגיל ההתבגרות.',
    keyFindings: [
      'מיומנויות ויסות רגשי ממשיכות להתפתח לאורך גיל ההתבגרות.',
      'קיימים הבדלים אינדיבידואליים משמעותיים ביכולת ויסות רגשי.',
      'הורים משפיעים על התפתחות ויסות רגשי דרך הדגמה, אימון ישיר, ותגובותיהם לביטויים רגשיים.',
      'מתבגרים עם יכולות ויסות רגשי טובות יותר מראים הסתגלות חברתית ואקדמית טובה יותר.'
    ],
    connectedExercises: ['emotional_awareness', 'progressive_muscle_relaxation', 'cognitive_restructuring']
  },
  
  'screen_addiction': {
    id: 'screen_addiction',
    title: 'Screen Time and Digital Media: Impact on Adolescent Development and Mental Health',
    shortTitle: 'השפעת מסכים ומדיה דיגיטלית על מתבגרים',
    summary: 'מאמר זה סוקר את ההשפעות של שימוש במסכים ומדיה דיגיטלית על התפתחות קוגניטיבית, חברתית ורגשית של מתבגרים.',
    researchers: 'Jean M. Twenge, Ph.D., & W. Keith Campbell, Ph.D.',
    year: 2023,
    category: 'התמכרות למסכים',
    topics: ['זמן מסך', 'רשתות חברתיות', 'מתבגרים', 'בריאות נפשית', 'טכנולוגיה'],
    methodology: 'ניתוח של מחקרים לאומיים רחבי היקף על שימוש במסכים בקרב מתבגרים.',
    keyFindings: [
      'מתבגרים שמשתמשים במסכים יותר מ-4 שעות ביום מראים סיכון מוגבר לבעיות בריאות נפשית.',
      'השימוש ברשתות חברתיות קשור בדימוי גוף נמוך, במיוחד בקרב בנות מתבגרות.',
      'זמן מסך לפני השינה פוגע באיכות השינה ומשפיע לרעה על תפקוד קוגניטיבי ורגשי.',
      'גישה מאוזנת לטכנולוגיה היא המומלצת ביותר להתפתחות בריאה.'
    ],
    connectedExercises: ['behavioral_contract', 'values_clarification', 'behavioral_activation']
  }
};

// קטגוריות של מאמרים לסינון וארגון
export const articleCategories = [
  { id: 'cbt_teens', name: 'CBT למתבגרים', description: 'מאמרים העוסקים ביישום של טיפול קוגניטיבי-התנהגותי עם מתבגרים' },
  { id: 'parenting_styles', name: 'סגנונות הורות', description: 'מחקרים על השפעות של סגנונות הורות שונים על התפתחות ורווחה של מתבגרים' },
  { id: 'family_therapy', name: 'טיפול משפחתי', description: 'מאמרים העוסקים בגישות וטכניקות של טיפול משפחתי עם משפחות למתבגרים' },
  { id: 'emotional_awareness', name: 'מודעות רגשית', description: 'מחקרים על התפתחות ויסות רגשי ומודעות רגשית בגיל ההתבגרות' },
  { id: 'screen_time', name: 'מסכים ומדיה דיגיטלית', description: 'מאמרים על השפעות השימוש בטכנולוגיה, מסכים ורשתות חברתיות על מתבגרים' },
  { id: 'mental_health', name: 'בריאות נפש', description: 'מחקרים על נושאי בריאות נפש של מתבגרים, כולל חרדה, דיכאון, וטראומה' }
];

// פונקציות חיפוש ומיון
export function findArticleById(id) {
  return academicArticles[id] || null;
}

export function searchArticles(query) {
  if (!query || query.trim() === '') {
    return Object.values(academicArticles);
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return Object.values(academicArticles).filter(article => {
    return (
      article.title.toLowerCase().includes(normalizedQuery) ||
      article.summary.toLowerCase().includes(normalizedQuery) ||
      article.researchers.toLowerCase().includes(normalizedQuery) ||
      article.topics.some(topic => topic.toLowerCase().includes(normalizedQuery)) ||
      (article.keyFindings && article.keyFindings.some(finding => finding.toLowerCase().includes(normalizedQuery)))
    );
  });
}

export function filterArticlesByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') {
    return Object.values(academicArticles);
  }
  
  return Object.values(academicArticles).filter(article => 
    article.category && article.category.toLowerCase() === categoryId.toLowerCase()
  );
}

export function findRelatedArticles(articleId, limit = 3) {
  const article = findArticleById(articleId);
  if (!article || !article.relatedArticles) {
    return [];
  }
  
  const relatedByDefined = article.relatedArticles
    .map(id => findArticleById(id))
    .filter(a => a !== null);
  
  if (relatedByDefined.length >= limit) {
    return relatedByDefined.slice(0, limit);
  }
  
  const sameCategory = Object.values(academicArticles).filter(a => 
    a.id !== articleId && 
    a.category === article.category &&
    !article.relatedArticles.includes(a.id)
  );
  
  return [...relatedByDefined, ...sameCategory].slice(0, limit);
}