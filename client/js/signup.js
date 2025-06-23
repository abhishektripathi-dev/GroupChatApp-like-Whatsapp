const SERVER_BASE_URL="http://localhost:3001/api"

const formEl = document.querySelector("form");

formEl.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = {
        fullName: event.target.username.value,
        email: event.target.email.value,
        password: event.target.password.value,
        phone: event.target.phonenumber.value,
    };

    try {
        const postResponse = await axios.post(
            `${SERVER_BASE_URL}/auth/signup`,
            formData
        );
        if (postResponse.status === 201) {
            window.location.href = "login.html";
            // alert(postResponse.data.message);
        }
        resetForm(event);
    } catch (error) {
        alert(error.response.data.message);
        if (error.response.status === 400) {
            window.location.href = "login.html";
        }

        resetForm(event);
    }
});

function resetForm(event) {
    event.target.username.value = "";
    event.target.email.value = "";
    event.target.password.value = "";
    event.target.phonenumber.value = "";
}
