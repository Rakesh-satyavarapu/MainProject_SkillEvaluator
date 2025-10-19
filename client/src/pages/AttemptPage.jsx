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

  // ✅ Identify wrong answers (weak topics)
  const weakQuestions = questions.filter((q) => !q.isCorrect);
  const weakTopics = youtubeVideoLinks.filter((yt) =>
    weakQuestions.some(
      (q) =>
        q.questionId?.subTopic?.toLowerCase().trim() ===
        yt.topic.toLowerCase().trim()
    )
  );

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-3 text-center fw-bold">Attempt Details</h2>
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

      {/* ✅ Weak Topics with Embedded YouTube Videos */}
      {weakTopics.length > 0 && (
        <>
          <hr />
          <h4 className="mt-4 mb-3 text-center text-danger">
            Weak Topics & Recommended YouTube Videos
          </h4>
          <div className="d-flex flex-column gap-4">
            {weakTopics.map((topic, index) => (
              <div
                key={index}
                className="p-3 border rounded-3 shadow-sm bg-light"
              >
                <h5 className="fw-bold mb-3 text-primary">{topic.topic}</h5>

                {/* 🎥 Video Grid (2 per row on large screens) */}
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
                          paddingBottom: '56.25%', // 16:9 Aspect Ratio
                          height: 0,
                          overflow: 'hidden',
                          borderRadius: '12px',
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
                            borderRadius: '12px',
                          }}
                        ></iframe>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AttemptPage;
