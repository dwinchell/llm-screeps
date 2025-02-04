const spawning = require('managers/spawning');
const harvester = require('roles/harvester');

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
