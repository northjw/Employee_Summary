


const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
//
const teamMembers = [];
const idArray = [];

function appMenu() {

    function createManager() {
        console.log("Let's assemble your team!");
        inquirer.prompt([

            {
                type: "confirm",
                name: "manger",
                message: "Hello, are you the team manager?",

            },
            {
                type: "input",
                name: "mName",
                message: "Hello team manager, what is your name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },
            {
                type: "input",
                name: "mId",
                message: "What is your id?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "id must be a number greater than 0, please enter valid id";
                }
            },
            {
                type: "input",
                name: "mEmail",
                message: "What is your email?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: "input",
                name: "mOfficeNumber",
                message: "What is your office number?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Sorry, that office doesn't exist. Please enter a valid office number";
                }
            },
        ]).then(answers => {
            const manager = new Manager(answers.mName, answers.mId, answers.mEmail, answers.mOfficeNumber);
            teamMembers.push(manager);
            idArray.push(answers.mId);
            createTeam();
        });
    }

    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Select type of team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I don't want to add any more team members"
                ]
            }
        ]).then(userChoice => {
            switch (userChoice.memberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addintern();
                    break;
                default:
                    buildTeam();
            }
        })

    }

    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "eName",
                message: "What is your engineer's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Do you not know your engineers name? Find it out and enter it.";
                }
            },

            {
                type: "input",
                name: "eId",
                message: "What is your engineer's id?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        if (idArray.includes(answer)) {
                            return "This ID is already assigned. Please enter a different number"
                        } else {
                            return true;
                        }

                    }
                    return "Sorry, an id must be a number greater than 0.";
                }
            },

            {
                type: "input",
                name: "eEmail",
                message: "What is your engineer's email?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }

            },

            {
                type: "input",
                name: "eGithub",
                message: "What is your engineer's Github username?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "do you not know their Github username? Find it out and enter it.";
                }
            },
        ]).then(answers => {
            const engineer = new Engineer(answers.eName, answers.eId, answers.eEmail, answers.eGithub);
            teamMembers.push(engineer);
            idArray.push(answers.eId);
            createTeam();
        });
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your intern's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },

            {
                type: "input",
                name: "iId",
                message: "What is your intern's id?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        if (idArray.includes(answer)) {
                            return "This ID is already taken. Please enter a different number"
                        } else {
                            return true;
                        }

                    }
                    return "Sorry, an id must be a number greater than 0.";
                }
            },

            {
                type: "input",
                name: "iEmail",
                message: "What is your intern's email?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }

            },

            {
                type: "input",
                name: "iSchool",
                message: "What is your intern's school?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },

        ]).then(answers => {
            const intern = new Intern(answers.iName, answers.iId, answers.iEmail, answers.iSchool);
            teamMembers.push(intern);
            idArray.push(answers.iId);
            createTeam();
        });
    }



    //buildTeam()
    function generateHtml() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }

    createManager();
}



        appMenu();

