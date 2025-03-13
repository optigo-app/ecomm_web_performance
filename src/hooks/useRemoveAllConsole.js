import React from 'react'

const useRemoveAllConsole = () => {
    React.useEffect(() => {
        const disableLoggingInProduction = () => {
            if (process.env.NODE_ENV === 'production') {
                console.log = () => { };
                console.warn = () => { };
                console.error = () => { };
                console.info = () => { };
                console.debug = () => { };
            }
        };
    
        disableLoggingInProduction();
        return () => {
            if (process.env.NODE_ENV === 'production') {
                console.log = console.__log;
                console.warn = console.__warn;
                console.error = console.__error;
                console.info = console.__info;
                console.debug = console.__debug;
            }
        };
    }, []);
}

export default useRemoveAllConsole