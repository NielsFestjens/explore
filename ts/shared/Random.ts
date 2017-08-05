export class Random {
    public seed: number;
    static static: Random = new Random(Math.random());

    constructor(seed: number) {
        this.seed = seed;
    }

    next() {
        var x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    }

    nextBetween(min: number, max: number) {
        if (min === max)
            return (min);
        
        var next = this.next();
        return ((next * (max - min)) + min);
    };
}