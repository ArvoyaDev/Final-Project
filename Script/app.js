'use strict';

/*
DONE Update HTML social network icons
DONE Change time of jsPDF so its not on military
DONE Build separate example forms for others to browse
TODO Alert Users to put data in before trying to save
TODO Have checkbox be auto checked when loading
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

    doc.setFontSize(22);
    doc.text('Routine Form', 10, 10);

    let yPosition = 30;  // Initialize y-position for text
    doc.setFontSize(12); // Reduce font size for body

    for (const [key, value] of Object.entries(formInput)) {
      if (value !== false && value !== null && value !== '') {
        let formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replaceAll(/([A-Z])/g, ' $1');
        let formattedValue = value;

        // Convert military time to standard time if applicable
        if (/^\d{2}:\d{2}$/.test(value)) {
          let [hour, minute] = value.split(':');
          let period = 'AM';
          if (hour >= 12) {
            period = 'PM';
            hour -= 12;
          }
          formattedValue = `${hour}:${minute} ${period}`;
        }

        // Convert YYYY-MM-DD to MM/DD/YYYY if applicable
        if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
          let [year, month, day] = value.split('-');
          formattedValue = `${month}/${day}/${year}`;
        }

        let text = `${formattedKey}: ${formattedValue}`;

        // Wrap text within a 180-point boundary
        doc.text(text, 10, yPosition, {
          maxWidth: 180
        });

        yPosition += 10; // Increment y-position

        if (yPosition > 270) { // If near bottom of page, create new page
          doc.addPage();
          yPosition = 10; // Reset y-position for new page
        }
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

