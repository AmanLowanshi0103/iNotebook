import { render , screen } from "@testing-library/react";
import AddNote from "./AddNote";
import noteContext from '../Context/notes/noteContext'
import { userEvent } from "@testing-library/user-event"

describe("Render",()=>
{
    it("render the component",()=>
    {
      const mockContextValue = {
      Notes: [],
      setNotes: jest.fn(),
      addNote: jest.fn(),
      deleteNote: jest.fn(),
      editNote: jest.fn(),
      getAllNotes: jest.fn()
    };
    render(<noteContext.Provider value={{addNote:mockContextValue}}><AddNote/></noteContext.Provider>)
    const screenInput=screen.getByText("Create a New Note")
    expect(screenInput).toBeInTheDocument()
    })
})

describe("Onchange Functionality",()=>
{
    it("should change according to the input",async()=>
    {
      const mockContextValue = {
      Notes: [],
      setNotes: jest.fn(),
      addNote: jest.fn(),
      deleteNote: jest.fn(),
      editNote: jest.fn(),
      getAllNotes: jest.fn()
    };
    render(<noteContext.Provider value={{addNote:mockContextValue}}><AddNote/></noteContext.Provider>)
    let InputBox=screen.getByLabelText("Title")
    await userEvent.type(InputBox,"Personal")
    expect(InputBox.value).toBe("Personal")
    let InputBoxDesc=screen.getByLabelText("Description")
    await userEvent.type(InputBoxDesc,"Test Data Desc")
    expect(InputBoxDesc.value).toBe("Test Data Desc")
    })
})

describe("checking the onSumbit",()=>
{
  it("should create the note",async()=>
  {
    const mockAddNote = jest.fn();
    const mockShowAlert = jest.fn();
    const mockContextValue = {
      Notes: [],
      setNotes: jest.fn(),
      addNote: jest.fn(),
      deleteNote: jest.fn(),
      editNote: jest.fn(),
      getAllNotes: jest.fn()
    };
    render(<noteContext.Provider value={{addNote:mockAddNote}}><AddNote showAlert={mockShowAlert} /></noteContext.Provider>)
    let inputTitleBox=screen.getByLabelText("Title")
    await userEvent.type(inputTitleBox,"My Test Title")
    let inputDescBox=screen.getByLabelText("Description")
    await userEvent.type(inputDescBox,"My Test Description")
    let submitBtn=screen.getByText("Create Note")
    await userEvent.click(submitBtn)
  expect(mockAddNote).toHaveBeenCalledWith("My Test Title", "My Test Description");
  expect(mockShowAlert).toHaveBeenCalledWith(
      "Note has been successfully Added",
      "success"
    );
  })
})