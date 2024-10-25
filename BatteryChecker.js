// 2024-10-25 Updated to new API standard

let isBatteryWarning = false;

// Main function to check battery status—because no one wants a dead battery!
async function checkBatteryStatus() {
    // Fetch all variables and devices like a digital squirrel
    const variables = await Homey.logic.getVariables();
    const devices = await Homey.devices.getDevices();
    const zones = await Homey.zones.getZones();

    let lowBatteryDevices = [];

    // Loop through devices like a caffeine-fueled hamster
    for (const deviceId in devices) {
        const device = devices[deviceId];
        if (device.capabilitiesObj?.measure_battery) {
            const batteryLevel = device.capabilitiesObj.measure_battery.value;
            
            if (batteryLevel < 20) {
                // Device with low battery found
                const zoneName = zones[device.zone].name;
                lowBatteryDevices.push({ name: device.name, battery: batteryLevel, zone: zoneName });
            }
            if (batteryLevel < 10) {
                // Critical battery level alert
                isBatteryWarning = true;
            }
        }
    }

    // Sort devices by battery level, low to high
    lowBatteryDevices.sort((a, b) => a.battery - b.battery);

    // Create a battery status message
    let batteryWarningMessage = lowBatteryDevices.map(device => `${device.name} (${device.zone}) at ${device.battery}%`).join(', ');

    // Log the findings
    console.log(`Any device with low battery: ${isBatteryWarning}`);
    console.log(`Devices: ${batteryWarningMessage}`);

    // Tag devices with low battery and their levels
    await tag('Low Battery Devices', batteryWarningMessage);

    // Return battery warning status
    return isBatteryWarning;
}

// Start the battery check and handle any errors
const resp = checkBatteryStatus().catch(console.error);

// Return true if any device has low battery
return resp;
