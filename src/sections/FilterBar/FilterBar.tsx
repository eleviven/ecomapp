"use client";

import { PageHeader } from "@/components";
import { APP } from "@/constants";
import { useRouter } from "next/navigation";

type FilterBar = {
  title: string;
};

const FilterBar: React.FC<FilterBar> = ({ title }) => {
  const navigation = useRouter();
  const handleChange = ({ target }: React.ChangeEvent<any>) => {
    const { name, value } = target;
    const url = new URL(window.location.href);
    url.searchParams.set(name, value);
    navigation.push(url.href);
  };

  return (
    <PageHeader
      title={title}
      accessoryRight={
        <div className="flex items-center gap-4">
          <select name="sort_by" defaultValue="" onChange={handleChange}>
            <option value="" disabled>
              Sort By
            </option>
            {Object.values(APP.SORT_BY).map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </div>
      }
    />
  );
};

export default FilterBar;
