import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import components
import Chat from './components/Chat';
import Profile from './components/Profile';
import Articles from './components/Articles';
import Exercises from './components/Exercises';

// Import data
import { structuredDialogues } from './data/dialogues';
import { cbtExercises } from './data/exercises';

function App() {
  const [user, setUser] = useState(null);
  const [childProfile, setChildProfile] = useState(null);
  const [currentPage, setCurrentPage] = useState('chat');

  // Load user data from localStorage on startup
  useEffect(() => {
    const savedUser = localStorage.getItem('cbt_user');
    const savedProfile = localStorage.getItem('cbt_child_profile');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedProfile) {
      setChildProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Save user data to localStorage
  const saveUserData = (userData) => {
    setUser(userData);
    localStorage.setItem('cbt_user', JSON.stringify(userData));
  };

  // Save child profile to localStorage
  const saveChildProfile = (profileData) => {
    setChildProfile(profileData);
    localStorage.setItem('cbt_child_profile', JSON.stringify(profileData));
  };

  // Navigation component
  const Navigation = () => (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <h2>CBT Bot - ליווי הורים</h2>
        </div>
        <div className="nav-links">
          <button 
            className={currentPage === 'chat' ? 'nav-link active' : 'nav-link'}
            onClick={() => setCurrentPage('chat')}
          >
            שיחה
          </button>
          <button 
            className={currentPage === 'exercises' ? 'nav-link active' : 'nav-link'}
            onClick={() => setCurrentPage('exercises')}
          >
            תרגילים
          </button>
          <button 
            className={currentPage === 'articles' ? 'nav-link active' : 'nav-link'}
            onClick={() => setCurrentPage('articles')}
          >
            מאמרים
          </button>
          <button 
            className={currentPage === 'profile' ? 'nav-link active' : 'nav-link'}
            onClick={() => setCurrentPage('profile')}
          >
            פרופיל
          </button>
        </div>
      </div>
    </nav>
  );

  // Welcome screen for new users
  const WelcomeScreen = () => (
    <div className="welcome-screen">
      <div className="welcome-container">
        <h1>ברוכים הבאים לבוט CBT</h1>
        <p>המערכת מספקת ליווי מקצועי להורים של מתבגרים</p>
        <div className="welcome-features">
          <div className="feature">
            <h3>שיחות מובנות</h3>
            <p>דיאלוגים טיפוליים המבוססים על גישת CBT</p>
          </div>
          <div className="feature">
            <h3>תרגילים מעשיים</h3>
            <p>כלים לשיפור תקשורת והתמודדות עם אתגרים</p>
          </div>
          <div className="feature">
            <h3>מאמרים אקדמיים</h3>
            <p>מידע מבוסס מחקר על הורות למתבגרים</p>
          </div>
        </div>
        <button 
          className="start-button"
          onClick={() => setCurrentPage('profile')}
        >
          בואו נתחיל
        </button>
      </div>
    </div>
  );

  // Main app content
  const renderPage = () => {
    switch (currentPage) {
      case 'chat':
        return (
          <Chat 
            user={user} 
            childProfile={childProfile}
            dialogues={structuredDialogues}
          />
        );
      case 'exercises':
        return (
          <Exercises 
            exercises={cbtExercises}
            childProfile={childProfile}
          />
        );
      case 'articles':
        return <Articles />;
      case 'profile':
        return (
          <Profile 
            user={user}
            childProfile={childProfile}
            onSaveUser={saveUserData}
            onSaveProfile={saveChildProfile}
            onComplete={() => setCurrentPage('chat')}
          />
        );
      default:
        return <Chat user={user} childProfile={childProfile} />;
    }
  };

  return (
    <div className="App">
      <div className="app-container">
        {!user || !childProfile ? (
          <WelcomeScreen />
        ) : (
          <>
            <Navigation />
            <main className="main-content">
              {renderPage()}
            </main>
          </>
        )}
      </div>
    </div>
  );
}

export default App;