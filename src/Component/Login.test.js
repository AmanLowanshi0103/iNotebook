import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";
import { MemoryRouter } from "react-router-dom";


const mockNavigate=jest.fn()
jest.mock("react-router-dom",()=>
({...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}))

describe("render",()=>
{
    it("should render the component",()=>
    {
        render(<MemoryRouter><Login/></MemoryRouter>)
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
        expect(screen.getByRole("button")).toBeInTheDocument()
    })
})
describe("On Change ",()=>
{

    it("should change the value",async()=>
    {
        render(<MemoryRouter><Login/></MemoryRouter>)
        let emailText=screen.getByLabelText(/email/i)
        await userEvent.type(emailText,"abc@gmail.com")
        let passwordText=screen.getByLabelText(/password/i)
        await userEvent.type(passwordText,"test@123")
        expect(emailText.value).toBe("abc@gmail.com")
        expect(passwordText.value).toBe("test@123")
    })
})

// describe()