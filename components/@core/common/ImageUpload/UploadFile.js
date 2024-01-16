
const handleImageChange = async (file) => {
    // const file = e.target.files[0];
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
                if (responseData?.photo){
                    return responseData?.photo
                }
            } else {
                console.error('Image upload failed');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }
};

export default handleImageChange