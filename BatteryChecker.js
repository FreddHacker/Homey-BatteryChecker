// Function to update a variable, because why not keep things up-to-date?
async function updateVariable(variableId, variableValue) {
  try {
    await Homey.logic.updateVariable({ id: variableId, variable: { value: variableValue } });
    console.log(`Variable updated with ID ${variableId}, updated to: ${variableValue}`);
  } catch (error) {
    console.error(`Attempt to update variable failed miserably: ${error.message}`);
  }
}

// Main function that checks battery status, because nobody likes a dead battery!
async function checkBatteryStatus() {
    // Fetching all variables, like a digital squirrel collecting nuts
    const variables = await Homey.logic.getVariables();
    
    // Hunting for the elusive IDs of our target variables
    const batteryWarningVarId = Object.keys(variables).find(key => variables[key].name === 'battery-warning');
    const batteryWarningMessageVarId = Object.keys(variables).find(key => variables[key].name === 'battery-warning-messages');

    if (!batteryWarningVarId || !batteryWarningMessageVarId) {
        console.error('Could not find one or more variables. Time to play hide and seek!');
        return;
    }

    // Fetching all devices and zones, like a tech wizard
    const devices = await Homey.devices.getDevices();
    const zones = await Homey.zones.getZones();

    let lowBatteryDevices = [];
    let isBatteryWarning = false;

    // Looping through devices like a caffeinated hamster in a wheel
    for (const deviceId in devices) {
        const device = devices[deviceId];
        if (device.capabilitiesObj && device.capabilitiesObj.measure_battery) {
            const batteryLevel = device.capabilitiesObj.measure_battery.value;
            if (batteryLevel < 20) {
                // Found a device slacking on the battery front
                const zoneName = zones[device.zone].name;
                lowBatteryDevices.push({ name: device.name, battery: batteryLevel, zone: zoneName });
            }
            if (batteryLevel < 10) {
                // Alert! Battery level less than a lonely 10%
                isBatteryWarning = true;
            }
        }
    }

    // Sorting devices like a librarian with OCD
    lowBatteryDevices.sort((a, b) => a.battery - b.battery);

    // Crafting a message that would make Shakespeare jealous
    let batteryWarningMessage = lowBatteryDevices.map(device => `${device.name} (${device.zone}) at ${device.battery}%`).join(', ');

    // Updating variables in Homey, because we're responsible like that
    await updateVariable(batteryWarningVarId, isBatteryWarning);
    await updateVariable(batteryWarningMessageVarId, batteryWarningMessage);
}

// Let's get this party started!
checkBatteryStatus().catch(console.error);
