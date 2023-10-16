'use strict';

/**
 * DONE Have the form update when certain parts are selected
 * TODO User can input and save routine into Local Storage
 * TODO Be able to edit previous routine, or start from scratch
 * TODO Be able to delete current routine from local storage
 */


// * GLOBALS

//  * DOM WINDOWS

// * CONSTRUCTOR FUNCTIONS

// * HELPER FUNCTIONS

// * EVENT HANDLERS

document.getElementById('morning').addEventListener('change', function() {
  const morningForm = document.getElementById('morningForm');
  if (this.checked) {
    morningForm.style.display = 'block';
  } else {
    morningForm.style.display = 'none';
  }
});

document.getElementById('evening').addEventListener('change', function(){
  const eveningForm = document.getElementById('eveningForm');
  if (this.checked) {
    eveningForm.style.display = 'block';
  } else {
    eveningForm.style.display = 'none';
  }
});

document.querySelectorAll('input[name="morningMindfulnessAnswer"]').forEach(function(radio) {
  radio.addEventListener('change', function() {
    const morningMindfulnessSection = document.getElementById('morningMindfullnessCheckbox');
    if (radio.value === 'yes') {
      morningMindfulnessSection.style.display = 'block';
    } else {
      morningMindfulnessSection.style.display = 'none';
    }
  });
});

document.querySelectorAll('input[name="eveningMindfulnessAnswer"]').forEach(function(radio) {
  radio.addEventListener('change', function() {
    const eveningMindfulnessSection = document.getElementById('eveningMindfullnessCheckbox');
    if (radio.value === 'yes') {
      eveningMindfulnessSection.style.display = 'block';
    } else {
      eveningMindfulnessSection.style.display = 'none';
    }
  });
});


// * EXECUTABLE CODE

