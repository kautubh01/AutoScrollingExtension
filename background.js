let scrolling = false;
let scrollInterval;

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleScroll") {
    if (scrolling) {
      // Stop scrolling
      clearInterval(scrollInterval);
      scrolling = false;
    } else {
      // Start scrolling
      scrolling = true;
      scrollInterval = setInterval(() => {
        // Query the active tab in the current window
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs.length > 0) {
            // Check if chrome.scripting is available
            if (typeof chrome.scripting !== 'undefined') {
              // Execute the scrollPage function in the context of the active tab
              chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: scrollPage // Reference to the function to be executed
              }, () => {
                if (chrome.runtime.lastError) {
                  console.error(chrome.runtime.lastError);
                }
              });
            } else {
              console.error("chrome.scripting is not available.");
            }
          }
        });
      }, 100); // Adjust the interval for scrolling speed
    }
  }
});

// Function to scroll the page down by 5 pixels
function scrollPage() {
  window.scrollBy(0, 5); // Scroll down by 5 pixels
}