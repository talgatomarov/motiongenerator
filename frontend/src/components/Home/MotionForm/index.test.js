// import dependencies
import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import MotionForm from "./index.js";
import axios from "axios";

afterEach(cleanup);

jest.mock("axios");

const mockMotions = {
  data: {
    motions: ["motion 1", "motion 2", "motion 3", "motion 4", "motion 5"],
  },
};

describe("MotionForm", () => {
  test("Render MotionForm", () => {
    render(<MotionForm />);
  });

  test("Test successful API call", async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve(mockMotions));

    render(<MotionForm />);

    const generateButton = screen.getByTestId("generate-button");
    const generateTextField = screen.getByTestId("generate-text-field");

    fireEvent.change(generateTextField, { target: { value: "This house" } });
    expect(generateTextField).toHaveValue("This house");

    fireEvent.click(generateButton);
    expect(axios.post).toHaveBeenCalledWith("/api/generate", {
      prefix: "This house",
      temperature: 0.7,
    });

    expect(screen.getByTestId("motion-modal")).toBeInTheDocument();
    expect(screen.queryByTestId("motion-list")).toBeNull();
    expect(screen.getByTestId("loading-message")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.getByTestId("loading-message")
    );

    expect(screen.queryByTestId("loading-message")).toBeNull();
    expect(screen.getByTestId("motion-list")).toBeInTheDocument();
    expect(screen.queryByTestId("error-message")).toBeNull();

    mockMotions.data.motions.forEach((motion) =>
      expect(screen.getByText(motion)).toBeInTheDocument()
    );
  });

  test("Test failed API call", async () => {
    const errorMessage = "Network Error";

    axios.post.mockImplementationOnce(() =>
      Promise.reject({ message: errorMessage })
    );

    render(<MotionForm />);

    const generateButton = screen.getByTestId("generate-button");
    const generateTextField = screen.getByTestId("generate-text-field");

    fireEvent.change(generateTextField, { target: { value: "This house" } });
    expect(generateTextField).toHaveValue("This house");

    fireEvent.click(generateButton);
    expect(axios.post).toHaveBeenCalledWith("/api/generate", {
      prefix: "This house",
      temperature: 0.7,
    });

    expect(screen.getByTestId("motion-modal")).toBeInTheDocument();

    expect(screen.queryByTestId("motion-list")).toBeNull();
    expect(screen.getByTestId("loading-message")).toBeInTheDocument();
    expect(screen.queryByTestId("error-message")).toBeNull();

    await waitForElementToBeRemoved(() =>
      screen.getByTestId("loading-message")
    );

    expect(screen.queryByTestId("motion-list")).toBeNull();
    expect(screen.queryByTestId("loading-message")).toBeNull();
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
  });

  test("Test close button", async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve(mockMotions));

    render(<MotionForm />);

    const generateButton = screen.getByTestId("generate-button");
    const generateTextField = screen.getByTestId("generate-text-field");

    fireEvent.change(generateTextField, { target: { value: "This house" } });
    expect(generateTextField).toHaveValue("This house");

    fireEvent.click(generateButton);
    expect(axios.post).toHaveBeenCalledWith("/api/generate", {
      prefix: "This house",
      temperature: 0.7,
    });

    expect(screen.getByTestId("motion-modal")).toBeInTheDocument();
    expect(screen.getByTestId("close-button")).toBeInTheDocument();

    await waitForElementToBeRemoved(() =>
      screen.getByTestId("loading-message")
    );

    fireEvent.click(screen.getByTestId("close-button"));

    await waitForElementToBeRemoved(() => screen.getByTestId("motion-modal"));

    expect(screen.queryByTestId("motion-modal")).toBeNull();
    expect(screen.queryByTestId("close-button")).toBeNull();
  });
});
