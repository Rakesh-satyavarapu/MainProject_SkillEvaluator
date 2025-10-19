import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const GeneratedQuestionsPage = () => {
  const { state } = useLocation();
  const { skillId } = useParams();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="container mt-5 text-center">
        <h4>No data found. Please generate questions again.</h4>
        <button className="btn btn-secondary mt-3" onClick={() => navigate('/adminSkills')}>
          ⬅️ Back to Skills
        </button>
      </div>
    );
  }

  const { message, totalGenerated, totalAdded, data } = state;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>🧠 Generated Questions</h3>
        <button className="btn btn-outline-primary" onClick={() => navigate('/adminSkills')}>
          ⬅️ Back to Skills
        </button>
      </div>

      <div className="alert alert-success">
        <strong>{message}</strong>
        <br />
        <span>Total Generated: {totalGenerated}</span> |{' '}
        <span>Total Saved: {totalAdded}</span>
      </div>

      <div className="mt-4">
        {data.map((q, i) => (
          <div key={q._id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5>
                Q{i + 1}. {q.question}
              </h5>
              <ul className="mt-2">
                {q.options.map((opt, idx) => (
                  <li key={idx}>{opt}</li>
                ))}
              </ul>
              <p className="mt-2 text-success">
                ✅ <strong>Correct Answer:</strong> {q.correctAnswer}
              </p>
              <p className="text-muted small">
                🧩 Topic: {q.mainTopic} → {q.subTopic} → {q.topic} <br />
                🎯 Level: {q.level}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneratedQuestionsPage;
