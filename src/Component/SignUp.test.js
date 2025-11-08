import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUp from "./SignUp";

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("SignUp Component", () => {
  let mockShowAlert;

  beforeEach(() => {
    mockShowAlert = jest.fn();
    jest.clearAllMocks();
  });

  test("renders all input fields and submit button", () => {
    render(
      <BrowserRouter>
        <SignUp showAlert={mockShowAlert} />
      </BrowserRouter>
    );

    expect(screen.getByTestId("fullName")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("updates input values correctly", () => {
    render(
      <BrowserRouter>
        <SignUp showAlert={mockShowAlert} />
      </BrowserRouter>
    );

    const fullNameInput = screen.getByTestId("fullName");
    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");

    fireEvent.change(fullNameInput, { target: { value: "Aman" } });
    fireEvent.change(emailInput, { target: { value: "aman@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    expect(fullNameInput.value).toBe("Aman");
    expect(emailInput.value).toBe("aman@test.com");
    expect(passwordInput.value).toBe("123456");
  });

  test("submits form successfully and navigates to home", async () => {
    const mockResponse = {
      success: true,
      token: "mockToken123",
    };

    // Mock fetch success response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );

    render(
      <BrowserRouter>
        <SignUp showAlert={mockShowAlert} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByTestId("fullName"), {
      target: { value: "Aman" },
    });
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "aman@test.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "123456" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:5000/api/user/createuser",
        expect.objectContaining({
          method: "POST",
        })
      );
    });

    expect(localStorage.getItem("token")).toBe("mockToken123");
    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(mockShowAlert).toHaveBeenCalledWith(
      " Account created successfully",
      "success"
    );
  });

  test("handles invalid credentials case", async () => {
    const mockResponse = {
      success: false,
    };

    // Mock fetch failure response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );

    render(
      <BrowserRouter>
        <SignUp showAlert={mockShowAlert} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "wrong@test.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "wrongpass" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockShowAlert).toHaveBeenCalledWith(
        " Invalid Credentials",
        "danger"
      );
    });
  });
});
