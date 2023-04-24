import React from "react";

const Triangle = (props) => {
    if (props.color === 'green') {
        return (
            <svg width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.86188 0L4.93481 3.75L0.788946 3.75L2.86188 0Z" fill="#27E050" /></svg>
        )
    }
    if (props.color === 'red') {
        return (
            <svg width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.39349 4L0.32056 0.25L4.46643 0.25L2.39349 4Z" fill="#F31313" /></svg>
        )
    }
    if (props.color === 'black') {
        return (
            <svg width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.39349 4L0.32056 0.25L4.46643 0.25L2.39349 4Z" fill="#131313" /></svg>
        )
    }
}

export default Triangle;