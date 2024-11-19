"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { HoroscopeGenerator } from "@/lib/horoscopeGenerator";
/* import { HoroscopeHumanGenerator } from "@/lib/horoscopeHumanGenerator"; */

const formSchema = z.object({
  catName: z.string().min(1, "Por favor ingresa el nombre del gato"),
  recipient: z.enum(["self", "human"], {
    required_error: "Por favor selecciona para quién es el horóscopo",
  }),
  humanName: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface HoroscopeResponse {
  success: boolean;
  data: {
    dailyMessage: string;
    activities: {
      name: string;
      prediction: string;
      favorability: number;
    }[];
    luckySpot: string;
    luckLevel: number;
    compatibility: string[];
    advice: string;
  };
}

export default function CatHoroscopeForm() {
  const [horoscopeData, setHoroscopeData] = useState<
    HoroscopeResponse["data"] | null
  >(null);
  const [showHoroscope, setShowHoroscope] = useState(false);
  const [step, setStep] = useState(1); // Track the current step of the form

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      catName: "",
      recipient: "self",
      humanName: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      const generator = new HoroscopeGenerator();
      const data = generator.generateHoroscope({
        catName: values.catName,
        recipient: values.recipient,
      });

      setHoroscopeData(data);
      setShowHoroscope(true);

      const endpoint =
        values.recipient === "human"
          ? "/api/human-horoscope"
          : "/api/horoscope";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          catName: values.catName,
          recipient: values.recipient,
          humanName: values.humanName,
        }),
      });

      const apiData: HoroscopeResponse = await response.json();
      if (apiData.success && apiData.data) {
        setHoroscopeData(apiData.data);
        setShowHoroscope(true);
      }
    } catch (error) {
      console.error("Error al obtener el horóscopo:", error);
    }
  }

  const renderHoroscopeContent = () => {
    if (!horoscopeData) return null;
  
    return (
      <div className="space-y-4">
        {/* Mensaje diario con emoji */}
        <p className="text-lg font-medium text-yellow-400 flex items-center space-x-2">
          <span>🌟</span>
          <span>{horoscopeData.dailyMessage}</span>
        </p>
  
        <div className="space-y-2">
          {/* Actividades del día */}
          <h3 className="font-semibold text-gray-300 flex items-center space-x-2">
            <span>🗓️</span>
            <span>Actividades del día:</span>
          </h3>
          {horoscopeData.activities.map((activity, index) => (
            <div key={index} className="pl-4">
              <p className="text-gray-200">• {activity.prediction}</p>
              <div className="flex items-center mt-1">
                <span className="text-sm text-yellow-400">Favorabilidad: </span>
                <div className="flex ml-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-2 w-3 rounded-full mx-0.5 ${
                        i < activity.favorability ? "bg-purple-500" : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {/* Lugar de suerte */}
        <div>
          <h3 className="font-semibold text-gray-300 flex items-center space-x-2">
            <span>🍀</span>
            <span>Lugar de suerte:</span>
          </h3>
          <p className="pl-4 text-gray-200">• {horoscopeData.luckySpot}</p>
        </div>
  
        {/* Compatibilidad */}
        <div>
          <h3 className="font-semibold text-gray-300 flex items-center space-x-2">
            <span>❤️</span>
            <span>Compatibilidad:</span>
          </h3>
          <p className="pl-4 text-gray-200">
            • Hoy te llevarás bien con:{" "}
            {horoscopeData.compatibility.join(" y ")}
          </p>
        </div>
  
        {/* Consejo del día */}
        <div>
          <h3 className="font-semibold text-gray-300 flex items-center space-x-2">
            <span>💡</span>
            <span>Consejo del día:</span>
          </h3>
          <p className="pl-4 text-gray-200">• {horoscopeData.advice}</p>
        </div>
  
        {/* Nivel de suerte */}
        <div className="mt-4 text-center">
          <span className="text-sm text-yellow-400">
            🔮 Nivel de suerte: {horoscopeData.luckLevel}/10
          </span>
        </div>
      </div>
    );
  };
  

  return (
    <div className="w-full max-w-md text-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {step === 1 && (
            <>
              <FormField
                control={form.control}
                name="catName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">
                      Nombre del Gato
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-700 text-white"
                        placeholder="Sr. Bigotes"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recipient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">
                      ¿Para quién es este horóscopo?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="self"
                              className="bg-[#3b2c43] text-white"
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-gray-200">
                            Para mi gato
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="human"
                              className="bg-[#3b2c43] text-white"
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-gray-200">
                            Para el humano
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("recipient") === "human" && (
                <FormField
                  control={form.control}
                  name="humanName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">
                        Nombre del humano
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="bg-gray-700 text-white"
                          placeholder="Humano"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                Obtener Horóscopo
              </Button>
            </>
          )}
        </form>
      </Form>
      

      <Dialog open={showHoroscope} onOpenChange={setShowHoroscope}>
      <DialogContent 
        className="sm:max-w-[500px] 
                    w-[95%] 
                    max-h-[90vh] 
                    overflow-y-auto 
                    bg-gray-900 
                    bg-opacity-80 
                    backdrop-blur-sm 
                    backdrop-filter 
                    border-0
                    rounded-lg
                    shadow-2xl"
      >
        <DialogHeader>
          <DialogTitle className="text-white font-bold text-2xl text-center">
            {form.getValues("recipient") === "human"
              ? "Horóscopo Humano del Día"
              : "Horóscopo Felino del Día"}
          </DialogTitle>
        </DialogHeader>
        
        <Card 
          className="bg-transparent 
                     text-white 
                     p-6 
                     border-0 
                     max-h-[70vh] 
                     overflow-y-auto 
                     scrollbar-thin 
                     scrollbar-thumb-gray-700 
                     scrollbar-track-gray-900"
        >
          {renderHoroscopeContent()}
        </Card>
      </DialogContent>
    </Dialog>

      
    </div>
  );
}
