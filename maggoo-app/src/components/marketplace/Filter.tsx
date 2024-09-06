import { Search } from "@/utils/Icons";
import {
  Accordion,
  AccordionItem,
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
} from "@nextui-org/react";
import React, { useState } from "react";

const Filter = () => {
  const [active, setActive] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  const handleCheckboxChange = () => {
    setActive(!active);
  };

  const handleClearAll = () => {
    setActive(false);
    setSearch("");
    setSelectedItems([]); //
  };

  const handleCheckboxGroupChange = (items: string[]) => {
    setSelectedItems(items);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <div className="xl:w-[300px] border-2 border-black   flex flex-col min-h-[85.5vh] gap-5 sm:h-[90vh]  bg-header-bg py-10 px-4 rounded-xl">
        <div className="flex justify-between items-center">
          <p className="text-xl">FILTERS</p>
          <Button
            onClick={handleClearAll}
            className="bg-transparent text-c-primary"
          >
            Clear ALL
          </Button>
        </div>
        <div className="flex items-center justify-between my-1 mt-5">
          <label className="inline-flex w-full justify-between relative items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer "
              checked={active}
              onChange={handleCheckboxChange}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-2 peer-focus:ring-primary-300 peer-focus:transition-all peer-focus:duration-400 rounded-full pee peer-checked:after:translate-x-full  after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-primary-200 peer-checked:after:bg-white peer-checked:after:border-primary-200 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-300"></div>
            <span className="ml-3 text-sm font-medium text-c-primary">
              Show My Items
            </span>
          </label>
        </div>
        <div className="pt-5">
          <p className="text-lg">Character Name</p>
        </div>

        <div className="pt-5">
          <Input
            value={search}
            onChange={handleSearchChange}
            placeholder="Search"
            classNames={{
              inputWrapper:
                "bg-header-bg  border border-c-primary placeholder:text-white data-[hover=true]:bg-transparent group-data-[focus=true]:bg-header-bg",
              input: "group-data-[has-value=true]:text-c-white",
              innerWrapper: "text-white",
              label: "text-white",
              mainWrapper: "text-white",
            }}
            startContent={<Search />}
          />
        </div>
        <div className="pt-5">
          <Accordion>
            <AccordionItem
              classNames={{
                title: "text-white",
              }}
              className="text-white  "
              title="Items"
              key={1}
            >
              <CheckboxGroup
                value={selectedItems}
                onChange={handleCheckboxGroupChange}
                classNames={{}}
              >
                <Checkbox
                  classNames={{
                    label: "text-c-primary",
                    icon: "text-c-primary",
                    wrapper:
                      "group-data-[hover=true]:before:bg-transparent group-data-[focus-visible=true]:ring-c-primary before:border-c-primary",
                  }}
                  value="Body"
                >
                  Body
                </Checkbox>
                <Checkbox
                  classNames={{
                    label: "text-c-primary",
                    icon: "text-c-primary",
                    wrapper:
                      "group-data-[hover=true]:before:bg-transparent group-data-[focus-visible=true]:ring-c-primary before:border-c-primary",
                  }}
                  value="Face"
                >
                  Face
                </Checkbox>
                <Checkbox
                  classNames={{
                    label: "text-c-primary",
                    icon: "text-c-primary",
                    wrapper:
                      "group-data-[hover=true]:before:bg-transparent group-data-[focus-visible=true]:ring-c-primary before:border-c-primary",
                  }}
                  value="Head"
                >
                  Head
                </Checkbox>
                <Checkbox
                  classNames={{
                    label: "text-c-primary",
                    icon: "text-c-primary",
                    wrapper:
                      "group-data-[hover=true]:before:bg-transparent group-data-[focus-visible=true]:ring-c-primary before:border-c-primary",
                  }}
                  value="Chest"
                >
                  Chest
                </Checkbox>
                <Checkbox
                  classNames={{
                    label: "text-c-primary",
                    icon: "text-c-primary",
                    wrapper:
                      "group-data-[hover=true]:before:bg-transparent group-data-[focus-visible=true]:ring-c-primary before:border-c-primary",
                  }}
                  value="Left_Hand"
                >
                  Left Hand
                </Checkbox>

                <Checkbox
                  classNames={{
                    label: "text-c-primary",
                    icon: "text-c-primary",
                    wrapper:
                      "group-data-[hover=true]:before:bg-transparent group-data-[focus-visible=true]:ring-c-primary before:border-c-primary",
                  }}
                  value="Right_Hand"
                >
                  Right Hand
                </Checkbox>

                <Checkbox
                  classNames={{
                    label: "text-c-primary",
                    icon: "text-c-primary",
                    wrapper:
                      "group-data-[hover=true]:before:bg-transparent group-data-[focus-visible=true]:ring-c-primary before:border-c-primary",
                  }}
                  value="Backpack"
                >
                  Backpack
                </Checkbox>
              </CheckboxGroup>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default Filter;
