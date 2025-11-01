import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignUp from "./SignUp";
import userEvent from "@testing-library/user-event";

describe("Render",()=>
{
    it("Should render the component",()=>
    {
        render(<MemoryRouter><SignUp/></MemoryRouter>)
        const inputTest=screen.getByText(/Full Name/i)
        expect(inputTest).toBeInTheDocument()
    })
})


describe("On Change functionality",()=>
{
    it("Should render the component",async()=>
    {
        render(<MemoryRouter><SignUp/></MemoryRouter>)
        const InputFullName=screen.getByTestId("fullName")
        await userEvent.type(InputFullName,"Aman Lowanshi")
        const InputEmail=screen.getByTestId("email")
        await userEvent.type(InputEmail,"amanlowanshi@gmail.com")
        const InputPassword=screen.getByTestId("password")
        await userEvent.type(InputPassword,"1234567")  
        expect(InputEmail.value).toBe("amanlowanshi@gmail.com")
        expect(InputFullName.value).toBe("Aman Lowanshi")
        expect(InputPassword.value).toBe("1234567")
    })
})