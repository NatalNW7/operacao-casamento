const { exec } = require("node:child_process");

function checkDatabaseUp(){
    exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

    function handleReturn(error, stdout) {
        if(stdout.search("accepting connections") === -1) {
            process.stdout.write(".");
            checkDatabaseUp();
            return;
        }

        console.log("\nDatabase is up!\n")
    }
}

process.stdout.write("Checking database...")
checkDatabaseUp();