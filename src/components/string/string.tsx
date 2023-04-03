import { ChangeEvent, FormEvent, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { maxLengthString } from "../../constants/min-max";
import { delay, swap, stateCircleIndex } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './string.module.css';

export const StringComponent = () => {
  const [stringInput, setStringInput] = useState<string>('');
  const [stringArray, setStringArray] = useState<string[]>([]);
  const [btnLoader, setBtnLoader] = useState({ add: false });
  const [btnDisabled, setBtnDisabled] = useState({ add: true });
  const [stateIndex, setStateIndex] = useState({start: 0, end: 0});

  const stringReverse = async (string: string) => {
    const split = string.split('');
    setStringArray([...split]); 

    let start = 0;
    let end = split.length - 1;

    while (start <= end) {
      setStateIndex({start: start, end: end});
      await delay(SHORT_DELAY_IN_MS);

      swap(split, start, end); // Здесь мы поменяли значения местами и вернули результат обратно в split
      setStringArray([...split]); // перезаписали

      end--;
      start++;
      await delay(SHORT_DELAY_IN_MS);
    }

    setStateIndex({start: split.length, end: split.length});
    setBtnLoader({...btnLoader, add: false});
  }


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setBtnLoader({...btnLoader, add: true});
    setBtnDisabled({...btnDisabled, add: true}); 
    stringReverse(stringInput);
    setStringInput('');
  }


  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target.value;
    setStringInput(target);
    setBtnDisabled({...btnDisabled, add: target ? false : true}); 
  }

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          maxLength={maxLengthString}
          isLimitText={true}
          placeholder="Введите значение"
          onChange={onChange}
          value={stringInput}
        />
        <Button
          type="submit"
          text={'Развернуть'}
          isLoader={btnLoader.add}
          disabled={btnDisabled.add}
        />
      </form>

      {stringArray && 
        <ul className={styles.list}>
          {stringArray.map((item, index) => {
            return (
              <li key={index}>
                <Circle 
                  state={
                    stateCircleIndex(stateIndex.start, stateIndex.end, index)
                  }
                  letter={item}
                  />
              </li>
            )
          })}
        </ul>
      }
    </SolutionLayout>
  );
};
