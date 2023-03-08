import { ElementStates } from "../types/element-states";

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


//https://practicum.yandex.ru/trainer/web-plus/lesson/d6073f1f-0822-49b3-b9d4-94be6d747467/?searchedText=swap
export const swap = (arr: any[], start: number, end: number): void => {
    const temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
}


export const stateCircleIndex = (start: number, end: number, index: number): ElementStates => {
    if (start === 0 && end === 0) {
        return ElementStates.Default
    }

    if (index === start || index === end) {
        return ElementStates.Changing
    }

    if (index < start || index > end) {
        return ElementStates.Modified
    }

    return ElementStates.Default;
}

export const random = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}