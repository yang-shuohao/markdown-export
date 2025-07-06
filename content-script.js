(() => {
  function sanitizeFilename(name) {
    return name.replace(/[\\/:*?"<>|]/g, "_");
  }

  const host = location.hostname;

  function parseZhihu() {
    const title = document.title.split("_")[0];
    const content = document.querySelector(".Post-RichText, .QuestionAnswer-content");
    if (!content) return alert("未找到知乎文章内容");

    let markdown = `# ${title}\n\n`;
    content.querySelectorAll("p, h1, h2, h3, img, pre").forEach(el => {
      if (el.tagName === "IMG") {
        markdown += `![image](${el.src})\n\n`;
      } else if (el.tagName === "PRE") {
        markdown += "```\n" + el.innerText + "\n```\n\n";
      } else {
        markdown += el.innerText + "\n\n";
      }
    });
    return { title, markdown };
  }

  function parseCSDN() {
    const titleEl = document.querySelector("h1.title-article");
    const content = document.querySelector(".blog-content-box");
    if (!titleEl || !content) return alert("未找到CSDN文章内容");

    const title = titleEl.innerText.trim();
    let markdown = `# ${title}\n\n`;

    content.querySelectorAll("p, h1, h2, h3, img, pre, code").forEach(el => {
      if (el.tagName === "IMG") {
        const src = el.getAttribute("data-original-src") || el.src;
        markdown += `![image](${src})\n\n`;
      } else if (el.tagName === "PRE" || el.tagName === "CODE") {
        markdown += "```\n" + el.innerText + "\n```\n\n";
      } else {
        markdown += el.innerText + "\n\n";
      }
    });

    return { title, markdown };
  }

  function parseWeChat() {
    const titleEl = document.querySelector("#activity-name");
    const content = document.querySelector("#js_content");
    if (!titleEl || !content) return alert("未找到微信公众号文章内容");

    const title = titleEl.innerText.trim();
    let markdown = `# ${title}\n\n`;

    content.querySelectorAll("p, h1, h2, h3, img, pre").forEach(el => {
      if (el.tagName === "IMG") {
        const src = el.getAttribute("data-src") || el.src;
        markdown += `![image](${src})\n\n`;
      } else if (el.tagName === "PRE") {
        markdown += "```\n" + el.innerText + "\n```\n\n";
      } else {
        markdown += el.innerText + "\n\n";
      }
    });

    return { title, markdown };
  }

  function parseCnblogs() {
    const title = document.querySelector("#cb_post_title")?.innerText || document.title;
    const content = document.querySelector("#cnblogs_post_body");
    if (!content) return alert("未找到博客园文章内容");

    let markdown = `# ${title}\n\n`;

    content.querySelectorAll("p, h1, h2, h3, img, pre, code").forEach(el => {
      if (el.tagName === "IMG") {
        markdown += `![image](${el.src})\n\n`;
      } else if (el.tagName === "PRE" || el.tagName === "CODE") {
        markdown += "```\n" + el.innerText + "\n```\n\n";
      } else {
        markdown += el.innerText + "\n\n";
      }
    });

    return { title, markdown };
  }

  let result;

  if (host.includes("zhihu.com")) {
    result = parseZhihu();
  } else if (host.includes("csdn.net")) {
    result = parseCSDN();
  } else if (host.includes("mp.weixin.qq.com")) {
    result = parseWeChat();
  } else if (host.includes("cnblogs.com")) {
    result = parseCnblogs();
  } else {
    alert("当前站点不支持导出");
    return;
  }

  if (!result) return;

  const filename = sanitizeFilename(result.title) + ".md";
  const blob = new Blob([result.markdown], { type: "text/markdown" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
})();
