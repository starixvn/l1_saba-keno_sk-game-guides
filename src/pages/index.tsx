import { NextPageContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import appSettings from "../common/app-settings";
import { ENVIRONMENT, buildVersion } from "../common/constants";
import { ImgVersionProvider } from "../contexts/img-version";
import { checkIsInteger } from "../helpers/number-helper";

const GameGuide = dynamic(() => import("../components/game-guide/game-guide"));

export interface UserStakeLevelProps {
    minBet?: number;
    maxBet?: number;
}

export type GameConfigs = {
    maxBetPerChoices?: any;
    enableFreeBet?: boolean;
    maxBet?: number;
    minBet?: number;
    odds?: any;
    originalOdds?: any;
};

const handleUserStakeLevel = (queryParams: object | any, setUserStakeLevel: Function) => {
    if (queryParams?.minBet && queryParams?.maxBet) {
        setUserStakeLevel({ minBet: checkIsInteger(queryParams.minBet), maxBet: checkIsInteger(queryParams.maxBet) });
    }
};

const FontLocaleMapper: { [key: string]: string } = {
    th: "Noto-Thai",
    zh_cn: "Noto-ZH-CN",
    zh_tw: "Noto-ZH-TW",
};

const changeFontFamilyFollowLanguage = (locale: string, env: string, gameId: number, gameType = 0) => {
    let fontFamily = FontLocaleMapper[locale] ?? "Noto";

    if (env === ENVIRONMENT.sk) {
        fontFamily = "SanFranciscoDisplay";
    }

    document.documentElement.style.fontFamily = fontFamily;
    document.body.style.fontFamily = fontFamily;
};

const handleEnv = (queryParams: object | any) => {
    if (queryParams?.f) {
        return queryParams.f;
    }

    return ENVIRONMENT.sk;
};

const Home: React.FC<{ gameSetting: any }> = ({ gameSetting }) => {
    const { setTheme } = useTheme();
    const [gameId, setGameId] = useState<number>(0);
    const [userStakeLevel, setUserStakeLevel] = useState<UserStakeLevelProps>({});
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState<string>("");
    const router = useRouter();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [gameConfigs, setGameConfigs] = useState<GameConfigs>();
    const [dynamic, setDynamic] = useState<boolean>(true);
    const [isGetGameConfigs, setIsGetGameConfigs] = useState<boolean>(true);
    const [isScrollMD5, setIsScrollMD5] = useState<boolean>(false);
    const [environment, setEnvironment] = useState<string>(ENVIRONMENT.sk);
    const [isInPromotionTime, setIsInPromotionTime] = useState<boolean>(false);
    const [fractionalOddsFormat, setFractionalOddsFormat] = useState<boolean>(false);
    const [displayName, setDisplayName] = useState<string>("");
    const [jackpot, setJackpot] = useState<boolean>(false);
    const [scrollToId, setScrollToId] = useState<string>("");

    const getTemplateFollowEnv = () => {
        const props = {
            gameId,
            locale: router?.locale ?? "en",
            userStakeLevel,
            name,
            gameConfigs,
            dynamic,
            isScrollMD5,
            isGetGameConfigs,
            environment,
            isInPromotionTime,
            fractionalOddsFormat,
            gameSetting,
            displayName,
            jackpot,
            scrollToId,
        };

        return <GameGuide {...props} />;
    };

    useEffect(() => {
        const checkIsInteger = (number: string | number | object) => {
            return Number.isInteger(+number) ? +number : 0;
        };

        const bindEvent = (element: any, eventName: any, eventHandler: any) => {
            if (element.addEventListener) {
                element.addEventListener(eventName, eventHandler, false);
            } else if (element.attachEvent) {
                element.attachEvent(`on${eventName}`, eventHandler);
            }
        };

        if (router.isReady) {
            const queryParams: object | any = router.query;
            const env = handleEnv(queryParams);
            const gameId = checkIsInteger(queryParams?.gId);
            setIsLoading(false);
            setGameId(gameId);
            changeFontFamilyFollowLanguage(router?.locale ?? "en", env, gameId, gameSetting.Type);
            setEnvironment(env);
            setName(queryParams?.name);
            setIsInPromotionTime(queryParams?.p === "true");
            setFractionalOddsFormat(queryParams?.fof === "true");
            setDisplayName(queryParams?.displayName);
            queryParams?.t && setTheme(queryParams.t.toString());
            handleUserStakeLevel(queryParams, setUserStakeLevel);
            if (queryParams?.dy) {
                +queryParams?.dy === 0 && setDynamic(false);
            }
            queryParams?.jackpot && queryParams?.jackpot === "true" && setJackpot(true);
            queryParams?.c && +queryParams?.c === 0 && setIsGetGameConfigs(false);
            queryParams?.md5 && +queryParams?.md5 === 1 && setIsScrollMD5(true);
            queryParams?.scrollToId && setScrollToId(queryParams.scrollToId);
        }

        bindEvent(window, "message", function (event: any) {
            event?.data && typeof event?.data === "string" && setGameConfigs(JSON.parse(event.data));
        });
    }, [router.isReady]);

    if (isLoading) {
        return <></>;
    }

    return (
        <ImgVersionProvider value={{ imgVersion: buildVersion }}>
            <div ref={wrapperRef} id="container-guide" className="container-guide">
                {!isGetGameConfigs ? getTemplateFollowEnv() : gameConfigs && getTemplateFollowEnv()}
            </div>
        </ImgVersionProvider>
    );
};

const getGameSetting = async (gameId: number) => {
    if (gameId) {
        try {
            const response = await fetch(`${appSettings.gameSettingUrl}${+gameId}`);

            if (response.ok) {
                return await response.json();
            } else {
                return {};
            }
        } catch (err) {
            return {};
        }
    }

    return {};
};

export const getServerSideProps = async (context: NextPageContext) => {
    const gameId = context.query?.gId ?? 0;

    return {
        props: {
            gameSetting: await getGameSetting(+gameId),
            ...(await serverSideTranslations(context.locale ?? "en", ["common"])),
        },
    };
};

export default Home;
