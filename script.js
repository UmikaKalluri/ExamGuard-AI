if (
    window.location.pathname.includes("index.html")
) {

    if (
        localStorage.getItem("isLoggedIn")
        !== "true"
    ) {

        window.location.href =
            "login.html";
    }
}

function analyzeRisk() {

    document.getElementById(
    "result"
).innerHTML = `
    <h2>
        🤖 AI Analyzing
    </h2>

    <p>
        Checking exam risks...
    </p>
`;

    let malpractice =
        parseInt(document.getElementById("malpractice").value) || 0;

    let camera =
        parseInt(document.getElementById("camera").value) || 0;

    let invigilators =
        parseInt(document.getElementById("invigilators").value) || 0;

    let density =
        parseInt(document.getElementById("density").value) || 0;

    let risk = 0;

    if (malpractice > 5) risk += 35;
    else risk += malpractice * 5;

    if (camera < 50) risk += 30;
    else if (camera < 80) risk += 15;

    if (invigilators < 2) risk += 20;

    if (density > 7) risk += 20;

    let level = "";
let riskClass = "";
let recommendations = [];

if (risk >= 70) {

    level = "HIGH RISK";
    riskClass = "high-risk";

    recommendations.push(
        "Increase invigilators"
    );
    recommendations.push(
        "Randomize seating"
    );
    recommendations.push(
        "Improve camera coverage"
    );

} else if (risk >= 40) {

    level = "MEDIUM RISK";
    riskClass = "medium-risk";

    recommendations.push(
        "Monitor hall closely"
    );
    recommendations.push(
        "Adjust seating arrangement"
    );

} else {

    level = "LOW RISK";
    riskClass = "low-risk";

    recommendations.push(
        "Current setup is safe"
    );
}

    let history =
    JSON.parse(localStorage.getItem("examHistory")) || [];

history.push({
    students:
        document.getElementById("students").value,
    malpractice,
    camera,
    invigilators,
    density,
    risk,
    level
});

localStorage.setItem(
    "examHistory",
    JSON.stringify(history)
);

setTimeout(() => {
document.getElementById("result").innerHTML = `
    <h2>🤖 Fraud Analysis Report</h2>

    <div class="${riskClass}">
        ${level}
    </div>

    <p>
        <strong>Risk Score:</strong>
        ${risk}%
    </p>

    <h3>AI Recommendations</h3>

    <ul>
        ${recommendations
        .map(r => `<li>${r}</li>`)
        .join("")}
    </ul>
`;
}, 1500);
}
function resetForm() {

    document.getElementById("students").value = "";
    document.getElementById("malpractice").value = "";
    document.getElementById("camera").value = "";
    document.getElementById("invigilators").value = "";
    document.getElementById("density").value = "";

    document.getElementById("result").innerHTML = "";
}

function viewHistory() {

    let history =
        JSON.parse(localStorage.getItem("examHistory")) || [];

    let historyHTML = "<h2>Search History</h2>";

    if (history.length === 0) {
        historyHTML += "<p>No history found.</p>";
    } else {

        history.reverse().forEach((item, index) => {
            historyHTML += `
            <div class="history-card">
                <strong>Search ${index + 1}</strong><br>
                Students: ${item.students}<br>
                Malpractice: ${item.malpractice}<br>
                Camera: ${item.camera}%<br>
                Invigilators: ${item.invigilators}<br>
                Density: ${item.density}<br>
                Risk Score: ${item.risk}%<br>
                Risk Level: ${item.level}
            </div>
            `;
        });
    }

    document.getElementById(
        "historySection"
    ).innerHTML = historyHTML;
}

function login() {

    let username =
        document.getElementById("username").value;

    let password =
        document.getElementById("password").value;

    if (
        username === "admin" &&
        password === "exam123"
    ) {

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );

        window.location.href = "index.html";

    } else {

        document.getElementById(
            "error-msg"
        ).innerText =
        "Invalid username or password!";
    }
}

function logout() {

    localStorage.removeItem(
        "isLoggedIn"
    );

    window.location.href =
        "login.html";
}

function downloadReport() {

    let report =
        document.getElementById("result")
        .innerText;

    if (!report.trim()) {
        alert(
            "Please analyze risk first!"
        );
        return;
    }

    let blob = new Blob(
        [report],
        { type: "text/plain" }
    );

    let link =
        document.createElement("a");

    link.href =
        URL.createObjectURL(blob);

    link.download =
        "ExamGuard_Report.txt";

    link.click();
}

function toggleTheme() {

    document.body.classList
        .toggle("dark-mode");

    let btn =
        document.querySelector(
            ".theme-btn"
        );

    if (
        document.body.classList
        .contains("dark-mode")
    ) {

        btn.innerText =
            "☀️ Light Mode";

    } else {

        btn.innerText =
            "🌙 Dark Mode";
    }
}