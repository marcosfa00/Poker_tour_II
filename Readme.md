# Poker Tour II

## Overview

**Poker Tour II** is a web application designed to manage and display essential information for poker tournaments. The application provides a user-friendly interface to track player numbers, blinds, and prizes, enhancing the overall tournament experience. 

## Features

- **Tournament Details**: Displays the current level of the tournament, blinds (small and big), remaining time, number of players, and prize pool.
- **Player Management**: Allows users to add or remove players with simple buttons, updating the player count dynamically.
- **Blind Structure**: Clearly shows the current blinds and ante values, facilitating quick reference for players.
- **Rebuy and Add-On Management**: Provides buttons to manage rebuys and add-ons, allowing flexibility during the tournament.
- **Responsive Design**: The application is designed to be responsive and user-friendly across various devices.

## Technologies Used

- **Frontend**: 
  - HTML
  - CSS
  - JavaScript (Vue.js)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/marcosfa00/Poker_tour_II.git
   ```

2. Open the `index.html` file in your web browser to run the application.

## Usage

- Upon opening the application, you will see the tournament details at the top, including the current level, blinds, remaining time, number of players, and prize pool.
- Use the input field to enter the number of players and click the "add" or "remove" buttons to update the player count.
- The rebuys and add-on features can be managed using the "+" and "-" buttons, allowing for easy adjustments during the tournament.

## Code

### Poker Timer Configuration Instructions

To modify the time duration for each level, simply go to the following lines of code and replace the value `15` with the number of minutes you want each level to last.

#### Update Time in Minutes:

- **Line 43 of the code:**

```javascript
tiempoRestante: 15 * 60, // Stores time in seconds
```

- **Line 85 of the code:**

```javascript
this.tiempoRestante = 15 * 60; // Resets the timer to 15 minutes
```

#### Update Initial Prize Amount:

To modify the initial prize amount, replace the default value of **20€** with your desired amount in **line 52** of the code:

```javascript
premios: 20
```

#### Update Rebuy and Add-On Methods:

You can also modify the methods to adjust the amount added to the prize pool for each rebuy or add-on:

```javascript
incrementarRecompras() {
  this.recompras += 1;
  this.premios += 5; // Increase prize by 5€ (rebuy)
  this.jugadores += 1;
},
decrementarRecompras() {
  if (this.recompras > 0) {
    this.recompras -= 1;
    this.premios -= 5; // Decrease prize by 5€ (rebuy)
    this.jugadores -= 1;
  }
},
incrementarAddOn() {
  this.addOns += 1;
  this.premios += 2; // Increase prize by 2€ (add-on)
},
decrementarAddOn() {
  if (this.addOns > 0) {
    this.addOns -= 1;
    this.premios -= 2; // Decrease prize by 2€ (add-on)
  }
}
```

You can change any lines referencing `this.premios` to adjust the prize values as you see fit. By default, the rebuy adds **5€** and the add-on adds **2€**, but feel free to adjust these amounts according to your tournament's needs.

#### Customizing Entry Fee for a Tournament:

If you are running a tournament that charges an entry fee, you can modify the `addJugadores()` method to automatically add the total entry fee to the prize pool for each player. You can do this by modifying the method as follows:

```javascript
addJugadores() {
  this.jugadores = this.jugadoresInput;
  this.maxJugadores = this.jugadores;
  this.premios = 50 * this.jugadores; // Calculates total prize based on player count
}
```

Here, you can replace the `50` with your desired entry fee per player. If you make this change, remember to set the initial prize value to **0** on **line 52**:

```javascript
premios: 0
```

This will ensure that the prize pool is correctly calculated based on the number of players.
  
## Contribution

Contributions are welcome! If you have suggestions for improvements or features, please create a pull request or open an issue.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by poker tournament management needs.
- Special thanks to all contributors who have helped improve the application.
