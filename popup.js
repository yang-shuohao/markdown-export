document.addEventListener("DOMContentLoaded", () => {
  const exportBtn = document.getElementById("export-md");
  exportBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (!tab) return alert("未找到活动标签页");
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content-script.js"]
      });
    });
  });

  const githubBtn = document.getElementById("github-btn");
  githubBtn.addEventListener("click", () => {
    chrome.tabs.create({ url: "https://github.com/yang-shuohao/markdown-export" });
  });
});
