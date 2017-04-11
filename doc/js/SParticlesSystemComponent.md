# SParticlesSystemComponent

Extends **SWebComponent**

Webcomponent to handle particles emission


### Example
```html
	<s-particles-system loop spread="100" duration="1000" amount="10" particle-class="my-cool-particle">
</s-particles-system>
```
Author : Olivier Bossel <olivier.bossel@gmail.com>




## Attributes

Here's the list of available attribute to set on the element.

### emitterX

Emitter x position

Type : **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**

Default : **0**


### emitterY

Emitter y position

Type : **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**

Default : **0**


### spread

Max distance where the particle will take birth from the emiter position

Type : **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**

Default : **0**


### amount

Amount of particles to emit during the props.duration property

Type : **{ Integer }**

Default : **0**


### duration

Duration of the particles emission

Type : **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**

Default : **null**


### particleClass

Class to apply to each particles

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) , [Array](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array) }**

Default : **null**


### particleClassSelection

Specify the method to pick a particle class if the props.particleClass is an array. Only random is supported for now

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) , Array<String> }**

Values : **random**

Default : **random**


### particleElm

DOM element to add into particle. If is an array, will pick a particle randomly

Type : **{ [HTMLElement](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) , Array<HTMLElement> }**

Default : **null**


### onComplete

Callback when the emission is completed

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **null**


### beforeEmit

Called just before emit the particle
The passed function will have as parameter the particle that will be emitted

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **null**


### onEmit

When a particle is emitted
The passed function will have as parameter the emitted particle

Type : **{ [Function](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function) }**

Default : **null**


### active

Specify if the system if active or not

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **true**


### loop

Specify if the system hs to start again at the end automatically

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**




## Methods


### emitParticle

Emit a particle

Return **{ [HTMLElement](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement) }** The emited particle


### stop

Stop the system


### start

Start the system