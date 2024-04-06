import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {

  return (
    <>
      <div className="app-content bg-light">
        <h3 className="font-bold mb-1 text-center my-4">عذراً ، حدث خطأ مـا</h3>
        <h5 className="text-gray mb-4 text-center">
        الصفحة التي تحاول البحث عنها غير موجودة يرجى المحاولة مرة آخرى او العودة الى <Link to="/">الرئيسية</Link>
        </h5>
      </div>
    </>
  );
};

export default PageNotFound;
