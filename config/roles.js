/**
 * Defines available creep roles and their configurations.
 * @type {Object<string, {body: BodyPartConstant[], max: number}>}
 */
module.exports = {
    harvester: {
        body: [WORK, CARRY, MOVE], // Basic harvester body
        max: 3 // Limit total harvesters
    }
};
