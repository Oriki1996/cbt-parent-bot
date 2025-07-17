import React, { useState, useEffect } from 'react';

const Profile = ({ user, childProfile, onSaveUser, onSaveProfile, onComplete }) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    relationship: 'parent'
  });
  const [childData, setChildData] = useState({
    name: '',
    age: '',
    gender: '',
    grade: '',
    mainChallenges: [],
    strengths: [],
    previousTherapy: false,
    familyStructure: '',
    additionalInfo: ''
  });

  // Initialize with existing data if available
  useEffect(() => {
    if (user) {
      setUserData(user);
    }
    if (childProfile) {
      setChildData(childProfile);
    }
  }, [user, childProfile]);

  // Handle user data changes
  const handleUserChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle child data changes
  const handleChildChange = (field, value) => {
    setChildData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle array field changes (challenges, strengths)
  const handleArrayChange = (field, value) => {
    setChildData(prev => ({
      ...prev,
      [field]: value.split(',').map(item => item.trim()).filter(item => item)
    }));
  };

  // Handle step navigation
  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    onSaveUser(userData);
    onSaveProfile(childData);
    onComplete();
  };

  // Validate current step
  const isStepValid = () => {
    switch (step) {
      case 1:
        return userData.name && userData.email;
      case 2:
        return childData.name && childData.age && childData.gender;
      case 3:
        return true;
      default:
        return false;
    }
  };

  // Render step 1: User Information
  const renderStep1 = () => (
    <div className="profile-step">
      <h3>מידע אישי</h3>
      <div className="form-group">
        <label>שם מלא *</label>
        <input
          type="text"
          value={userData.name}
          onChange={(e) => handleUserChange('name', e.target.value)}
          placeholder="הכנס את שמך המלא"
        />
      </div>
      <div className="form-group">
        <label>כתובת דואר אלקטרוני *</label>
        <input
          type="email"
          value={userData.email}
          onChange={(e) => handleUserChange('email', e.target.value)}
          placeholder="הכנס את כתובת האימייל שלך"
        />
      </div>
      <div className="form-group">
        <label>מספר טלפון</label>
        <input
          type="tel"
          value={userData.phone}
          onChange={(e) => handleUserChange('phone', e.target.value)}
          placeholder="הכנס מספר טלפון"
        />
      </div>
      <div className="form-group">
        <label>קשר למתבגר/ת *</label>
        <select
          value={userData.relationship}
          onChange={(e) => handleUserChange('relationship', e.target.value)}
        >
          <option value="parent">הורה</option>
          <option value="guardian">אפוטרופס</option>
          <option value="stepparent">הורה חורג</option>
          <option value="grandparent">סבא/סבתא</option>
          <option value="other">אחר</option>
        </select>
      </div>
    </div>
  );

  // Render step 2: Child Information
  const renderStep2 = () => (
    <div className="profile-step">
      <h3>מידע על המתבגר/ת</h3>
      <div className="form-group">
        <label>שם המתבגר/ת *</label>
        <input
          type="text"
          value={childData.name}
          onChange={(e) => handleChildChange('name', e.target.value)}
          placeholder="הכנס את שם המתבגר/ת"
        />
      </div>
      <div className="form-group">
        <label>גיל *</label>
        <input
          type="number"
          min="11"
          max="19"
          value={childData.age}
          onChange={(e) => handleChildChange('age', e.target.value)}
          placeholder="הכנס את הגיל"
        />
      </div>
      <div className="form-group">
        <label>מגדר *</label>
        <select
          value={childData.gender}
          onChange={(e) => handleChildChange('gender', e.target.value)}
        >
          <option value="">בחר מגדר</option>
          <option value="male">זכר</option>
          <option value="female">נקבה</option>
          <option value="other">אחר</option>
        </select>
      </div>
      <div className="form-group">
        <label>כיתה/שנת לימודים</label>
        <select
          value={childData.grade}
          onChange={(e) => handleChildChange('grade', e.target.value)}
        >
          <option value="">בחר כיתה</option>
          <option value="6">כיתה ו'</option>
          <option value="7">כיתה ז'</option>
          <option value="8">כיתה ח'</option>
          <option value="9">כיתה ט'</option>
          <option value="10">כיתה י'</option>
          <option value="11">כיתה יא'</option>
          <option value="12">כיתה יב'</option>
          <option value="post_high_school">אחרי התיכון</option>
        </select>
      </div>
      <div className="form-group">
        <label>מבנה משפחתי</label>
        <select
          value={childData.familyStructure}
          onChange={(e) => handleChildChange('familyStructure', e.target.value)}
        >
          <option value="">בחר מבנה משפחתי</option>
          <option value="nuclear">משפחה גרעינית (שני הורים)</option>
          <option value="single_parent">הורה יחיד</option>
          <option value="divorced">הורים גרושים</option>
          <option value="blended">משפחה מורכבת</option>
          <option value="extended">משפחה מורחבת</option>
          <option value="other">אחר</option>
        </select>
      </div>
    </div>
  );

  // Render step 3: Challenges and Additional Info
  const renderStep3 = () => (
    <div className="profile-step">
      <h3>אתגרים וחוזקות</h3>
      <div className="form-group">
        <label>אתגרים מרכזיים (הפרד בפסיקים)</label>
        <textarea
          value={childData.mainChallenges.join(', ')}
          onChange={(e) => handleArrayChange('mainChallenges', e.target.value)}
          placeholder="למשל: תקשורת, לימודים, זמן מסך, חברים, משמעת"
          rows="3"
        />
      </div>
      <div className="form-group">
        <label>חוזקות וכישורים (הפרד בפסיקים)</label>
        <textarea
          value={childData.strengths.join(', ')}
          onChange={(e) => handleArrayChange('strengths', e.target.value)}
          placeholder="למשל: יצירתיות, ספורט, מוזיקה, אמפתיה, חכמה"
          rows="3"
        />
      </div>
      <div className="form-group">
        <label>האם היה טיפול פסיכולוגי בעבר?</label>
        <select
          value={childData.previousTherapy}
          onChange={(e) => handleChildChange('previousTherapy', e.target.value === 'true')}
        >
          <option value="false">לא</option>
          <option value="true">כן</option>
        </select>
      </div>
      <div className="form-group">
        <label>מידע נוסף</label>
        <textarea
          value={childData.additionalInfo}
          onChange={(e) => handleChildChange('additionalInfo', e.target.value)}
          placeholder="כל מידע נוסף שחשוב לך לשתף..."
          rows="4"
        />
      </div>
    </div>
  );

  // Render progress indicator
  const renderProgress = () => (
    <div className="progress-indicator">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>
      <div className="progress-text">
        שלב {step} מתוך 3
      </div>
    </div>
  );

  return (
    <div className="profile-container">
      <h2>הגדרת פרופיל</h2>
      
      {renderProgress()}
      
      <div className="profile-content">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>

      <div className="form-buttons">
        {step > 1 && (
          <button 
            type="button" 
            className="secondary"
            onClick={prevStep}
          >
            הקודם
          </button>
        )}
        
        {step < 3 ? (
          <button 
            type="button" 
            className="primary"
            onClick={nextStep}
            disabled={!isStepValid()}
          >
            הבא
          </button>
        ) : (
          <button 
            type="button" 
            className="primary"
            onClick={handleSubmit}
          >
            סיום והתחלת שיחה
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;