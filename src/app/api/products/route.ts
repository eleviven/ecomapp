import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { APP, CONFIG } from "@/constants";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sortBy = searchParams.get("sort_by");

    const data = await fetch(`${CONFIG.BASE_URL}/products`, {
      next: { revalidate: 1 },
    }).then((res) => res.json());

    let products: any[] = JSON.parse(JSON.stringify(data.products));

    if (sortBy) {
      switch (sortBy) {
        case APP.SORT_BY.TITLE_ASC.value:
          products.sort((a, b) => a.title - b.title);
          break;
        case APP.SORT_BY.TITLE_DESC.value:
          products.sort((a, b) => b.title - a.title);
          break;
        case APP.SORT_BY.PRICE_ASC.value:
          products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          break;
        case APP.SORT_BY.PRICE_DESC.value:
          products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
          break;
        case APP.SORT_BY.RATING_ASC.value:
          products.sort((a, b) => a.rating - b.rating);
          break;
        case APP.SORT_BY.RATING_DESC.value:
          products.sort((a, b) => b.rating - a.rating);
          break;
      }
    }

    const filters = Object.entries(
      Object.fromEntries(searchParams.entries())
    ).filter(([key]) => key.includes("filter."));

    filters.forEach(([key, value]) => {
      key = key.replace("filter.", "");

      products = products.filter((product) => {
        let productKey = product[key];

        if (typeof productKey === "string") {
          productKey = productKey.toLowerCase();
        }

        if (key === "price-from" && value) {
          let productKey = Number(product.price);
          return Number(productKey) >= Number(value);
        }

        if (key === "price-to" && value) {
          let productKey = Number(product.price);
          return Number(productKey) < Number(value);
        }

        if (key === "rating") {
          return (
            Number(productKey) >= Number(value) &&
            Number(productKey) < Number(value) + 1
          );
        }

        return productKey == value.toLowerCase();
      });
    });

    data.products = products;

    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return new Response("Error", {
      status: 404,
    });
  }
}
