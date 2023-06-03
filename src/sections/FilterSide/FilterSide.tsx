"use client";
import { useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const FilterSide = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = new URLSearchParams(
      // @ts-ignore
      Array.from(new FormData(e.target))
    ).toString();

    router.push(`?${query}`);
  }

  function handleReset() {
    formRef.current?.reset();
    router.push("/");
  }

  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="grid gap-5">
          {filters.map((filter) => {
            switch (filter.type) {
              case "radio-list":
                return (
                  <div key={filter.key}>
                    <div className="mb-2">{filter.title}</div>
                    <ul>
                      {filter.options.map((option) => {
                        const isActive =
                          searchParams.get(`filter.${filter.key}`) ===
                          option.value;

                        return (
                          <li key={option.value}>
                            <label>
                              <input
                                type="radio"
                                name={`filter.${filter.key}`}
                                value={option.value}
                                defaultChecked={isActive}
                              />
                              <span>{option.label}</span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              default:
                return null;
            }
          })}

          <div>
            <div className="mb-2">Price</div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="filter.price-from"
                className="flex-1 bg-gray-100 w-full"
                placeholder="from"
                defaultValue="0"
              />
              <input
                type="number"
                name="filter.price-to"
                className="flex-1 bg-gray-100 w-full"
                placeholder="to"
                defaultValue="5000"
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <button type="submit" className="w-full text-white bg-blue-500 p-2">
            Filter
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="w-full text-white bg-gray-500 p-2"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

const filters = [
  {
    title: "Brand",
    key: "brand",
    type: "radio-list",
    options: [
      {
        label: "Apple",
        value: "Apple",
      },
      {
        label: "Samsung",
        value: "Samsung",
      },
      {
        label: "Golden",
        value: "Golden",
      },
      {
        label: "Fauji",
        value: "Fauji",
      },
    ],
  },
  {
    title: "Rating",
    key: "rating",
    type: "radio-list",
    options: [
      {
        label: "0",
        value: "0",
      },
      {
        label: "1",
        value: "1",
      },
      {
        label: "2",
        value: "2",
      },
      {
        label: "3",
        value: "3",
      },
      {
        label: "4",
        value: "4",
      },
      {
        label: "5",
        value: "5",
      },
    ],
  },
];

export default FilterSide;
