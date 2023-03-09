const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const team = [];

function init() {
    inquirer
        .prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your manager's name?",
        },
        {
            type: "input",
            name: "managerId",
            message: "What is your manager's id?",
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is your manager's email?",
        },
        {
            type: "input",
            name: "managerNumber",
            message: "What is your manager's office number?",
        },
        ])
        .then((answers) => {
        const manager = new Manager(
            answers.managerName,
            answers.managerId,
            answers.managerEmail,
            answers.managerNumber
        );
        team.push(manager);
        addTeamMember();
        });
    }
function addEngineer() {
    inquirer
        .prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is your Engineer's name?",
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is your Engineer's id?",
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is your Engineer's email?",
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is your Engineer's github?",
        },
        ])
        .then((answers) => {
        const engineer = new Engineer(
            answers.engineerName,
            answers.engineerId,
            answers.engineerEmail,
            answers.engineerGithub
        );
        team.push(engineer);
        addTeamMember();
        });
    }

function addIntern() {
    inquirer
        .prompt([
        {
            type: "input",
            name: "internName",
            message: "What is your Intern's name?",
        },
        {
            type: "input",
            name: "internId",
            message: "What is your Intern's id?",
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is your Intern's email?",
        },
        {
            type: "input",
            name: "internSchool",
            message: "What is your Intern's school?",
        },
        ])
        .then((answers) => {
        const intern = new Intern(
            answers.internName,
            answers.internId,
            answers.internEmail,
            answers.internSchool
        );
        team.push(intern);
        addTeamMember();
        });
    }

function addTeamMember() {
    inquirer
        .prompt([
        {
            type: "list",
            name: "mainMenu",
            message: "Add an Engineer or an Intern or Finish?",
            choices: ["Engineer", "Intern", "Finish"],
        },
        ])
        .then((answers) => {
            if (answers.mainMenu === "Engineer") {
                addEngineer();
              } else if (answers.mainMenu === "Intern") {
                addIntern();
              } else {
                const parseHTML = generateHTML(team);
            fs.writeFile("index.html", parseHTML, (err) => (err ? console.log(err) : console.log("Success!")));
        }
        });
    }

    const generateHTML = (team) => {
        const generateManager = `<div class="card">
        <div class="card-header">
            <h2>Manager</h2>
            <h3> ${team[0].getName()}</h3>
        </div>
        <div class="card-body">
            <p>ID: ${team[0].getId()}</p>
            <p>Email: <a href= "mailto: ${team[0].getEmail()}">${team[0].getEmail()}</a></p>
            <p>Office Number: ${team[0].getOfficeNumber()}</p>
        </div>
        </div>`;

const engineers = team.filter((employee) => employee.getRole() === "Engineer");

let generateEngineer = "";

engineers.forEach((engineer) => {
    generateEngineer += `<div class="card">
    <div class="card-header">
        <h2>Engineer</h2>
        <h3> ${engineer.getName()}</h3>
    </div>
    <div class="card-body">
        <p>ID: ${engineer.getId()} </p>
        <p>Email: <a href= "mailto: ${engineer.getEmail()}">${engineer.getEmail()} </a></p>
        <p>GitHub: <a href="https://GitHub.com/${engineer.getGithub()}" target="_blank"> ${engineer.getGithub()} </a></p>
    </div>
</div>`;
});

const interns = team.filter((employee) => employee.getRole() === "Intern");

let generateIntern = "";

interns.forEach((intern) => {
    generateIntern += `<div class="card">
    <div class="card-header">
        <h2>Intern</h2>
        <h3> ${intern.getName()}</h3>
    </div>
    <div class="card-body">
        <p>ID: ${intern.getId()}</p>
        <p>Email: <a href="mailto: ${intern.getEmail()}">${intern.getEmail()}</a></p>
        <p>School: ${intern.getSchool()}</p>
    </div>
</div>`;
});

const document = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Profile Generator</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>My Team</h1>
    </header>
    <main>
        ${generateManager}
        ${generateEngineer}
        ${generateIntern}
    </main>
</body>
</html>`;
return document;
};

    
init();


