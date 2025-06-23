<?php
/**
 * Server-side render callback for the Image Gallery block.
 *
 * @param array $attributes Block attributes from block editor.
 * @return string Rendered HTML of the gallery block.
 */
function render_rwp_image_gallery_block( $attributes ) {
    // Ensure 'images' exists and is an array
    if ( empty( $attributes['images'] ) || ! is_array( $attributes['images'] ) ) {
        return ''; // Return nothing if there are no images
    }

    // Start with base class.
    $classes = 'rwp-image-gallery ' . $extra_classes;

    // Add layout class.
    if ( ! empty( $attributes['layout'] ) ) {
        $classes .= ' gallery-' . sanitize_html_class( $attributes['layout'] );
    }

    // Add additional user-defined classes (from "Additional CSS class(es)" field).
    if ( ! empty( $attributes['className'] ) ) {
        $classes .= ' ' . sanitize_html_class( $attributes['className'] );
    }

    // Get proper wrapper attributes using WordPress helper (recommended)
	$wrapper_attributes = get_block_wrapper_attributes( [ 'class' => $classes ] );
    
    // Begin HTML output
	$html = '<div ' . $wrapper_attributes . '>';

    foreach ( $attributes['images'] as $image ) {
        $image_url = esc_url( $image['url'] );
        $alt       = esc_attr( $image['alt'] ?? '' );
        if ( $image_url ) {
        	$html .= "<img src='{$image_url}' alt='{$alt}' style='width:100px; margin:5px;' />";
        }
    }

    $html .= '</div>';

    return $html;
}


