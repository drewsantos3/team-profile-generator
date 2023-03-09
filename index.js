// // GIVEN a command-line application that accepts user input
// WHEN I am prompted for my team members and their information
// THEN an HTML file is generated that displays a nicely formatted team roster based on user input
// WHEN I click on an email address in the HTML
// THEN my default email program opens and populates the TO field of the email with the address
// WHEN I click on the GitHub username
// THEN that GitHub profile opens in a new tab
// WHEN I start the application
// THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
// WHEN I enter the team manager’s name, employee ID, email address, and office number
// THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
// WHEN I select the engineer option
// THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
// WHEN I select the intern option
// THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
// WHEN I decide to finish building my team
// // THEN I exit the application, and the HTML is generated

const inquirer = require("inquirer");
const fs = require("fs");
const generateHTML = require("./generateHTML");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const team = [];

// // WHEN I start the application
// // THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
function init() {
    inquirer
        .prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is your id?",
        },
        {
            type: "input",
            name: "email",
            message: "What is your email?",
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your office number?",
        },
        ])
        .then((answers) => {
        const manager = new Manager(
            answers.name,
            answers.id,
            answers.email,
            answers.officeNumber
        );
        team.push(manager);
        addTeamMember();
        });
    }

// // WHEN I select the engineer option
// // THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
function addEngineer() {
    inquirer
        .prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is your id?",
        },
        {
            type: "input",
            name: "email",
            message: "What is your email?",
        },
        {
            type: "input",
            name: "github",
            message: "What is your github?",
        },
        ])
        .then((answers) => {
        const engineer = new Engineer(
            answers.name,
            answers.id,
            answers.email,
            answers.github
        );
        team.push(engineer);
        addTeamMember();
        });
    }

// // WHEN I select the intern option
// // THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
function addIntern() {
    inquirer
        .prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is your id?",
        },
        {
            type: "input",
            name: "email",
            message: "What is your email?",
        },
        {
            type: "input",
            name: "school",
            message: "What is your school?",
        },
        ])
        .then((answers) => {
        const intern = new Intern(
            answers.name,
            answers.id,
            answers.email,
            answers.school
        );
        team.push(intern);
        addTeamMember();
        });
    }

// // WHEN I decide to finish building my team
// // THEN I exit the application, and the HTML is generated
function addTeamMember() {
    inquirer
        .prompt([
        {
            type: "list",
            name: "role",
            message: "What is your role?",
            choices: ["Engineer", "Intern", "None"],
        },
        ])
        .then((answers) => {
        switch (answers.role) {
            case "Engineer":
            addEngineer();
            break;
            case "Intern":
            addIntern();
            break;
            default:
            generateHTML(team);
        }
        });
    }

init();


