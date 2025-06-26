// const loginForm = document.getElementById("login-form");
// const errorEl = document.getElementById("error");

// loginForm.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     errorEl.innerHTML = "";

//     const formData = {
//         phone: event.target.phonenumber.value,
//         password: event.target.password.value,
//     };

//     try {
//         const postResponse = await axios(
//             "http://localhost:3001/api/user/login",
//             formData
//         );

//         if (postResponse.status === 200) {
//             localStorage.setItem("token", postResponse.data.token);
//             window.location.href = "../views/chitchat.html"
//         }
//         resetForm(event);
//     } catch (error) {
//         resetForm(event);

//         if (error.response.status !== 200) {
//             errorEl.innerHTML = JSON.stringify(error.response.data.message);
//         }
//     }
// });

// function resetForm(event) {
//     event.target.phonenumber.value = "";
//     event.target.password.value = "";
// }

// const forgotPasswordForm = document.getElementById("forgot-password-form");
// const forgotPasswordBtn = document.getElementById("forgot-password-btn");
// const loginSection = document.getElementById("login");

// async function forgotPassword() {
//     forgotPasswordForm.style.display = "block";
//     forgotPasswordBtn.style.display = "none";
//     loginSection.style.display = "none";

//     forgotPasswordForm.addEventListener("submit", async (event) => {
//         event.preventDefault();

//         const email = event.target.email.value;
//         const forgotPasswordResponse = await axios.post(
//             "http://localhost:3001/api/auth/forgotpassword   ",
//             { email }
//         );
//         event.target.email.value = "";
//         forgotPasswordForm.style.display = "none";
//         alert("Reset link sent to your mail");
//     });
// }

// const BASE_URL = "http://13.201.187.202";
// const BASE_URL = "http://13.201.187.202/3000";
const BASE_URL = "http://localhost:3001";

// Toggle password visibility
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
    const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePassword.textContent = type === "password" ? "👁️" : "🙈";
});

// Forgot Password logic
// Modal Elements
const forgotPasswordLink = document.getElementById("forgotPasswordLink");
const forgotPasswordModal = document.getElementById("forgotPasswordModal");
const closeModal = document.getElementById("closeModal");
const forgotPasswordForm = document.getElementById("forgotPasswordForm");

// Show modal on clicking "Forgot Password?"
forgotPasswordLink.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    forgotPasswordModal.style.display = "flex"; // Show the modal
});

// Close modal on clicking "Close" button
closeModal.addEventListener("click", () => {
    forgotPasswordModal.style.display = "none"; // Hide the modal
});

// forgot password logic

const forgotSubmit = document.getElementById("forgotPasswordBtn");

forgotSubmit.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("forgotEmail").value.trim();

    try {
        const response = await axios.post(`${BASE_URL}/api/forgotpassword`, {
            email,
        });
        alert(response.data.message || "Password reset email sent!");
        forgotPasswordForm.reset(); // Reset the form
        forgotPasswordModal.style.display = "none"; // Hide the modal
    } catch (error) {
        console.log(error);
        alert(
            error.response?.data?.message ||
                "An error occurred. Please try again."
        );
    }
});

// Sign-in form submission logic
const signinForm = document.getElementById("signinForm");

signinForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const phone = event.target.phone.value;
    const password = event.target.password.value;

    try {
        const response = await axios.post(`${BASE_URL}/api/auth/login`, {
            phone,
            password,
        });
        if (response.status === 200) {
            const { message, token } = response.data;
            localStorage.setItem("token", token);
            alert(message);
            window.location.href = "./chitchat.html";
        }
    } catch (error) {
        alert(
            error.response?.data?.message || "An error occurred during login."
        );
    }
});
