import { Button } from "components/Button";
import {
    ProductCardStyled,
    MainInfoStyled,
    TextStyled,
    DeleteIconStyled,
} from "components/ProductCard/ProductCard.style";
import React, { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "store";
import { changeCartAction } from "store/cart/cart.actions";
import { deleteProductAction } from "store/products/products.actions";

import { ProductCardProps } from "./ProductCard.types";

export const ProductCard = ({ tobacco, inCart = false, ...props }: ProductCardProps) => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((store) => store.cart.cart?.products);
    const canDelete = useAppSelector((store) => store.auth.isAdmin);

    const handleCartClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation();
            dispatch(changeCartAction([...(products?.map((product) => product.id) ?? []), tobacco.id]));
        },
        [tobacco.id, dispatch, products]
    );

    const handleDeleteProductFromCart = useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation();
            dispatch(
                changeCartAction([
                    ...(products?.filter((product) => product.id !== tobacco.id).map((product) => product.id) ?? []),
                ])
            );
        },
        [tobacco.id, dispatch, products]
    );

    const isInCart = useMemo(() => products?.map((product) => product.id).includes(tobacco.id), [tobacco.id, products]);

    const handleDeleteProduct = useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation();

            dispatch(deleteProductAction(tobacco.id));
        },
        [tobacco.id, dispatch]
    );

    return (
        <ProductCardStyled {...props}>
            <MainInfoStyled>
                <h2>{tobacco.name}</h2>
                <span>{` ${tobacco.type} • ${tobacco.brand} • Крепкость ${tobacco.strength}`}</span>
                <p>{tobacco.price} ₽</p>
            </MainInfoStyled>
            {!inCart ? (
                <>
                    {!isInCart ? (
                        <Button onClick={handleCartClick} styleType="outlined">
                            в корзину
                        </Button>
                    ) : (
                        <TextStyled>В корзине</TextStyled>
                    )}
                    {canDelete && (
                        <Button styleType="danger" onClick={handleDeleteProduct}>
                            Удалить
                        </Button>
                    )}
                </>
            ) : (
                <DeleteIconStyled className="material-symbols-outlined" onClick={handleDeleteProductFromCart}>
                    delete
                </DeleteIconStyled>
            )}
        </ProductCardStyled>
    );
};
