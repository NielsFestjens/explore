export class Util {
    static tween = (min: number, max: number, value: number) => {
        return min + value * max / (min || 1);
    }
}