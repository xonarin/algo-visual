import { ElementStates, IArray } from "../../types/element-states";

interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    clear: () => void;
}

export class Stack implements IStack<IArray> {
    _array: IArray[] = [];

    push = (item: IArray): void => {
      this._array.push(item);
    };

    pop = (): void => {
      if(this.getSize() >= 0) {
        this._array.pop();
      }
    };

    clear = (): void => {
        this._array = [];
    };

    changeState(index: number, state: ElementStates) {
      this._array[index].state = state;
    }

    getSize = () => this._array.length;

    getArray() {
      return this._array;
    }

}