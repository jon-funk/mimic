const { exec } = require('child_process');
const pidusage = require('pidusage');

// Function to run a basic act command
function runAct(command = '') {
    return new Promise((resolve, reject) => {
        const actCommand = `act ${command}`;
        
        // Execute the command
        exec(actCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing act: ${error.message}`);
                reject(error);
                return;
            }
            
            if (stderr) {
                console.warn(`Act stderr: ${stderr}`);
            }
            
            console.log(`Act output:\n${stdout}`);
            resolve(stdout);
        });
    });
}