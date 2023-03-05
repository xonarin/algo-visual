import { debug } from "console";
import { ChangeEvent, FormEvent, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay, swap, stateCircleIndex } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './string.module.css';

export const StringComponent = () => {
  const [stringInput, setStringInput] = useState<string>('');
  const [stringArray, setStringArray] = useState<string[]>([]);
  const [btnLoader, setBtnLoader] = useState({ add: false, remove: false });
  const [btnDisabled, setBtnDisabled] = useState({ add: true });
  const [stateIndex, setStateIndex] = useState({start: 0, end: 0});

  const stringReverse = async (string: string) => {
    const split = string.split('');
    setStringArray([...split]);
    console.log(stringArray); 

    let start = 0;
    let end = split.length - 1;
    const middle = Math.floor((start + end) / 2);

    while (start <= end) {
      setStateIndex({start: start, end: end});
      await delay(SHORT_DELAY_IN_MS);

      debugger
      swap(split, start, end); // Здесь мы поменяли значения местами и вернули результат обратно в split
      debugger
      setStringArray([...split]); // перезаписали
      debugger

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
          maxLength={11}
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
                {item}
                <Circle 
                  state={
                    stateCircleIndex(stateIndex.start, stateIndex.end, index)
                  }
                  letter={item}/>
              </li>
            )
          })}
        </ul>
      }
    </SolutionLayout>
  );
};
