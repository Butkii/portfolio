import React from 'react';
import { useMode} from '../ModeContext';
function Title(props) {
    const { mode } = useMode();
    return(
        <div className="px-10 pb-12">
            <h1 className={`text-5xl font-bold font-heading ${mode === 'light' ? 'text-light-primary' : 'text-dark-primary'}`}>
                {props.title}
            </h1>
            <hr class={`h-1 border-0 ${mode === 'light' ? 'bg-light-primary' : 'bg-dark-primary'}`}></hr>
        </div>
    );
}

export default Title;