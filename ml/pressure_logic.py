def calculate_epi(pressure, ambulances):

    if pressure < 0 or ambulances < 0:
        return 0, "INVALID"

    epi = pressure + ambulances * 1.5

    if epi > 120:
        alert = "CRITICAL"
    elif epi > 90:
        alert = "WARNING"
    else:
        alert = "NORMAL"

    return round(epi,2), alert
