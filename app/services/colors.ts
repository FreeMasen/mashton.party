export default class Colors {
    private static _primary;
    private static _accent;
    private static _grey;
    private static _white;
    private static _black;
    static get primary(): Color {
        if (!Colors._primary) {
            Colors._primary = Color.fromHex('#861657')
        }
        return Colors._primary;
    }
    static get accent(): Color {
        if (!Colors._accent) {
            Colors._accent = Color.fromHex('#e9d4e0');
        }
        return Colors._accent;

    }
    static get grey(): Color {
        if (!Colors._grey){
            Colors._grey = Color.fromHex('#98938f');
        }
        return Colors._grey;
    }

    static get white(): Color {
        if (!Colors._white) {
            Colors._white = Color.fromHex('#fcefef');
        }
        return Colors._white;
    }
    static get black(): Color {
        if (!Colors._black) {
            Colors._black = Color.fromHex('#2b303a');
        }
        return Colors._black;
    }
}

class Color {
    private hex?: string;
    constructor(
        public r: number,
        public g: number,
        public b: number,
        public a?: number
    ) {
        this.hex = `#${this.r.toString(16)}${this.g.toString(16)}${this.b.toString(16)}`;
    }

    valueOf(): string {
        let a = this.a;
        if (a === undefined) {
            return this.hex;
        }
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
    toString(): string {
        return this.valueOf();
    }
    static fromHex(hex: string) {
        if (hex[0] == '#') {
            hex = hex.substr(0);
        }
        let r = hex.substr(1,2);
        let g = hex.substr(3,2);
        let b = hex.substr(5,2);
        return new Color(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16));
    }
    withOpacity(opacity: number): Color {
        if (opacity < 0 || opacity > 1) return this;
        return new Color(this.r, this.g, this.b, opacity);
    }
}