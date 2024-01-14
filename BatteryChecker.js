let isBatteryWarning = false;
// Main function that checks battery status, because nobody likes a dead battery!
async function checkBatteryStatus() {
    // Fetching all variables, like a digital squirrel collecting nuts
    const variables = await Homey.logic.getVariables();
    
    // Fetching all devices and zones, like a tech wizard
    const devices = await Homey.devices.getDevices();
    const zones = await Homey.zones.getZones();

    let lowBatteryDevices = [];
    
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

    // Update the log with findings
    console.log(`Any device with low battery: ${isBatteryWarning}`);
    console.log(`Devices: ${batteryWarningMessage}`);
  
    // Creating tag with messages that list all devices adn battery %
    await tag('Low Battery Devices',batteryWarningMessage);

    // Returns true if their is any devices with low battery
    
}
// Let's get this party started!
checkBatteryStatus().catch(console.error);
return isBatteryWarning;
