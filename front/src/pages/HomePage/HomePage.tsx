import { ProductCard } from "components/ProductCard";
import { FiltersBlock } from "components/FiltersBlock";
import { MainLayout } from "layouts/MainLayout";
import {
    BannerStyled,
    ProductsStyled,
    ContentStyled,
    MainPageStyled,
    TableStyled,
    NothingStyled,
    RightContainerStyled,
} from "pages/HomePage/HomePage.style";
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "store";
import { getProductListAction } from "store/products/products.actions";
import { FetchStatus } from "types/asyncState";
import { ProductCreateForm } from "components/ProductCreateForm";

export const HomePage = () => {
    const dispatch = useAppDispatch();
    const { coffees: coffeesSearch, status } = useAppSelector((store) => store.coffee);
    const canCreate = useAppSelector((store) => store.auth.isAdmin || store.auth.isStaff);

    const navigate = useNavigate();

    const handleCardClick = useCallback(
        (id: number) => {
            navigate(`/coffees/${id}`);
        },
        [navigate]
    );

    useEffect(() => {
        if (status === FetchStatus.IDLE) {
            dispatch(getProductListAction());
        }
    }, [dispatch, status]);

    return (
        <MainLayout>
            <MainPageStyled>
                <ContentStyled>
                    <h1>Табачная</h1>
                    <h3>Выберете понравившийся товар</h3>

                    <TableStyled>
                        <RightContainerStyled>
                            <BannerStyled>Купите снюс от абобы и получите чаппалах бесплатно!</BannerStyled>
                            {canCreate && <ProductCreateForm />}
                        </RightContainerStyled>
                        <ProductsStyled>
                            <FiltersBlock />
                            {coffeesSearch?.length ? (
                                <>
                                    {coffeesSearch?.map((coffee) => (
                                        <ProductCard
                                            key={coffee.id}
                                            coffee={coffee}
                                            onClick={() => handleCardClick(coffee?.id ?? 0)}
                                        />
                                    ))}
                                </>
                            ) : (
                                <NothingStyled>Нет продуктов</NothingStyled>
                            )}
                        </ProductsStyled>
                    </TableStyled>
                </ContentStyled>
            </MainPageStyled>
        </MainLayout>
    );
};
