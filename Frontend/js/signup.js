// const SERVER_BASE_URL="http://localhost:3001/api"

// const formEl = document.querySelector("form");

// formEl.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const formData = {
//         fullName: event.target.username.value,
//         email: event.target.email.value,
//         password: event.target.password.value,
//         phone: event.target.phonenumber.value,
//     };

//     try {
//         const postResponse = await axios.post(
//             `${SERVER_BASE_URL}/auth/signup`,
//             formData
//         );
//         if (postResponse.status === 201) {
//             window.location.href = "login.html";
//             // alert(postResponse.data.message);
//         }
//         resetForm(event);
//     } catch (error) {
//         alert(error.response.data.message);
//         if (error.response.status === 400) {
//             window.location.href = "login.html";
//         }

//         resetForm(event);
//     }
// });

// function resetForm(event) {
//     event.target.username.value = "";
//     event.target.email.value = "";
//     event.target.password.value = "";
//     event.target.phonenumber.value = "";
// }
// const BASE_URL = "http://13.201.187.202";
// const BASE_URL = "http://13.201.187.202/3000";
const BASE_URL = "http://localhost:3001";

// Toggle password visibility
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
    // Toggle the input type between password and text
    const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    // Change the icon accordingly
    togglePassword.textContent = type === "password" ? "👁️" : "🙈";
});

// Handle signup form submission
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const phone = event.target.phone.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    let data = { name, phone, email, password };

    try {
        // Send user data to the server
        const response = await axios.post(`${BASE_URL}/api/auth/signup`, data);
        // Handle response
        if (response.status === 201) {
            alert("User registered successfully! Redirecting to Sign In.");
            // Redirect to login page
            window.location.href = "./login.html";
        }
    } catch (error) {
        if (
            error.response &&
            error.response.data.message === "User already exists"
        ) {
            // Handle user already exists error
            alert("User already exists. Please log in.");
            window.location.href = "./login.html";
        } else {
            console.error("Error registering user:", error);
            alert("An error occurred. Please try again later.");
        }
    }
});
