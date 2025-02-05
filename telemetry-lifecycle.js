// creep-lifecycle.js

const telemetry = require('telemetry');

const TELEMETRY_RETENTION_TICKS = 1; // Time before dead creep telemetry is removed

module.exports = {
    /**
     * Tracks the lifecycle of all creeps, handling events like spawning and death.
     */
    recordLifecycleTelemetry: function () {
        if (!Memory.telemetry) {
            Memory.telemetry = {};
        }

        for (let entityName in Memory.telemetry) {
            if (!Game.creeps[entityName]) {
                let deathLog = telemetry.getTelemetry(entityName).find(a => a.category === 'lifecycle' && a.action === "death");

                if (!deathLog) {
                    telemetry.recordTelemetry(entityName, 'lifecycle', { action: 'death', tick: Game.time });
                    console.log(`[LIFECYCLE] Creep ${entityName} has died.`);
                } else if (Game.time - deathLog.tick > TELEMETRY_RETENTION_TICKS) {
                    console.log(`[LIFECYCLE] Removing telemetry for deceased creep ${entityName} after ${TELEMETRY_RETENTION_TICKS} ticks.`);
                    telemetry.clearTelemetry(entityName);
                }
            }
        }
    }
};
