# Development

- Make sure NodeJS v16.15 is installed by typing in your terminal (cmd/powershell or bash) ```node -v```
- This app was created using TypeScript, React (w/ CRA) and Electron (w/ Forge);
- CD to the directory and install npm dependencies by typing in your terminal (cmd/powershell or bash) ```npm install```
- Run by typing in your terminal (cmd/powershell or bash) ```npm run dev```
- An electron window will automatically open

# Usage instructions

- The app supports inserting time in normal notation (e.g. 01:30) or in decimal notation (e.g. 1.5);
- Insert a time on the text input and click on a button to add a time or a bug time;
    - Bug times does not add to the total time and is used only to get the total time spent on bugs;
    - If you want to add a bug time, you must add it twice: once using the ```Add Time``` and again using ```Add Bug Time```.
- Total points is calculated by dividing the total time by 4;
    - You can change this behavior by setting the constant ```#pointsDenominator``` at ```JiraPointsAdder``` class.
- Each time entry can be deleted by clickin on the ```x```, doing so will recalculate the total time and points.
- Click on ```Clear``` button to reset the app.

# Authors

- [Giancarlo Dalle Mole](https://github.com/giancarlo-dm)
