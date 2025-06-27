const token = localStorage.getItem("token");

if (!token) {
    alert("You need to log in to access this page.");
    window.location.href = "./login.html";
}

const BASE_URL = "http://localhost:3001";

const chatBoxForm = document.getElementById("chatBox");

chatBoxForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = event.target.message.value;
    console.log(message);

    try {
        let response = await axios.post(
            `${BASE_URL}/api/chat`,
            { message },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        event.target.message.value = "";
    } catch (error) {
        console.log(error);
    }
});

const messageTable = document.getElementById("message-table");

async function loadMessage() {
    const response = await axios.get(`${BASE_URL}/api/chat`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const userNameArray = response.data.userName;
    userNameArray.forEach((username) => {
        const trEl = document.createElement("tr");
        trEl.innerHTML = `<td><span>${username}:</span> Joined</td>`;
        messageTable.appendChild(trEl);
    });

    const messageArray = response.data.message;
    messageArray.forEach((item) => {
        const trEl = document.createElement("tr");
        trEl.innerHTML = `<td><span>${item.userName}:</span> ${item.message}</td>`;
        messageTable.appendChild(trEl);
    });
}

setInterval


loadMessage();
