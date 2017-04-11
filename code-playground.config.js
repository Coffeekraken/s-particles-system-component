module.exports = {
	// server port
	port : 3000,

	// logo
	logo : null,

	// title
	title : 's-particles-system-component',

	// layout
	layout : 'right',

	// compile server
	compileServer : {

		// compile server port
		port : 4000

	},

	// editors
	editors : {
		html : {
			language : 'html',
			data : `
				<a href="#" class="btn" onclick="document.querySelector('s-particles-system').stop(); return;">
					Stop system
				</a>
				<a href="#" class="btn btn--primary" onclick="document.querySelector('s-particles-system').start(); return;">
					Start system
				</a>
				<s-particles-system loop spread="300" duration="1000" amount="10" particle-class="['my-cool-particle','my-cool-particle-2']"></s-particles-system>
			`
		},
		css : {
			language : 'sass',
			data : `
				@import 'node_modules/coffeekraken-sugar/index';
				@include s-init();
				@include s-classes();
				@include s-button-classes();
				body {
					background : linear-gradient(to bottom, #f6f7fc 0%, #d5e1e8 40%);
					overflow: hidden;
				}
				.my-cool-particle {
					position:absolute; top:50%; left:50%; transform:translateX(-50%) translateY(-50%);
					width: 50px; height: 50px; border-radius:50%;
					border: 5px solid s-color(primary);
					animation: my-cool-particle .5s ease-in-out 0s forwards;
				}
				.my-cool-particle-2 {
					position:absolute; top:50%; left:50%; transform:translateX(-50%) translateY(-50%);
					width: 50px; height: 50px; border-radius:50%;
					border: 5px solid s-color(secondary);
					animation: my-cool-particle .5s ease-in-out 0s forwards;
				}

				@keyframes my-cool-particle {
					0% { transform:translateX(-50%) translateY(-50%) scale(0,0); opacity:0;}
					80% { transform:translateX(-50%) translateY(-50%) scale(.8,.8); opacity:1;}
					100% { transform:translateX(-50%) translateY(-50%) scale(1,1); opacity:0;}
				}
				s-particles-system {
					position:absolute;
					top:50%; left:50%;
				}
			`
		},
		js : {
			language : 'js',
			data : `
				import 'webcomponents.js/webcomponents-lite'
				import './dist/index'
			`
		}
	}
}
