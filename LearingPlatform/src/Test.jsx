import React, { useState } from "react";
import "./index.css";

function Test() {
  const subjects = {
    tamil: [
  {question: "1. 'அம்மா' என்ற சொல்லில் எத்தனை எழுத்துகள் உள்ளன?",options: ["2", "3", "4", "5"],answer: "3",},
  {question: "2. தமிழ் எழுத்துக்கள் மொத்தம் எத்தனை?",options: ["216", "247", "256", "200"],answer: "247",},
  {question: "3. 'குயில்' எந்த வகை பறவை?",options: ["கீதப்பறவை", "கழுகு", "காகம்", "குருவி"],answer: "கீதப்பறவை",},
  {question: "4. திருக்குறளை இயற்றியவர் யார்?",options: ["கம்பர்", "திருவள்ளுவர்", "அவையார்", "இளங்கோவடிகள்"],answer: "திருவள்ளுவர்",},
  {question: "5. 'தமிழ் தந்தை' என்று அழைக்கப்படுபவர் யார்?",options: ["பெரியார்", "திருவள்ளுவர்", "உமாபதி சிவாச்சாரியார்", "மரையமலை அடிகள்"],answer: "மரையமலை அடிகள்",},
],
    english: [
      {question: "1. What is the opposite of 'Hot'?", options: ["Cold", "Warm", "Heat", "Boil"], answer: "Cold" },
      {question: "2. Plural of 'Child' is?", options: ["Childs", "Children", "Childes", "Childer"], answer: "Children" },
      {question: "3. Which is a noun?",options: ["Run", "Beautiful", "Book", "Quickly"],answer: "Book",},
      {question: "4. Who is the author of 'Romeo and Juliet'?",options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],answer: "William Shakespeare",},
      {question: "5. Fill in the blank: She ____ to school every day.",options: ["go", "goes", "going", "gone"],answer: "goes",},
    ],
    maths: [
      {question: "1. What is 9 × 6?", options: ["45", "54", "56", "64"], answer: "54" },
      {question: "2. What is 144 ÷ 12?", options: ["10", "11", "12", "14"], answer: "12" },
      {question: "3. Which is a prime number?",options: ["21", "33", "29", "35"],answer: "29",},
      {question: "4. What is the square of 12?",options: ["124", "122", "144", "132"],answer: "144",},
      {question: "5. What is 7 × 8?",options: ["54", "56", "64", "58"],answer: "56",},
    ],
    science: [
      {question: "1. Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
      {question: "2. H2O is the chemical formula of?", options: ["Salt", "Water", "Oxygen", "Hydrogen"], answer: "Water" },
      {question: "3. Which gas do humans exhale during breathing?",options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],answer: "Carbon dioxide",},
      {question: "4. Which part of the plant makes food?",options: ["Root", "Stem", "Leaf", "Flower"], answer: "Leaf",},
      {question: "5. The Sun is a?",options: ["Planet", "Star", "Satellite", "Asteroid"],answer: "Star",},
    ],
    social: [
      {question: "1. Who is called the Father of the Nation (India)?", options: ["Nehru", "Gandhi", "Bose", "Tagore"], answer: "Gandhi" },
      {question: "2. Which is the capital of Tamil Nadu?", options: ["Madurai", "Chennai", "Coimbatore", "Trichy"], answer: "Chennai" },
      {question: "3. Who was the first President of India?",options: ["Dr. B. R. Ambedkar", "Dr. Rajendra Prasad", "Jawaharlal Nehru", "Sarvepalli Radhakrishnan"],answer: "Dr. Rajendra Prasad",},
      {question: "4. In which year did India get Independence?",options: ["1942", "1945", "1947", "1950"],answer: "1947",},
      {question: "5. The Himalayas are located in which part of India?",options: ["North", "South", "East", "West"],answer: "North",},
    ],
    physics: [
  {question: "1. What is the SI unit of force?",options: ["Joule", "Newton", "Watt", "Pascal"],answer: "Newton",},
  {question: "2. Which force pulls objects towards the Earth?",options: ["Magnetic force", "Friction force", "Gravitational force", "Electric force"],answer: "Gravitational force",},
  {question: "3. What is the speed of light?",options: ["3 × 10⁶ m/s", "3 × 10⁸ m/s", "3 × 10⁴ m/s", "3 × 10² m/s"],answer: "3 × 10⁸ m/s",},
  {question: "4. Which device is used to measure electric current?",options: ["Voltmeter", "Ammeter", "Thermometer", "Barometer"],answer: "Ammeter",},
  {question: "5. What type of energy is stored in a stretched rubber band?",options: ["Heat energy", "Kinetic energy", "Potential energy", "Electrical energy"],answer: "Potential energy",},
],

chemistry: [
  {question: "1. What is the chemical symbol of Oxygen?",options: ["O", "Ox", "Og", "Oz"],answer: "O",},
  {question: "2. Which acid is present in lemon?",options: ["Hydrochloric acid", "Sulphuric acid", "Citric acid", "Nitric acid"],answer: "Citric acid",},
  {question: "3. Water freezes at how many degrees Celsius?",options: ["0°C", "50°C", "100°C", "-10°C"],answer: "0°C",},
  {question: "4. Which gas is required for combustion?",options: ["Hydrogen", "Nitrogen", "Oxygen", "Carbon dioxide"],answer: "Oxygen",},
  {question: "5. What type of substance is common salt?",options: ["Element", "Compound", "Mixture", "Metal"],answer: "Compound",},
],

biology: [
  {question: "1. What is the basic unit of life?",options: ["Tissue", "Organ", "Cell", "System"],answer: "Cell",},
  {question: "2. Which organ is responsible for breathing?",options: ["Heart", "Lungs", "Kidney", "Brain"],answer: "Lungs",},
  {question: "3. Which part of the plant absorbs water?",options: ["Leaf", "Stem", "Root", "Flower"],answer: "Root",},
  {question: "4. Photosynthesis occurs in which part of the plant?",options: ["Root", "Stem", "Leaf", "Seed"],answer: "Leaf",},
  {question: "5. Which vitamin is produced when skin is exposed to sunlight?",options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],answer: "Vitamin D",},
],

    computer: [
      {question: "1. CPU stands for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Unit", "Control Processing Unit"], answer: "Central Processing Unit" },
      {question: "2. Which of these is an output device?", options: ["Keyboard", "Mouse", "Monitor", "Scanner"], answer: "Monitor" },
      {question: "3. Which key is used to delete characters to the left of the cursor?",options: ["Enter", "Shift", "Backspace", "Tab"],answer: "Backspace",},
      {question: "4. Which language is known as the 'mother of programming languages'?",options: ["C", "Java", "Python", "Assembly"],answer: "C",},
      {question: "5. What does 'www' stand for in a website address?",options: ["World Wide Web","Wide World Web","World Web Wide","Web World Wide",],answer: "World Wide Web",},
    ],
  };

  const [subject, setSubject] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const questions = subject ? subjects[subject] : [];

  const handleOptionChange = (qIndex, option) => {
    setAnswers({ ...answers, [qIndex]: option });
  };

  const handleSubmit = () => {
    let result = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) result++;
    });
    setScore(result);
  };

  const handleSubjectChange = (sub) => {
    setSubject(sub);
    setAnswers({});
    setScore(null);
  };

  return (
    <div className="test-container">
      <h1>Quiz App</h1>

      <div className="subject-buttons">
        {Object.keys(subjects).map((sub) => (
          <button
            key={sub}
            onClick={() => handleSubjectChange(sub)}
            className={subject === sub ? "active" : ""}
          >
            {sub.charAt(0).toUpperCase() + sub.slice(1)}
          </button>
        ))}
      </div>

      {subject && (
        <>
          <h2>{subject.charAt(0).toUpperCase() + subject.slice(1)} Test</h2>

          {questions.map((q, i) => (
            <div key={i} className="test-question">
              <p>{q.question}</p>
              <div className="test-options">
                {q.options.map((opt) => (
                  <label key={opt}>
                    <input
                      type="radio"
                      name={`q${i}`}
                      value={opt}
                      checked={answers[i] === opt}
                      onChange={() => handleOptionChange(i, opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button onClick={handleSubmit}>Submit</button>

          {score !== null && (
            <div className="test-result">
              <h2>
                Your Score: {score} / {questions.length}
              </h2>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Test;
