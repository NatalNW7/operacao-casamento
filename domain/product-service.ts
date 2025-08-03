import database from "@/config/database/database-connection";
import { ProductDTO } from "./models";

export async function getProducts(): Promise<ProductDTO[]> {
    const products = await database.query("SELECT * FROM products;");

    return products.rows
}

export async function getProduct(id: string): Promise<ProductDTO> {
    const product = await database.query(
        `SELECT * FROM products WHERE id = '${id}';`
    );

    return product.rows[0]
}