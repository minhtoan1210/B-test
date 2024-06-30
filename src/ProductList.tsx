import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "./services/productServices";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { debounce } from "lodash";
import { TProductItem } from "./type/productType";

export default function ProductList() {
  const [dataParam, setDataParam] = useState({
    skip: 0,
    limit: 20,
    search: "",
  });

  const [keyword, setKeyword] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const observer = useRef<any>();

  const { data: prductData, isLoading } = useQuery({
    queryKey: [
      "item_product",
      dataParam?.limit,
      dataParam?.skip,
      dataParam?.search,
    ],
    queryFn: async () => {
      const res = await getAllProduct(dataParam);
      return res?.data?.products;
    },
  });

  const lastProductRef = useCallback(
    (node: unknown) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setDataParam((prevPage) => ({
            ...prevPage,
            limit: dataParam.limit + 20,
          }));
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  const debounceDropDown = useCallback(
    debounce(
      (nextValue: string) => setDataParam({ ...dataParam, search: nextValue }),
      1000
    ),
    []
  );

  const handleInputOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setKeyword(value);
    debounceDropDown(value);
  };
  return (
    <>
      <h1>Danh Sách Sản Phẩm</h1>
      <input
        value={keyword}
        placeholder="Enter string"
        onChange={(e) => handleInputOnchange(e)}
      />
      {isLoading ? (
        <>
          {" "}
          <h1>Loading....! </h1>
        </>
      ) : (
        <>
          {prductData?.length > 0 && (
            <div className="container">
              {prductData.map((item: TProductItem, index: number) => {
                if (prductData.length === index + 1) {
                  return (
                    <div className="card" key={item.id} ref={lastProductRef}>
                      <img src={item.images[0]} alt="Avatar" />
                      <h4>
                        <b>{item.title}</b>
                      </h4>
                      <p>Giá: {item.price} $</p>
                    </div>
                  );
                } else {
                  return (
                    <div className="card" key={item.id}>
                      <img src={item.images[0]} alt="Avatar" />
                      <h4>
                        <b>{item.title}</b>
                      </h4>
                      <p>Giá: {item.price} $</p>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </>
      )}
    </>
  );
}
