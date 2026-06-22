# Typing Arena

Typing Arena is a responsive typing speed test web application where users can practice typing and view their typing performance in real time.

The application displays random paragraphs and tracks typing speed, accuracy, mistakes, and remaining time. After each test, users can view their results in a popup and start another test.

## Features

* Random typing paragraphs
* 30-second and 60-second typing modes
* Timer starts when the user begins typing
* Live WPM calculation
* Live accuracy calculation
* Mistake counter
* Character-by-character typing feedback
* Correct characters highlighted in green
* Incorrect characters highlighted in red
* Active typing cursor indicator
* Result popup after completing a paragraph or when time runs out
* Result memes based on typing performance
* Responsive dark glassmorphism user interface

## Tech Stack

* React
* Vite
* Tailwind CSS
* JavaScript

## Installation

Clone the repository:

```bash
git clone https://github.com/niteshpoojary1029/Type.git
```

Move into the project folder:

```bash
cd Type
```

Install the required dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal. It is usually:

```text
http://localhost:5173
```

## How to Use

1. Open the application.
2. Select either the 30-second or 60-second typing mode.
3. Click inside the typing area.
4. Start typing the displayed paragraph.
5. The timer starts after the first keypress.
6. Correct characters are shown in green.
7. Incorrect characters are shown in red.
8. WPM, accuracy, and mistakes are calculated during the test.
9. When the timer reaches zero or the paragraph is completed, the result popup appears.
10. Click the Next Test button to begin a new typing test.

## WPM Calculation

Words per minute is calculated using the following formula:

```text
WPM = (Correct Characters / 5) / Time in Minutes
```

## Accuracy Calculation

Accuracy is calculated using the following formula:

```text
Accuracy = (Correct Characters / Total Typed Characters) × 100
```

## Project Structure

```text
src
├── assets
│   └── meme
├── components
│   ├── TypingArea.jsx
│   └── ResultPopUp.jsx
├── data
│   └── paragraphs.js
├── utils
│   ├── accuracy.js
│   └── wpm.js
├── App.jsx
└── main.jsx
```

## Future Improvements

* Add more typing durations
* Add easy, medium, and hard difficulty levels
* Add a leaderboard
* Store typing history using local storage
* Add user authentication
* Add light and dark themes
* Add sound effects
* Add keyboard heatmap statistics
* Add custom paragraph input
* Add mobile keyboard support

## Credits

* Developed by Nithesh B Poojary.
* The React logic, typing test functionality, timer, WPM calculation, accuracy calculation, mistake tracking, and result handling were implemented by Nithesh B Poojary.

## Assistance

ChatGPT was used as an assistant for Tailwind CSS styling, UI layout ideas, glassmorphism design, and improving the visual presentation of the application.

## Author

Nithesh B Poojary

GitHub: https://github.com/nitheshpoojary1029
