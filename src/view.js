import { store, getContext } from '@wordpress/interactivity';
import Masonry from 'masonry-layout';

const { state } = store( 'create-block/rwp-image-gallery', {
	// Global (non-reactive) values can be added here (optional)
	isOpen: false,

	// State is reactive — when it changes, the DOM updates accordingly
	state: {
		modalVisible: false,
		modalImage: '',
	},

	// Actions modify the state — like Vue methods or React setState logic
	actions: {
		openModal: () => {
			// Access the image URL from the parent context
			const context = getContext();

			// Fallback if somehow context is missing
			const imageURL = context.imageURL;

			if ( ! imageURL ) {
				console.warn( 'Image URL not found' );
				return;
			}

			state.modalImage = imageURL;
			state.modalVisible = true;
		},
		closeModal: () => {
			state.modalVisible = false;
			state.modalImage = '';
		},
	},

	// Callbacks are triggered when DOM is connected/disconnected (optional)
	callbacks: {
		expSetupLightbox: () => {
			window.addEventListener( 'keydown', ( event ) => {
				if ( 'Escape' === event.key ) {
					store(
						'create-block/rwp-image-gallery'
					).actions.closeModal();
				}
			} );
		},

		initMasonry: () => {
			const gallery = document.querySelector( '.gallery-masonry' );
			if ( gallery ) {
				new Masonry( gallery, {
					itemSelector: '.masonry-item',
					columnWidth: '.masonry-item',
					gutter: 10,
					percentPosition: true,
				} );
			}
		},
	},
} );
