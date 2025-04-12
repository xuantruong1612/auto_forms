document.getElementById("saveBtn").addEventListener("click", () => {
    try {
        const input = document.getElementById("answersInput").value;
        const answers = JSON.parse(input);
        
        console.log("Dữ liệu JSON đã nhập: ", answers); // In ra dữ liệu JSON

        chrome.storage.local.set({ formAnswers: answers }, () => {
            document.getElementById("status").innerText = "✅ Đã lưu đáp án!";

            // Thông báo content script điền form
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { action: "fillForm" });
            });
        });
    } catch (e) {
        document.getElementById("status").innerText = "❌ Lỗi JSON không hợp lệ!";
    }
});
