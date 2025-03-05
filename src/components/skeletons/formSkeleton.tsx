"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export function LogFormSkeleton() {
  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        <CardDescription className="mt-2 h-3 w-3/4 bg-gray-200 rounded animate-pulse" />
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Project section */}
        <div className="space-y-2">
          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="flex items-center space-x-4">
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Change Type */}
        <div className="space-y-2">
          <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Subtopic */}
        <div className="space-y-2">
          <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-24 w-full bg-gray-200 rounded animate-pulse" />
        </div>
      </CardContent>
      <CardFooter className="mt-4">
        <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
      </CardFooter>
    </Card>
  );
}
