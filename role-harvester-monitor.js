// role-harvester-monitor.js

const telemetry = require('utils-telemetry');

module.exports = {
    /**
     * Monitors harvester telemetry and detects anomalies.
     */
    monitorTelemetry: function () {
        let telemetryData = Memory.telemetry && Memory.telemetry.harvester;

        if (!telemetryData || Object.keys(telemetryData).length === 0) {
            console.log("[MONITOR] No harvester telemetry data available.");
            return;
        }

        for (let creepName in telemetryData) {
            let actions = telemetry.getTelemetry('harvester', creepName);
            console.log(`[MONITOR] Tracking ${creepName}: ${actions.length} telemetry entries recorded.`);

            // Detect if a harvester is stuck in an idle state
            let lastActions = actions.slice(-5); // Check the last few actions
            let allIdle = lastActions.every(a => a.action !== "harvest" && a.action !== "transfer" && a.action !== "moveToSource" && a.action !== "moveToTarget");

            if (allIdle) {
                console.log(`[ALERT] ${creepName} has been idle for multiple ticks without performing expected actions.`);
            }
        }
    }
};
