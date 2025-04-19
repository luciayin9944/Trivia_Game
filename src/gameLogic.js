
import chalk from "chalk";
import { select } from "@inquirer/prompts";
import { getRandomQuestions } from "./questionService.js";

let score = 0;
let questionCount = 0;
let usedQuestions = [];

export async function showMainMenu() {
    const action = await select({
      message: "Main Menu",
      choices: [
        { name: "Start Game", value: "start" },
        { name: "See Scores", value: "score" },
        { name: "Reset Score", value: "reset" },
        { name: "Quit", value: "quit" },
      ],
    });
  
    switch (action) {
      case "start":
        questionCount = 0; //reset
        score = 0; 
        await startGame();
        break;
      case "score":
        showScore();
        break;
      case "reset":
        resetGame();
        console.log(chalk.blue("Score has been reset."));
        await showMainMenu();
        break;
      case "quit":
        console.log("Goodbye!");
        process.exit(0);
    }
}



// export async function startGame() {
//     const selectedQ = getRandomQuestions(1);
//     //console.log('Selected question:', selectedQ);
//     const question = selectedQ[0];
//     //console.log('Question object:', question);
//     const { question: qText, choices, answer } = question;

//     console.log(`\nQuestion: ${qText}`);

//     const userChoice = await select({
//         message: "Choose your answer:",
//         choices: choices.map((choice) => ({ name: choice, value: choice })), 
//     });

//     if (userChoice === answer) {
//         console.log(chalk.yellow("Correct!\n"));
//         score++;
//       } else {
//         console.log(chalk.red(`Wrong! Correct answer: ${answer}\n`));
//       }
    
//       incrementCounter();
// }

// function incrementCounter() {
//     questionCount++;
  
//     if (questionCount === 6) {
//       console.log("\n You've completed");
//       showScore(); 
//     } else {
//       startGame(); // next question
//     }
//   }


export async function startGame() {
  const [question] = getRandomQuestions(1, usedQuestions);
  if (!question) {
    console.log("No more questions left!");
    return showScore(score);
  }

  usedQuestions.push(question.question);  // record used questions

  const { question: qText, choices, answer } = question;

  console.log(`\nQuestion: ${qText}`);

  const userChoice = await select({
    message: "Choose your answer",
    choices: choices.map((choice) => ({ name: choice, value: choice })),
  });

  if (userChoice === answer) {
    console.log(chalk.green("Correct!"));
    score++;
  } else {
    console.log(chalk.red(`Wrong! The correct answer is ${answer}`));
  }

  if (usedQuestions.length >= 6) {
    console.log(chalk.yellow("\nYou're done!"));
    return showScore(score);
  }

  await startGame(); 
}

function showScore(final = false) {
console.log(chalk.yellow(`\nYour score is: ${score}\n`));
if (!final) {
    showMainMenu();
} else {
    process.exit(0); // game over; then exit
}
}

function resetGame() {
score = 0;
questionCount = 0;
}
















// import chalk from "chalk";
// import { select } from "@inquirer/prompts";


// export async function showMainMenu() {
//   const action = await select({
//     message: "Main Menu",
//     choices: [
//       { name: "Start Game", value: "start" },
//       { name: "See Scores", value: "score"},
//       { name: "Reset score", value: "reset" },
//       { name: "Quit", value: "quit" },
//     ],
//   });

//   switch (action) {
//     case "start":
//       await startGame();
//       break;
//     case "score":
//       showScore(score);
//       break;
//     case "reset":
//       resetGame();
//       console.log(chalk.blue("Score has been reset."));
//       showMainMenu();
//       break;
//     case "quit":
//       console.log("Goodbye!");
//       process.exit(0);
//   }
// }


// export async function startGame() {
//     let score = 0;
//     const questions = getRandomQuestions(1)
//     console.log('Questin: ${question}')
//     const userChoice = await select({
//       message: "Choose your answer",
//       choices: choices.map((choice) => ({ name: choice, value: choice })),
//     });
  
//     console.log(chalk.blue(`You chose: ${choice}`));
//     showMainMenu();
// }
  
// export function determineAnswer(userChoice, question, score) {
//     const correctAns = question[answer]

//     if (userChoice === correctAns) {
//         console.log("Correct!")
//         score++
//     } else {
//         console.log("Wrong Answer!")
//     }
// }

// function showScore(score) {
//     console.log(chalk.blue(`Your scores: ${score}`));
// }

// function resetGame() {
//     score = 0;
// }

// function counter() {
//     if () {
//         count++
//     }
//     if (count===6){
//         console.log("You'r done!")
//         showScore(sorce)
//     }

// }

// export { determineWinner }; 