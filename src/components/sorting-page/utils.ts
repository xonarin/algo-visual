import { ElementStates, IArraySort } from "../../types/element-states";
import { SortingTypes } from "../../types/sorting";
import { swap } from "../../utils/utils";

export const compare = (a: Number, b: number, type: SortingTypes) => {
    if (type === SortingTypes.Descending) {
        return a < b
    } else {
        return a > b
    }
}

export function* generateBubbleSort(arr: IArraySort[], type: SortingTypes): Generator<IArraySort[]> {
    if (arr.length < 1) {
        return []
    }

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            arr[j].state = ElementStates.Changing;
            arr[j + 1].state = ElementStates.Changing;
            yield ([...arr]);

            if (compare(arr[j].value, arr[j + 1].value, type)) {
                swap(arr, j, j + 1);
            }

            arr[j].state = ElementStates.Default;
            arr[j + 1].state = ElementStates.Default;
        }
        arr[arr.length - 1 - i].state = ElementStates.Modified;
    }

    return [...arr];
}

export function* generateSelectionSort(arr: IArraySort[], type: SortingTypes): Generator<IArraySort[]> {
    if (arr.length < 1) {
        return []
    }

    let min = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        arr[i].state = ElementStates.Changing;
        min = i;
        for (let j = i; j < arr.length; j++) {
            arr[j].state = ElementStates.Changing;
            yield ([...arr]);

            if (compare(arr[min].value, arr[j].value, type)) {
                min = j;
            }

            if (i !== j) {
                arr[j].state = ElementStates.Default;
            }
            yield ([...arr]);
        }
        if (min !== i) {
            swap(arr, min, i);
        }
        arr[i].state = ElementStates.Modified;
    }
    arr[arr.length - 1].state = ElementStates.Modified;
    return [...arr];
}