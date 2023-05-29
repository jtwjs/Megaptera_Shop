import type { Image } from "@/types/product";

import * as S from "./ProductImages.styled";

interface ProductImagesProps {
  images: Image[];
}

export default function ProductImages({ images }: ProductImagesProps) {
  return (
    <S.ProductImages>
      {images.map((img) => (
        <img key={img.url} src={img.url} alt="" />
      ))}
    </S.ProductImages>
  );
}
