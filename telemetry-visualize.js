// telemetry-visualize.js
// Displays the last 10 telemetry events for creeps listed in Memory.watchTelemetry

const telemetry = require('utils-telemetry');

module.exports.visualizeTelemetry = function () {
    if (!Memory.watchTelemetry || !Array.isArray(Memory.watchTelemetry)) {
        return;
    }

    Memory.watchTelemetry.forEach(creepName => {
        const creep = Game.creeps[creepName];
        if (!creep) {
            return; // Skip invalid creep names
        }

        const events = telemetry.getTelemetry(creepName, 'intent');
        if (!events || events.length === 0) {
            return;
        }

        // Get the last 10 events
        const recentEvents = events.slice(-10);
        
        // Format text output
        const lines = recentEvents.map(event => {
            return `${event.tick}: ${event.action} -> ${event.target} [${event.result}]`;
        });

        // Display above the creep
        creep.room.visual.text(lines.join('\n'), creep.pos.x + 1, creep.pos.y, {
            align: 'left',
            color: '#00ff00',
            font: 0.5
        });
    });
};

global.watchTelemetry = function (creepName) {
    if (!Memory.watchTelemetry || !Array.isArray(Memory.watchTelemetry)) {
        Memory.watchTelemetry = [];
    }
    if (!Memory.watchTelemetry.includes(creepName)) {
        Memory.watchTelemetry.push(creepName);
    }
};

global.unWatchTelemetry = function (creepName) {
    if (Memory.watchTelemetry && Array.isArray(Memory.watchTelemetry)) {
        Memory.watchTelemetry = Memory.watchTelemetry.filter(name => name !== creepName);
    }
};

global.noWatchTelemetry = function () {
    Memory.watchTelemetry = [];
};