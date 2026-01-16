// Make sure username is loaded from localStorage
username = localStorage.getItem('username') || "Unknown";

// Deposit example
function deposit(amount) {
  if (!username) return alert("Please login first!");
  if (!amount || amount <= 0) return alert("Enter a valid deposit amount");

  balance += amount;
  updateBalanceDisplay();
  addTransaction("Deposit", amount);
}

// Withdraw example
function withdraw(amount) {
  if (!username) return alert("Please login first!");
  if (!amount || amount <= 0) return alert("Enter a valid withdraw amount");
  if (amount > balance) return alert("Not enough coins");

  balance -= amount;
  updateBalanceDisplay();
  addTransaction("Withdraw", amount);
}
