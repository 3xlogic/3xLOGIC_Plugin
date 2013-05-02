/*!
 *  jQuery 3xLOGIC plugin 1.0
 * _3xLOGIX JavaScript API v1.0
 *
 * Tested with jQuery 1.7.2 and higher
 *
 * Copyright 2013 3xLOGIC
 * http://www.3xlogic.com
 *
 * Designed and built by carlos@3xlogic.com.
 * 
 *For help visit https://3xcloud.net/api
 */
(function($, window, document, undefined){

	var _3xcloudMethods = {
		init : function(options){
			
			options.camera-=1;
			var camera = options.camera;
			var self = this;
			
			var settings = $.extend({}, $._3xcloudSettings,options.settings);
			
			var conf = $.extend({}, $._3xcloudSettings.defaultConfig, options.config);
			
				
				 //Creating an inner container
				 var container = $("<div>").appendTo(this);
				 
				 $(container).css(
					{
						'width':'100%', 
						'height':'100%',
						'background-color':'black',
						'overflow':'hidden'
					});
				 
				 //Global version of the general Container
				 var base = $(container); 
				 
				 //Setting caption
				 var captionSettings = function()
				 {
				   if(conf.caption)
				   {
						  $.getJSON(settings.url + "info/?callback=?",
							   { 
									  key: settings.apiKey,
									  cam: camera,
							   },
							  function(data)
							   {
									//Camera Name;
									var label = $("<label>").text(data[0].name);
									base.css({'position':'relative'});
									
									$(label).appendTo(base);
									
									$(label).css(
									{
										'position':'absolute',
										'top':'0',
										'z-index':'2',
										'left':'0',
										'color':'white',
										'background-color':'black',
										'width':'100%',
										'text-align':'center',
										'opacity':'0.6'
									})
									.data('info',data[0]);
									
									//Checking user's Configurations
									if(conf.captionStyle)
									{
										$(label).css(conf.captionStyle);
									}
									
									if(conf.captionClass)
									{
										$(label).addClass(conf.captionClass);
									}
							   });
					}
				 }
				 
				  var getDimenssions = function()
				  {
					// Determine the dimenssion of the video container;
					if(conf.mobile){
						return "350x350";
					}else{
						return base.width() + "x" + base.height();
					}
				  }
				 
				 //Allow to change the camera dynamically from the _3xlogic.cam object
				 var getCamera = function(){
					if($(self).find("img").data()._3xlogic)
					{
						return $(self).find("img").data()._3xlogic.cam
					}else{
						return camera;
					}
				 }
				
				//Allow to stop the streaming dynamically				 
				 var allowStream = function(){
					if($(self).find("img").data()._3xlogic)
					{
						if(!$(self).find("img").data()._3xlogic.stream)
						{
							return false;
						}
					}
				 }
				 
				 var getSrc = function()
				 {
					var rdn = Math.floor(Math.random() * 1000000000000);
					var camData = getCamera();
					var src = settings.url        + 
							  "video/?key="  + 
							  settings.apiKey     + 
							  "&cam="             +
							  camData;
				
					src += "&resolution="   + 
						   getDimenssions() + 
						   "&"              + 
						   rdn;
				
					return src;
				}
				
				 //Adding video to container
				 var createImage  = function()
								   {
									   var video = $("<img src='" + getSrc() + "'>")
												  //Saving basic info into the img object	
												   .data('_3xlogic',
												   {
													 url: settings.url 		  + 
														  "video/?key="  +
														  settings.apiKey     + 
														  "&cam="             + 
														  camera,
												   cam: camera,
												   config: conf,
												   setting: settings,
												   stream: true
												   });
																	   
									   return video;
								   }
				 
				 var addUpdates = function()
				 {
					 base.find("img").bind('load', 
						function()
						{
							if(base.find("img").data()._3xlogic)
							{
								if(!base.find("img").data()._3xlogic.stream)
								{
									return false;
								}
							}
							$(this).attr("src", getSrc());
					 
						   //Adjusting Height and Width
							 if(!conf.ratio)
							 {
								 //Displaying panoramic video
								  var result = $(this).width() / $(this).height();
								  
									if(result < 7 && result > 2)//Video is panoramic
									{
										  $(this).attr('width','100%')
			  
										  if($(this).height() > base.height())
										  {
											   $(this).css({'height': base.height() + "px"});
										  }
										  
									   $(this).css("margin-top", ( base.height() - $(this).height() ) / 2 + base.scrollTop() + "px");
									   
									   $(this).css("margin-left", ( base.width() - $(this).width() ) / 2 + base.scrollLeft() + "px");
			
									}else{ //Video is not panoramix
										
									   $(this).css({
													  'width':'100%',
													  'height':'100%'
												  });							
									}
									
						   }else{ //Video keeping aspect ration
							
							  if($(this).height() > base.height())
							  {
								 $(this).css({'height': base.height() + "px"});
							  }

							  if($(this).width() > base.width())
							  {
								 $(this).css({'width': base.width() + "px"});
							  }
								 
							 $(this).css("margin-top", ( base.height() - $(this).height() ) / 2 + base.scrollTop() + "px");
							 
							 $(this).css("margin-left", ( base.width() - $(this).width() ) / 2 + base.scrollLeft() + "px");

							 var result = $(this).width() / $(this).height();
							
							//Displaying panoramic video
							if(result < 7 && result > 2)
							{
								$(this).attr('width','100%')
							}
						 }
					 });
				 }
							 
				 var loader = $("<img src='"+ settings.url +"img/3xloader.png'/>").css({'width':'100%','height':'100%'});
				 $(base).html(loader)
						.delay(1000)
						.queue(
							function()
							{
								$(this).html(createImage()); 
								addUpdates(); 
								captionSettings();
							});
				 
				return this; 
		},
		update: function(camera){
			camera-=1;
			// 3xcloud load new images based on the _3xlogic.cam data object
			//	in order to change images dynamically just update the _3xlogic.cam value 
			var object = $(this).find("img").data()._3xlogic;
			var self = this;
			$(this).find("img").fadeOut(100);
			object.cam = camera;
			
			if(object.config.caption){
				$(self).find("label").hide();
				$.getJSON(object.setting.url + "info/?callback=?",
				{ 
				  key: object.setting.apiKey,
				  cam: camera,
				},
				function(data)
				{
					//Camera Name;
					$(self).find("label").show();
					$(self).find("label").text(data[0].name);
			   });
			}
			
			var h = $(this).height();
			var w = $(this).width();
			var src = object.setting.url + "video/?key=" + object.setting.apiKey + "&cam=" + camera + "&resolution=" + w + "x" + h;
			$(this).find("img").attr("src",src);
			$(this).find("img").one('load',function(){
				$(this).fadeIn(100);
			});
			return this;
		},
		pause : function(){
			$(this).find("img").data()._3xlogic.stream = false;
			return this;
		},
		resume: function(){
			var object = $(this).find("img").data()._3xlogic;
			var src = object.url + "&resolution=" + $(this).parent().width() + "x" + $(this).parent().height();
			object.stream = true;
			$(this).find("img").attr("src", src);
			return this;
		},
		snapshot: function(){
			var object = $(this).find("img").data()._3xlogic;
			var camera = object.cam;
			var src = object.setting.url + "snapshot/?key=" + object.setting.apiKey + "&cam=" + camera + "&resolution=fullsize";
			open(src,"_blank");
			return this;
		},
		slideshow: function(options){
			if(typeof options === 'object' || typeof options === 'undefined'){
			
					var setting = $.extend({},$._3xcloudSettings.slideShowDefault, options);
					var self = this;
					var cams = Array();
			
				$(this).data('slideshow',{camera:0,run:true});
				$(this).css("overflow","hidden");
				var slideObject = $(this).data().slideshow;
				
				if(setting.cameras.length < 1)
				{
					return this;
				}
				//Create container for each camera
				for(var i = 0; i < setting.cameras.length; i++){
					cams[i] = $("<div>");
					var current = setting.cameras[i];
					cams[i]._3xcloud({camera:current});
					cams[i].hide();
					cams[i].appendTo(self);
					//if(i!=0){cams[i]._3xcloud('pause');}
				}
				/*var currentCamera = setting.cameras[0];
				$(this)._3xcloud({camera:currentCamera});*/
						
				var getNextCamera = function(){
					var nextTemp = slideObject.camera+1;
					if(nextTemp > setting.cameras.length-1)
					{
						slideObject.camera = 0;
						return 0;//setting.cameras[0];
					}else{
						slideObject.camera = nextTemp;
						return nextTemp;//setting.cameras[nextTemp];
					}
				}
				
				var pauseAllCameras = function(){
					for(var o = 0; o < cams.length; o++)
					{
						cams[o]._3xcloud('pause');
						cams[o].hide();
					}
				}
				
				//pauseAllCameras();
				//cams[0]._3xcloud('resume');
				cams[0].show();
				
				
				var getPrevCamera = function(){
					var prevTemp = slideObject.camera-1;
					if(prevTemp < 0){
						slideObject.camera = setting.cameras.length-1;
						return slideObject.camera;//setting.cameras[slideObject.camera];
					}else{
						slideObject.camera = prevTemp;
						return prevTemp;//setting.cameras[prevTemp];
					}
				}
				
				var goBack = function(){
						var current = slideObject.camera;
  						var prev = getPrevCamera();
						cams[current].hide();
						cams[prev].show();
				}
				
				var goForward = function(){
					var current = slideObject.camera;
					var next = getNextCamera();
					cams[current].hide();
					cams[next].show();
				}
				
				if(options.showMenu)
				{
					$(this).css("position","relative");
					var rightBtn = $("<a>").text(">").css({
						"position":"absolute",
						"top":"50%",
						"width":"30px",
						"height":"30px",
						"margin-top":"-30px",
						"right":"15px",
						"font-size":"40px",
						"font-weight":"100",
						"line-height":"30px",
						"color":"white",	
						"text-align":"center",
						"border":"3px solid white",
						"border-radius":"23px",
						"-webkit-border-radius":"23px",
						"-moz-border-radius":"23px",
						"background":"#222",
						"opacity":"0.5",
						"filter":"alpha(opacity=50)",
						"text-decoration":"none",
						"font-family":"Arial, sans-serif",
						"cursor":"pointer"
						
					}).bind('click',function(){
						//$(self)._3xcloud('update', getNextCamera());
						goForward();
					}).hover(function(){
						$(this).css({'opacity':'0.9'});
					},
					function(){
						$(this).css({'opacity':'0.5'});
					});
					var leftBtn = $("<a>").text("<").css({
						"position":"absolute",
						"top":"50%",
						"width":"30px",
						"height":"30px",
						"margin-top":"-30px",
						"left":"15px",
						"font-size":"40px",
						"font-weight":"100",
						"line-height":"30px",
						"color":"white",	
						"text-align":"center",
						"border":"3px solid white",
						"border-radius":"23px",
						"-webkit-border-radius":"23px",
						"-moz-border-radius":"23px",
						"background":"#222",
						"opacity":"0.5",
						"filter":"alpha(opacity=50)",
						"text-decoration":"none",
						"font-family":"Arial, sans-serif",
						"cursor":"pointer"
						
					}).bind('click',function(){
						//$(self)._3xcloud('update', getPrevCamera());
						//pauseAllCameras();
						goBack();
					}).hover(function(){
						$(this).css({'opacity':'0.9'});
					},
					function(){
						$(this).css({'opacity':'0.5'});
					});
					leftBtn.appendTo(this);
					rightBtn.appendTo(this);
				}
					if(setting.autoRun){
						setInterval(function(){
							var object = $(self).data().slideshow;
							if(slideObject.run){
								//$(self)._3xcloud('update', getNextCamera());
								goForward();
							}
						}, setting.interval);
					}
				
			}else if(typeof options === 'string'){
				if(options == "pause")
				{
					$(this).data().slideshow.run = false;
				}else if(options == "resume"){
					$(this).data().slideshow.run = true;
				}else if(options == "active"){
					return $(this).data().slideshow.camera;
				}else{
					$.error("The 3xcloud slideshow does not have a method called " + options);
				}
			}
				return this;
		}
	};
	
	
	$._3xcloudSettings = {
		company:"3xlogic",
		apiKey:'',
		url:'https://3xcloud.net/webclient/api/1.0/',
		port:'443',
		slideShowDefault:{
			cameras:[],
			autoRun:false,
			interval:8000,
			showMenu:false,
			changeOn:'click'
		},
		defaultConfig:{
			caption:false,
			ratio:false,
			captionStyle:null,
			captionClass:null,
			preload:true,
			mobile:false
		}
	}
	
	//Allow user to predefine settings
	$._3xcloudInfo = function(options){
		var settings = $.extend({},
			$._3xcloudSettings,
			options);
		$._3xcloudSettings = settings;
	}
	
	$.fn._3xcloud = function( method ){
		if(_3xcloudMethods[method]){
			return _3xcloudMethods[method].apply(this, Array.prototype.slice.call(arguments,1));
		}else if(typeof method === 'object' || ! method){
			return _3xcloudMethods.init.apply( this, arguments );
		}else{
			$.error( 'Method ' + method + ' does not exist on jQuery._3xcloud');
		}
	 }
	 
 })(jQuery);