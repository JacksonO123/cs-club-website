import { PointHistory } from "./interfaces";
export class User {
    uid: string;
    name: string;
    points: number;
    history: PointHistory[];
    constructor(uid: string, name: string, points: number, history: PointHistory[]) {
        this.uid = uid;
        this.name = name;
        this.points = points;
        this.history = history;
    }
}