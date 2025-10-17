import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axiosInstance from '../lib/axios';

const ResultPage = () => {
  const { skillId } = useParams();
  const location = useLocation();
  const { attemptId } = location.state || {};
  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (attemptId) fetchAttemptDetails();
  }, [attemptId]);

  const fetchAttemptDetails = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/user/attempt/${attemptId}`);
      setAttempt(res.data.attempt);
    } catch (err) {
      console.error("Failed to fetch attempt details:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="mt-4 text-center">Loading attempt...</p>;
  if (!attempt) return <p className="mt-4 text-center">No attempt found.</p>;

  return (
    <div className="container mt-5">
      <h2>Test Result</h2>
      <p><strong>Date:</strong> {new Date(attempt.takenAt).toLocaleString()}</p>
      <p><strong>Level:</strong> {attempt.level} | <strong>Score:</strong> {attempt.score}%</p>
      <hr />
      <h4>Questions & Answers:</h4>
      <div className="list-group">
        {attempt.questions.map((q, index) => (
          <div key={q._id} className="list-group-item">
            <p><strong>Q{index + 1}:</strong> {q.questionId.question}</p>
            <p>
              <strong>Your Answer:</strong> {q.selectedOption || "Not answered"}
            </p>
            <p>
              <strong>Correct Answer:</strong> {q.questionId.correctAnswer}
            </p>
            <p>
              <strong>Topic:</strong> {q.questionId.topic} | <strong>SubTopic:</strong> {q.questionId.subTopic}
            </p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultPage;
