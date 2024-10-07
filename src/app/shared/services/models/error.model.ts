import { errorMsg } from "../errorMsg";

type IndexesOfArray<A> = Exclude<keyof A, keyof []>

export type ErrorMsgIndexes = IndexesOfArray<typeof errorMsg>;