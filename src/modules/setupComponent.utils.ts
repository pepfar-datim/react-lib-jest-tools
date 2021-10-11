import {render} from "@testing-library/react";
import {ReactElement} from "react";
import {loadingDone} from "./pause.utils";
import {textsWait} from "./text.utils";


export async function setUpComponent(component:ReactElement, toContain: string[]){
    render(component);
    await loadingDone();
    await textsWait(toContain);
}