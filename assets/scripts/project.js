import LazyLoad from 'vanilla-lazyload';
import mediumZoom from 'medium-zoom';

document.addEventListener('DOMContentLoaded', () => {
	mediumZoom('[data-zoomable]', { margin: 24, background: '#1d1d1d' });
	const lazyLoadInstance = new LazyLoad({
		elements_selector: '.lazy',
	});
});
