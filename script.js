// ----------------------------
// GLOBAL BALANCE SYSTEM
// ----------------------------

// Load or initialize balance
let balance = Number(localStorage.getItem('playCoins')) || 5;

// Load or initialize transaction log
let transactionLog = JSON.parse(localStorage.getItem('transactionLog')) || [];

// Load username if saved
let username = localStorage.getItem('username') || "Unknown";

// Update all balance elements on the page
function updateBalanceDisplay() {
  const balanceEls = document.querySelectorAll('#balance');
  balanceEls.forEach(el => el.textContent = `Coins: ${balance}`);
  localStorage.setItem('playCoins', balance);
}

// Add a log entry to #log div (index.html only)
function addLog(message) {
  const logEl = document.getElementById('log');
  if (!logEl) return;
  const p = document.createElement('p');
  p.textContent = message;
  logEl.prepend(p);
}

// Add a transaction to the log and save in localStorage
function addTransaction(type, amount) {
  const time = new Date().toLocaleString();
  const transaction = { type, amount, time, username };
  transactionLog.push(transaction);
  localStorage.setItem('transactionLog', JSON.stringify(transactionLog));
  addLog(`${type} ${amount} coins (User: ${username})`);
}

// ----------------------------
// DEPOSIT & WITHDRAW FUNCTIONS
// ----------------------------

function deposit(amount, userInput) {
  username = userInput.trim() || "Unknown";
  localStorage.setItem('username', username);

  if (!amount || amount <= 0) return alert("Enter a valid deposit amount");

  balance += amount;
  updateBalanceDisplay();
  addTransaction("Deposit", amount);
}

function withdraw(amount, userInput) {
  username = userInput.trim() || "Unknown";
  localStorage.setItem('username', username);

  if (!amount || amount <= 0) return alert("Enter a valid withdraw amount");
  if (amount > balance) return alert("Not enough coins");

  balance -= amount;
  updateBalanceDisplay();
  addTransaction("Withdraw", amount);
}

// ----------------------------
// GAME HELPER FUNCTIONS
// ----------------------------

// Check if player can place a bet
function canBet(amount) {
  return amount > 0 && amount <= balance;
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

// Initialize balance display on page load
updateBalanceDisplay();
