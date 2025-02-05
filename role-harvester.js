// role-harvester.js

const telemetry = require('telemetry');

module.exports = {
    /**
     * Runs harvester behavior and logs telemetry data.
     * @param {Creep} creep - The creep to execute behavior on.
     */
    run: function (creep) {
        if (creep.store.getFreeCapacity() > 0) {
            // Find nearest energy source
            let source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (source) {
                let result = creep.harvest(source);
                if (result === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
            else {
                telemetry.recordTelemetry(creep.name, 'harvester', {
                    action: "noHarvestTarget",
                    position: { x: creep.pos.x, y: creep.pos.y },
                });
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
            }
            else {
                telemetry.recordTelemetry(creep.name, 'harvester', {
                    action: "noTransferTarget",
                    position: { x: creep.pos.x, y: creep.pos.y },
                });
            }
        }
    }
};