<?php 
	
	$fileName = $_FILES['file']['name'];
	$fileTmpName = $_FILES['file']['tmp_name'];
	$fileNewName = time() . $fileName;
	$fileDestination = "files/" . $fileNewName;

	move_uploaded_file($fileTmpName, $fileDestination);