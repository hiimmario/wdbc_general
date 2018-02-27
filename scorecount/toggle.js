var p1b = document.querySelector("#p1");
var p2b = document.querySelector("#p2");
var resetb = document.querySelector("#reset");
var targetscoreinput = document.querySelector("#targetscoreinput");
var targetscoredisplay = document.querySelector("#targetscoredisplay");

var scorep1display = document.querySelector("#p1display");
var scorep2display = document.querySelector("#p2display");

var p1score = 0;
var p2score = 0;
var winningscore = 5;

var gameover = false;

p1b.addEventListener("click", function() {
	if(!gameover) {
        p1score++;
        if(p1score === winningscore) {
            scorep1display.classList.add("winner");
        	gameover = true;
		}
        scorep1display.textContent = p1score;
	}
});
+
p2b.addEventListener("click", function() {
	if(!gameover) {
        p2score++;
        if(p2score === winningscore) {
            scorep2display.classList.add("winner");
        	gameover = true;
		}
        scorep2display.textContent = p2score;
	}
});

resetb.addEventListener("click", function() {
	reset();
});

targetscoreinput.addEventListener("change", function() {
    reset();
    winningscore = Number(targetscoreinput.value);
    targetscoredisplay.textContent = targetscoreinput.value;
});

function reset() {
    scorep2display.textContent = "0";
    scorep1display.textContent = "0";

    p1score = 0;
    p2score = 0;

    gameover = false;

    scorep2display.classList.remove("winner");
    scorep2display.classList.remove("winner");
}
