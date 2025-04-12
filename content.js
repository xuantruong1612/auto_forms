// Hàm điền form khi có dữ liệu
function fillForm(answers) {
    console.log("Dữ liệu JSON nhận được: ", answers); // In ra dữ liệu JSON

    const questions = document.querySelectorAll("div[role='listitem']");
    console.log("Tìm thấy các câu hỏi: ", questions.length);

    questions.forEach((questionEl) => {
        const labelEl = questionEl.querySelector("div[role='heading']");
        if (!labelEl) return;

        // Lấy tên câu hỏi và in ra để kiểm tra
        const questionText = labelEl.innerText.trim();
        console.log("Câu hỏi đang kiểm tra: ", questionText);

        // Lấy đáp án từ JSON tương ứng với câu hỏi
        const answerValue = answers[questionText];
        console.log("Đáp án tìm thấy cho câu hỏi: ", answerValue);

        if (!answerValue) return;

        // Kiểm tra các lựa chọn radio buttons
        const radioOptions = questionEl.querySelectorAll("div[role='radio']");
        if (radioOptions.length > 0) {
            console.log("Tìm thấy các radio button");

            radioOptions.forEach((optionEl) => {
                const textEl = optionEl.querySelector("div.exportLabelWrapper span");
                if (textEl && textEl.innerText.trim() === answerValue) {
                    console.log("Đã tìm thấy và click radio button: ", answerValue);
                    optionEl.click();
                }
            });
            return; // Nếu đã điền radio, không cần xử lý thêm
        }

        // Kiểm tra các lựa chọn checkbox
        const checkboxOptions = questionEl.querySelectorAll("div[role='checkbox']");
        if (checkboxOptions.length > 0) {
            console.log("Tìm thấy các checkbox");

            checkboxOptions.forEach((optionEl) => {
                const textEl = optionEl.querySelector("div.exportLabelWrapper span");
                if (textEl && textEl.innerText.trim() === answerValue) {
                    console.log("Đã tìm thấy và click checkbox: ", answerValue);
                    optionEl.click();
                }
            });
            return; // Nếu đã điền checkbox, không cần xử lý thêm
        }

        // Kiểm tra các câu hỏi kiểu text input
        const textInput = questionEl.querySelector("input[type='text']");
        if (textInput) {
            console.log("Tìm thấy input text");
            textInput.value = answerValue;  // Điền vào input text
        }
    });
}

// Khi nhận tín hiệu từ popup hoặc trang load
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "fillForm") {
        chrome.storage.local.get("formAnswers", (data) => {
            if (data.formAnswers) {
                fillForm(data.formAnswers);
            }
        });
    }
});

// Tự động điền khi trang load
window.addEventListener("load", () => {
    chrome.storage.local.get("formAnswers", (data) => {
        if (data.formAnswers) {
            fillForm(data.formAnswers);
        }
    });
});
