import { useState, useCallback } from 'react';

type useBooleanReturnType = [boolean, (value: any) => void];

function useBoolean(initialState: boolean): useBooleanReturnType {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(
    (value: any) => {
      if (typeof value === 'boolean') {
        setState(value);
      } else {
        setState(pre => !pre);
      }
    },
    [setState],
  );

  return [state, toggle];
}

export default useBoolean;
