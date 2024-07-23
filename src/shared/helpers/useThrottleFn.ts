import { useCallback, useRef } from "react";

export type Fn = (...args: any[]) => any;
export interface Options {
    wait?: number;
    leading?: boolean;
    trailing?: boolean;
}
export interface Result {
    run: (...args: any[]) => any;
    cancel: () => void;
    flush: () => void;
}

const useThrottleFn = (
    fn: Fn,
    options: Options = {
        wait: 1000,
        leading: true,
        trailing: true
    }
) => {
    const timerRef = useRef<any>();
    const isRunRef = useRef(true);
    const optionsRef = useRef<Options>({});
    optionsRef.current = {
        wait: typeof options.wait === "number" ? options.wait : 1000,
        leading: typeof options.leading === "boolean" ? options.leading : true,
        trailing: typeof options.trailing === "boolean" ? options.trailing : true
    };
    const fnRef = useRef<Fn>(fn);
    fnRef.current = fn;
    const run = useCallback((...args: any[]) => {
        if (!optionsRef.current.leading && !optionsRef.current.trailing) return;
        if (isRunRef.current) {
            isRunRef.current = false;
            if (optionsRef.current.leading) {
                fnRef.current(...args);
            }
            timerRef.current = setTimeout(() => {
                if (!optionsRef.current.leading) {
                    fnRef.current(...args);
                }
                isRunRef.current = true;
            }, optionsRef.current.wait);
        }
    }, []);
    const cancel = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    }, []);
    const flush = useCallback(() => {
        run();
    }, [run]);
    return {
        run,
        cancel,
        flush
    };
};
export default useThrottleFn;
