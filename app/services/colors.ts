import Text from './text';
/*
$primary: #560018;
$accent: #b49c41;
$grey: #474448;
$white: #eeeeee;
$black: #1d2951;
*/
/**
 * A service for keeping the app's colors in order
 */
export default class Colors {
    private static _primary;
    private static _accent;
    private static _grey;
    private static _white;
    private static _black;
    static get primary(): Color {
        if (!Colors._primary) {
            Colors._primary = Color.fromHex('#560018')
        }
        return Colors._primary;
    }
    static get accent(): Color {
        if (!Colors._accent) {
            Colors._accent = Color.fromHex('#b49c41');
        }
        return Colors._accent;
    }
    static get grey(): Color {
        if (!Colors._grey){
            Colors._grey = Color.fromHex('#474448');
        }
        return Colors._grey;
    }

    static get white(): Color {
        if (!Colors._white) {
            Colors._white = Color.fromHex('#eeeeee');
        }
        return Colors._white;
    }
    static get black(): Color {
        if (!Colors._black) {
            Colors._black = Color.fromHex('#1d2951');
        }
        return Colors._black;
    }
}
/**A color to provide to css */
class Color {
    /**The cached hex string for this color */
    private hex?: string;
    constructor(
        public r: number,
        public g: number,
        public b: number,
        public a?: number
    ) {
        //Parse each of the numbers into hex pairs
        let rs = Text.twoDigits(this.r.toString(16));
        let gs = Text.twoDigits(this.g.toString(16));
        let bs = Text.twoDigits(this.b.toString(16));
        //cache the hex string for this color
        this.hex = `#${rs}${gs}${bs}`;
    }
    /**override the default valueOf function to provide the css value */
    valueOf(): string {
        let a = this.a;
        if (a === undefined) {
            return this.hex;
        }
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
    /**override the default toString function to provide the css value */
    toString(): string {
        return this.valueOf();
    }
    /**An alternate constructor for using a hex string to build a color */
    static fromHex(hex: string) {
        if (hex[0] == '#') {
            hex = hex.substr(0);
        }
        let r = hex.substr(1,2);
        let g = hex.substr(3,2);
        let b = hex.substr(5,2);
        return new Color(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16));
    }
    /**Return this color with the opacity applied */
    withOpacity(opacity: number): Color {
        if (opacity < 0 || opacity > 1) return this;
        return new Color(this.r, this.g, this.b, opacity);
    }
}