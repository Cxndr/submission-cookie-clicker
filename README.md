# Cookie Clicker Week03 Project

## Requirements

### 🎯 Fetch upgrade data from the provided API and at least one upgrade from the API update the cookie count.

All updates implemented with UI.


### 🎯 Ensure that functions are used effectively to keep code organised and reusable.

Functions structured in seperated style to facilitate future asjustments and implementations.

### 🎯 Implement event listeners to handle user interactions.

Event listeners handling all buttons as well as cookie click animations.

### 🎯 Use local storage to save and restore the cookie count and relevant game information.

Local storage is used to save cookie count, cookies per second, and stats for total time played and total manual clicks.

### 🎯 Use setInterval to increment the cookie count and manage the game state each second. (Managing the game state includes saving progress and updating the DOM).

setInterval callback used to update cookie count, game stats, set local storage, update ui. Time sensitive game stats (total time played and session time) are using `Date.now` comparisons for accurate time tracking (setTimeout is not exact and has drift).

SetTimeout callbacks used to manage animations on menus and cookie click (updating css transitions).

## Stretch Requirments

### 🏹 Consolidate upgrade management by managing all upgrades in a single function.
Upgrades all managed in single function by iterating over api data with an array.

### 🏹 Improve UX with animations, sound effects, or other visual effects.
css transition animations used for settings menu and cookie click.

### 🏹 Fantastic use of README to provide important information such as a description of the project, how to deploy and other app information.
Not achieved (yet!).

### 🏹 Implement error handling using try/catch.
Not achieved (yet!)

### 🏹 Create a menu for users to adjust game options like sound effects or display preferences.
Menu has button for clearing local storage (reset progress) and for showing gameplay stats (session play time, total play time, total manual clicks).

## Reflections
Given more time I would have liked to flesh out the UI/UX more: 
 - media queries to better support various screen resolutions.
 - sound effects.
 - visual tracking of bought upgrades.
 - visual representation of cookie count (stack of cookies).
 - more settings for display and sound.

 I would also have liked to implement error handling and a detailed user README as detailed in the stretch goals.

The UI overall is very simple and cheesy (cookie print masks on font and settings icon 😅). I would consider changing this on a re-visit to the project.

Most of the bugs i encountered were UI based. I've explored the fundamentals of API calls, JS timers lots before on previous personal projects so I have a solid understanding. But css continues to provide interesting and unexpected results no matter how much I use it 😅. Using local storage was new to me as well and I encountered a few bugs with setting NaN values midway through development of features and having to clear them manually after figuring out the code was actually correct just the value had been set wrong mid development - which will be a helpful experience when implementing local storage in future projects.

I'm happy with the css transition animations but still feel the ui could be much smoother overall (eg. the cookie count number should roll over in real time rather than update each interval).

