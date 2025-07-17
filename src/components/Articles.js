import React, { useState } from 'react';
import { academicArticles, articleCategories } from '../data/articles';

const Articles = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter articles based on category and search term
  const getFilteredArticles = () => {
    let filtered = Object.values(academicArticles);

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => 
        article.category && article.category.includes(selectedCategory)
      );
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchLower) ||
        article.shortTitle.toLowerCase().includes(searchLower) ||
        article.summary.toLowerCase().includes(searchLower) ||
        article.researchers.toLowerCase().includes(searchLower) ||
        article.topics.some(topic => topic.toLowerCase().includes(searchLower))
      );
    }

    return filtered.sort((a, b) => b.year - a.year);
  };

  // Render article card
  const renderArticleCard = (article) => (
    <div 
      key={article.id}
      className="article-card"
      onClick={() => setSelectedArticle(article)}
    >
      <div className="article-header">
        <h3>{article.shortTitle}</h3>
        <div className="article-meta">
          <span className="year">{article.year}</span>
          <span className="category">{article.category}</span>
        </div>
      </div>
      <p className="article-authors">{article.researchers}</p>
      <p className="article-summary">{article.summary}</p>
      <div className="article-topics">
        {article.topics.map((topic, index) => (
          <span key={index} className="topic-tag">{topic}</span>
        ))}
      </div>
      <div className="article-footer">
        <span className="read-more">לחץ לפרטים נוספים</span>
      </div>
    </div>
  );

  // Render detailed article view
  const renderArticleDetail = (article) => (
    <div className="article-detail">
      <div className="article-detail-header">
        <button 
          className="back-button"
          onClick={() => setSelectedArticle(null)}
        >
          ← חזרה לרשימת המאמרים
        </button>
        <h2>{article.shortTitle}</h2>
      </div>

      <div className="article-info">
        <div className="info-section">
          <h3>פרטי המאמר</h3>
          <div className="info-item">
            <strong>כותרת מלאה:</strong> {article.title}
          </div>
          <div className="info-item">
            <strong>חוקרים:</strong> {article.researchers}
          </div>
          <div className="info-item">
            <strong>שנה:</strong> {article.year}
          </div>
          <div className="info-item">
            <strong>קטגוריה:</strong> {article.category}
          </div>
          {article.link && (
            <div className="info-item">
              <strong>קישור:</strong> 
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                צפה במאמר המקורי
              </a>
            </div>
          )}
        </div>

        <div className="info-section">
          <h3>נושאים</h3>
          <div className="topics-list">
            {article.topics.map((topic, index) => (
              <span key={index} className="topic-tag large">{topic}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="article-content">
        <section className="summary-section">
          <h3>סיכום</h3>
          <p>{article.summary}</p>
        </section>

        {article.methodology && (
          <section className="methodology-section">
            <h3>מתודולוגיה</h3>
            <p>{article.methodology}</p>
          </section>
        )}

        {article.keyFindings && article.keyFindings.length > 0 && (
          <section className="findings-section">
            <h3>ממצאים מרכזיים</h3>
            <ul className="findings-list">
              {article.keyFindings.map((finding, index) => (
                <li key={index}>{finding}</li>
              ))}
            </ul>
          </section>
        )}

        {article.practicalImplications && article.practicalImplications.length > 0 && (
          <section className="implications-section">
            <h3>השלכות מעשיות</h3>
            <ul className="implications-list">
              {article.practicalImplications.map((implication, index) => (
                <li key={index}>{implication}</li>
              ))}
            </ul>
          </section>
        )}

        {article.parentsGuide && (
          <section className="parents-guide-section">
            <h3>מדריך להורים</h3>
            
            {article.parentsGuide.signsToWatch && (
              <div className="guide-subsection">
                <h4>סימנים לתשומת לב</h4>
                <ul>
                  {article.parentsGuide.signsToWatch.map((sign, index) => (
                    <li key={index}>{sign}</li>
                  ))}
                </ul>
              </div>
            )}

            {article.parentsGuide.whenToSeekHelp && (
              <div className="guide-subsection">
                <h4>מתי לפנות לעזרה מקצועית</h4>
                <p>{article.parentsGuide.whenToSeekHelp}</p>
              </div>
            )}

            {article.parentsGuide.howToSupport && (
              <div className="guide-subsection">
                <h4>איך לתמוך</h4>
                <ul>
                  {article.parentsGuide.howToSupport.map((support, index) => (
                    <li key={index}>{support}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {article.practicalTools && article.practicalTools.length > 0 && (
          <section className="tools-section">
            <h3>כלים מעשיים</h3>
            <div className="tools-list">
              {article.practicalTools.map((tool, index) => (
                <div key={index} className="tool-item">
                  <strong>{tool.name}</strong>
                  {tool.link && (
                    <a href={tool.link} target="_blank" rel="noopener noreferrer">
                      לחץ לכלי
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {article.apaCitation && (
          <section className="citation-section">
            <h3>ציטוט APA</h3>
            <div className="citation-text">
              {article.apaCitation}
            </div>
          </section>
        )}

        {article.references && article.references.length > 0 && (
          <section className="references-section">
            <h3>מקורות</h3>
            <ul className="references-list">
              {article.references.map((reference, index) => (
                <li key={index}>{reference}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {article.connectedExercises && article.connectedExercises.length > 0 && (
        <div className="related-content">
          <h3>תרגילים קשורים</h3>
          <div className="related-exercises">
            {article.connectedExercises.map((exerciseId, index) => (
              <button key={index} className="related-button">
                {exerciseId}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="articles-container">
      {!selectedArticle ? (
        <>
          <div className="articles-header">
            <h2>מאמרים אקדמיים</h2>
            <p>מחקרים מבוססי ראיות על הורות למתבגרים וטיפול CBT</p>
          </div>

          <div className="articles-controls">
            <div className="search-section">
              <input
                type="text"
                placeholder="חיפוש מאמרים..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="category-filters">
              <button 
                className={selectedCategory === 'all' ? 'filter-button active' : 'filter-button'}
                onClick={() => setSelectedCategory('all')}
              >
                כל הקטגוריות
              </button>
              <button 
                className={selectedCategory === 'CBT' ? 'filter-button active' : 'filter-button'}
                onClick={() => setSelectedCategory('CBT')}
              >
                CBT למתבגרים
              </button>
              <button 
                className={selectedCategory === 'הורות' ? 'filter-button active' : 'filter-button'}
                onClick={() => setSelectedCategory('הורות')}
              >
                הורות למתבגרים
              </button>
              <button 
                className={selectedCategory === 'טיפול' ? 'filter-button active' : 'filter-button'}
                onClick={() => setSelectedCategory('טיפול')}
              >
                טיפול משפחתי
              </button>
              <button 
                className={selectedCategory === 'בריאות' ? 'filter-button active' : 'filter-button'}
                onClick={() => setSelectedCategory('בריאות')}
              >
                בריאות נפשית
              </button>
            </div>
          </div>

          <div className="articles-grid">
            {getFilteredArticles().map(article => renderArticleCard(article))}
          </div>

          {getFilteredArticles().length === 0 && (
            <div className="no-articles">
              <p>לא נמצאו מאמרים התואמים לחיפוש</p>
            </div>
          )}

          <div className="articles-stats">
            <p>מציג {getFilteredArticles().length} מאמרים מתוך {Object.keys(academicArticles).length}</p>
          </div>
        </>
      ) : (
        renderArticleDetail(selectedArticle)
      )}
    </div>
  );
};

export default Articles;