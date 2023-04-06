import { ElementStates, IArraySort } from '../../types/element-states';
import { SortingTypes } from '../../types/sorting';
import {generateBubbleSort, generateSelectionSort} from './utils';


describe('Тест сортировки', () => {
    const array: IArraySort[] = [];
    const arrayWithOneElement = [
        { value: 1, state: ElementStates.Default }
    ];
    const resultOneElement = 
    [
        { value: 1, state: ElementStates.Modified }
    ];

    const arrayWithElements = 
    [
        { value: 1, state: ElementStates.Default },
        { value: 3, state: ElementStates.Default },
        { value: 2, state: ElementStates.Default }
    ];

    const resultAsceding = [
        { value: 1, state: ElementStates.Modified },
        { value: 2, state: ElementStates.Modified },
        { value: 3, state: ElementStates.Modified }
    ];

    const resultDesceding = [
        { value: 3, state: ElementStates.Modified },
        { value: 2, state: ElementStates.Modified },
        { value: 1, state: ElementStates.Modified }
    ];

    const sortingTest = (
        arr: IArraySort[],
        resultArrAscending: IArraySort[],
        resultArrDescending: IArraySort[],
        generator: typeof generateSelectionSort | typeof generateBubbleSort
    ) => {
        const generatorAscending = generator(arr, SortingTypes.Ascending);
        let resultAsceding = generatorAscending.next();

        while (!resultAsceding.done) {
            resultAsceding = generatorAscending.next();
        }

        expect(resultAsceding.value).toEqual(resultArrAscending);

        const generatorDescending = generator(arr, SortingTypes.Descending);
        let resultDesceding = generatorDescending.next();

        while (!resultDesceding.done) {
            resultDesceding = generatorDescending.next();
        }

        expect(resultDesceding.value).toEqual(resultArrDescending);
    }


    it('Тест на пустой массив', () => {
        sortingTest(array, array, array, generateBubbleSort);
        sortingTest(array, array, array, generateSelectionSort);
    })

    it('Тест на массив с 1 элементом', () => {
        sortingTest(arrayWithOneElement, resultOneElement, resultOneElement, generateBubbleSort);
        sortingTest(arrayWithOneElement, resultOneElement, resultOneElement, generateSelectionSort);
    })

    it('Тест на массив с несколькими элементами', () => {
        sortingTest(arrayWithElements, resultAsceding, resultDesceding, generateBubbleSort);
        sortingTest(arrayWithElements, resultAsceding, resultDesceding, generateSelectionSort);
    })
})