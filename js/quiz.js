/**
 * NetQuiz – Computer Networks Quiz Application
 * Quiz Engine: Timer, Question State, Navigation & Auto-Submission
 * Modal-driven confirmation for 100% reliable execution in iFrames & Live Server
 */

let currentCategoryId = 1;
let currentQuestions = [];
let currentIndex = 0;
let userAnswers = {}; // { [questionIndex]: selectedOptionIndex }
let timerInterval = null;
let timeRemainingSeconds = 600; // 10 minutes (600s)
let isSubmitted = false;

document.addEventListener("DOMContentLoaded", () => {
  initQuiz();
});

/**
 * Initialize Quiz based on URL parameter or default category
 */
function initQuiz() {
  const urlParams = new URLSearchParams(window.location.search);
  const catIdParam = parseInt(urlParams.get("category"), 10);

  if (catIdParam && window.QUIZ_QUESTIONS && window.QUIZ_QUESTIONS[catIdParam]) {
    currentCategoryId = catIdParam;
  } else {
    currentCategoryId = 1;
  }

  // Find Category metadata
  const categoryMeta = (window.QUIZ_CATEGORIES || []).find(c => c.id === currentCategoryId) || {
    id: currentCategoryId,
    title: "Computer Networks Assessment"
  };

  // Set category heading
  const titleEl = document.getElementById("quizCategoryTitle");
  if (titleEl) titleEl.textContent = `${categoryMeta.id}. ${categoryMeta.title}`;

  // Get Questions
  currentQuestions = (window.QUIZ_QUESTIONS && window.QUIZ_QUESTIONS[currentCategoryId]) 
    ? [...window.QUIZ_QUESTIONS[currentCategoryId]]
    : [];

  if (currentQuestions.length === 0) {
    console.error("Questions not found for category " + currentCategoryId);
    window.location.href = "dashboard.html";
    return;
  }

  // Reset state
  currentIndex = 0;
  userAnswers = {};
  isSubmitted = false;

  setupNavigationButtons();
  setupQuestionPalette();
  setupInAppModals();
  startQuizTimer();
  renderCurrentQuestion();
}

/**
 * 10-Minute Countdown Timer
 */
function startQuizTimer() {
  timeRemainingSeconds = 600; // 10:00
  updateTimerDisplay();

  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (isSubmitted) {
      clearInterval(timerInterval);
      return;
    }

    timeRemainingSeconds--;
    updateTimerDisplay();

    if (timeRemainingSeconds <= 0) {
      clearInterval(timerInterval);
      timeRemainingSeconds = 0;
      updateTimerDisplay();
      // Auto-submit immediately without blocking alert()
      submitQuiz(true);
    }
  }, 1000);
}

/**
 * Update Timer UI element
 */
function updateTimerDisplay() {
  const display = document.getElementById("quizTimerDisplay");
  const timerBox = document.getElementById("quizTimerBox");
  if (!display) return;

  const minutes = Math.floor(timeRemainingSeconds / 60);
  const seconds = timeRemainingSeconds % 60;
  display.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  if (timerBox) {
    if (timeRemainingSeconds <= 120) {
      timerBox.classList.add("warning");
    } else {
      timerBox.classList.remove("warning");
    }
  }
}

/**
 * Setup Previous, Next, and Submit buttons
 */
function setupNavigationButtons() {
  const prevBtn = document.getElementById("prevQuestionBtn");
  const nextBtn = document.getElementById("nextQuestionBtn");
  const submitBtn = document.getElementById("submitQuizBtn");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        renderCurrentQuestion();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentIndex < currentQuestions.length - 1) {
        currentIndex++;
        renderCurrentQuestion();
      }
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      promptSubmitConfirmation();
    });
  }
}

/**
 * Setup In-App Confirmation and Exit Modals (zero window.confirm/alert dependency)
 */
function setupInAppModals() {
  const submitModal = document.getElementById("submitConfirmModal");
  const closeSubmitBtn = document.getElementById("closeSubmitModalBtn");
  const cancelSubmitBtn = document.getElementById("cancelSubmitModalBtn");
  const confirmFinalSubmitBtn = document.getElementById("confirmFinalSubmitBtn");

  const exitModal = document.getElementById("exitQuizModal");
  const exitNavBtn = document.getElementById("exitQuizNavBtn");
  const navBrandExitLink = document.getElementById("navBrandExitLink");
  const closeExitBtn = document.getElementById("closeExitModalBtn");
  const cancelExitBtn = document.getElementById("cancelExitModalBtn");

  // Submit modal handlers
  const closeSubmit = () => {
    if (submitModal) submitModal.classList.remove("active");
  };

  if (closeSubmitBtn) closeSubmitBtn.addEventListener("click", closeSubmit);
  if (cancelSubmitBtn) cancelSubmitBtn.addEventListener("click", closeSubmit);

  if (confirmFinalSubmitBtn) {
    confirmFinalSubmitBtn.addEventListener("click", () => {
      closeSubmit();
      submitQuiz(false);
    });
  }

  if (submitModal) {
    submitModal.addEventListener("click", (e) => {
      if (e.target === submitModal) closeSubmit();
    });
  }

  // Exit modal handlers
  const openExit = (e) => {
    if (e) e.preventDefault();
    if (exitModal) exitModal.classList.add("active");
  };

  const closeExit = () => {
    if (exitModal) exitModal.classList.remove("active");
  };

  if (exitNavBtn) exitNavBtn.addEventListener("click", openExit);
  if (navBrandExitLink) navBrandExitLink.addEventListener("click", openExit);
  if (closeExitBtn) closeExitBtn.addEventListener("click", closeExit);
  if (cancelExitBtn) cancelExitBtn.addEventListener("click", closeExit);

  if (exitModal) {
    exitModal.addEventListener("click", (e) => {
      if (e.target === exitModal) closeExit();
    });
  }
}

/**
 * Setup Question Palette buttons (1 to 10)
 */
function setupQuestionPalette() {
  const container = document.getElementById("questionPaletteGrid");
  if (!container) return;

  container.innerHTML = "";
  currentQuestions.forEach((_, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `palette-btn ${idx === currentIndex ? "current" : ""}`;
    btn.textContent = idx + 1;
    btn.id = `palette-btn-${idx}`;
    btn.title = `Jump to question ${idx + 1}`;
    btn.addEventListener("click", () => {
      currentIndex = idx;
      renderCurrentQuestion();
    });
    container.appendChild(btn);
  });
}

/**
 * Render Question at current index
 */
function renderCurrentQuestion() {
  const q = currentQuestions[currentIndex];
  if (!q) return;

  // Counter & Progress
  const total = currentQuestions.length;
  const countText = document.getElementById("questionCounterText");
  const progressFill = document.getElementById("quizProgressBarFill");
  const conceptBadge = document.getElementById("questionConceptBadge");
  const qText = document.getElementById("questionPromptText");
  const optionsContainer = document.getElementById("optionsContainer");

  if (countText) countText.textContent = `Question ${currentIndex + 1} of ${total}`;
  if (conceptBadge) conceptBadge.textContent = q.concept || "Networking Concept";
  if (qText) qText.textContent = q.question;

  // Progress percentage
  const progressPct = ((currentIndex + 1) / total) * 100;
  if (progressFill) progressFill.style.width = `${progressPct}%`;

  // Render 4 options
  if (optionsContainer) {
    optionsContainer.innerHTML = "";
    const letters = ["A", "B", "C", "D"];

    q.options.forEach((optText, optIndex) => {
      const optItem = document.createElement("div");
      const isSelected = userAnswers[currentIndex] === optIndex;
      optItem.className = `option-item ${isSelected ? "selected" : ""}`;
      optItem.setAttribute("role", "button");
      optItem.setAttribute("tabindex", "0");

      optItem.innerHTML = `
        <div class="option-key">${letters[optIndex]}</div>
        <div class="option-label">${optText}</div>
      `;

      optItem.addEventListener("click", () => {
        if (isSubmitted) return;
        userAnswers[currentIndex] = optIndex;
        renderCurrentQuestion();
      });

      optionsContainer.appendChild(optItem);
    });
  }

  // Update Buttons (Prev/Next/Submit visibility & disabled states)
  const prevBtn = document.getElementById("prevQuestionBtn");
  const nextBtn = document.getElementById("nextQuestionBtn");
  const submitBtn = document.getElementById("submitQuizBtn");

  if (prevBtn) {
    prevBtn.disabled = currentIndex === 0;
  }

  if (nextBtn) {
    if (currentIndex === total - 1) {
      nextBtn.style.display = "none";
    } else {
      nextBtn.style.display = "inline-flex";
    }
  }

  if (submitBtn) {
    submitBtn.style.display = "inline-flex";
  }

  // Update Question Palette colors
  currentQuestions.forEach((_, idx) => {
    const pBtn = document.getElementById(`palette-btn-${idx}`);
    if (pBtn) {
      pBtn.className = "palette-btn";
      if (idx === currentIndex) pBtn.classList.add("current");
      if (userAnswers[idx] !== undefined) pBtn.classList.add("answered");
    }
  });
}

/**
 * Open In-App Confirmation Modal before submission
 */
function promptSubmitConfirmation() {
  const answeredCount = Object.keys(userAnswers).length;
  const total = currentQuestions.length;
  const unansweredCount = total - answeredCount;

  const modal = document.getElementById("submitConfirmModal");
  const summaryEl = document.getElementById("submitModalSummary");
  const warningEl = document.getElementById("submitModalWarning");
  const warningText = document.getElementById("submitModalWarningText");

  if (modal) {
    if (summaryEl) {
      summaryEl.innerHTML = `You have answered <strong>${answeredCount} of ${total}</strong> questions.`;
    }

    if (warningEl && warningText) {
      if (unansweredCount > 0) {
        warningText.textContent = `Caution: ${unansweredCount} question${unansweredCount === 1 ? '' : 's'} remain unanswered.`;
        warningEl.style.display = "flex";
      } else {
        warningEl.style.display = "none";
      }
    }

    modal.classList.add("active");
  } else {
    // Fallback if modal is absent: submit immediately
    submitQuiz(false);
  }
}

/**
 * Calculate scores, persist results, and redirect to result.html
 */
function submitQuiz(forcedByTimer = false) {
  if (isSubmitted) return;
  isSubmitted = true;

  if (timerInterval) clearInterval(timerInterval);

  let score = 0;
  const detailedAnswers = [];

  currentQuestions.forEach((q, idx) => {
    const userChoice = userAnswers[idx] !== undefined ? userAnswers[idx] : null;
    const isCorrect = userChoice === q.correct;
    if (isCorrect) score++;

    detailedAnswers.push({
      questionId: q.id,
      question: q.question,
      options: q.options,
      correct: q.correct,
      userChoice: userChoice,
      isCorrect: isCorrect,
      concept: q.concept,
      explanation: q.explanation
    });
  });

  const categoryMeta = (window.QUIZ_CATEGORIES || []).find(c => c.id === currentCategoryId) || {
    id: currentCategoryId,
    title: "Computer Networks Quiz"
  };

  const percentage = Math.round((score / currentQuestions.length) * 100);
  const timeSpentSeconds = Math.max(1, 600 - timeRemainingSeconds);

  const resultPayload = {
    categoryId: currentCategoryId,
    categoryTitle: categoryMeta.title,
    date: new Date().toLocaleString(),
    timestamp: Date.now(),
    score: score,
    totalQuestions: currentQuestions.length,
    percentage: percentage,
    passed: percentage >= 60,
    timeSpentSeconds: timeSpentSeconds,
    forcedByTimer: forcedByTimer,
    detailedAnswers: detailedAnswers
  };

  // 1. Save in BOTH localStorage and sessionStorage for cross-context persistence
  try {
    sessionStorage.setItem("netquiz_latest_result", JSON.stringify(resultPayload));
  } catch (e) {
    console.error("SessionStorage write error", e);
  }

  try {
    localStorage.setItem("netquiz_latest_result", JSON.stringify(resultPayload));
  } catch (e) {
    console.error("LocalStorage write error", e);
  }

  // 2. Persist in LocalStorage History array
  const historyKey = window.NetQuizAuth ? window.NetQuizAuth.STORAGE_KEYS.HISTORY : "netquiz_quiz_history";
  let history = [];
  try {
    const rawHistory = localStorage.getItem(historyKey);
    history = rawHistory ? JSON.parse(rawHistory) : [];
  } catch (e) {
    history = [];
  }

  history.unshift({
    categoryId: currentCategoryId,
    categoryTitle: categoryMeta.title,
    score: score,
    totalQuestions: currentQuestions.length,
    percentage: percentage,
    passed: percentage >= 60,
    date: new Date().toLocaleString(),
    timestamp: Date.now()
  });

  try {
    localStorage.setItem(historyKey, JSON.stringify(history));
  } catch (e) {
    console.error("LocalStorage history write error", e);
  }

  // 3. Immediately transition to result.html
  window.location.href = "result.html";
}
