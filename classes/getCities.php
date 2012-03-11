<?
include_once('../classes/getStates.php');
class getCities extends getStates{
	
	public $stateID;
	public $state;
	public $cities = array();
	public $fc = 0;
	public $statePageInfo = array();

	public function gCities(){
		
		if(isset($_REQUEST['state']) && $_REQUEST['state']!='null'){
		$this->state = $_REQUEST['state'];
		for($i=0; $i<52; $i++){
			if($this->states[$i][1]==$this->state){
				$this->stateID = $this->states[$i][0];
				$this->state = $this->states[$i][1];
				break;
			}else{
				$this->stateID='X10'; // state not found on database trigger redirect
			}
		}
		}else if(isset($_REQUEST['chosenStateID']) && $_REQUEST['chosenStateID']!='null'){
			$this->stateID = $_REQUEST['chosenStateID'];
			for($i=0; $i<52; $i++){
			if($this->states[$i][0]==$this->stateID){
				$this->stateID = $this->states[$i][0];
				$this->state = $this->states[$i][1];
				break;
			}else{
				$this->stateID='X10'; // state not found on database trigger redirect
			}
		}
		}
		
		if(ctype_digit($this->stateID)){//make sure all of these are numbers
				$fetchCities = mysql_query("SELECT * FROM barter_cities WHERE state_id = $this->stateID");
					while($fetchCitiesArray = mysql_fetch_array($fetchCities, MYSQL_NUM)){
							$this->cities[$this->fc][0] = $fetchCitiesArray[0];
							$this->cities[$this->fc][1] = $fetchCitiesArray[2];
							$this->cities[$this->fc][2] = $fetchCitiesArray[3];
							$this->fc++;
					}
					
				if($this->stateID!='X10'){
					for($i=0; $i<=count($this->cities); $i++){
					$this->statePageInfo[$i][0] = $this->stateID;//stateID
					$this->statePageInfo[$i][1] = $this->state;//stateNameAlt
					$this->statePageInfo[$i][2] = $this->cities[$i][0];//cityID
					$this->statePageInfo[$i][3] = $this->cities[$i][1];//cityNameAlt
					$this->statePageInfo[$i][4] = $this->cities[$i][2];//coords
					}
				}else{
					$this->statePageInfo[0][0]='X10';// state not found on databsae trigger redirect
				}
		}else{
			die('X10');//vars are not numeric, kill it
		}//confirm numeric

	}

}

?>