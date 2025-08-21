"use client"

import { useState, useEffect } from "react"
import { useTranslations, useLocale } from "next-intl"
import { Button } from "@/components/ui/button"

const questionSets = {
  // Kids English (30 questions - 10 pages of 3 questions each)
  EnglishKids: [
    // Page 1
    {
      id: 1,
      question: "What number is this?",
      options: [
        { label: "A", value: "Six" },
        { label: "B", value: "Seven" },
        { label: "C", value: "Eight" },
      ],
      correctAnswer: "Seven",
      image: "/testPhotos/Question1.png",
    },
    {
      id: 2,
      question: "What is this?",
      options: [
        { label: "A", value: "Pen" },
        { label: "B", value: "Pencil" },
        { label: "C", value: "Book" },
      ],
      correctAnswer: "Pencil",
      image: "/testPhotos/Question2.png",
    },
    {
      id: 3,
      question: "What animal is this?",
      options: [
        { label: "A", value: "Dog" },
        { label: "B", value: "Cat" },
        { label: "C", value: "Bird" },
      ],
      correctAnswer: "Cat",
      image: "/testPhotos/Question3.png",
    },
    // Page 2
    {
      id: 4,
      question: "What body part is this?",
      options: [
        { label: "A", value: "Nose" },
        { label: "B", value: "Mouth" },
        { label: "C", value: "Eyes" },
      ],
      correctAnswer: "Eyes",
      image: "/testPhotos/Question4.png",
    },
    {
      id: 5,
      question: "What food is this?",
      options: [
        { label: "A", value: "Apple" },
        { label: "B", value: "Orange" },
        { label: "C", value: "Banana" },
      ],
      correctAnswer: "Apple",
      image: "/testPhotos/Question5.png",
    },
    {
      id: 6,
      question: "What color is the ball?",
      options: [
        { label: "A", value: "Blue ball" },
        { label: "B", value: "Red ball" },
        { label: "C", value: "Green ball" },
      ],
      correctAnswer: "Red ball",
      image: "/testPhotos/Question6.png",
    },
    // Page 3
    {
      id: 7,
      question: "Who is this?",
      options: [
        { label: "A", value: "Father" },
        { label: "B", value: "Mother" },
        { label: "C", value: "Brother" },
      ],
      correctAnswer: "Mother",
      image: "/testPhotos/Question7.png",
    },
    {
      id: 8,
      question: "What clothing item is this?",
      options: [
        { label: "A", value: "Socks" },
        { label: "B", value: "Shoes" },
        { label: "C", value: "Hat" },
      ],
      correctAnswer: "Shoes",
      image: "/testPhotos/Question8.png",
    },
    {
      id: 9,
      question: "What toy is this?",
      options: [
        { label: "A", value: "Car" },
        { label: "B", value: "Doll" },
        { label: "C", value: "Teddy bear" },
      ],
      correctAnswer: "Teddy bear",
      image: "/testPhotos/Question9.png",
    },
    // Page 4
    {
      id: 10,
      question: "What room is this?",
      options: [
        { label: "A", value: "Bedroom" },
        { label: "B", value: "Kitchen" },
        { label: "C", value: "Bathroom" },
      ],
      correctAnswer: "Kitchen",
      image: "/testPhotos/Question10.png",
    },
    {
      id: 11,
      question: "These are ___.",
      options: [
        { label: "A", value: "cat" },
        { label: "B", value: "cats" },
        { label: "C", value: "dog" },
      ],
      correctAnswer: "cats",
      image: "/testPhotos/Question11.png",
    },
    {
      id: 12,
      question: "I ___ ice cream.",
      options: [
        { label: "A", value: "like" },
        { label: "B", value: "likes" },
        { label: "C", value: "am like" },
      ],
      correctAnswer: "like",
    },
    // Page 5
    {
      id: 13,
      question: "He is ___.",
      options: [
        { label: "A", value: "run" },
        { label: "B", value: "runs" },
        { label: "C", value: "running" },
      ],
      correctAnswer: "running",
      image: "/testPhotos/Question13.png",
    },
    {
      id: 14,
      question: "Fish ___ swim.",
      options: [
        { label: "A", value: "can" },
        { label: "B", value: "can't" },
        { label: "C", value: "are" },
      ],
      correctAnswer: "can",
      image: "/testPhotos/Question14.png",
    },
    {
      id: 15,
      question: "What number is this?",
      options: [
        { label: "A", value: "Fifty" },
        { label: "B", value: "Fifteen" },
        { label: "C", value: "Fourteen" },
      ],
      correctAnswer: "Fifteen",
      image: "/testPhotos/Question15.png",
    },
    // Page 6
    {
      id: 16,
      question: "It's ___ o'clock.",
      options: [
        { label: "A", value: "two" },
        { label: "B", value: "three" },
        { label: "C", value: "four" },
      ],
      correctAnswer: "three",
      image: "/testPhotos/Question16.png",
    },
    {
      id: 17,
      question: "The ball is ___ the table.",
      options: [
        { label: "A", value: "on" },
        { label: "B", value: "in" },
        { label: "C", value: "under" },
      ],
      correctAnswer: "under",
      image: "/testPhotos/Question17.png",
    },
    {
      id: 18,
      question: "___ is your name?",
      options: [
        { label: "A", value: "What" },
        { label: "B", value: "Where" },
        { label: "C", value: "How" },
      ],
      correctAnswer: "What",
    },
    // Page 7
    {
      id: 19,
      question: "___ two books on the desk.",
      options: [
        { label: "A", value: "There is" },
        { label: "B", value: "There are" },
        { label: "C", value: "It is" },
      ],
      correctAnswer: "There are",
      image: "/testPhotos/Question19.png",
    },
    {
      id: 20,
      question: "The elephant is ___.",
      options: [
        { label: "A", value: "small" },
        { label: "B", value: "big" },
        { label: "C", value: "fast" },
      ],
      correctAnswer: "big",
      image: "/testPhotos/Question20.png",
    },
    {
      id: 21,
      question: "Yesterday, I ___ football.",
      options: [
        { label: "A", value: "play" },
        { label: "B", value: "played" },
        { label: "C", value: "playing" },
      ],
      correctAnswer: "played",
    },
    // Page 8
    {
      id: 22,
      question: "She ___ to school yesterday.",
      options: [
        { label: "A", value: "go" },
        { label: "B", value: "goes" },
        { label: "C", value: "went" },
      ],
      correctAnswer: "went",
    },
    {
      id: 23,
      question: "My brother is ___ than me.",
      options: [
        { label: "A", value: "tall" },
        { label: "B", value: "taller" },
        { label: "C", value: "tallest" },
      ],
      correctAnswer: "taller",
    },
    {
      id: 24,
      question: "Tomorrow, we ___ visit grandma.",
      options: [
        { label: "A", value: "going to" },
        { label: "B", value: "are going to" },
        { label: "C", value: "will going to" },
      ],
      correctAnswer: "are going to",
    },
    // Page 9
    {
      id: 25,
      question: "This is the ___ book in the library.",
      options: [
        { label: "A", value: "more interesting" },
        { label: "B", value: "most interesting" },
        { label: "C", value: "interestinger" },
      ],
      correctAnswer: "most interesting",
    },
    {
      id: 26,
      question: "I ___ to Paris.",
      options: [
        { label: "A", value: "have been" },
        { label: "B", value: "have go" },
        { label: "C", value: "has been" },
      ],
      correctAnswer: "have been",
    },
    {
      id: 27,
      question: "You ___ eat vegetables.",
      options: [
        { label: "A", value: "should to" },
        { label: "B", value: "should" },
        { label: "C", value: "must to" },
      ],
      correctAnswer: "should",
    },
    // Page 10
    {
      id: 28,
      question: "If it rains, we ___ inside.",
      options: [
        { label: "A", value: "stay" },
        { label: "B", value: "will stay" },
        { label: "C", value: "staying" },
      ],
      correctAnswer: "will stay",
    },
    {
      id: 29,
      question: "I ___ TV when you called.",
      options: [
        { label: "A", value: "watch" },
        { label: "B", value: "was watching" },
        { label: "C", value: "watched" },
      ],
      correctAnswer: "was watching",
    },
    {
      id: 30,
      question: "I ___ this movie last week.",
      options: [
        { label: "A", value: "have seen" },
        { label: "B", value: "saw" },
        { label: "C", value: "see" },
      ],
      correctAnswer: "saw",
    },
  ],

  // Adults English (34 questions - 12 pages: 11 pages of 3 questions + 1 page of 1 question)
  EnglishAdults: [
    // Page 1
    {
      id: 1,
      question: "I ___ a teacher.",
      options: [
        { label: "A", value: "is" },
        { label: "B", value: "are" },
        { label: "C", value: "am" },
      ],
      correctAnswer: "am",
    },
    {
      id: 2,
      question: "This is ___ book.",
      options: [
        { label: "A", value: "I" },
        { label: "B", value: "me" },
        { label: "C", value: "my" },
      ],
      correctAnswer: "my",
    },
    {
      id: 3,
      question: "She ___ from Morocco.",
      options: [
        { label: "A", value: "is" },
        { label: "B", value: "are" },
        { label: "C", value: "am" },
      ],
      correctAnswer: "is",
    },
    // Page 2
    {
      id: 4,
      question: "___ your name Ahmed?",
      options: [
        { label: "A", value: "Is" },
        { label: "B", value: "Are" },
        { label: "C", value: "Do" },
      ],
      correctAnswer: "Is",
    },
    {
      id: 5,
      question: "Which word is a place?",
      options: [
        { label: "A", value: "coffee" },
        { label: "B", value: "café" },
        { label: "C", value: "table" },
      ],
      correctAnswer: "café",
    },
    {
      id: 6,
      question: "I need ___ coffee in the morning.",
      options: [
        { label: "A", value: "a" },
        { label: "B", value: "an" },
        { label: "C", value: "the" },
      ],
      correctAnswer: "a",
    },
    // Page 3
    {
      id: 7,
      question: "He ___ TV every evening.",
      options: [
        { label: "A", value: "watch" },
        { label: "B", value: "watches" },
        { label: "C", value: "watching" },
      ],
      correctAnswer: "watches",
    },
    {
      id: 8,
      question: "___ you live in a city?",
      options: [
        { label: "A", value: "Are" },
        { label: "B", value: "Does" },
        { label: "C", value: "Do" },
      ],
      correctAnswer: "Do",
    },
    {
      id: 9,
      question: "They ___ play football on Saturdays.",
      options: [
        { label: "A", value: "don't" },
        { label: "B", value: "doesn't" },
        { label: "C", value: "not" },
      ],
      correctAnswer: "don't",
    },
    // Page 4
    {
      id: 10,
      question: "My sister ___ in a shop.",
      options: [
        { label: "A", value: "work" },
        { label: "B", value: "works" },
        { label: "C", value: "working" },
      ],
      correctAnswer: "works",
    },
    {
      id: 11,
      question: "We ___ going to the market.",
      options: [
        { label: "A", value: "is" },
        { label: "B", value: "are" },
        { label: "C", value: "am" },
      ],
      correctAnswer: "are",
    },
    {
      id: 12,
      question: "I have ___ friends in Rabat.",
      options: [
        { label: "A", value: "any" },
        { label: "B", value: "some" },
        { label: "C", value: "much" },
      ],
      correctAnswer: "some",
    },
    // Page 5
    {
      id: 13,
      question: "My brother is taller ___ me.",
      options: [
        { label: "A", value: "that" },
        { label: "B", value: "than" },
        { label: "C", value: "then" },
      ],
      correctAnswer: "than",
    },
    {
      id: 14,
      question: "She ___ to the cinema yesterday.",
      options: [
        { label: "A", value: "go" },
        { label: "B", value: "goes" },
        { label: "C", value: "went" },
      ],
      correctAnswer: "went",
    },
    {
      id: 15,
      question: "This is ___ best restaurant in town.",
      options: [
        { label: "A", value: "a" },
        { label: "B", value: "an" },
        { label: "C", value: "the" },
      ],
      correctAnswer: "the",
    },
    // Page 6
    {
      id: 16,
      question: "___ there any milk in the fridge?",
      options: [
        { label: "A", value: "Is" },
        { label: "B", value: "Are" },
        { label: "C", value: "Do" },
      ],
      correctAnswer: "Is",
    },
    {
      id: 17,
      question: "I ___ never been to a big city.",
      options: [
        { label: "A", value: "have" },
        { label: "B", value: "had" },
        { label: "C", value: "has" },
      ],
      correctAnswer: "have",
    },
    {
      id: 18,
      question: "If it rains, I ___ stay home.",
      options: [
        { label: "A", value: "will" },
        { label: "B", value: "would" },
        { label: "C", value: "can" },
      ],
      correctAnswer: "will",
    },
    // Page 7
    {
      id: 19,
      question: "They ___ working when I arrived.",
      options: [
        { label: "A", value: "were" },
        { label: "B", value: "are" },
        { label: "C", value: "was" },
      ],
      correctAnswer: "were",
    },
    {
      id: 20,
      question: "I've lived here ___ 5 years.",
      options: [
        { label: "A", value: "since" },
        { label: "B", value: "for" },
        { label: "C", value: "in" },
      ],
      correctAnswer: "for",
    },
    {
      id: 21,
      question: "She usually ___ up at 7 AM.",
      options: [
        { label: "A", value: "gets" },
        { label: "B", value: "get" },
        { label: "C", value: "is getting" },
      ],
      correctAnswer: "gets",
    },
    // Page 8
    {
      id: 22,
      question: "The new office ___ built last year.",
      options: [
        { label: "A", value: "is" },
        { label: "B", value: "was" },
        { label: "C", value: "were" },
      ],
      correctAnswer: "was",
    },
    {
      id: 23,
      question: "The conference was ___ than I expected.",
      options: [
        { label: "A", value: "more interesting" },
        { label: "B", value: "interesting" },
        { label: "C", value: "most interesting" },
      ],
      correctAnswer: "more interesting",
    },
    {
      id: 24,
      question: "What ___ you do yesterday evening?",
      options: [
        { label: "A", value: "do" },
        { label: "B", value: "did" },
        { label: "C", value: "does" },
      ],
      correctAnswer: "did",
    },
    // Page 9
    {
      id: 25,
      question: "We haven't finished the project ___.",
      options: [
        { label: "A", value: "just" },
        { label: "B", value: "already" },
        { label: "C", value: "yet" },
      ],
      correctAnswer: "yet",
    },
    {
      id: 26,
      question: "Can you turn ___ the music? It's too loud.",
      options: [
        { label: "A", value: "down" },
        { label: "B", value: "up" },
        { label: "C", value: "on" },
      ],
      correctAnswer: "down",
    },
    {
      id: 27,
      question: "I ___ to the market every weekend.",
      options: [
        { label: "A", value: "go" },
        { label: "B", value: "goes" },
        { label: "C", value: "going" },
      ],
      correctAnswer: "go",
    },
    // Page 10
    {
      id: 28,
      question: "You ___ wear a helmet when riding a motorcycle.",
      options: [
        { label: "A", value: "should" },
        { label: "B", value: "ought" },
        { label: "C", value: "need" },
      ],
      correctAnswer: "should",
    },
    {
      id: 29,
      question: "If I ___ more money, I would travel the world.",
      options: [
        { label: "A", value: "have" },
        { label: "B", value: "had" },
        { label: "C", value: "would have" },
      ],
      correctAnswer: "had",
    },
    {
      id: 30,
      question: "She told me that she ___ come to the meeting.",
      options: [
        { label: "A", value: "will" },
        { label: "B", value: "would" },
        { label: "C", value: "can" },
      ],
      correctAnswer: "would",
    },
    // Page 11
    {
      id: 31,
      question: "___ I realized the problem, it was too late to fix it.",
      options: [
        { label: "A", value: "By the time" },
        { label: "B", value: "While" },
        { label: "C", value: "During" },
      ],
      correctAnswer: "By the time",
    },
    {
      id: 32,
      question: "If I ___ the manager, I would have solved the issue differently.",
      options: [
        { label: "A", value: "was" },
        { label: "B", value: "were" },
        { label: "C", value: "am" },
      ],
      correctAnswer: "were",
    },
    {
      id: 33,
      question: "He said he ___ the report by tomorrow.",
      options: [
        { label: "A", value: "finishes" },
        { label: "B", value: "will finish" },
        { label: "C", value: "would finish" },
      ],
      correctAnswer: "would finish",
    },
    // Page 12
    {
      id: 34,
      question: "I ___ for this company since I moved to Morocco.",
      options: [
        { label: "A", value: "have worked" },
        { label: "B", value: "worked" },
        { label: "C", value: "am working" },
      ],
      correctAnswer: "have worked",
    },
  ],

  // Spanish (20 questions - 7 pages: 6 pages of 3 questions + 1 page of 2 questions)
  Spanish: [
    // Page 1
    {
      id: 1,
      question: "¿Cuántas pelotas hay?",
      options: [
        { label: "A", value: "Seis" },
        { label: "B", value: "Siete" },
        { label: "C", value: "Ocho" },
      ],
      correctAnswer: "Siete",
      image: "/testPhotos/Question1.png",
    },
    {
      id: 2,
      question: "¿Qué es esto?",
      options: [
        { label: "A", value: "Bolígrafo" },
        { label: "B", value: "Lápiz" },
        { label: "C", value: "Libro" },
      ],
      correctAnswer: "Lápiz",
      image: "/testPhotos/Question2.png",
    },
    {
      id: 3,
      question: "¿Qué animal es?",
      options: [
        { label: "A", value: "Perro" },
        { label: "B", value: "Gato" },
        { label: "C", value: "Pájaro" },
      ],
      correctAnswer: "Gato",
      image: "/testPhotos/Question3.png",
    },
    // Page 2
    {
      id: 4,
      question: "¿Qué parte del cuerpo es?",
      options: [
        { label: "A", value: "Nariz" },
        { label: "B", value: "Boca" },
        { label: "C", value: "Ojos" },
      ],
      correctAnswer: "Ojos",
      image: "/testPhotos/Question4.png",
    },
    {
      id: 5,
      question: "¿Qué fruta es?",
      options: [
        { label: "A", value: "Manzana" },
        { label: "B", value: "Naranja" },
        { label: "C", value: "Plátano" },
      ],
      correctAnswer: "Manzana",
      image: "/testPhotos/Question5.png",
    },
    {
      id: 6,
      question: "¿Qué color es?",
      options: [
        { label: "A", value: "Azul" },
        { label: "B", value: "Rojo" },
        { label: "C", value: "Verde" },
      ],
      correctAnswer: "Rojo",
      image: "/testPhotos/Question6.png",
    },
    // Page 3
    {
      id: 7,
      question: "¿Quién es la mujer?",
      options: [
        { label: "A", value: "Padre" },
        { label: "B", value: "Madre" },
        { label: "C", value: "Hermano" },
      ],
      correctAnswer: "Madre",
      image: "/testPhotos/Question7.png",
    },
    {
      id: 8,
      question: "¿Qué son?",
      options: [
        { label: "A", value: "Calcetines" },
        { label: "B", value: "Zapatos" },
        { label: "C", value: "Sombrero" },
      ],
      correctAnswer: "Zapatos",
      image: "/testPhotos/Question8.png",
    },
    {
      id: 9,
      question: "¿Qué juguete es?",
      options: [
        { label: "A", value: "Coche" },
        { label: "B", value: "Muñeca" },
        { label: "C", value: "Oso de peluche" },
      ],
      correctAnswer: "Oso de peluche",
      image: "/testPhotos/Question9.png",
    },
    // Page 4
    {
      id: 10,
      question: "¿Qué habitación es?",
      options: [
        { label: "A", value: "Dormitorio" },
        { label: "B", value: "Cocina" },
        { label: "C", value: "Baño" },
      ],
      correctAnswer: "Cocina",
      image: "/testPhotos/Question10.png",
    },
    {
      id: 11,
      question: "Estos son ___.",
      options: [
        { label: "A", value: "gato" },
        { label: "B", value: "gatos" },
        { label: "C", value: "perro" },
      ],
      correctAnswer: "gatos",
    },
    {
      id: 12,
      question: "Me ___ los helados.",
      options: [
        { label: "A", value: "gusta" },
        { label: "B", value: "gustan" },
        { label: "C", value: "gusto" },
      ],
      correctAnswer: "gustan",
    },
    // Page 5
    {
      id: 13,
      question: "Él ___ corriendo.",
      options: [
        { label: "A", value: "corre" },
        { label: "B", value: "corriendo" },
        { label: "C", value: "está corriendo" },
      ],
      correctAnswer: "está corriendo",
    },
    {
      id: 14,
      question: "Los peces ___ nadar.",
      options: [
        { label: "A", value: "pueden" },
        { label: "B", value: "no pueden" },
        { label: "C", value: "son" },
      ],
      correctAnswer: "pueden",
    },
    {
      id: 15,
      question: "¿Qué número es?",
      options: [
        { label: "A", value: "Cincuenta" },
        { label: "B", value: "Quince" },
        { label: "C", value: "Catorce" },
      ],
      correctAnswer: "Quince",
      image: "/testPhotos/Question15.png",
    },
    // Page 6
    {
      id: 16,
      question: "¿Qué hora es?",
      options: [
        { label: "A", value: "Son las dos" },
        { label: "B", value: "Son las tres" },
        { label: "C", value: "Son las cuatro" },
      ],
      correctAnswer: "Son las tres",
      image: "/testPhotos/Question16.png",
    },
    {
      id: 17,
      question: "La pelota está ___ la mesa.",
      options: [
        { label: "A", value: "en" },
        { label: "B", value: "sobre" },
        { label: "C", value: "debajo de" },
      ],
      correctAnswer: "debajo de",
    },
    {
      id: 18,
      question: "¿___ te llamas?",
      options: [
        { label: "A", value: "Qué" },
        { label: "B", value: "Cómo" },
        { label: "C", value: "Dónde" },
      ],
      correctAnswer: "Cómo",
    },
    // Page 7
    {
      id: 19,
      question: "___ dos libros en la mesa.",
      options: [
        { label: "A", value: "Hay" },
        { label: "B", value: "Es" },
        { label: "C", value: "Son" },
      ],
      correctAnswer: "Hay",
    },
    {
      id: 20,
      question: "El elefante es ___.",
      options: [
        { label: "A", value: "pequeño" },
        { label: "B", value: "grande" },
        { label: "C", value: "rápido" },
      ],
      correctAnswer: "grande",
    },
  ],
}
// Scoring systems
const scoringSystems = {
  EnglishKids: [
    { min: 0, max: 6, level: "Beginner 1 S1" },
    { min: 7, max: 10, level: "Beginner 1 S2" },
    { min: 11, max: 13, level: "Beginner 2 S1" },
    { min: 14, max: 16, level: "Beginner 2 S2" },
    { min: 17, max: 19, level: "Beginner 3 S1" },
    { min: 20, max: 21, level: "Beginner 3 S2" },
    { min: 22, max: 23, level: "Pre-intermediate 1 S1" },
    { min: 24, max: 25, level: "Pre-intermediate 1 S2" },
    { min: 26, max: 27, level: "Pre-intermediate 2 S1" },
    { min: 28, max: 28, level: "Pre-intermediate 2 S2" },
    { min: 29, max: 29, level: "Pre-intermediate 3 S1" },
    { min: 30, max: 30, level: "Pre-intermediate 3 S2" },
  ],
  EnglishAdults: [
    { min: 0, max: 4, level: "Beginner 1" },
    { min: 5, max: 8, level: "Beginner 2" },
    { min: 9, max: 12, level: "Beginner 3" },
    { min: 13, max: 16, level: "Pre-intermediate 1" },
    { min: 17, max: 20, level: "Pre-intermediate 2" },
    { min: 21, max: 24, level: "Pre-intermediate 3" },
    { min: 25, max: 27, level: "Intermediate 1" },
    { min: 28, max: 30, level: "Intermediate 2" },
    { min: 31, max: 32, level: "Intermediate 3" },
    { min: 33, max: 34, level: "Upper-Intermediate 1" },
  ],
  Spanish: [
    { min: 0, max: 5, level: "Beginner 1 S1" },
    { min: 6, max: 8, level: "Beginner 1 S2" },
    { min: 9, max: 11, level: "Beginner 2 S1" },
    { min: 12, max: 14, level: "Beginner 2 S2" },
    { min: 15, max: 17, level: "Beginner 3 S1" },
    { min: 18, max: 20, level: "Beginner 3 S2" },
  ],
}

export default function LanguageTest({ formData }) {
  const [testState, setTestState] = useState("welcome")
  const [currentPage, setCurrentPage] = useState(0)
  const [currentQuestionInPage, setCurrentQuestionInPage] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({}) // Track answers for current page
  const [allAnswers, setAllAnswers] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState("")
  const t = useTranslations()
  const locale = useLocale()

  // Determine question set based on language and userType
  const getQuestionSetKey = () => {
    const lang = formData?.language
    const userType = formData?.userType
  
    if (lang === "Spanish") return "Spanish"
    if (lang === "childEnglish") return "EnglishKids"
  
    return "EnglishAdults"
  }

  const questionSetKey = getQuestionSetKey()
  const questions = questionSets[questionSetKey] || []
  const questionsPerPage = 3
  const totalPages = Math.ceil(questions.length / questionsPerPage)
  
  // Get questions for current page
  const currentPageQuestions = questions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  )

  const handleStartTest = () => {
    setTestState("testing")
  }

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  // Allow skipping questions - no longer require all questions to be answered
  const canProceed = () => {
    return true // Users can always proceed, even with unanswered questions
  }

  // Replace the helper
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const scrollToTop = () => {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
    setTimeout(scrollToTop, 0)
  }, [])

  const handleNextPage = async () => {
    // Get answers for current page, use null for unanswered questions
    const pageAnswers = currentPageQuestions.map(q => selectedAnswers[q.id] || null)
    const newAllAnswers = [...allAnswers, ...pageAnswers]
    setAllAnswers(newAllAnswers)

    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1)
      setSelectedAnswers({})
      setTimeout(scrollToTop, 0)
    } else {
      setIsSubmitting(true)

      const calculatedScore = newAllAnswers.reduce((acc, answer, index) => {
        return acc + (answer === questions[index].correctAnswer ? 1 : 0)
      }, 0)

      // Keep level calculation for data purposes
      const scoringSystem = scoringSystems[questionSetKey]
      const levelResult = scoringSystem.find(
        range => calculatedScore >= range.min && calculatedScore <= range.max
      )

    const testResults = {
      ...formData,
      language: formData.language === "childEnglish" ? "English" : formData.language,
      audience_type: formData.userType === 'parent' ? 'kids' : 'adults',
      testLanguage: formData.language,
      questionSetType: questionSetKey,
      answers: newAllAnswers,
      score: calculatedScore,
      totalQuestions: questions.length,
      level: levelResult?.level || null,
      completedAt: new Date().toISOString(),
      finalChoice: 'lead',
    }

    console.log("here i should save the user as lead: ", testResults)
    //call api/register
    // await new Promise((r) => setTimeout(r, 1000))
    try {
      // Replace with your actual backend endpoint
      console.log("call api to register the lead: ", testResults)
      await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testResults),
      })

    } catch (error) {
      console.error("Error lead registration:", error)
    }

      setScore(calculatedScore)
      setLevel(levelResult?.level || "Not determined") // Keep in state
      setIsSubmitting(false)
      setTestState("thank-you")
      setTimeout(scrollToTop, 0)
    }
  }

  const progress = totalPages > 0 ? ((currentPage + 1) / totalPages) * 100 : 0

  return (
    <div
      id="test-container"
      className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4 outline-none relative mt-16 md:mt-16 lg:mt-20"
      tabIndex={0}
      autoFocus
    >
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        {testState === "testing" && (
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-center mt-2 text-sm text-gray-600">
              Page {currentPage + 1} of {totalPages}
            </div>
          </div>
        )}

        {/* Welcome Page */}
        {testState === "welcome" && (
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl font-bold text-blue-700 mb-6">{t("welcome.title")}</h1>
            
            {formData && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800">
                {t("welcome.part1")} {formData?.childInfo?.firstName || formData?.studentInfo?.firstName || "Student"}!
                {" "}
                {t("welcome.part2")} {formData?.language === "childEnglish" ? "English" : formData?.language} {t("welcome.part3")}
                {(formData?.userType === "parent" || formData?.language === "childEnglish") && " (Kids Version)"}
              </p>
            </div>
            )}

            <div className="space-y-4 text-lg text-gray-700 max-w-xl mx-auto">
              <p>{t("welcome.description1")}</p>
              <p>{t("welcome.description2")}</p>
            </div>

            <Button
              onClick={handleStartTest}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 hover:cursor-pointer"
            >
              {t("welcome.startButton")}
            </Button>
          </div>
        )}

        {/* Testing Page */}
        {testState === "testing" && (
          <div className="space-y-8 animate-slide-in">
            <div className="grid grid-cols-1 gap-8">
              {currentPageQuestions.map((question, index) => (
                <div key={question.id} className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-center mb-6">
                    <div className="text-blue-600 text-sm font-medium mb-2">
                      Question {currentPage * questionsPerPage + index + 1}
                    </div>
                    
                    {question.image && (
                      <div className="mb-4">
                        <img 
                          src={question.image} 
                          alt="Question image" 
                          className="mx-auto max-w-xs rounded-lg"
                          onError={(e) => {
                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'%3E%3Crect width='200' height='150' fill='%23f0f0f0'/%3E%3Ctext x='100' y='75' text-anchor='middle' dy='0.3em' font-family='Arial' font-size='12' fill='%23666'%3EImage placeholder%3C/text%3E%3C/svg%3E"
                          }}
                        />
                      </div>
                    )}

                    <h3 className="text-xl font-medium text-gray-800 leading-relaxed">
                      {question.question.split("___").map((part, partIndex) => (
                        <span key={partIndex}>
                          {part}
                          {partIndex < question.question.split("___").length - 1 && (
                            <span className="border-b-2 border-gray-400 px-4 py-1 mx-2 inline-block min-w-[100px]"></span>
                          )}
                        </span>
                      ))}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {question.options.map((option) => (
                      <button
                        key={option.label}
                        onClick={() => handleAnswerSelect(question.id, option.value)}
                        className={`p-3 rounded-lg border-2 text-left transition-all hover:cursor-pointer duration-200 hover:shadow-md ${
                          selectedAnswers[question.id] === option.value
                            ? "border-blue-500 bg-blue-50 shadow-md"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <span className="font-semibold text-blue-600 mr-2">{option.label}</span>
                        <span className="text-gray-800">{option.value}</span>
                        {selectedAnswers[question.id] === option.value && (
                          <span className="float-right text-blue-600">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-6">
              <Button
                onClick={handleNextPage}
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:cursor-pointer disabled:cursor-not-allowed"
              >
                {isSubmitting 
                  ? t("welcome.processing")
                  : currentPage < totalPages - 1 
                    ? t("welcome.nextpage") 
                    : t("welcome.finishtest")
                }
              </Button>
              
              <p className="text-sm text-gray-500 mt-2">
                {t("welcome.skip")}
              </p>
            </div>
          </div>
        )}

        {/* Thank You Page - Level removed from display */}
        {testState === "thank-you" && (
          <div className="text-center space-y-8 animate-fade-in">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-4xl font-bold text-green-600 mb-4">{t("welcome.complet")}</h1>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-lg mx-auto">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">{t("welcome.results")}</h3>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {score}/{questions.length}
            </div>
            <p className="text-blue-700">
              Score: {Math.round((score / questions.length) * 100)}%
            </p>
          </div>
        
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-lg mx-auto">
            <h3 className="text-lg font-semibold text-green-800 mb-3">{t("welcome.firstWelcome")}</h3>
            <p className="text-green-700 mb-4">
              {t("welcome.welcomeHome")}
            </p>
          </div>
        
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 hover:cursor-pointer"
          >
            {t("welcome.HomePageButton")}
          </button>
        </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}