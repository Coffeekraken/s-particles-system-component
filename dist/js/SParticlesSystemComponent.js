Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SWebComponent2 = require('coffeekraken-sugar/js/core/SWebComponent');

var _SWebComponent3 = _interopRequireDefault(_SWebComponent2);

var _getAnimationProperties = require('coffeekraken-sugar/js/dom/getAnimationProperties');

var _getAnimationProperties2 = _interopRequireDefault(_getAnimationProperties);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SParticlesSystemComponent = function (_SWebComponent) {
	_inherits(SParticlesSystemComponent, _SWebComponent);

	function SParticlesSystemComponent() {
		_classCallCheck(this, SParticlesSystemComponent);

		return _possibleConstructorReturn(this, (SParticlesSystemComponent.__proto__ || Object.getPrototypeOf(SParticlesSystemComponent)).apply(this, arguments));
	}

	_createClass(SParticlesSystemComponent, [{
		key: 'componentMount',


		/**
   * Mount component
   * @definition 		SWebComponent.componentMount
   */
		value: function componentMount() {
			var _this2 = this;

			_get(SParticlesSystemComponent.prototype.__proto__ || Object.getPrototypeOf(SParticlesSystemComponent.prototype), 'componentMount', this).call(this);

			// check if need to create a timer or not
			if (this.props.amount && this.props.duration) {
				this._timer = new STimer(this.props.duration / this.props.amount, {
					loop: this.props.loop
				});
				// on tick
				this._timer.onTick(function () {
					// emit a particle
					_this2.emitParticle();
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
   */

	}, {
		key: 'componentUnmount',
		value: function componentUnmount() {
			_get(SParticlesSystemComponent.prototype.__proto__ || Object.getPrototypeOf(SParticlesSystemComponent.prototype), 'componentUnmount', this).call(this);
			if (this._timer) {
				this._timer.destroy();
			}
		}

		/**
   * Component will receive prop
   * @definition 		SWebComponent.componentWillReceiveProp
   */

	}, {
		key: 'componentWillReceiveProp',
		value: function componentWillReceiveProp(name, newVal, oldVal) {
			switch (name) {
				case 'active':
					if (!newVal) this.stop();else this.start();
					break;
			}
		}

		/**
   * Emit a particle
   * @return 		{HTMLElement} 		The emited particle
   */

	}, {
		key: 'emitParticle',
		value: function emitParticle() {
			var _this3 = this;

			// append a new particle
			var particle = document.createElement('s-particle');

			// set particle position
			particle.style.top = this.props.emitterY + Math.random() * this.props.spread + 'px';
			particle.style.left = this.props.emitterX + Math.random() * this.props.spread + 'px';

			// append class if needed
			if (this.props.particleClass) {
				if (this.props.particleClass instanceof Array) {
					if (this.props.particleClassSelection === 'random') {
						particle.classList.add(this.props.particleClass[Math.round(Math.random() * (this.props.particleClass.length - 1))]);
					}
				} else {
					particle.classList.add(this.props.particleClass);
				}
			}

			// add the particle element if specified
			if (this.props.particleElm) {
				var particles = [].concat(this.props.particleElm);
				particle.appendChild(particles[Math.round(Math.random() * particles.length - 1)]);
			}

			this.mutate(function () {
				// append the new particle into the system
				_this3.appendChild(particle);
			});

			// return the emited particle
			return particle;
		}

		/**
   * Stop the system
   */

	}, {
		key: 'stop',
		value: function stop() {
			this._timer.stop();
		}

		/**
   * Start the system
   */

	}, {
		key: 'start',
		value: function start() {
			this._timer.start();
		}
	}], [{
		key: 'css',


		/**
   * Css
   */
		value: function css(componentName, componentNameDash) {
			return '\n\t\t\t' + componentNameDash + ' {\n\t\t\t\tdisplay: block;\n\t\t\t}\n\t\t';
		}
	}, {
		key: 'defaultProps',


		/**
   * Default props
   * @definition 		SWebComponent.defaultProps
   */
		get: function get() {
			return {
				/**
     * Emitter x position
     * @prop
     * @type	{Number}
     */
				emitterX: 0,
				/**
     * Emitter y position
     * @prop
     * @type	{Number}
     */
				emitterY: 0,
				/**
     * Max distance where the particle will take birth from the emiter position
     * @prop
     * @type	{Number}
     */
				spread: 0,
				/**
     * Amount of particles to emit during the props.duration property
     * @prop
     * @type	{Integer}
     */
				amount: 0,
				/**
     * Duration of the particles emission
     * @prop
     * @type	{Number}
     */
				duration: null,
				/**
     * Class to apply to each particles
     * @prop
     * @type	{String}
     */
				particleClass: null,
				/**
     * Specify the method to pick a particle class if the props.particleClass is an array. Only random is supported for now
     * @prop
     * @type 	{String|Array<String>}
     */
				particleClassSelection: 'random',
				/**
     * DOM element to add into particle. If is an array, will pick a particle randomly
     * @prop
     * @type	{HTMLElement|Array<HTMLElement>}
     */
				particleElm: null,
				/**
     * Callback when the emission is completed
     * @prop
     * @type  	{Function}
     */
				onComplete: null,
				/**
     * Specify if the system if active or not
     * @prop
     * @type	{Boolean}
     */
				active: true,
				/**
     * Specify if the system hs to start again at the end automatically
     * @prop
     * @type 	{Boolean}
     */
				loop: false
			};
		}
	}]);

	return SParticlesSystemComponent;
}(_SWebComponent3.default);

exports.default = SParticlesSystemComponent;