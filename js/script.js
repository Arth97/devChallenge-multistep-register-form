document.addEventListener('DOMContentLoaded', function () {
	// Elements
	const steps = Array.from(document.querySelectorAll('.step'));
	const dots = Array.from(document.querySelectorAll('.step-dot'));
	const stepText = document.getElementById('step-text');
	const form = document.getElementById('multiStepForm');

	// Data
	formData = {
		name: '',
		email: '',
		topics: []
	};
	currentStep = 1;

	// Styles & texts
	dots[0].style.backgroundColor = '#5425AF';
	dots[0].style.boxShadow = '0 0 10px #845EEE';
	stepText.textContent = 'Step 1 of 3';

	form.addEventListener('submit', function(e) {
		e.preventDefault();
		if (currentStep === 1) {
			if (form.checkValidity()) {				
				nextStep(1);
			}
		} else if (currentStep === 3) {
			alert('✅ Success');
		}
	});

	function nextStep(step) {
		if (step === 1) {
			const nameInput = document.getElementById('name');
			const emailInput = document.getElementById('email');

			if (!nameInput.value || !emailInput.value) {
				alert('Complete the form');
				return;
			}

			formData.name = nameInput.value;
			formData.email = emailInput.value;

			document.getElementById('summary-name').textContent = formData.name;
			document.getElementById('summary-email').textContent = formData.email;
		} else if (step === 2) {
			if (formData.topics.length === 0) {
				alert('Select at least one topic');
				return;
			}

			const topicsContainer = document.getElementById('summary-topics');
			topicsContainer.innerHTML = '';

			const ul = document.createElement('ul');
			ul.className = 'topic-list';

			formData.topics.forEach(topic => {
					const li = document.createElement('li');
					const topicText = {
							'software': 'Software Development',
							'ux': 'User Experience',
							'design': 'Graphic Design'
					}[topic] || topic;
					li.textContent = topicText;
					ul.appendChild(li);
			});		
			topicsContainer.appendChild(ul);
		}

		currentStep+=1;
		steps.forEach((s, index) => {
			s.style.display = index + 1 === currentStep ? 'flex' : 'none';
		});
		dots.forEach((dot, index) => {
			dot.style.backgroundColor = index + 1 === currentStep ? '#5425AF' : '#212936';
			dot.style.boxShadow = index + 1 === currentStep ? '0 0 10px #845EEE' : 'none';
		});
		stepText.textContent = `Step ${currentStep} of 3`;
	}

	const topicButtons = document.querySelectorAll('.topic-option');
	topicButtons.forEach(button => {
		button.addEventListener('click', function () {
			const topic = this.dataset.topic;
			if (this.classList.contains('selected')) {
				this.classList.remove('selected');
				formData.topics = formData.topics.filter(t => t !== topic);
			} else {
				this.classList.add('selected');
				formData.topics.push(topic);
			}
			updateTopicsSummary();
		});
	});

	window.nextStep = nextStep;
});

function updateTopicsSummary() {
	const topicsContainer = document.getElementById('summary-topics');
	topicsContainer.innerHTML = '';

	formData.topics.forEach(topic => {
		const topicTag = document.createElement('span');
		topicTag.className = 'topic-tag';
		topicTag.textContent = topic;
		topicsContainer.appendChild(topicTag);
	});
}