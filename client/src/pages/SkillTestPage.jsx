import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSkillStore } from "../store/useSkillStore";

const SkillTestPage = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const { tests, takeTest, submitTest, getRegisteredSkill } = useSkillStore();

  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [submitted, setSubmitted] = useState(false);

  const regSkill = getRegisteredSkill(skillId);
  const level = regSkill?.level;
  const currentTest = tests[skillId];
  const attemptId = currentTest?.attemptId;
  const questions = currentTest?.questions || [];

  // ✅ Handle Option Selection
  const handleSelect = (qid, option) =>
    setAnswers((prev) => ({ ...prev, [qid]: option }));

  // ✅ Handle Submit
  const handleSubmit = async () => {
    if (submitted) return;
    setSubmitted(true);
    if (!attemptId || !Object.keys(answers).length)
      return alert("Please answer at least one question.");
    await submitTest({ attemptId, answers, skillId });
    navigate(`/result/${skillId}`);
  };

  // 🕒 Timer Countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      alert("⏰ Time’s up! Submitting your test automatically.");
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // ⏱ Format Time MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // 🎯 Fetch Test on Load
  useEffect(() => {
    if (regSkill) takeTest({ skillId, level });
  }, [skillId, regSkill]);

  if (!regSkill)
    return <p className="text-center mt-5">You’re not registered for this skill.</p>;
  if (!questions.length)
    return <p className="text-center mt-5">Loading test questions...</p>;

  return (
    <div className="skilltest-container w-90 position-relative">
      <style>
        {`
          /* 🕒 Floating Timer (Top Right) */
          .timer-floating {
            position: fixed;
            top: 70px; /* below navbar */
            right: 30px;
            background: linear-gradient(135deg, #2563eb, #1e40af);
            color: white;
            font-size: 1rem;
            font-weight: 600;
            padding: 10px 18px;
            border-radius: 10px;
            z-index: 2000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          }

          /* 🎨 Main Container */
          .skilltest-container {
            width: 90%;
            max-width: 1000px;
            margin: 100px auto 50px;
            padding: 20px;
            background: #f9fafb;
            border-radius: 16px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.08);
            font-family: 'Poppins', sans-serif;
          }

          /* 📋 Question Card */
          .question-card {
            width: 100%;
            background: #fff;
            border-radius: 14px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 3px 8px rgba(0,0,0,0.08);
            padding: 20px 25px;
            margin-bottom: 25px;
            transition: all 0.25s ease-in-out;
          }

          .question-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 14px rgba(0,0,0,0.1);
          }

          .question-text {
            font-size: 1.05rem;
            color: #1e293b;
            font-weight: 500;
            margin-bottom: 15px;
          }

          /* ✅ Submit Button */
          .btn-submit {
            display: block;
            margin: 40px auto 0;
            background: linear-gradient(135deg, #16a34a, #15803d);
            border: none;
            color: white;
            font-weight: 600;
            font-size: 1.1rem;
            padding: 12px 30px;
            border-radius: 12px;
            box-shadow: 0 6px 16px rgba(22,163,74,0.3);
            transition: all 0.25s ease-in-out;
          }

          .btn-submit:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 22px rgba(22,163,74,0.4);
          }

          /* 📱 Responsive */
          @media (max-width: 768px) {
            .skilltest-container {
              width: 95%;
              padding: 15px;
            }
            .timer-floating {
              top: 60px;
              right: 10px;
              font-size: 0.9rem;
              padding: 8px 12px;
            }
            .btn-submit {
              width: 100%;
            }
          }
        `}
      </style>

      {/* 🕒 Floating Timer */}
      <div className="timer-floating">
        ⏰ Time Left: {formatTime(timeLeft)}
      </div>

      {/* 🧠 Test Header */}
      <h3 className="text-center fw-bold mb-4">
        {regSkill.skillName || "Skill"} Test - {level}
      </h3>

      {/* 📋 Questions */}
      {questions.map((q, idx) => (
        <div key={q._id} className="question-card">
          <p className="question-text">
            <strong>{idx + 1}. {q.question}</strong>
          </p>
          {q.options.map((opt, i) => (
            <div className="form-check mb-2" key={i}>
              <input
                type="radio"
                id={`${q._id}-${i}`}
                name={q._id}
                value={opt}
                checked={answers[q._id] === opt}
                onChange={() => handleSelect(q._id, opt)}
                className="form-check-input"
              />
              <label htmlFor={`${q._id}-${i}`} className="form-check-label">
                {opt}
              </label>
            </div>
          ))}
        </div>
      ))}

      {/* ✅ Submit */}
      <button className="btn btn-submit" onClick={handleSubmit}>
        Submit Test
      </button>
    </div>
  );
};

export default SkillTestPage;
