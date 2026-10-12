/**
 * NetQuiz – Computer Networks Quiz Application
 * Authentication Module (Login & Registration)
 * College PBL Implementation using LocalStorage persistence
 */

// Key constants for LocalStorage
const STORAGE_KEYS = {
  USERS: "netquiz_registered_users",
  CURRENT_USER: "netquiz_current_user",
  HISTORY: "netquiz_quiz_history"
};

// Default seed demo student
const DEFAULT_DEMO_USER = {
  name: "Alex Vance",
  email: "student@university.edu",
  password: "NetworkPass123"
};

/**
 * Initialize Registered Users storage if not present
 */
function initUsersStorage() {
  const users = getUsers();
  if (users.length === 0) {
    users.push(DEFAULT_DEMO_USER);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }
}

/**
 * Get all registered users from LocalStorage
 */
function getUsers() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error reading users from LocalStorage:", e);
    return [];
  }
}

/**
 * Get current logged in user
 */
function getCurrentUser() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Set current logged in user
 */
function setCurrentUser(user) {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify({
    name: user.name,
    email: user.email,
    loginTime: new Date().toISOString()
  }));
}

/**
 * Clear user session (Logout)
 */
function logoutUser() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  window.location.href = "index.html";
}

/**
 * Display alert banner message
 */
function showAlert(elementId, message, type = "error") {
  const banner = document.getElementById(elementId);
  if (!banner) return;
  banner.className = `alert-banner visible alert-${type}`;
  banner.innerHTML = `
    <span>${type === 'error' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️'}</span>
    <div>${message}</div>
  `;
}

/**
 * Clear alert banner
 */
function clearAlert(elementId) {
  const banner = document.getElementById(elementId);
  if (!banner) return;
  banner.className = "alert-banner";
  banner.innerHTML = "";
}

/**
 * Set input error message
 */
function setFieldError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  const err = document.getElementById(errorId);
  if (field) field.classList.add("is-invalid");
  if (err) {
    err.textContent = message;
    err.classList.add("visible");
  }
}

/**
 * Clear input errors
 */
function clearFieldErrors() {
  document.querySelectorAll(".form-input").forEach(input => {
    input.classList.remove("is-invalid");
  });
  document.querySelectorAll(".form-error").forEach(err => {
    err.textContent = "";
    err.classList.remove("visible");
  });
}

/**
 * Toggle password visibility
 */
function setupPasswordToggle(buttonId, inputId) {
  const btn = document.getElementById(buttonId);
  const input = document.getElementById(inputId);
  if (!btn || !input) return;

  btn.addEventListener("click", () => {
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";
    btn.textContent = isPassword ? "Hide" : "Show";
    btn.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
  });
}

/**
 * Validate Email Format
 */
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Initialize Login Page
 */
function setupLoginPage() {
  initUsersStorage();

  const loginForm = document.getElementById("loginForm");
  const demoFillBtn = document.getElementById("demoFillBtn");
  const quickDemoBtn = document.getElementById("quickDemoBtn");

  setupPasswordToggle("togglePasswordBtn", "password");

  // Check if already logged in - if so, show reminder or allow continuing to dashboard
  const user = getCurrentUser();
  if (user && document.getElementById("activeSessionNotice")) {
    const notice = document.getElementById("activeSessionNotice");
    notice.innerHTML = `
      <div class="alert-banner visible alert-info" style="margin-bottom: 1.5rem;">
        <span>ℹ️</span>
        <div>Logged in as <strong>${user.name}</strong> (${user.email}). <a href="dashboard.html" style="color:#0284c7; font-weight:700; text-decoration:underline;">Go to Dashboard &rarr;</a></div>
      </div>
    `;
  }

  // Pre-fill demo credentials
  if (demoFillBtn) {
    demoFillBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("identifier").value = DEFAULT_DEMO_USER.email;
      document.getElementById("password").value = DEFAULT_DEMO_USER.password;
      clearFieldErrors();
      clearAlert("loginAlert");
      showAlert("loginAlert", "Demo credentials loaded! Click 'Sign In to Quiz' to proceed.", "info");
    });
  }

  // Quick 1-click demo login
  if (quickDemoBtn) {
    quickDemoBtn.addEventListener("click", (e) => {
      e.preventDefault();
      setCurrentUser(DEFAULT_DEMO_USER);
      showAlert("loginAlert", "Signed in as demo student! Redirecting to Dashboard...", "success");
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 700);
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearFieldErrors();
      clearAlert("loginAlert");

      const identifier = document.getElementById("identifier").value.trim();
      const password = document.getElementById("password").value;

      let hasError = false;

      if (!identifier) {
        setFieldError("identifier", "identifierError", "Please enter your student email or username.");
        hasError = true;
      }

      if (!password) {
        setFieldError("password", "passwordError", "Please enter your password.");
        hasError = true;
      }

      if (hasError) return;

      // Authenticate against LocalStorage users
      const users = getUsers();
      const matchedUser = users.find(u => 
        (u.email.toLowerCase() === identifier.toLowerCase() || u.name.toLowerCase() === identifier.toLowerCase()) &&
        u.password === password
      );

      if (matchedUser) {
        setCurrentUser(matchedUser);
        showAlert("loginAlert", "Authentication successful! Launching student dashboard...", "success");
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 600);
      } else {
        showAlert("loginAlert", "Invalid credentials. Please verify your email and password, or use the Demo Student login below.", "error");
      }
    });
  }
}

/**
 * Initialize Registration Page
 */
function setupRegisterPage() {
  initUsersStorage();

  const registerForm = document.getElementById("registerForm");
  setupPasswordToggle("toggleRegPasswordBtn", "regPassword");
  setupPasswordToggle("toggleConfirmPasswordBtn", "confirmPassword");

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearFieldErrors();
      clearAlert("registerAlert");

      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const password = document.getElementById("regPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      let hasError = false;

      if (!fullName) {
        setFieldError("fullName", "nameError", "Full Name is required.");
        hasError = true;
      } else if (fullName.length < 2) {
        setFieldError("fullName", "nameError", "Please enter a valid student name (at least 2 letters).");
        hasError = true;
      }

      if (!email) {
        setFieldError("regEmail", "emailError", "Email address is required.");
        hasError = true;
      } else if (!isValidEmail(email)) {
        setFieldError("regEmail", "emailError", "Please provide a valid email format (e.g. name@domain.edu).");
        hasError = true;
      }

      if (!password) {
        setFieldError("regPassword", "passwordError", "Password is required.");
        hasError = true;
      } else if (password.length < 6) {
        setFieldError("regPassword", "passwordError", "Password must be at least 6 characters long.");
        hasError = true;
      }

      if (!confirmPassword) {
        setFieldError("confirmPassword", "confirmError", "Please confirm your password.");
        hasError = true;
      } else if (password !== confirmPassword) {
        setFieldError("confirmPassword", "confirmError", "Passwords do not match. Please re-enter carefully.");
        hasError = true;
      }

      if (hasError) return;

      // Check if user already exists
      const users = getUsers();
      const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (existingUser) {
        showAlert("registerAlert", "An account with this email already exists. Please log in instead.", "error");
        setFieldError("regEmail", "emailError", "Email is already registered.");
        return;
      }

      // Save new user in LocalStorage
      const newUser = {
        name: fullName,
        email: email,
        password: password,
        registeredAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

      showAlert("registerAlert", "Account created successfully! Redirecting you to login...", "success");
      
      // Auto pre-populate on login page via sessionStorage
      try {
        sessionStorage.setItem("lastRegisteredEmail", email);
      } catch (err) {}

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1200);
    });
  }
}

// Global exposure
if (typeof window !== "undefined") {
  window.NetQuizAuth = {
    getCurrentUser,
    setCurrentUser,
    logoutUser,
    setupLoginPage,
    setupRegisterPage,
    STORAGE_KEYS,
    DEFAULT_DEMO_USER
  };
}
