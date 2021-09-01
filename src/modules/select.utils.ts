import {fireEvent, getByText, screen, within} from "@testing-library/react";
import {debug} from "./render.utils";


/**
 * Select `value` in select element found by `id`
 *
 * @example
 * ```javascript
 * select('pizzaDough','newYorkSyle')
 * ```
 * @category Select
 * */
export function select(id:string, value:string){
    fireEvent.mouseDown(screen.getByTestId(id).childNodes[0]);
    // let container = document.querySelector('[role="presentation"]') as HTMLElement;
    let modal = screen.getByRole('presentation');
    // if (value==='Oct - Dec 2020') debug();
    // console.log('it',container.innerText)
    // fireEvent.click(getByText(container,value));
    fireEvent.click(within(modal).getByText(value));
    // @ts-ignore
    // delete container;
    // fireEvent.click(screen.getByText(value));
    checkSelectValue(id, value);
    debug();
}

export function selectById(id:string, value:string){
    fireEvent.mouseDown(screen.getByTestId(id).childNodes[0]);
    fireEvent.click(screen.getByTestId(value));
}

/**
 * Check that select element found by `id` has value `value`
 *
 * @example
 * ```javascript
 * checkSelectValue('pizzaDough','newYorkSyle')
 * ```
 * @category Select
 * */
export function checkSelectValue(id:string, value:string){
    expect(screen.getByTestId(id).textContent).toMatch(new RegExp(value));
}