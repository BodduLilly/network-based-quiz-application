/**
 * NetQuiz – Computer Networks Quiz Application
 * Quiz History Module
 * Retrieves, formats, and clears quiz performance records from LocalStorage
 */

document.addEventListener("DOMContentLoaded", () => {
  setupHistoryPage();
});

function setupHistoryPage() {
  renderHistoryTable();

  const clearBtn = document.getElementById("clearHistoryBtn");
  const modal = document.getElementById("clearHistoryModal");
  const closeBtn = document.getElementById("closeClearModalBtn");
  const cancelBtn = document.getElementById("cancelClearModalBtn");
  const confirmBtn = document.getElementById("confirmClearModalBtn");

  const openModal = () => {
    if (modal) modal.classList.add("active");
    else handleClearHistory();
  };

  const closeModal = () => {
    if (modal) modal.classList.remove("active");
  };

  if (clearBtn) clearBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeModal);

  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      closeModal();
      handleClearHistory();
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }
}

/**
 * Render history records in table
 */
function renderHistoryTable() {
  const historyKey = window.NetQuizAuth ? window.NetQuizAuth.STORAGE_KEYS.HISTORY : "netquiz_quiz_history";
  let history = [];
  try {
    const raw = localStorage.getItem(historyKey);
    history = raw ? JSON.parse(raw) : [];
  } catch (e) {
    history = [];
  }

  const tableBody = document.getElementById("historyTableBody");
  const emptyState = document.getElementById("historyEmptyState");
  const tableCard = document.getElementById("historyTableContainer");
  const historyCountEl = document.getElementById("historyCountBadge");

  if (historyCountEl) {
    historyCountEl.textContent = `${history.length} Record${history.length === 1 ? '' : 's'}`;
  }

  if (history.length === 0) {
    if (tableCard) tableCard.style.display = "none";
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  if (tableCard) tableCard.style.display = "block";

  if (tableBody) {
    tableBody.innerHTML = "";

    history.forEach((record, index) => {
      const row = document.createElement("tr");

      const isPass = record.percentage >= 60 || (record.score / record.totalQuestions) >= 0.6;
      const statusBadge = isPass 
        ? `<span class="review-badge correct" style="font-size:0.75rem;">PASS (${record.percentage}%)</span>`
        : `<span class="review-badge incorrect" style="font-size:0.75rem;">NEEDS REVIEW (${record.percentage}%)</span>`;

      row.innerHTML = `
        <td style="font-weight: 700; color: #64748b;">#${history.length - index}</td>
        <td>
          <div style="font-weight: 700; color: #0f172a;">${record.categoryTitle || 'Computer Networks'}</div>
          <div style="font-size: 0.775rem; color: #64748b;">Category ID: ${record.categoryId || 'N/A'}</div>
        </td>
        <td style="font-family: var(--font-mono); font-size: 0.825rem; color: #475569;">
          ${record.date || new Date(record.timestamp || Date.now()).toLocaleDateString()}
        </td>
        <td>
          <span style="font-weight: 800; font-size: 1rem; color: #0f172a;">${record.score}</span>
          <span style="color: #64748b; font-size: 0.85rem;"> / ${record.totalQuestions}</span>
        </td>
        <td>
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <strong style="color: ${isPass ? '#16a34a' : '#dc2626'};">${record.percentage}%</strong>
          </div>
        </td>
        <td>${statusBadge}</td>
        <td>
          <a href="quiz.html?category=${record.categoryId || 1}" class="btn btn-secondary btn-sm" title="Retake this quiz">
            Retake
          </a>
        </td>
      `;

      tableBody.appendChild(row);
    });
  }
}

/**
 * Clear history from LocalStorage
 */
function handleClearHistory() {
  const historyKey = window.NetQuizAuth ? window.NetQuizAuth.STORAGE_KEYS.HISTORY : "netquiz_quiz_history";
  try {
    localStorage.removeItem(historyKey);
    localStorage.removeItem("netquiz_latest_result");
    renderHistoryTable();
  } catch (e) {
    console.error("Error clearing history", e);
  }
}
