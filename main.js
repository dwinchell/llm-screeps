const spawning = require('manager-spawning');
const harvester = require('role-harvester');
const { logEnergyIncome } = require('utils-logging');
const harvesterTest = require('role-harvester-test');

/**
 * Main game loop, executed every tick.
 * - Runs all creeps based on their roles.
 * - Handles spawning logic.
 * - Logs energy income.
 */
module.exports.loop = function () {
    console.log(`\n========== TICK ${Game.time} ==========`);

    // In the Screeps client console:
    // Memory.testCreepName = "harvester123"; // Test this creep
    // Memory.testCreepName = null; // Don't test any
    if (!Memory.testCreepName) {
        Memory.testCreepName = null; // Default to no specific creep being tracked
    }

    // Run creep logic
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];

        if (creep.memory.role === 'harvester') {
            const isTestMode = name === Memory.testCreepName; // Enable test mode only for the selected creep
            harvester.run(creep, isTestMode);
        }
    }

    // Manage spawning
    spawning.run();

    // Log energy income
    logEnergyIncome();

    // Run harvester tests
    harvesterTest.runTests();
};
