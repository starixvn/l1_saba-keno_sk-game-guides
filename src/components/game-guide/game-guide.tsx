import { withTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";

import { GAMES } from "../../common/constants";
import GuideBase from "../guide-base";
import { BaseProps } from "../type";

const KenoMaxGuide = dynamic(() => import("./keno-pro-viet/keno-max"));
const KenoMiniGuide = dynamic(() => import("./keno-pro-viet/keno-mini"));
const KenoMatchGuide = dynamic(() => import("./keno-match"));
const KenoPowerGuide = dynamic(() => import("./keno-power"));


class GameGuide<P extends BaseProps> extends GuideBase<P> {

    renderGuide = () => {
        const { gameId } = this.props;
        const gameGuideProps = this.getGameGuideProps();

        switch (gameId) {
            case GAMES.KENO_EAST:
            case GAMES.KENO_WEST:
            case GAMES.KENO_SOUTH:
            case GAMES.KENO_NORTH:
            case GAMES.MEGA_KENO:
            case GAMES.MEGA_KENO_2:
                return <KenoMaxGuide key={`game-${gameId}`} {...gameGuideProps} />;
            case GAMES.KENO_MINI:
            case GAMES.KENO_MINI_2:
                return <KenoMiniGuide key={`game-${gameId}`} {...gameGuideProps} />;
            case GAMES.KENO_MATCH_1:
            case GAMES.KENO_MATCH_2:
                return <KenoMatchGuide key={`game-${gameId}`} {...gameGuideProps} />;
            case GAMES.KENO_POWER_1:
            case GAMES.KENO_POWER_2:
                return <KenoPowerGuide key={`game-${gameId}`} {...gameGuideProps} />;

            default:
                return <></>;
        }
    };
}

export default withRouter(withTranslation()(GameGuide));
