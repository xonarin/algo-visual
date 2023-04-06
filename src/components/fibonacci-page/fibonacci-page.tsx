import { useState, FormEvent, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import styles from './fibonacci-page.module.css';
import { getFibonacciNumbers } from "./utils";
import { maxFibonacciInput, minFibonacciInput } from "../../constants/min-max";

export const FibonacciPage = () => {
  const [value, setValue] = useState<number | string>('');
  const [btnLoader, setBtnLoader] = useState<boolean>(false);
  const [fibonacciArray, setFibonacciArray] = useState<number[]>([]);
  const disabledValidate = Number(value) > 0 ? false : true;

  const getFib = async () => {
    let arr = [];
    for (let i = 1; i <= Number(value) + 1; i++) {
        await delay(SHORT_DELAY_IN_MS);
        arr.push(getFibonacciNumbers(i));
        setFibonacciArray([...arr]);
    }
    setBtnLoader(false);
    setValue(0);
}

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = Number(event.target.value);
    setValue(target);
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setBtnLoader(true);
    getFib();
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type="number" 
          placeholder="Введите значение"
          min={minFibonacciInput}
          max={maxFibonacciInput}
          isLimitText={true}
          onChange={onChange}
          disabled={btnLoader}
          value={value}
        />
        <Button
          type="submit"
          text={'Рассчитать'}
          isLoader={btnLoader}
          disabled={disabledValidate}
        />
      </form>
      {fibonacciArray && 
        <ul className={styles.list}>
          {fibonacciArray.map((item, index) => {
            return (
              <li key={index}>
                <Circle letter={String(item)} index={index} />
              </li>
            )
          })}
        </ul>
      }
    </SolutionLayout>
  );
};