Getting started with 3xCLOUD Plugin
====================================

Link files
Add these items to the <head> of your document. This will link jQuery and the 3xCLOUD plugin into your webpage.
<!-- Place somewhere in the <head> of your document -->
<script src=" https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js "></script>
<script src="https://3xcloud.net/webclient/repo/jquery.3xlogic.0.1.3.js"></script>

Add Markup
The 3xCLOUD markup is simple and straightforward. All the cameras associated with the API Key will be contain in a div element (<div id=’camera1’></div>) with a unique id identifier, in this case the id is “camera1”. Because we associated two cameras to the API Key, this example will add two div elements to the body on the page.
<!-- Place somewhere in the <body> of your page -->
<div id=’camera1’></div>
<div id=’camera2’></div>

The web developer can customize the div container with any CSS style he or she desires, for this example we are going to configure the div with the ids “camera1 and camera2” to be 300x300.
<!-- Place somewhere in the <head> of your page -->
#camera1, #camera2 {
	width: 300px;
	height: 300px;
}

Hook up to 3xCLOUD
Create a configuration object adding the API Key using a method “apiKey”.
var config = {
	apiKey: “MyAPIKey”
}  
3xCLOUD plugin associate cameras by number, because we have to cameras associated with the API Key “MyAPIKey” the first camera is identified with the number 1 and the second camera is identified with the number 2. The following example will put all the concepts together.
<!—Place in the <head>, after the three links and inside $(document).ready() -->
<script type=”text/javascript”>
$(document).ready(function(){
$(“#camera1”)._3xcloud(config, 1);
$(“#camera2”)._3xcloud(config, 2);
});
</script>

Adapt to your needs
Listed below are all of the options available to customize 3xCLOUD to suite your needs, along with their default values. 
The configuration Object
apiKey: “YourAPIKey”
port: 80
url: “https://3xcloud.net/webclient”

Example:
var config = {
	apiKey: “MyAPIKey”,
	port: 443,
	url: “https://3xcloud.net/webclient”
}  
3xCLOUD Options
caption: false  //Display the camera name on the top left corner (Customizable )
Example:
$(“#camera1”)._3xcloud(config, 1, { caption: true });

ratio: false   //If set to true, it will keep the aspect ratio of the camera, otherwise is set to 100% width and height.
Example:
$(“#camera1”)._3xcloud(config, 1, { ratio: true});

captionStyle: null   //Use to change the looks of the camera’s caption. To use this setting caption must be set to true.
Example:
$(“#camera1”)._3xcloud(config, 1, { caption: true, captionStyle: {“color”:”red”} });

captionClass: null  //User to associate a CSS class to the camera’s caption
Example:
<style>
.myClass {
	Color: #FF0000;
}
</style>
$(“#camera1”)._3xcloud(config, 1, { caption: true, captionClass: “myClass” });


Live Demo
To get familiar with 3xCLOUD plugin you can test and modify the code at http://jsfiddle.net/3xlogic/69kVC/13/

Source Code
If you want to improve 3xCLOUD to suite the need of your project, you can download the uncompressed version at  
