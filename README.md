# Chrome Extension: Redirect Links with Finicky

This Chrome extension uses the [Finicky](https://github.com/johnste/finicky) app to manage how links are opened between browsers. It automatically redirects all Google Workspace links (e.g., Gmail, Google Drive, Google Docs) to the Chrome browser, while other links open in your default browser (e.g., Arc).

![archrome-screen](https://github.com/user-attachments/assets/ab08eecf-ec93-42be-a39f-edebe694a825)

## Features

- **Automatic Redirection**: Opens all Google Workspace links directly in Chrome.
- **Default Browser Handling**: All non-Google Workspace links open in your preferred browser using Finicky.
- **Toggle Auto-Redirection**: You can disable automatic redirection through the context menu. When disabled, you can manually open links through Finicky by clicking the extension's icon.

## Installation

1. **Install Finicky**:  
   Download the Finicky app from its [official GitHub page](https://github.com/johnste/finicky/releases/latest) and move the app to your Applications folder and open it. When prompted, set Finicky as your default browser.

2. **Configure Finicky**:  
   Use the following configuration in your `.finicky.js` file. This configuration ensures Google Workspace links open in Chrome while other links open in your default browser (e.g., Arc).

   ```javascript
   module.exports = {
     defaultBrowser: "Arc",
     handlers: [{
       match: finicky.matchHostnames([
         "docs.google.com",
         "mail.google.com",
         "calendar.google.com",
         "slides.google.com",
         "drive.google.com",
         "admin.google.com",
         "meet.google.com"
       ]),
       browser: "Google Chrome"
     }]
   };
   ```

3. **Install the Extension**:  
   Download the extension from the [Chrome Web Store](https://chromewebstore.google.com/detail/archrome/opfajgjfkddfplcdkclikefccndaonml) and install it in both Chrome and Arc browsers for full functionality.
