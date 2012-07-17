/*!
 *  jQuery 3xLOGIC plugin 0.1.3
 * _3xLOGIX JavaScript API v0.0.4
 *
 * Tested with jQuery 1.7.2
 *
 * Copyright 2012 3xLOGIC
 * http://www.3xlogic.com
 *
 * Designed and built by @carlos.
 */
(function($, window, document, undefined){
	 
	 $.fn._3xlogic = function(options, camera, config)
	 {
		 camera -=1;
		 
		 var conf = $.extend({}, $.fn._3xlogic.defaultOptions, config);
		 
		 var settings = $.extend({
			 url:'mydvr.com',
			 port: '5555',
			 apiKey: 'apiKeygoeshere',
			 
	 	 },options);
		 
		 
		 //Creating an inner container
		 var container = $("<div>").appendTo(this);
		 $(container).css({'width':'100%', 'height':'100%','background-color':'black'});
		 
		 var base = $(container);
		 
		 //Setting caption
		 var captionSettings = function(){
		   if(conf.caption)
		   {
			      $.ajax({
					   url: settings.url + "/api/info/",
					   type:'GET',
					   data:{ 
							  key: settings.apiKey,
							  cam: camera,
							  callback:''
					   },
					   dataType:"json",
					   success: function(data)
					   {
								  //console.log(data[0].name);
								  var label = $("<label>").text(data[0].name);
								  
								  base.css({'position':'relative'});
								  
								  $(label).appendTo(base);
								  
								  $(label).css({'position':'absolute','top':'0','z-index':'2','left':'0','color':'white'})
								  .data('info',data[0]);
								  
								  if(conf.captionStyle){
									  $(label).css(conf.captionStyle);
								  }
								  
								  if(conf.captionClass){
									  $(label).addClass(conf.captionClass);
								  }
					   },
					   error: function(data){
						   //console.log("Error");
						   //console.log(data[0]);
					   }
				  });
		   }
		 }
		 
		  var getDimenssions = function(){
			// console.log(base.width() + "x" + base.height());
			 return base.width() + "x" + base.height();
		  }
		 
		 var getSrc = function(){
			var rdn = Math.floor(Math.random() * 1000000000000);
			var src = settings.url + "/api/video/?key="+ settings.apiKey + "&cam=" + camera;
			src= src + "&resolution=" + getDimenssions() + "&" + rdn;
			return src;
		}
		
		
		 
		 //Adding video to container
		 var createImage  = function(){
			 var video = $("<img src='" + getSrc() + "'>")
			 			  .data('_3xlogic',{
							                 url: settings.url + "/api/video/?key="+ settings.apiKey + "&cam=" + camera,
											 cam: camera
											 });
											 
			 return video;
		 }
		 
		 var addUpdates = function(){
				
				 base.find("img").bind('load', function(){
				 $(this).attr("src", getSrc());
			 
				 //Adjusting Height and Width
				 if(!conf.ratio){
					 //Displaying panoramic video
					  var result = $(this).width() / $(this).height();
						if(result < 7 && result > 2)
						{
							$(this).attr('width','100%')

							if($(this).height() > base.height())
							{
								 $(this).css({'height': base.height() + "px"});
						 	}
							
						 $(this).css("margin-top", ( base.height() - $(this).height() ) / 2+base.scrollTop() + "px");
						 $(this).css("margin-left", ( base.width() - $(this).width() ) / 2+base.scrollLeft() + "px");

						}else{
								$(this).css({'width':'100%','height':'100%'});							
						}
					 

				 }else{
					 
						 if($(this).height() > base.height()){
							 $(this).css({'height': base.height() + "px"});
						 }
						 
						 if($(this).width() > base.width()){
							 $(this).css({'width': base.width() + "px"});
						 }
						 
						 $(this).css("margin-top", ( base.height() - $(this).height() ) / 2+base.scrollTop() + "px");
						 $(this).css("margin-left", ( base.width() - $(this).width() ) / 2+base.scrollLeft() + "px");
						  var result = $(this).width() / $(this).height();
					
						//Displaying panoramic video
						if(result < 7 && result > 2)
							{
								$(this).attr('width','100%')
							}
				 }
			 });
		 }
		 			 
		 var loader = $("<img src='"+ settings.url +"/resources/img/3xloader.png'/>")
		 			   .css({'width':'100%','height':'100%'});
					   
		 $(base).html(loader).delay(1000).queue(function()
		 											{
														$(this).html(createImage()); 
														addUpdates(); 
														captionSettings();
												});
		 
			return this; 
	 	}
	 
	 $.fn._3xlogic.defaultOptions = {
		 caption:false,
		 ratio:false,
		 captionStyle:null,
		 captionClass:null
	 }
	 
 })(jQuery);