const telemetry = require('utils-telemetry');
const TEST_MODE = true; // Toggle test mode

module.exports = {
    /**
     * Executes the harvester creep logic.
     * @param {Creep} creep - The creep to execute behavior on.
     */
    run: function (creep) {
        if (TEST_MODE) {
            telemetry.logTelemetry('harvester', creep.name, { action: 'starting', tick: Game.time });
        }

        if (creep.store.getFreeCapacity() > 0) {
            // Find nearest energy source
            let source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (source) {
                let result = creep.harvest(source);
                if (result === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
                }

                if (TEST_MODE) {
                    telemetry.logTelemetry('harvester', creep.name, {
                        tick: Game.time,
                        action: result === ERR_NOT_IN_RANGE ? "moveToSource" : "harvest",
                        position: creep.pos ? { x: creep.pos.x, y: creep.pos.y } : null, // Ensure position is structured properly
                        target: source ? source.id : null
                    });
                }
            }
        } else {
            // Deliver energy to spawn/extensions
            let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_SPAWN ||
                        structure.structureType === STRUCTURE_EXTENSION) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            if (target) {
                let result = creep.transfer(target, RESOURCE_ENERGY);
                if (result === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }

                if (TEST_MODE) {
                    telemetry.logTelemetry('harvester', creep.name, {
                        tick: Game.time,
                        action: result === ERR_NOT_IN_RANGE ? "moveToTarget" : "transfer",
                        position: creep.pos ? { x: creep.pos.x, y: creep.pos.y } : null, // Ensure position is structured properly
                        target: target ? target.id : null
                    });
                }                
            }
        }
    }
};
