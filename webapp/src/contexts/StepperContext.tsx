import { createContext, useReducer } from "react";
import stepperReducer, { StepperReducerAction } from "../reducers/stepperReducer";

export type StepperContextType = {
    activeStep: number,
    stepperDispatch: React.Dispatch<StepperReducerAction>,
    handleNext: () => void,
    handleBack: () => void,
    /**
     * Funcion que resetea activeStep a cero
     * @returns funcion 
     */
    restart: () => void,
}

const initialState = {
    activeStep: 0,
    // This is intentional to initialize the function 
    stepperDispatch: () => {},
    // This is intentional to initialize the function 
    handleNext: () => {},
    // This is intentional to initialize the function 
    handleBack: () => {},
    // This is intentional to initialize the function 
    restart: () => {}
}

export const StepperContext = createContext<StepperContextType>(initialState);

export const StepperProvider = ({ children }: any) => {

    const [activeStep, stepperDispatch] = useReducer(stepperReducer, initialState.activeStep);

    // Go next step
    const handleNext = () => stepperDispatch({ type: 'INCREASE' })
    // Go previous step
    const handleBack = () => stepperDispatch({ type: 'DECREASE' })


    const restart = () => stepperDispatch({ type: 'RESTART' })


    return (
        <StepperContext.Provider value={{ //Poner todos los atributos que queremos que acceden los componentes
            activeStep,
            stepperDispatch,
            handleNext,
            handleBack,
            restart
        }}>
            { children }
        </StepperContext.Provider>
    )
}