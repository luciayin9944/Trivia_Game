
import chalk from "chalk";
import { select } from "@inquirer/prompts";
import { getRandomQuestions } from "./questionService.js";

let score = 0;
let questionCount = 0;
const usedQuestions = [];
const answeredQuestions = [];

export async function showMainMenu() {
    const action = await select({
      message: "Main Menu",
      choices: [
        { name: "Start Game", value: "start" },
        { name: "See Scores", value: "score" },
        { name: "Quit", value: "quit" },
      ],
    });
  
    switch (action) {
      case "start":
        resetGame();
        await startGame();
        break;
      case "score":
        showScore();
        await showMainMenu();
        break;
      case "quit":
        console.log("Goodbye!");
        process.exit(0);
    }
}


export async function startGame() {
  //WRONG: resetGame() 
  
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

  answeredQuestions.push({
    question: question.question,
    userAnswer: userChoice,
    correctAnswer: question.answer,
    isCorrect: userChoice === question.answer
  });

  if (usedQuestions.length >= 6) {
    console.log(chalk.yellow("\nYou're done!"));
    showScore();
    showSummary(answeredQuestions);
    console.log("\n Do you want to play again?")
    //WRONG: showMainMenu()
    await showMainMenu(); // async call
  }

  await startGame(); 
}

function showScore() {
console.log(chalk.yellow(`\nYour score is: ${score}\n`));
//showMainMenu();
}

function showSummary(answeredQuestions) {
  console.log("\n Here's a summary of your answers:\n");

  answeredQuestions.forEach((q, index) => {
    console.log(`Q${index+1}: ${q.question}`)
    console.log(`   Correct answer: ${q.correctAnswer}`);
    console.log(`   Result: ${q.isCorrect ? 'Correct' : 'Incorrect'}`);
  });
}

function resetGame() {
score = 0;
questionCount = 0;
usedQuestions.length = 0;
answeredQuestions.length = 0;
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