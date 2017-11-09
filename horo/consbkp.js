class Star{
	constructor(constellation){
		this.x = random(0+constellation.starRadius,constellation.canvas.width-constellation.starRadius);
		this.y = random(0+constellation.starRadius,constellation.canvas.height-constellation.starRadius);
		this.r = constellation.starRadius*random(1-constellation.starRadiusJitter,1+constellation.starRadiusJitter);
		this.context = constellation.context;
		this.hue = constellation.foregroundHue+random(1,360)*constellation.foregroundHueJitter*plusOrMinus();
		this.saturation = constellation.foregroundSaturation*random(1-constellation.foregroundSaturationJitter,1+constellation.foregroundSaturationJitter);
		this.lightness = constellation.foregroundLightness*random(1-constellation.foregroundLightnessJitter,1+constellation.foregroundLightnessJitter);
		this.opacity = 100;
		this.constellation = constellation;
		this.vx = constellation.starVelocity*random(1-constellation.starVelocityJitter,1+constellation.starVelocityJitter)*plusOrMinus();
		this.vy = constellation.starVelocity*random(1-constellation.starVelocityJitter,1+constellation.starVelocityJitter)*plusOrMinus();
	}
	connections(){
		var neighbors = new Array();
		var t;
		for(var i = 0; i < this.constellation.stars.length; i++){
			if(
				this.constellation.stars[i] != this &&
				Math.abs(this.x - this.constellation.stars[i].x) < this.constellation.connectionRadius &&
				Math.abs(this.y - this.constellation.stars[i].y) < this.constellation.connectionRadius
			)
			{
				neighbors.push(this.constellation.stars[i]);
			}
		}
			// this.opacity = neighbors.length/10;
      this.opacity = 100;
			for(var i = 0; i < neighbors.length; i++){
				t = this.constellation.connectionOpacity;
				if(
					Math.abs(this.x - this.constellation.mx) < this.constellation.revealRadius &&
					Math.abs(this.y - this.constellation.my) < this.constellation.revealRadius
				)
				{
					t += 1-((Math.abs(this.x - this.constellation.mx)+Math.abs(this.y - this.constellation.my))/2)/this.constellation.revealRadius;
				}
				this.context.beginPath();
				this.context.moveTo(this.x,this.y);
				this.context.lineTo(neighbors[i].x,neighbors[i].y);
				this.context.strokeStyle = 'hsla('+this.hue+','+this.saturation+'%,'+this.lightness+'%,'+t+')';
				this.context.lineWidth = this.constellation.connectionWidth;
				this.context.stroke();
				this.context.closePath();
			}

	}
	move(){
		if(this.x <= 0+this.r || this.x >= this.constellation.canvas.width) this.vx = -this.vx;
		if(this.y <= 0+this.r || this.y >= this.constellation.canvas.height) this.vy = -this.vy;
		this.x += this.vx;
		this.y += this.vy;
	}
	draw(){
		this.move();
		this.context.beginPath();
		this.context.arc(this.x,this.y,this.r,0,2*Math.PI);
		this.context.fillStyle = 'hsla('+this.hue+','+this.saturation+'%,'+this.lightness+'%,'+(0.1+this.opacity)+')';
		this.context.fill();
		this.context.closePath();
	}
}

class Constellation	{
	constructor(
		elementID,
		starDensity,
		starRadius,
		starRadiusJitter,
		starVelocity,
		starVelocityJitter,
		connectionRadius,
		connectionWidth,
		connectionOpacity,
		revealRadius,
		backgroundHue,
		backgroundSaturation,
		backgroundLightness,
		foregroundHue,
		foregroundSaturation,
		foregroundLightness,
		foregroundHueJitter,
		foregroundSaturationJitter,
		foregroundLightnessJitter,
		responsive
	)
	{
		constellationCount++;
		this.e = document.getElementById(elementID);
		this.e.innerHTML = '<canvas id="constellation-canvas-'+constellationCount+'"></canvas>';
		this.canvas = document.getElementById('constellation-canvas-'+constellationCount);
		this.context = this.canvas.getContext('2d');

		this.canvas.style.backgroundColor = 'hsl('+backgroundHue+','+backgroundSaturation+'%,'+backgroundLightness+'%)';
		this.canvas.style.display = 'block';

		this.starDensity = starDensity;
		this.starRadius = starRadius;
		this.starRadiusJitter = starRadiusJitter;
		this.starVelocity = starVelocity;
		this.starVelocityJitter = starVelocityJitter;
		this.connectionRadius = connectionRadius;
		this.connectionWidth = connectionWidth;
		this.connectionOpacity = connectionOpacity;
		this.revealRadius = revealRadius;
		this.foregroundHue = foregroundHue;
		this.foregroundSaturation = foregroundSaturation;
		this.foregroundLightness = foregroundLightness;
		this.foregroundHueJitter = foregroundHueJitter;
		this.foregroundSaturationJitter = foregroundSaturationJitter;
		this.foregroundLightnessJitter = foregroundLightnessJitter;
		this.responsive = responsive;
		this.mouseInteractions = true;
		this.mx = 0;
		this.my = 0;
		this.resize();
		this.fill();

	}
	fill(){
		this.stars = new Array();
		for(var i = 0; i < this.numberOfStars; i++){
			this.stars.push(new Star(this));
		}
	}
	mouse(evt) {
		var rect = this.canvas.getBoundingClientRect();
		this.mx = evt.clientX - rect.left,
		this.my = evt.clientY - rect.top
	}
	resize(){
		if(this.responsive){
			this.canvas.width = this.e.offsetWidth;
			this.canvas.height = this.e.offsetHeight;
			this.numberOfStars = this.starDensity*(this.e.offsetWidth*this.e.offsetHeight)/5000;
			this.fill();
		}
	}
	draw(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for(var i = 0; i < this.stars.length; i++){
			this.stars[i].connections();
		}
		for(var i = 0; i < this.stars.length; i++){
			this.stars[i].draw();
		}

	}
}

var constellationCount = 0;
var constellationPresets = [
  {
  name : "standard",
  properties: [1,1,0,0,0,70,0.5,0.1,100,0,0,2,0,0,0,true]
},
  {
  name : "aquarius",
  properties: [319,054,054]
  },
  {
  name : "pisces",
  properties: [314,048,084]
  },
  {
  name : "aries",
  properties: [000,089,078]
  },
  {
  name : "taurus",
  properties: [022,085,083]
  },
  {
  name : "gemini",
  properties: [029,092,093]
  },
  {
  name : "cancer",
  properties: [054,099,092]
  },
  {
  name : "leo",
  properties: [063,093,095]
  },
  {
  name : "virgo",
  properties: [072,088,082]
  },
  {
  name : "libra",
  properties: [112,085,056]
  },
  {
  name : "scorpio",
  properties: [161,086,065]
  },
  {
  name : "sagittarius",
  properties: [238,060,063]
  },
  {
  name : "capricorn",
  properties: [267,065,073]
  },

];
var instances = new Array();


// CONSTELLATION CONSTRUCTORS

function constellation(elementID){
	constellationPreset(elementID,'default');
}

function constellationFull(elementID,starDensity,starRadius,starRadiusJitter,starVelocity,starVelocityJitter,connectionRadius,connectionWidth,connectionOpacity,revealRadius,backgroundHue,backgroundSaturation,backgroundLightness,foregroundHue,foregroundSaturation,foregroundLightness,foregroundHueJitter,foregroundSaturationJitter,foregroundLightnessJitter,responsive){
	instances.push(new Constellation(elementID,starDensity,starRadius,starRadiusJitter,starVelocity,starVelocityJitter,connectionRadius,connectionWidth,connectionOpacity,revealRadius,backgroundHue,backgroundSaturation,backgroundLightness,foregroundHue,foregroundSaturation,foregroundLightness,foregroundHueJitter,foregroundSaturationJitter,foregroundLightnessJitter,responsive));
}

function constellationPreset(elementID,presetName){
	var preset = presetLookup(presetName,constellationPresets);
  var standard = presetLookup("standard",constellationPresets);
	instances.push(new Constellation(elementID,standard.properties[0],standard.properties[1],standard.properties[2],standard.properties[3],standard.properties[4],standard.properties[5],standard.properties[6],standard.properties[7],standard.properties[8],standard.properties[9],standard.properties[10],standard.properties[11],preset.properties[0],preset.properties[1],preset.properties[2],standard.properties[12],standard.properties[13],standard.properties[14],standard.properties[15]));
}

// function constellationRandom(elementID){
// 	constellationPreset(elementID,'random');
// }

// function constellationHue(elementID,hue){
// 	var defaultPreset = presetLookup('default',constellationPresets);
// 	var preset = {name:'hue',properties:[defaultPreset.properties[0],defaultPreset.properties[1],defaultPreset.properties[2],defaultPreset.properties[3],defaultPreset.properties[4],defaultPreset.properties[5],defaultPreset.properties[6],0.05,defaultPreset.properties[8],	hue,100,2,hue,70,50,0.05,0,0,true]};
// 	instances.push(new Constellation(elementID,preset.properties[0],preset.properties[1],preset.properties[2],preset.properties[3],preset.properties[4],preset.properties[5],preset.properties[6],preset.properties[7],preset.properties[8],preset.properties[9],preset.properties[10],preset.properties[11],preset.properties[12],preset.properties[13],preset.properties[14],preset.properties[15],preset.properties[16],preset.properties[17],preset.properties[18]));
// }

// function constellationHSL(elementID,bhue,bsat,blig,fhue,fsat,flig){
// 	var defaultPreset = presetLookup('default',constellationPresets);
// 	var preset = {name:'hue',properties:[defaultPreset.properties[0],defaultPreset.properties[1],defaultPreset.properties[2],defaultPreset.properties[3],defaultPreset.properties[4],defaultPreset.properties[5],defaultPreset.properties[6],0.05,defaultPreset.properties[8],bhue,bsat,blig,fhue,fsat,flig,0.07,0,0,true]};
// 	instances.push(new Constellation(elementID,preset.properties[0],preset.properties[1],preset.properties[2],preset.properties[3],preset.properties[4],preset.properties[5],preset.properties[6],preset.properties[7],preset.properties[8],preset.properties[9],preset.properties[10],preset.properties[11],preset.properties[12],preset.properties[13],preset.properties[14],preset.properties[15],preset.properties[16],preset.properties[17],preset.properties[18]));
// }

function presetLookup(presetName,presetsCollection){
	// if(presetName == 'random'){
	// 	return {
	// 		name:'random',
	// 		properties:[
	// 		random(0.5,2),
	// 		random(0.5,2),
	// 		random(0,0.99),
	// 		random(0.01,0.5),
	// 		random(0,1),
	// 		random(20,100),
	// 		random(0.1,5),
	// 		random(0,0.01),
	// 		random(50,200),
	// 		random(0,360),
	// 		random(0,100),
	// 		random(0,100),
	// 		random(0,360),
	// 		random(0,100),
	// 		random(0,100),
	// 		random(0,1),
	// 		random(0,1),
	// 		random(0,1),
	// 		true
	// 		]
	// 	};
	// }
	var found = false;
	var index = 0;
	for(var i = 0; i < presetsCollection.length; i++){
		if(presetsCollection[i].name == presetName){
			found = true;
			index = i;
		}
	}
	if(found) return presetsCollection[index];
	else return presetsCollection[0];
}

// EVENT LISTENERS

setInterval(function(){
	for(var i = 0; i < instances.length; i++){
		instances[i].draw();
	}
},16);

window.addEventListener('mousemove',function(evt){
	for(var i = 0; i < instances.length; i++){
		if(instances[i].mouseInteractions)
			instances[i].mouse(evt);
	}
}, false);

window.addEventListener('resize',function(){
	for(var i = 0; i < instances.length; i++){
		if(instances[i].responsive)
			instances[i].resize();
	}
}, false);


// HELPERS

function random(min,max){
	return min+Math.random()*(max-min);
}

function plusOrMinus(){
	if (Math.random() > 0.5) return -1;
	else return 1;
}
