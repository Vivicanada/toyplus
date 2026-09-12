"use client";

import React, { useState, useMemo } from "react";
import { Filter, ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { Toy, Filters, Category, AgeRange, SortOption } from "@/types";
import {
  categories,
  ageRanges,
  conditions,
  deliveryMethods,
  sortOptions,
} from "@/data/mockData";
import ToyCard from "../ToyCard/ToyCard";

interface ToyCatalogProps {
  toys: Toy[];
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onToyClick: (toy: Toy) => void;
}

const ToyCatalog: React.FC<ToyCatalogProps> = ({
  toys,
  filters,
  onFilterChange,
  onToyClick,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const filteredToys = useMemo(() => {
    let result = [...toys];

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (toy) =>
          toy.title.toLowerCase().includes(query) ||
          toy.category.toLowerCase().includes(query) ||
          toy.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (filters.category !== "All") {
      result = result.filter((toy) => toy.category === filters.category);
    }

    // Filter by age range
    if (filters.ageRange) {
      result = result.filter((toy) => toy.ageRange === filters.ageRange);
    }

    // Filter by condition
    if (filters.condition) {
      result = result.filter((toy) => toy.condition === filters.condition);
    }

    // Filter by delivery method
    if (filters.deliveryMethod) {
      result = result.filter(
        (toy) =>
          toy.deliveryMethod === filters.deliveryMethod ||
          toy.deliveryMethod === "Both"
      );
    }

    // Sort
    switch (filters.sort) {
      case "Newest Listed":
        result.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
        break;
      case "Star Coins (Low to High)":
        result.sort((a, b) => a.starCoins - b.starCoins);
        break;
      case "Most Popular":
        result.sort((a, b) => b.views - a.views);
        break;
    }

    return result;
  }, [toys, filters]);

  const clearFilters = () => {
    onFilterChange({
      category: "All",
      ageRange: null,
      condition: null,
      deliveryMethod: null,
      sort: "Newest Listed",
      searchQuery: "",
    });
  };

  const hasActiveFilters =
    filters.category !== "All" ||
    filters.ageRange ||
    filters.condition ||
    filters.deliveryMethod;

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      {/* Filter Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-medium transition-all ${
              showFilters || hasActiveFilters
                ? "bg-gradient-to-r from-pastel-lavender to-pastel-pink text-charcoal shadow-soft"
                : "bg-white text-soft-gray hover:bg-pastel-lavender/30 shadow-soft"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-5 h-5 bg-pastel-peach rounded-full text-xs flex items-center justify-center font-bold text-charcoal">
                !
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-3 py-2 text-sm text-soft-gray hover:text-charcoal transition-colors"
            >
              <X className="w-4 h-4" />
              Clear all
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-2xl shadow-soft hover:shadow-soft-lg transition-shadow">
            <span className="text-soft-gray text-sm">Sort by:</span>
            <span className="font-medium text-charcoal">{filters.sort}</span>
            <ChevronDown className="w-4 h-4 text-soft-gray" />
          </button>
          <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-soft-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden">
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() =>
                  onFilterChange({ ...filters, sort: option })
                }
                className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                  filters.sort === option
                    ? "bg-pastel-lavender/30 text-charcoal font-medium"
                    : "text-soft-gray hover:bg-pastel-lavender/20"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Expandable Filter Panel */}
      {showFilters && (
        <div className="bg-white rounded-3xl shadow-soft p-6 mb-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    category: e.target.value as Category,
                  })
                }
                className="w-full px-4 py-2.5 bg-pastel-lavender/20 rounded-xl border-0 focus:ring-2 focus:ring-pastel-peach text-charcoal"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Age Range Filter */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Age Range
              </label>
              <select
                value={filters.ageRange || ""}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    ageRange: (e.target.value as AgeRange) || null,
                  })
                }
                className="w-full px-4 py-2.5 bg-pastel-lavender/20 rounded-xl border-0 focus:ring-2 focus:ring-pastel-peach text-charcoal"
              >
                <option value="">All Ages</option>
                {ageRanges.map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition Filter */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Condition
              </label>
              <select
                value={filters.condition || ""}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    condition: e.target.value as Toy["condition"] || null,
                  })
                }
                className="w-full px-4 py-2.5 bg-pastel-lavender/20 rounded-xl border-0 focus:ring-2 focus:ring-pastel-peach text-charcoal"
              >
                <option value="">All Conditions</option>
                {conditions.map((cond) => (
                  <option key={cond} value={cond}>
                    {cond}
                  </option>
                ))}
              </select>
            </div>

            {/* Delivery Method Filter */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Delivery Method
              </label>
              <select
                value={filters.deliveryMethod || ""}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    deliveryMethod: e.target.value as Toy["deliveryMethod"] || null,
                  })
                }
                className="w-full px-4 py-2.5 bg-pastel-lavender/20 rounded-xl border-0 focus:ring-2 focus:ring-pastel-peach text-charcoal"
              >
                <option value="">All Methods</option>
                {deliveryMethods.map((method) => (
                  <option key={method} value={method}>
                    {method === "Local Meetup" ? "🤝 " : method === "Postal Shipping" ? "📦 " : "🤝📦 "}
                    {method}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <p className="text-sm text-soft-gray mb-4">
        Showing <span className="font-medium text-charcoal">{filteredToys.length}</span>{" "}
        {filteredToys.length === 1 ? "toy" : "toys"}
      </p>

      {/* Toy Grid */}
      {filteredToys.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredToys.map((toy) => (
            <ToyCard key={toy.id} toy={toy} onClick={() => onToyClick(toy)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-pastel-lavender/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-5xl">🔍</span>
          </div>
          <h3 className="text-xl font-semibold text-charcoal mb-2">
            No toys found
          </h3>
          <p className="text-soft-gray">
            Try adjusting your filters or search query
          </p>
        </div>
      )}
    </section>
  );
};

export default ToyCatalog;
