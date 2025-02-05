import { TFunction, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import appSettings from "../../common/app-settings";
import { BACKGROUND_THEMES, ENVIRONMENT, GAMES, locales, Themes } from "../../common/constants";
import { getLocalStorageItem, localStorageKeys, storeLocalStorageItem } from "../../common/local-storage";

type TLocalStorageData = {
    linkGuide: string;
    locale: string;
    gameId: number;
    theme: string;
    environment: string;
    minBet: number;
    maxBet: number;
    isShowConfig: number;
};

const SelectOptions = (listData: Object, setData: Function, value: string) => {
    return (
        <div>
            <select className="form-select form-select-lg mb-3" value={value} onChange={(event) => setData(event.target.value)}>
                {Object.values(listData).map((data, index) => {
                    return (
                        <option key={index} value={data}>
                            {data}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

const renderGameName = (setGameId: Function, t: TFunction, gameId: number, environment: string) => {
    const getGameFollowEnv = () => {
        return Object.values(GAMES);
    };
    return (
        <div>
            <select
                className="form-select form-select-lg mb-3"
                value={gameId}
                onChange={(event) => setGameId(+event.target.value)}
                style={{ textTransform: "capitalize" }}
            >
                {Object.values(appSettings.gameSettings)
                    .filter((item) => getGameFollowEnv().includes(+item.id))
                    .map((guide, index) => {
                        return (
                            <option key={index} value={guide.id}>
                                {t(guide.gameName.toLocaleLowerCase())}
                            </option>
                        );
                    })}
            </select>
        </div>
    );
};

const Demo = () => {
    const { t } = useTranslation();
    const configsRef = useRef<HTMLDivElement | null>(null);
    const [linkGuide, setLinkGuide] = useState<string>("");
    const [locale, setLocale] = useState<string>(locales.en);
    const [gameId, setGameId] = useState<number>(GAMES.MEGA_KENO);
    const [theme, setTheme] = useState<string>(Themes.dark);
    const [environment, setEnvironment] = useState<string>(ENVIRONMENT.sk);
    const [minBet, setMinBet] = useState<number>(0);
    const [maxBet, setMaxBet] = useState<number>(2000);
    const [isShowConfig, setIsShowConfig] = useState<boolean>(true);
    const [heighIframeGuide, setHeighIframeGuide] = useState<number>(0);
    const [backgroundIframe, setBackgroundIframe] = useState<string>("");
    const [isInputId, setIsInputId] = useState<boolean>(false);

    useEffect(() => {
        const configs: TLocalStorageData = getLocalStorageItem(localStorageKeys.configs);
        if (configs) {
            setLinkGuide(configs.linkGuide ?? "");
            setLocale(configs.locale ?? locales.en);
            setGameId(configs.gameId ?? GAMES.MEGA_KENO);
            setTheme(configs.theme ?? Themes.dark);
            setEnvironment(configs.environment ?? ENVIRONMENT.sk);
            setMinBet(configs.minBet ?? 0);
            setMaxBet(configs.maxBet ?? 2000);
            setIsShowConfig(configs.isShowConfig ? true : false);
        }
    }, []);

    useEffect(() => {
        if (locale && gameId && theme && environment) {
            let data = `${locale}?gId=${gameId}&t=${theme}&minBet=${minBet}&maxBet=${maxBet}&c=0`;
            environment !== ENVIRONMENT.sk && (data += `&f=${environment}`);
            setLinkGuide(`${window.location.origin}/${data}`);
            setBackgroundIframe(BACKGROUND_THEMES?.[theme]);

            storeLocalStorageItem(localStorageKeys.configs, {
                linkGuide,
                locale,
                gameId,
                theme,
                environment,
                minBet,
                maxBet,
                isShowConfig: isShowConfig ? 1 : 0,
            });
        }
    }, [locale, gameId, theme, environment, minBet, maxBet, isShowConfig]);

    useEffect(() => {
        setHeighIframeGuide(window.innerHeight - (configsRef?.current?.clientHeight ?? 0));
    }, [configsRef, isShowConfig]);

    return (
        <div id="container-guide" className="container-guide">
            <div id="configs" style={{ display: "block" }}>
                <div className="container" style={{ paddingBottom: 20, paddingTop: 20 }} ref={configsRef}>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setIsShowConfig(!isShowConfig)}
                        style={{ fontSize: 14, marginBottom: 10 }}
                    >
                        {isShowConfig ? "Collapse Configs" : "Expand Configs"}
                    </button>
                    <div className="col-8">
                        <div className="row">
                            <div className="col">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        id="input-id"
                                        className="form-check-input"
                                        onClick={() => setIsInputId(!isInputId)}
                                    />
                                    <label className="form-check-label" htmlFor="input-id">
                                        Input Id
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                {isInputId ? (
                                    <input
                                        type="number"
                                        className="form-control"
                                        onChange={(e: any) => setGameId(e.target.value)}
                                        value={gameId}
                                    ></input>
                                ) : (
                                    renderGameName(setGameId, t, gameId, environment)
                                )}
                            </div>
                            <div className="col"> {SelectOptions(locales, setLocale, locale)}</div>
                        </div>
                    </div>
                    <div className={isShowConfig ? "show" : "hide"}>
                        <div className="col-8">
                            <div className="row">
                                <div className="col">{SelectOptions(Themes, setTheme, theme)} </div>
                                <div className="col"> {SelectOptions(ENVIRONMENT, setEnvironment, environment)}</div>
                            </div>
                        </div>
                        <div className="row">
                            <h4>User stake level</h4>
                            <div className="col-8">
                                <div className="input-group">
                                    <span className="input-group-text" style={{ fontSize: 14 }}>
                                        Min bet and Max bet
                                    </span>
                                    <input
                                        type="number"
                                        min={0}
                                        className="form-control"
                                        value={minBet}
                                        onChange={(event) => setMinBet(+event.target.value)}
                                        style={{ fontSize: 14 }}
                                    ></input>
                                    <input
                                        type="number"
                                        min={0}
                                        className="form-control"
                                        value={maxBet}
                                        onChange={(event) => setMaxBet(+event.target.value)}
                                        style={{ fontSize: 14 }}
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            Link Guide:{" "}
                            <a href={linkGuide} rel="noopener noreferrer" target="_blank">
                                {linkGuide}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {linkGuide && (
                <iframe
                    key={uuidv4()}
                    className={"guide-iframe"}
                    src={linkGuide}
                    referrerPolicy="strict-origin-when-cross-origin"
                    height={heighIframeGuide}
                    width={window.innerWidth}
                    style={{ border: "none", paddingBottom: "20px", background: backgroundIframe }}
                />
            )}
        </div>
    );
};

export const getStaticProps = async ({ locale = "en" }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
};

export default Demo;
