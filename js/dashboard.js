/**
 * NetQuiz – Computer Networks Quiz Application
 * Dashboard Module
 * Displays statistics, categories, client-server simulation & project documentation
 */

document.addEventListener("DOMContentLoaded", () => {
  setupDashboard();
});

function setupDashboard() {
  // Check user session
  const currentUser = window.NetQuizAuth ? window.NetQuizAuth.getCurrentUser() : null;
  
  if (!currentUser) {
    // If no user found, default to Alex Vance (demo student) to avoid lock-out in demo mode
    const fallbackUser = { name: "Alex Vance (Demo Student)", email: "student@university.edu" };
    if (window.NetQuizAuth) window.NetQuizAuth.setCurrentUser(fallbackUser);
    renderUserInfo(fallbackUser);
  } else {
    renderUserInfo(currentUser);
  }

  // Setup Logout button
  const logoutBtns = document.querySelectorAll(".btn-logout");
  logoutBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.NetQuizAuth.logoutUser();
    });
  });

  // Load and render user quiz statistics
  renderDashboardStats();

  // Render categories grid
  renderCategoriesGrid();

  // Setup Client-Server HTTP Inspector Simulation
  setupNetworkSimulator();

  // Setup Project Documentation Modal
  setupPBLDocumentationModal();
}

/**
 * Display current user info in header and navbar
 */
function renderUserInfo(user) {
  const nameDisplay = document.getElementById("studentWelcomeName");
  if (nameDisplay) {
    nameDisplay.textContent = user.name || "Student";
  }

  const navName = document.getElementById("navUserName");
  if (navName) {
    navName.textContent = user.name ? user.name.split(" ")[0] : "Student";
  }

  const navAvatar = document.getElementById("navUserAvatar");
  if (navAvatar && user.name) {
    navAvatar.textContent = user.name.charAt(0).toUpperCase();
  }
}

/**
 * Compute and display quiz statistics from LocalStorage
 */
function renderDashboardStats() {
  const historyKey = window.NetQuizAuth ? window.NetQuizAuth.STORAGE_KEYS.HISTORY : "netquiz_quiz_history";
  let history = [];
  try {
    const raw = localStorage.getItem(historyKey);
    history = raw ? JSON.parse(raw) : [];
  } catch (e) {
    history = [];
  }

  const totalAttempted = history.length;
  let highestScore = 0;
  let totalScorePercentage = 0;

  if (totalAttempted > 0) {
    history.forEach(item => {
      const pct = (item.score / item.totalQuestions) * 100;
      if (pct > highestScore) highestScore = pct;
      totalScorePercentage += pct;
    });
  }

  const avgScore = totalAttempted > 0 ? Math.round(totalScorePercentage / totalAttempted) : 0;

  // Update DOM elements
  const elTotal = document.getElementById("statTotalQuizzes");
  const elHighest = document.getElementById("statHighestScore");
  const elAvg = document.getElementById("statAvgScore");
  const elPassed = document.getElementById("statPassedQuizzes");

  if (elTotal) elTotal.textContent = totalAttempted;
  if (elHighest) elHighest.textContent = totalAttempted > 0 ? `${Math.round(highestScore)}%` : "0%";
  if (elAvg) elAvg.textContent = `${avgScore}%`;
  if (elPassed) {
    const passedCount = history.filter(h => (h.score / h.totalQuestions) >= 0.6).length;
    elPassed.textContent = `${passedCount}`;
  }
}

/**
 * Render Category Cards
 */
function renderCategoriesGrid() {
  const container = document.getElementById("categoriesGrid");
  if (!container) return;

  const categories = window.QUIZ_CATEGORIES || [];
  container.innerHTML = "";

  categories.forEach(cat => {
    const card = document.createElement("div");
    card.className = "category-card";

    // Icon SVGs
    const iconSvg = getCategorySvg(cat.slug);

    card.innerHTML = `
      <div class="category-card-header">
        <div class="category-icon-box" style="color: ${cat.color}; background: ${cat.color}15;">
          ${iconSvg}
        </div>
        <span class="category-tag">${cat.badge}</span>
      </div>
      <div class="category-card-body">
        <h3 class="category-title">${cat.id}. ${cat.title}</h3>
        <p class="category-desc">${cat.description}</p>
      </div>
      <div class="category-meta">
        <span>📋 10 Questions</span>
        <span>⏱️ 10 Minutes</span>
        <span>🎯 Pass: 60%</span>
      </div>
      <a href="quiz.html?category=${cat.id}" class="btn btn-primary btn-full">
        <span>Start Quiz</span>
        <span>&rarr;</span>
      </a>
    `;

    container.appendChild(card);
  });
}

/**
 * Return appropriate SVG icon for category
 */
function getCategorySvg(slug) {
  switch (slug) {
    case "osi-tcpip":
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`;
    case "ip-subnetting":
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`;
    case "tcp-udp-protocols":
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`;
    case "devices-topologies":
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`;
    case "routing-switching-dns":
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;
    case "http-security":
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`;
    default:
      return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>`;
  }
}

/**
 * Client-Server HTTP Inspector Simulation
 * Demonstrates HTTP GET/POST, TCP 3-Way Handshake, status codes, and headers
 */
function setupNetworkSimulator() {
  const sendBtn = document.getElementById("simulateHttpBtn");
  const terminal = document.getElementById("networkConsoleLogs");
  const methodSelect = document.getElementById("simMethodSelect");
  const endpointSelect = document.getElementById("simEndpointSelect");

  if (!sendBtn || !terminal) return;

  sendBtn.addEventListener("click", () => {
    const method = methodSelect ? methodSelect.value : "GET";
    const endpoint = endpointSelect ? endpointSelect.value : "/api/categories";
    
    terminal.innerHTML += `\n<span style="color:#94a3b8;">[${new Date().toLocaleTimeString()}]</span> <span style="color:#f59e0b;">--> INITIATING TCP 3-WAY HANDSHAKE</span>\n`;
    terminal.innerHTML += `<span style="color:#94a3b8;">[Step 1]</span> Client (192.168.1.45:51240) --[SYN (Seq=100)]--> Web Server (142.250.190.46:443)\n`;
    terminal.innerHTML += `<span style="color:#94a3b8;">[Step 2]</span> Web Server --[SYN-ACK (Seq=500, Ack=101)]--> Client\n`;
    terminal.innerHTML += `<span style="color:#94a3b8;">[Step 3]</span> Client --[ACK (Ack=501)]--> Connection ESTABLISHED\n`;

    terminal.innerHTML += `<span style="color:#38bdf8;">[HTTP REQUEST]</span> ${method} ${endpoint} HTTP/1.1\n`;
    terminal.innerHTML += `Host: netquiz.university.edu\nUser-Agent: Mozilla/5.0 (PBL-Client)\nAccept: application/json\n`;

    // Simulate network delay
    sendBtn.disabled = true;
    sendBtn.textContent = "Transmitting Packet...";

    setTimeout(() => {
      terminal.innerHTML += `<span style="color:#22c55e;">[HTTP RESPONSE 200 OK]</span> Content-Type: application/json; charset=utf-8\n`;
      terminal.innerHTML += `Server: NetQuiz-PBL/1.0 (Simulated Server)\nLatency: 28ms | PDU Size: 1.4 KB\n`;

      if (endpoint === "/api/categories") {
        terminal.innerHTML += `Body: {"status":"success","categoriesCount":6,"protocol":"HTTP/1.1 over TLS"}\n`;
      } else if (endpoint === "/api/ping") {
        terminal.innerHTML += `Body: {"status":"alive","echo":"pong","rtt":"28ms"}\n`;
      } else {
        terminal.innerHTML += `Body: {"status":"verified","storage":"LocalStorage Prototype Verified"}\n`;
      }

      terminal.innerHTML += `----------------------------------------------------\n`;
      terminal.scrollTop = terminal.scrollHeight;
      sendBtn.disabled = false;
      sendBtn.textContent = "Send HTTP Request";
    }, 450);
  });
}

/**
 * Setup PBL Documentation & Viva modal
 */
function setupPBLDocumentationModal() {
  const openBtn = document.getElementById("openPblDocsBtn");
  const modal = document.getElementById("pblModal");
  const closeBtn = document.getElementById("closePblModal");
  const okBtn = document.getElementById("okPblModal");

  if (!modal) return;

  const show = () => modal.classList.add("active");
  const hide = () => modal.classList.remove("active");

  if (openBtn) openBtn.addEventListener("click", show);
  if (closeBtn) closeBtn.addEventListener("click", hide);
  if (okBtn) okBtn.addEventListener("click", hide);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) hide();
  });
}
