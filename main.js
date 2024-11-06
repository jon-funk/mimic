const { exec } = require('child_process');

const GLOBAL_OPTS = "-P ubuntu-latest=-self-hosted -P ubuntu-22.04=-self-hosted"
const REPO_FILEPATH = "/tmp/mimic-repo"

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

// Example usage: running act with specific options
async function main() {
    try {
        // You can specify any act command here, e.g., "-l" to list workflows, or leave it empty for defaults
        const output = await runAct('-l'); // Lists all available actions/workflows
        console.log('Act command output:', output);
    } catch (error) {
        console.error('Failed to run act:', error);
    }
    try {
        // You can specify any act command here, e.g., "-l" to list workflows, or leave it empty for defaults
        const output = await runAct(`push -e tests/data/push.json --dryrun ${GLOBAL_OPTS}`); // Lists all available actions/workflows
        console.log('Act command output:', output);
    } catch (error) {
        console.error('Failed to run act:', error);
    }
    try {
        // You can specify any act command here, e.g., "-l" to list workflows, or leave it empty for defaults
        const output = await runAct(`push -e tests/data/push.json ${GLOBAL_OPTS}`); // Lists all available actions/workflows
        console.log('Act command output:', output);
    } catch (error) {
        console.error('Failed to run act:', error);
    }
}

main();
