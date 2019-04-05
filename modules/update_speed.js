// Update the players current speed.
function update_player_speed(canvas, player_speed, playerdata) {
    // If player hits the top of the [canvas].
    if (playerdata[1] < canvas.clientTop) {
        return player_speed = 1;
    }
    // Lower the player speed.
    if (player_speed < 10) {
        return player_speed += 0.6;
    }
    return player_speed;
}