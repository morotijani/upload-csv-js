// targeting form
const form = document.querySelector("form"),
	// declearation
	fileInput = form.querySelector(".file-input"),
	progressArea = document.querySelector(".progress-area"),
	uploadArea = document.querySelector(".upload-area");

form.addEventListener("click", () => {
	fileInput.click();

});

// getting file
fileInput.onchange = ({target}) => {
	// more files are upload it should only take the first one
	let file = target.files[0]

	if (file) {
		// get file exact name
		let fileName = file.name;

		// pass fileName as an argument
		uploadFile(fileName)
	}
}

// uploadFile function for file upload
function uploadFile(name) {
	// creating an xml obj
	let ajax = new XMLHttpRequest()

	//sending a post request
	ajax.open("POST", "upload.php")

	ajax.upload.addEventListener("progress", e => {
		console.log(e);
	})

	let formData = new FormData(form)

	// send form data to php
	ajax.send(formData)

}