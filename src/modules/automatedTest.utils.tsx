import {ReactElement} from "react";
import {registerSendMock, testAs} from "@pepfar-react-lib/http-tools";
import {renderComponent} from "./render.utils";
import {click, clickByCss, clickByText} from "./click.utils";
import {noTexts, textsWait} from "./text.utils";
import {type} from "./type.utils";



export type TestAction = {
    click?: string;
    clickByCss?:string;
    clickByText?:string;
    texts?: string[];
    noTexts?: string[];
    custom?: ()=>void;
    expectPost?:{
        url: string;
        body:any;
    },
    type?: {
        where: string;
        what: string;
    }
}

export type TestCase = {
    name: string;
    component: ReactElement;
    asUser: string;
    actions: TestAction[];
    preRender?: ()=>void;
    postRender?: ()=>Promise<void>;
}

async function performTestAction(action:TestAction){
    if (action.click) click(action.click);
    if (action.clickByCss) clickByCss(action.clickByCss);
    if (action.clickByText) clickByText(action.clickByText);
    if (action.type) type(action.type.where, action.type.what);
    if (action.texts) await textsWait(action.texts);
    if (action.noTexts) await noTexts(action.noTexts);
    if (action.custom) action.custom();
    if (action.expectPost) {
        let response = await registerSendMock('POST',action.expectPost.url, {ok:true})
        expect(response).toStrictEqual(action.expectPost.body);
    }
}

export async function automatedTest({name,component,asUser,actions, preRender, postRender}:TestCase):Promise<void>{
    test(name, async()=> {
        testAs(asUser);
        if (preRender) await preRender();
        await renderComponent(component);
        if (postRender) await postRender();
        for (const action of actions) {
            await performTestAction(action);
        }
    });
}