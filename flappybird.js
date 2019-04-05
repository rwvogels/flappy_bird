window.addEventListener("DOMContentLoaded",function() {
    
    //Generate [canvas] and set size.
    let canvas = document.querySelector("canvas"),
        context = canvas.getContext("2d");
    
    canvas.height = canvas.getBoundingClientRect().height;
    canvas.width = canvas.getBoundingClientRect().width;
    
    // Set the default attributes.
    const pilars_amount = Math.floor(canvas.width / 100),     // The amount of pilars in the game.
          pilars_speed = 3;                                                         // The speed of the pilars.
    
    let game_paused = true,                                                    // Boolean to check if the game is paused.
        game_time = 0,                                                              // The elapsed game time.
        player_speed = -canvas.height / 2.5 * 0.06,                   // The current speed of the player.
        points = 0,                                                                      // The players current points.
    
    // Initialise the player and pilar values.
        playerdata = canvas_initialise_player(canvas),
        pilardata = canvas_initialise_pilars(canvas, pilars_amount);
    
    // Load in all items.
    canvas_render();
    // Start the [canvas] loop.
    canvas_loop();
    
    // The [canvas] data set.
    function canvas_update(elapsed_time) {
        // Update player speed.
        player_speed = update_player_speed(canvas, player_speed, playerdata);
        playerdata[1] += player_speed;
        
        // Set the pilar data.
        for (let i = 0; i < pilardata.length; i++) {
            
            // If the pilars go off screen remove and render a new pair.
            if (pilardata[i][0] + pilardata[i][2] < canvas.clientLeft) {
                points++;
                // Remove the pilar.
                pilardata.shift();
                // Generate new pilars.
                for (let j = 0; j < 2; j++) {
                    if (j % 2 === 0) {
                        pilardata.push([
                            pilardata[pilardata.length - 1][0] + 200,
                            0,
                            50,
                            Math.floor(Math.random() * canvas.height / 2),]);
                    }
                    if (j % 2 === 1) {
                        pilardata.push([
                            pilardata[pilardata.length - 1][0],
                            pilardata[pilardata.length - 1][3] + 200,
                            pilardata[pilardata.length - 1][2],
                            canvas.height]);
                    }
                }
            }
            // Move the pilars.
            pilardata[i][0] += Math.floor(-pilars_speed);
        }
        // Check for collision.
        if (collision_detection(canvas, playerdata, pilardata)) {
            game_paused = false;
        }
        // Render the canvas.
        canvas_render();
    }
    // The [canvas] render.
    function canvas_render() {
        // Clear the [canvas].
        context.clearRect(0, 0, canvas.width, canvas.height);
        // Render the pilars.
        context.fillStyle = "#FFF";
        for (let i = 0; i < pilardata.length; i++) {
            if (i % 2 === 0) {
                context.drawImage(document.getElementById("pipe_top"),pilardata[i][0],pilardata[i][1],pilardata[i][2],pilardata[i][3]);
            }
            if (i % 2 === 1) {
                context.drawImage(document.getElementById("pipe_bottom"),pilardata[i][0],pilardata[i][1],pilardata[i][2],pilardata[i][3]);
            }
        }
        // Render the player.
        context.drawImage(document.getElementById("bird"),playerdata[0],playerdata[1],playerdata[2],playerdata[3]);
        
        // Render the score.
        context.font = "60px Carter One";
        context.fillText(Math.floor(points / 2), canvas.width / 2 - 30, 100);
        
        // Render the background.
        document.getElementById("canvas_ground").style.backgroundPosition = -game_time * 2 + "px";
    }
    // The [canvas] loop.
    function canvas_loop() {
        // If the game is not paused render the frame.
        if (game_paused) {
            // Get elapsed game time.
            game_time++;
            // Update and render the [canvas].
            canvas_update(game_time);
        }
        window.requestAnimationFrame(canvas_loop);
    }
    
    // Set paused.
    window.onkeydown = function(event) {
        // For PC, pause and restart on spacebar event.
        if (event.keyCode === 32) {
            // If player dies reset the game.
             if (collision_detection(canvas, playerdata, pilardata)) {
                 pilardata = canvas_initialise_pilars(canvas, pilars_amount);
                 playerdata = canvas_initialise_player(canvas);
                 player_speed = -canvas.height / 70;
                 points = 0;
                 canvas_render();
            }
            // Pause and unpause the game.
            game_paused = !game_paused;
            
            // Change the graphic.
            if (game_paused) {
            document.getElementById("pause_button").style.backgroundImage = "url('images/pause_button.svg')";
            } else {
                document.getElementById("pause_button").style.backgroundImage = "url('images/play_button.svg')";
            }
        }
    }
    // Set player speed.
    canvas.addEventListener("click",function() {
        player_speed = -canvas.height / 4 * 0.06;
    });
    
    // When the restart button gets clicked.
    document.getElementById("restart_button").addEventListener("click",function() {
        pilardata = canvas_initialise_pilars(canvas, pilars_amount);
        playerdata = canvas_initialise_player(canvas);
        player_speed = -canvas.height / 70;
        points = 0;
        canvas_render();
        // Set game to play.
        if (!game_paused) {
            game_paused = !game_paused;
        }
    });
    
    // When the pause button gets clicked.
    document.getElementById("pause_button").addEventListener("click",function() {
        // Check for collision detection.
        if (collision_detection(canvas, playerdata, pilardata)) {
            pilardata = canvas_initialise_pilars(canvas, pilars_amount);
            playerdata = canvas_initialise_player(canvas);
            player_speed = -canvas.height / 70;
            points = 0;
            canvas_render();
        }
        // Change pause state.
        game_paused = !game_paused;
        // Change the graphic.
        if (game_paused) {
            document.getElementById("pause_button").style.backgroundImage = "url('images/pause_button.svg')";
        } else {
            document.getElementById("pause_button").style.backgroundImage = "url('images/play_button.svg')";
        }
    });
});