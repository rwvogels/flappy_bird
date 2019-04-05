// Check for collision.
function collision_detection(canvas, playerdata, pilardata) {
    let collision = false;
    // Loop through all pilars.
    for (let i = 0; i < pilardata.length; i++) {
        if (playerdata[1] < pilardata[i][1] + pilardata[i][3] &&
            playerdata[0] + playerdata[3] > pilardata[i][0]  &&
            playerdata[1] + playerdata[3] > pilardata[i][1] &&
            playerdata[0] < pilardata[i][0] + pilardata[i][2] ||
            playerdata[1] + playerdata[3] > canvas.height) {
            collision = true;
        }
    }
    return collision;    
}