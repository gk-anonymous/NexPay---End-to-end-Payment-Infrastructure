import React from "react";
// You can use 'react-router-dom' for linking if needed, e.g., import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="p-10 w-full bg-slate-50 min-h-screen">
      {/* 1. Hero / Welcome Section */}
      <div className="bg-white rounded-2xl shadow-lg p-10 mb-10 flex flex-col md:flex-row items-center justify-between">
        <div className="space-y-4 max-w-lg">
          <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            New v2.0
          </span>
          <h1 className="text-5xl font-extrabold text-slate-800 leading-tight">
            Fast, Safe, <br />
            <span className="text-[#6a51a6]">Social Payments.</span>
          </h1>
          <p className="text-gray-500 text-lg">
            Welcome back! Manage your finances with ease. Send money instantly
            to friends or top up your wallet in seconds.
          </p>
          <div className="pt-4">
            <button className="bg-[#6a51a6] text-white px-8 py-3 rounded-lg font-bold shadow-md hover:bg-purple-800 transition-all">
              Get Started
            </button>
          </div>
        </div>

        {/* Decorative Illustration (CSS Shapes) */}
        <div className="hidden md:block relative w-64 h-64">
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-20 w-48 h-48 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 right-10 w-48 h-48 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          <div className="relative z-10 flex justify-center items-center h-full">
            <svg
              className="w-40 h-40 text-slate-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      {/* 2. Services Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Our Services</h2>
        <p className="text-gray-500 text-sm">
          Everything you need to manage your wealth.
        </p>
      </div>

      {/* 3. Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Service 1: P2P Transfer */}
        <ServiceCard
          title="P2P Transfer"
          desc="Send money directly to other users instantly with zero fees."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          }
          color="bg-purple-600"
        />

        {/* Service 2: Add Money */}
        <ServiceCard
          title="Add Money"
          desc="Top up your wallet securely via Bank Account or UPI."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
              />
            </svg>
          }
          color="bg-blue-600"
        />

        {/* Service 3: Transactions */}
        <ServiceCard
          title="Past Transactions"
          desc="View detailed statements of your earnings and spendings."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          }
          color="bg-indigo-600"
        />
      </div>
    </div>
  );
}

// Reusable Service Card Component
//@ts-ignore
function ServiceCard({ title, desc, icon, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer group border border-transparent hover:border-gray-100">
      <div
        className={`w-14 h-14 rounded-lg ${color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#6a51a6] transition-colors">
        {title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
      <div className="mt-4 flex items-center text-[#6a51a6] font-semibold text-sm">
        Go to page
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </div>
    </div>
  );
}
