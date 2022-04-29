export type StepperReducerAction = {
    type: 'INCREASE' | 'DECREASE' |'RESTART'
}

const stepperReducer = (state: number, action: StepperReducerAction) => {
    switch (action.type) {
      case 'INCREASE':
        return state + 1;
        
      case 'DECREASE':
        return state - 1;

      case 'RESTART':
      return 0;
        
      default:
        return state
    }
  }

  
export default stepperReducer;