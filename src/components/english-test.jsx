"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const questions = [
  {
    id: 1,
    question: "We are _______ a party at my apartment. Would you like to come?",
    options: [
      { label: "A", value: "having" },
      { label: "B", value: "to have" },
      { label: "C", value: "have" },
    ],
    correctAnswer: "having",
  },
  {
    id: 2,
    question: "I _______ to the cinema last night.",
    options: [
      { label: "A", value: "go" },
      { label: "B", value: "went" },
      { label: "C", value: "going" },
    ],
    correctAnswer: "went",
  },
  {
    id: 3,
    question: "She _______ English for five years.",
    options: [
      { label: "A", value: "studies" },
      { label: "B", value: "has studied" },
      { label: "C", value: "study" },
    ],
    correctAnswer: "has studied",
  },
  {
    id: 4,
    question: "If I _______ rich, I would travel the world.",
    options: [
      { label: "A", value: "am" },
      { label: "B", value: "was" },
      { label: "C", value: "were" },
    ],
    correctAnswer: "were",
  },
  {
    id: 5,
    question: "The book _______ by millions of people.",
    options: [
      { label: "A", value: "was read" },
      { label: "B", value: "read" },
      { label: "C", value: "reading" },
    ],
    correctAnswer: "was read",
  },
  {
    id: 6,
    question: "I wish I _______ speak French fluently.",
    options: [
      { label: "A", value: "can" },
      { label: "B", value: "could" },
      { label: "C", value: "will" },
    ],
    correctAnswer: "could",
  },
  {
    id: 7,
    question: "By next year, I _______ my degree.",
    options: [
      { label: "A", value: "will finish" },
      { label: "B", value: "will have finished" },
      { label: "C", value: "finish" },
    ],
    correctAnswer: "will have finished",
  },
  {
    id: 8,
    question: "The meeting _______ postponed until next week.",
    options: [
      { label: "A", value: "has been" },
      { label: "B", value: "have been" },
      { label: "C", value: "was been" },
    ],
    correctAnswer: "has been",
  },
  {
    id: 9,
    question: "_______ you help me with this problem?",
    options: [
      { label: "A", value: "Could" },
      { label: "B", value: "Should" },
      { label: "C", value: "Must" },
    ],
    correctAnswer: "Could",
  },
  {
    id: 10,
    question: "I'm looking forward _______ you again.",
    options: [
      { label: "A", value: "to see" },
      { label: "B", value: "to seeing" },
      { label: "C", value: "see" },
    ],
    correctAnswer: "to seeing",
  },
  {
    id: 11,
    question: "The project _______ completed by the end of the month.",
    options: [
      { label: "A", value: "will be" },
      { label: "B", value: "will have been" },
      { label: "C", value: "would be" },
    ],
    correctAnswer: "will be",
  },
  {
    id: 12,
    question: "_______ I had studied harder, I would have passed the exam.",
    options: [
      { label: "A", value: "If" },
      { label: "B", value: "Unless" },
      { label: "C", value: "Although" },
    ],
    correctAnswer: "If",
  },
]

export default function EnglishTest() {
  const [testState, setTestState] = useState("welcome") // "welcome" | "testing" | "email" | "thank-you"
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [answers, setAnswers] = useState([])
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    // Focus the main container so it can receive keyboard events
    const container = document.getElementById("test-container")
    if (container) {
      container.focus()
    }
  }, [])

  const progress = ((currentQuestion + (selectedAnswer ? 1 : 0)) / questions.length) * 100

  const handleStartTest = () => {
    setTestState("testing")
  }

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer)
  }

  const handleNextQuestion = () => {
    if (!selectedAnswer) return

    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)
    setSelectedAnswer("")

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setTestState("email")
    }
  }

  const handleEmailSubmit = async () => {
    if (!email) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Calculate score
    const calculatedScore = answers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correctAnswer ? 1 : 0)
    }, 0)

    setScore(calculatedScore)
    setIsSubmitting(false)
    setTestState("thank-you")
  }

  const handleKeyPress = (e) => {
    if (testState === "welcome" && e.key === "Enter") {
      handleStartTest()
    } else if (testState === "testing" && e.key === "Enter" && selectedAnswer) {
      handleNextQuestion()
    } else if (testState === "email" && e.key === "Enter" && (e.ctrlKey || e.metaKey) && email) {
      handleEmailSubmit()
    }
  }

  return (
    <div
      id="test-container"
      className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4 outline-none"
      onKeyDown={handleKeyPress}
      tabIndex={0}
      autoFocus
    >
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        {testState === "testing" && (
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Welcome Page */}
        {testState === "welcome" && (
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl font-bold text-blue-700 mb-6">Find out your current English level!</h1>

            <div className="space-y-4 text-lg text-gray-700 max-w-xl mx-auto">
              <p>This online level test will give you an approximate indication of your English language level.</p>

              <p>
                There are 12 questions and the test takes less than 5 minutes. Upon completion, we'll email your
                results.
              </p>
            </div>

            <div className="pt-6">
              <Button
                onClick={handleStartTest}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                Start test
              </Button>
              <p className="text-sm text-blue-500 mt-2 font-medium animate-pulse">press Enter ↵</p>
            </div>
          </div>
        )}

        {/* Question Page */}
        {testState === "testing" && (
          <div className="space-y-8 animate-slide-in">
            <div className="text-center">
              <div className="text-blue-600 text-lg font-medium mb-4">
                {currentQuestion + 1} → {currentQuestion + 1}/12
              </div>

              <h2 className="text-2xl font-medium text-gray-800 mb-8 leading-relaxed">
                {questions[currentQuestion].question.split("_______").map((part, index) => (
                  <span key={index}>
                    {part}
                    {index < questions[currentQuestion].question.split("_______").length - 1 && (
                      <span className="border-b-2 border-gray-400 px-4 py-1 mx-2 inline-block min-w-[100px]"></span>
                    )}
                  </span>
                ))}
                <span className="text-red-500">*</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleAnswerSelect(option.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-200 hover:shadow-md ${
                    selectedAnswer === option.value
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <span className="font-semibold text-blue-600 mr-2">{option.label}</span>
                  <span className="text-gray-800">{option.value}</span>
                  {selectedAnswer === option.value && <span className="float-right text-blue-600">✓</span>}
                </button>
              ))}
            </div>

            <div className="text-center pt-4">
              <Button
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:cursor-not-allowed"
              >
                OK
              </Button>
            </div>
          </div>
        )}

        {/* Email Collection Page */}
        {testState === "email" && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <div className="text-blue-600 text-lg font-medium mb-4">
                13 → <span className="text-green-600 font-bold">Well done!</span> Enter your email address to receive
                your language test results.<span className="text-red-500">*</span>
              </div>
            </div>

            <div className="max-w-md mx-auto space-y-6">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="text-lg p-4 border-b-2 border-gray-300 bg-transparent focus:border-blue-500 focus:ring-0 rounded-none shadow-none"
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: "2px solid #d1d5db",
                  borderRadius: "0",
                }}
              />

              <div className="text-center">
                <Button
                  onClick={handleEmailSubmit}
                  disabled={!email || isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
                <p className="text-sm text-gray-500 mt-2">press Ctrl + Enter ↵</p>
              </div>
            </div>
          </div>
        )}

        {/* Thank You Page */}
        {testState === "thank-you" && (
          <div className="text-center space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-4xl font-bold text-green-600 mb-4">Thank You!</h1>
              <div className="text-xl text-gray-700 space-y-4 max-w-lg mx-auto">
                <p>Your English level test has been completed successfully.</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Your Results</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {score}/{questions.length}
                  </div>
                  <p className="text-blue-700">Score: {Math.round((score / questions.length) * 100)}%</p>
                </div>
                <p>
                  We've sent your detailed results to <strong>{email}</strong>
                </p>
                <p className="text-[#777777]">
                  Check your inbox for a comprehensive analysis of your English level and personalized recommendations.
                </p>
              </div>

              <div className="pt-6 space-y-4">
                <Button
                  onClick={() => {
                    // Reset the test
                    setTestState("welcome")
                    setCurrentQuestion(0)
                    setSelectedAnswer("")
                    setAnswers([])
                    setEmail("")
                    setScore(0)
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  Take Test Again
                </Button>
                <p className="text-sm text-gray-500">Want to improve your score?</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
