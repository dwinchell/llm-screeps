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
                    (entry.position && entry.position.x !== undefined && entry.position.y !== undefined 
                        ? `${entry.position.x},${entry.position.y}` 
                        : "UNKNOWN POSITION") + 
                    ` targeting ${entry.target ? entry.target : "UNKNOWN TARGET"}`);
                
                // Skip repeated actions of the same type since they are expected
                if (i > 0) {
                    let prevEntry = actions[i - 1];
                    if (entry.action === prevEntry.action) {
                        continue; // Allow repeated actions (e.g., multiple harvest ticks)
                    }
                    
                    // Validate state transitions
                    if (prevEntry.action === "harvest" && entry.action !== "moveToTarget" && entry.action !== "transfer") {
                        console.log(`[TEST ERROR] ${creepName} unexpected transition from harvest to ${entry.action}.`);
                        success = false;
                    }

                    if (prevEntry.action === "transfer" && entry.action !== "moveToSource" && entry.action !== "harvest") {
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
