const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let roundsWon = 0;

function StartGame() {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    let tries;
    let triesTaken = 0;
    
    console.log("Welcome to the number guessing game!");
    rl.question(`Please select the difficulty level:
            1. Easy (10 chances)
            2. Medium (5 chances)
            3. Hard (3 chances)\n`, (chosenDifficulty) => {



        chosenDifficulty = chosenDifficulty.toLowerCase().trim();

        if (chosenDifficulty === '1' || chosenDifficulty === "easy") {
            tries = 10;
            console.log(`you have chosen ${chosenDifficulty} difficulty and you get ${tries} tries`);
        } else if (chosenDifficulty === '2' || chosenDifficulty === "medium") {
            tries = 5;
            console.log(`you have chosen ${chosenDifficulty} difficulty and you get ${tries} tries`);
        } else if (chosenDifficulty === '3' || chosenDifficulty === "hard") {
            tries = 3;
            console.log(`you have chosen ${chosenDifficulty} difficulty and you get ${tries} tries`);
        } else {
            console.log("Invalid difficulty. Defaulting to Medium (5 tries).");
            tries = 5;
        }
        
        askGuess();

        function askGuess() {

            if (tries <= 0) {
                console.log(`You're out of tries! The number was ${randomNum}`);
                rl.question("Play again?(y/n)", playAgain => {
                    playAgain = playAgain.toLowerCase();
                    if (playAgain === 'y' || playAgain === "yes" || playAgain === "ye") {
                        StartGame();
                    } else {
                        console.log(roundsWon === 1 ? `You chose to not play again! Thank you for your time.(${roundsWon} round won!)`: `You chose to not play again! Thank you for your time.(${roundsWon} rounds won!)`);
                        rl.close();
                    }
                })
                return;
            }
            rl.question("Enter your guess(1-100):", (numberGuessed) => {
                const guess = parseInt(numberGuessed, 10);
                if (isNaN(guess)) {
                    console.log("please enter an actual number.");
                    askGuess();
                    return;
                }
                if (guess === randomNum) {
                    triesTaken++;
                    roundsWon++
                    console.log(`YOU WON in ${triesTaken} tries !`);
                    rl.question("Play again?(y/n)", playAgain => {
                        playAgain = playAgain.toLowerCase();
                        if (playAgain === 'y' || playAgain === "yes" || playAgain === "ye") {
                            StartGame();
                        } else {
                            console.log(roundsWon === 1 ? `You chose to not play again! Thank you for your time.(${roundsWon} round won!)`: `You chose to not play again! Thank you for your time.(${roundsWon} rounds won!)`);
                            rl.close();
                        }
                    })
                } else {
                    console.log(guess > randomNum ? "Too high!" : "Too low!");
                    tries--;
                    triesTaken++;
                    askGuess();
                }

            });
        }
    });
}
StartGame();