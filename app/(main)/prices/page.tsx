'use client';

import { useState } from 'react';
import {
  priceCategories,
  priceItems,
  sources,
  sourceInfo
} from '@/constants/prices';
import { motion } from 'framer-motion';
import { FaVolumeUp } from 'react-icons/fa';

export default function PricesCategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const filteredItems = selectedCategory
    ? priceItems.filter((item) => item.categoryId === selectedCategory)
    : [];

  const subcategories = Array.from(
    new Set(filteredItems.map((item) => item.subcategory))
  );

  const itemsInSubcategory = selectedSubcategory
    ? filteredItems.filter((item) => item.subcategory === selectedSubcategory)
    : [];

  const selectedItemData = selectedItem
    ? priceItems.find((item) => item.id === selectedItem)
    : null;

  const itemSources = selectedItem
    ? sourceInfo.filter((info) => info.itemId === selectedItem)
    : [];

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setSelectedItem(null);

    const categoryItems = priceItems.filter(
      (item) => item.categoryId === categoryId
    );
    const categorySubcategories = Array.from(
      new Set(categoryItems.map((item) => item.subcategory))
    );

    if (categorySubcategories.length > 0) {
      setSelectedSubcategory(categorySubcategories[0]);
    } else {
      setSelectedSubcategory(null);
    }
  };

  const playTTS = async (text: string) => {
    if (isPlaying) return;

    setIsPlaying(true);
    try {
      const response = await fetch(
        `http://64.119.31.61:6444/synthesize_raw?text=${encodeURIComponent(
          text
        )}`
      );
      const blob = await response.blob();
      const audioURL = URL.createObjectURL(blob);
      const audio = new Audio(audioURL);

      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioURL);
      };

      await audio.play();
    } catch (error) {
      console.error('TTS Error:', error);
      setIsPlaying(false);
    }
  };

  const TTSButton = ({ text }: { text: string }) => (
    <button
      onClick={() => playTTS(text)}
      disabled={isPlaying}
      className={`rounded-full p-2 transition-colors ${
        isPlaying ? 'bg-gray-300' : 'bg-blue-100 hover:bg-blue-200'
      }`}
      title="Listen"
    >
      <FaVolumeUp
        className={`h-4 w-4 ${isPlaying ? 'text-gray-500' : 'text-blue-600'}`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mb-8 flex items-center gap-2">
        <h1 className="text-3xl font-bold text-gray-800">Үнийн мэдээлэл</h1>
        <TTSButton text="Үнийн мэдээлэл" />
      </div>

      {/* Categories Grid */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {priceCategories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`cursor-pointer rounded-lg p-4 shadow-md transition-all ${
                selectedCategory === category.id ? 'ring-2 ring-blue-500' : ''
              }`}
              style={{ backgroundColor: category.color + '20' }}
              onClick={() => handleCategorySelect(category.id)}
            >
              <div className="flex flex-col items-center">
                <Icon
                  className="mb-2 h-8 w-8"
                  style={{ color: category.color }}
                />
                <div className="flex items-center gap-2">
                  <span className="text-center font-medium">
                    {category.name}
                  </span>
                  <TTSButton text={category.name} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Subcategories */}
      {selectedCategory && (
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-xl font-semibold">Дэд ангилал</h2>
            <TTSButton text="Дэд ангилал" />
          </div>
          <div className="flex flex-wrap gap-2">
            {subcategories.map((subcat) => (
              <div key={subcat} className="flex items-center gap-2">
                <button
                  className={`rounded-full px-4 py-2 transition-all ${
                    selectedSubcategory === subcat
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  onClick={() => {
                    setSelectedSubcategory(subcat);
                    setSelectedItem(null);
                  }}
                >
                  {subcat}
                </button>
                <TTSButton text={subcat} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Items Grid */}
      {selectedSubcategory && (
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-xl font-semibold">Бүтээгдэхүүн</h2>
            <TTSButton text="Бүтээгдэхүүн" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {itemsInSubcategory.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                className={`cursor-pointer overflow-hidden rounded-lg bg-white shadow-md ${
                  selectedItem === item.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedItem(item.id)}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                    <TTSButton text={`${item.name}. ${item.description}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Price Sources */}
      {selectedItem && (
        <div>
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-xl font-semibold">Үнийн мэдээлэл</h2>
            <TTSButton text="Үнийн мэдээлэл" />
          </div>
          <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <div className="border-b p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">
                    {selectedItemData?.name}
                  </h3>
                  <p className="text-gray-600">
                    {selectedItemData?.description}
                  </p>
                </div>
                <TTSButton
                  text={`${selectedItemData?.name}. ${selectedItemData?.description}`}
                />
              </div>
            </div>
            <div className="divide-y">
              {itemSources.map((source) => {
                const sourceData = sources.find(
                  (s) => s.id === source.sourceId
                );
                return (
                  <div
                    key={`${source.itemId}-${source.sourceId}`}
                    className="p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{sourceData?.name}</h4>
                        <p className="text-sm text-gray-600">
                          {sourceData?.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">
                              {source.price.toLocaleString()}₮
                            </span>
                            {source.isPromotion && (
                              <span className="text-sm text-red-500 line-through">
                                {source.previousPrice?.toLocaleString()}₮
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {source.unit} • {source.date}
                          </div>
                        </div>
                        <TTSButton
                          text={`${sourceData?.name} дээр ${source.price.toLocaleString()} төгрөг. ${
                            source.unit
                          }. ${source.date}`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
