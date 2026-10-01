//Save user's spending based on: How many cups were made, Number of ad signs made
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const costPerCupInCents = 2;
const costPerAdSign = 15;
let cupsMade = 0;
let adsMade = 0;

async function spendingPrompt(){
	const rl = readline.createInterface({ input, output });
	const promptCupsMade = await rl.question('Number of glasses of lemonade to make: ');
	cupsMade = parseInt(promptCupsMade, 10);

	const promptAdsMade = await rl.question('Number of advertising signs: ');
	adsMade = parseInt(promptAdsMade, 10);

	rl.close();
}

function totalSpending(cupsMade, adsMade){
	return (cupsMade * costPerCupInCents) + (adsMade * costPerAdSign);
}

(async () => {
	await spendingPrompt();
	console.log('Cups Made: ' + cupsMade);
	console.log('Ad Signs Made: ' + adsMade);
	let totalSpent = totalSpending(cupsMade, adsMade);
	console.log('Total Spent This Day: ' + totalSpent);
})();

