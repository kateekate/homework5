class Node {
  constructor(element, nextNode = null) {
    this.element = element;
    this.nextNode = nextNode;
  }
}

class Stack {
  #maxSize;
  #length;
  #head;

  constructor(maxSize = 10) {
    if (!this.#isValid(maxSize) || maxSize <= 0) {
      throw new Error('Ошибка!');
    }

    this.#maxSize = maxSize;
    this.#length = 0;
    this.#head = null;
  }

  #isValid(num) {
    return typeof num === 'number' && isFinite(num);
  }

  push = (element) => {
    if (this.#length >= this.#maxSize) {
      throw new Error('Ошибка!');
    }

    const node = new Node(element, this.#head);

    this.#head = node;
    this.#length++;
  }

  pop = () => {
    if (this.isEmpty()) {
      throw new Error('Ошибка!');
    }

    const topElement = this.#head.element;

    this.#head = this.#head.nextNode;
    this.#length--;

    return topElement;
  }

  peek = () => {
    if (this.isEmpty()) {
      return null;
    }

    return this.#head.element;
  }

  isEmpty = () => {
    return this.#length === 0;
  }

  toArray = () => {
    const array = [];
    let top = this.#head;

    while (top !== null) {
      array.push(top.element);
      top = top.nextNode;
    }

    return array;
  }

  static fromIterable(iterable) {
    if (!iterable || !iterable[Symbol.iterator]) {
      throw new Error('Ошибка!');
    }

    const newStack = new Stack();

    for (const element of iterable) {
      newStack.push(element);
    }

    return newStack;
  }
}

module.exports = { Stack };