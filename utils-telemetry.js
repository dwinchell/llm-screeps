// utils-telemetry.js

const TELEMETRY_WINDOW = 50; // Number of ticks to retain telemetry data

if (!Memory.telemetry) {
    Memory.telemetry = {};
}

module.exports = {
    /**
     * Logs telemetry data for a given category and entity.
     * @param {string} category - The category of the telemetry data (e.g., "harvester").
     * @param {string} entityName - The name of the entity being tracked.
     * @param {Object} data - The telemetry data to log.
     */
    logTelemetry: function (category, entityName, data) {
        if (!Memory.telemetry[category]) {
            Memory.telemetry[category] = {};
        }
        
        if (!Memory.telemetry[category][entityName]) {
            Memory.telemetry[category][entityName] = [];
        }
        
        Memory.telemetry[category][entityName].push({
            tick: Game.time,
            ...data
        });
        
        // Remove old entries beyond the configured window
        if (Memory.telemetry[category][entityName].length > TELEMETRY_WINDOW) {
            Memory.telemetry[category][entityName].shift();
        }
    },

    /**
     * Retrieves telemetry data for a given category and entity.
     * @param {string} category - The telemetry category.
     * @param {string} entityName - The name of the entity.
     * @returns {Array} - The logged telemetry data.
     */
    getTelemetry: function (category, entityName) {
        return Memory.telemetry[category] && Memory.telemetry[category][entityName]
            ? Memory.telemetry[category][entityName]
            : [];
    },

    /**
     * Clears telemetry data for a given category.
     * @param {string} category - The telemetry category to clear.
     */
    clearTelemetry: function (category) {
        if (Memory.telemetry[category]) {
            delete Memory.telemetry[category];
        }
    }
};
