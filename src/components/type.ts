import { WithTranslation } from "next-i18next";
import { WithRouterProps } from "next/dist/client/with-router";
import { GameConfigs, UserStakeLevelProps } from "../pages";

export type BaseProps = {
    name: string;
    gameId: number;
    userStakeLevel: UserStakeLevelProps | undefined;
    locale: string;
    gameConfigs: GameConfigs | any;
    dynamic: boolean;
    isGetGameConfigs: boolean;
    isScrollMD5: boolean;
    environment: string;
    isInPromotionTime: boolean;
    fractionalOddsFormat: boolean;
    gameSetting: any;
    displayName: string;
    jackpot: boolean;
    scrollToId: string;
} & WithTranslation &
    WithRouterProps;
