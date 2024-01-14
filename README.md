Homey Low Battery Alert Script

What's This All About?

Welcome to the super useful (and slightly magical) Homey script that keeps an eye on your devices' battery levels! Ever been caught off guard by a device dying on you? Worry no more! This script is like your own battery-level detective, sleuthing through your Homey devices and flagging any that might soon leave you in the lurch.

Features

Battery Level Check: Automatically checks the battery level of all your devices connected to Athom Homey. The script return TURE or FALSE based on if their is any device with low battery. IT will also generate a message listning the devices with low battery and the % of the battery.


Incorporating Into Flows

Once you have added the script, you should trigger it with an AND Logic, as it will return TRUE or FALSE. Then you can use the tag 'Low Battery Devices' in a message that list all devices.

![image](https://github.com/FreddHomey/Homey-BatteryChecker/assets/151749265/35aaa7be-9893-4ac5-ae49-d7b013d50358)


Wrapping It Up

With this script, your days of suddenly finding your devices out of juice are over. Set it up, sit back, and let Homey take care of the battery monitoring for you. Happy automating!
