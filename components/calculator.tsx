"use client";

import { useState } from "react";

const MONTHLY_FEE = 9999;

function formatRs(n: number) {
  return "Rs " + Math.round(n).toLocaleString("en-PK");
}

export function Calculator() {
  const [students, setStudents] = useState(30);
  const [price, setPrice] = useState(5000);
  const [commission, setCommission] = useState(15);

  const monthlyRevenue = students * price;
  const lostToCommission = (monthlyRevenue * commission) / 100;
  const yearlySavings = (lostToCommission - MONTHLY_FEE) * 12;

  return (
    <section id="calculator" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
        Profit calculator
      </p>
      <h2 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        See what commission is really costing you
      </h2>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="space-y-8 rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="students" className="text-sm font-medium text-ink">
                New students per month
              </label>
              <span className="text-lg font-semibold text-brand-700">{students}</span>
            </div>
            <input
              id="students"
              type="range"
              min={5}
              max={500}
              step={5}
              value={students}
              onChange={(e) => setStudents(Number(e.target.value))}
              className="mt-3 w-full accent-brand-600"
            />
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="price" className="text-sm font-medium text-ink">
                Average course price
              </label>
              <span className="text-lg font-semibold text-brand-700">{formatRs(price)}</span>
            </div>
            <input
              id="price"
              type="range"
              min={1000}
              max={50000}
              step={500}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-3 w-full accent-brand-600"
            />
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="commission" className="text-sm font-medium text-ink">
                Commission on other platforms
              </label>
              <span className="text-lg font-semibold text-brand-700">{commission}%</span>
            </div>
            <input
              id="commission"
              type="range"
              min={5}
              max={50}
              step={1}
              value={commission}
              onChange={(e) => setCommission(Number(e.target.value))}
              className="mt-3 w-full accent-brand-600"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6 rounded-2xl bg-brand-900 p-6 sm:p-8">
          <div>
            <p className="text-sm font-medium text-brand-200">Your monthly revenue</p>
            <p className="mt-1 text-3xl font-semibold text-white">{formatRs(monthlyRevenue)}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-sm text-brand-200">Lost to {commission}% commission</p>
              <p className="mt-1 text-xl font-semibold text-red-300">
                −{formatRs(lostToCommission)}/mo
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-sm text-brand-200">RabeeSkool flat fee</p>
              <p className="mt-1 text-xl font-semibold text-white">{formatRs(MONTHLY_FEE)}/mo</p>
            </div>
          </div>
          <div className="rounded-xl bg-brand-500 p-5">
            <p className="text-sm font-medium text-brand-900">
              {yearlySavings > 0 ? "You keep an extra" : "Difference per year"}
            </p>
            <p className="mt-1 text-3xl font-semibold text-white">
              {formatRs(Math.abs(yearlySavings))}
              <span className="text-lg font-medium text-brand-100"> / year</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
