// creep-intents.js
// Wraps Creep.prototype methods to record telemetry events

const telemetry = require('telemetry');

const INTENT_METHODS = [
    'harvest', 'transfer', 'withdraw', 'pickup', 'drop',
    'attack', 'rangedAttack', 'heal', 'rangedHeal',
    'build', 'repair', 'upgradeController', 'claimController'
];

/**
 * Wraps a method on Creep.prototype to automatically log telemetry after execution.
 * @param {string} method - The method name to wrap.
 */
function wrapCreepMethod(method) {
    const originalMethod = Creep.prototype[method];

    if (typeof originalMethod === 'function') {
        Creep.prototype[method] = function (...args) {
            const target = args[0]; // First argument is usually the target

            // Call the original method and capture the return code
            const result = originalMethod.apply(this, args);

            // Extract meaningful target information
            let targetId = 'N/A';
            if (target) {
                if (target.id) {
                    targetId = target.id;
                } else if (target.pos && typeof target.pos.x === 'number' && typeof target.pos.y === 'number') {
                    targetId = target.pos.x + ',' + target.pos.y;
                }
            }

            // Log the telemetry event
            telemetry.recordTelemetry(this.name, 'intent', {
                action: method,
                target: targetId,
                result: result,  // Capture Screeps return code
                tick: Game.time
            });

            // DEBUG
            console.log(`Telemetry logged: ${this.name} -> ${method}`);

            return result;
        };
    }
}

// Apply the wrapper to all defined intent methods
INTENT_METHODS.forEach(wrapCreepMethod);

// Wrap moveTo separately, logging target as an array [x, y, roomName]
const originalMoveTo = Creep.prototype.moveTo;
if (typeof originalMoveTo === 'function') {
    Creep.prototype.moveTo = function (...args) {
        const target = args[0];

        // Call the original method and capture the return code
        const result = originalMoveTo.apply(this, args);

        // Extract target position as an array
        let targetPos = ['N/A', 'N/A', 'N/A'];
        if (target && target.pos && typeof target.pos.x === 'number' && typeof target.pos.y === 'number' && target.pos.roomName) {
            targetPos = [target.pos.x, target.pos.y, target.pos.roomName];
        }

        // Log telemetry for moveTo
        telemetry.recordTelemetry(this.name, 'intent', {
            action: 'moveTo',
            target: targetPos,  // Now stored as an array
            result: result,  // Capture Screeps return code
            tick: Game.time
        });

        return result;
    };
}
