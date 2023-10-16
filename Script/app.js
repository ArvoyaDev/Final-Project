'use strict';

/**
 * DONE Have the form update when certain parts are selected
 * DONE User can input and save routine into Local Storage
 * DONE Be able to edit previous routine
 * DONE Be able to start from scratch
 * DONE Be able to delete current routine from local storage
 */


// * GLOBALS

//  * DOM WINDOWS

// * CONSTRUCTOR FUNCTIONS

// * HELPER FUNCTIONS

function saveForm() {

  let formInput = {
    name: document.getElementById('name').value,
    date: document.getElementById('date').value,
    goals: document.getElementById('goals').value,
    morningCheckbox: document.getElementById('morning').value,
    eveningCheckbox: document.getElementById('evening').value,
    wakeTime: document.getElementById('wakeTime').value,
    breakfast: document.getElementById('breakfast').value,
    morningMindfulnessYes: document.getElementById('morningMindfulnessYes').value,
    morningMindfulnessNo: document.getElementById('morningMindfulnessNo').value,
    morningMeditation: document.getElementById('morningMeditation').value,
    morningReading: document.getElementById('morningReading').value,
    morningPhysical: document.getElementById('morningPhysical').value,
    dinner: document.getElementById('dinner').value,
    sleep: document.getElementById('sleep').value,
    eveningMindfulnessYes: document.getElementById('eveningMindfulnessYes').value,
    eveningMindfulnessNo: document.getElementById('eveningMindfulnessNo').value,
    eveningMeditation: document.getElementById('eveningMeditation').value,
    eveningReading: document.getElementById('eveningReading').value,
    phonedown: document.getElementById('phonedown').value
  };

  let formInputString = JSON.stringify(formInput);
  localStorage.setItem('myRoutineData', formInputString);
}

function loadForm() {

  let storedFormInputString = localStorage.getItem('myRoutineData');

  if (storedFormInputString) {
    let storedFormInput = JSON.parse(storedFormInputString);

    document.getElementById('name').value = storedFormInput.name;
    document.getElementById('date').value = storedFormInput.date;
    document.getElementById('goals').value = storedFormInput.goals;
    document.getElementById('morning').value = storedFormInput.morning;
    document.getElementById('evening').value = storedFormInput.evening;
    document.getElementById('wakeTime').value = storedFormInput.wakeTime;
    document.getElementById('breakfast').value = storedFormInput.breakfast;
    document.getElementById('morningMindfulnessYes').value = storedFormInput.morningMindfulnessYes;
    document.getElementById('morningMindfulnessNo').value = storedFormInput.morningMindfulnessNo;
    document.getElementById('morningMeditation').value = storedFormInput.morningMeditation;
    document.getElementById('morningReading').value = storedFormInput.morningReading;
    document.getElementById('morningPhysical').value = storedFormInput.morningPhysical;
    document.getElementById('dinner').value = storedFormInput.dinner;
    document.getElementById('sleep').value = storedFormInput.sleep;
    document.getElementById('eveningMindfulnessYes').value = storedFormInput.eveningMindfulnessYes;
    document.getElementById('eveningMindfulnessNo').value = storedFormInput.eveningMindfulnessNo;
    document.getElementById('eveningMeditation').value = storedFormInput.eveningMeditation;
    document.getElementById('eveningReading').value = storedFormInput.eveningReading;
    document.getElementById('phonedown').value = storedFormInput.phonedown;
  }
}

function deleteForm() {

  let areYouSure = prompt('Are you sure you want to delete your form? (yes or no)');

  if (areYouSure.toLowerCase() === 'yes'){

    localStorage.removeItem('myRoutineData');
    alert('Your form has been deleted from local storage.');

  } else if (areYouSure.toLowerCase() === 'no'){
    return;
  } else {
    alert('please answer with a yes or no');
    deleteForm();
  }


}

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
    const morningMindfulnessSection = document.getElementById('morningMindfulnessCheckbox');
    if (radio.value === 'yes') {
      morningMindfulnessSection.style.display = 'block';
    } else {
      morningMindfulnessSection.style.display = 'none';
    }
  });
});

document.querySelectorAll('input[name="eveningMindfulnessAnswer"]').forEach(function(radio) {
  radio.addEventListener('change', function() {
    const eveningMindfulnessSection = document.getElementById('eveningMindfulnessCheckbox');
    if (radio.value === 'yes') {
      eveningMindfulnessSection.style.display = 'block';
    } else {
      eveningMindfulnessSection.style.display = 'none';
    }
  });
});

document.getElementById('saveFormButton').addEventListener('click', saveForm);
document.getElementById('loadFormButton').addEventListener('click', loadForm);
document.getElementById('deleteForm').addEventListener('click', deleteForm);

// * EXECUTABLE CODE

