<?php
/*-----------------------------------------------------------------------------------

	Plugin Name: MyThemeShop Popular Posts
	Description: A widget for displaying Popular Posts.
	Version: 1.0

-----------------------------------------------------------------------------------*/
add_action('widgets_init', 'mts_pp_load_widgets');

function mts_pp_load_widgets()
{
	register_widget('mts_pp_Widget');
}

function string_limit_words($string, $word_limit)
{
	$words = explode(' ', $string, ($word_limit + 1));
	
	if(count($words) > $word_limit) {
		array_pop($words);
	}
	
	return implode(' ', $words);
}

class mts_pp_Widget extends WP_Widget {
	
	function mts_pp_Widget()
	{
		$widget_ops = array('classname' => 'mts_pp', 'description' => 'Displays Popular Posts with Thumbnail.');

		$control_ops = array('id_base' => 'mts_pp-widget');

		$this->WP_Widget('mts_pp-widget', 'MyThemeShop: Popular Posts', $widget_ops, $control_ops);
	}
	
	function widget($args, $instance)
	{
		extract($args);
		
		$posts = $instance['posts'];
		$images = true;
		
		echo $before_widget;
		
		if($title) {
			echo $before_title.$title.$after_title;
		}		
		?>
		<!-- BEGIN WIDGET -->
		<div class="pp-wrapper">
			
			<h3><?php _e('你可能喜欢的', 'mythemeshop'); ?></h3>
			<ul class="popular-posts">
					<?php
					$popular_posts = new WP_Query('showposts='.$posts.'&orderby=comment_count&order=DESC');
                    global $wpdb;
                    $where = '';
                    $temp = '';
                    $output = '';
                    $mode = 'post';
                    if(!empty($mode) && $mode != 'both') {
                        $where = "post_type = '$mode'";
                    } else {
                        $where = '1=1';
                    }
                    $limit = $posts;
                    global $post;
                    $most_viewed = $wpdb->get_results("SELECT DISTINCT $wpdb->posts.*, (meta_value+0) AS views FROM $wpdb->posts LEFT JOIN $wpdb->postmeta ON $wpdb->postmeta.post_id = $wpdb->posts.ID WHERE post_date < '".current_time('mysql')."' AND $where AND post_status = 'publish' AND meta_key = 'views' AND post_password = '' ORDER BY views DESC LIMIT $limit");
                    //print_r($most_viewed);
					//if($popular_posts->have_posts()):
				    // while($popular_posts->have_posts()): $popular_posts->the_post();
                     if($most_viewed):
                        foreach ($most_viewed as $post) {
                            $post_title = get_the_title($post);
                            $post_permalink = get_permalink($post);
                           // the_views();
                            ?>
						<li>
							<?php if(has_post_thumbnail($post->ID)): ?>
<?php $image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'widgetbigthumb'); ?>
<a href='<?php echo $post_permalink; ?>'><img src="<?php echo $image[0]; ?>" alt="<?php echo $post_title; ?>" class="wp-post-image" /></a>
<?php else: ?>
<a href='<?php the_permalink(); ?>'><img src="<?php echo get_template_directory_uri(); ?>/images/smallthumb.png" alt="<?php the_title(); ?>"  class="wp-post-image" /></a>
<?php endif; ?><a href='<?php echo $post_permalink; ?>' title='<?php echo $post_title; ?>' class="plink"><?php echo $post_title; ?></a>
						</li>
						<?php } ?>
					<?php endif; ?>
			<ul>
		</div>
		<!-- END WIDGET -->
		<?php
		echo $after_widget;
	}
	
	function update($new_instance, $old_instance)
	{
		$instance = $old_instance;
		
		$instance['posts'] = $new_instance['posts'];
		$instance['show_images'] = true;
		
		return $instance;
	}

	function form($instance)
	{
		$defaults = array('posts' => 3);
		$instance = wp_parse_args((array) $instance, $defaults); ?>
		<p>
			<label for="<?php echo $this->get_field_id('posts'); ?>">Number of posts:</label>
			<input class="widefat" style="width: 30px;" id="<?php echo $this->get_field_id('posts'); ?>" name="<?php echo $this->get_field_name('posts'); ?>" value="<?php echo $instance['posts']; ?>" />
		</p>
	<?php }
}
?>