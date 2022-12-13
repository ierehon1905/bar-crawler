import {useEffect} from 'react';

export const useClickOutside = (ref: any, callback?: () => void, p: {disabled?: boolean} = {}) => {
    useEffect(() => {
        const handleClick = (e: any) => {
            if (callback && ref.current && !ref.current.contains(e.target)) {
                callback();
            }
        };

        if (p.disabled || !callback || !ref.current) {
            return;
        }

        document.addEventListener('mouseup', handleClick);
        document.addEventListener('touchend', handleClick);
        return () => {
            document.removeEventListener('mouseup', handleClick);
            document.removeEventListener('touchend', handleClick);
        };
    }, [callback, ref, p.disabled]);
};
