// Initialize play coins
let balance = Number(localStorage.getItem('playCoins')) || 5;
updateBalance();

// Get elements
const balanceEl = document.getElementById('balance');
const usernameEl = document.getElementById('username');
const amountEl = document.getElementById('amount');
const logEl = document.getElementById('log');
const depositBtn = document.getElementById('deposit-btn');
const withdrawBtn = document.getElementById('withdraw-btn');

// Update balance display
function updateBalance() {
  balanceEl.textContent = `Coins: ${balance}`;
  localStorage.setItem('playCoins', balance);
}

// Add a log entry
function addLog(message) {
  const p = document.createElement('p');
  p.textContent = message;
  logEl.prepend(p); // newest at top
}

// Simulate deposit
depositBtn.addEventListener('click', () => {
  const username = usernameEl.value.trim() || "Unknown";
  const amount = Number(amountEl.value);
  if (amount <= 0 || isNaN(amount)) return alert("Enter a valid amount.");
  balance += amount;
  updateBalance();
  addLog(`${amount} coins deposited by ${username}`);
  amountEl.value = '';
});

// Simulate withdraw
withdrawBtn.addEventListener('click', () => {
  const username = usernameEl.value.trim() || "Unknown";
  const amount = Number(amountEl.value);
  if (amount <= 0 || isNaN(amount)) return alert("Enter a valid amount.");
  if (amount > balance) return alert("Not enough coins.");
  balance -= amount;
  updateBalance();
  addLog(`${amount} coins withdrew by ${username}`);
  amountEl.value = '';
});
