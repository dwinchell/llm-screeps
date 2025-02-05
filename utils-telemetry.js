const TELEMETRY_WINDOW = 50; // Number of ticks to retain telemetry data

if (!Memory.telemetry) {
    Memory.telemetry = {};
}

module.exports = {
    logTelemetry: function (category, creepName, data) {
        if (!Memory.telemetry[category]) {
            Memory.telemetry[category] = {};
        }
        
        if (!Memory.telemetry[category][creepName]) {
            Memory.telemetry[category][creepName] = [];
        }
        
        Memory.telemetry[category][creepName].push({
            tick: Game.time,
            ...data
        });
        
        // Remove old entries beyond the configured window
        if (Memory.telemetry[category][creepName].length > TELEMETRY_WINDOW) {
            Memory.telemetry[category][creepName].shift();
        }
    },

    getTelemetry: function (category, creepName) {
        return Memory.telemetry[category] && Memory.telemetry[category][creepName]
            ? Memory.telemetry[category][creepName]
            : [];
    },

    clearTelemetry: function (category) {
        if (Memory.telemetry[category]) {
            delete Memory.telemetry[category];
        }
    }
};
