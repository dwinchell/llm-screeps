/**
 * Logs structured messages to the Screeps console.
 * @param {string} category - The category of the log (e.g., "SPAWN", "ECONOMY").
 * @param {string} message - The message to log.
 */
module.exports = function log(category, message) {
    console.log(`[${Game.time}] [${category.toUpperCase()}] ${message}`);
};
