const imageInput = document.getElementById('imageInput');
const brightnessInput = document.getElementById('brightness');
const contrastInput = document.getElementById('contrast');
const canvas = document.getElementById('canvas');
const downloadButton = document.getElementById('download');
const context = canvas.getContext('2d');

let image = null;

imageInput.addEventListener('change', function() {
	const reader = new FileReader();
	reader.onload = function(event) {
		image = new Image();
		image.onload = function() {
			drawImage();
		};
		image.src = event.target.result;
	};
	reader.readAsDataURL(this.files[0]);
});

brightnessInput.addEventListener('input', function() {
	drawImage();
});

contrastInput.addEventListener('input', function() {
	drawImage();
});

downloadButton.addEventListener('click', function() {
	const link = document.createElement('a');
	link.download = 'editedImage.png';
	link.href = canvas.toDataURL('image/png');
	link.click();
});

function drawImage() {
	if (!image) return;
	
	canvas.width = image.width;
	canvas.height = image.height;
	
	context.filter = `brightness(${brightnessInput.value}%) contrast(${contrastInput.value}%)`;
	
	context.drawImage(image, 0, 0);
}
