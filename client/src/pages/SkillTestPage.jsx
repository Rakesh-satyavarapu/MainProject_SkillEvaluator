import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../lib/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSkillStore } from '../store/useSkillStore';

const SkillTestPage = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const { tests, takeTest, submitTest, getRegisteredSkill } = useSkillStore();

  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes = 1800 seconds

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

  // 🕒 Timer countdown logic
  useEffect(() => {
    if (timeLeft <= 0) {
      alert('⏰ Time’s up! Submitting your test automatically.');
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // 🧮 Format timer display (MM:SS)
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (regSkill) takeTest({ skillId, level });
  }, [skillId, regSkill]);

  if (!regSkill) return <p>You’re not registered for this skill.</p>;
  if (!questions.length) return <p>Loading test questions...</p>;

  return (
    <div className="skilltest-container">
      <style>
        {`
          /* 🎨 Global Layout */
          .skilltest-container {
            max-width: 1000px;
            margin: 40px auto;
            padding: 25px;
            background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
            border-radius: 18px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
            font-family: 'Poppins', sans-serif;
          }

          .skilltest-container h3 {
            text-align: center;
            font-weight: 800;
            color: #1e293b;
            margin-bottom: 25px;
            font-size: 1.8rem;
          }

          /* ⏰ Timer Box */
          .timer-box {
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #1e40af, #2563eb);
            color: white;
            font-size: 1.2rem;
            font-weight: 600;
            border-radius: 12px;
            padding: 10px 20px;
            margin: 0 auto 25px;
            width: fit-content;
            box-shadow: 0 5px 15px rgba(37,99,235,0.3);
            animation: pulse 1.5s infinite;
          }

          @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 rgba(37,99,235,0.4); }
            50% { transform: scale(1.03); box-shadow: 0 0 15px rgba(37,99,235,0.6); }
            100% { transform: scale(1); box-shadow: 0 0 0 rgba(37,99,235,0.4); }
          }

          /* 🧠 Question Card */
          .card {
            background: #ffffff;
            border-radius: 16px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 3px 8px rgba(0,0,0,0.06);
            padding: 20px 25px;
            transition: transform 0.2s ease, box-shadow 0.3s ease;
          }

          .card:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.08);
          }

          .card p {
            font-size: 1.05rem;
            color: #334155;
            margin-bottom: 12px;
          }

          /* 🧩 Option Buttons */
          .btn {
            font-size: 0.95rem;
            border-radius: 12px;
            padding: 10px 16px;
            transition: all 0.2s ease-in-out;
            min-width: 120px;
          }

          .btn-outline-primary {
            background: #f8fafc;
            border: 2px solid #3b82f6;
            color: #2563eb;
          }

          .btn-outline-primary:hover {
            background: #3b82f6;
            color: white;
            box-shadow: 0 3px 10px rgba(59,130,246,0.3);
          }

          .btn-primary {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            border: none;
            color: white;
            box-shadow: 0 4px 12px rgba(37,99,235,0.3);
          }

          .btn-primary:hover {
            background: linear-gradient(135deg, #1d4ed8, #1e40af);
            box-shadow: 0 6px 18px rgba(30,64,175,0.4);
          }

          /* ✅ Submit Button */
          .btn-success {
            display: block;
            margin: 30px auto 0;
            background: linear-gradient(135deg, #16a34a, #15803d);
            border: none;
            color: white;
            font-weight: 600;
            font-size: 1.1rem;
            padding: 12px 25px;
            border-radius: 14px;
            box-shadow: 0 6px 16px rgba(22,163,74,0.3);
            transition: all 0.25s ease-in-out;
          }

          .btn-success:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 22px rgba(22,163,74,0.4);
          }

          /* 🌈 Animations */
          .card, .btn {
            animation: fadeInUp 0.5s ease both;
          }

          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(15px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          /* 📱 Responsive Design */
          @media (max-width: 768px) {
            .skilltest-container {
              padding: 18px;
            }

            .timer-box {
              font-size: 1rem;
              padding: 8px 16px;
            }

            .card {
              padding: 15px 18px;
            }

            .btn {
              display: block;
              width: 100%;
              margin-top: 8px;
            }

            .btn-success {
              width: 100%;
              margin-top: 20px;
            }

            h3 {
              font-size: 1.4rem;
            }
          }

          @media (max-width: 480px) {
            .skilltest-container {
              margin: 20px 10px;
            }

            .btn {
              font-size: 0.9rem;
            }

            .card p {
              font-size: 0.95rem;
            }
          }
        `}
      </style>

      <h3>{regSkill.skillName || 'Skill'} Test - {level}</h3>

      {/* ⏱ Timer Display */}
      <div className="timer-box">⏰ Time Left: {formatTime(timeLeft)}</div>

      {questions.map((q, idx) => (
        <div key={q._id} className="card p-3 mb-3 shadow-sm">
          <p><strong>{idx + 1}. {q.question}</strong></p>
          {q.options.map((opt) => (
            <button
              key={opt}
              className={`btn me-2 mt-2 ${
                answers[q._id] === opt ? 'btn-primary' : 'btn-outline-primary'
              }`}
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
