// Check if a user is already logged in
function checkLoggedIn() {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    showGoalSection();
  } else {
    showRegistrationForm();
  }
}

// Display the registration form
function showRegistrationForm() {
  document.getElementById('registrationForm').style.display = 'block';
  document.getElementById('goalSection').style.display = 'none';
  document.getElementById('suggestionsSection').style.display = 'none';
}


// Display the goal tracking section
function showGoalSection() {
  document.getElementById('registrationForm').style.display = 'none';
  document.getElementById('goalSection').style.display = 'block';
  document.getElementById('suggestionsSection').style.display = 'block';
}


// Function to handle navigation between sections
function showSection(sectionId) {
  const sections = document.querySelectorAll('main > section');
  sections.forEach(section => {
    if (section.id === sectionId) {
      section.style.display = 'block';
    } else {
      section.style.display = 'none';
    }
  });

  // Show/hide "Back to Registration" button based on the section
  const backToRegistrationBtn = document.querySelector('.back-to-registration');
  if (sectionId === 'weightTrackingSection') {
    backToRegistrationBtn.style.display = 'block';
  } else {
    backToRegistrationBtn.style.display = 'none';
  }
}


// Handle registration
function handleRegistration() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match. Please try again.');
    return;
  }
  // Here, you would typically send the registration data to a server for user creation
  // For now, we'll just use a simple alert to simulate successful registration
  alert('Registration successful!');

  localStorage.setItem('loggedInUser', email);

  // Show the goal tracking section after successful registration
  showGoalSection();
}





// Handle goal form submission
function handleGoalSubmission(event) {
  event.preventDefault();

  const goalWeight = parseFloat(document.getElementById('goalWeight').value);
  const goalWeightOutput = document.getElementById('goalWeightOutput');
  goalWeightOutput.textContent = goalWeight + ' kg';

  // send the goal data to a server for storage

  localStorage.setItem('goalWeight', goalWeight);

  displayGoalProgress(goalWeight);
  
  //create weight gain progress chart
  createWeightGainChart();
  
}
//function to create the weigjt gain progress chart
function createWeightGainChart(){
 const weightData =[70, 72, 75, 76.5, 77.2]; //
 
 const weightChartCanvas = document.getElementById('weightChart');
 const weightChart = new Chart (weightChartCanvas, {
	 type: 'line',
	 data:{
		 labels: ['Week 1','Week 2','Week 3', 'Week 4', 'Week 5'],
		  datasets: [
        {
          label: 'Weight Gain Progress',
          data: weightData,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 2
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
	



//Event listerners
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('registrationForm').addEventListener('submit', handleRegistration);
  document.getElementById('goalSection').addEventListener('submit', handleGoalSubmission);
  document.getElementById('foodSuggestionBtn').addEventListener('click', getFoodSuggestion);
  
  // Attach event listener to the "Get Exercise Suggestion" button inside DOMContentLoaded
   document.getElementById('exerciseSuggestionBtn').addEventListener('click', getExerciseSuggestion);

  // Attach event listener to the "Register" button
   document.getElementById('registerBtn').addEventListener('click', handleRegistration);
  //document.querySelector('.start-over').addEventListener('click', handleStartOver);
 //document.getElementById('startOverBtn').addEventListener('click', handleStartOver);

//start
    const savedCurrentWeight = parseFloat(localStorage.getItem('currentWeight'));
  const savedGoalWeight = parseFloat(localStorage.getItem('goalWeight'));
  const savedGoalTime = parseFloat(localStorage.getItem('goalTime'));
 if (!isNaN(savedCurrentWeight)) {
    document.getElementById('currentWeight').value = savedCurrentWeight.toFixed(1);
  }

  if (!isNaN(savedGoalWeight)) {
    document.getElementById('goalWeight').value = savedGoalWeight.toFixed(1);
  }

  if (!isNaN(savedGoalTime)) {
    document.getElementById('goalTime').value = savedGoalTime.toFixed(0);
    displayEstimatedTime(savedGoalTime);
  }
});

/////
 // document.querySelector('.back-btn').addEventListener('click', handleBackButtonClick);
 // Update displayed value when the goal weight range input changes
  document.getElementById('goalWeight').addEventListener('input', function() {
  const goalWeightOutput = document.getElementById('goalWeightOutput');
  const goalWeightValue = parseFloat(this.value);
  goalWeightOutput.textContent = goalWeightValue.toFixed(1) + ' kg';
});

function handleBackButtonClick(event) {
  event.preventDefault();
  history.back(); // This will navigate to the previous page in the browsing history
}
 // Check if the user is logged in or show the registration form
  checkLoggedIn();
//});


// Calculate and display the goal progress
function displayGoalProgress(goalWeight) {
  const currentWeight = 70; // Example weight, replace with actual weight data
  const goalProgress = ((currentWeight - goalWeight) / goalWeight) * 100;
  const goalProgressDiv = document.getElementById('goalProgress');
  goalProgressDiv.textContent = `Goal progress: ${goalProgress.toFixed(2)}%`;
}

// Get food suggestion
function getFoodSuggestion() {
  const appId = '00f96a62'; 
  const appKey = '18595481a53f842d3b3e499d09e2ebfe';
  const foodSuggestionDiv = document.getElementById('foodSuggestion');
  foodSuggestionDiv.textContent = 'Loading...';
  
  
  // API call to Edamam API
  fetch('https://api.edamam.com/api/food-database')
   .then(response => response.json())
    .then(data => {
      // Process the API response here and display the food suggestion
      // For now, let's just display a sample suggestion
      foodSuggestionDiv.textContent = 'Food Suggestion: Chicken Salad';
    })
    .catch(error => {
      console.error('Error retrieving food suggestion:', error);
      foodSuggestionDiv.textContent = 'Error retrieving food suggestion';
    });
}
// Function to handle the "Start Over" button click
function handleStartOver(event) {
  event.preventDefault();
  //console.log('Start Over button clicked!');
   alert('Start Over button clicked!');
  location.reload(); // This will refresh the page
}

// Function to handle the "Back to Registration" button click
function handleBackToRegistrationClick(event) {
  event.preventDefault();
  showRegistrationForm(); // Show the registration form again
}

document.querySelector('.back-to-registration').addEventListener('click', handleBackToRegistrationClick);


// Function to handle navigation between sections
function showSection(sectionId) {
  const sections = document.querySelectorAll('main > section');
  sections.forEach(section => {
    if (section.id === sectionId) {
      section.style.display = 'block';
    } else {
      section.style.display = 'none';
    }
  });
// Show/hide "Back to Registration" button based on the section
  const backToRegistrationBtn = document.querySelector('.back-to-registration');
  if (sectionId === 'weightTrackingSection') {
    backToRegistrationBtn.style.display = 'block';
  } else {
    backToRegistrationBtn.style.display = 'none';
  }
}

  // Get exercise suggestion
function getExerciseSuggestion() {
  // API call to retrieve an exercise suggestion based on the user's weight gain goals
  const exerciseSuggestionDiv = document.getElementById('exerciseSuggestion');
  exerciseSuggestionDiv.textContent = 'Loading...';

  // Simulated API call to Wger API
  fetch('https://wger.de/api/v2/exercise/')
    .then(response => response.json())
    .then(data => {
      const exercises = data.results.map(item => item.name);
      const randomExercise = exercises[Math.floor(Math.random() * exercises.length)];
      exerciseSuggestionDiv.textContent = `Exercise Suggestion: ${randomExercise}`;
    })
	
	 .catch(error => {
      console.error('Error retrieving exercise suggestion:', error);
      exerciseSuggestionDiv.textContent = 'Error retrieving exercise suggestion';
    });
	
	
	
	////'/////
	
	
}

