var combinationLock = {
	combination: 0001,
	locked: true,
	wheels: [0, 0, 0, 0],
	increment: function(wheel) {
		if (this.wheels[wheel] === 9) {
			this.wheels[wheel] = 0;
		} else {
			this.wheels[wheel]++;
		}
	},
	decrement: function(wheel) {
		if (this.wheels[wheel] === 0) {
			this.wheels[wheel] = 9;
		} else {
			this.wheels[wheel]--;
		}
	},
	check: function() {
		if (this.combination === parseInt(this.wheels.join(''))) {
			this.locked = false;
		} else {
			this.locked = true;
		}
	},
	spin: function() {
		// randomize the wheels
		for (i = 0; i < 4; i++) {
			this.wheels[i] = getRandomInt(10, -1);
		}
	}
}

// ***
// Reusable Functions
// ***

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// ***
// Presentation
// ***

// Increment buttons
var increments = document.getElementsByClassName('increment');

for (var i = 0; i < increments.length; i++) {
    increments[i].addEventListener('click', function(){
    	let wheelIndex = parseInt(this.getAttribute('index'));
    	combinationLock.increment(wheelIndex);
    	document.querySelectorAll('.digit')[wheelIndex].value = combinationLock.wheels[wheelIndex];
    	checkLock();
    });
}

// Decrement buttons
var decrements = document.getElementsByClassName('decrement');

for (var i = 0; i < decrements.length; i++) {
    decrements[i].addEventListener('click', function(){
    	let wheelIndex = parseInt(this.getAttribute('index'));
    	combinationLock.decrement(wheelIndex);
    	document.querySelectorAll('.digit')[wheelIndex].value = combinationLock.wheels[wheelIndex];
    	checkLock();
    });
}

// Keypress
var wheels = document.getElementsByClassName('digit');

for (var i = 0; i < wheels.length; i++) {
	wheels[i].addEventListener('keyup', function(e){

		// arrow key up
		if (e.which === 38) {
			let wheelIndex = parseInt(this.getAttribute('index'));
			combinationLock.increment(wheelIndex);
			document.querySelectorAll('.digit')[wheelIndex].value = combinationLock.wheels[wheelIndex];
			checkLock();
		}

		// arrow key down
		if (e.which === 40) {
			let wheelIndex = parseInt(this.getAttribute('index'));
			combinationLock.decrement(wheelIndex);
			document.querySelectorAll('.digit')[wheelIndex].value = combinationLock.wheels[wheelIndex];
			checkLock();
		}

		// number key (0 - 9)
		if (e.which > 47 && e.which < 58 ) {
			let wheelIndex = parseInt(this.getAttribute('index'));
			combinationLock.wheels[wheelIndex] = parseInt(document.querySelectorAll('.digit')[wheelIndex].value);
			checkLock();
		}

		// if number is longer than 1 digit
		if (this.value.length > 1) {
			this.value = 0;
		}

		// if number is less that 1 digit
		if (this.value.length < 1) {
			this.value = 0;
		}
	});
}

// Check lock
function checkLock() {
	combinationLock.check();
	if (combinationLock.locked === false) {
		document.querySelector('#indicator').classList.remove('locked');
		document.querySelector('#indicator').classList.add('unlocked');
	window.open("#", "_self")} else {
		document.querySelector('#indicator').classList.add('locked');
		document.querySelector('#indicator').classList.remove('unlocked');
	}
}
