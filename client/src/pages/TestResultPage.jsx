import React from 'react';
import { useParams } from 'react-router-dom';
import { useSkillStore } from '../store/useSkillStore';

const TestResultPage = () => {
  const { skillId } = useParams();
  const { testResults } = useSkillStore();

  const result = testResults[skillId];

  if (!result)
    return <p className="mt-4 text-center">No result found for this test.</p>;

  return (
    <div className="result-container">
      <style>
        {`
          /* 🌟 Container Styling */
          .result-container {
            max-width: 1000px;
            margin: 50px auto;
            padding: 30px;
            background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
            border-radius: 20px;
            box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
            font-family: 'Poppins', sans-serif;
          }

          .result-container h2 {
            text-align: center;
            font-size: 2rem;
            font-weight: 800;
            color: #1e293b;
            margin-bottom: 20px;
          }

          .result-container p {
            font-size: 1rem;
            color: #374151;
            margin: 6px 0;
          }

          .result-container strong {
            color: #2563eb;
          }

          /* 🧾 Score Card Section */
          .score-card {
            background: linear-gradient(135deg, #e0f2fe, #dbeafe);
            border-radius: 16px;
            padding: 20px;
            text-align: center;
            box-shadow: 0 5px 18px rgba(37, 99, 235, 0.15);
            margin-bottom: 30px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .score-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 24px rgba(37, 99, 235, 0.25);
          }

          .score-value {
            font-size: 2rem;
            font-weight: 700;
            color: #1d4ed8;
          }

          /* 🧠 Weak Topics */
          .weak-topics {
            background: #fff;
            border-radius: 14px;
            padding: 20px;
            margin-bottom: 30px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
          }

          .weak-topics h4 {
            font-size: 1.3rem;
            color: #dc2626;
            font-weight: 700;
            margin-bottom: 15px;
          }

          .weak-topics ul {
            list-style: none;
            padding-left: 0;
          }

          .weak-topics li {
            background: #fee2e2;
            color: #991b1b;
            padding: 10px 14px;
            border-radius: 10px;
            margin-bottom: 10px;
            font-weight: 500;
            transition: all 0.2s ease;
          }

          .weak-topics li:hover {
            background: #fecaca;
          }

          /* 🎥 Video Section */
          .video-section {
            background: #ffffff;
            border-radius: 16px;
            padding: 25px;
            box-shadow: 0 5px 16px rgba(0,0,0,0.08);
          }

          .video-section h4 {
            color: #2563eb;
            text-align: center;
            font-weight: 700;
            margin-bottom: 20px;
          }

          .video-card {
            background: linear-gradient(135deg, #f8fafc, #f1f5f9);
            padding: 16px 20px;
            border-radius: 14px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.05);
            margin-bottom: 20px;
            transition: transform 0.25s ease;
          }

          .video-card:hover {
            transform: translateY(-3px);
          }

          .video-card h5 {
            font-size: 1.1rem;
            font-weight: 700;
            color: #1e3a8a;
            margin-bottom: 10px;
          }

          .video-card ul {
            list-style: none;
            padding-left: 10px;
          }

          .video-card li {
            margin-bottom: 6px;
          }

          .video-card a {
            color: #2563eb;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease;
          }

          .video-card a:hover {
            color: #1e40af;
            text-decoration: underline;
          }

          /* ✨ Animations */
          .result-container, .score-card, .weak-topics, .video-section {
            animation: fadeInUp 0.6s ease both;
          }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* 📱 Responsive Design */
          @media (max-width: 768px) {
            .result-container {
              padding: 20px;
              margin: 30px 12px;
            }

            .result-container h2 {
              font-size: 1.6rem;
            }

            .score-card {
              padding: 16px;
            }

            .video-card {
              padding: 14px;
            }
          }

          @media (max-width: 480px) {
            .result-container {
              margin: 20px 8px;
            }

            .result-container h2 {
              font-size: 1.4rem;
            }

            .score-value {
              font-size: 1.6rem;
            }
          }
        `}
      </style>

      <h2>Test Result</h2>

      <div className="score-card">
        <p>Score</p>
        <div className="score-value">{result.score}%</div>
        <p>
          Correct: {result.correctAnswers} / {result.totalQuestions}
        </p>
      </div>

      <div className="weak-topics">
        <h4>📉 Weak Topics</h4>
        <ul>
          {result.weakTopics.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>

      <div className="video-section">
        <h4>🎥 Recommended Videos</h4>
        {result.youtubeVideoLinks.map((v) => (
          <div key={v.topic} className="video-card">
            <h5>{v.topic}</h5>
            <ul>
              {v.links.map((l, i) => (
                <li key={i}>
                  <a href={l} target="_blank" rel="noopener noreferrer">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestResultPage;
