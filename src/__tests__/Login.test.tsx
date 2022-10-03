import { findByText, fireEvent, render, screen } from "@testing-library/react"
import Login from "../pages/Login"
import renderer from "react-test-renderer";


const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUsedNavigate,
}));


beforeEach(() => {
    global.fetch = jest.fn(() => {
        return Promise.resolve({
            json: () =>
                Promise.resolve({
                    status: 200, data: {
                        nbPages: 2, hits: [{
                            id: '1234',
                            title: "getOtp",
                            url: "https://extended-retail-app.herokuapp.com/api/customer/getOtp",
                            created_at: "CreatedAt",
                            author: "Author",
                        }]
                    }
                }),
        });
    }) as jest.Mock;
})

test("Login Logo Image test", () => {
    const doc = render(<Login />);
    const logo = doc.getByTestId("logoImg");
    expect(logo).toBeInTheDocument();
})

test("Login Text test", () => {
    const doc = render(<Login />);
    const textCheck = doc.getByText(/Welcome Back!/i);
    const textCheck2 = doc.getByText(/Login Account/i);

    expect(textCheck).toBeInTheDocument();
    expect(textCheck2).toBeInTheDocument();
})


test("Login Input Field test", () => {
    const doc = render(<Login />);
    const log = doc.getByTestId("loginInput");
    expect(log).toBeInTheDocument();
})


test("Login Input Field values test", () => {
    const doc = render(<Login />);
    const inputElement = doc.getByTestId("loginInput");

    expect(inputElement).toBeInTheDocument();
})



it("should validate mobile numbers", () => {

    const { getByPlaceholderText } = render(<Login />);
    const inputCheck: any = getByPlaceholderText("mobile no");

    fireEvent.change(inputCheck, {
        target: { value: "" }
    });
    expect(inputCheck.value).toBe('');
});


test("get otp button", () => {
    render(<Login />)
    const button = screen.getByTestId("loginButton")

    fireEvent.click(button);
    expect(button).toBeInTheDocument();

})



test("api testing", () => {
    const UserResponse = { token: null }

    jest.spyOn(window, 'fetch').mockImplementationOnce((): any => {
        return Promise.resolve({
            json: () => Promise.resolve(UserResponse),
        })
    })
    expect(window.localStorage.getItem('token')).toBe(UserResponse.token)
})

it("Login snnapshot", () => {
    const tree = renderer.create(<Login />)
    expect(tree).toMatchSnapshot();
})
