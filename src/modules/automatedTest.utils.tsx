import {ReactElement} from "react";
import {testAs} from "@pepfar-react-lib/http-tools";
import {renderComponent} from "./render.utils";
import {click, clickByCss} from "./click.utils";
import {noTexts, textsWait} from "./text.utils";



export type TestAction = {
    click?: string;
    clickByCss?:string;
    texts?: string[];
    noTexts?: string[]
    custom?: ()=>void
}

export type TestCase = {
    name: string;
    component: ReactElement;
    asUser: string;
    actions: TestAction[];
    setup: ()=>Promise<void>
}

async function performTestAction(action:TestAction){
    if (action.click) click(action.click);
    if (action.clickByCss) clickByCss(action.clickByCss);
    if (action.texts) await textsWait(action.texts);
    if (action.noTexts) await noTexts(action.noTexts);
    if (action.custom) action.custom();
}

export async function automatedTest({name,component,asUser,actions, setup}:TestCase):Promise<void>{
    test(name, async()=> {
        testAs(asUser);
        await renderComponent(component);
        await setup();
        for (const action of actions) {
            await performTestAction(action);
        }
    });
}