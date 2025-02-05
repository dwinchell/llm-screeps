// anomaly.js

const logger = require('utils-logging');

/**
 * Initialize Memory.anomaly as an empty array if it does not already exist.
 */
function initMemory() {
    if (!Memory.anomaly) {
        Memory.anomaly = [];
    }
}

/**
 * Report an anomaly for a given object and anomaly type.
 *
 * @param {object} object - The object exhibiting anomalous behavior. Must have an 'id' property.
 * @param {string} anomalyType - A string representing the type of anomaly.
 * @param {*} data - The anomaly data to record.
 * @param {string} [status='active'] - The anomaly status (defaults to 'active').
 * @return {number} Returns 0 if the anomaly was successfully reported, or -1 if the object lacks an id.
 */
function reportAnomaly(object, anomalyType, data, status) {
    status = (typeof status !== 'undefined') ? status : 'active';
    initMemory();

    // Validate that the object has an 'id' property.
    if (!object || !object.id) {
        logger.log("ANOMALY", "Error: Provided object does not have an 'id' property. Anomaly not recorded.");
        return -1;
    }

    // Prepare the new anomaly entry.
    var newEntry = {
        id: object.id,
        type: anomalyType,
        tick: Game.time,
        data: data,
        status: status
    };

    // If the object has a name property, add it.
    if (object.name) {
        newEntry.name = object.name;
    }

    // Deduplicate by object.id and anomalyType:
    // Look for an existing anomaly with the same id and type.
    let foundIndex = -1;
    for (let i = 0; i < Memory.anomaly.length; i++) {
        if (Memory.anomaly[i].id === object.id && Memory.anomaly[i].type === anomalyType) {
            foundIndex = i;
            break;
        }
    }

    if (foundIndex >= 0) {
        // Overwrite the existing anomaly with the new entry.
        Memory.anomaly[foundIndex] = newEntry;
    } else {
        // Otherwise, push the new anomaly entry.
        Memory.anomaly.push(newEntry);
    }

    return 0;
}

/**
 * Retrieve all anomaly entries stored in Memory.
 *
 * @return {Array} The array of anomaly entries.
 */
function getAllAnomalies() {
    initMemory();
    return Memory.anomaly;
}

/**
 * Clear all anomaly entries for a given object id.
 *
 * @param {string} id - The id of the object for which to clear anomalies.
 */
function clearAnomaliesForObjectId(id) {
    initMemory();
    if (!id) {
        logger.log("ANOMALY", "Error: Provided id is invalid. Cannot clear anomalies.");
        return;
    }

    Memory.anomaly = Memory.anomaly.filter(function(anomaly) {
        return anomaly.id !== id;
    });
}

module.exports = {
    reportAnomaly: reportAnomaly,
    getAllAnomalies: getAllAnomalies,
    clearAnomaliesForObjectId: clearAnomaliesForObjectId
};
