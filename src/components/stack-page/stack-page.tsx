import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./class";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";
import styles from './stack.module.css';

export const StackPage = () => {
  const stack = useRef(new Stack())
  const array = stack.current.getArray();
  const [stackInput, setStackInput] = useState<string>("");
  const [btnLoader, setBtnLoader] = useState({ add: false, remove: false });
  const [btnDisabled, setBtnDisabled] = useState({ add: true, remove: true });

  const handleSubmit = async (event: FormEvent) => {
    setBtnLoader({...btnLoader, add: true});
    event.preventDefault();
    stack.current.push({value: stackInput, state: ElementStates.Changing});

    setStackInput('');
    await delay(SHORT_DELAY_IN_MS);
    
    stack.current.changeState(array.length - 1, ElementStates.Default);
    setBtnLoader({...btnLoader, add: false});
    setBtnDisabled({...btnDisabled, add: true, remove: false}); 
    console.log(array)
  }

  const removeStackItem = async () => {
    setBtnLoader({ ...btnLoader, remove: true });
    stack.current.changeState(array.length - 1, ElementStates.Changing);

    await delay(SHORT_DELAY_IN_MS);

    stack.current.pop();
    setBtnLoader({ ...btnLoader, remove: false });
    setBtnDisabled({...btnDisabled, remove: stack.current.getSize() > 0 ? false : true});
  }


  const clear = () => {
    stack.current.clear();
    setBtnDisabled({...btnDisabled, remove: stack.current.getSize() > 0 ? false : true});
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target.value;
    setStackInput(target);
    setBtnDisabled({...btnDisabled, add: target ? false : true}); 
    console.log(target)
  }

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type="text" 
          maxLength={4}
          placeholder="Введите значение"
          isLimitText={true}
          onChange={onChange}
          value={stackInput}
        />
        <Button
          type="submit"
          text={'Добавить'}
          isLoader={btnLoader.add}
          disabled={btnDisabled.add}
        />

        <Button
          text={'Удалить'}
          onClick={removeStackItem}
          isLoader={btnLoader.remove}
          disabled={btnDisabled.remove}
        />


        <Button
          text={'Очистить'}
          onClick={clear}
          extraClass={styles.ml80}
          disabled={btnDisabled.remove}
        />


      </form>

      {array && <ul className={styles.list}>
        {array.map((item, index) => {
          return (
            <li key={index}>
              <Circle
                letter={item.value}
                index={index}
                head={index === array.length - 1 ? 'top' : ''}
                state={item.state}
              />
            </li>
          )
        })}
      </ul>}
    </SolutionLayout>
  );
};
