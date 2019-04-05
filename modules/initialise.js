// The [canvas] initialiser for the pilars.
function canvas_initialise_pilars(canvas, pilars_amount) {
    // The big data array.
    let pilardata = [];
    // Set the pilar data.
    for (let i = 0; i < pilars_amount * 2; i++) {
        if (i % 2 === 0) {
            pilardata.push([
                i * 100 + canvas.width,
                0,
                50,
                Math.floor(Math.random() * canvas.height / 2)]);
        }
        if (i % 2 === 1) {
            pilardata.push([
                pilardata[i - 1][0],
                pilardata[i - 1][3] + 200,
               pilardata[i - 1][2],
                canvas.height]);
        }
    }
    return pilardata;
}

// The [canvas] initialiser for the player.
function canvas_initialise_player(canvas) {
    // The small data array.
    let playerdata = [
        canvas.width / 10,
        canvas.height / 2 - canvas.height / 32 / 2,
        200 / 4,
        200 / 5
    ];     
    return playerdata;
}