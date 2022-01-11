import { useEffect, useRef } from "react";

type Subscription<T> = (val: T) => void;

class EventEmitter<T = any> {
    private events = {} as { [key: string]: Set<Subscription<T>> };

    emit = (eventName: string, val: T) => {
        // no one is listening to this event
        if (!this.events[eventName]) return;

        for (const subscription of Array.from(this.events[eventName])) {
            subscription(val);
        }
    };

    useSubscription = (eventName: string, callback: Subscription<T>) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const callbackRef = useRef<Subscription<T>>();
        callbackRef.current = callback;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            function subscription(val: T) {
                if (callbackRef.current) {
                    callbackRef.current(val);
                }
            }

            if (!this.events[eventName]) this.events[eventName] = new Set(); // new event

            this.events[eventName].add(subscription);
            return () => {
                this.events[eventName].delete(subscription);
            };
        // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
    };
}

export const Emitter = new EventEmitter();

export function useEventEmitter<T = void>() {
    const ref = useRef<EventEmitter<T>>();
    if (!ref.current) {
        ref.current = Emitter;
    }
    return ref.current;
}
