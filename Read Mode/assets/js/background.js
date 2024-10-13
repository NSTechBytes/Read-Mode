
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'download') {
      const url = message.url;
      chrome.downloads.download({
        url: url,
        filename: 'offline_page.html',
      });
    }
  });


 
  
  