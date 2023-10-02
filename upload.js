
// targeting form
const form = document.querySelector("form"),
	// declearation
	fileInput = form.querySelector(".file-input"),
	progressArea = document.querySelector(".progress-area"),
	uploadedArea = document.querySelector(".uploaded-area");

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

		let fileSize;
		// get file size in kb if is less than 1024 and in mb if is grater or equal to 1024
		(fileTotal < 1024) ? fileSize = fileTotal + " KB" :  fileSize = (loaded / (1024 * 1024)).toFixed(2) + " MB";

		let progressHTML = `
			<li class="row">
                <i class="bi bi-file-text-fill"></i>
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
		// uploadedArea.innerHTML = ""
		uploadedArea.classList.add("onprogress");
		progressArea.innerHTML = progressHTML

		if (loaded == total) {
			progressArea.innerHTML = ""

			let uploadedHTML = `
				 <li class="row">
	                <div class="content">
	                    <i class="bi bi-file-text-fill"></i>
	                    <div class="details">
	                        <span class="name">${name} . Uploaded . <a href="view.file.php?f=${name}">view</a></span>
	                        <span class="size">${fileSize}</span>
	                    </div>
	                </div>
	                <i class="bi bi-check2-all"></i>
	            </li>
			`;
			uploadedArea.classList.remove("onprogress");
			/// uploadedArea.innerHTML = uploadedHTML;
			uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML)
		}
	})

	let formData = new FormData(form)

	// send form data to php
	ajax.send(formData)

}