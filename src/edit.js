import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
} from '@wordpress/block-editor';

import {
	Button,
	PanelBody,
	SelectControl,
	TextControl,
} from '@wordpress/components';

import { useEffect } from '@wordpress/element';

export default function Edit( { attributes, setAttributes } ) {
	const { images, layout, imageWidth, imageMargin, imageLimit } = attributes;

	const onSelectImages = ( selectedImages ) => {
		const limitedImages =
			imageLimit > 0
				? selectedImages.slice( 0, imageLimit )
				: selectedImages;

		setAttributes( { images: limitedImages } );
	};

	useEffect( () => {
		if ( imageLimit > 0 && images.length > imageLimit ) {
			setAttributes( { images: images.slice( 0, imageLimit ) } );
		}
	}, [ imageLimit ] );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Layout Settings', 'rwp-image-gallery' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Layout', 'rwp-image-gallery' ) }
						value={ layout }
						options={ [
							{
								label: __( 'Horizontal', 'rwp-image-gallery' ),
								value: 'horizontal',
							},
							{
								label: __( 'Vertical', 'rwp-image-gallery' ),
								value: 'vertical',
							},
						] }
						onChange={ ( newLayout ) =>
							setAttributes( { layout: newLayout } )
						}
					/>
					<TextControl
						label={ __( 'Image Width', 'rwp-image-gallery' ) }
						value={ imageWidth }
						onChange={ ( value ) => {
							const numeric = value.replace( /\D/g, '' );
							setAttributes( { imageWidth: numeric } );
						} }
						help={ __(
							'Width in pixels (px will be added automatically)',
							'rwp-image-gallery'
						) }
					/>
					<TextControl
						label={ __( 'Image Margin', 'rwp-image-gallery' ) }
						value={ imageMargin }
						onChange={ ( value ) => {
							const numeric = value.replace( /\D/g, '' );
							setAttributes( { imageMargin: numeric } );
						} }
						help={ __(
							'Margin in pixels (px will be added automatically)',
							'rwp-image-gallery'
						) }
					/>
					<TextControl
						label={ __( 'Image Count', 'rwp-image-gallery' ) }
						value={ imageLimit }
						onChange={ ( value ) => {
							const numeric = value.replace( /\D/g, '' );
							setAttributes( {
								imageLimit: parseInt( value ) || 0,
							} );
						} }
						help={ __(
							'Set to 0 to upload any number of images',
							'rwp-image-gallery'
						) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps() }>
				<MediaUploadCheck>
					{ images.length === 0 ? (
						<div className="edit-gallery-placeholder">
							<MediaUpload
								onSelect={ onSelectImages }
								allowedTypes={ [ 'image' ] }
								multiple
								gallery
								value={ images.map( ( img ) => img.id ) }
								render={ ( { open } ) => (
									<Button onClick={ open } variant="primary">
										{ __(
											'Select Images',
											'rwp-image-gallery'
										) }
									</Button>
								) }
							/>
						</div>
					) : (
						<div className="gallery-wrapper">
							<div className="gallery-preview rwp-image-gallery">
								<div className={ `gallery-${ layout }` }>
									{ images.map( ( img ) => (
										<div>
											<img
												key={ img.id }
												src={ img.url }
												alt={ img.alt || '' }
												style={ {
													width: imageWidth
														? `${ imageWidth }px`
														: undefined,
													margin: imageMargin
														? `${ imageMargin }px`
														: undefined,
												} }
											/>
										</div>
									) ) }
								</div>
							</div>

							<div className="edit-overlay">
								<MediaUpload
									onSelect={ onSelectImages }
									allowedTypes={ [ 'image' ] }
									multiple
									gallery
									value={ images.map( ( img ) => img.id ) }
									render={ ( { open } ) => (
										<Button
											onClick={ open }
											variant="primary"
										>
											{ __(
												'Edit Gallery',
												'rwp-image-gallery'
											) }
										</Button>
									) }
								/>
							</div>
						</div>
					) }

					<p>
						{ imageLimit > 0
							? `${ images.length } ${ __(
									'of',
									'rwp-image-gallery'
							  ) } ${ imageLimit } ${ __(
									'images uploaded',
									'rwp-image-gallery'
							  ) }`
							: `${ images.length } ${ __(
									'images uploaded',
									'rwp-image-gallery'
							  ) }` }
					</p>
				</MediaUploadCheck>
			</div>
		</>
	);
}
