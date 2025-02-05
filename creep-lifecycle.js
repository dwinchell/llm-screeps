// creep-lifecycle.js

const telemetry = require('utils-telemetry');

const TELEMETRY_RETENTION_TICKS = 1; // Time before dead creep telemetry is removed

module.exports = {
    /**
     * Tracks the lifecycle of all creeps, handling events like spawning and death.
     */
    trackLifecycle: function () {
        if (!Memory.telemetry) {
            Memory.telemetry = {};
        }

        for (let entityName in Game.creeps) {
            telemetry.recordTelemetry(entityName, 'lifecycle', {
                action: 'heartbeat',
                position: { x: Game.creeps[entityName].pos.x, y: Game.creeps[entityName].pos.y }
            });
        }

        for (let entityName in Memory.telemetry) {
            if (!Game.creeps[entityName]) {
                let deathLog = telemetry.getTelemetry(entityName, 'lifecycle').find(a => a.action === "death");

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
