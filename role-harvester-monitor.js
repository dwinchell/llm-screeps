// role-harvester-monitor.js

const telemetry = require('telemetry');
const anomaly = require('anomaly');

module.exports = {
    /**
     * Monitors harvester telemetry and detects anomalies.
     */
    monitorTelemetry: function () {
        if (!Memory.telemetry) {
            anomaly.reportAnomaly(
                { id: "telemetry", name: "telemetry" },
                "missingTelemetry",
                "No telemetry data available.",
                "error"
            );
            return;
        }

        for (let entityName in Memory.telemetry) {
            let actions = telemetry.getTelemetry(entityName);
            if (!actions || actions.length === 0) continue;

            // Detect if a harvester is stuck in an idle state.
            let lastActions = actions.slice(-5); // Check the last few actions.
            let allIdle = lastActions.every(a => a.action === "heartbeat");
            let hasDeathEvent = telemetry.getTelemetry(entityName, 'lifecycle').some(a => a.action === "death");
            if (allIdle && !hasDeathEvent) {
                anomaly.reportAnomaly(
                    { id: entityName, name: entityName },
                    "idle",
                    "Harvester has been idle for multiple ticks without performing expected actions and has no recorded death.",
                    "alert"
                );
            }

            // Count consecutive noTransferTarget events without interruption.
            let consecutiveNoTarget = 0;
            for (let i = actions.length - 1; i >= 0; i--) {
                if (actions[i].action === "noTransferTarget" || actions[i].action === "heartbeat") {
                    if (actions[i].action === "noTransferTarget") {
                        consecutiveNoTarget++;
                    }
                } else {
                    break; // Stop counting if another action intervenes.
                }
            }
            if (consecutiveNoTarget > 0) {
                anomaly.reportAnomaly(
                    { id: entityName, name: entityName },
                    "noTransferTarget",
                    `Harvester has had no transfer target for ${consecutiveNoTarget} consecutive ticks.`,
                    "alert"
                );
            }
        }
    }
};
