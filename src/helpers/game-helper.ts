import { TolgeeInstance } from "@tolgee/react";

const handleLanguage = async (tolgee: TolgeeInstance, locale: string, setIsLoading: (status: boolean) => void) => {
    await tolgee.changeLanguage(locale);
    setIsLoading(false);
};

export { handleLanguage };
