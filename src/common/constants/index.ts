export interface IObjectKeys {
    [key: string]: string;
}

export const locales: IObjectKeys = { en: "en", vi: "vi", th: "th", id: "id", zh_cn: "zh_cn", zh_tw: "zh_tw" };
export const Themes = {
    light: "light",
    dark: "dark",
    blue: "blue",
};

export const BACKGROUND_THEMES: IObjectKeys = {
    [Themes.light]: "#FFF",
    [Themes.dark]: "transparent",
    [Themes.blue]: "#000",
};

export const ENVIRONMENT = { sk: "sk" };

export const buildVersion = process.env.buildVersion;

export const GAMES = {
    MEGA_KENO: 1501,
    MEGA_KENO_2: 1502,
    KENO_MINI: 1503,
    KENO_MINI_2: 1504,
    KENO_EAST: 1505,
    KENO_WEST: 1506,
    KENO_SOUTH: 1507,
    KENO_NORTH: 1508,
    KENO_POWER: 1509,
    KENO_POWER_2: 1510,
    KENO_SOCCER: 1511,
    KENO_SOCCER_2: 1512
};

export const TolgeeConfig = {
    url: "https://tolgee.sabagame.com/",
    key: "tgpak_gjpxe3jsoe2xgy3lgezgiolwoy4gy5twgrtwqz3pgrtwq",
    projectId: "2",
};

