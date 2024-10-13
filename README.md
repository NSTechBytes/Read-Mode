

# Read Mode

## Overview

**Read Mode** is a browser extension designed to enhance the reading experience on the web. By providing features such as text highlighting, note-taking, offline saving, and reading aloud, this extension aims to make web content more accessible and user-friendly. Whether you're a student trying to study, a researcher gathering information, or just someone who enjoys reading online articles, Read Mode offers a suite of tools to improve your browsing experience.

## Features

- **Highlight and Save Notes**: Highlight text on any webpage and add personal notes. Save and view these highlights later.
- **Offline Saving**: Save the current webpage for offline reading, preserving its content for future reference.
- **Read Aloud**: Convert selected text or entire pages into speech using the browser's text-to-speech capabilities.
- **Dark Mode**: Toggle dark mode for a more comfortable reading experience in low-light conditions.
- **Font Size Adjustment**: Customize the font size of web pages to suit your reading preferences.
- **Reading Mode**: Simplify webpage content by focusing on main articles or main content sections for a distraction-free reading experience.

## Installation

### Prerequisites

- Google Chrome or another Chromium-based browser.

### Download

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/NSTechBytes/Read-Mode.git
   ```

2. Navigate to the directory:
   ```bash
   cd read-mode
   ```

### Loading the Extension

1. Open Google Chrome and go to `chrome://extensions/`.
2. Enable **Developer mode** by toggling the switch in the top-right corner.
3. Click **Load unpacked** and select the directory where you cloned the repository.

## Usage

Once installed, the Read Mode extension will add an icon to your browser's toolbar. Here’s how to use each feature:

### Highlight and Save Notes

1. Select the text you want to highlight on a webpage.
2. Click the **Highlight & Save Note** button in the extension toolbar.
3. Enter your note in the provided text area and click **Save Note**. Your highlighted text and note will be saved and can be viewed later.

### Offline Saving

1. Click the **Save for Offline** button in the extension toolbar.
2. The current webpage will be saved for offline access. You can access saved pages through the extension.

### Read Aloud

1. Select the text you want to be read aloud or use the button to read the entire page.
2. Click the **Read Aloud** button in the extension toolbar. The selected text or entire page content will be read aloud using the browser's text-to-speech engine.

### Dark Mode

1. Toggle the **Dark Mode** switch in the extension toolbar to enable or disable dark mode.
2. The page background and text colors will adjust according to the selected mode.

### Font Size Adjustment

1. Use the font size slider in the extension toolbar to adjust the font size.
2. The changes will apply immediately to the content of the webpage you are viewing.

### Reading Mode

1. Toggle the **Reading Mode** switch in the extension toolbar to enable or disable reading mode.
2. Reading mode will simplify the content of the webpage by focusing on the main article or content section.

## Configuration

### Settings

- **Dark Mode**: Stored in Chrome’s local storage to persist across sessions.
- **Reading Mode**: Toggle state is saved in Chrome’s sync storage to maintain the mode across sessions and devices.
- **Font Size**: Adjusted dynamically and persists for the current session.

## Troubleshooting

- **Extension Not Working**: Ensure you have enabled the extension in `chrome://extensions/`. If the issue persists, try reloading the extension or checking for updates.
- **Features Not Functioning**: Ensure you are running the latest version of the extension. Clear your browser’s cache and try again.

## Contributing

We welcome contributions to improve the Read Mode extension! To contribute:

1. Fork the repository and clone your fork locally:
   ```bash
   git clone https://github.com/NSTechBytes/Read-Mode.git
   ```

2. Create a new branch for your changes:
   ```bash
   git checkout -b feature-branch
   ```

3. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "Add new feature or fix"
   ```

4. Push your changes to your fork:
   ```bash
   git push origin feature-branch
   ```

5. Open a pull request on the original repository.

Please ensure that your code adheres to the existing style and includes appropriate tests. We also appreciate detailed descriptions of the changes and their purpose.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Google Chrome**: For providing the platform and APIs to build the extension.
- **Font Awesome**: For providing the icons used in the extension.
- **Open Source Community**: For the numerous libraries and tools that made this project possible.

## Contact

For questions or support, please open an issue on the [GitHub repository](https://github.com/NSTechBytes/Read-Mode/issues) or contact us directly at support@example.com.


