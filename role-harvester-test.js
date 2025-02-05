const telemetry = require('utils-telemetry');

module.exports = {
    /**
     * Runs tests on harvester behavior based on stored telemetry data.
     */
    runTests: function () {
        let success = true;
        let telemetryData = Memory.telemetry && Memory.telemetry.harvester;

        if (!telemetryData || Object.keys(telemetryData).length === 0) {
            console.log("[TEST] No harvester telemetry data available.");
            return;
        }

        for (let creepName in telemetryData) {
            let actions = telemetry.getTelemetry('harvester', creepName);
            console.log(`[TEST] Verifying ${creepName}: ${actions.length} actions recorded.`);

            for (let i = 0; i < actions.length; i++) {
                let entry = actions[i];
                console.log(`[TEST] ${creepName} at tick ${entry.tick}: ${entry.action} at ` + 
                    (entry.position ? `${entry.position.x},${entry.position.y}` : "UNKNOWN POSITION") + 
                    ` targeting ${entry.target ? entry.target : "UNKNOWN TARGET"}`);
                
                // Basic validation: Ensure actions occur in expected order
                if (i > 0) {
                    let prevAction = actions[i - 1].action;
                    if (prevAction === "harvest" && entry.action !== "moveToTarget" && entry.action !== "transfer") {
                        console.log(`[TEST ERROR] ${creepName} unexpected transition from harvest to ${entry.action}.`);
                        success = false;
                    }

                    if (prevAction === "transfer" && entry.action !== "moveToSource" && entry.action !== "harvest") {
                        console.log(`[TEST ERROR] ${creepName} unexpected transition from transfer to ${entry.action}.`);
                        success = false;
                    }
                }
            }
        }

        if (success) {
            console.log("[TEST] Harvester behavior verified successfully.");
        } else {
            console.log("[TEST] Harvester behavior had unexpected transitions.");
        }
    }
};
