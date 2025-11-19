import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// ------------------ RENDER TEST ------------------
describe("render", () => {
  it("should render the component", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

// ------------------ INPUT CHANGE TEST ------------------
describe("On Change", () => {
  it("should change the value", async () => {
    const userTest = userEvent.setup();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    let emailText = screen.getByLabelText(/email/i);
    let passwordText = screen.getByLabelText(/password/i);

    await userTest.type(emailText, "abc@gmail.com");
    await userTest.type(passwordText, "test@123");

    expect(emailText.value).toBe("abc@gmail.com");
    expect(passwordText.value).toBe("test@123");
  });
});

describe("checking the API", () => {
  let mockShowAlert;

  beforeEach(() => {
    mockShowAlert = jest.fn();
    jest.clearAllMocks();
  });

  it("should check the response", async () => {
    const userTest = userEvent.setup();

    const mockResponse = {
      success: true,
      token: "mock2131",
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );

    render(
      <MemoryRouter>
        <Login showAlert={mockShowAlert} />
      </MemoryRouter>
    );

    await userTest.type(screen.getByLabelText(/email/i), "abc@gmail.com");
    await userTest.type(screen.getByLabelText(/password/i), "abc@gmail.com");
    await userTest.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:5000/api/user/login",
        expect.objectContaining({
          method: "POST",
        })
      );
    });

    expect(localStorage.getItem("token")).toBe("mock2131");
    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(mockShowAlert).toHaveBeenCalledWith(
      " Successfully Login",
      "success"
    );
  });

  test("should check the incorrect response", async () => {
  const userTest = userEvent.setup();
  const mockShowAlert = jest.fn();

  // Mock failed API response
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          success: false, // ❌ incorrect login
        }),
    })
  );

  render(
    <MemoryRouter>
      <Login showAlert={mockShowAlert} />
    </MemoryRouter>
  );

  await userTest.type(screen.getByLabelText(/email/i), "abc@gmail.com");
  await userTest.type(screen.getByLabelText(/password/i), "abc@gmail.com");
  await userTest.click(screen.getByRole("button"));

  await waitFor(() => {
    expect(mockShowAlert).toHaveBeenCalledWith(
      " Invalid Login Credentials",
      "danger"
    );
  });
});

});
