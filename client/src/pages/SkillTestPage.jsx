import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSkillStore } from "../store/useSkillStore";

const SkillTestPage = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const { tests, takeTest, submitTest, getRegisteredSkill } = useSkillStore();

  const [answers, setAnswers] = useState({});
  const [markedQuestions, setMarkedQuestions] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const regSkill = getRegisteredSkill(skillId);
  const level = regSkill?.level;
  const currentTest = tests[skillId];
  const attemptId = currentTest?.attemptId;
  const questions = currentTest?.questions || [];

  // ✅ Handle Option Selection
  const handleSelect = (qid, option) =>
    setAnswers((prev) => ({ ...prev, [qid]: option }));

  // ✅ Handle Mark for Review
  const toggleMarkForReview = (qid) => {
    setMarkedQuestions((prev) => {
      const newSet = new Set(prev);
      newSet.has(qid) ? newSet.delete(qid) : newSet.add(qid);
      return newSet;
    });
  };

  // ✅ Handle Submit
  const handleSubmit = async () => {
    if (submitted || isSubmitting) return;
    if (!attemptId) {
      alert("Invalid test attempt.");
      return;
    }
    if (!Object.keys(answers).length) {
      if (!window.confirm("You haven’t answered any questions. Submit anyway?")) return;
    }

    setIsSubmitting(true);
    try {
      await submitTest({ attemptId, answers, skillId });
      setSubmitted(true);
      navigate(`/result/${skillId}`);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while submitting your test.");
    } finally {
      setIsSubmitting(false);
    }
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

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (regSkill) takeTest({ skillId, level });
  }, [skillId, regSkill]);

  if (!regSkill)
    return <p className="text-center mt-5">You’re not registered for this skill.</p>;
  if (!questions.length)
    return <p className="text-center mt-5">Loading test questions...</p>;

  return (
    <div className="exam-wrapper">
      <style>
        {`
          .exam-wrapper {
            background: #f5f6fa;
            min-height: 100vh;
            padding-top: 100px;
            font-family: 'Inter', 'Poppins', sans-serif;
          }

          /* 🕒 Timer floating below navbar */
          .timer-floating {
            position: fixed;
            top: 85px;
            right: 30px;
            background: #1e3a8a;
            color: white;
            font-size: 0.95rem;
            font-weight: 600;
            padding: 10px 18px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 2000;
          }

          /* 📋 Main container */
          .exam-container {
            width: 92%;
            max-width: 1200px;
            margin: 0 auto;
            background: transparent;
            padding: 30px 0 100px;
          }

          /* Header */
          .exam-header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 15px;
          }

          .exam-header h2 {
            font-weight: 700;
            color: #0f172a;
          }

          .exam-header p {
            color: #64748b;
            margin-top: 6px;
          }

          /* 🧠 Question Card */
          .question-card {
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            background: #ffffff;
            padding: 20px 25px;
            margin-bottom: 22px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
            transition: all 0.25s ease;
          }

          .question-card.marked {
            border: 2px solid #facc15;
            background: #fffbea;
          }

          .question-card:hover {
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
          }

          .question-text {
            font-weight: 600;
            margin-bottom: 12px;
            color: #1e293b;
          }

          .form-check {
            padding: 6px 10px;
            border-radius: 8px;
            transition: background 0.2s;
          }

          .form-check:hover {
            background: #e0f2fe;
          }

          .form-check-input {
            margin-right: 10px;
            accent-color: #2563eb;
          }

          .form-check-label {
            color: #334155;
            font-size: 0.95rem;
            cursor: pointer;
          }

          /* ⭐ Mark for Review */
          .mark-review-btn {
            background: none;
            border: none;
            color: #b45309;
            font-weight: 600;
            cursor: pointer;
            margin-top: 8px;
            font-size: 0.9rem;
            transition: color 0.2s;
          }

          .mark-review-btn:hover {
            color: #92400e;
          }

          /* ✅ Submit Button at End */
          .btn-submit {
            display: block;
            margin: 40px auto 0;
            background: #2563eb;
            color: white;
            font-weight: 600;
            font-size: 1rem;
            padding: 14px 32px;
            border-radius: 12px;
            border: none;
            box-shadow: 0 6px 16px rgba(37,99,235,0.3);
            transition: all 0.25s ease;
          }

          .btn-submit:hover {
            background: #1e40af;
            transform: translateY(-2px);
          }

          .btn-submit:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .spinner {
            border: 3px solid rgba(255,255,255,0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            animation: spin 0.8s linear infinite;
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @media (max-width: 768px) {
            .exam-container {
              width: 96%;
              padding: 20px 0 80px;
            }
            .timer-floating {
              top: 70px;
              right: 10px;
              font-size: 0.85rem;
            }
          }
        `}
      </style>

      {/* 🕒 Timer */}
      <div className="timer-floating">⏰ Time Left: {formatTime(timeLeft)}</div>

      {/* 📘 Exam Header */}
      <div className="exam-container">
        <div className="exam-header">
          <h2>{regSkill.skillName || "Skill"} Assessment</h2>
          <p>Level: {level?.toUpperCase()} • Duration: 30 mins</p>
        </div>

        {/* 🧠 Questions */}
        {questions.map((q, idx) => (
          <div
            key={q._id}
            className={`question-card ${
              markedQuestions.has(q._id) ? "marked" : ""
            }`}
          >
            <p className="question-text">
              {idx + 1}. {q.question}
            </p>
            {q.options.map((opt, i) => (
              <div className="form-check" key={i}>
                <input
                  type="radio"
                  id={`${q._id}-${i}`}
                  name={q._id}
                  value={opt}
                  checked={answers[q._id] === opt}
                  onChange={() => handleSelect(q._id, opt)}
                  className="form-check-input"
                  disabled={isSubmitting}
                />
                <label htmlFor={`${q._id}-${i}`} className="form-check-label">
                  {opt}
                </label>
              </div>
            ))}

            {/* ⭐ Mark for Review Button */}
            <button
              type="button"
              className="mark-review-btn"
              onClick={() => toggleMarkForReview(q._id)}
            >
              {markedQuestions.has(q._id) ? "★ Marked for Review" : "☆ Mark for Review"}
            </button>
          </div>
        ))}

        {/* ✅ Submit Button at End */}
        <button
          className="btn-submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span> Submitting...
            </>
          ) : (
            "Submit Test"
          )}
        </button>
      </div>
    </div>
  );
};

export default SkillTestPage;
