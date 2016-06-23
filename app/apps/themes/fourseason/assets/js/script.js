(function($) {
  "use strict";
jQuery(document).ready(function(){
	
	var show_menu = false;
	var toggle = true;

	//show top bar
	jQuery('#top-bar-open').click(function(){
		jQuery(this).parent().find('#top-bar').slideToggle();
	});

	//add icon to woo cart button

	jQuery('.add_to_cart_button').html('<i class="fa fa-shopping-cart"></i>');
	jQuery('.yith-wcqv-button').html('<i class="fa fa-search"></i>');

	jQuery('.add_to_cart_button').addClass('add_to_cart_button_hover');
	jQuery('.yith-wcqv-button').addClass('yith-wcqv-button-hover');

	jQuery('#yith-quick-view-content').addClass('content');

	
	
	//highlight current mega menu
	var mega_menu_item = jQuery('.mega-menu-item-has-children').find('.mega-sub-menu').find('.current-menu-item');
	console.log(mega_menu_item);
	if(mega_menu_item.length > 0){
		var abc = mega_menu_item.parent().parent().parent().parent().parent().addClass('mega-current-menu-ancestor');
	}
	
	//show toggle menu
	jQuery('#toggle-menu-button').click(function(){
		jQuery(this).parent().find('.toggle-menu').slideToggle(200);
	});
	
	jQuery(window).resize(function(){
		var windows_height = jQuery(this).outerWidth();
		if(windows_height > 740){
			jQuery('.toggle-menu').fadeOut(200);
		}
	});
	
	
	
	jQuery('.widget_archive, .widget_categories, .widget_pages, .widget_meta, .widget_recent_entries, .widget_nav_menu').find('li a').prepend('<i class="fa fa-angle-right"><i>');
	
	jQuery('.widget_recent_comments').find('li').prepend('<i class="fa fa-angle-right"><i>');
		
	jQuery('.portfolio-filter-container').isotope({
		// options
		itemSelector : '.portfolio_filter_item',
		layoutMode : 'fitRows',
	});
	
	jQuery(window).scroll(function() {
		jQuery('.portfolio-filter-container').isotope('reLayout');
	});
	
	setTimeout(function(){
		jQuery('.portfolio-filter-container').isotope('reLayout');
	},1000)
	
	/* filter */
	jQuery('.filters span').click(function(){
		var selector = jQuery(this).attr('data-filter');
		var parent = jQuery(this).parent().parent().parent().parent().parent();
		jQuery(parent).find('.portfolio-filter-container').isotope({ filter: selector });
		jQuery(this).parent().parent().find('span').removeClass('active');
		jQuery(this).addClass('active');
		return false;
	});
	
	
	//Hide information box
	jQuery('.info-box-hide').click(function() {
		jQuery(this).parent().parent().fadeOut();
	});
	
	//ACCORDION
	jQuery('.accordion').accordion({
		header: '.accor-title',
		heightStyle: 'content',
		active  : false,
		collapsible : true,
		create: function( event, ui ) {
			jQuery(this).find('.ui-state-active').find('.accor-title-icon').html('<i class="fa fa-angle-down"></i>');
			
			var this_collapsible = jQuery(this).data('collapsible');
			if(this_collapsible == 0){
				jQuery(this).accordion( "option", "collapsible", false );
			}else{
				jQuery(this).accordion( "option", "collapsible", true );
			}
			
			var this_active = parseInt(jQuery(this).data('active'));
			if(this_active == 0){
				jQuery(this).accordion( "option", "collapsible", true );
				jQuery(this).accordion( "option", "active", false );
			}else{
				this_active = this_active - 1;
				jQuery(this).accordion( "option", "active", this_active );
			}
			
			
			
		},
		beforeActivate: function( event, ui ) {
			ui.newHeader.find('.accor-title-icon').html('<i class="fa fa-angle-up"></i>');
			ui.oldHeader.find('.accor-title-icon').html('<i class="fa fa-angle-down"></i>');
		}
	});
	
	//TAB
	jQuery('.tab-title').click(function(){
		var tab_id = jQuery(this).find('.tab-id').html();
		var parent_top = jQuery(this).parent();
		var parent_tab = jQuery(parent_top).parent();
		jQuery(parent_top).find('.tab-current').removeClass("tab-current");
		jQuery(this).addClass("tab-current");
		jQuery(parent_tab).find('.tab-content').hide();
		jQuery(parent_tab).find('.tab-content'+tab_id).fadeIn();
	});
	
	jQuery('.tab-vertical-title').click(function(){
		var tab_id = jQuery(this).find('.tab-vertical-id').html();
		var parent_top = jQuery(this).parent();
		var parent_tab = jQuery(parent_top).parent();
		jQuery(parent_top).find('.tab-vertical-current').removeClass("tab-vertical-current");
		jQuery(this).addClass("tab-vertical-current");
		jQuery(parent_tab).find('.tab-vertical-content').hide();
		jQuery(parent_tab).find('.tab-vertical-content'+tab_id).fadeIn();
	});
	
	jQuery('.process_container_3 .process-item').click(function(){
		var tab_id = jQuery(this).find('.process-tab-id').html();
		var parent_tab = jQuery(this).parent().parent().parent();
		jQuery(parent_tab).find('.process-content').removeClass('process_content_active');
		jQuery(parent_tab).find('.process-content-'+tab_id).addClass('process_content_active');
		jQuery(parent_tab).find('.process-item').removeClass('process_active');
		jQuery(parent_tab).find('.process-item').parent().removeClass('process_active');
		
		for(var i = 1; i <= tab_id; i++){
			jQuery('.process-tab-'+i).addClass('process_active');
			jQuery('.process-tab-'+i).parent().addClass('process_active');
		}
	});
	
	//TESTIMONIALS
	jQuery('.testimonials-button-item').click(function(){
		var root = jQuery(this).parent().parent();
		jQuery(root).find('.testimonials-button-item').removeClass('active');
		jQuery(this).addClass('active');
		var next_id = jQuery(this).data('id');
		
		jQuery(root).find('.testimonials-each').each(function(){
			var this_id = parseInt( jQuery(this).find('.testimonials-id').html() );
			if( this_id == next_id){
				jQuery(this).fadeIn(1000);
			}else{
				jQuery(this).hide();
			}
		});
	});
	
	
	jQuery('#back_top').click(function(){
		jQuery('html, body').animate({scrollTop:0}, 'normal');
		return false;
	});
	

	
	jQuery(window).scroll(function() {
		if(jQuery(this).scrollTop() !== 0) {
			jQuery('#back_top').fadeIn();	
		} else {
			jQuery('#back_top').fadeOut();
		}
	});
	
	if(jQuery(window).scrollTop() !== 0) {
		jQuery('#back_top').show();	
	} else {
		jQuery('#back_top').hide();
	}
	
	//magnific-popup
	jQuery(".gallery").each(function(){
		jQuery(this).find("[rel^='magnific-popup']").magnificPopup({
			type: 'image',
			gallery: {
				enabled: true
			}
		});
	});
	
	//play all slider
	jQuery('.flexslider').flexslider({
		controlNav: false,                    
		directionNav: true,
		animation : 'fade',
		slideshowSpeed :5000 ,	
	});
	
	jQuery('.info-box-remove').click(function(){
		jQuery(this).parent().hide();
	});

	//add flexslider icon
	jQuery('.flex-prev').html('<i class="fa fa-angle-left"></i>');
	jQuery('.flex-next').html('<i class="fa fa-angle-right"></i>');
	
	jQuery('.gallery-thumb').each(function(){
		//save the original width
		jQuery(this).attr('data-width',jQuery(this).width());
		
		var gallery_main = jQuery(this).find('.gallery-thumb-main');
		
		//set height of first image
		jQuery('.gallery-main0').find('img').load(function() {	
			var this_gallery_height = jQuery(this).height();
			jQuery(this).parent().parent().attr('data-height',this_gallery_height);
			jQuery(this).parent().parent().height(this_gallery_height);
			
			jQuery(gallery_main).css('opacity',1);
			jQuery(gallery_main).css('height',this_gallery_height);
		});
	});
	
	jQuery(window).resize(function(){
		jQuery('.gallery-thumb').each(function(){
			//set new width
			var original_width = jQuery(this).attr('data-width');
			var new_width = jQuery(this).width();
			jQuery(this).attr('data-width',new_width);
			
			//update new height of each main image
			jQuery(this).find('.gallery-thumb-each').each(function(){
				var current_height = jQuery(this).attr('data-height');
				var new_height = Math.round(current_height*new_width/original_width);
				jQuery(this).attr('data-height',new_height);
			});
			
			//set new height for main image and container
			var current_gallery = jQuery(this).find('.gallery-current');
			var current_height = jQuery(current_gallery).attr('data-height');
			jQuery(this).find('.gallery-thumb-main').animate({
				height: current_height,
			}, 500);
			jQuery(current_gallery).height(current_height);
		});
	});
	
	//gallery with thumb
	jQuery('.gallery-thumb-border').click(function(){
		var number 						= jQuery(this).data('number');
		var the_gallery 				= jQuery(this).parent().parent().parent();
		var gallery_main 				= jQuery(the_gallery).find('.gallery-thumb-main');
		var gallery_current 			= jQuery(gallery_main).find('.gallery-current');
		var gallery_new					= jQuery(gallery_main).find('.gallery-main'+number);
		
		var gallery_changing 			= jQuery(the_gallery).attr('data-changing');
		
		if(gallery_changing == 'no'){
			jQuery(the_gallery).attr('data-changing','yes');
			
			//check if click on current gallery
			if(jQuery(gallery_new).hasClass('gallery-current')){
				jQuery(the_gallery).attr('data-changing','no');
			}else{
				//hide current gallery
				jQuery(gallery_current).height(0);
				
				jQuery(gallery_current).removeClass('gallery-current');
				
				//change current gallery to new gallery
				jQuery(gallery_new).addClass('gallery-current');
				
				//if not set height
				var new_height = parseInt(jQuery(gallery_new).attr('data-height'));
				if(new_height == 0){
					new_height = jQuery(gallery_new).find('img').height();
					jQuery(gallery_new).attr('data-height',new_height);
					jQuery(gallery_new).height(new_height);
				}else{
					jQuery(gallery_new).height(new_height);
				}
					
				//animate it
				jQuery(gallery_main).css('opacity',0);
				jQuery(gallery_main).animate({
					height: new_height,
					opacity:1,
				}, 500,function(){
					jQuery(the_gallery).attr('data-changing','no');
				});
			}
		}
	});
	
	jQuery('.gallery-image-bg').click(function(){
		jQuery(this).parent().find('.gallery-image-icon').show();
	});
	
	jQuery('.live_change_open').click(function(){
		if(jQuery('.live_change').hasClass('live_change_move') ){
			jQuery('.live_change').removeClass('live_change_move');
		}else{
			jQuery('.live_change').addClass('live_change_move');
		}
	});
	
	jQuery('.color-scheme').click(function(){
		var color = jQuery(this).data('color');
		jQuery('#live_color').val(color);
		jQuery('.color-scheme').removeClass('selected-color');
		jQuery(this).addClass('selected-color');
	});
	
	jQuery('.blockquote-container').each(function(){
		jQuery(this).append('<i class="fa fa-quote-right"></i>');
	});
		
	//Pie Chart

	jQuery('.progress-canvas').each(function(){
		if (this.getContext) {
			var context = this.getContext('2d');
				
			this.width = 100;
			this.height = 100;
			var radius = 44;
			
			var centerX = this.width / 2;
			var centerY = this.height / 2;
			var percent = jQuery(this).data('percent'); 
			var color   = jQuery(this).data('color'); 

			context.beginPath();
			context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
			context.lineWidth = 8;
			context.strokeStyle = '#e9e9e9';
			context.stroke();
			var context2 = this.getContext('2d');
			context2.beginPath();
			context2.arc(centerX, centerY, radius, 1.5 * Math.PI , ((percent / 50) + 1.5) * Math.PI, false);
			context2.lineWidth = 8;
			context2.strokeStyle = color;
			context2.stroke();
		}
    });
});	

})(jQuery);

