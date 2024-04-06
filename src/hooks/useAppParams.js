import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useAppParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [UrlParams, setUrlParams] = useState();

  useEffect(() => {
    let params = {};

    if (searchParams) {
      searchParams.forEach((value, key) => {
        params = {
          ...params,
          [key]: value,
        };
      });
    }

    setUrlParams(params)
  }, [searchParams]);

  // Handle Params and Manage it
  const handleSearch = ({ fields, deletedFields }) => {
    let newSearchParams = new URLSearchParams(searchParams);

    if (fields) {
      Object.keys(fields).forEach((key) => {
        if (fields[key]) {
          newSearchParams.set(key, fields[key]);
        } else {
          newSearchParams.delete(key);
        }
      });
    }

    if (deletedFields) {
      deletedFields.forEach((key) => {
        newSearchParams.delete(key);
      });
    }

    setSearchParams(newSearchParams);
  };

  return {
    handleSearch,
    UrlParams
  };
};

export default useAppParams;