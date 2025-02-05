// role-harvester-monitor.js

const telemetry = require('telemetry');

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
            if (!actions || actions.length === 0) continue;

            // Detect if a harvester is stuck in an idle state
            let lastActions = actions.slice(-5); // Check the last few actions
            let allIdle = lastActions.every(a => a.action === "heartbeat");
            let hasDeathEvent = telemetry.getTelemetry(entityName, 'lifecycle').some(a => a.action === "death");
            if (allIdle && !hasDeathEvent) {
                console.log(`[ALERT] ${entityName} has been idle for multiple ticks without performing expected actions and has no recorded death.`);
            }

            // DISABLED
            // Count consecutive noTransferTarget events without interruption
            // let consecutiveNoTarget = 0;
            // for (let i = actions.length - 1; i >= 0; i--) {
            //     if (actions[i].action === "noTransferTarget" || actions[i].action === "heartbeat") {
            //         if (actions[i].action === "noTransferTarget") {
            //             consecutiveNoTarget++;
            //         }
            //     } else {
            //         break; // Stop counting if another action intervenes
            //     }
            // }
            // if (consecutiveNoTarget > 0) {
            //     console.log(`[ALERT] Harvester ${entityName} has had no transfer target for ${consecutiveNoTarget} consecutive ticks.`);
            // }
        }
    }
};
