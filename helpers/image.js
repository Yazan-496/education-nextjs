import Image from "next/image";

const ImageComponent = ({
  children,
  src,
  width,
  height,
  alt,
  unoptimized,
  layout,
  ...rest
}) => {
  const widthProps = width || 10;
  const heightProps = height || 10;
  const srcProps = src || "";
  return (
    <>
      <Image
        unoptimized={unoptimized}
        alt={alt ?? "Image"}
        width={width}
        height={height}
        src={src}
        loading={"eager"}
        layout={width ? "" : "fill"}>
        {children}
      </Image>
    </>
  );
};

export default ImageComponent;
