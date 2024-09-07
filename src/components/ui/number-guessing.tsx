"use client"; 
import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NumberGuessingState {
  gameStarted: boolean;
  gameOver: boolean;
  paused: boolean;
  targetNumber: number;
  userGuess: number | string;
  attempts: number;
}

export default function NumberGuessing(): JSX.Element {
  const [gameStarted, setGameStarted] = useState<boolean>(false); 
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false); 
  const [targetNumber, setTargetNumber] = useState<number>(0); 
  const [userGuess, setUserGuess] = useState<number | string>(""); 
  const [attempts, setAttempts] = useState<number>(0); 

  useEffect(() => {
    if (gameStarted && !paused) {
      const randomNumber: number = Math.floor(Math.random() * 10) + 1; 
      setTargetNumber(randomNumber); 
    }
  }, [gameStarted, paused]); 
  const handleStartGame = (): void => {
    setGameStarted(true); 
    setGameOver(false); 
    setAttempts(0); 
    setPaused(false); 
  };

  const handlePauseGame = (): void => {
    setPaused(true); 
  };

  const handleResumeGame = (): void => {
    setPaused(false); 
  };

  
  const handleGuess = (): void => {
    if (typeof userGuess === "number" && userGuess === targetNumber) {
      setGameOver(true); 
    } else {
      setAttempts(attempts + 1); 
    }
  };

  const handleTryAgain = (): void => {
    setGameStarted(false); // Reset the game state
    setGameOver(false); // Reset the game over state
    setUserGuess(""); // Clear the user's guess
    setAttempts(0); // Reset the attempts counter
  };

  const handleUserGuessChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserGuess(parseInt(e.target.value));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-black">
      {/* Main container for the game */}
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        {/* Title of the game */}
        <h1 className="text-3xl font-bold text-center mb-2 text-black">
          Number Guessing Game
        </h1>
        {/* Description of the game */}
        <p className="text-center text-black mb-4">
          Try to guess the number between 1 and 10!
        </p>
        {/* Conditional rendering: show start button if game hasn't started */}
        {!gameStarted && (
          <div className="flex justify-center mb-4">
            {/* Button to start the game */}
            <Button
              onClick={handleStartGame}
              className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Start Game
            </Button>
          </div>
        )}
        {/* Conditional rendering: show game controls if game started and not over */}
        {gameStarted && !gameOver && (
          <div>
            <div className="flex justify-center mb-4">
              {/* Button to resume the game if paused */}
              {paused ? (
                <Button
                  onClick={handleResumeGame}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Resume
                </Button>
              ) : (
                /* Button to pause the game */
                <Button
                  onClick={handlePauseGame}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Pause
                </Button>
              )}
            </div>

            <div className="flex justify-center mb-4">
              {/* Input field for user's guess */}
              <Input
                type="number"
                value={userGuess}
                onChange={handleUserGuessChange}
                className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 w-full max-w-xs"
                placeholder="Enter your guess"
              />
              {/* Button to submit the guess */}
              <Button
                onClick={handleGuess}
                className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded ml-4"
              >
                Guess
              </Button>
            </div>
            <div className="text-center text-black">
              {/* Display number of attempts */}
              <p>Attempts: {attempts}</p>
            </div>
          </div>
        )}
        {/* Conditional rendering: show game over message if game is over */}
        {gameOver && (
          <div>
            <div className="text-center mb-4 text-black">
              {/* Game over message */}
              <h2 className="text-2xl font-bold">Game Over!</h2>
              <p>You guessed the number in {attempts} attempts.</p>
            </div>
            <div className="flex justify-center">
              {/* Button to try the game again */}
              <Button
                onClick={handleTryAgain}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}