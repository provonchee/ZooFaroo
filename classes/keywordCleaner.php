<?php
class keywordCleaner  {
		public $pieces = array();
		public $exceptChars = array(',', '\'', '"', '&', '%', '$', '[', ']', '{', '}', '?', '<', '>', '/', '-', '_', '*', '#', '!', ';', ':', '=', '+', '(', ')');

		function kCleaner($keywordString){
		//remove the except characters
		for($k=0; $k<count($this->exceptChars); $k++){													  
			$keywordString = str_ireplace($this->exceptChars[$k], ' ', $keywordString);
		}

		function filter_bad_words($matches) {
		  $exceptWords = array('it'=>'', 'for'=>'', 'and'=>'', 'nor'=>'', 'but'=>'', 'or'=>'', 'yet'=>'', 'so'=>'', 'with'=>'', 'either'=>'', 'also'=>'', 'a'=>'', 'is'=>'', 'at'=>'', 'to'=>'', 'can'=>'', 'than'=>'', 'that'=>'', 'though'=>'', 'till'=>'', 'do'=>'', 'I'=>'', 'me'=>'', 'both'=>'', 'only'=>'', 'not'=>'', 'either'=>'', 'neither'=>'', 'if'=>'', 'as'=>'', 'by'=>'', 'the'=>'', 'in'=>'');
		  $replace = $exceptWords[$matches[0]];
		  return isset($replace) ? $replace : $matches[0];
		}
		//remove common words--the exceptwords
		$keywordString = preg_replace_callback('!\w+!', 'filter_bad_words', $keywordString);
		
		//turn the string into array of single words, then remove extra whitespace
		$this->pieces = array_map('trim',explode(" ",$keywordString));
		
		//remove any duplicate words
		$this->pieces = array_unique($this->pieces);
		
		//remove any empty values
		foreach($this->pieces as $key => $value) { 
		  if($value == '') { 
			unset($this->pieces[$key]); 
		  } 
		} 
		//make the keys chronological
		$this->pieces = array_values($this->pieces);
		
		//if after all of that pieces is empty then make it NULL
		if(count($this->pieces)==0){
			$this->pieces = NULL;
		}
	}
}

?>