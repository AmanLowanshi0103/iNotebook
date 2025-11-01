import { render,screen } from "@testing-library/react";
import About from "./About";

describe("render",()=>
{
    it('should show this text', () => {
    render(<About/>)
    const screenText=screen.getByText(/hello/i);
    expect(screenText).toBeInTheDocument()
    });
})
