const roles = require('config/roles');

module.exports = {
    run: function () {
        let spawn = Game.spawns['Spawn1'];
        if (!spawn) return;

        // Count creeps by role
        let counts = {};
        for (let role in roles) {
            counts[role] = _.filter(Game.creeps, c => c.memory.role === role).length;
        }

        // Spawn if needed
        for (let role in roles) {
            if (counts[role] < roles[role].max) {
                let newName = role + Game.time;
                let result = spawn.spawnCreep(roles[role].body, newName, {
                    memory: { role: role }
                });

                if (result === OK) {
                    console.log(`[SPAWN] Created ${role}: ${newName}`);
                }
                return; // Only spawn one per tick
            }
        }
    }
};
