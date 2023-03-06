interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak?: () => (T | null)[];
  getArray: () => Array<T | undefined>;
}

export class Queue<T> implements IQueue<T> {
  _array: (T | undefined)[] = [];
  _head = 0;
  _tail = 0;
  _size: number = 0;
  _length: number = 0;
  _error: boolean = false;

  constructor(size: number) {
    this._size = size;
    this._array = Array(size);
  }


  enqueue = (item: T) => {
    if (this._length >= this._size) {
      this._error = true;
     // throw new Error("Maximum length exceeded");
    }

    this._array[this._tail % this._size] = item

    this._tail++;
    this._length++;
  };

  dequeue = () => {
    if (this._head === this._size - 1) {
      this._array[this._head % this._size] = undefined;
      return this
    } else if (!this.isEmpty) {
      this._array[this._head % this._size] = undefined;
      this._head++;
      this._length--;
    }
  }

  clear = () => {
    this._head = 0;
    this._tail = 0;
    this._array = Array(this._size);
  }

  getTail = () => this._tail;
  getHead = () => this._head;

  getArray = () => {
    return [...this._array];
  }

  getSize = () => this._array.length;

  get isEmpty() {
   return this._length === 0
  }
  isError = () => this._error;
}