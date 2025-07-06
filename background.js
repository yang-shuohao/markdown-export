chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "export-md",
    title: "导出文章为 Markdown",
    contexts: ["page"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "export-md" && tab?.id) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content-script.js"]
    });
  }
});
