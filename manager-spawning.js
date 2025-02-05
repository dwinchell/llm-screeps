const roles = require('config-roles');

/**
 * Manages creep spawning based on configured role limits.
 */
module.exports = {
    /**
     * Runs the spawning manager.
     * - Counts current creeps by role.
     * - Spawns new creeps if necessary.
     */
    run: function () {
        let spawn = Game.spawns['Spawn1'];
        if (!spawn) return;

        // Count creeps per role
        let counts = {};
        for (let role in roles) {
            counts[role] = _.filter(Game.creeps, c => c.memory.role === role).length;
        }

        // Spawn new creeps if needed
        for (let role in roles) {
            if (counts[role] < roles[role].max) {
                let newName = role + Game.time;
                let result = spawn.spawnCreep(roles[role].body, newName, {
                    memory: { role: role }
                });

                if (result === OK) {
                    console.log(`[SPAWN] Created ${role}: ${newName}`);
                }
                return; // Limit to one spawn per tick
            }
        }
    }
};
