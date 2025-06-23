<?php
// This file is generated. Do not modify it manually.
return array(
	'build' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/rwp-image-gallery',
		'version' => '0.1.0',
		'title' => 'Rwp Image Gallery',
		'category' => 'widgets',
		'description' => 'A custom Gutenberg block to display an image gallery with horizontal or vertical layout options.',
		'example' => array(
			
		),
		'attributes' => array(
			'images' => array(
				'type' => 'array',
				'default' => array(
					
				),
				'items' => array(
					'type' => 'object'
				)
			),
			'layout' => array(
				'type' => 'string',
				'default' => 'horizontal'
			),
			'imageWidth' => array(
				'type' => 'string',
				'default' => '100'
			),
			'imageMargin' => array(
				'type' => 'string',
				'default' => '5'
			),
			'imageLimit' => array(
				'type' => 'number',
				'default' => 0
			)
		),
		'supports' => array(
			'interactivity' => true,
			'html' => false,
			'__experimentalBorder' => array(
				'radius' => true,
				'color' => true,
				'width' => true,
				'style' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true
				)
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true
			),
			'color' => array(
				'background' => true,
				'text' => true
			),
			'shadow' => true
		),
		'textdomain' => 'rwp-image-gallery',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js'
	)
);
