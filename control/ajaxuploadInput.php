<?php
function __autoload($class_name) {
    	include '../classes/'.$class_name . '.php';
	}
	function uploadImage($fileName, $maxSize, $maxW, $fullPath, $relPath, $colorR, $colorG, $colorB, $maxH = null){
		$secCodeCreate = new secCodeCreate(10);
		$secCode = $secCodeCreate->extractcode;
		$today = date("mdy");
		$errorCode = NULL;
		$folder = $relPath;
		$maxlimit = $maxSize;
		$allowed_ext = "jpg,jpeg,gif,png,bmp";
		$match = "";
		$filesize = $_FILES[$fileName]['size'];
		if($filesize > 0){	
			$filename = strtolower($_FILES[$fileName]['name']);
			$filename = preg_replace('/\s/', '_', $filename);
		   	if($filesize < 1){ 
				$errorCode = 'X11';
			}
			if($filesize > $maxlimit){ 
				$errorCode = 'X11';
			}
			if($errorCode==NULL){
				$file_ext = preg_split("/\./",$filename);
				$allowed_ext = preg_split("/\,/",$allowed_ext);
				foreach($allowed_ext as $ext){
					if($ext==end($file_ext)){
						$match = "1"; // File is allowed
						$NUM = $secCode;
						$front_name = $today;
						$newfilename = $front_name.$NUM.".".end($file_ext);/////new file name
						$filetype = end($file_ext);
						$save = $folder.$newfilename;
						if(!file_exists($save)){
							list($width_orig, $height_orig) = getimagesize($_FILES[$fileName]['tmp_name']);
							if($maxH == null){
								if($width_orig < $maxW){
									$fwidth = $width_orig;
								}else{
									$fwidth = $maxW;
								}
								$ratio_orig = $width_orig/$height_orig;
								$fheight = $fwidth/$ratio_orig;
								
								$blank_height = $fheight;
								$top_offset = 0;
									
							}else{
								if($width_orig <= $maxW && $height_orig <= $maxH){
									$fheight = $height_orig;
									$fwidth = $width_orig;
								}else{
									if($width_orig > $maxW){
										$ratio = ($width_orig / $maxW);
										$fwidth = $maxW;
										$fheight = ($height_orig / $ratio);
										if($fheight > $maxH){
											$ratio = ($fheight / $maxH);
											$fheight = $maxH;
											$fwidth = ($fwidth / $ratio);
										}
									}
									if($height_orig > $maxH){
										$ratio = ($height_orig / $maxH);
										$fheight = $maxH;
										$fwidth = ($width_orig / $ratio);
										if($fwidth > $maxW){
											$ratio = ($fwidth / $maxW);
											$fwidth = $maxW;
											$fheight = ($fheight / $ratio);
											
										}
									}
								}
								if($fheight == 0 || $fwidth == 0 || $height_orig == 0 || $width_orig == 0){
									$errorCode = 'X11';
								}
								if($fheight < 45){
									$blank_height = 45;
									$top_offset = round(($blank_height - $fheight)/2);
								}else{
									$blank_height = $fheight;
								}
							}
							$image_p = imagecreatetruecolor($fwidth, $blank_height);
							$white = imagecolorallocate($image_p, $colorR, $colorG, $colorB);
							imagefill($image_p, 0, 0, $white);
							switch($filetype){
								case "gif":
									$image = @imagecreatefromgif($_FILES[$fileName]['tmp_name']);
								break;
								case "jpg":
									$image = @imagecreatefromjpeg($_FILES[$fileName]['tmp_name']);
								break;
								case "jpeg":
									$image = @imagecreatefromjpeg($_FILES[$fileName]['tmp_name']);
								break;
								case "png":
									$image = @imagecreatefrompng($_FILES[$fileName]['tmp_name']);
								break;
							}
							@imagecopyresampled($image_p, $image, 0, $top_offset, 0, 0, $fwidth, $fheight, $width_orig, $height_orig);
							switch($filetype){
								case "gif":
									if(!@imagegif($image_p, $save)){
										$errorCode = 'X11';
									}
								break;
								case "jpg":
									if(!@imagejpeg($image_p, $save, 100)){
										$errorCode = 'X11';
									}
								break;
								case "jpeg":
									if(!@imagejpeg($image_p, $save, 100)){
										$errorCode = 'X11';
									}
								break;
								case "png":
									if(!@imagepng($image_p, $save, 0)){
										$errorCode = 'X11';
									}
								break;
							}
							@imagedestroy($filename);
						}else{
							$errorCode = 'X11';
						}	
					}
				}		
			}
		}else{
			$errorCode = 'X10';
		}
		if(!$match){
		   	$errorCode = 'X11';
		}
		if($errorCode == NULL){
			return $relPath.$newfilename;
			
		}else{
			
		   	return $errorCode;
		}
	}
	
	$filename = strip_tags($_REQUEST['filename']);
	$maxSize = strip_tags($_REQUEST['maxSize']);
	$maxW = strip_tags($_REQUEST['maxW']);
	$fullPath = strip_tags($_REQUEST['fullPath']);
	$relPath = strip_tags($_REQUEST['relPath']);
	$colorR = strip_tags($_REQUEST['colorR']);
	$colorG = strip_tags($_REQUEST['colorG']);
	$colorB = strip_tags($_REQUEST['colorB']);
	$maxH = strip_tags($_REQUEST['maxH']);
	$filesize_image = $_FILES[$filename]['size'];
	
	if($filesize_image > 0){
		
		$upload_image = uploadImage($filename, $maxSize, $maxW, $fullPath, $relPath, $colorR, $colorG, $colorB, $maxH);
		echo is_array($upload_image);
		if(is_array($upload_image)){
			foreach($upload_image as $key => $value) {
				if($value == "-ERROR-") {
					unset($upload_image[$key]);
				}
			}
			$document = array_values($upload_image);
			for ($x=0; $x<sizeof($document); $x++){
				$errorCode = 'X11';
			}
			
			$imgUploaded = false;
		}else{
			
			$imgUploaded = true;
		}
	}else{
		
		$imgUploaded = false;
		$errorCode = 'X11';
	}

	list($width_new, $height_new) = getimagesize($upload_image);
	
	$filaeLocale = str_replace("../","",$upload_image);
	$fileID = str_replace("../photos/tempPhotos/","",$upload_image);
	if(file_exists($upload_image)){
		echo '<img id="'.$fileID.'" src="'.$filaeLocale.'" name="'.$height_new.'"/>';
	}else{
		echo $errorCode;
	}
?>