import { useReducer } from 'react';

const reducerAction = {
    RESET: "RESET",
    IS_JSON_YAML_FILE: "IS_JSON_YAML_FILE",
    IS_PARSED: "IS_PARSED",
    IS_OPEN_API: "IS_OPEN_API"
}

interface StateTypes {
    isJsonYamlFile: boolean,
    isParsed: boolean,
    isOpenapi: boolean
}

const statusInit = {
    isJsonYamlFile: true,
    isParsed: true,
    isOpenapi: true
}

function statusReducer(state: StateTypes, action: { type: string, status: boolean}){
    const { type, status } = action;
    switch(type){
        case reducerAction.RESET:
            return {
                isJsonYamlFile: true,
                isParsed: true,
                isOpenapi: true
            }
        case reducerAction.IS_JSON_YAML_FILE:
            return {...state, isJsonYamlFile: status}
        case reducerAction.IS_PARSED:
            return {...state, isParsed: status}
        case reducerAction.IS_OPEN_API:
            return {...state, isOpenapi: status}
        default: {
            throw new Error(`Unsupported action type: ${type}`)
        }
    }
}

export function useHandleReadFileStatus() {
    const [ state, dispatch ] = useReducer(statusReducer, statusInit);
    const { isJsonYamlFile, isParsed, isOpenapi } = state;

    function reset(data: boolean) {
        dispatch({
            type: reducerAction.RESET,
            status: true
        })
    }
    function setIsJsonYamlFile(data: boolean) {
        dispatch({
            type: reducerAction.IS_JSON_YAML_FILE,
            status: data
        })
    }
    function setIsParsed(data: boolean) {
        dispatch({
            type: reducerAction.IS_JSON_YAML_FILE,
            status: data
        })
    }
    function setIsOpenapi(data: boolean) {
        dispatch({
            type: reducerAction.IS_JSON_YAML_FILE,
            status: data
        })
    }

    return {
        isJsonYamlFile, isParsed, isOpenapi,
        reset, setIsJsonYamlFile, setIsParsed, setIsOpenapi
    }
}