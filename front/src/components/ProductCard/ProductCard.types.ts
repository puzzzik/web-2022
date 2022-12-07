import { Product } from "generated/types";

export type ProductCardProps = Omit<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    "ref"
> & {
    tobacco: Product;
    inCart?: boolean;
};
