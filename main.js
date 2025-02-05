// main.js

const spawning = require('manager-spawning');
const harvester = require('role-harvester');
const { logEnergyIncome } = require('utils-logging');
const harvesterMonitor = require('role-harvester-monitor');
const creepLifecycle = require('creep-lifecycle');
const { visualizeTelemetry } = require('telemetry-visualize');
require('ext-creep');

/**
 * Main game loop, executed every tick.
 * - Tracks lifecycle events like heartbeat and deaths.
 * - Runs all creeps based on their roles.
 * - Handles spawning logic.
 * - Logs energy income.
 * - Monitors telemetry and detects anomalies.
 */
module.exports.loop = function () {
    console.log(`\n========== TICK ${Game.time} ==========`);

    // Track lifecycle events like heartbeat and deaths
    creepLifecycle.trackLifecycle();

    // Run creep logic
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];

        if (creep.memory.role === 'harvester') {
            harvester.run(creep);
        }
    }

    // Manage spawning
    spawning.run();

    // Log energy income
    logEnergyIncome();

    // Monitor harvester telemetry for anomalies
    harvesterMonitor.monitorTelemetry();

    // Visualize telemetry events
    visualizeTelemetry()
};
