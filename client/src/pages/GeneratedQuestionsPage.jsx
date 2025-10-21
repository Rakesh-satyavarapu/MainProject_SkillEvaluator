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
        <button className="btn btn-secondary mt-3" onClick={() => navigate('/admin/skills')}>
          ⬅️ Back to Skills
        </button>

        <style>{`
          .container {
            padding: 15px;
            max-width: 900px;
            margin: auto;
          }
          h4 {
            font-size: 1.3rem;
            color: #555;
          }
          .btn {
            padding: 8px 16px;
            font-size: 0.95rem;
          }

          @media (max-width: 768px) {
            h4 {
              font-size: 1.1rem;
            }
            .btn {
              padding: 6px 12px;
              font-size: 0.9rem;
            }
          }
        `}</style>
      </div>
    );
  }

  const { message, totalGenerated, totalAdded, data } = state;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>🧠 Generated Questions</h3>
        <button className="btn btn-outline-primary" onClick={() => navigate('/admin/skills')}>
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

      <style>{`
        .container {
          padding: 15px;
          max-width: 900px;
          margin: auto;
        }

        h3 {
          font-size: 1.8rem;
          color: #333;
        }

        .btn-outline-primary {
          padding: 8px 16px;
          font-size: 0.95rem;
        }

        .alert-success {
          background-color: #e6ffed;
          color: #276749;
          border: 1px solid #c6f6d5;
          padding: 12px 20px;
          border-radius: 8px;
        }

        .card {
          border-radius: 12px;
          transition: transform 0.2s ease;
        }

        .card:hover {
          transform: translateY(-3px);
        }

        h5 {
          font-size: 1.1rem;
          color: #222;
        }

        ul {
          padding-left: 20px;
        }

        li {
          margin-bottom: 6px;
        }

        p.text-success {
          font-weight: 500;
        }

        p.text-muted {
          font-size: 0.85rem;
          color: #6c757d;
        }

        @media (max-width: 768px) {
          h3 {
            font-size: 1.5rem;
          }
          h5 {
            font-size: 1rem;
          }
          .btn-outline-primary {
            padding: 6px 12px;
            font-size: 0.9rem;
          }
          .alert-success {
            font-size: 0.9rem;
            padding: 10px 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default GeneratedQuestionsPage;
