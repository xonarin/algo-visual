import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "./class";
import styles from './queue.module.css';


export const QueuePage = () => {
  const queueCount = 3;
  const queue = useRef(new Queue<string>(queueCount))
  const [arrayQueue, setArrayQueue] = useState<(string | undefined)[]>(queue.current.getArray());
  const abra = queue.current.isError;
  const [tail, setTail] = useState<number>(NaN);
  const [head, setHead] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(NaN);
  const [error, setError] = useState<boolean>(false);
  const [animationElement, setAnimationElement] = useState<boolean>(false);
  const [btnLoader, setBtnLoader] = useState({ add: false, remove: false });
  const [btnDisabled, setBtnDisabled] = useState({ add: true, remove: true });
  const [queueInput, setQueueInput] = useState('');

  // useEffect(() => {
  //   console.log(abra)
  // }, [queueInput])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setBtnLoader({...btnLoader, add: true});
    setCurrentIndex(queue.current.getTail());

    await delay(SHORT_DELAY_IN_MS);

    queue.current.enqueue(queueInput);
    setError(queue.current.isError);
    console.log(queue.current.isError)
    setArrayQueue(queue.current.getArray())
    setQueueInput('');
    setHead(queue.current.getHead());
    setTail(queue.current.getTail());
    setCurrentIndex(tail);
    
    
    await delay(SHORT_DELAY_IN_MS)
    
    //console.log(queue.current.getArray());
    setBtnLoader({...btnLoader, add: false});
    setBtnDisabled({...btnDisabled, add: true, remove: false}); 
    setAnimationElement(false);
    setCurrentIndex(NaN);

  }

  const removeStackItem = async () => {
    setBtnLoader({...btnLoader, add: true});

    setCurrentIndex(queue.current.getHead());

    await delay(SHORT_DELAY_IN_MS);
    queue.current.dequeue();
    setArrayQueue([...queue.current.getArray()])
    setQueueInput('');


    setBtnLoader({...btnLoader, add: false});
    setBtnDisabled({...btnDisabled, add: true, remove: false}); 
    setAnimationElement(false);
    setHead(queue.current.getHead())
    setCurrentIndex(NaN);
    //console.log(queue.current.getArray());
    //console.log(head);
  }


  const clear = () => {

  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target.value;
    setQueueInput(target);
    setBtnDisabled({...btnDisabled, add: target ? false : true}); 
    
  }


  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          maxLength={4}
          isLimitText={true}
          placeholder="Введите значение"
          onChange={onChange}
          value={queueInput}
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

      {arrayQueue && <ul className={styles.list}>
        {arrayQueue.map((item, index) => {
          return (
            <li key={index}>

              <Circle
                letter={item}
                index={index}
                tail={tail <= head! ? '' : tail - 1 === index ? 'tail' : ''}
                head={head === null ? '' : head === index ? 'head' : ''}
                state={index === currentIndex ? ElementStates.Changing : ElementStates.Default}
              />
            </li>
          )
        })}
      </ul>}



    </SolutionLayout>

    
  );
};
