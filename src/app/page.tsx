"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const suits = ["hearts", "diamonds", "clubs", "spades"];
const ranks = [
  "A",
  "K",
  "Q",
  "J",
  "10",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];

export default function PlayingCards() {
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [showSurprise, setShowSurprise] = useState(false);

  const flipCard = (card: any) => {
    const cardKey = `${card.rank}-${card.suit}`;
    const isQueenOfHearts = card.rank === "Q" && card.suit === "hearts";

    setFlippedCards((prev) => {
      const newFlippedCards = new Set(prev);

      if (newFlippedCards.has(cardKey)) {
        newFlippedCards.delete(cardKey); // Remove flip if clicked again
      } else {
        newFlippedCards.add(cardKey); // Add flip
      }
      return newFlippedCards;
    });

    // If the Queen of Hearts is clicked, show surprise, otherwise reset after short duration
    if (isQueenOfHearts) {
      setShowSurprise(true);
    } else {
      // Reset flip animation for other cards
      setTimeout(() => {
        setFlippedCards((prev) => {
          const newFlippedCards = new Set(prev);
          newFlippedCards.delete(cardKey); // Remove flip effect after brief moment
          return newFlippedCards;
        });
      }, 1000); // Rotate and then go back after 1 second (adjust timing as needed)
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-pink-400 via-purple-500 to-red-600 p-8 relative">
      <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-pink-200 via-purple-300 to-red-300" />
      <h1 className="text-white text-4xl font-serif font-bold mb-6 animate-pulse">
        Choose a Card 🃏
      </h1>

      {/* Surprise Message */}
      {showSurprise && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl font-bold bg-pink-500 p-6 rounded-xl shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          💖 Surprise! 💖
          <p className="mt-4 text-xl">You are my Queen of Hearts! 💌</p>
        </motion.div>
      )}

      {/* Creating the 4x13 grid with more gap */}
      <div className="grid grid-cols-4 grid-rows-13 gap-6">
        {suits.map((suit, colIndex) => (
          <div key={suit} className="flex flex-col items-center">
            {ranks.map((rank) => {
              const cardKey = `${rank}-${suit}`;
              const isFlipped = flippedCards.has(cardKey);
              return (
                <motion.div
                  key={cardKey}
                  className="w-16 h-24 relative cursor-pointer mb-4"
                  onClick={() => flipCard({ rank, suit })}
                  initial={{ rotateY: 0 }} // Card starts with front visible
                  animate={{
                    rotateY: isFlipped ? 180 : 0,
                    scale: isFlipped ? 1 : 1.1, // Slight scaling for a "pop" effect on flip
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {isFlipped ? (
                    <div className="absolute inset-0 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                      🂠 {/* Front side of the card */}
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-white rounded-lg flex flex-col items-center justify-center border border-gray-300 text-black font-semibold text-lg">
                      <span>{rank}</span>
                      <span>
                        {suit === "hearts"
                          ? "♥️"
                          : suit === "diamonds"
                          ? "♦️"
                          : suit === "clubs"
                          ? "♣️"
                          : "♠️"}
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
