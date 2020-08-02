// import dependencies
import React from 'react';
import { render, fireEvent, cleanup, screen,
         waitForElementToBeRemoved } from '@testing-library/react';
import MotionForm from './index.js'
import axios from 'axios';

afterEach(cleanup)


jest.mock('axios');

const mockMotions = {data: {motions: ["motion 1", "motion 2", "motion 3", "motion 4", "motion 5"]}};

test('Render MotionForm', () => {
  render(<MotionForm/>);
})

test('Test successful API call', async () => {
  axios.post.mockImplementationOnce(() => Promise.resolve(mockMotions));

  render(<MotionForm/>);

  const generateButton = screen.getByTestId('generate-button');
  const generateTextField = screen.getByTestId('generate-text-field');

  fireEvent.change(generateTextField, {target: {value: "This house"}});
  expect(generateTextField).toHaveValue("This house");

  fireEvent.click(generateButton);
  expect(axios.post).toHaveBeenCalledWith('/api/generate', {prefix: "This house", temperature: 0.7});

  expect(screen.getByTestId('motion-modal')).toBeInTheDocument() 
  expect(screen.queryByTestId('motion-list')).toBeNull();
  expect(screen.getByTestId('loading-message')).toBeInTheDocument()

  await waitForElementToBeRemoved(() => screen.getByTestId('loading-message'));

  expect(screen.queryByTestId('loading-message')).toBeNull();
  expect(screen.getByTestId('motion-list')).toBeInTheDocument()

  mockMotions.data.motions.forEach(motion => expect(screen.getByText(motion)).toBeInTheDocument());
});
