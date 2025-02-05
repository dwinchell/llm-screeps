/**
 * Logs structured messages to the Screeps console.
 * @param {string} category - The category of the log (e.g., "SPAWN", "ECONOMY").
 * @param {string} message - The message to log.
 */
module.exports = {
    log: function (category, message) {
        console.log(`[${Game.time}] [${category.toUpperCase()}] ${message}`);
    },

    logEnergyIncome: function () {
        const LOG_INTERVAL = 10; // Adjust as needed

        if (!global.energyLog) {
            global.energyLog = { lastTickEnergy: 0, incomePerTick: [] };
        }

        let currentEnergy = _.sum(Game.rooms, room => room.energyAvailable);
        let lastTickEnergy = global.energyLog.lastTickEnergy || currentEnergy;
        let income = currentEnergy - lastTickEnergy;
        
        // Store the energy income per tick
        global.energyLog.incomePerTick.push(income);
        if (global.energyLog.incomePerTick.length > 50) {
            global.energyLog.incomePerTick.shift(); // Keep the array size manageable
        }
        
        global.energyLog.lastTickEnergy = currentEnergy;

        if (Game.time % LOG_INTERVAL === 0) {
            let avgIncome = _.sum(global.energyLog.incomePerTick) / global.energyLog.incomePerTick.length;
            console.log(`[${Game.time}] [ECONOMY] Energy Log: Current: ${currentEnergy}, Income: ${income}, Avg Income: ${avgIncome.toFixed(2)}`);
        }
    }
};
