// telemetry-visualize.js
// Displays the last 10 telemetry events for creeps listed in Memory.watchTelemetry

const telemetry = require('utils-telemetry');

module.exports.visualizeTelemetry = function () {
    if (!Memory.watchTelemetry || !Array.isArray(Memory.watchTelemetry)) {
        return;
    }

    const room = Game.rooms[Object.keys(Game.rooms)[0]]; // Get any available room
    if (!room) return;

    let y = 2; // Start position for table
    room.visual.text("Telemetry Log", 2, y, { align: 'left', color: '#ffffff', font: 0.8 });
    y += 1;

    Memory.watchTelemetry.forEach(creepName => {
        const events = telemetry.getTelemetry(creepName, 'intent');
        if (!events || events.length === 0) {
            return;
        }

        // Section header for each creep
        room.visual.text(`Creep: ${creepName}`, 2, y, { align: 'left', color: '#00ff00', font: 0.7 });
        y += 0.5;

        const recentEvents = events.slice(-10);
        recentEvents.forEach(event => {
            room.visual.text(JSON.stringify(event), 4, y, { align: 'left', color: '#ffffff', font: 0.5 });
            y += 0.5;
        });
        y += 0.5; // Extra space between different creeps
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