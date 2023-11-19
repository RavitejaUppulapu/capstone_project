const userForm = document.querySelector("#user-form");

// Retrieve entries from localStorage or return empty array
const retrieveUserEntries = () => {
  const storedEntries = localStorage.getItem("user-entries");
  return storedEntries ? JSON.parse(storedEntries) : [];
};

// Get User Entries from localStorage
let userEntries = retrieveUserEntries();

// Display user entries in table
const displayUserEntries = () => {
  const entries = retrieveUserEntries();
  const rows = entries
    .map((entry) => {
      const { name, email, password, dob, acceptTerms } = entry;
      const row = `
        <tr>
          <td>${name}</td>
          <td>${email}</td>
          <td>${password}</td>
          <td>${dob}</td>
          <td>${acceptTerms}</td>
        </tr>`;
      return row;
    })
    .join("\n");

  const table = `
    <table class="table-auto relative text-white">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Dob</th>
          <th>Accepted terms?</th>
        </tr>
      </thead>
      <tbody id="showData">${rows}</tbody>
    </table>`;

  document.querySelector("#tableDiv").innerHTML = table;
};

// Save user form data to localStorage and display it in table
const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const dob = document.querySelector("#dob").value;
  const acceptTerms = document.querySelector("#acceptTerms").checked;

  const userEntry = { name, email, password, dob, acceptTerms };
  userEntries.push(userEntry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayUserEntries();
};

// Add form submit event listener
userForm.addEventListener("submit", saveUserForm);

// Display entries on page load
displayUserEntries();

// Validate date of birth to be between 18 and 55 years old
const dobInput = document.querySelector("#dob");
dobInput.addEventListener("change", () => {
  const [year, month, date] = dobInput.value.split("-");
  const dob = new Date(year, month - 1, date);
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();

  if (today < new Date(dob.setFullYear(dob.getFullYear() + age))) {
    age--;
  }

  if (age < 18 || age > 55) {
    dobInput.setCustomValidity("Your age must be between 18 and 55");
    dobInput.style.border = "2px solid red";
  } else {
    dobInput.setCustomValidity("");
    dobInput.style.border = "2px solid rgba(0, 0, 0, 0.4)";
  }
});

// Validate email format
const emailInput = document.querySelector("#email");
emailInput.addEventListener("input", () => {
  if (emailInput.validity.typeMismatch) {
    emailInput.setCustomValidity("The Email is not in the right format!!!");
    emailInput.reportValidity();
  } else {
    emailInput.setCustomValidity("");
  }
});
