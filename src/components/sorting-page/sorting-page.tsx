import { ChangeEvent, useEffect, useState } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates, IArray, IArraySort } from "../../types/element-states";
import { SortingTypes } from "../../types/sorting";
import { delay, random } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting.module.css';
import { generateBubbleSort, generateSelectionSort } from "./utils";

export const SortingPage = () => {
  const [array, setArray] = useState<IArraySort[]>([]);
  const [copyArray, setCopyArray] = useState<IArraySort[]>([]);
  const [radioChecked, setRadioChecked] = useState({ selection: true, bubble: false });
  const [btnLoader, setBtnLoader] = useState({ ascending: false, descending: false, arrload: false });

  useEffect(() => {
    randomArray();
  }, []);

  const randomArray = () => {
    setBtnLoader({...btnLoader, arrload: true});
    let sortArray = [];
    let sortLength = random(3, 17);
    
    for (let i = 0; i <= sortLength; i++) {
      sortArray.push({ value: (random(0, 100)), state: ElementStates.Default });
    }
    
    setArray([...sortArray]);
    setCopyArray([...sortArray]);
    setBtnLoader({...btnLoader, arrload: false});
  }

  const onChangeSorting = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setRadioChecked({ selection: true, bubble: false });
    }
  }

  const onChangeBubble = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setRadioChecked({ selection: false, bubble: true });
    }
  }

  const selectionSort = async (arr: IArraySort[], type: SortingTypes) => {
    const generator = generateSelectionSort(arr, type);
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i; j < arr.length; j++) {
        setArray(generator.next().value);
        await delay(DELAY_IN_MS);
        setArray(generator.next().value);
      }
    }
    setArray(generator.next().value);
    setBtnLoader({ ...btnLoader, ascending: false, descending: false });
  }


  const bubbleSort = async (arr: IArraySort[], type: SortingTypes) => {
    const generator = generateBubbleSort(arr, type);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        setArray(generator.next().value);
        await delay(DELAY_IN_MS);
      }
    }
    setArray(generator.next().value);
    setBtnLoader({ ...btnLoader, ascending: false, descending: false });
  }


  const handleClickAscending = () => {
    setBtnLoader({ ...btnLoader, ascending: true, descending: false });
    (radioChecked.selection) ? selectionSort(copyArray, SortingTypes.Ascending) : bubbleSort(copyArray, SortingTypes.Ascending);
  }

  const handleClickDescending = () => {
    setBtnLoader({ ...btnLoader, ascending: false, descending: true });
    (radioChecked.selection) ? selectionSort(copyArray, SortingTypes.Descending) : bubbleSort(copyArray, SortingTypes.Descending);
  }


  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
        <div className={styles.radio}>
          <RadioInput 
            label="Выбор" 
            name="sorting"
            onChange={onChangeSorting}
            defaultChecked 
            disabled={btnLoader.descending || btnLoader.ascending ? true : false}
          />
          <RadioInput 
            label="Пузырёк" 
            name="sorting"
            onChange={onChangeBubble}
            extraClass={styles.ml40} 
            disabled={btnLoader.descending || btnLoader.ascending ? true : false}
          />

        </div>

        <div className={styles.buttons}>
          <Button
              text="По возрастанию"
              onClick={handleClickAscending}
              sorting={Direction.Ascending}
              isLoader={btnLoader.ascending}
              disabled={btnLoader.descending}
            />

            <Button
              text="По убыванию"
              onClick={handleClickDescending}
              sorting={Direction.Descending}
              isLoader={btnLoader.descending}
              disabled={btnLoader.ascending}
            />
          
          <Button
            text="Новый массив"
            onClick={randomArray}
            extraClass={styles.ml80} 
            isLoader={btnLoader.arrload}
            disabled={btnLoader.descending || btnLoader.ascending ? true : false}
          />
        </div>
      </div>


      <ul className={styles.list}>
        {array &&
          array.map((item, index) => {
            return (
              <li key={index}>
                <Column index={item.value} state={item.state} />
              </li>
            )
          })
        }


      </ul>
    </SolutionLayout>
  );
};
