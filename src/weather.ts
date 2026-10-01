//This file randomly generates the weather for the day

//Weather options: sunny, cloudy or hot and dry

function getRandomInt(min: number, max: number):number{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getWeather(){
	const randomInt = getRandomInt(1,3);
	if(randomInt == 1){
		return "sunny";
	}
	if(randomInt == 2){
		return "cloudy";
	}
	if(randomInt == 3){
		return "hot and dry";
	}
	return "unknown weather"
}

let weather:string = getWeather();
console.log(weather);
