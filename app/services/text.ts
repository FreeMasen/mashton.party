
/**A service for formatting text */
export default class Text {
    static twoDigits(num) {
        return `0${num}`.substr(-2);
    }
}