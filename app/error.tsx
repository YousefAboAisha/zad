'use client'
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center abs-center text-center w-full">
      <h1 className="text-4xl font-bold mb-4">Error | حدث خطأ ما</h1>
      <p className="mb-8">عذرًا، الصفحة التي تبحث عنها غير موجودة.</p>
      <Link href="/" className="text-primary">
        <p className="text-blue-500 hover:underline font-bold">
          العودة إلى الصفحة الرئيسية
        </p>
      </Link>
    </div>
  );
};

export default ErrorPage;
