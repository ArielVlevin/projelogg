"use client";
import { Background } from "@/components/theme/backGround";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { LogManager } from "@/components/log-manager/LogManager";
import { Title } from "@/components/theme/Title";

export default function Home() {
  return (
    <Background>
      <div className="container mx-auto py-8 max-w-5xl relative">
        <div className="absolute top-0 right-4">
          <ThemeSwitcher />
        </div>
        <main className="container mx-auto py-8 px-4">
          <Title size="3xl" className="text-center mb-6">
            Log Manager
          </Title>
          <LogManager />
        </main>
      </div>
    </Background>
  );
}
