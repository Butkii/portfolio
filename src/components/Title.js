import React from 'react';

function Title(props) {
    return(
        <div className="px-10 pb-12">
            <h1 className="text-5xl font-bold font-heading text-light-primary">
                {props.title}
            </h1>
            <hr class="h-1 border-0 bg-light-primary"></hr>
        </div>
    );
}

export default Title;