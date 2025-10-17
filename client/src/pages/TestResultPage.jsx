import React from 'react';
import { useParams } from 'react-router-dom';
import { useSkillStore } from '../store/useSkillStore';

const TestResultPage = () => {
  const { skillId } = useParams();
  const { testResults } = useSkillStore();

  const result = testResults[skillId];

  if (!result) return <p className="mt-4 text-center">No result found for this test.</p>;

  return (
    <div className="container mt-5">
      <h2>Test Result</h2>
      <p>Score: <strong>{result.score}%</strong></p>
      <p>Correct: {result.correctAnswers} / {result.totalQuestions}</p>

      <h4 className="mt-4">📉 Weak Topics</h4>
      <ul>
        {result.weakTopics.map((t) => <li key={t}>{t}</li>)}
      </ul>

      <h4 className="mt-4">🎥 Recommended Videos</h4>
      {result.youtubeVideoLinks.map((v) => (
        <div key={v.topic} className="mb-3">
          <h5>{v.topic}</h5>
          <ul>
            {v.links.map((l, i) => (
              <li key={i}>
                <a href={l} target="_blank" rel="noopener noreferrer">{l}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TestResultPage;
