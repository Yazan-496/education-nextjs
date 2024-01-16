import { useEffect, useRef } from 'react';

const MovingText = ({ text, direction , idR}) => {
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const textElement = document.querySelector(`.moving-text-${direction}-${idR}`);
    //         if (textElement) {
    //             if (direction === 'right') {
    //                 const currentRightPosition = parseInt(textElement?.style?.right);
    //                 if (currentRightPosition >= ((window.innerWidth * 68) / 100)) {
    //                     textElement.style.right = '-1000px';
    //                 } else {
    //                     textElement.style.right = `${currentRightPosition + 1}px`;
    //                 }
    //             } else if (direction === 'left') {
    //                 const currentLeftPosition = parseInt(textElement?.style?.left);
    //                 if (currentLeftPosition >= ((window.innerWidth * 68) / 100)) {
    //                     textElement.style.left = '-1000px';
    //                 } else {
    //                     textElement.style.left = `${currentLeftPosition + 1}px`;
    //                 }
    //             }
    //         }
    //     }, 10);
    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, []);

    return (
        <>
            {direction === 'right' &&
            <>
                <div
                    className={` 
                    // moving-text-right-${idR}
                    text-[1.7vh] relative font-[600] text-[#818181] line-[2vh] h-[2.3vh]
                    flex justify-center items-start content-start`}
                    // id={`moving-text-right-${idR}`}
                    style={{
                        // right: '-1000px',
                        direction: direction === 'left' ? 'ltr' : 'rtl',
                    }}
                >
                    {text}
                </div>
            </>
        }
            {direction === 'left' &&
            <>
                <div
                    className={` 
                    // moving-text-left-${idR}
                    text-[1.7vh] relative font-[600] text-[#818181] line-[2vh] h-[2vh] 
                    w-[100%]
                    flex justify-center items-start content-start`}
                    // id={`moving-text-left-${idR}`}
                    style={{
                        // left: '-1000px',
                        direction: direction === 'left' ? 'ltr' : 'rtl',
                    }}
                >
                    {text}
                </div>
            </>
            }
        </>

    );
};

export default MovingText;