// main.js

const spawning = require('manager-spawning');
const harvester = require('role-harvester');
const { logEnergyIncome } = require('utils-logging');
const harvesterMonitor = require('role-harvester-monitor');

/**
 * Main game loop, executed every tick.
 * - Runs all creeps based on their roles.
 * - Handles spawning logic.
 * - Logs energy income.
 * - Monitors telemetry and detects anomalies.
 */
module.exports.loop = function () {
    console.log(`\n========== TICK ${Game.time} ==========`);

    // In the Screeps client console:
    // Memory.testCreepName = "harvester123"; // Test this creep
    // Memory.testCreepName = null; // Don't test any
    if (!Memory.testCreepName) {
        Memory.testCreepName = null; // Default to no specific creep being tracked
    }

    const isTelemetryActive = !!Memory.testCreepName;

    // Run creep logic
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];

        if (creep.memory.role === 'harvester') {
            harvester.run(creep, isTelemetryActive && name === Memory.testCreepName);
        }
    }

    // Manage spawning
    spawning.run();

    // Log energy income
    logEnergyIncome();

    // Monitor harvester telemetry for anomalies
    harvesterMonitor.monitorTelemetry();
};
