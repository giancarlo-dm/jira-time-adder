export class LoggedTimeHelper {
    static #idSequence: number = 1;

    static generateIdSequence(): number {
        return LoggedTimeHelper.#idSequence++;
    }
}
