// role-harvester-monitor.js

const telemetry = require('utils-telemetry');

module.exports = {
    /**
     * Monitors harvester telemetry and detects anomalies.
     */
    monitorTelemetry: function () {
        if (!Memory.telemetry) {
            console.log("[MONITOR] No telemetry data available.");
            return;
        }

        for (let entityName in Memory.telemetry) {
            let actions = telemetry.getTelemetry(entityName, 'harvester');
            if (actions.length === 0) continue;

            console.log(`[MONITOR] Tracking ${entityName}: ${actions.length} telemetry entries recorded.`);

            // Detect if a harvester is stuck in an idle state
            let lastActions = actions.slice(-5); // Check the last few actions
            let allIdle = lastActions.every(a => a.action !== "harvest" && a.action !== "transfer" && a.action !== "moveToSource" && a.action !== "moveToTarget");
            let hasDeathEvent = telemetry.getTelemetry(entityName, 'general').some(a => a.action === "death");

            if (allIdle && !hasDeathEvent) {
                console.log(`[ALERT] ${entityName} has been idle for multiple ticks without performing expected actions and has no recorded death.`);
            }
        }
    }
};
