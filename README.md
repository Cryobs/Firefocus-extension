# Firefocus

![Firefocus Logo](https://github.com/Cryobs/Firefocus-extension/raw/main/public/icons/firefocus-logo.png)

**Firefocus** is a Pomodoro timer extension for Firefox that helps you manage your tasks and time effectively. Inspired by the vibrant colors of the Firefox brand, Firefocus combines productivity and style in a seamless browsing experience.

## Features

- **Pomodoro Timer**: Stay focused with customizable Pomodoro sessions and breaks.
- **Task Management**: Add, edit, and delete tasks directly within the extension.
- **Stylish Design**: Enjoy an interface inspired by the Firefox color palette.
- **Notifications**: Receive alerts when it's time to take a break or start a new session.

## Installation

You can install Firefocus from the [Firefox Add-ons website](https://addons.mozilla.org/firefox/addon/firefocus/).

## Technologies Used

- **React**: Built with the powerful React library for a dynamic and responsive user interface.
- **NPM**: Manage dependencies and scripts with Node Package Manager.
- **Less**: CSS preprocessor.
- **WebExtensions API**: Integrate seamlessly with Firefox using the WebExtensions API.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (which includes npm)
- [Firefox](https://www.mozilla.org/en-US/firefox/new/)

### Development Setup

Clone the repository:

```bash
git clone https://github.com/Cryobs/Firefocus-extension.git
cd Firefocus-extension
```

Install dependencies:
```bash
npm install
```
Build the project:
```bash
npm run build-extension
```

For work with less I use [this plugin](https://marketplace.visualstudio.com/items?itemName=Wscats.eno) for VS code

## Load the extension in Firefox:

1. Open Firefox and navigate to about:debugging#/runtime/this-firefox.
2. Click on Load Temporary Add-on.
3. Select the manifest.json file from the build directory.

### Usage

1. Open the Firefocus extension by clicking its icon in the toolbar.
2. Set your preferred Pomodoro session and break times.
3. Add tasks to manage your workflow.
4. Start the timer and focus on your tasks!

### Roadmap 
- - [ ] Add more customization options
- - [ ] Implement dark mode
- - [ ] Add themes
