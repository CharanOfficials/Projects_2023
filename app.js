var alarmClockApp = (function(){
    const currentTime = new Date().toLocaleString().split(',');
    const cTime = document.getElementById("time");
    cTime.innerHTML = currentTime[1];
    const audio = new Audio('alarm_sound.ogg');
    const setAlarm = document.getElementById("alarm-btn")
    const clearAlarm = document.getElementById("del_set_alarm")
    const submitAlarm = document.getElementById("submit_alarm")
    const alarmList = document.getElementById('alarms')
    const collectAlarmData = document.getElementsByClassName("set_alarm_container")[0]

    // common listener
    document.addEventListener('click', handleClickListener)

    //  to contnously update the clock
    setInterval(() => {
        const updatedTime = new Date().toLocaleString().split(',');
        document.getElementById("time").innerHTML = updatedTime[1];
    }, 1000);

    // To continously check the alarm
    let haveAlarm = false
    function alarmScheduler(){
        killAlarm = setInterval(()=>{
        haveAlarm = false
        let updatedTime = new Date().toLocaleString().split(',');
        updatedTime = updatedTime[1].split(':')
        const hours = parseInt(updatedTime[0])
        const minutes = updatedTime[1]
        let am_pm = updatedTime[2].split(' ')
        am_pm = am_pm[1]
        for(let i = 1; i < localStorage.length; i++){
            const storedData = localStorage.getItem(i)
            const parsedData = JSON.parse(storedData)
            if(hours < 13 && hours >= 12){
                parsedData.hours = '12'
            }
            if(parseInt(parsedData.hours) === hours && parsedData.minutes === minutes && parsedData.am_pm === am_pm && parsedData.status === true){
                    haveAlarm = true
                    stopPlayAlarm()
                }
        }
    },1000)}

    // To calculate the active Alarms Length
    function activeAlarmsLength(){
        let count = 0
        for(let i = 1; i < localStorage.length; i++){
            const storedData = localStorage.getItem(i)
            const parsedData = JSON.parse(storedData)
            if(parsedData.status === true){
                count++
            }
        }
        if(count < 20){
            return true
        }
        else{
            return false
        }
    }

    // To add the new alarm
    setAlarm.addEventListener('click',()=>{
        collectAlarmData.style.display = "block"
        if(localStorage.getItem('0') !== 'true'){
            localStorage.clear()
            localStorage.setItem('0', 'true')
        }
        const alarmTime = document.getElementById("alarm_time").value = "00:00"
        styleWithMenu(true)
    })

    //  To clear the newly added alarm using the above function
    clearAlarm.addEventListener('click',()=>{
        document.getElementById("alarm_name").value = ""
        document.getElementById("alarm_time").value = "00:00"
        styleWithMenu(false)
    })

    // To submit the newly created alarm
    submitAlarm.addEventListener('click',()=>{
        let alarmName = document.getElementById("alarm_name").value
        alarmName = alarmName.trim()
        const alarmTime = document.getElementById("alarm_time").value
        const [hours, minutes] = alarmTime.split(":")
        const newHours = (parseInt(hours) % 12).toString()
        const am_pm = (parseInt(hours) < 12) ? "AM" : "PM"
        const tempId = localStorage.length
        let isTimeUnique = true
        let nonRepeatedAlarm = true
        for(let i = 1; i < localStorage.length; i++){
            const storedData = localStorage.getItem(i)
            const parsedData = JSON.parse(storedData)
            if(parsedData.hours === newHours && parsedData.minutes === minutes && parsedData.am_pm === am_pm && parsedData.status === true){
                alert("Repeated alarms can't be added")
                isTimeUnique = false
                nonRepeatedAlarm = false
                // Clear the alarm
                styleWithMenu(false)
                break
                }
        }
        if(nonRepeatedAlarm && localStorage.getItem('0') === 'true' && isTimeUnique && activeAlarmsLength() && alarmTime !== "00:00" && alarmName !== ""){
            newData = {'id': tempId,
                        'hours': newHours, 
                        'minutes':minutes, 
                        'am_pm':am_pm,
                        'alarmName':alarmName,
                        'status': true
                        }

            localStorage.setItem(tempId,JSON.stringify(newData))
            alert("Alarm added successfully")
            renderList()
            }
        else if(nonRepeatedAlarm && alarmName === "" || alarmTime === "00:00"){
                alert("Alarm data is incorrect")
            }
        else if(nonRepeatedAlarm && activeAlarmsLength() === false){
            alert("You can't add more alarms")
        }
        styleWithMenu(false)
    })

    // To control the style of the add new alarm menu with the alarm list
    function styleWithMenu(withMenu){
        const setAlarmStyle = document.getElementsByClassName("alarms")[0]
        if(withMenu){
            setAlarmStyle.style.height = "60vh"
            setAlarmStyle.style.marginTop = "10px"
            collectAlarmData.style.display = "block"
        }else{
            setAlarmStyle.style.height = "73vh"
            setAlarmStyle.style.marginTop = "40px"
            collectAlarmData.style.display = "none"
            document.getElementById("alarm_name").value = ""
            document.getElementById("alarm_time").value = "00:00"
        }

    }

    //  to delete the alarm
    function deleteAlarm(alarmId){
        alarmId = alarmId.toString()
        // localStorage.removeItem(alarmId)
        const storedData = localStorage.getItem(alarmId)
        const parsedData = JSON.parse(storedData)
        parsedData.status = false
        localStorage.setItem(alarmId, JSON.stringify(parsedData));
        alert("Alarm deleted successfully")
        renderList()
    }

    let alarmUserEnabled = false
    function stopPlayAlarm(){
        console.log("Playing")
        const alarmState = document.getElementById("mute_Text")
        if(audio.paused && alarmUserEnabled && haveAlarm){
            audio.currentTime = 0
            audio.play();
            audio.muted = false
            return
        }else if(!alarmUserEnabled && !audio.paused){
            audio.pause()
            audio.muted = true
            audio.currentTime = 0
            }
        if(!alarmUserEnabled){
            alarmState.style.display = "block"
        }
        else{
            alarmState.style.display = "none"
        }
    }

    // to listen to all the created alarms which needs to be deleted
    // to listen to the sound mute and enable button
    function handleClickListener(e){
        const target = e.target
        if(target.className === 'alarm_trash'){
            let alarmId = target.dataset.id;
            deleteAlarm(alarmId)
        }
        else if(target.className === 'stop_alarm'){
            alarmUserEnabled = !alarmUserEnabled
            stopPlayAlarm()
        }
    }

    // To add the list of currently active alarms to DOM
    function addAlarmsToDOM(alarm){
        const li = document.createElement('li')
        li.innerHTML = `
            <li class="data_alarm">
            <img src="trash3.svg" class="alarm_trash" data-id="${alarm.id}">
            <div class="alarm_name_output">${alarm.alarmName}</div>
            <div class="alarms_time">${alarm.hours} : ${alarm.minutes}</div>
            <div class="half">${alarm.am_pm}</div>
            <img src="alarm.svg" class="stop_alarm" data-id="${alarm.id}">
        </li>
        `
        alarmList.append(li)
    }

    // to render the newly created list of active alarms
    function renderList(){
        
        alarmList.innerHTML = "";

        for(let i = 1; i < localStorage.length; i++){
            const storedData = localStorage.getItem(i)
            const parsedData = JSON.parse(storedData)
            if(parsedData.status === true){
                addAlarmsToDOM(parsedData)
            }
        }
        // tasksCounter.innerHTML = tasks.length
    }

    // Master function to launch the application
    function launchApplication(){
        alarmScheduler()    
        renderList()
    }

    return{
        launchApplication: launchApplication
    } 
})()