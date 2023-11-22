Homey Low Battery Alert Script

What's This All About?

Welcome to the super useful (and slightly magical) Homey script that keeps an eye on your devices' battery levels! Ever been caught off guard by a device dying on you? Worry no more! This script is like your own battery-level detective, sleuthing through your Homey devices and flagging any that might soon leave you in the lurch.

Features

Battery Level Check: Automatically checks the battery level of all your devices connected to Athom Homey.
Updates Logic Variables: Neatly updates two logic variables in Homey, which you can use in your flows for notifications, automations, or just for fun.

Pre-flight Checklist

Before you launch this script, you need to set up a couple of things in your Homey environment:

- battery-warning Variable: This is a yes/no variable. It turns to 'yes' when any device's battery level dips below the dreaded 10%.
- battery-warning-messages Variable: A text variable that lists all the devices with their battery levels that are under 20%, so you know exactly who the culprits are!

How to Set Up Your Variables

- Open your Homey app.
- Navigate to 'More' -> 'Logic'.
- Tap the '+' icon to create a new variable.
- Name the first variable battery-warning and set its type to 'Yes/No'.
- Create another variable named battery-warning-messages and set its type to 'Text'.

Incorporating Into Flows

Once the script is up and running, it will keep these variables updated. You can then create flows in Homey using these variables. For example, set up a flow to send you a notification when battery-warning turns to 'yes'. Need inspiration? Check out flow-example.png for a nifty flow idea!

Wrapping It Up

With this script, your days of suddenly finding your devices out of juice are over. Set it up, sit back, and let Homey take care of the battery monitoring for you. Happy automating!
