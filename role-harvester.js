const telemetry = require('utils-telemetry');

module.exports = {
    /**
     * Executes the harvester creep logic.
     * @param {Creep} creep - The creep to execute behavior on.
     * @param {boolean} isTestMode - Whether telemetry logging should be enabled.
     */
    run: function (creep, isTestMode) {
        if (isTestMode) {
            telemetry.logTelemetry('harvester', creep.name, { action: 'starting' });
        }

        if (creep.store.getFreeCapacity() > 0) {
            // Find nearest energy source
            let source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (source) {
                let result = creep.harvest(source);
                if (result === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
                }

                if (isTestMode) {
                    telemetry.logTelemetry('harvester', creep.name, {
                        action: result === ERR_NOT_IN_RANGE ? "moveToSource" : "harvest",
                        position: { x: creep.pos.x, y: creep.pos.y }, // Ensure position is always defined
                        target: source.id
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

                if (isTestMode) {
                    telemetry.logTelemetry('harvester', creep.name, {
                        action: result === ERR_NOT_IN_RANGE ? "moveToTarget" : "transfer",
                        position: { x: creep.pos.x, y: creep.pos.y }, // Ensure position is always defined
                        target: target.id
                    });
                }                
            }
        }
    }
};
