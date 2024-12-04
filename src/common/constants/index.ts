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
    KENO_MINI: 14,
    KENO_MINI_2: 15,
    KENO_EAST: 16,
    KENO_WEST: 17,
    KENO_SOUTH: 18,
    KENO_NORTH: 19,
    KENO_MATCH_1: 36,
    KENO_MATCH_2: 37,
    KENO_POWER_1: 40,
    KENO_POWER_2: 41,
    MEGA_KENO: 52,
    MEGA_KENO_2: 53
};

export const TolgeeConfig = {
    url: "https://tolgee.sabagame.com/",
    key: "tgpak_gjpxe3jsoe2xgy3lgezgiolwoy4gy5twgrtwqz3pgrtwq",
    projectId: "2",
};

