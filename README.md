# Chrome Extension: Redirect Links with Finicky

This Chrome extension uses the [Finicky](https://johnste.github.io/finicky/) app to manage how links are opened between browsers. It automatically redirects all Google Workspace links (e.g., Gmail, Google Drive, Google Docs) to the Chrome browser, while other links open in your default browser (e.g., Arc).

![archrome-screen](https://github.com/user-attachments/assets/ab08eecf-ec93-42be-a39f-edebe694a825)

## Features

- **Automatic Redirection**: Opens all Google Workspace links directly in Chrome.
- **Default Browser Handling**: All non-Google Workspace links open in your preferred browser using Finicky.
- **Toggle Auto-Redirection**: You can disable automatic redirection through the context menu. When disabled, you can manually open links through Finicky by clicking the extension's icon.

## Installation

1. Install the extension from the [Chrome Web Store](https://chromewebstore.google.com/detail/archrome/opfajgjfkddfplcdkclikefccndaonml).

2. Make sure the Finicky app is properly set up to handle the link redirection.

## Configuration (Required)

For the extension to work correctly, you must configure the `finicky.js` file in your Finicky app with the following settings:

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
This configuration ensures that links to Google Workspace services will open in Chrome, while all other links will open in Arc. Without this setup, the extension will not function as intended.
