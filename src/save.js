import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { images, layout, imageWidth, imageMargin } = attributes;

	return (
		<div { ...useBlockProps.save() }>
			<div
				data-wp-interactive="create-block/rwp-image-gallery"
				data-wp-watch="callbacks.expSetupLightbox"
			>
				{ images.length > 0 && (
					<div className="gallery-wrapper">
						<div className="gallery-preview rwp-image-gallery">
							<div className={ `gallery-${ layout }` }>
								{ images.map( ( img ) => (
									<div
										key={ img.id }
										data-wp-context={ JSON.stringify( {
											imageURL: img.url,
										} ) }
									>
										<img
											src={ img.url }
											alt={ img.alt || '' }
											data-wp-on--click="actions.openModal"
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
					</div>
				) }

				<div
					data-wp-bind--hidden="!state.modalVisible"
					className="rwp-image-modal"
				>
					<button
							data-wp-on--click="actions.closeModal"
							className="close-button"
						>
						×
					</button>
					<div className="modal-content">
						<img data-wp-bind--src="state.modalImage" alt="" />
					</div>
				</div>
			</div>
		</div>
	);
}
