import stepperReducer, { StepperReducerAction } from "./stepperReducer";


test('increase a step', () => {
    //arrange
    const initialState: number = 0;

    const action: StepperReducerAction = {type:'INCREASE'};

    const expectedState: number = 1;

    //act and assert
    expect(stepperReducer(initialState, action)).toEqual(expectedState);
})

test('decrease a step', () => {
    //arrange
    const initialState: number = 3;

    const action: StepperReducerAction = {type:'DECREASE'};

    const expectedState: number = 2;

    //act and assert
    expect(stepperReducer(initialState, action)).toEqual(expectedState);
})

test('restart stepper', () => {
    //arrange
    const initialState: number = 3;

    const action: StepperReducerAction = {type:'RESTART'};

    const expectedState: number = 0;

    //act and assert
    expect(stepperReducer(initialState, action)).toEqual(expectedState);
})