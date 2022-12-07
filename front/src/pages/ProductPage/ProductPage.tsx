import { Button } from "components/Button";
import { ProductCreateForm } from "components/ProductCreateForm";
import { MainLayout } from "layouts/MainLayout";
import { DescriptionStyled, ProductPageStyled, TextStyled } from "pages/ProductPage/ProductPage.style";
import React, { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "store";
import { changeCartAction } from "store/cart/cart.actions";
import { getProductByIdAction } from "store/products/products.actions";
import { resetProductState } from "store/products/products.reducer";

export const ProductPage = () => {
    const params = useParams<{ id: string }>();
    const products = useAppSelector((store) => store.cart.cart?.products);

    const dispatch = useAppDispatch();
    const { tobacco } = useAppSelector((store) => store.tobacco);
    const canEdit = useAppSelector((store) => store.auth.isAdmin || store.auth.isStaff);

    useEffect(() => {
        if (!tobacco) {
            dispatch(getProductByIdAction(Number(params?.id)));
        }
    }, [tobacco, dispatch, params.id]);

    useEffect(
        () => () => {
            dispatch(resetProductState());
        },
        [dispatch]
    );

    const isInCart = useMemo(
        () => !!tobacco?.id && products?.map((product) => product.id).includes(tobacco?.id),
        [tobacco?.id, products]
    );

    const handleCartClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation();
            if (tobacco?.id) {
                dispatch(changeCartAction([...(products?.map((product) => product.id) ?? []), tobacco?.id]));
            }
        },
        [tobacco?.id, dispatch, products]
    );

    return (
        <MainLayout>
            <ProductPageStyled>
                <h1>{tobacco?.name}</h1>
                <h2>{tobacco?.price} ₽</h2>
                {!canEdit && (
                    <DescriptionStyled>
                        <span>
                            Бренд: <span>{tobacco?.brand}</span>
                        </span>
                        <span>
                            Тип: <span>{tobacco?.type}</span>
                        </span>
                        <span>
                            Крепость: <span>{tobacco?.strength}</span>
                        </span>
                    </DescriptionStyled>
                )}
                {isInCart ? <TextStyled>В корзине</TextStyled> : <Button onClick={handleCartClick}>В корзину</Button>}

                {canEdit && <ProductCreateForm isForEdit initialValues={tobacco} productId={Number(params.id)} />}
            </ProductPageStyled>
        </MainLayout>
    );
};
