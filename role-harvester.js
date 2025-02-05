/**
 * Handles the behavior of harvester creeps.
 */
module.exports = {
    /**
     * Executes the harvester creep logic.
     * @param {Creep} creep - The creep to execute behavior on.
     */
    run: function (creep) {
        if (creep.store.getFreeCapacity() > 0) {
            // Find nearest energy source
            let source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (source) {
                if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
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
                if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
};
