<?
class getStates {
	
	public $sendBack=false;
	public $states = array();
	public $fs=0;
	
		function __construct(){
							   
		$fetchStates = mysql_query("SELECT * FROM barter_states");
			while($fetchStatesArray = mysql_fetch_array($fetchStates, MYSQL_NUM)){
					$this->states[$this->fs][0] = $fetchStatesArray[0];
					$this->states[$this->fs][1] = $fetchStatesArray[1]; //as Alt
					$this->fs++;
			}
		}		
}
?>