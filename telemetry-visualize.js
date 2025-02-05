// telemetry-visualize.js
// Displays the last 10 telemetry events for creeps listed in Memory.watchTelemetry

const telemetry = require('telemetry');


module.exports.visualizeTelemetry = function () {

    if (!Memory.watchTelemetry || !Array.isArray(Memory.watchTelemetry)) {
        return;
    }

    const room = Game.rooms[Object.keys(Game.rooms)[0]]; // Get any available room
    if (!room) return;

    if (room) {
        room.visual.text("TEST RENDER", 10, 10, { align: 'left', color: '#ff0000', font: 1 });
    }

    Memory.watchTelemetry.forEach(creepName => {
        const events = telemetry.getTelemetry(creepName);
        if (!events || events.length === 0) {
            return;
        }

        // Section header for each creep
        room.visual.text(`Creep: ${creepName}`, 2, y, { align: 'left', color: '#00ff00', font: 0.7 });
        y += 0.5;
        room.visual.text("Tick", 2, y, { align: 'left', color: '#00ff00', font: 0.6 });
        room.visual.text("Cat", 7, y, { align: 'left', color: '#00ff00', font: 0.6 });
        room.visual.text("Act", 12, y, { align: 'left', color: '#00ff00', font: 0.6 });
        room.visual.text("Tgt", 17, y, { align: 'left', color: '#00ff00', font: 0.6 });
        room.visual.text("Res", 22, y, { align: 'left', color: '#00ff00', font: 0.6 });
        y += 0.5;

        const recentEvents = events.slice(-10).reverse(); // Reverse to show newest first
        recentEvents.forEach(event => {
            room.visual.text(event.tick.toString(), 2, y, { align: 'left', color: '#ffffff', font: 0.5 });
            room.visual.text(event.category || "-", 7, y, { align: 'left', color: '#ffffff', font: 0.5 });
            room.visual.text(event.action, 12, y, { align: 'left', color: '#ffffff', font: 0.5 });
            room.visual.text(event.target, 17, y, { align: 'left', color: '#ffffff', font: 0.5 });
            room.visual.text((event.result !== undefined ? event.result.toString() : "-"), 22, y, { align: 'left', color: '#ffffff', font: 0.5 });
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