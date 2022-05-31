const inquirer = require('inquirer');
require('console.table');
const db = require('./db/connection');




//add question arrays
// All Question Arrays
const listMainOptions = [
    {
      type: 'list',
      name: 'listMainOptions',
      message: 'Choose an option below to get started',
      choices: [
        "Show all Roles",
        "Add a Role",
        "Show all Departments",
        "Add a Department",
        "Show all Employees",
        "Add an Employee",
        "Update an Employee's role"
      ]
    }
  ]
  
  const addRolesOptions = [
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the new role?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary of the new role? (numbers only please, i.e. "100000")'
    },
    {
      type: 'input',
      name: 'department',
      message: 'What department is the new role in? Please type the number only of the department shown above! (i.e. "4")'
    }
  ]
  
  const addDepartmentOption= [
    {
      type: 'input',
      name: 'name',
      message: 'What department would you like to add?'
    }
  ]
  
  
  const addEmployeesOptions = [
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the first name of the new employee?'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the last name of the new employee?'
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'What role is the new employee in? Please type the number only of the "id" section shown above! (i.e. "4")',
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Who is the manager for the new employee? Please type the number only of the "id" section shown above! (i.e. "4")'
    }
  ]
  
  const chooseEmployeeOption = [
    {
      type: 'input',
      name: 'employee_id',
      message: 'Which employee would you like to update? Please only type the number of the "id" of the employee! (i.e. "4")'
    },
  ]
  
  const updateEmployeeRoles = [
    {
      type: 'input',
      name: 'role_id',
      message: 'What new role would you like for your employee? Please only type the number of the "id" of the role! (i.e. "4")'
    },
  ]
  
  
  
  // All functions to use for manipulating MySQL database
  const addRole = async() => {
    const result = await inquirer.prompt(addRolesOptions)
    const sql = `INSERT INTO role (title, salary, department_id)
    VALUES (?,?,?)`;
    const params = [result.title, result.salary, result.department];
  
    db.query(sql, params, function (err, results) {
      console.log("");
      console.table(results);
    });
    startMenu();
  }
  
  const addDepartment = async() => {
    const result = await inquirer.prompt(addDepartmentOption)
    const sql = `INSERT INTO department (name)
    VALUES (?)`;
    const params = [result.name];
  
    db.query(sql, params, function (err, results) {
      console.log("");
      console.table(results);
    });
    startMenu();
  }
  
  const addEmployee = async() => {
    const result = await inquirer.prompt(addEmployeesOptions)
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)`;
    const params = [result.first_name, result.last_name, result.role_id, result.manager_id];
  
    db.query(sql, params, function (err, results) {
      console.log("");
      console.table(results);
    });
    startMenu();
  }
  
  const chooseEmployee = async() => {
    const result = await inquirer.prompt(chooseEmployeeOption);
  
    db.query('SELECT role.id, role.title FROM role', function (err, results) {
            console.log("");
            console.table(results);
          });
    
    updateEmployee(result.employee_id);
  }
  
  const updateEmployee = async(employeeID) => {
    const result = await inquirer.prompt(updateEmployeeRoles)
    const sql = `UPDATE employee SET role_id = ${result.role_id}
    WHERE id = ${employeeID}`;
  
    db.query(sql, function (err, results) {
      console.log("");
      console.table(results);
    });
    startMenu();
  }
  
  
  // startMenu function acts as switchboard for options to manipulate database
  const startMenu = async() => {
    const result = await inquirer.prompt(listMainOptions)
    .then(function(result) {
      switch (result.listMainOptions) {
        case "Show all Roles":
          db.query('SELECT role.id, role.title, role.salary, department.name AS department_name FROM role LEFT JOIN department ON role.department_id = department.id', function (err, results) {
            console.log("");
            console.table(results);
          });
          startMenu();
          break;
        
        case "Add a Role":
          db.query('SELECT * FROM department', function (err, results) {
            console.log("");
            console.table(results);
          });
          addRole();
          break;
  
        case "Show all Departments":
          db.query('SELECT * FROM department', function (err, results) {
            console.log("");
            console.table(results);
          });
          startMenu();
          break;
  
        case "Add a Department":
          addDepartment();
          break;
  
        case "Show all Employees":
          db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;", function (err, results) {
            console.log("");
            console.table(results);
          });
          startMenu();
          break;
  
        case "Add an Employee":
          db.query('SELECT role.*, department.name AS department_name FROM role LEFT JOIN department ON role.department_id = department.id', function (err, results) {
            console.log("");
            console.table(results);
          });
          db.query('SELECT employee.*, role.title AS role_title FROM employee LEFT JOIN role ON employee.role_id = role.id', function (err, results) {
            console.log("");
            console.table(results);
          });
          addEmployee();
          break;
  
        case "Update an Employee's role":
          db.query('SELECT employee.id, employee.first_name, employee.last_name FROM employee', function (err, results) {
            console.log("");
            console.table(results);
          });
          chooseEmployee();
          break;
      }
    });
  }
  
  // startDB function to welcome user and routes to main startMenu function as switchboard for app
  const startDB = async() => {
    console.log('Welcome to your personal Employee Tracker');
    console.log('Choose an option below to get started');
  
    startMenu();
  }
  
    
  
  // calls startApp function to begin app
  startDB();

//add functions to make changes in the mysql database