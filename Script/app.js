'use strict';

/*
TODO Alert Users to put data in before trying to save
TODO Have checkbox be auto checked when loading
TODO Update HTML social network icons
TODO Build separate example forms for others to browse
TODO Change time of jsPDF so its not on military
*/

// * GLOBALS

let formIDs = ['name', 'date', 'goals', 'wakeTime', 'breakfast', 'morningMeditation', 'morningReading', 'morningPhysical', 'dinner', 'sleep', 'eveningMeditation', 'eveningReading', 'phonedown'];


//  * DOM WINDOWS

// * CONSTRUCTOR FUNCTIONS

function FormInput(formIDs) {
  for (let i = 0; i < formIDs.length; i++) {
    let HTMLelement = document.getElementById(formIDs[i]);

    if (HTMLelement) {
      if (HTMLelement.type === 'checkbox' || HTMLelement.type === 'radio') {
        this[formIDs[i]] = HTMLelement.checked;
      } else {
        this[formIDs[i]] = HTMLelement.value || null;
      }
    } else {
      this[formIDs[i]] = null;
    }
  }
}

// * HELPER FUNCTIONS

function saveForm() {
  let formInput = new FormInput(formIDs);
  let formInputString = JSON.stringify(formInput);
  localStorage.setItem('myRoutineData', formInputString);
  alert('Your form has been saved to local storage!');
}

function loadForm() {
  let storedFormInputString = localStorage.getItem('myRoutineData');

  if (storedFormInputString) {
    let storedFormInput = JSON.parse(storedFormInputString);

    for (let i = 0; i < formIDs.length; i++) {
      let HTMLelement = document.getElementById(formIDs[i]);
      if (HTMLelement) {
        if (HTMLelement.type === 'checkbox' || HTMLelement.type === 'radio') {
          HTMLelement.checked = storedFormInput[formIDs[i]];
        } else {
          HTMLelement.value = storedFormInput[formIDs[i]] || '';
        }
      }
    }
    alert('Form has been loaded, remember to check off morning or evening as well as if you want mindfulness or not!');
  } else {
    alert('No form found!');
  }
}

function deleteForm() {

  let areYouSure = prompt('Are you sure you want to delete your form? (yes or no)');

  if (areYouSure.toLowerCase() === 'yes'){

    localStorage.removeItem('myRoutineData');
    alert('Your form has been deleted from local storage.');

  } else if (areYouSure.toLowerCase() === 'no'){
    alert('Nothing has been deleted!');
  } else {
    alert('please answer with a yes or no');
    deleteForm();
  }

}

// ! Big Help from ChatGPT
function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let formInputString = localStorage.getItem('myRoutineData');

  if (formInputString) {
    let formInput = JSON.parse(formInputString);

    doc.text('Routine Form', 10, 10);

    let yPosition = 20;  // Initialize y-position for text

    for (const [key, value] of Object.entries(formInput)) {
      if (value !== false && value !== null && value !== '') {
        doc.text(`${key}: ${value}`, 10, yPosition);
        yPosition += 10; // Increment y-position
      }
    }

    // Save the PDF
    doc.save('routine-form.pdf');
  } else {
    alert('Save your form to print!');
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

document.getElementById('generatePDF').addEventListener('click', generatePDF);

document.getElementById('loadFormButton').addEventListener('click', loadForm);

document.getElementById('deleteForm').addEventListener('click', deleteForm);

// * EXECUTABLE CODE

