document.addEventListener('DOMContentLoaded', function () {
	const topicButtons = document.querySelectorAll('.topic-option');
	const form = document.getElementById('multiStepForm');

	topicButtons.forEach(button => {
		button.addEventListener('click', function () {
			this.classList.toggle('selected');
		});
	});

	function updateSummary() {

		document.getElementById('summary-name').textContent = document.getElementById('name').value || '-';
		document.getElementById('summary-email').textContent = document.getElementById('email').value || '-';


		const topicsContainer = document.getElementById('summary-topics');
		topicsContainer.innerHTML = '';

		const selectedTopics = document.querySelectorAll('.topic-option.selected');
		if (selectedTopics.length === 0) {
			topicsContainer.innerHTML = '<span class="summary-value">No topics selected</span>';
		} else {
			selectedTopics.forEach(topic => {
				const topicTag = document.createElement('span');
				topicTag.className = 'topic-tag';
				topicTag.textContent = topic.querySelector('span').textContent;
				topicsContainer.appendChild(topicTag);
			});
		}
	}

	window.nextStep = function (step) {
		if (step === 2) {
			updateSummary();
		}
	}
}); 