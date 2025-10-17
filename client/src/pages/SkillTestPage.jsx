import React, { useState } from 'react';
import {axiosInstance} from '../lib/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSkillStore } from '../store/useSkillStore';

const SkillTestPage = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const { tests, takeTest, submitTest, getRegisteredSkill } = useSkillStore();

  const [answers, setAnswers] = useState({});

  const regSkill = getRegisteredSkill(skillId);
  const level = regSkill?.level;

  const currentTest = tests[skillId];
  const attemptId = currentTest?.attemptId;
  const questions = currentTest?.questions || [];

  const handleSelect = (qid, option) =>
    setAnswers((prev) => ({ ...prev, [qid]: option }));

  const handleSubmit = async () => {
    if (!attemptId || !Object.keys(answers).length)
      return alert('Please answer at least one question');
    await submitTest({ attemptId, answers, skillId });
    navigate(`/result/${skillId}`);
  };

  React.useEffect(() => {
    if (regSkill) takeTest({ skillId, level });
  }, [skillId, regSkill]);

  if (!regSkill) return <p>You’re not registered for this skill.</p>;
  if (!questions.length) return <p>Loading test questions...</p>;

  return (
    <div className="container mt-4">
      <h3>{regSkill.skillName || 'Skill'} Test - {level}</h3>
      {questions.map((q, idx) => (
        <div key={q._id} className="card p-3 mb-3 shadow-sm">
          <p><strong>{idx + 1}. {q.question}</strong></p>
          {q.options.map((opt) => (
            <button
              key={opt}
              className={`btn me-2 mt-2 ${answers[q._id] === opt ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleSelect(q._id, opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      ))}

      <button className="btn btn-success" onClick={handleSubmit}>
        Submit Test
      </button>
    </div>
  );
};

export default SkillTestPage;
