import { Markup } from "interweave";
import { ENVIRONMENT } from "../../../../../common/constants";
import MD5 from "../../../base/md5";
import Styles from "../keno-max.module.scss";

export default class KenoMD5 extends MD5 {
    renderStep1() {
        return this.renderStep1OnMobile();
    }

    renderStep1OnMobile() {
        const { example } = this.state.translationResource;
        const { md5Key } = this.props;

        return (
            <li>
                {<Markup content={example.step1Text} />}
                {this.buildTwoFirstStepsContentOnMobile(example.md5Key, md5Key)}
            </li>
        );
    }

    renderStep2() {
        return this.renderStep2OnMobile();
    }

    renderStep2OnMobile() {
        const { example } = this.state.translationResource;
        const { md5Result } = this.props;

        return (
            <li>
                {<Markup content={example.step2Text} />}
                {this.buildTwoFirstStepsContentOnMobile(example.result, md5Result)}
                <div>{this.props.note}</div>
            </li>
        );
    }

    buildTwoFirstStepsContentOnMobile(title?: string, content?: string) {
        const { example } = this.state.translationResource;

        return (
            <div className={Styles["md5-section"]}>
                <span className={`${Styles["text"]}`}>
                    <strong>{title}:</strong> {content}
                </span>
                <div className={Styles["copy-box"]}>
                    <span className={Styles["copy-text"]}>{example.copy}</span>
                </div>
            </div>
        );
    }
}
