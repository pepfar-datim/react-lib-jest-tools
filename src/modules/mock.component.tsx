import React from "react";

function Mock({children}){
    return <div>{children}</div>
}

export function mockComponent(jest, libraryName:string,componentName:string){
    throw new Error('not working')
    let componentMap = {};
    componentMap[componentName] = Mock;
    jest.mock(libraryName, ()=>componentMap);
}