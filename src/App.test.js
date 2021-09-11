import React from 'react';
import App from './App';
import { render, fireEvent, cleanup } from '@testing-library/react'
 
describe('calculate prime multiplication', () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    const successDummyData = [
      '2', '4',  '6',  '10', '14',
      '3', '6',  '9',  '15', '21',
      '5', '10', '15', '25', '35',
      '7', '14', '21', '35', '49'
    ]

    it('returns array', () => {
      const { getByText, getByLabelText, getAllByTestId } = render(<App />);

      const nameInputRow = getByLabelText(/row/i);
      fireEvent.change(nameInputRow, { target: { value: '10' } })

      const nameInputCol = getByLabelText(/col/i);
      fireEvent.change(nameInputCol, { target: { value: '10' } })

      fireEvent.click(getByText(/Generate/i))

      let result = [];
      getAllByTestId("primes").map(item => result.push(item.textContent));

      expect(result).toEqual(successDummyData);
    });
});

