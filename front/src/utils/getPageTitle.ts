export const getPageTitle = (path: string) => {
    switch (true) {
        case path === "/":
            return "Главная";
        case path.includes("product"):
            return "Заказ табачного изделия";
        case path.includes("auth"):
            return "Авторизация";
        case path.includes("user"):
            return "Личный кабинет";
        case path.includes("cart"):
            return "Корзина";
        default:
            return "Главная";
    }
};
