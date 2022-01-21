import {render, screen} from "@testing-library/react";
import {ReactElement} from "react";
import {loadingDone, pause} from "./pause.utils";
import {textsWait} from "./text.utils";


/**
 * Show current state of the test DOM enviroment
 *
 * @example
 * ```javascript
 * await debug()
 * ```
 * @category Render
 * */
export let debug = ()=>{
    screen.debug(null as any,10000000);
}

export let debugWait = async ()=>{
    await pause(2);
    screen.debug(null as any,10000000);
}

export let urlDebug = async ()=>{
    await pause(2);
    screen.logTestingPlaygroundURL();
}

/**
 * Render dynamic component and wait for `texts` to appear
 *
 * @example
 * ```javascript
 * renderComponent(<MainPage/>,['Messages','Friends'])
 * ```
 * @category Render
 * */
export async function renderComponent(component:ReactElement, texts?: string[]):Promise<any>{
    let main = render(component);
    await loadingDone();
    if (texts) await textsWait(texts);
    return main;
}