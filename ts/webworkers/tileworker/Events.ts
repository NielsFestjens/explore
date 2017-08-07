import { Vector2 } from "shared/Vector2";

export class CreatedTree {
    public name = "CreatedTree";

    constructor(
        public tileIndex?: Vector2,
        public age?: number,
        public seed?: number
    ) { }
}

export class UpdatedTree {
    public name = "UpdatedTree";

    constructor(
        public tileIndex?: Vector2,
        public age?: number
    ) { }
}