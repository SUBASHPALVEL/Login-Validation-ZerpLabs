const userCredentials = [
  { email: "user1@example.com", password: "Q!w2" },
  { email: "user2@example.com", password: "Q!w2" },
  { email: "user3@example.com", password: "Q!w2" },
];

// Get form element
const button1 = document.querySelector("#submitButton");

// Get input elements
const emailInput = document.querySelector("#Email");
const passwordInput = document.querySelector("#Password");

// Get error elements
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");

const successMessage = document.getElementById("successMessage");
const failureMessage = document.getElementById("failureMessage");
const formContainer = document.querySelector(".container");

// Validation functions
function isValidEmail(email) {
  // Email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  const requirements = {
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    digit: /\d/,
    special: /[@$!%*?&]/,
  };

  let errorMessage = "Password must contain: ";

  for (const requirement in requirements) {
    if (!requirements[requirement].test(password)) {
      errorMessage += requirement + ", ";
    }
  }

  if (errorMessage !== "Password must contain: ") {
    passwordError.textContent = errorMessage.slice(0, -2);
    passwordInput.classList.add("errorbox");
    return false;
  } else {
    passwordError.textContent = "";
    passwordInput.classList.remove("errorbox");
    return true;
  }
}

// Validate on input change
emailInput.addEventListener("input", () => {
  // Validate email
  if (!emailInput.value.trim()) {
    emailError.textContent = "Email is required";
    emailInput.classList.add("errorbox");
  } else if (!isValidEmail(emailInput.value)) {
    emailError.textContent = "Invalid email";
    emailInput.classList.add("errorbox");
  } else {
    emailInput.classList.remove("errorbox");
    emailError.textContent = "";
  }
});

passwordInput.addEventListener("input", () => {
  // Validate password
  if (!passwordInput.value.trim()) {
    passwordError.textContent = "Password is required";
    passwordInput.classList.add("errorbox");
  } else {
    isValidPassword(passwordInput.value);
  }
});

// Submit form
button1.addEventListener("click", (e) => {
  e.preventDefault();

  // Check if valid
  if (!emailError.textContent && !passwordError.textContent) {
    checkCredentials(emailInput.value, passwordInput.value);
  }
});

function checkCredentials(email, password) {
  for (const user of userCredentials) {
    if (user.email === email && user.password === password) {
      formContainer.style.display = "none";
      successMessage.style.display = "block";
      return;
    } else {
      formContainer.style.display = "none";
      failureMessage.style.display = "block";
    }
  }
}
