<?php
/*
Plugin Name: Portfolio Items
Description: Custom post type and taxonomy to support having portfolio items
Version: 0.1
Author: Matthew Cromer
Text Domain: portfolio_items
Domain Path: /languages
License:
*/

// to check WP is running
defined( 'ABSPATH' ) or die( "Permission denied!" );

// Register custom post type 'record'
function portfolio_items_create_cpt() {
    // define labels
	$labels = array (
		'name' 			=> __( 'Portfolios','post type general name', 'portfolio_items' ),
		'singular_name' 	=> __( 'Portfolio', 'post type singular name', 'portfolio_items' ),
		'name_admin_bar'	=> __( 'Portfolios', 'portfolio_items' ),
		'add_new' 		=> __( 'Add new portfolio item', 'portfolio_items' ),
		'add_new_item' 		=> __( 'Add new portfolio item', 'portfolio_items' ),
		'edit_item' 		=> __( 'Edit portfolio item', 'portfolio_items' ),
		'new_item' 		=> __( 'New portfolio item', 'portfolio_items' ),
		'view_item' 		=> __( 'View portfolio item', 'portfolio_items' )
	);

	// define args
	$args = array (
		'labels' 		=> $labels,
    'description'		=> 'Holds portfolio info',
		'public' 		=> true,
		'show_in_nav_menus' 	=> false,
		'menu_icon' 		=> 'dashicons-portfolio',
		'supports' 		=> array( 'title', 'editor', 'page-attributes', 'thumbnail' ),
		'show_in_rest' 		=> true,
		//'taxonomies'		=> array( 'category' )
	);

	register_post_type( 'portfolio', $args );

}
add_action( 'init', 'portfolio_items_create_cpt' );


// Register custom taxonomy for 'record'
function portfolio_items_create_taxonomies() {

    //define labels
    $labels = array(
         'name' 			=> __( 'Portfolio Categories', 'taxonomy general name', 'portfolio_items' ),
         'singular_name' 		=> __( 'Portfolio Category', 'taxonomy singular name', 'portfolio_items' ),
         'search_items' 		=> __( 'Search Categories', 'portfolio_items' ),
         'all_items' 			=> __( 'All Categories', 'portfolio_items' ),
         'edit_item'  			=> __( 'Edit Category', 'portfolio_items' ),
         'update_item' 			=> __( 'Update Category', 'portfolio_items' ),
         'add_new_item' 		=> __( 'Add New Category', 'portfolio_items' ),
         'new_item_name' 		=> __( 'New Category', 'portfolio_items' ),
         'popular_items' 		=> __( 'Popular Categories', 'portfolio_items' ),
         'menu_name' 			=> __( 'Portfolio Categories', 'portfolio_items' ),
         'choose_from_most_used'	=> __( 'Choose from the most used Categories', 'portfolio_items' ),
         'not_found' 			=> __( 'No Categories found', 'portfolio_items' )
    );

    // define args
    $args = array(
         'hierarchical' 	=> false,
         'labels' 		=> $labels,
         'rewrite' 		=> true,
         'show_admin_column'	=> true,
         'show_in_rest' 	=> true,
   );

   // assign the category "record" only for "record" Post Type
   register_taxonomy( 'portfolio_category', 'portfolio', $args );

}
add_action( 'init', 'portfolio_items_create_taxonomies', 0 );


// Create shortcode [portfolio_list] and display posts from 'record' CPT
function portfolio_items_portfolio_list( $atts ){

  // create the query arguments array ($args) to pass to WP_Query
	$args = array(
		'post_type' 		=> 'portfolio',
		'posts_per_page'	=> '-1'
    );

    // get the posts and store array of records in $portfolios
    $portfolios = new WP_Query( $args );

    if ( $portfolios->have_posts() ) {

        $html = '';
        while ( $portfolios->have_posts() ) {
            $portfolios->the_post();
            $id = get_the_ID();
            $title = get_the_title();
            $thumbnail = get_the_post_thumbnail($id, array(180, 180));
            $link = get_the_permalink();
            $html .= '<div style="display:flex">';
            $html .= '<div style="padding-right:20px">';
            $html .= '<a href="' . $link . '">' . $thumbnail . '</a>';
            $html .= '</div>';
            $html .= '<div>';
            $html .= '<strong><p style="font-size:1.2em"><a href="' . $link . '">' . $title . '</a></p></strong>';
            $html .= '</div>';
            $html .= '</div>';
        }
        return $html;
    } else {
        return "Nothing found!";
    }
	
	wp_reset_postdata();

}
add_shortcode( 'portfolio_list', 'portfolio_items_portfolio_list' );

// add custom fields to REST API
//function portfolio_items_rest_prepare_portfolio( $data, $post, $request ) {
//	$_data = $data->data;
//	$_data['artist'] = get_field('artist', $post->ID);
//	$_data['year'] = get_field('year_of_release', $post->ID);
//	$data->data = $_data;
//	return $data;
//}
//add_filter( 'rest_prepare_portfolio', 'portfolio_items_rest_prepare_portfolio', 10, 3 );