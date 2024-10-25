import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import ShopItem from "../../components/ShopItem";
import { useToastState } from "../../Recoil/Error/useToastState";
import { useCartState } from "../../Recoil/Cart/useCartState";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLoadingState } from "../../Recoil/Loading/useLoadingState";

function Shop() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const { cartProducts, setCartProducts } = useCartState();
    const { setToastMsg } = useToastState();
    const { setIsLoading } = useLoadingState();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            await axios
                .get(`https://dummyjson.com/products`)
                .then((resp) => {
                    setProducts(resp.data.products);
                })
                .catch((err) => {
                    setToastMsg({ isError: true, message: err.response.data.message });
                })
                .finally(() => setIsLoading(false));
        })();

        getCart();
    }, []);

    const getCart = async () => {
        setIsLoading(true);
        await axios
            .get(`https://dummyjson.com/carts`, {
                headers: {
                    "x-access-token": `${localStorage.getItem("access-token")}`,
                },
            })
            .then((resp) => {
                //console.log(resp.data.cart);
                setCartProducts(resp.data.carts);
            })
            .catch((err) => {
                // console.log(err.response.data);
            })
            .finally(() => setIsLoading(false));
    };

    const addToCart = async (productId) => {
        setIsLoading(true);
        const userId = localStorage.getItem("user-id"); // Get the user ID from localStorage
        if (!userId) {
            setIsLoading(false);
            setToastMsg({
                isError: true,
                message: "You need to be logged in",
            })
            return; // Ensure user is logged in
        }
        await axios
            .post(
                'https://dummyjson.com/carts/add', {
                userId: userId,
                products: [
                    { id: productId, quantity: 1 }
                ]
            }
                // {
                //   headers: {
                //     "x-access-token": `${localStorage.getItem("access-token")}`,
                //   },
                // }
            )
            .then((resp) => {
                setToastMsg({ isError: false, message: resp.data.message || "Product added to cart." });
                setCartProducts(resp.data.products);
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    navigate("/login");
                    setToastMsg({
                        isError: true,
                        message: "Log in to purchase products.",
                    });
                }
                else {
                    setToastMsg({
                        isError: true,
                        message: "Failed to add product to cart.",
                    })
                }
            })
            .finally(() => setIsLoading(false));
    };
    return (
        <MainLayout>
            <div className="h-full py-8 px-2 md:px-8 flex gap-4 md:gap-6 flex-wrap justify-center">
                {products.map((product) => {
                    let index = cartProducts.findIndex(
                        (item) => item.id == product.id
                    );
                    return (
                        <ShopItem
                            key={product.id}
                            img={product.thumbnail}
                            name={product.title}
                            price={product.price}
                            quantity={cartProducts[index] ? cartProducts[index].quantity : ""}
                            isInCart={
                                cartProducts.some((item) => item.id == product.id)
                                    ? true
                                    : false
                            }
                            className="h-60 w-40 md:h-80 md:w-64"
                            onClick={async () => {
                                await addToCart(product.id);
                                await getCart();
                            }}
                        />
                    );
                })}
            </div>
        </MainLayout>
    );
}

export default Shop;