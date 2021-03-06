import SWebComponent from 'coffeekraken-sugar/js/core/SWebComponent'
import SParticleComponent from 'coffeekraken-s-particle-component'
import STimer from 'coffeekraken-sugar/js/classes/STimer'
import __getAnimationProperties from 'coffeekraken-sugar/js/dom/getAnimationProperties'

/**
 * @name 		SParticlesSystemComponent
 * @extends 	SWebComponent
 * Webcomponent to handle particles emission
 *
 * @example 	html
 * <s-particles-system loop spread="100" duration="1000" amount="10" particle-class="my-cool-particle">
 * </s-particles-system>
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */

export default class SParticlesSystemComponent extends SWebComponent {

	/**
	 * Default props
	 * @definition 		SWebComponent.defaultProps
	 * @protected
	 */
	static get defaultProps() {
		return {
			/**
			 * Emitter x position
			 * @prop
			 * @type	{Number}
			 */
			emitterX : 0,
			/**
			 * Emitter y position
			 * @prop
			 * @type	{Number}
			 */
			emitterY : 0,
			/**
			 * Max distance where the particle will take birth from the emiter position
			 * @prop
			 * @type	{Number}
			 */
			spread : 0,
			/**
			 * Amount of particles to emit during the props.duration property
			 * @prop
			 * @type	{Integer}
			 */
			amount : 0,
			/**
			 * Duration of the particles emission
			 * @prop
			 * @type	{Number}
			 */
			duration : null,
			/**
			 * Class to apply to each particles
			 * @prop
			 * @type	{String|Array}
			 */
			particleClass : null,
			/**
			 * Specify the method to pick a particle class if the props.particleClass is an array. Only random is supported for now
			 * @prop
			 * @type 	{String|Array<String>}
			 * @values 	random
			 */
			particleClassSelection : 'random',
			/**
			 * DOM element to add into particle. If is an array, will pick a particle randomly
			 * @prop
			 * @type	{HTMLElement|Array<HTMLElement>}
			 */
			particleElm : null,
			/**
			 * Callback when the emission is completed
			 * @prop
			 * @type  	{Function}
			 */
			onComplete : null,

			/**
			 * Called just before emit the particle
			 * The passed function will have as parameter the particle that will be emitted
			 * @prop
			 * @type 	{Function}
			 */
			beforeEmit : null,

			/**
			 * When a particle is emitted
			 * The passed function will have as parameter the emitted particle
			 * @prop
			 * @type 	{Function}
			 */
			onEmit : null,

			/**
			 * Specify if the system if active or not
			 * @prop
			 * @type	{Boolean}
			 */
			active : true,
			/**
			 * Specify if the system hs to start again at the end automatically
			 * @prop
			 * @type 	{Boolean}
			 */
			loop : false
		};
	}

	/**
	 * Css
	 * @protected
	 */
	static defaultCss(componentName, componentNameDash) {
		return `
			${componentNameDash} {
				display: block;
			}
		`;
	}

	/**
	 * Mount component
	 * @definition 		SWebComponent.componentMount
	 * @protected
	 */
	componentMount() {
		super.componentMount();

		// check if need to create a timer or not
		if (this.props.amount && this.props.duration) {
			this._timer = new STimer(this.props.duration, {
				tickCount : this.props.amount,
				loop : this.props.loop
			});
			// on tick
			this._timer.onTick(() => {
				// emit a particle
				this.emitParticle();
			});
			if (this.props.onComplete) {
				this._timer.onComplete(this.props.onComplete);
			}
			if (this.props.active) {
				// start the timer
				this._timer.start();
			}
		}
	}

	/**
	 * Unmount component
	 * @definition 		SWebComponent.componentUnmount
	 * @protected
	 */
	componentUnmount() {
		super.componentUnmount();
		if (this._timer) {
			this._timer.destroy();
		}
	}

	/**
	 * Component will receive prop
	 * @definition 		SWebComponent.componentWillReceiveProp
	 * @protected
	 */
	componentWillReceiveProp(name, newVal, oldVal) {
		switch (name) {
			case 'active':
				if ( ! newVal) this.stop();
				else this.start();
			break;
		}
	}

	/**
	 * Emit a particle
	 * @return 		{HTMLElement} 		The emited particle
	 */
	emitParticle() {
		// append a new particle
		const particle = document.createElement('s-particle');

		// set particle position
		particle.style.top = this.props.emitterY - this.props.spread / 2 + (Math.random() * this.props.spread) + 'px';
		particle.style.left = this.props.emitterX - this.props.spread / 2 + (Math.random() * this.props.spread) + 'px';

		// append class if needed
		if (this.props.particleClass) {
			if (this.props.particleClass instanceof Array) {
				if (this.props.particleClassSelection === 'random') {
					particle.classList.add(this.props.particleClass[Math.round(Math.random()*(this.props.particleClass.length-1))]);
				}
			} else {
				particle.classList.add(this.props.particleClass);
			}
		}

		// add the particle element if specified
		if (this.props.particleElm) {
			const particles = [].concat(this.props.particleElm);
			particle.appendChild(particles[Math.round(Math.random()*particles.length-1)]);
		}

		// before emit
		this.props.beforeEmit && this.props.beforeEmit(particle);

		this.mutate(() => {
			// append the new particle into the system
			this.appendChild(particle);
			// onEmit
			this.props.onEmit && this.props.onEmit(particle);
		});

		// return the emited particle
		return particle;
	}

	/**
	 * Stop the system
	 */
	stop() {
		this._timer.stop();
	}

	/**
	 * Start the system
	 */
	start() {
		this._timer.start();
	}
}
