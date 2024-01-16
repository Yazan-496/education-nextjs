import React, { useEffect, useState } from 'react';

const ImageUpload = ({ onChange, imageState, type }) => {
    const [image, setImage] = useState(imageState);

    const handlePersonalImageClick = () => {
        const input = document.getElementById('user-image');
        input.click();
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_UPLOAD_IMAGE_URL}`, {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const responseData = await response.json();
                    if (responseData.photo) {
                        setImage(responseData.photo);
                    }
                } else {
                    // Handle error response from the server
                    console.error('Image upload failed');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    useEffect(() => {
        if (type === "user") {
            if (image) {
                onChange(image);
            } else {
                const defaultImage = process.env.NEXT_PUBLIC_DEFAULT_USER_PHOTO
                onChange(defaultImage);
                setImage(defaultImage);
            }
        }
    }, [image]);
    return (
        <div
            className="relative w-[18.4vh] h-[18.4vh] border-[0.1vh] border-solid shadow-[1.4px_7px_14px_3.5px_#0000000d] border-[#0189DE]  p-[0.9vh] rounded-[3vh] bg-[#0189DE22]"
        >
            <img
                alt="image"
                width='16.6vh'
                height='16.6vh'
                // className="object-cover"
                style={{width: '16.6vh', height: '16.6vh', borderRadius: '2.5vh'}}
                src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${image}`}
            />
            <div
                className="absolute right-[-5%] bottom-[-1vh] cursor-pointer rounded-[3vh]"
            >
                             <svg
                                 onClick={handlePersonalImageClick}
                                 width="4.5vh" height="4.5vh" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg"
                                 style={{background: 'transparent', backgroundColor: 'rgba(1,137,222,0.87)', borderRadius: '2.3vh'}}>
                                 <g id="Group 117640" style={{background: '#FFFFFF', backgroundColor: 'transparent'}}>
                                     <g id="Rectangle 50" filter="url(#filter0_d_56_149)">
                                         <rect width="43" height="43" rx="21.5" fill="#0189DEDD"
                                               style={{background: '#FFFFFF', backgroundColor: '#FFFFFF'}}/>
                                     </g>
                                     <path id="edit"
                                           d="M28.2656 16.8594L26.7422 18.3828L23.6172 15.2578L25.1406 13.7344C25.2969 13.5781 25.4922 13.5 25.7266 13.5C25.9609 13.5 26.1562 13.5781 26.3125 13.7344L28.2656 15.6875C28.4219 15.8438 28.5 16.0391 28.5 16.2734C28.5 16.5078 28.4219 16.7031 28.2656 16.8594ZM13.5 25.375L22.7188 16.1562L25.8438 19.2812L16.625 28.5H13.5V25.375Z"
                                           fill="white"/>
                                 </g>
                                 <defs>
                                     <filter id="filter0_d_56_149" x="-23" y="-15" width="93" height="93"
                                             filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                         <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                         <feColorMatrix in="SourceAlpha" type="matrix"
                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                         <feMorphology radius="5" operator="dilate" in="SourceAlpha"
                                                       result="effect1_dropShadow_56_149"/>
                                         <feOffset dx="2" dy="10"/>
                                         <feGaussianBlur stdDeviation="10"/>
                                         <feComposite in2="hardAlpha" operator="out"/>
                                         <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"/>
                                         <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_56_149"/>
                                         <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_56_149" result="shape"/>
                                     </filter>
                                 </defs>
                             </svg>
                <input
                    type="file"
                    className="hidden"
                    id="user-image"
                    name="user-image"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>
        </div>
    );
};

export default ImageUpload;
