import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

let balance = 200;
const costPerCupInCents = 2;
const costPerAdSign = 15;
let pricePerCup = 0;
let cupsMade = 0;
let adsMade = 0;

//Weather options: sunny, cloudy or hot and dry

function getRandomInt(min: number, max: number):number{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getWeather(randomInt: number){
	//const randomInt = getRandomInt(1,3);
	if(randomInt == 1){
		return "sunny";
	}
	if(randomInt == 2){
		return "cloudy";
	}
	if(randomInt == 3){
		return "hot and dry";
	}
	return "unknown weather";
}

//Save user's spending based on: How many cups were made, Number of ad signs made

async function spendingPrompt(){
	const rl = readline.createInterface({ input, output });
	const promptCupsMade = await rl.question('Number of glasses of lemonade to make: ');
	cupsMade = parseInt(promptCupsMade, 10);

	const promptAdsMade = await rl.question('Number of advertising signs: ');
	adsMade = parseInt(promptAdsMade, 10);

	rl.close();
}

function getTotalSpending(cupsMade:number, adsMade:number){
	return (cupsMade * costPerCupInCents) + (adsMade * costPerAdSign);
}

// Calculate user earnings based on weather and price set by user

async function sellingPricePrompt(){
        const rl = readline.createInterface({ input, output });
        const promptSellingPrice = await rl.question('Cost of lemonade per glass: ');
        pricePerCup = parseInt(promptSellingPrice, 10);

        rl.close();
}

function getCupsSold(weather:string){
	let cupsSold = 0;
	if(weather == "sunny"){
		cupsSold = getRandomInt(3, 9);
	}
	if(weather == "cloudy"){
			cupsSold = getRandomInt(1, 6);
	}
	if(weather == "hot and dry"){
		cupsSold = getRandomInt(6, 15);
	}

	if(cupsSold > cupsMade){
		return cupsMade;
	}
	return cupsSold;
}

function getTotalEarned(cupsSold:number){
	return cupsSold * pricePerCup;
}

function getTotalProfit(totalEarned:number, totalSpending:number){
	const profit = totalEarned - totalSpending;
	balance += profit;
	return profit;
}

//Call functions

(async () => {
	const randomInt = getRandomInt(1,3);
	let weather:string = getWeather(randomInt);
	console.log("Today's Weather: " + weather);

	console.log('Current balance: ' + balance + ' cents.');
	console.log('Cost to make each cup is ' + costPerCupInCents + ' cents.');
	console.log('Cost to make each adversitsment sign is ' + costPerAdSign + ' cents.\n');

	await spendingPrompt();
	let totalSpent = getTotalSpending(cupsMade, adsMade);
	console.log('Total Spent This Day (In Cents): ' + totalSpent);

	await sellingPricePrompt();
	console.log('Price Per Cup (In Cents): ' + pricePerCup);

	const cupsSold = getCupsSold(weather);
	console.log('Total Cups Sold: ' + cupsSold);

	const cupsLeft = cupsMade - cupsSold;
	if(cupsLeft > 0){
		console.log('Total Cups Left: ' + cupsLeft);
	}
	else{
		console.log('Total Cups Left: 0');
	}
	
	const totalEarned = getTotalEarned(cupsSold);
	const totalSpending = getTotalSpending(cupsMade, adsMade);
	const totalProfit = getTotalProfit(totalEarned, totalSpending);
	console.log('Total profit (In Cents): ' + totalProfit);
	console.log('Final balance (In Cents): ' + balance);
})();
