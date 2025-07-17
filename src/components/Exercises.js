import React, { useState } from 'react';
import { findExerciseById } from '../data/exercises';

const Exercises = ({ exercises, childProfile }) => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [filter, setFilter] = useState('all');

  // Filter exercises based on selected filter
  const getFilteredExercises = () => {
    const exerciseList = Object.values(exercises);
    
    if (filter === 'all') {
      return exerciseList;
    }
    
    return exerciseList.filter(exercise => {
      switch (filter) {
        case 'communication':
          return exercise.id.includes('communication') || 
                 exercise.title.includes('תקשורת') || 
                 exercise.title.includes('הקשבה');
        case 'thoughts':
          return exercise.id.includes('thought') || 
                 exercise.title.includes('מחשבות') || 
                 exercise.title.includes('קוגניטיב');
        case 'emotions':
          return exercise.id.includes('emotion') || 
                 exercise.title.includes('רגש') || 
                 exercise.title.includes('הרפי');
        case 'problem_solving':
          return exercise.id.includes('problem') || 
                 exercise.title.includes('בעיות') || 
                 exercise.title.includes('פתרון');
        default:
          return true;
      }
    });
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'קלה':
        return '#4CAF50';
      case 'בינונית':
        return '#FF9800';
      case 'גבוהה':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  // Render exercise card
  const renderExerciseCard = (exercise) => (
    <div 
      key={exercise.id}
      className="exercise-card"
      onClick={() => setSelectedExercise(exercise)}
    >
      <div className="exercise-header">
        <h3>{exercise.title}</h3>
        <div className="exercise-meta">
          <span 
            className="difficulty"
            style={{ color: getDifficultyColor(exercise.difficulty) }}
          >
            {exercise.difficulty}
          </span>
          <span className="time">{exercise.timeRequired}</span>
        </div>
      </div>
      <p className="exercise-description">{exercise.shortDescription}</p>
      <div className="exercise-footer">
        <span className="read-more">לחץ לפרטים נוספים</span>
      </div>
    </div>
  );

  // Render detailed exercise view
  const renderExerciseDetail = (exercise) => (
    <div className="exercise-detail">
      <div className="exercise-detail-header">
        <button 
          className="back-button"
          onClick={() => setSelectedExercise(null)}
        >
          ← חזרה לרשימת התרגילים
        </button>
        <h2>{exercise.title}</h2>
      </div>

      <div className="exercise-info">
        <div className="info-item">
          <strong>זמן נדרש:</strong> {exercise.timeRequired}
        </div>
        <div className="info-item">
          <strong>רמת קושי:</strong> 
          <span 
            style={{ color: getDifficultyColor(exercise.difficulty) }}
          >
            {exercise.difficulty}
          </span>
        </div>
        {exercise.materials && (
          <div className="info-item">
            <strong>חומרים נדרשים:</strong> {exercise.materials.join(', ')}
          </div>
        )}
      </div>

      <div className="exercise-content">
        <section className="description-section">
          <h3>תיאור התרגיל</h3>
          <p>{exercise.longDescription}</p>
        </section>

        <section className="instructions-section">
          <h3>הוראות ביצוע</h3>
          <ol className="instructions-list">
            {exercise.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </section>

        {exercise.examples && exercise.examples.length > 0 && (
          <section className="examples-section">
            <h3>דוגמאות</h3>
            {exercise.examples.map((example, index) => (
              <div key={index} className="example-item">
                {typeof example === 'string' ? (
                  <p>{example}</p>
                ) : (
                  <div className="example-detailed">
                    {Object.entries(example).map(([key, value]) => (
                      <div key={key} className="example-field">
                        <strong>{key}:</strong> {value}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {exercise.scenarios && exercise.scenarios.length > 0 && (
          <section className="scenarios-section">
            <h3>תרחישים לתרגול</h3>
            {exercise.scenarios.map((scenario, index) => (
              <div key={index} className="scenario-item">
                <h4>תרחיש {index + 1}</h4>
                <p><strong>מצב:</strong> {scenario.scenarioDescription}</p>
                {scenario.reflectiveResponse && (
                  <p><strong>תגובה מומלצת:</strong> {scenario.reflectiveResponse}</p>
                )}
                {scenario.nonReflectiveResponse && (
                  <p><strong>תגובה לא מומלצת:</strong> {scenario.nonReflectiveResponse}</p>
                )}
                {scenario.explanation && (
                  <p><strong>הסבר:</strong> {scenario.explanation}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {exercise.tips && exercise.tips.length > 0 && (
          <section className="tips-section">
            <h3>טיפים חשובים</h3>
            <ul className="tips-list">
              {exercise.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </section>
        )}

        {exercise.template && (
          <section className="template-section">
            <h3>תבנית עבודה</h3>
            {exercise.template.columns && (
              <div className="template-columns">
                {exercise.template.columns.map((column, index) => (
                  <div key={index} className="template-column">
                    <strong>{column.title}:</strong>
                    <p>{column.description}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      <div className="exercise-actions">
        <button className="action-button primary">
          התחל תרגיל
        </button>
        <button className="action-button secondary">
          הורד תבנית
        </button>
      </div>
    </div>
  );

  return (
    <div className="exercises-container">
      {!selectedExercise ? (
        <>
          <div className="exercises-header">
            <h2>תרגילי CBT</h2>
            <p>תרגילים מעשיים לשיפור התקשורת והתמודדות עם אתגרים</p>
          </div>

          <div className="exercises-filters">
            <button 
              className={filter === 'all' ? 'filter-button active' : 'filter-button'}
              onClick={() => setFilter('all')}
            >
              הכל
            </button>
            <button 
              className={filter === 'communication' ? 'filter-button active' : 'filter-button'}
              onClick={() => setFilter('communication')}
            >
              תקשורת
            </button>
            <button 
              className={filter === 'thoughts' ? 'filter-button active' : 'filter-button'}
              onClick={() => setFilter('thoughts')}
            >
              מחשבות
            </button>
            <button 
              className={filter === 'emotions' ? 'filter-button active' : 'filter-button'}
              onClick={() => setFilter('emotions')}
            >
              רגשות
            </button>
            <button 
              className={filter === 'problem_solving' ? 'filter-button active' : 'filter-button'}
              onClick={() => setFilter('problem_solving')}
            >
              פתרון בעיות
            </button>
          </div>

          <div className="exercises-grid">
            {getFilteredExercises().map(exercise => renderExerciseCard(exercise))}
          </div>

          {getFilteredExercises().length === 0 && (
            <div className="no-exercises">
              <p>לא נמצאו תרגילים בקטגוריה זו</p>
            </div>
          )}
        </>
      ) : (
        renderExerciseDetail(selectedExercise)
      )}
    </div>
  );
};

export default Exercises;