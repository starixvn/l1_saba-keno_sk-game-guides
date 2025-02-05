import { baseTermAndConditionEn } from "../../../base/terms-and-conditions/languages/en";
import { IKenoTranslationResource } from "./types";
export const en: IKenoTranslationResource = {
    introduction: {
        title: "Introduction",
        description:
            "Mega Keno / Mega Keno 2 / Keno North / Keno South / Keno West / Keno East are the RNG Keno with 80 balls. There are 20 balls drawn randomly from 80 numbered balls ranging from 1 to 80. Players place bets on one or more betting options shown on the game table. The total sum of the 20 numbered balls drawn will determine the player’s win or loss.",
    },
    gameRules: {
        title: "Game Rules",
        description: {
            lines: [
                "All bets must be placed before the betting time expires. Note, placed bets cannot be canceled.",
                "Once the betting time has expired, the result will be shown.",
            ],
            maximum: "The maximum total stake per round is {0}",
            otherLine: undefined,
        },
    },
    bettingOptions: {
        title: "Betting Options",
        bigSmall: {
            title: "Big/Small",
            descriptions: [
                "<b>Big:</b> The sum of the 20 numbered balls drawn is >= 811",
                "<b>Small:</b> The sum of the 20 numbered balls drawn is <= 810",
            ],
            winningText: "Players bet on BIG will win.",
        },
        oddEven: {
            title: "Odd/Even",
            descriptions: [
                "<b>Odd:</b> the sum of the 20 numbered balls drawn is an odd number.",
                "<b>Even:</b> the sum of the 20 numbered balls drawn is an even number.",
            ],
            winningText: "Players bet on EVEN will win.",
        },
        fiveElement: {
            title: "Five Elements (Gold, Wood, Water, Fire, Earth)",
            descriptions: [
                "<b>Gold:</b> The sum of the 20 numbered balls drawn, ranges from 210 to 695.",
                "<b>Wood:</b> The sum of the 20 numbered balls drawn, ranges from 696 to 763.",
                "<b>Water:</b> The sum of the 20 numbered balls drawn, ranges from 764 to 855.",
                "<b>Fire:</b> The sum of the 20 numbered balls drawn, ranges from 856 to 923.",
                "<b>Earth:</b> The sum of the 20 numbered balls drawn, ranges from 924 to 1410.",
            ],
            winningText: "Players bet on WOOD will win.",
        },
        example: {
            description: "<b>Example:</b> Set of 20 numbered balls drawn randomly from 80 numbered balls",
            drawResult: "Draw Results",
            totalSum: "Total Sum",
        },
    },
    payouts: {
        title: "Payouts",
        descriptions: [
            "The winning amount is calculated according to the betting odds.",
            "The Payout includes the initial stake.",
            "All winning amounts are instantly added to your account balance when bets are settled.",
        ],
        options: "Options",
        odds: "Odds",
        betLimit: "Bet Limit",
        min: "Min",
        max: "Max",
        big: "Big",
        small: "Small",
        odd: "Odd",
        even: "Even",
        gold: "Gold",
        wood: "Wood",
        water: "Water",
        fire: "Fire",
        earth: "Earth",
    },
    md5: {
        image1: "/static/images/mega-keno/md5_step1_en.png",
        image2: "/static/images/mega-keno/md5_step2_en.png",
        note: "Noted: 363 is the total point of the game result.",
    },
    termsAndConditions: baseTermAndConditionEn,
};
