<?php

class secCodeCreate {
	
	/* list all possible characters, similar looking characters and vowels have been removed */
									protected $possible = '23456789bcdfghjkmnpqrstvwxyz';
									protected $code = '';
									public $extractcode=NULL;
									
									function __construct($tallyHo){
									
										$secLength = $tallyHo;
										
										for ($i=0; $i < $secLength; $i++) { 
											$this->code .= substr($this->possible, mt_rand(0, strlen($this->possible)-1), 1);
										}
										
										
										$this->extractcode =  $this->code;
																}							
									
}

?>