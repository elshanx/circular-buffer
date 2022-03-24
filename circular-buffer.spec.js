import CircularBuffer, { BufferFullError, BufferEmptyError } from './circular-buffer';

describe('CircularBuffer', () => {
  test('reading empty buffer should fail', () => {
    const buffer = new CircularBuffer(1);
    expect(() => buffer.read()).toThrow(BufferEmptyError);
  });

  test('can read an item just written', () => {
    const buffer = new CircularBuffer(1);
    buffer.write('1');
    expect(buffer.read()).toBe('1');
  });

  test('forcewriting to buffer should overwrite old value', () => {
    const buffer = new CircularBuffer(1);
    buffer.write('1');
    buffer.forceWrite('2');
    expect(buffer.read()).toBe('2');
  });

  test('writing to a full buffer throws BufferFullError', () => {
    const buffer = new CircularBuffer(1);
    buffer.write('1');
    expect(() => buffer.write('2')).toThrow(BufferFullError);
  });

  test('reading from an empty buffer throws BufferEmptyError', () => {
    const buffer = new CircularBuffer(1);
    expect(() => buffer.read()).toThrow(BufferEmptyError);
  });

  test('clearing a buffer resets the buffer', () => {
    const buffer = new CircularBuffer(5);
    for (let i = 0; i < buffer.capacity; i++) {
      buffer.write(i);
    }
    buffer.clear();
    expect(buffer.isEmpty()).toBe(true);
  });
});
