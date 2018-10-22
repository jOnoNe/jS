<?php
	
	//EMAIL VALIDATION
	function validateEmail($value){
		return preg_match('/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/', $value);
	}
	
	//CHECK VARIABLES (EMPTY/NULL OR DEFAULT)
	if ( isset($_POST['name']) && $_POST['name']!="" && isset($_POST['email']) && $_POST['email']!="" && isset($_POST['message']) && $_POST['message']!="" ) {
		
		//CHECK EMAIL	
		if ( validateEmail( strtolower($_POST['email']) ) ) {

			//CHECK LEGAL
			if ( isset($_POST['privacy']) ) {





					//////////////////  EDIT THESE VALUES ////////////////////
				
					//DESTINATION EMAIL (THE EMAIL WHERE YOU WANT TO RECEIVE THE FORM)
					$destination="destination-email@domain.com";

					//SENDER EMAIL
					//FOR SECURITY REASONS, IT'S BETTER IF YOU SEND THE EMAIL
					//FROM AN ACCOUNT FROM THE SAME DOMAIN WHERE THE SITE IS HOSTED
					$mailFrom="name@yourdomain.com";
					
					//SET EMAIL SUBJECT
					$subject="New message from your company site form";

					//////////////////  STOP EDITING ////////////////////





					//REPLY-TO EMAIL
					$replyTo=$_POST['email'];

					//MESSAGE DATA (HTML FORMATTED)
					$mailMessage.="<dt><strong>Name: </strong></dt><dd>".$_POST['name']."</dd>";
					$mailMessage.="<dt><strong>E-mail: </strong></dt><dd>".$_POST['email']."</dd>";
					$mailMessage.="<dt><strong>Message: </strong></dt><dd>".$_POST['message']."</dd>";
					
					//HEADER DATA
					$mailHeader="From:".$mailFrom."\nReply-To:".$_POST['name']."<".$replyTo.">\n"; 
					$mailHeader=$mailHeader."X-Mailer:PHP/".phpversion()."\n"; 
					$mailHeader=$mailHeader."Mime-Version: 1.0\n"; 
					$mailHeader=$mailHeader."Content-Type: text/html";

					
				if ( mail($destination,$subject,$mailMessage,$mailHeader) ) {
					echo 'Form succesfully sent!';
				}
				else echo 'Server error: please, try again.'; //SERVER ERROR

			}
			else echo 'Error: you must agree with privacy terms'; //LEGAL CHECKBOX ERROR
				
		}	
		else echo 'Error: non valid Email';	//EMAIL VALIDATION ERROR
		
	}
	else echo 'Error: missing fields'; //VARS ERROR		

?>