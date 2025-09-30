class Quiz {
  constructor() {
    this.questions = [
      {
        question: "Which sensor is most commonly used in traditional wheelchair navigation?",
        options: {
          A: "Ultrasonic Sensors",
          B: "Camera",
          C: "GPS",
          D: "None of the Above",
        },
        correct: "A",
        explanation:
         "That’s because Ultrasonic Sensors are inexpensive, reliable, and widely used for obstacle detection and avoidance in assistive mobility devices.",
      },
      {
        question: "What does stereo vision provide in computer vision navigation?",
        options: {
          A: "Object Color",
          B: "Depth and Distance",
          C: "Sound Feedback",
          D: "All of the above",
        },
        correct: "B",
        explanation:
          "In computer vision, stereo vision uses two cameras (like human eyes) to calculate disparities between the two images. This allows the system to estimate depth and distances to objects, which is essential for navigation and obstacle avoidance.",
      },
      {
        question: ">Which algorithm is often used for real-time object detection",
        options: {
          A: "YOLO - You Only Look Once",
          B: "Faster RCNN",
          C: "K-Means Clustering",
          D: "Naive Bayes",
        },
        correct: "A",
        explanation:
          "YOLO (You Only Look Once) – it’s designed for fast, real-time object detection with high accuracy.",
      },
      {
        question: "Which hardware is commonly integrated with wheelchairs for precise indoor localization?",
        options: {
          A: "GPS Module",
          B: "LiDAR Sensor",
          C: "Bluetooth Speaker",
          D: "Ultrasonic Microphone",
        },
        correct: "B",
        explanation:
          "LiDAR creates detailed 3D maps, making it ideal for precise indoor navigation."
    },
      {
        question: "What is one major challenge in developing computer vision systems for wheelchair users?",
        options: {
          A: "High Battery Capacity",
          B: "Wheel size",
          C: "Changing Lighting Conditions",
          D: "No Challenges faced",
        },
        correct: "C",
        explanation:
          "Variations in light (sunlight, shadows, glare) affect camera-based vision accuracy.",
      },
    ]

    this.currentQuestion = 0
    this.score = 0
    this.selectedAnswer = null
    this.isAnswered = false

    this.initializeElements()
    this.setupEventListeners()
    this.displayQuestion()
    this.setupConfetti()
  }

  initializeElements() {
    this.quizCard = document.getElementById("quiz-card")
    this.questionText = document.getElementById("question-text")
    this.optionButtons = document.querySelectorAll(".option-btn")
    this.resultIcon = document.getElementById("result-icon")
    this.resultText = document.getElementById("result-text")
    this.correctAnswerText = document.getElementById("correct-answer-text")
    this.explanationText = document.getElementById("explanation-text")
    this.nextBtn = document.getElementById("next-btn")
    this.currentQuestionSpan = document.getElementById("current-question")
    this.totalQuestionsSpan = document.getElementById("total-questions")
    this.progressFill = document.getElementById("progress-fill")
    this.quizComplete = document.getElementById("quiz-complete")
    this.finalScore = document.getElementById("final-score")
    this.finalTotal = document.getElementById("final-total")
    this.scorePercentage = document.getElementById("score-percentage")
    this.restartBtn = document.getElementById("restart-btn")
    this.confettiCanvas = document.getElementById("confetti-canvas")
    this.confettiCtx = this.confettiCanvas.getContext("2d")
  }

  setupEventListeners() {
    this.optionButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => this.selectAnswer(e))
    })

    this.nextBtn.addEventListener("click", () => this.nextQuestion())
    this.restartBtn.addEventListener("click", () => this.restartQuiz())

    window.addEventListener("resize", () => this.resizeCanvas())
  }

  displayQuestion() {
    const question = this.questions[this.currentQuestion]

    this.questionText.textContent = question.question
    this.currentQuestionSpan.textContent = this.currentQuestion + 1
    this.totalQuestionsSpan.textContent = this.questions.length

    this.optionButtons.forEach((btn, index) => {
      const optionKey = Object.keys(question.options)[index]
      btn.dataset.option = optionKey
      btn.querySelector(".option-letter").textContent = optionKey
      btn.querySelector(".option-text").textContent = question.options[optionKey]
      btn.className = "option-btn" // Reset classes
    })

    this.updateProgress()
    this.isAnswered = false
    this.selectedAnswer = null

    // Reset card to front
    this.quizCard.classList.remove("flipped")
  }

  selectAnswer(e) {
    if (this.isAnswered) return

    const selectedBtn = e.currentTarget
    const selectedOption = selectedBtn.dataset.option
    const question = this.questions[this.currentQuestion]

    this.selectedAnswer = selectedOption
    this.isAnswered = true

    // Mark selected answer
    selectedBtn.classList.add("selected")

    // Show correct/incorrect styling
    this.optionButtons.forEach((btn) => {
      const option = btn.dataset.option
      if (option === question.correct) {
        btn.classList.add("correct")
      } else if (option === selectedOption && option !== question.correct) {
        btn.classList.add("incorrect")
      }
    })

    // Wait a moment then flip card
    setTimeout(() => {
      this.showAnswer()
    }, 1000)
  }

  showAnswer() {
    const question = this.questions[this.currentQuestion]
    const isCorrect = this.selectedAnswer === question.correct

    if (isCorrect) {
      this.score++
      this.resultIcon.classList.add("correct")
      this.resultText.textContent = "Correct!"
      this.resultText.classList.add("correct")
      this.launchConfetti()
    } else {
      this.resultIcon.classList.add("incorrect")
      this.resultText.textContent = "Incorrect"
      this.resultText.classList.add("incorrect")
    }

    this.correctAnswerText.textContent = `${question.correct}. ${question.options[question.correct]}`
    this.explanationText.textContent = question.explanation

    // Flip the card
    this.quizCard.classList.add("flipped")
  }

  nextQuestion() {
    this.currentQuestion++

    if (this.currentQuestion >= this.questions.length) {
      this.showResults()
    } else {
      // Reset result styling
      this.resultIcon.className = "result-icon"
      this.resultText.className = ""

      this.displayQuestion()
    }
  }

  showResults() {
    const percentage = Math.round((this.score / this.questions.length) * 100)

    this.finalScore.textContent = this.score
    this.finalTotal.textContent = this.questions.length
    this.scorePercentage.textContent = `${percentage}%`

    this.quizComplete.style.display = "flex"

    // Launch confetti for completion
    if (percentage >= 70) {
      setTimeout(() => this.launchConfetti(), 500)
    }
  }

  restartQuiz() {
    this.currentQuestion = 0
    this.score = 0
    this.selectedAnswer = null
    this.isAnswered = false

    this.quizComplete.style.display = "none"
    this.displayQuestion()
  }

  updateProgress() {
    const progress = ((this.currentQuestion + 1) / this.questions.length) * 100
    this.progressFill.style.width = `${progress}%`
  }

  setupConfetti() {
    this.resizeCanvas()
    this.confetti = []
  }

  resizeCanvas() {
    this.confettiCanvas.width = window.innerWidth
    this.confettiCanvas.height = window.innerHeight
  }

  launchConfetti() {
    const colors = ["#667eea", "#764ba2", "#f093fb", "#f5576c", "#4facfe", "#00f2fe"]

    for (let i = 0; i < 100; i++) {
      this.confetti.push({
        x: Math.random() * this.confettiCanvas.width,
        y: -10,
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
      })
    }

    this.animateConfetti()
  }

  animateConfetti() {
    this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height)

    for (let i = this.confetti.length - 1; i >= 0; i--) {
      const particle = this.confetti[i]

      particle.x += particle.vx
      particle.y += particle.vy
      particle.vy += 0.1 // gravity
      particle.rotation += particle.rotationSpeed

      this.confettiCtx.save()
      this.confettiCtx.translate(particle.x, particle.y)
      this.confettiCtx.rotate((particle.rotation * Math.PI) / 180)
      this.confettiCtx.fillStyle = particle.color
      this.confettiCtx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
      this.confettiCtx.restore()

      // Remove particles that are off screen
      if (particle.y > this.confettiCanvas.height + 10) {
        this.confetti.splice(i, 1)
      }
    }

    if (this.confetti.length > 0) {
      requestAnimationFrame(() => this.animateConfetti())
    }
  }
}

// Initialize quiz when page loads
document.addEventListener("DOMContentLoaded", () => {
  new Quiz()
})
