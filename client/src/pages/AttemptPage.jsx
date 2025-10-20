import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSkillStore } from '../store/useSkillStore';

const AttemptPage = () => {
  const { attemptId } = useParams();
  const { fetchAttemptById, attempts, isLoading } = useSkillStore();

  const attempt = attempts[attemptId];

  useEffect(() => {
    if (!attempt) {
      fetchAttemptById(attemptId);
    }
  }, [attemptId]);

  if (isLoading && !attempt)
    return <p className="mt-4 text-center">Loading attempt details...</p>;
  if (!attempt)
    return <p className="mt-4 text-center">No attempt found.</p>;

  const { questions, level, score, takenAt, youtubeVideoLinks = [] } = attempt;

  const weakQuestions = questions.filter((q) => !q.isCorrect);
  const weakTopics = youtubeVideoLinks.filter((yt) =>
    weakQuestions.some(
      (q) =>
        q.questionId?.subTopic?.toLowerCase().trim() ===
        yt.topic.toLowerCase().trim()
    )
  );

  return (
    <div className="attempt-container">
      <style>
        {`
          .attempt-container {
            max-width: 1100px;
            margin: 40px auto;
            padding: 25px;
            background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
            border-radius: 18px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
          }

          .attempt-container h2 {
            text-align: center;
            font-weight: 800;
            color: #333;
            margin-bottom: 20px;
          }

          .attempt-container p {
            color: #444;
            font-size: 1rem;
            margin-bottom: 6px;
          }

          .list-group {
            display: flex;
            flex-direction: column;
            gap: 18px;
          }

          .list-group-item {
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 14px;
            padding: 16px 20px;
            box-shadow: 0 3px 8px rgba(0,0,0,0.05);
            transition: transform 0.2s ease, box-shadow 0.3s ease;
          }

          .list-group-item:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          }

          .list-group-item strong {
            color: #1e293b;
          }

          ul {
            list-style: none;
            padding-left: 10px;
            margin-top: 10px;
          }

          ul li {
            margin-bottom: 4px;
            padding: 6px 10px;
            border-radius: 6px;
            transition: background 0.2s ease;
          }

          ul li:hover {
            background: rgba(0,0,0,0.05);
          }

          .text-success {
            color: #16a34a !important;
            font-weight: 600;
          }

          .text-danger {
            color: #dc2626 !important;
            font-weight: 600;
          }

          .fw-bold {
            font-weight: 700;
          }

          .weak-topics-section {
            margin-top: 40px;
            background: #fff;
            border-radius: 16px;
            padding: 25px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.08);
          }

          .weak-topics-section h4 {
            text-align: center;
            font-weight: 800;
            color: #dc2626;
            margin-bottom: 25px;
          }

          .topic-card {
            background: linear-gradient(135deg, #f8fafc, #f1f5f9);
            border-radius: 14px;
            padding: 20px;
            border: 1px solid #e5e7eb;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          }

          .topic-card h5 {
            color: #2563eb;
            margin-bottom: 15px;
            font-weight: 700;
          }

          iframe {
            border-radius: 12px;
            box-shadow: 0 3px 12px rgba(0,0,0,0.15);
          }

          @media (max-width: 768px) {
            .attempt-container {
              padding: 16px;
            }

            .list-group-item {
              padding: 14px;
            }

            .topic-card h5 {
              font-size: 1rem;
            }

            iframe {
              width: 100%;
              height: auto;
            }
          }

          @media (max-width: 480px) {
            .attempt-container h2 {
              font-size: 1.4rem;
            }

            ul li {
              font-size: 0.9rem;
            }

            p, strong {
              font-size: 0.9rem;
            }
          }
        `}
      </style>

      <h2>Attempt Details</h2>
      <p><strong>Date:</strong> {new Date(takenAt).toLocaleString()}</p>
      <p><strong>Level:</strong> {level}</p>
      <p><strong>Score:</strong> {score}%</p>
      <hr />

      <h4>Questions & Answers</h4>
      <div className="list-group mb-4">
        {questions
          .filter((q) => q.questionId)
          .map((q, index) => (
            <div key={q._id} className="list-group-item">
              <p><strong>Q{index + 1}:</strong> {q.questionId.question}</p>
              <ul>
                {q.questionId.options.map((opt, i) => (
                  <li
                    key={i}
                    className={
                      opt === q.questionId.correctAnswer
                        ? 'text-success fw-bold'
                        : opt === q.selectedAnswer && !q.isCorrect
                        ? 'text-danger'
                        : ''
                    }
                  >
                    {opt}
                  </li>
                ))}
              </ul>
              <p>
                <strong>SubTopic:</strong> {q.questionId.subTopic}{' '}
                {q.isCorrect ? (
                  <span className="text-success">(Correct)</span>
                ) : (
                  <span className="text-danger">(Wrong)</span>
                )}
              </p>
            </div>
          ))}
      </div>

      {weakTopics.length > 0 && (
        <div className="weak-topics-section">
          <h4>Weak Topics & Recommended YouTube Videos</h4>
          <div className="d-flex flex-column gap-4">
            {weakTopics.map((topic, index) => (
              <div key={index} className="topic-card">
                <h5>{topic.topic}</h5>

                <div
                  className="d-grid gap-3"
                  style={{
                    gridTemplateColumns:
                      'repeat(auto-fit, minmax(320px, 1fr))',
                  }}
                >
                  {topic.links.map((link, i) => {
                    const embedUrl = link.replace('watch?v=', 'embed/');
                    return (
                      <div
                        key={i}
                        style={{
                          position: 'relative',
                          paddingBottom: '56.25%',
                          height: 0,
                          overflow: 'hidden',
                        }}
                      >
                        <iframe
                          src={embedUrl}
                          title={`${topic.topic}-video-${i}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                          }}
                        ></iframe>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttemptPage;
