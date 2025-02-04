module.exports = function log(category, message) {
    console.log(`[${Game.time}] [${category.toUpperCase()}] ${message}`);
};
