import React, { useEffect, useState } from "react";
import { MdOutlineSearch, MdClose } from "react-icons/md";
import "./Search.scss";
import Input from "../Input/Input";

interface SearchProps {
  placeholder?: string;
  onChange: (val: string) => void;
  searchCustomClass?: string;
  label: string;
}

const Search = ({
  placeholder,
  onChange,
  searchCustomClass,
  label,
}: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const clearSearch = () => {
    setSearchTerm("");
  };
  useEffect(() => {
    onChange(searchTerm);
  }, [searchTerm]);
  return (
    <div className={`search_component_container ${searchCustomClass}`}>
      <div className="search_input_container">
        <Input
          id="search"
          label={label}
          error={null}
          inputClassName="search_input_class"
          rightIcon={
            <div
              style={{
                marginLeft: "10px",
                cursor: "pointer",
                display: !searchTerm ? "none" : "",
              }}
              onClick={clearSearch}
            >
              <MdClose className="search_component_close" />
            </div>
          }
          inputProps={{
            placeholder,
            value: searchTerm,
            onChange: (e) => {
              setSearchTerm(e.target.value);
            },
          }}
        />
      </div>

      <div className="search_component_button">
        <MdOutlineSearch />
      </div>
    </div>
  );
};

export default Search;
