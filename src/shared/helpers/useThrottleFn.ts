import { useCallback, useRef } from "react";

export type Fn = (...args: any[]) => any;
export interface Options {
    wait?: number;
    leading?: boolean;
    trailing?: boolean;
}
/**
 * Interface for the result object returned by the `useThrottleFn` hook.
 *
 * @interface Result
 */
export interface Result {
    /**
     * The throttled function.
     *
     * @type {(...args: any[]) => any}
     */
    run: (...args: any[]) => any;

    /**
     * Cancels any pending invocations of the throttled function.
     *
     * @type {() => void}
     */
    cancel: () => void;

    /**
     * Immediately invokes the throttled function, discarding any pending invocations.
     *
     * @type {() => void}
     */
    flush: () => void;
}


/**
 * Hook that returns a throttled function and some utility functions.
 *
 * @param {Fn} fn - The function to be throttled.
 * @param {Options} [options] - Options for throttling.
 * @param {number} [options.wait=1000] - The time to wait between function calls.
 * @param {boolean} [options.leading=true] - Whether to call the function on the leading edge.
 * @param {boolean} [options.trailing=true] - Whether to call the function on the trailing edge.
 * @returns {Result} - An object with the throttled function, a cancel function, and a flush function.
 */
const useThrottleFn = (
    fn: Fn,
    options: Options = {
        wait: 1000,
        leading: true,
        trailing: true
    }
): Result => {
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
    /**
     * Throttled function that runs the provided function.
     *
     * @param {...any} args - The arguments to be passed to the function.
     * @returns {void}
     */
    const run = useCallback((...args: any[]) => {
        // If leading and trailing are both false, return without doing anything
        if (!optionsRef.current.leading && !optionsRef.current.trailing) return;
        // If the function can be run, run it
        if (isRunRef.current) {
            isRunRef.current = false;
            if (optionsRef.current.leading) {
                fnRef.current(...args);
            }
            // Set a timer to run the function on the trailing edge
            timerRef.current = setTimeout(() => {
                if (!optionsRef.current.leading) {
                    fnRef.current(...args);
                }
                isRunRef.current = true;
            }, optionsRef.current.wait);
        }
    }, []);
    /**
     * Cancels the timer and resets the function run flag.
     *
     * @returns {void}
     */
    const cancel = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    }, []);
    /**
     * Runs the throttled function immediately.
     *
     * @returns {void}
     */
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
