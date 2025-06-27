const choicesMaxBet = {
    big: 2000,
    small: 2000,
    odd: 2000,
    even: 2000,
    gold: 500,
    wood: 1500,
    water: 2000,
    fire: 1500,
    earth: 500,
};
const odds = {
    big: 1.98,
    small: 1.94,
    odd: 1.96,
    even: 1.96,
    gold: 9.2,
    wood: 4.6,
    water: 2.4,
    fire: 4.6,
    earth: 9.2,
};

const GameConfigs = {
    maxBetPerChoices: choicesMaxBet,
    maxBet: 2000,
    minBet: 1,
    odds: odds,
};

export default GameConfigs;
