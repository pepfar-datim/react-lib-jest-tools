import {click} from "./click.utils";
import {text, texts, textsWait, textWait} from "./text.utils";

export type ClickStep = {
    target: {
        id: string;
    }
    result: {
        texts?: string[];
        textsWait?: string[];
    }
}

export type ClickTestScenario = ClickStep[];

async function iteration(step:ClickStep):Promise<void>{
    click(step.target.id);
    if (step.result.texts) texts(step.result.texts);
    if (step.result.textsWait) await textsWait(step.result.textsWait);
}

export async function clickTest(scenario:ClickTestScenario):Promise<void>{
    await Promise.all(scenario.map(async (step)=>{
        await iteration(step);
    }))
}