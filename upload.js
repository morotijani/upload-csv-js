feather.replace();

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

		// check if file name is more that 11 then split in
		if (fileName.length >= 12) {
			let splitName = fileName.split(".")
			fileName = splitName[0].substring(0, 12) + "... ." + splitName[1]
		}
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

	ajax.upload.addEventListener("progress", ({loaded, total}) => {
		// get percentage of loaded file size
		let fileLoaded = Math.floor((loaded / total) * 100)
		// get file size in kb
		let fileTotal = Math.floor(total / 1000)

		let progressHTML = `
			<li class="row">
                <i data-feather="file-text"></i>
                <div class="content">
                    <div class="details">
                        <span class="name">${name} . Uploading</span>
                        <span class="percent">${fileLoaded}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${fileLoaded}%"></div>
                    </div>
                </div>
            </li>
		`;
		progressArea.innerHTML = progressHTML

		if (loaded == total) {
			progressArea.innerHTML = ""

			let uploadHTML = `
				 <li class="row">
	                <div class="content">
	                    <i data-feather="file-text"></i>
	                    <div class="details">
	                        <span class="name">${name} . Uploaded</span>
	                        <span class="size">${fileTotal}KB</span>
	                    </div>
	                </div>
	                <i data-feather="check" class="check"></i>
	            </li>
			`;
			uploadArea.insertAdjacentHTML("afterbegin", uploadHTML)
		}
	})

	let formData = new FormData(form)

	// send form data to php
	ajax.send(formData)

}