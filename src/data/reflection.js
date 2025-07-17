// מערכת רפלקציה מקצועית לבוט CBT להורי מתבגרים
// מבוסס על מסמך "רפלקציה.docx"

// מבנה בסיסי לרפלקציה מקצועית
export const reflectionTemplate = {
  objectiveDocumentation: {
    date: null,
    duration: null,
    participants: [],
    mainTopics: [],
    keyInterventions: [],
    turningPoints: []
  },
  emotionalDynamics: {
    parentEmotionalStates: {
      beginning: [],
      middle: [],
      end: []
    },
    therapeuticRelationship: {
      connectionPoints: [],
      tensionPoints: [],
      allianceQuality: null
    },
    identifiedEmotionalProcesses: []
  },
  cognitiveBehavioralAnalysis: {
    identifiedThoughtPatterns: [],
    cognitiveDistortions: [],
    parentalSchemas: [],
    copingStrategies: {
      adaptive: [],
      challenging: []
    }
  },
  progressAssessment: {
    previousGoals: [],
    newSkillsAcquired: [],
    reportedRelationshipChanges: [],
    identifiedBarriers: []
  },
  interventionPlanning: {
    proposedFocusAreas: [],
    interventionContinuation: {
      maintain: [],
      modify: [],
      add: []
    },
    recommendedHomeAssignments: [],
    topicsRequiringFurtherResearch: []
  },
  metaProcessInsights: {
    interventionEffectiveness: {
      effective: [],
      lessEffective: []
    },
    processFactors: {
      facilitating: [],
      hindering: []
    },
    parentingStyleInsights: {
      strengths: [],
      challenges: [],
      dominantStyle: null
    },
    guidingQuestions: []
  }
};

/**
 * יוצר מבנה רפלקציה חדש
 */
export function createNewReflection() {
  return JSON.parse(JSON.stringify(reflectionTemplate));
}

/**
 * מנתח שיחה ויוצר רפלקציה מקצועית
 */
export function analyzeConversation(messages, userContext, sessionData = {}) {
  const reflection = createNewReflection();
  
  // 1. תיעוד אובייקטיבי
  fillObjectiveDocumentation(reflection, messages, sessionData);
  
  // 2. ניתוח דינמיקה רגשית
  analyzeEmotionalDynamics(reflection, messages, userContext);
  
  // 3. ניתוח קוגניטיבי-התנהגותי
  analyzeCognitiveBehavioral(reflection, messages, userContext);
  
  // 4. הערכת התקדמות
  assessProgress(reflection, messages, userContext, sessionData);
  
  // 5. תכנון המשך התערבות
  planInterventions(reflection, messages, userContext, sessionData);
  
  // 6. תובנות מטא-תהליכיות
  generateMetaInsights(reflection, messages, userContext);
  
  return reflection;
}

/**
 * ממלא את חלק התיעוד האובייקטיבי של הרפלקציה
 */
function fillObjectiveDocumentation(reflection, messages, sessionData) {
  reflection.objectiveDocumentation.date = sessionData.date || new Date().toISOString().split('T')[0];
  
  if (messages.length > 1 && messages[0].timestamp && messages[messages.length - 1].timestamp) {
    const startTime = new Date(messages[0].timestamp);
    const endTime = new Date(messages[messages.length - 1].timestamp);
    const durationMs = endTime - startTime;
    const durationMinutes = Math.round(durationMs / 60000);
    reflection.objectiveDocumentation.duration = `${durationMinutes} דקות`;
  } else {
    reflection.objectiveDocumentation.duration = sessionData.duration || 'לא מתועד';
  }
  
  reflection.objectiveDocumentation.participants = ['הורה למתבגר/ת', 'מטפל/ת וירטואלי'];
  reflection.objectiveDocumentation.mainTopics = identifyMainTopics(messages);
  reflection.objectiveDocumentation.keyInterventions = identifyKeyInterventions(messages);
  reflection.objectiveDocumentation.turningPoints = identifyTurningPoints(messages);
}

/**
 * מזהה נושאים מרכזיים בשיחה
 */
function identifyMainTopics(messages) {
  const topicKeywords = {
    'תקשורת': ['לדבר', 'שיחה', 'תקשורת', 'הקשבה', 'דיאלוג'],
    'משמעת וגבולות': ['גבולות', 'כללים', 'משמעת', 'איסור', 'הגבלה', 'עונש'],
    'לימודים': ['בית ספר', 'שיעורים', 'ציונים', 'מורים', 'לימודים'],
    'חברים והשפעות חברתיות': ['חברים', 'חברות', 'חברתי', 'השפעה', 'לחץ חברתי'],
    'שימוש במסכים': ['טלפון', 'מחשב', 'מסכים', 'רשתות חברתיות', 'אינסטגרם', 'טיקטוק'],
    'התנהגות מרדנית': ['מרד', 'התנגדות', 'מתנגד', 'מסרב', 'לא מוכן', 'מתעלם'],
    'רגשות ומצב רוח': ['כעס', 'עצב', 'דיכאון', 'חרדה', 'רוח', 'שמחה', 'רגש'],
    'עצמאות ואוטונומיה': ['עצמאות', 'עצמאי', 'אוטונומיה', 'החלטות', 'בחירות'],
    'זהות והתפתחות': ['זהות', 'מי אני', 'התפתחות', 'בגרות', 'צמיחה']
  };
  
  const topicCounts = {};
  for (const topic in topicKeywords) {
    topicCounts[topic] = 0;
    
    for (const message of messages) {
      const content = message.text.toLowerCase();
      for (const keyword of topicKeywords[topic]) {
        if (content.includes(keyword.toLowerCase())) {
          topicCounts[topic]++;
          break;
        }
      }
    }
  }
  
  const sortedTopics = Object.entries(topicCounts)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([topic, _]) => topic);
  
  return sortedTopics.slice(0, Math.min(5, sortedTopics.length));
}

/**
 * מזהה התערבויות מרכזיות בשיחה
 */
function identifyKeyInterventions(messages) {
  const interventionPatterns = [
    {
      name: 'הקשבה משקפת',
      patterns: [
        'נשמע ש', 'אני שומע ש', 'אתה מרגיש', 'את מרגישה', 
        'מה שאני מבין', 'האם הבנתי נכון', 'זה נשמע כאילו'
      ],
      response: []
    },
    {
      name: 'זיהוי מחשבות אוטומטיות',
      patterns: [
        'מחשבה אוטומטית', 'מחשבות שעוברות לך בראש', 
        'חשבת באותו רגע', 'עיוות חשיבה', 'מחשבות שליליות'
      ],
      response: []
    },
    {
      name: 'הצבת גבולות',
      patterns: [
        'הצבת גבולות', 'גבולות ברורים', 'חשוב להגדיר', 
        'כללים עקביים', 'מסגרת ברורה'
      ],
      response: []
    },
    {
      name: 'נרמול',
      patterns: [
        'זו תופעה נפוצה', 'הרבה הורים חווים', 'מתבגרים רבים', 
        'זה חלק נורמלי', 'שלב התפתחותי', 'זה אופייני לגיל'
      ],
      response: []
    },
    {
      name: 'הצעת אסטרטגיות התמודדות',
      patterns: [
        'אסטרטגיה שיכולה לעזור', 'דרך להתמודד', 'ניתן לנסות', 
        'טכניקה שיכולה', 'כלי שיכול לסייע', 'גישה שעשויה'
      ],
      response: []
    }
  ];
  
  const botMessages = messages.filter(m => m.sender === 'bot' || m.sender === 'assistant');
  
  for (const message of botMessages) {
    const content = message.text.toLowerCase();
    
    for (const intervention of interventionPatterns) {
      for (const pattern of intervention.patterns) {
        if (content.includes(pattern.toLowerCase())) {
          const msgIndex = messages.indexOf(message);
          const nextUserMsg = messages[msgIndex + 1];
          
          if (nextUserMsg && nextUserMsg.sender === 'user') {
            intervention.response.push({
              intervention: shortenText(message.text, 100),
              response: shortenText(nextUserMsg.text, 100)
            });
            break;
          } else {
            intervention.response.push({
              intervention: shortenText(message.text, 100),
              response: null
            });
            break;
          }
        }
      }
    }
  }
  
  return interventionPatterns
    .filter(intervention => intervention.response.length > 0)
    .map(intervention => ({
      type: intervention.name,
      examples: intervention.response.slice(0, 2)
    }));
}

/**
 * מזהה נקודות מפנה בשיחה
 */
function identifyTurningPoints(messages) {
  const turningPoints = [];
  
  for (let i = 1; i < messages.length - 1; i++) {
    const currMsg = messages[i];
    const nextMsg = messages[i + 1];
    
    if (currMsg.sender === 'user') {
      if (containsInsight(currMsg.text)) {
        turningPoints.push({
          point: `תובנה: ${shortenText(currMsg.text, 100)}`,
          description: 'ההורה הביע תובנה או הבנה חדשה משמעותית'
        });
        continue;
      }
      
      if (containsResistance(currMsg.text) && !containsResistance(nextMsg.text)) {
        turningPoints.push({
          point: `התגברות על התנגדות: ${shortenText(currMsg.text, 100)}`,
          description: 'ההורה עבר מהתנגדות לפתיחות גדולה יותר'
        });
      }
    }
  }
  
  return turningPoints.slice(0, 3);
}

/**
 * בודק אם הודעה מכילה תובנה או הבנה חדשה
 */
function containsInsight(text) {
  const insightPhrases = [
    'עכשיו אני מבין', 'לא חשבתי על זה', 'זה נותן לי פרספקטיבה', 
    'אני רואה את זה אחרת', 'פתאום אני קולט', 'זה מסביר למה', 
    'אה, אז זה בעצם', 'זו נקודה חשובה', 'לא הסתכלתי על זה ככה'
  ];
  
  return insightPhrases.some(phrase => text.includes(phrase));
}

/**
 * בודק אם הודעה מכילה ביטויי התנגדות
 */
function containsResistance(text) {
  const resistancePhrases = [
    'זה לא יעבוד', 'ניסיתי כבר', 'אני לא חושב ש', 'אני לא מאמין ש',
    'אין סיכוי ש', 'אבל הוא לא', 'אבל היא לא', 'זה בלתי אפשרי'
  ];
  
  return resistancePhrases.some(phrase => text.includes(phrase));
}

/**
 * מנתח את הדינמיקה הרגשית בשיחה
 */
function analyzeEmotionalDynamics(reflection, messages, userContext) {
  const emotionalStates = identifyEmotionalStates(messages);
  reflection.emotionalDynamics.parentEmotionalStates = emotionalStates;
  
  const therapeuticRelationship = identifyTherapeuticRelationship(messages);
  reflection.emotionalDynamics.therapeuticRelationship = therapeuticRelationship;
  
  const emotionalProcesses = identifyEmotionalProcesses(messages, userContext);
  reflection.emotionalDynamics.identifiedEmotionalProcesses = emotionalProcesses;
}

/**
 * מזהה מצבים רגשיים בשלבים שונים של השיחה
 */
function identifyEmotionalStates(messages) {
  if (messages.length < 3) {
    return {
      beginning: ['לא מספיק מידע'],
      middle: ['לא מספיק מידע'],
      end: ['לא מספיק מידע']
    };
  }
  
  const third = Math.floor(messages.length / 3);
  const beginning = messages.slice(0, third);
  const middle = messages.slice(third, third * 2);
  const end = messages.slice(third * 2);
  
  return {
    beginning: extractEmotions(beginning.filter(m => m.sender === 'user')),
    middle: extractEmotions(middle.filter(m => m.sender === 'user')),
    end: extractEmotions(end.filter(m => m.sender === 'user'))
  };
}

/**
 * מחלץ רגשות מרשימת הודעות
 */
function extractEmotions(messages) {
  const emotionKeywords = {
    'תסכול': ['תסכול', 'מתוסכל', 'מתסכל', 'נמאס לי', 'אין לי כוח'],
    'כעס': ['כעס', 'כועס', 'כועסת', 'עצבני', 'עצבנית', 'עצבים'],
    'חרדה': ['חרדה', 'מודאג', 'מודאגת', 'דאגה', 'חושש', 'חוששת', 'פחד'],
    'עצב': ['עצב', 'עצוב', 'עצובה', 'מדוכא', 'מדוכאת', 'דיכאון'],
    'אשמה': ['אשמה', 'אשם', 'אשמה', 'רגשות אשם', 'מרגיש אשם'],
    'תקווה': ['תקווה', 'מקווה', 'אופטימי', 'אופטימית', 'אולי יש סיכוי'],
    'הקלה': ['הקלה', 'מוקל', 'מרגיש יותר טוב', 'מרגישה יותר טוב']
  };
  
  const emotionCounts = {};
  
  for (const message of messages) {
    const content = message.text.toLowerCase();
    
    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
      for (const keyword of keywords) {
        if (content.includes(keyword.toLowerCase())) {
          emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
          break;
        }
      }
    }
  }
  
  const sortedEmotions = Object.entries(emotionCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([emotion, _]) => emotion);
  
  return sortedEmotions.length > 0 ? 
    sortedEmotions.slice(0, 3) : 
    ['לא זוהו רגשות ברורים'];
}

/**
 * מזהה את איכות הקשר הטיפולי בשיחה
 */
function identifyTherapeuticRelationship(messages) {
  const relationship = {
    connectionPoints: [],
    tensionPoints: [],
    allianceQuality: null
  };
  
  const connectionPhrases = [
    'תודה', 'זה עוזר', 'זה מועיל', 'אני מעריך', 'אני מעריכה',
    'זה מדויק', 'אתה צודק', 'את צודקת', 'בדיוק', 'אכן'
  ];
  
  const tensionPhrases = [
    'לא עוזר', 'לא מועיל', 'לא מבין אותי', 'לא מבינה אותי',
    'זה לא רלוונטי', 'אתה לא מקשיב', 'את לא מקשיבה', 'זה לא מה שאמרתי'
  ];
  
  const userMessages = messages.filter(m => m.sender === 'user');
  
  for (const message of userMessages) {
    const content = message.text.toLowerCase();
    
    for (const phrase of connectionPhrases) {
      if (content.includes(phrase.toLowerCase())) {
        relationship.connectionPoints.push(shortenText(message.text, 100));
        break;
      }
    }
    
    for (const phrase of tensionPhrases) {
      if (content.includes(phrase.toLowerCase())) {
        relationship.tensionPoints.push(shortenText(message.text, 100));
        break;
      }
    }
  }
  
  const connectionCount = relationship.connectionPoints.length;
  const tensionCount = relationship.tensionPoints.length;
  
  if (connectionCount > tensionCount * 2) {
    relationship.allianceQuality = 'טובה מאוד';
  } else if (connectionCount > tensionCount) {
    relationship.allianceQuality = 'טובה';
  } else if (connectionCount === tensionCount) {
    relationship.allianceQuality = 'מעורבת';
  } else {
    relationship.allianceQuality = 'מאתגרת';
  }
  
  relationship.connectionPoints = relationship.connectionPoints.slice(0, 2);
  relationship.tensionPoints = relationship.tensionPoints.slice(0, 2);
  
  return relationship;
}

/**
 * מזהה תהליכים רגשיים בשיחה
 */
function identifyEmotionalProcesses(messages, userContext) {
  const processes = [];
  
  if (detectProcess(messages, ['חרדה', 'דאגה', 'מודאג', 'מודאגת'], ['רגוע', 'שקט', 'מרגיע', 'הקלה'])) {
    processes.push({
      process: 'הפחתת חרדה',
      description: 'ניכרת ירידה ברמת החרדה והדאגה לאורך השיחה'
    });
  }
  
  if (detectProcess(messages, ['כעס', 'כועס', 'כועסת', 'עצבני', 'עצבנית'], ['מבין', 'מבינה', 'רגוע', 'מקבל', 'מקבלת'])) {
    processes.push({
      process: 'עיבוד כעס',
      description: 'עיבוד רגשות כעס והתמרה שלהם להבנה'
    });
  }
  
  if (detectProcess(messages, ['לא בטוח', 'לא בטוחה', 'ספקן', 'ספקנית'], ['אנסה', 'אנסה את זה', 'נראה הגיוני', 'יכול לעבוד'])) {
    processes.push({
      process: 'בניית אמון',
      description: 'מעבר מספקנות לנכונות לנסות ולהתנסות'
    });
  }
  
  return processes;
}

/**
 * בודק אם קיים תהליך מסוים בהודעות
 */
function detectProcess(messages, initialPhrases, laterPhrases) {
  const userMessages = messages
    .filter(m => m.sender === 'user')
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  
  if (userMessages.length < 4) return false;
  
  const halfIndex = Math.floor(userMessages.length / 2);
  const firstHalf = userMessages.slice(0, halfIndex);
  const secondHalf = userMessages.slice(halfIndex);
  
  const hasInitialPhrases = firstHalf.some(message => 
    initialPhrases.some(phrase => message.text.toLowerCase().includes(phrase.toLowerCase()))
  );
  
  const hasLaterPhrases = secondHalf.some(message => 
    laterPhrases.some(phrase => message.text.toLowerCase().includes(phrase.toLowerCase()))
  );
  
  return hasInitialPhrases && hasLaterPhrases;
}

/**
 * מנתח תוכן קוגניטיבי-התנהגותי בשיחה
 */
function analyzeCognitiveBehavioral(reflection, messages, userContext) {
  const thoughtPatterns = identifyThoughtPatterns(messages);
  reflection.cognitiveBehavioralAnalysis.identifiedThoughtPatterns = thoughtPatterns;
  
  const cognitiveDistortions = identifyCognitiveDistortions(messages);
  reflection.cognitiveBehavioralAnalysis.cognitiveDistortions = cognitiveDistortions;
  
  const parentalSchemas = identifyParentalSchemas(messages, userContext);
  reflection.cognitiveBehavioralAnalysis.parentalSchemas = parentalSchemas;
  
  const copingStrategies = identifyCopingStrategies(messages);
  reflection.cognitiveBehavioralAnalysis.copingStrategies = copingStrategies;
}

/**
 * מזהה דפוסי חשיבה מרכזיים
 */
function identifyThoughtPatterns(messages) {
  const patterns = [];
  const userMessages = messages.filter(m => m.sender === 'user');
  
  if (detectThoughtPattern(userMessages, ['תמיד', 'אף פעם', 'כולם', 'אף אחד', 'הכל', 'שום דבר'])) {
    patterns.push({
      pattern: 'חשיבת "הכל או כלום"',
      examples: extractExamples(userMessages, ['תמיד', 'אף פעם', 'כולם', 'אף אחד'], 2)
    });
  }
  
  if (detectThoughtPattern(userMessages, ['הוא חושב ש', 'היא חושבת ש', 'הוא בטח חושב', 'היא בטח חושבת'])) {
    patterns.push({
      pattern: 'קריאת מחשבות',
      examples: extractExamples(userMessages, ['הוא חושב ש', 'היא חושבת ש'], 2)
    });
  }
  
  if (detectThoughtPattern(userMessages, ['זה בגללי', 'אני אשם', 'אני אשמה', 'אשמתי', 'באשמתי'])) {
    patterns.push({
      pattern: 'פרסונליזציה',
      examples: extractExamples(userMessages, ['זה בגללי', 'אני אשם', 'אני אשמה'], 2)
    });
  }
  
  return patterns;
}

/**
 * בודק אם דפוס חשיבה מסוים קיים בהודעות
 */
function detectThoughtPattern(messages, phrases) {
  return messages.some(message => 
    phrases.some(phrase => message.text.toLowerCase().includes(phrase.toLowerCase()))
  );
}

/**
 * מחלץ דוגמאות לדפוס חשיבה
 */
function extractExamples(messages, phrases, limit = 2) {
  const examples = [];
  
  for (const message of messages) {
    for (const phrase of phrases) {
      if (message.text.toLowerCase().includes(phrase.toLowerCase())) {
        const sentences = message.text.split(/[.!?]+/);
        for (const sentence of sentences) {
          if (sentence.toLowerCase().includes(phrase.toLowerCase())) {
            examples.push(sentence.trim());
            if (examples.length >= limit) return examples;
            break;
          }
        }
      }
    }
  }
  
  return examples;
}

/**
 * מזהה עיוותי חשיבה בשיחה
 */
function identifyCognitiveDistortions(messages) {
  const distortions = [];
  const userMessages = messages.filter(m => m.sender === 'user');
  
  const distortionTypes = [
    {
      name: 'הכללת יתר',
      phrases: ['תמיד', 'אף פעם', 'כל הזמן', 'כולם', 'אף אחד']
    },
    {
      name: 'חשיבה קטסטרופלית',
      phrases: ['אסון', 'קטסטרופה', 'הכי גרוע', 'לא אוכל לשרוד']
    },
    {
      name: 'פילטר שלילי',
      phrases: ['רק דברים רעים', 'תמיד הולך רע', 'אין שום דבר טוב']
    },
    {
      name: 'האשמה עצמית',
      phrases: ['זה בגללי', 'אני אשם', 'אני אשמה', 'אשמתי', 'באשמתי']
    }
  ];
  
  for (const distortion of distortionTypes) {
    const examples = [];
    
    for (const message of userMessages) {
      for (const phrase of distortion.phrases) {
        if (message.text.toLowerCase().includes(phrase.toLowerCase())) {
          const sentences = message.text.split(/[.!?]+/);
          for (const sentence of sentences) {
            if (sentence.toLowerCase().includes(phrase.toLowerCase())) {
              examples.push(sentence.trim());
              break;
            }
          }
          break;
        }
      }
      
      if (examples.length >= 2) break;
    }
    
    if (examples.length > 0) {
      distortions.push({
        type: distortion.name,
        examples: examples.slice(0, 2),
        intervention: 'זוהה עיוות חשיבה זה בשיחה'
      });
    }
  }
  
  return distortions;
}

/**
 * מזהה סכמות הוריות בשיחה
 */
function identifyParentalSchemas(messages, userContext) {
  const schemas = [];
  const userMessages = messages.filter(m => m.sender === 'user');
  
  const parentalSchemaTypes = [
    {
      name: 'הורה מושלם',
      phrases: ['הייתי צריך/ה להיות יותר טוב', 'אני לא מספיק טוב/ה', 'לא עשיתי מספיק']
    },
    {
      name: 'הורה מקריב',
      phrases: ['אני מוותר/ת על הכל', 'אני תמיד שם/ה אותו/ה לפני', 'אני מקריב/ה את עצמי']
    },
    {
      name: 'הורה שתלטן',
      phrases: ['הוא/היא צריך/ה לעשות מה שאני אומר/ת', 'אני יודע/ת מה הכי טוב', 'אני קובע/ת את הכללים']
    },
    {
      name: 'הורה מאשים את עצמו',
      phrases: ['זו אשמתי', 'אני הרסתי', 'אני גרמתי לזה', 'הכל בגללי']
    }
  ];
  
  for (const schema of parentalSchemaTypes) {
    const examples = [];
    
    for (const message of userMessages) {
      for (const phrase of schema.phrases) {
        if (message.text.toLowerCase().includes(phrase.toLowerCase())) {
          examples.push(shortenText(message.text, 100));
          break;
        }
      }
      
      if (examples.length >= 2) break;
    }
    
    if (examples.length > 0) {
      schemas.push({
        schema: schema.name,
        examples: examples.slice(0, 2),
        evidence: `ביטויים המשקפים תפיסה של ${schema.name} חזרו ${examples.length} פעמים בשיחה`
      });
    }
  }
  
  return schemas;
}

/**
 * מזהה אסטרטגיות התמודדות בשיחה
 */
function identifyCopingStrategies(messages) {
  const adaptiveStrategies = [];
  const challengingStrategies = [];
  const userMessages = messages.filter(m => m.sender === 'user');
  
  const adaptiveKeywords = [
    { strategy: 'שיחה פתוחה', phrases: ['דיברתי איתו/ה', 'שוחחנו על', 'שיתפתי אותו/ה'] },
    { strategy: 'הצבת גבולות עקביים', phrases: ['הצבתי גבול', 'הגדרתי כללים', 'הבהרתי את הציפיות'] },
    { strategy: 'ויסות רגשי עצמי', phrases: ['לקחתי נשימה עמוקה', 'ספרתי עד עשר', 'יצאתי להירגע'] }
  ];
  
  const challengingKeywords = [
    { strategy: 'צעקות וכעס', phrases: ['צעקתי', 'צעקתי עליו/ה', 'התפרצתי', 'כעסתי'] },
    { strategy: 'איומים', phrases: ['איימתי', 'הזהרתי אותו/ה ש', 'אמרתי שאם לא'] },
    { strategy: 'הימנעות', phrases: ['נתתי לזה לעבור', 'התעלמתי', 'החלטתי לוותר'] }
  ];
  
  for (const strategy of adaptiveKeywords) {
    for (const message of userMessages) {
      for (const phrase of strategy.phrases) {
        if (message.text.toLowerCase().includes(phrase.toLowerCase())) {
          adaptiveStrategies.push({
            strategy: strategy.strategy,
            example: shortenText(message.text, 100)
          });
          break;
        }
      }
      
      if (adaptiveStrategies.find(s => s.strategy === strategy.strategy)) {
        break;
      }
    }
  }
  
  for (const strategy of challengingKeywords) {
    for (const message of userMessages) {
      for (const phrase of strategy.phrases) {
        if (message.text.toLowerCase().includes(phrase.toLowerCase())) {
          challengingStrategies.push({
            strategy: strategy.strategy,
            example: shortenText(message.text, 100)
          });
          break;
        }
      }
      
      if (challengingStrategies.find(s => s.strategy === strategy.strategy)) {
        break;
      }
    }
  }
  
  return {
    adaptive: adaptiveStrategies,
    challenging: challengingStrategies
  };
}

/**
 * הערכת התקדמות טיפולית
 */
function assessProgress(reflection, messages, userContext, sessionData) {
  const previousGoals = assessPreviousGoals(messages, sessionData);
  reflection.progressAssessment.previousGoals = previousGoals;
  
  const newSkills = identifyNewSkills(messages);
  reflection.progressAssessment.newSkillsAcquired = newSkills;
  
  const relationshipChanges = identifyRelationshipChanges(messages);
  reflection.progressAssessment.reportedRelationshipChanges = relationshipChanges;
  
  const barriers = identifyBarriers(messages);
  reflection.progressAssessment.identifiedBarriers = barriers;
}

/**
 * הערכת מטרות מפגישות קודמות
 */
function assessPreviousGoals(messages, sessionData) {
  const assessedGoals = [];
  
  const goalIndicators = [
    'ניסיתי את מה שהצעת', 'עשיתי את התרגיל', 'התחלתי ליישם',
    'עבדתי על', 'ניסיתי לשנות', 'תרגלתי את'
  ];
  
  const goalMessages = messages.filter(message => 
    message.sender === 'user' && 
    goalIndicators.some(indicator => message.text.toLowerCase().includes(indicator.toLowerCase()))
  );
  
  if (goalMessages.length > 0) {
    for (const message of goalMessages.slice(0, 2)) {
      assessedGoals.push({
        goal: shortenText(message.text, 100),
        progress: 'דווח על ניסיון ליישם',
        evidence: 'המשתמש דיווח על ניסיון ליישם משימה או מטרה קודמת'
      });
    }
  }
  
  return assessedGoals;
}

/**
 * זיהוי מיומנויות חדשות שנרכשו
 */
function identifyNewSkills(messages) {
  const skills = [];
  const userMessages = messages.filter(m => m.sender === 'user');
  
  const possibleSkills = [
    { 
      skill: 'הקשבה משקפת', 
      keywords: ['הקשבתי', 'שיקפתי', 'אמרתי לו/לה שאני מבין/ה'] 
    },
    { 
      skill: 'זיהוי מחשבות אוטומטיות', 
      keywords: ['זיהיתי את המחשבה', 'שמתי לב למחשבה', 'תפסתי את עצמי חושב/ת'] 
    },
    { 
      skill: 'ויסות רגשי', 
      keywords: ['נשמתי עמוק', 'הרגעתי את עצמי', 'לקחתי פסק זמן'] 
    }
  ];
  
  for (const skillType of possibleSkills) {
    let found = false;
    let example = '';
    
    for (const message of userMessages) {
      for (const keyword of skillType.keywords) {
        if (message.text.toLowerCase().includes(keyword.toLowerCase())) {
          found = true;
          example = shortenText(message.text, 100);
          break;
        }
      }
      
      if (found) break;
    }
    
    if (found) {
      let implementationLevel = 'התנסות ראשונית';
      
      if (example.includes('הצלחתי') || example.includes('עבד טוב')) {
        implementationLevel = 'יישום מוצלח';
      } else if (example.includes('קשה לי') || example.includes('לא הצלחתי')) {
        implementationLevel = 'קושי ביישום';
      }
      
      skills.push({
        skill: skillType.skill,
        implementationLevel: implementationLevel,
        example: example
      });
    }
  }
  
  return skills;
}

/**
 * זיהוי שינויים ביחסי הורה-מתבגר
 */
function identifyRelationshipChanges(messages) {
  const changes = [];
  const userMessages = messages.filter(m => m.sender === 'user');
  
  const positiveChangeKeywords = [
    'יותר פתוח', 'יותר פתוחה', 'משתף יותר', 'משתפת יותר', 
    'פחות ויכוחים', 'יותר שיתוף פעולה', 'השתפר', 'השתפרה'
  ];
  
  const negativeChangeKeywords = [
    'יותר מרוחק', 'יותר מרוחקת', 'פחות משתף', 'פחות משתפת',
    'יותר ויכוחים', 'יותר התנגדות', 'הרע', 'הרעה'
  ];
  
  for (const message of userMessages) {
    for (const keyword of positiveChangeKeywords) {
      if (message.text.toLowerCase().includes(keyword.toLowerCase())) {
        changes.push({
          type: 'חיובי',
          description: shortenText(message.text, 100)
        });
        break;
      }
    }
    
    for (const keyword of negativeChangeKeywords) {
      if (message.text.toLowerCase().includes(keyword.toLowerCase())) {
        changes.push({
          type: 'שלילי',
          description: shortenText(message.text, 100)
        });
        break;
      }
    }
  }
  
  return changes;
}

/**
 * זיהוי חסמים להתקדמות
 */
function identifyBarriers(messages) {
  const barriers = [];
  const userMessages = messages.filter(m => m.sender === 'user');
  
  const barrierTypes = [
    { 
      type: 'חוסר זמן', 
      keywords: ['אין לי זמן', 'עמוס', 'עמוסה', 'לא מספיק זמן'] 
    },
    { 
      type: 'התנגדות המתבגר', 
      keywords: ['לא מוכן', 'לא מוכנה', 'מסרב', 'מסרבת', 'מתנגד'] 
    },
    { 
      type: 'קושי רגשי', 
      keywords: ['מציף אותי', 'קשה לי רגשית', 'אני מתוסכל', 'אני לא יכול'] 
    }
  ];
  
  for (const barrier of barrierTypes) {
    for (const message of userMessages) {
      for (const keyword of barrier.keywords) {
        if (message.text.toLowerCase().includes(keyword.toLowerCase())) {
          if (!barriers.find(b => b.barrier === barrier.type)) {
            barriers.push({
              barrier: barrier.type,
              description: shortenText(message.text, 100),
              suggestedApproach: getSuggestedApproachForBarrier(barrier.type)
            });
          }
          break;
        }
      }
      
      if (barriers.length >= 3) break;
    }
    
    if (barriers.length >= 3) break;
  }
  
  return barriers;
}

/**
 * מחזיר גישה מוצעת לחסם מסוים
 */
function getSuggestedApproachForBarrier(barrierType) {
  switch (barrierType) {
    case 'חוסר זמן':
      return 'זיהוי התערבויות קצרות וממוקדות שניתן לשלב בשגרה הקיימת';
    case 'התנגדות המתבגר':
      return 'שימוש בטכניקות ראיון מוטיבציוני ומציאת תחומי עניין משותפים';
    case 'קושי רגשי':
      return 'התמקדות בוויסות רגשי של ההורה לפני עבודה על תקשורת עם המתבגר';
    default:
      return 'זיהוי הגורמים הספציפיים לחסם ויצירת תכנית פעולה מותאמת';
  }
}

/**
 * תכנון המשך ההתערבות
 */
function planInterventions(reflection, messages, userContext, sessionData) {
  const focusAreas = suggestFocusAreas(reflection, userContext);
  reflection.interventionPlanning.proposedFocusAreas = focusAreas;
  
  const interventionContinuation = planInterventionContinuation(reflection);
  reflection.interventionPlanning.interventionContinuation = interventionContinuation;
  
  const homeAssignments = suggestHomeAssignments(reflection, userContext);
  reflection.interventionPlanning.recommendedHomeAssignments = homeAssignments;
  
  const researchTopics = identifyResearchTopics(reflection, messages);
  reflection.interventionPlanning.topicsRequiringFurtherResearch = researchTopics;
}

/**
 * הצעת תחומי מיקוד להמשך
 */
function suggestFocusAreas(reflection, userContext) {
  const focusAreas = [];
  
  if (reflection.cognitiveBehavioralAnalysis.identifiedThoughtPatterns.length > 0) {
    focusAreas.push({
      area: 'זיהוי ואתגור דפוסי חשיבה',
      rationale: 'זוהו דפוסי חשיבה משמעותיים שמשפיעים על הורות ותקשורת',
      suggestedStrategies: [
        'תרגול יומן מחשבות',
        'זיהוי מחשבות אוטומטיות בזמן אמת',
        'אימון באתגור קוגניטיבי'
      ]
    });
  }
  
  if (reflection.cognitiveBehavioralAnalysis.copingStrategies.challenging.length > 0) {
    focusAreas.push({
      area: 'פיתוח אסטרטגיות התמודדות בריאות',
      rationale: 'זוהו אסטרטגיות התמודדות מאתגרות שעלולות לפגוע ביחסים',
      suggestedStrategies: [
        'למידת טכניקות לוויסות רגשי',
        'פיתוח תגובות אלטרנטיביות לקונפליקטים',
        'תרגול תקשורת אסרטיבית'
      ]
    });
  }
  
  if (reflection.progressAssessment.identifiedBarriers.length > 0) {
    focusAreas.push({
      area: 'התמודדות עם חסמים',
      rationale: `זוהו חסמים משמעותיים שמעכבים התקדמות`,
      suggestedStrategies: [
        'פיתוח אסטרטגיות ספציפיות להתמודדות עם כל חסם',
        'יצירת מערכות תמיכה',
        'קביעת יעדים ריאליסטיים'
      ]
    });
  }
  
  return focusAreas.slice(0, 3);
}

/**
 * תכנון התערבויות להמשך
 */
function planInterventionContinuation(reflection) {
  const interventions = {
    maintain: [],
    modify: [],
    add: []
  };
  
  const effectiveInterventions = reflection.metaProcessInsights?.interventionEffectiveness?.effective || [];
  interventions.maintain = effectiveInterventions.map(intervention => ({
    intervention: intervention.intervention || intervention,
    reason: 'הראתה יעילות בהשגת תגובה חיובית ופתיחות'
  }));
  
  if (reflection.cognitiveBehavioralAnalysis.identifiedThoughtPatterns.length > 0) {
    interventions.add.push({
      intervention: 'אימון בזיהוי ואתגור מחשבות אוטומטיות',
      reason: 'לסייע בהתמודדות עם דפוסי חשיבה שזוהו',
      description: 'הכרות עם יומן מחשבות וטכניקות אתגור קוגניטיבי'
    });
  }
  
  return interventions;
}

/**
 * הצעת משימות בית
 */
function suggestHomeAssignments(reflection, userContext) {
  const assignments = [];
  
  if (reflection.cognitiveBehavioralAnalysis.identifiedThoughtPatterns.length > 0) {
    assignments.push({
      assignment: 'יומן מחשבות',
      goal: 'זיהוי ואתגור מחשבות אוטומטיות',
      instructions: 'מלא/י יומן מחשבות לפחות 3 פעמים השבוע במצבים מאתגרים עם המתבגר/ת.'
    });
  }
  
  if (reflection.objectiveDocumentation.mainTopics.includes('תקשורת')) {
    assignments.push({
      assignment: 'תרגול הקשבה משקפת',
      goal: 'שיפור התקשורת ובניית אמון',
      instructions: 'בחר/י שיחה אחת עם המתבגר/ת השבוע והתמקד/י בהקשבה משקפת.'
    });
  }
  
  return assignments.slice(0, 3);
}

/**
 * זיהוי נושאים הדורשים חקירה נוספת
 */
function identifyResearchTopics(reflection, messages) {
  const topics = [];
  
  if (reflection.cognitiveBehavioralAnalysis.parentalSchemas.length > 0) {
    topics.push({
      topic: 'עבודה עם סכמות הוריות בגישה קוגניטיבית-התנהגותית',
      resources: ['מאמרים אקדמיים על סכמות הוריות', 'ספרות מקצועית על עבודה עם סכמות']
    });
  }
  
  return topics;
}

/**
 * יצירת תובנות מטא-תהליכיות
 */
function generateMetaInsights(reflection, messages, userContext) {
  // כאן ניתן להוסיף לוגיקה מתקדמת יותר לניתוח מטא-תהליכי
  reflection.metaProcessInsights.interventionEffectiveness = {
    effective: [],
    lessEffective: []
  };
  
  reflection.metaProcessInsights.processFactors = {
    facilitating: ['שיתוף פעולה של המשתמש', 'מוטיבציה לשינוי'],
    hindering: []
  };
  
  reflection.metaProcessInsights.parentingStyleInsights = {
    strengths: [],
    challenges: [],
    dominantStyle: null
  };
  
  reflection.metaProcessInsights.guidingQuestions = [
    'איך אפשר לשפר את הגישה הטיפולית?',
    'אילו אסטרטגיות נראות הכי מבטיחות?',
    'מה הנושאים שדורשים מעקב מיוחד?'
  ];
}

/**
 * פונקציה עזר לקיצור טקסט
 */
function shortenText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
}