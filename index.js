//rename app.js to index.js
const { writeFile } = require('fs');
const inquirer = require('inquirer');
const genEmployeeInfo = require('./src/page-template');
let employeeInfoArr = []

//To do create prompt to enter the team manager’s name, employee ID, email address, and office number
const managerInfo =() => { 
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: "Enter team manager's name",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }else {
                    console.log('Please enter manager name!');
                    return false;
                }
            }

        },
        {
            type:'input',
            name: 'employeeId',
            message: 'Enter employee ID',
            validate: employeeIdInput => {
                if (employeeIdInput) {
                    return true;
                }else {
                    console.log('Please enter employee ID!');
                    return false;
                }
            },
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email address',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                }else {
                    console.log('Please enter your email address!')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Enter your office number',
            validate: officeNumberInput => {
                if (officeNumberInput) {
                    return true;
                }else {
                    console.log('Please enter your office number!')
                    return false;
                }
            }
        },
    ]);
};

const menuOptions =() => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employeeRole',
            message: ' What would you like to do?',
            choices: ['Engineer','Intern', 'Finish building team']
        } 
    ]).then(menuOptionsResp => {
        console.log(menuOptionsResp.employeeRole)
        const role = menuOptionsResp.employeeRole
        if (role === 'Intern') {
            getInternInfo().then(internData => {
                const employeeData = {...internData, role:'Intern'}
                employeeInfoArr.push(employeeData)
                menuOptions()
            })
        } 
        if (role === 'Engineer') {
            getEngineerInfo().then(engineerData => {
                const employeeData = {...engineerData, role:'Engineer'}
                employeeInfoArr.push(employeeData)
                menuOptions()
            })
        }
        if (role === 'Finish building team') {
            console.log('complete', employeeInfoArr)
            writeFile('./dist/index.html', genEmployeeInfo(employeeInfoArr), (err) =>{
                if (err) {
                    console.log(err)
                } else {
                    console.log('File written successfully')
                }
            })
        }
    })
};

// menu with the option to add an engineer or an intern or to finish building team
// const menuOptionsResp = (menuOptions) => {
//     let employeeRole = ''
//     if (employeeRole === 'Engineer') {
//         return getEngineerInfo;
//     } if (employeeRole === 'Intern') {
//         return getInternInfo;
//     }else {
//         return menuOptions;
//     }
// };

//prompt to enter the engineer’s name, ID, email, and GitHub username, and return to menu
const getEngineerInfo = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'Enter engineer name'
        },
        {
            type: 'input',
            name: 'employeeId',
            message: "Enter engineer ID"
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter email address'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter GitHub username'
        },
    ])
};

//prompted to enter the intern’s name, ID, email, and school, and return to menu
const getInternInfo = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'Enter intern name',
        },
        {
            type: 'input',
            name: 'employeeID',
            message: 'Enter intern ID'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter email address'
        },
        {
            type: 'input',
            name: 'school',
            message: 'Enter intern school'
        }
    ])
};

managerInfo()
.then(managerData => {
    console.log(managerData)
    const employeeData = {...managerData, role:'Manager'}
                employeeInfoArr.push(employeeData)
    menuOptions()

})


