import { useState, FormEvent, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import styles from './fibonacci-page.module.css';

export const FibonacciPage = () => {
  const [value, setValue] = useState<number>(0);
  const [btnLoader, setBtnLoader] = useState<boolean>(false);
  const [fibonacciArray, setFibonacciArray] = useState<number[]>([]);
  const disabledValidate = value > 0 ? false : true;

  const fibonacci = async (n: number) => {
    let arr: number[] = [1];

    setFibonacciArray([...arr]);

    await delay(SHORT_DELAY_IN_MS);

    arr.push(1);
    setFibonacciArray([...arr]);

    for (let i = 2; i < n + 1; i++) {
      await delay(SHORT_DELAY_IN_MS);
      arr.push(arr[i - 2] + arr[i - 1]);
      setFibonacciArray([...arr]);
      console.log(i)
    }

    console.log(fibonacciArray)
    setBtnLoader(false);
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = Number(event.target.value);
    setValue(target);
    console.log(target)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setBtnLoader(true);
    fibonacci(value);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type="number" 
          placeholder="Введите значение"
          min={1}
          max={19}
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