const spawning = require('manager-spawning');
const harvester = require('role-harvester');

/**
 * Main game loop, executed every tick.
 * - Runs all creeps based on their roles.
 * - Handles spawning logic.
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
};
