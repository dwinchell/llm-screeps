// anomaly-visualize.js
// Displays the last 10 anomaly events from Memory.anomaly on the right side of the screen

module.exports.visualizeAnomalies = function () {
    if (!Memory.anomaly || !Array.isArray(Memory.anomaly) || Memory.anomaly.length === 0) {
        return;
    }

    // Get any available room to display the visuals.
    const room = Game.rooms[Object.keys(Game.rooms)[0]];
    if (!room) return;

    // Define fixed x positions for each column, counting from the right edge.
    // In Screeps, room dimensions are 50x50. We'll use x positions near 50.
    const xTick = 10;    // Tick column will be right-aligned at x = 10
    const xId = 20;      // ID column at x = 20
    const xName = 30;    // Name column at x = 30
    const xData = 40;    // Data column at x = 40
    const xStatus = 50;  // Status column at x = 50

    let y = 2; // Start vertical position

    // Header title
    room.visual.text("Anomaly Log", xStatus, y, { align: 'right', color: '#ffffff', font: 0.8 });
    y += 1;

    // Column headers (right aligned)
    room.visual.text("Tick", xTick, y, { align: 'right', color: '#00ff00', font: 0.6 });
    room.visual.text("ID", xId, y, { align: 'right', color: '#00ff00', font: 0.6 });
    room.visual.text("Name", xName, y, { align: 'right', color: '#00ff00', font: 0.6 });
    room.visual.text("Data", xData, y, { align: 'right', color: '#00ff00', font: 0.6 });
    room.visual.text("Status", xStatus, y, { align: 'right', color: '#00ff00', font: 0.6 });
    y += 0.5;

    // Get the last 10 anomalies (newest first)
    const recentAnomalies = Memory.anomaly.slice(-10).reverse();
    recentAnomalies.forEach(anomaly => {
        room.visual.text(anomaly.tick.toString(), xTick, y, { align: 'right', color: '#ffffff', font: 0.5 });
        room.visual.text(anomaly.id, xId, y, { align: 'right', color: '#ffffff', font: 0.5 });
        room.visual.text(anomaly.name || "-", xName, y, { align: 'right', color: '#ffffff', font: 0.5 });
        let dataStr = (typeof anomaly.data === "object") ? JSON.stringify(anomaly.data) : anomaly.data.toString();
        // Limit the displayed data string length to avoid clutter.
        if (dataStr.length > 15) {
            dataStr = dataStr.substring(0, 15) + '...';
        }
        room.visual.text(dataStr, xData, y, { align: 'right', color: '#ffffff', font: 0.5 });
        room.visual.text(anomaly.status, xStatus, y, { align: 'right', color: '#ffffff', font: 0.5 });
        y += 0.5;
    });
};
