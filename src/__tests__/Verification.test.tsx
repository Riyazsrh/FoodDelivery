import { fireEvent, getByPlaceholderText, getByText, render, screen } from "@testing-library/react"
import Verifcation from "../pages/Verifcation"
import renderer from "react-test-renderer";

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));


test("Mobile image test", () => {
  render(<Verifcation />)
  const verify = screen.getByTestId("mobImg");
  expect(verify).toBeInTheDocument();
})


test("Verifcation img logo check", () => {
  const doc = render(<Verifcation />);
  const logo = doc.getByTestId('img');

  expect(logo).toHaveAttribute('src', './images/logo 1.png');
  expect(logo).toHaveAttribute('alt', 'logo');
})



it("should validate otp test", async () => {

  const { getByPlaceholderText } = render(<Verifcation />)

  fireEvent.change(getByPlaceholderText("otp"), {
    target: { value: "1234" }
  });

});

test("Verifcation button", () => {
  render(<Verifcation />)
  const button = screen.getByTestId("VerifcationButton")

  fireEvent.click(button);
  expect(button).toBeInTheDocument();

})

it("Verifcation snnapshot", () => {
  const tree = renderer.create(<Verifcation />)
  expect(tree).toMatchSnapshot();
})



jest.spyOn(window, 'alert').mockImplementation(() => { });