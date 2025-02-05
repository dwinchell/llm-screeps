const spawning = require('manager-spawning');
const harvester = require('role-harvester');
const { logEnergyIncome } = require('utils-logging'); // Import the function
const harvesterTest = require('role-harvester-test');

/**
 * Main game loop, executed every tick.
 * - Runs all creeps based on their roles.
 * - Handles spawning logic.
 * - Logs energy income.
 */
module.exports.loop = function () {
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

    harvesterTest.runTests();
};
