import React, { useState, useEffect, useRef } from 'react';
import { identifyRelevantDialogue, getNextDialogueResponse } from '../data/dialogues';

const Chat = ({ user, childProfile, dialogues }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentDialogue, setCurrentDialogue] = useState(null);
  const [selectedRubric, setSelectedRubric] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (user && childProfile && messages.length === 0) {
      const welcomeMessage = {
        text: `שלום ${user.name}! אני כאן לעזור לך בתקשורת עם ${childProfile.name}. איך אני יכול לעזור לך היום?`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [user, childProfile]);

  // Handle sending messages
  const handleSendMessage = async () => {
    if (!input.trim() && !selectedRubric) return;

    const userMessage = {
      text: selectedRubric ? selectedRubric.text : input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      handleBotResponse(selectedRubric ? selectedRubric.value : input);
      setSelectedRubric(null);
    }, 1000);
  };

  // Handle bot response logic
  const handleBotResponse = (userInput) => {
    let botResponse;

    // Check if we're in a structured dialogue
    if (currentDialogue) {
      const nextResponse = getNextDialogueResponse(
        currentDialogue.id,
        currentDialogue.currentStep,
        userInput,
        { childName: childProfile?.name }
      );

      if (nextResponse) {
        if (nextResponse.responseType === 'structured_dialogue') {
          botResponse = {
            text: nextResponse.message,
            sender: 'bot',
            timestamp: new Date(),
            rubricOptions: nextResponse.rubricOptions,
            inputType: nextResponse.inputType
          };
          
          setCurrentDialogue({
            ...currentDialogue,
            currentStep: nextResponse.nextStepIndex
          });
        } else {
          // Fallback to general response
          botResponse = generateGeneralResponse(userInput);
          setCurrentDialogue(null);
        }
      } else {
        botResponse = generateGeneralResponse(userInput);
        setCurrentDialogue(null);
      }
    } else {
      // Try to identify relevant dialogue
      const relevantDialogue = identifyRelevantDialogue(userInput);
      
      if (relevantDialogue) {
        setCurrentDialogue(relevantDialogue);
        const dialogue = dialogues[relevantDialogue.id];
        
        if (dialogue && dialogue.dialogueSteps[0]) {
          const childName = childProfile?.name || 'הילד/ה';
          botResponse = {
            text: dialogue.dialogueSteps[0].botMessage(childName),
            sender: 'bot',
            timestamp: new Date(),
            rubricOptions: dialogue.dialogueSteps[0].rubricOptions,
            inputType: dialogue.dialogueSteps[0].inputType
          };
        } else {
          botResponse = generateGeneralResponse(userInput);
        }
      } else {
        botResponse = generateGeneralResponse(userInput);
      }
    }

    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };

  // Generate general response for non-structured dialogue
  const generateGeneralResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    // Simple keyword-based responses
    if (lowerInput.includes('תודה') || lowerInput.includes('תודה רבה')) {
      return {
        text: 'אני שמח/ה שהצלחתי לעזור! זכור/זכרי שאני כאן בכל עת שתרצה לדבר על אתגרים עם המתבגר/ת שלך.',
        sender: 'bot',
        timestamp: new Date()
      };
    }
    
    if (lowerInput.includes('עזרה') || lowerInput.includes('לא יודע')) {
      return {
        text: 'אני כאן לעזור לך! אתה יכול לספר לי על מצב ספציפי שמאתגר אותך עם המתבגר/ת שלך, או לשאול על נושאים כמו תקשורת, הצבת גבולות, או התמודדות עם התנגדות.',
        sender: 'bot',
        timestamp: new Date()
      };
    }
    
    if (lowerInput.includes('כעס') || lowerInput.includes('כועס')) {
      return {
        text: 'כעס הוא רגש טבעי בהורות למתבגרים. החשוב הוא ללמוד איך להתמודד איתו בצורה בריאה. האם תוכל לספר לי על מצב ספציפי שגרם לך לכעס לאחרונה?',
        sender: 'bot',
        timestamp: new Date()
      };
    }
    
    // Default response
    return {
      text: 'אני מבין/ה את מה שאתה חווה. כהורה למתבגר/ת, זה יכול להיות מאתגר. האם תוכל לספר לי יותר על המצב הספציפי שמטריד אותך?',
      sender: 'bot',
      timestamp: new Date()
    };
  };

  // Handle rubric selection
  const handleRubricSelection = (option) => {
    setSelectedRubric(option);
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Render message with rubric options
  const renderMessage = (message, index) => (
    <div key={index} className={`message ${message.sender}`}>
      <div className="message-content">
        {message.text}
      </div>
      {message.rubricOptions && message.rubricOptions.length > 0 && (
        <div className="rubric-options">
          {message.rubricOptions.map((option, optIndex) => (
            <button
              key={optIndex}
              className={`rubric-option ${selectedRubric?.value === option.value ? 'selected' : ''}`}
              onClick={() => handleRubricSelection(option)}
            >
              {option.text}
            </button>
          ))}
        </div>
      )}
      <div className="message-timestamp">
        {message.timestamp.toLocaleTimeString('he-IL', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}
      </div>
    </div>
  );

  // Check if we should show text input or only rubric
  const shouldShowTextInput = () => {
    const lastBotMessage = messages.filter(m => m.sender === 'bot').pop();
    return !lastBotMessage || 
           !lastBotMessage.rubricOptions || 
           lastBotMessage.rubricOptions.length === 0 ||
           lastBotMessage.inputType === 'text';
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>שיחה עם הבוט</h3>
        {currentDialogue && (
          <div className="dialogue-indicator">
            <span>🔄 {dialogues[currentDialogue.id]?.title}</span>
          </div>
        )}
      </div>
      
      <div className="chat-messages">
        {messages.map((message, index) => renderMessage(message, index))}
        
        {isTyping && (
          <div className="message bot">
            <div className="typing-indicator">
              <span>הבוט כותב</span>
              <div className="dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        {shouldShowTextInput() && (
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="כתוב את הודעתך כאן..."
            disabled={isTyping}
          />
        )}
        
        <button 
          onClick={handleSendMessage}
          disabled={isTyping || (!input.trim() && !selectedRubric)}
        >
          {selectedRubric ? 'שלח תשובה' : 'שלח'}
        </button>
      </div>
    </div>
  );
};

export default Chat;