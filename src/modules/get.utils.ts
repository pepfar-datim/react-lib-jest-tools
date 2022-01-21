import {screen} from "@testing-library/react";

export function get(testId:string){
    return screen.getByTestId(testId);
}

export function checkAttribute(testId:string, attr:string, value:string){
    expect(get(testId).getAttribute(attr)).toBe(value);
}