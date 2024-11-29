const fs = require('fs');
const readline = require('readline');

// File where tasks will be stored
const tasksFile = './tasks.json';

// Create an interface to read input from the console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to load tasks from the file
function loadTasks() {
    if (fs.existsSync(tasksFile)) {
        const data = fs.readFileSync(tasksFile);
        return JSON.parse(data);
    } else {
        return [];
    }
}

// Function to save tasks to the file
function saveTasks(tasks) {
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}

// Function to display the checklist
function showChecklist() {
    const tasks = loadTasks();
    if (tasks.length === 0) {
        console.log('No tasks in your checklist.');
    } else {
        console.log('Your Checklist:');
        tasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task}`);
        });
    }
}

// Function to add a task to the checklist
function addTask() {
    rl.question('Enter a new task: ', (task) => {
        const tasks = loadTasks();
        tasks.push(task);
        saveTasks(tasks);
        console.log(`Task added: "${task}"`);
        showMainMenu();
    });
}

// Function to remove a task from the checklist
function removeTask() {
    rl.question('Enter the number of the task to remove: ', (index) => {
        const tasks = loadTasks();
        if (index > 0 && index <= tasks.length) {
            const removedTask = tasks.splice(index - 1, 1);
            saveTasks(tasks);
            console.log(`Task removed: "${removedTask[0]}"`);
        } else {
            console.log('Invalid task number.');
        }
        showMainMenu();
    });
}

// Main menu function
function showMainMenu() {
    console.log('\nChoose an option:');
    console.log('1. Show checklist');
    console.log('2. Add a task');
    console.log('3. Remove a task');
    console.log('4. Exit');
    
    rl.question('Enter your choice: ', (choice) => {
        switch (choice) {
            case '1':
                showChecklist();
                showMainMenu();
                break;
            case '2':
                addTask();
                break;
            case '3':
                showChecklist();
                removeTask();
                break;
            case '4':
                console.log('Goodbye!');
                rl.close();
                break;
            default:
                console.log('Invalid choice, please try again.');
                showMainMenu();
                break;
        }
    });
}

// Start the application
showMainMenu();