const token = localStorage.getItem("token");
let messagesFromLocalStorage =
    JSON.parse(localStorage.getItem("message")) || [];

if (!token) {
    alert("You need to log in to access this page.");
    window.location.href = "./login.html";
}

const BASE_URL = "http://localhost:3001";
const chatBoxForm = document.getElementById("chatBox");
const messageTable = document.getElementById("message-table");

// Create and add "Load Older Messages" button
const loadOlderBtn = document.createElement("button");
loadOlderBtn.textContent = "Load Older Messages";
loadOlderBtn.style.display = "block";
loadOlderBtn.style.margin = "10px auto";
loadOlderBtn.onclick = async function () {
    await loadAllMessages();
};
document.querySelector(".container").prepend(loadOlderBtn);

chatBoxForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const messageText = event.target.message.value;
    try {
        await axios.post(
            `${BASE_URL}/api/chat`,
            { message: messageText },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        event.target.message.value = "";
        await loadMessages();
    } catch (error) {
        console.log(error);
    }
});

async function loadMessages() {
    messageTable.innerHTML = "";
    let apiResponse;
    if (messagesFromLocalStorage.length === 0) {
        apiResponse = await axios.get(`${BASE_URL}/api/chat?id=0`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        apiResponse = await axios.get(
            `${BASE_URL}/api/chat?id=${
                messagesFromLocalStorage[messagesFromLocalStorage.length - 1].id
            }`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    }

    const joinedUsernames = apiResponse.data.userName || [];
    joinedUsernames.forEach((username) => {
        const trElement = document.createElement("tr");
        trElement.innerHTML = `<td><span>${username}:</span> Joined</td>`;
        messageTable.appendChild(trElement);
    });

    // Merge and keep only last 10 messages
    const allMessages = [
        ...messagesFromLocalStorage,
        ...(apiResponse.data.message || []),
    ];
    const lastTenMessages = allMessages.slice(-10);

    lastTenMessages.forEach((item) => {
        const trElement = document.createElement("tr");
        trElement.innerHTML = `<td><span>${item.username}:</span> ${item.message}</td>`;
        messageTable.appendChild(trElement);
    });

    messagesFromLocalStorage = lastTenMessages;
    localStorage.setItem("message", JSON.stringify(lastTenMessages));
}

async function loadAllMessages() {
    try {
        messageTable.innerHTML = "";
        const apiResponse = await axios.get(`${BASE_URL}/api/chat`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const joinedUsernames = apiResponse.data.userName || [];
        joinedUsernames.forEach((username) => {
            const trElement = document.createElement("tr");
            trElement.innerHTML = `<td><span>${username}:</span> Joined</td>`;
            messageTable.appendChild(trElement);
        });

        const allMessages = apiResponse.data.message || [];
        allMessages.forEach((item) => {
            const trElement = document.createElement("tr");
            trElement.innerHTML = `<td><span>${item.username}:</span> ${item.message}</td>`;
            messageTable.appendChild(trElement);
        });

        // Optionally update localStorage with last 10 messages
        messagesFromLocalStorage = allMessages.slice(-10);
        localStorage.setItem(
            "message",
            JSON.stringify(messagesFromLocalStorage)
        );
    } catch (error) {
        console.log(error);
    }
}

loadMessages();
