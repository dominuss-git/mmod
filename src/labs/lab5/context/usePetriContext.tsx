import {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

export interface IState {
  state: Record<string, Record<'in' | 'out', Record<string, number>>>;
  conditions: Record<string, { count: number; out: { [key: string]: number } | null }>;
}
interface IPetriContext {
  _state: IState;
  actions: Array<Record<string, Array<string>>>;
}

const petriContext = createContext<IPetriContext | undefined>(undefined);

interface IPetriProviderProps {
  children: ReactElement;
  state: IState;
}

export const PetriProvider = ({ children, state }: IPetriProviderProps): ReactElement => {
  const [_state, _setState] = useState(state);
  const [actions, setActions] = useState<Array<Record<string, Array<string>>>>([]);
  const ref = useRef<ReturnType<typeof setInterval>>();

  const process = useCallback(() => {
    const keys = Object.keys(_state.state);
    // const state = _state.state;
    const conditions = _state.conditions;
    const conditionsCountState: Record<string, number> = {};
    const action: Array<Record<string, Array<string>>> = [{}, {}];

    for (let key of keys) {
      const ins = _state.state[key].in;
      // console.log(key, keys)
      const keysIn = Object.keys(ins);

      let isPossible = true;
      for (let key2 of keysIn) {
        // console.log(ke)
        // TODO: //
        if (conditions[key2].count - ins[key2] < 0) {
          isPossible = false;
          // break;
        }
      }

      // console.log(isPossible, key, keysIn)
      if (isPossible) {
        for (let key2 of keysIn) {
          // console.log('a', keysIn)
          conditions[key2].count -= ins[key2];
          // console.log('b', action)
          action[0] = { ...action[0], [key2]: action[0][key2] ? [...action[0][key2], key] : [key] };
          // console.log('c')
        }

        // console.log(action)

        const keysOut = Object.keys(_state.state[key].out);

        for (let key2 of keysOut) {
          // conditions[key2].count += _state.state[key].out[key2]
          conditionsCountState[key2] = conditionsCountState[key2]
            ? conditionsCountState[key2] + _state.state[key].out[key2]
            : _state.state[key].out[key2];
          action[1] = { ...action[1], [key]: action[1][key] ? [...action[1][key], key2] : [key2] };
        }
      }
    }

    Object.keys(conditions).forEach((key) => {
      if (conditionsCountState[key]) {
        conditions[key].count += conditionsCountState[key];
      }
    })

    console.log(state, action);
    _setState((prev) => ({ ...prev, conditions }));
    setActions(action);
  }, [_setState, _state, setActions]);

  useEffect(() => {
    ref.current = setInterval(process, 3000);
    // process();
    return () => clearInterval(ref.current);
  }, []);

  return <petriContext.Provider value={{ _state, actions }}>{children}</petriContext.Provider>;
};

export const usePetriContext = (): IPetriContext => {
  const context = useContext(petriContext);

  if (!context) {
    throw Error('PetriContext can be used only with PetriProvider');
  }

  return context;
};
