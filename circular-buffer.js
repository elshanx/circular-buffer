export default class CircularBuffer {
  constructor(capacity) {
    this.buffer = new Array(capacity);
    this.head = 0;
    this.tail = 0;
    this.size = 0;
    this.capacity = capacity;
  }

  write(value) {
    if (this.isFull()) throw new BufferFullError();
    this.buffer[this.tail] = value;
    this.tail = (this.tail + 1) % this.capacity;
    this.size++;
  }

  read() {
    if (this.isEmpty()) throw new BufferEmptyError();
    let value = this.buffer[this.head];
    this.buffer[this.head] = undefined;
    this.head = (this.head + 1) % this.capacity;
    this.size--;
    return value;
  }

  forceWrite(value) {
    this.buffer[this.tail] = value;
    this.tail = (this.tail + 1) % this.capacity;
    this.size++;
  }

  clear() {
    [this.buffer, this.head, this.tail, this.size] = [new Array(this.capacity), 0, 0, 0];
  }

  isEmpty() {
    return this.size === 0;
  }

  isFull() {
    return this.size === this.capacity;
  }
}

export class BufferFullError extends Error {
  constructor() {
    super('Buffer is full');
  }
}

export class BufferEmptyError extends Error {
  constructor() {
    super('Buffer is empty');
  }
}
