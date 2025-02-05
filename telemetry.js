// telemetry.js

const TELEMETRY_WINDOW = 50; // Number of ticks to retain recorded telemetry events

if (!Memory.telemetry) {
    Memory.telemetry = {};
}

module.exports = {
    /**
     * Records a telemetry event for a given entity and category.
     * @param {string} entityName - The name of the entity being tracked (e.g., a creep name).
     * @param {string} category - The category of the telemetry event (e.g., "harvester", "general").
     * @param {Object} data - The telemetry event data to record.
     */
    recordTelemetry: function (entityName, category, data) {
        if (!Memory.telemetry[entityName] || !Array.isArray(Memory.telemetry[entityName])) {
            Memory.telemetry[entityName] = []; // Ensure it is always an array
        }
        
        Memory.telemetry[entityName].push({
            tick: Game.time,
            category: category,
            ...data
        });
    
        // Remove old telemetry events beyond the configured window
        if (Memory.telemetry[entityName].length > TELEMETRY_WINDOW) {
            Memory.telemetry[entityName].shift();
        }
    },
    
    /**
     * Retrieves recorded telemetry events for a given entity.
     * @param {string} entityName - The name of the entity.
     * @returns {Array} - The recorded telemetry events.
     */
    getTelemetry: function (entityName) {
        return Memory.telemetry[entityName] ? Memory.telemetry[entityName] : [];
    },

    /**
     * Clears recorded telemetry events for a given entity.
     * @param {string} entityName - The entity whose recorded telemetry events should be cleared.
     */
    clearTelemetry: function (entityName) {
        if (Memory.telemetry[entityName]) {
            delete Memory.telemetry[entityName];
        }
    }
};
