document.addEventListener("DOMContentLoaded", function () {
  const saveForOfflineButton = document.getElementById("saveForOffline");
  const highlightTextButton = document.getElementById("highlightText");
  const viewHighlightsButton = document.getElementById("viewHighlights");
  const darkModeToggle = document.getElementById("darkModeToggle");
  const readAloudButton = document.getElementById("readAloud");
  const saveNoteButton = document.getElementById("saveNote");
  const fontSizeSlider = document.getElementById("fontSizeSlider");
  const fontSizeValue = document.getElementById("fontSizeValue");
  const readingModeToggle = document.getElementById("readingModeToggle");

  // Initialize font size display
  fontSizeValue.textContent = `${fontSizeSlider.value}px`;

  // Save Page for Offline
  if (saveForOfflineButton) {
    saveForOfflineButton.addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: saveForOffline,
        });
      });
    });
  }
 // Initialize Reading Mode toggle from saved settings
 chrome.storage.sync.get("readingMode", (data) => {
  readingModeToggle.checked = data.readingMode || false;
  const isReadingMode = readingModeToggle.checked;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: applyReadingModeState,
      args: [isReadingMode],
    });
  });
});
  // Highlight Text and Save Note
  if (highlightTextButton) {
    highlightTextButton.addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            function: getSelectedText,
          },
          (selection) => {
            if (selection[0].result) {
              document.getElementById("highlightedNote").style.display =
                "block";
              document.getElementById("noteText").value = ""; // Clear previous note
              window.selectedText = selection[0].result; // Store selected text
            }
          }
        );
      });
    });
  }

  // Save the highlight note
  if (saveNoteButton) {
    saveNoteButton.addEventListener("click", () => {
      const note = document.getElementById("noteText").value;
      if (window.selectedText && note) {
        const highlightData = {
          text: window.selectedText,
          note: note,
          timestamp: new Date().toISOString(),
        };

        chrome.storage.sync.get({ highlights: [] }, (result) => {
          const updatedHighlights = [...result.highlights, highlightData];
          chrome.storage.sync.set({ highlights: updatedHighlights }, () => {
            alert("Highlight and note saved!");
            document.getElementById("highlightedNote").style.display = "none";
          });
        });
      }
    });
  }

  // View Saved Highlights
  if (viewHighlightsButton) {
    viewHighlightsButton.addEventListener("click", () => {
      chrome.storage.sync.get({ highlights: [] }, (result) => {
        const highlightList = result.highlights
          .map(
            (h) =>
              `<div><strong>${h.text}</strong> - <em>${h.note}</em> (${h.timestamp})</div>`
          )
          .join("");
        document.getElementById("savedHighlights").innerHTML = highlightList;
        document.getElementById("savedHighlights").style.display = "block";
      });
    });
  }


  // Function to read the selected text or the entire page aloud
  function readAloud(text) {
    if (text) {
      // Read the text using Chrome's TTS engine
      chrome.tts.speak(text, {
        rate: 1.0, // Speed of the speech
        pitch: 1.0, // Pitch of the speech
        volume: 1.0, // Volume level of the speech
        lang: "en-US", // Language for the speech
        onEvent: function (event) {
          if (event.type === "end") {
            console.log("Speech finished");
          }
        },
      });
    } else {
      console.log("No text provided for reading");
    }
  }
  // Capture selected text or read full page if no selection
  function captureTextAndReadAloud() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs || tabs.length === 0) {
        console.error("No active tab found.");
        return;
      }

      const tabId = tabs[0].id;

      // First, try to capture selected text
      chrome.scripting.executeScript(
        {
          target: { tabId: tabId },
          func: () => window.getSelection().toString(),
        },
        (selection) => {
          if (chrome.runtime.lastError) {
            console.error("Error executing script: ", chrome.runtime.lastError);
            return;
          }

          if (selection && selection[0] && selection[0].result) {
            readAloud(selection[0].result); // Read selected text
          } else {
            // If no text is selected, read the entire page content
            chrome.scripting.executeScript(
              {
                target: { tabId: tabId },
                func: () => document.body.innerText,
              },
              (pageContent) => {
                if (chrome.runtime.lastError) {
                  console.error(
                    "Error executing script: ",
                    chrome.runtime.lastError
                  );
                  return;
                }

                if (pageContent && pageContent[0] && pageContent[0].result) {
                  readAloud(pageContent[0].result); // Read entire page content
                } else {
                  console.error("No content to read.");
                }
              }
            );
          }
        }
      );
    });
  }

  // Add event listener to the Read Aloud button in the popup
  document
    .getElementById("readAloudBtn")
    .addEventListener("click", captureTextAndReadAloud);

  // Add event listener to the Read Aloud button in the popup
  document
    .getElementById("readAloudBtn")
    .addEventListener("click", captureTextAndReadAloud);

  // Font Size Slider
  
  if (fontSizeSlider) {
    fontSizeSlider.addEventListener('input', () => {
      const fontSize = fontSizeSlider.value;
      fontSizeValue.textContent = `${fontSize}px`;
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: adjustFontSize,
          args: [fontSize]
        });
      });
    });
  }


 // Toggle Reading Mode
 if (readingModeToggle) {
  readingModeToggle.addEventListener("change", (e) => {
    const isReadingMode = e.target.checked;
    chrome.storage.sync.set({ readingMode: isReadingMode });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: toggleReadingMode,
        args: [isReadingMode],
      });
    });
  });
}
});

// Function to save page content offline
function saveForOffline() {
  const htmlContent = document.documentElement.outerHTML;
  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  chrome.runtime.sendMessage({ action: "download", url: url });
}

// Function to grab selected text and highlight it
function getSelectedText() {
  const selection = window.getSelection().toString();
  if (selection) {
    document.designMode = "on";
    document.execCommand("hiliteColor", false, "yellow");
    document.designMode = "off";
  }
  return selection;
}

// Function to read aloud selected text
function readAloud() {
  const selectedText = window.getSelection().toString();
  if (selectedText) {
    const utterance = new SpeechSynthesisUtterance(selectedText);
    utterance.rate = 1.0;
    speechSynthesis.speak(utterance);
  } else {
    alert("Please highlight some text first!");
  }
}

// Function to adjust font size
function adjustFontSize(fontSize) {
  document.body.style.fontSize = `${fontSize}px`;
}

 // Function to toggle reading mode
 function toggleReadingMode(isReadingMode) {
  if (isReadingMode) {
    chrome.storage.local.get("originalContent", (result) => {
      if (!result.originalContent) {
        const content = document.body.innerHTML;
        chrome.storage.local.set({ originalContent: content });
      }

      const readingContent =
        document.body.querySelector("article") ||
        document.body.querySelector("main") ||
        document.body;
      document.body.innerHTML = readingContent.innerHTML;
      document.body.classList.add("reading-mode");
    });
  } else {
    chrome.storage.local.get("originalContent", (result) => {
      if (result.originalContent) {
        document.body.innerHTML = result.originalContent;
        chrome.storage.local.remove("originalContent");
      }
      document.body.classList.remove("reading-mode");
    });
  }
}

// Function to apply reading mode based on saved state
function applyReadingModeState(isReadingMode) {
  if (isReadingMode) {
    document.body.classList.add("reading-mode");
  } else {
    document.body.classList.remove("reading-mode");
  }
}


// Pause TTS
function pauseReading() {
  chrome.tts.pause();
}

// Stop TTS
function stopReading() {
  chrome.tts.stop();
}

// Resume TTS
function resumeReading() {
  chrome.tts.resume();
}

// Add event listeners for pause, stop, and resume buttons
document.getElementById("pauseBtn").addEventListener("click", pauseReading);
document.getElementById("stopBtn").addEventListener("click", stopReading);
document.getElementById("resumeBtn").addEventListener("click", resumeReading);

document.addEventListener("DOMContentLoaded", function () {
  // Other event listeners...

  // Open highlights page in a new tab
  document
    .getElementById("viewHighlightsPage")
    .addEventListener("click", () => {
      chrome.tabs.create({ url: "highlights.html" });
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.getElementById("darkModeToggle");

  // Initialize Dark Mode toggle from saved settings
  chrome.storage.sync.get("darkMode", (data) => {
    darkModeToggle.checked = data.darkMode || false;
    toggleDarkMode(darkModeToggle.checked);
  });

  // Toggle Dark Mode
  darkModeToggle.addEventListener("change", (e) => {
    const isDarkMode = e.target.checked;
    chrome.storage.sync.set({ darkMode: isDarkMode });
    toggleDarkMode(isDarkMode);
  });

  function toggleDarkMode(isDarkMode) {
    if (isDarkMode) {
      document.body.style.backgroundColor = "#121212";
      document.body.style.color = "#e0e0e0";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  }
});



