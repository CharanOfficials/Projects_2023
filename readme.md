Note: We use hidden scrollers for alarms list and add new alarm feature. Please test carefully.

Project should be developed using the Vanilla JS, HTML, CSS.

1. Clock face
    Clock showing the current time (seconds,mins,hrs should change as time changes): Done

2. Set Alarm
    Provide input boxes to set an alarm (hr,min,sec, am/pm): Done -> Time will get converted internally in AM/ PM

    Ones sets the time and click “Set Alarm” button, add that alarm to the alarms list below: Done

    When the alarm goes of just use JS alert function to alert in the browser: Done -> Sound added to notify the alarm. You can use alarm icon to mute and unmute. Sound will be muted by default on page load. You can refer text on top left.

3. Alarms list
    Display a list of all the alarms set by user: Done -> Persistance storage is used. Max alarms list is 20 for now.

4. Delete alarm in any sequence
    Alarm shoud get deleted in any sequence without impacting the list of other alarms. Done
    For each alarm give a delete button to delete the alarm: Done
    When the user deletes an alarm make sure it “does not alerts the user”: Done

5. Duplicate & incorrect data alarms
    Duplicates alarms should not be allowed. Alarms with empty text should not be allowed to enter. Done -> User will get the error alerts and all the data entered will be reset.

7. Data should not get interrupted with other projects using same storage
    Done -> we are using 0 index to check whether anyt such data exists and if yes then we are deleting the entire data before starting the operations.

8. Alarms should stopped automatically after a minute: Done

Note: We use hidden scrollers for alarms list and add new alarm feature. Please test carefully.