import { fireEvent, render, screen } from "@testing-library/react"
import Header from "../Components/Header"
import renderer from "react-test-renderer";


const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUsedNavigate,
}));


test("Navbar buttons ckeck ", () => {
    const doc = render(<Header />);
    const buttonCheck = doc.getAllByTestId("Nav_Buttons");

    expect(buttonCheck[0]).toBeInTheDocument()
    expect(buttonCheck.length).toBe(4)
})


test("Logout Buttons check", () => {
    render(<Header />)
    const button = screen.getByTestId("Logout_Buttons")

    fireEvent.click(button);
    expect(button).toBeInTheDocument();
})