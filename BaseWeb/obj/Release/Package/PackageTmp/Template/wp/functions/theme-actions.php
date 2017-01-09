<?php
$options = get_option('truepixel');	

/*------------[ Meta ]-------------*/
if ( ! function_exists( 'mts_meta' ) ) {
	function mts_meta() { 
	global $options
?>
<?php if ($options['mts_favicon'] != '') { ?>
<link rel="icon" href="<?php echo $options['mts_favicon']; ?>" type="image/x-icon" />
<?php } ?>
<!--iOS/android/handheld specific -->	
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<?php }
}

/*------------[ Head ]-------------*/
if ( ! function_exists( 'mts_head' ) ) {
	function mts_head() { 
	global $options
?>
<!--start fonts-->
<?php if ($options['mts_title_font'] == 'Arial') { ?>
<?php } else { ?>
<?php if ($options['mts_title_font'] != '' || $options['mts_google_title_font'] != '') { ?>
<link href="http://fonts.googleapis.com/css?family=<?php if ($options['mts_google_title_font'] != '') { ?><?php echo $options['mts_google_title_font']; ?><?php } else { ?><?php echo $options['mts_title_font']; ?><?php } ?>:400,700" rel="stylesheet" type="text/css">
<style type="text/css">
h1,h2,h3,h4,h5,h6, .total-comments, #header_area { font-family: '<?php if ($options['mts_google_title_font'] != '') { ?><?php echo $options['mts_google_title_font']; ?><?php } else { ?><?php echo $options['mts_title_font']; ?><?php } ?>', sans-serif;}
</style>
<?php } ?>
<?php } ?>
<?php if ($options['mts_content_font'] == 'Arial') { ?>
<?php } else { ?>
<?php if ($options['mts_content_font'] != '' || $options['mts_google_content_font'] != '') { ?>
<link href="http://fonts.googleapis.com/css?family=<?php if ($options['mts_google_content_font'] != '') { ?><?php echo $options['mts_google_content_font']; ?><?php } else { ?><?php echo $options['mts_content_font']; ?><?php } ?>:400,400italic,700,700italic" rel="stylesheet" type="text/css">
<style type="text/css">
body {font-family: '<?php if ($options['mts_google_content_font'] != '') { ?><?php echo $options['mts_google_content_font']; ?><?php } else { ?><?php echo $options['mts_content_font']; ?><?php } ?>', sans-serif;}
</style>
<?php } ?>
<?php } ?>
<!--end fonts-->
<!--script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script-->
<script src="<?php echo get_template_directory_uri(); ?>/js/modernizr.min.js"></script>
<script src="<?php echo get_template_directory_uri(); ?>/js/customscript.js" type="text/javascript"></script>
<!--start slider-->
<?php if($options['mts_featured_slider'] == '1') { ?>
<?php if( is_home() ) { ?>
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/flexslider.css" type="text/css">
<script src="<?php echo get_template_directory_uri(); ?>/js/jquery.flexslider-min.js"></script>
<script type="text/javascript">
		$(window).load(function() {
		$('.flexslider').flexslider({
          animation: "fade",
		  pauseOnHover: true,
          controlsContainer: ".flex-container"
		});
		});
	</script>
<?php } ?>
<?php } ?>
<!--end slider-->
<style type="text/css">
<?php if($options['mts_bg_color'] != '') { ?>
body {background-color:<?php echo $options['mts_bg_color']; ?>;}
<?php } ?>
<?php if ($options['mts_bg_pattern_upload'] != '') { ?>
body {background-image: url(<?php echo $options['mts_bg_pattern_upload']; ?>);}
<?php } else { ?>
<?php if($options['mts_bg_pattern'] != '') { ?>
body {background-image:url(<?php echo get_template_directory_uri(); ?>/images/<?php echo $options['mts_bg_pattern']; ?>.png);}
<?php } ?>
<?php } ?>
<?php if ($options['mts_color_scheme'] != '') { ?> 
.post-info a, .single_post a, a:hover, .textwidget a, #commentform a, .copyrights a:hover, a, #tabber .inside li .meta, .sliderDate, footer .sidebar a:hover, #footer a:hover, .related-posts h3, .related-posts a:hover, .postauthor h4, .total-comments, .related-posts ul li p:hover, #respond h3, h1, h2, h3, h4, h5, h6, #copyright-note a:hover, a, .entry-title a:hover, .headline_meta a:hover {color:<?php echo $options['mts_color_scheme']; ?>; }
#tabber ul.tabs li a.selected, #tabber ul.tabs li.tab-recent-posts a.selected, .tagcloud a:hover, .tags a:hover, #footer .tagcloud a:hover, .readMore, .featured-thumbnail .commentBoxe, .sliderCaptionTop .sliderCat, .currenttext, .pagination a:hover, #commentform input#submit, #cancel-comment-reply-link, .mts-subscribe input[type="submit"], .menu a:hover, .current-menu-item a {background-color:<?php echo $options['mts_color_scheme']; ?>;}
.tagcloud a, .tags a, #footer .tagcloud a, .copyrights {border-color: <?php echo $options['mts_color_scheme']; ?>;}
#tabber .inside {border-top-color: <?php echo $options['mts_color_scheme']; ?>;}
<?php } ?>
<?php if($options['mts_floating_social'] == '1') { ?>
.shareit { top: 260px; width: 90px; position: fixed; overflow: hidden; padding: 5px; background: white; border: 1px solid #E2E2E2; margin: 0 633px 0; -moz-box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.06); -webkit-box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.06); box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.06);}
.share-item {margin: 2px;}
<?php } ?>
<?php if ($options['mts_layout'] == 'cslayout') { ?>
#content { float: left; border-left: 0; border-right: 1px solid #E8E8E8; }
<?php if($options['mts_floating_social'] == '1') { ?>
.shareit { left: auto; z-index: 0; margin: 0 0 0 -134px;}
<?php } ?>
<?php } ?>
<?php if($options['mts_image_border'] == '1') { ?>
.format_text img,
.format_text img.left,
.format_text img.alignleft,
.format_text img.right,
.format_text img.alignright,
.format_text img.center,
.format_text img.aligncenter,
.format_text img.alignnone {
border: 10px solid #F2F2F2;
-webkit-transition: border 0.2s linear;
-moz-transition: border 0.2s linear;
transition: border 0.2s linear;
}
.format_text img:hover,
.format_text img.left:hover,
.format_text img.alignleft:hover,
.format_text img.right:hover,
.format_text img.alignright:hover,
.format_text img.center:hover,
.format_text img.aligncenter:hover,
.format_text img.alignnone:hover {
border: 10px solid #DDD;
}
<?php } ?>
<?php if($options['mts_author_comment'] == '1') { ?>
.bypostauthor { border: 1px solid #FAE8B1!important; background: #FFFCE2!important;}
<?php } ?>
<?php echo $options['mts_custom_css']; ?>
</style>
<?php echo $options['mts_header_code']; ?>
<?php }
}

/*------------[ Social Buttons]-------------*/
if ( ! function_exists( 'mts_top_social_buttons' ) ) {
	function mts_top_social_buttons() { 
	global $options
?>

<?php }
}

/*------------[ footer ]-------------*/
if ( ! function_exists( 'mts_footer' ) ) {
	function mts_footer() { 
	global $options
?>
<!--Twitter Button Script------>
<!--script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script-->
<!--script type="text/javascript">
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
</script-->
<!--Facebook Like Button Script------>
<!--script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=136911316406581";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
<!--start lightbox-->
<?php if($options['mts_lightbox'] == '1') { ?>
<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/css/prettyPhoto.css" type="text/css" media="screen" charset="utf-8" />
<script src="<?php bloginfo('template_directory'); ?>/js/jquery.prettyPhoto.js"></script>
<script type="text/javascript">  
jQuery(document).ready(function($) {
$("a[href$='.jpg'], a[href$='.jpeg'], a[href$='.gif'], a[href$='.png']").prettyPhoto({
slideshow: 5000, /* false OR interval time in ms */
autoplay_slideshow: false, /* true/false */
animationSpeed: 'normal', /* fast/slow/normal */
padding: 40, /* padding for each side of the picture */
opacity: 0.35, /* Value betwee 0 and 1 */
showTitle: true, /* true/false */	
social_tools: false
});
})
</script>
<?php } ?>
<!--end lightbox-->
<!--start footer code-->
<?php if ($options['mts_analytics_code'] != '') { ?>
<?php echo $options['mts_analytics_code']; ?>
<?php } ?>
<!--end footer code-->
<?php }
}

/*------------[ Copyrights ]-------------*/
if ( ! function_exists( 'mts_copyrights_credit' ) ) {
	function mts_copyrights_credit() { 
	global $options
?>
<!--start copyrights-->
<div class="row" id="copyright-note">
<span><?php echo $options['mts_copyrights']; ?></span>
<a href="#top" class="toplink"><div class="top"></div></a>
</div>
<!--end copyrights-->
<?php }
}

?>