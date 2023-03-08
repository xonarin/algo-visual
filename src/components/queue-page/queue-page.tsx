import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { maxLengthQueue } from "../../constants/min-max";
import {HEAD, TAIL} from "../../constants/element-captions";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "./class";
import styles from './queue.module.css';

export const QueuePage = () => {
  const queueCount = 8;
  const queue = useRef(new Queue<string>(queueCount))
  const [arrayQueue, setArrayQueue] = useState<(string | undefined)[]>(queue.current.getArray());
  const [tail, setTail] = useState<number>(NaN);
  const [head, setHead] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(NaN);
  const [error, setError] = useState<boolean>(false);
  const [btnLoader, setBtnLoader] = useState({ add: false, remove: false });
  const [btnDisabled, setBtnDisabled] = useState({ add: true, remove: true, clear: true });
  const [queueInput, setQueueInput] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setBtnLoader({...btnLoader, add: true});
    setBtnDisabled({...btnDisabled, remove: true, clear: true}); 
    setCurrentIndex(queue.current.getTail());
    await delay(SHORT_DELAY_IN_MS);

    queue.current.enqueue(queueInput);
    setError(queue.current.isError);
    setArrayQueue(queue.current.getArray())
    setQueueInput('');
    setHead(queue.current.getHead());
    setTail(queue.current.getTail());
    setCurrentIndex(tail);
    
    await delay(SHORT_DELAY_IN_MS)
    
    setBtnLoader({...btnLoader, add: false});
    setBtnDisabled({...btnDisabled, add: true, remove: false, clear: false}); 
    setCurrentIndex(NaN);
  }

  const removeStackItem = async () => {
    setBtnLoader({...btnLoader, remove: true});
    setBtnDisabled({...btnDisabled, clear: true}); 
    setCurrentIndex(queue.current.getHead());
    queue.current.dequeue();

    await delay(SHORT_DELAY_IN_MS);

    setArrayQueue([...queue.current.getArray()])
    setQueueInput('');

    setBtnLoader({...btnLoader, remove: false});
    setBtnDisabled({...btnDisabled, add: true, remove: queue.current.isEmpty, clear: queue.current.isEmpty }); 
    setHead(queue.current.getHead())
    setCurrentIndex(NaN);
  }

  const clear = async () => {
    setBtnDisabled({...btnDisabled, remove: true, clear: true}); 
    queue.current.clear();
    await delay(SHORT_DELAY_IN_MS);
    setArrayQueue([...queue.current.getArray()]);
    setHead(null);
    setTail(queue.current.getTail());
    setBtnDisabled({...btnDisabled, remove: true, clear: true});
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
          maxLength={maxLengthQueue}
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
          disabled={btnDisabled.clear}
        />


      </form>

      {arrayQueue && 
        <ul className={styles.list}>
          {arrayQueue.map((item, index) => {
            return (
              <li key={index}>

                <Circle
                  letter={item}
                  index={index}
                  tail={tail <= head! ? '' : tail - 1 === index ? TAIL : ''}
                  head={head === null ? '' : head === index ? HEAD : ''}
                  state={index === currentIndex ? ElementStates.Changing : ElementStates.Default}
                />
              </li>
            )
          })}
        </ul>
      }

      {error &&
        <div className={styles.error}>Извините, но очередь полна. Очистите или удалите элемент из очереди.'</div>
      } 
    </SolutionLayout>

    
  );
};
