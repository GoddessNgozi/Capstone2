/** @jest-environment jsdom */
import showsCounter from './showscounter.js';

describe('Testing showsCounter function', () => {
    test('The text content of the span should be 3', () => {
        // Arrange
        document.body.innerHTML =
        '<span class="count"></span>' +
        '<liv class="show-card"></liv>' +
        '<liv class="show-card"></liv>' +
        '<liv class="show-card"></liv>';
        const count = document.querySelector('.count');
        // Action
        showsCounter();
        //Assert
      expect(count.textContent).toBe('3');
    });

    test('The text content of the span should be 0', () => {
        // Arrange
        document.body.innerHTML =
        '<span class="count"></span>';
        const count = document.querySelector('.count');
        // Action
        showsCounter();
        //Assert
      expect(count.textContent).toBe('0');
    });
  });