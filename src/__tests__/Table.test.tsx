import { fireEvent, render, screen, act, renderHook,  } from "@testing-library/react"
import axios from "axios";
import TableData from "../Components/Table"


const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockUsedNavigate,
}));


const mockData: any = [
    {
        name: "Veg pulao2",
        url: "https://extended-retail-app.herokuapp.com/api/products/getMenuItems?userId=624a61bbd873b1d7b1bc78bc"
    },
]


beforeEach(() => {
    global.fetch = jest.fn(() => {
        return Promise.resolve({
            status: 200,
            json: () =>
                Promise.resolve({
                    respo: mockData,
                })
        })
    }) as jest.Mock
})



it('get Api test case', async function () {
    global.fetch = jest.fn().mockImplementation(() => {
        var p = new Promise((resolve, reject) => {
            resolve({
                json: function () {
                    return
                }
            })
        })
        return p;
    })
    const response = await fetch("https://extended-retail-app.herokuapp.com/api/products/getMenuItems?userId=624a61bbd873b1d7b1bc78bc")
    expect(response).toBe

})


// test("delete api test", async() => {
//     const userId:any = '1234';
//     const { result } = renderHook(() => TableData())

//     // await act(()=>{
//     //     result.current.deletItem(userId)
//     // })

//     await expect(axios.delete).toHaveBeenCalledWith(`https://extended-retail-app.herokuapp.com/api/products/deleteMenuItem?userId=${userId}`)
// })




test("table data", () => {
    render(<TableData />);

    const title = screen.getByTestId("DeleteBtn");
    act(() => {
        fireEvent.click(title);
    })
    expect(title).toBeInTheDocument();
})


test("Add product textField 1 check ", () => {

    const { getByPlaceholderText } = render(<TableData />);
    const textfield1: any = getByPlaceholderText("Pizza");

    act(() => {
        fireEvent.change(textfield1, {
            target: { value: "Pizza" }
        });
    })

    expect(textfield1.value).toBe('Pizza');
})

test("Add product textField 2 check ", () => {

    const { getByPlaceholderText } = render(<TableData />);
    const textfield2: any = getByPlaceholderText("25");

    fireEvent.change(textfield2, {
        target: { value: "25" }
    });
    expect(textfield2.value).toBe('25');
})


test("Add product textField 3 check ", () => {

    const { getByPlaceholderText } = render(<TableData />);
    const textfield3: any = getByPlaceholderText("180");

    fireEvent.change(textfield3, {
        target: { value: "" }
    });
    expect(textfield3.value).toBe('');
})


test("Add product textField 4 check ", () => {

    const { getByPlaceholderText } = render(<TableData />);
    const textfield4: any = getByPlaceholderText("Type Here...");

    fireEvent.change(textfield4, {
        target: { value: "" }
    });
    expect(textfield4.value).toBe('');
})