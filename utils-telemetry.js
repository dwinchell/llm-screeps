// utils-telemetry.js

const TELEMETRY_WINDOW = 50; // Number of ticks to retain telemetry data

if (!Memory.telemetry) {
    Memory.telemetry = {};
}

module.exports = {
    /**
     * Logs telemetry data for a given entity and category.
     * @param {string} entityName - The name of the entity being tracked (e.g., a creep name).
     * @param {string} category - The category of the telemetry data (e.g., "harvester", "general").
     * @param {Object} data - The telemetry data to log.
     */
    recordTelemetry: function (entityName, category, data) {
        if (!Memory.telemetry[entityName]) {
            Memory.telemetry[entityName] = {};
        }
        
        if (!Memory.telemetry[entityName][category]) {
            Memory.telemetry[entityName][category] = [];
        }
        
        Memory.telemetry[entityName][category].push({
            tick: Game.time,
            ...data
        });
        
        // Remove old entries beyond the configured window
        if (Memory.telemetry[entityName][category].length > TELEMETRY_WINDOW) {
            Memory.telemetry[entityName][category].shift();
        }
    },

    /**
     * Retrieves telemetry data for a given entity and category.
     * @param {string} entityName - The name of the entity.
     * @param {string} category - The telemetry category.
     * @returns {Array} - The logged telemetry data.
     */
    getTelemetry: function (entityName, category) {
        return Memory.telemetry[entityName] && Memory.telemetry[entityName][category]
            ? Memory.telemetry[entityName][category]
            : [];
    },

    /**
     * Clears telemetry data for a given entity.
     * @param {string} entityName - The entity whose telemetry data should be cleared.
     */
    clearTelemetry: function (entityName) {
        if (Memory.telemetry[entityName]) {
            delete Memory.telemetry[entityName];
        }
    }
};
