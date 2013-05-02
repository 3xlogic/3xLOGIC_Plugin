# Getting started with 3xCLOUD Plugin

### Link files

Add these items to the <head> of your document. This will link jQuery and the 3xCLOUD plugin into your webpage.

```js
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script src="https://3xcloud.net/webclient/repo/jquery.3xlogic.min.1.0.js"></script>
```

### Add Markup

The 3xCLOUD markup is simple and straightforward. All the cameras associated with the API Key will be contain in a div element (<div id=’camera1’></div>) with a unique id identifier, in this case the id is “camera1”. Because we associated two cameras to the API Key, this example will add two div elements to the body on the page.

```html
<div id=’camera1’></div>
<div id=’camera2’></div>
```

```css
#camera1, #camera2 {
width: 300px;
height: 300px;
}
```

###  Hook up to 3xCLOUD

Create a configuration object adding the API Key using a method “apiKey”.

```js
$._3xcloudInfo({
    apiKey:"apidemokey",
    defaultConfig:{
        caption:true
    }
});
```

3xCLOUD plugin associate cameras by number, because we have to cameras associated with the API Key “MyAPIKey” the first camera is identified with the number 1 and the second camera is identified with the number 2. 

	The following example will put all the concepts together.
	
```js
//Override default configurations
$("#camera1")._3xcloud({camera:2, config:{caption:true}});
 
//Create slideshow in one line of code
$("#camera2")._3xcloud('slideshow',{cameras:[2,3,4],showMenu:true});
```

### Live Demo

If you want to further use 3xCLOUD to individualize your particular project, you can download the 
uncompressed version at:

http://jsbin.com/egujom/11/edit

http://jsfiddle.net/3xlogic/69kVC/53/


For more information about 3xCLOUD plugin, please visit https://3xcloud.net/api