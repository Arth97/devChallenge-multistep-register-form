document.addEventListener('DOMContentLoaded', function () {
	const steps = Array.from(document.querySelectorAll('.step'));
	const dots = Array.from(document.querySelectorAll('.step-dot'));
	const stepText = document.getElementById('step-text');
	
	dots[0].style.backgroundColor = '#5425AF';
	dots[0].style.boxShadow = '0 0 10px #845EEE';
	stepText.textContent = 'Step 1 of 3';

	function nextStep(step) {
		const nextStep = step + 1;

		steps.forEach((s, index) => {
			s.style.display = index + 1 === nextStep ? 'flex' : 'none';
		});
		
		dots.forEach((dot, index) => {
			dot.style.backgroundColor = index + 1 === nextStep ? '#5425AF' : '#212936';
			dot.style.boxShadow = index + 1 === nextStep ? '0 0 10px #845EEE' : 'none';
		});

		stepText.textContent = `Step ${nextStep} of 3`;
	}

	const topicButtons = document.querySelectorAll('.topic-option');
    topicButtons.forEach(button => {
			button.addEventListener('click', function() {
				this.classList.add('selected');
			});
    });

	window.nextStep = nextStep;
});