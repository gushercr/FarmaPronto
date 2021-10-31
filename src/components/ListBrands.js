import { useEffect, useState } from "react";
import { getListBrands } from "../api/client/brand/listBrand";
export default function ListBrands() {
  const [brands, setBrands] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await getListBrands();
      setBrands(response.result);
    })();
  }, []);
  return (
    <>
      {brands && (
        <>
          <div className="brands">
            {brands.map((brand) => {
              return <img src={brand.img_url} alt={brand.img} key={brand.id} />;
            })}
          </div>
        </>
      )}
    </>
  );
}
