// ----------------------------
// GLOBAL BALANCE SYSTEM
// ----------------------------

// Initialize balance
let balance = Number(localStorage.getItem('playCoins')) || 5;

// Update all balance displays
function updateBalanceDisplay() {
  const balanceEls = document.querySelectorAll('#balance');
  balanceEls.forEach(el => {
    el.textContent = `Coins: ${balance}`;
  });
  localStorage.setItem('playCoins', balance);
}

// Add a log entry
function addLog(message) {
  const logEl = document.getElementById('log');
  if (logEl) {
    const p = document.createElement('p');
    p.textContent = message;
    logEl.prepend(p); // newest on top
  }
}

// ----------------------------
// DEPOSIT & WITHDRAW LOGIC
// ----------------------------

function deposit(amount) {
  if (!amount || amount <= 0) {
    alert("Enter a valid deposit amount");
    return;
  }
  balance += amount;
  updateBalanceDisplay();
  addLog(`Deposited ${amount} coins`);
}

function withdraw(amount) {
  if (!amount || amount <= 0) {
    alert("Enter a valid withdraw amount");
    return;
  }
  if (amount > balance) {
    alert("Not enough coins to withdraw");
    return;
  }
  balance -= amount;
  updateBalanceDisplay();
  addLog(`Withdrew ${amount} coins`);
}

// ----------------------------
// GAME HELPER FUNCTIONS
// ----------------------------

// Check if player has enough coins for a bet
function canBet(amount) {
  if (!amount || amount <= 0) return false;
  if (amount > balance) return false;
  return true;
}

// Deduct coins for a bet
function placeBet(amount) {
  if (!canBet(amount)) return false;
  balance -= amount;
  updateBalanceDisplay();
  return true;
}

// Add winnings after a game
function addWinnings(amount) {
  balance += amount;
  updateBalanceDisplay();
}

// Initialize display on page load
updateBalanceDisplay();
