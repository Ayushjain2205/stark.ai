import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchIcon, SparklesIcon } from "lucide-react";

export default function Component() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const suggestedPrompts = [
    "Show latest transactions",
    "Explain Starknet's Layer 2 solution",
    "What are zkRollups?",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages([...messages, { type: "user", content: inputValue }]);
      // Simulating AI response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            content: `Here's some information about "${inputValue}" on Starknet...`,
          },
        ]);
      }, 1000);
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0C0C4F] to-[#1C1C6F] text-white font-inter">
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <SparklesIcon className="h-5 w-5" />{" "}
          <h1 className="text-2xl font-bold">Stark.ai </h1>
        </div>
        {/* <nav className="space-x-4">
          <Button variant="ghost" className="text-white hover:text-[#EC795B]">
            About
          </Button>
          <Button variant="ghost" className="text-white hover:text-[#EC795B]">
            Docs
          </Button>
        </nav> */}
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        {messages.length === 0 ? (
          <div className="w-full max-w-3xl space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">Explore Starknet with AI</h2>
              <p className="text-xl text-white/80">
                Search transactions, analyze smart contracts, and understand
                blockchain concepts.
              </p>
            </div>
            <div className="relative">
              <form onSubmit={handleSubmit} className="flex items-center">
                <Input
                  type="text"
                  placeholder="Search by transaction hash, address, or ask a question..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full bg-white/10 border-2 border-white/20 rounded-full py-6 px-6 pr-32 text-lg placeholder-white/50 focus:ring-2 focus:ring-[#EC795B] focus:border-transparent"
                />
                <div className="absolute right-2 flex items-center space-x-2">
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-[#EC795B] hover:bg-[#D672EF] rounded-full"
                  >
                    <SearchIcon className="h-5 w-5" />
                  </Button>
                </div>
              </form>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {suggestedPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-sm border-white/20 bg-white/10 text-transparent rounded-full py-2 px-4 transition-colors duration-200"
                  onClick={() => setInputValue(prompt)}
                >
                  <span className="bg-clip-text bg-gradient-to-r from-[#EC795B] to-[#D672EF]">
                    {prompt}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-3xl h-[70vh] flex flex-col">
            <ScrollArea className="flex-grow mb-6 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 p-4 rounded-lg ${
                    message.type === "user"
                      ? "bg-[#EC795B] ml-auto"
                      : "bg-[#D672EF]"
                  } max-w-[80%]`}
                >
                  {message.content}
                </div>
              ))}
            </ScrollArea>
            <form onSubmit={handleSubmit} className="relative">
              <Input
                type="text"
                placeholder="Ask a follow-up question or search..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-white/10 border-2 border-white/20 rounded-full py-4 px-6 pr-32 text-lg placeholder-white/50 focus:ring-2 focus:ring-[#EC795B] focus:border-transparent"
              />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#EC795B] hover:bg-[#D672EF] rounded-full px-4 py-2"
              >
                <SearchIcon className="h-5 w-5" />
              </Button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
