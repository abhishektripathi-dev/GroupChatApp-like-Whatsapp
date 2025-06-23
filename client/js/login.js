const loginForm = document.getElementById("login-form");
const errorEl = document.getElementById("error");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    errorEl.innerHTML = "";

    const formData = {
        email: event.target.email.value,
        password: event.target.password.value,
    };

    try {
        const postResponse = await axios(
            "http://localhost:3001/api/user/login",
            formData
        );

        if (postResponse.status === 200) {
            localStorage.setItem("token", postResponse.data.token);
        }
        resetForm(event);
    } catch (error) {
        resetForm(event);

        if (error.response.status !== 200) {
            errorEl.innerHTML = JSON.stringify(error.response.data.message);
        }
    }
});

function resetForm(event) {
    event.target.email.value = "";
    event.target.password.value = "";
}

const forgotPasswordForm = document.getElementById("forgot-password-form");
const forgotPasswordBtn = document.getElementById("forgot-password-btn");
const loginSection = document.getElementById("login");

async function forgotPassword() {
    forgotPasswordForm.style.display = "block";
    forgotPasswordBtn.style.display = "none";
    loginSection.style.display = "none";

    forgotPasswordForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const forgotPasswordResponse = await axios.post(
            "http://localhost:3001/api/user/forgotpassword",
            { email }
        );
        event.target.email.value = "";
        forgotPasswordForm.style.display = "none";
        alert("Reset link sent to your mail");
    });
}
