"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BlogPage() {
  // Catégories disponibles
  const categories = [
    "Tous les articles",
    "CV",
    "Lettre de motivation",
    "Entretien",
    "Carrière",
    "Networking",
    "Formation",
    "Reconversion",
    "Bien-être au travail",
  ]

  // État pour suivre la catégorie sélectionnée
  const [selectedCategory, setSelectedCategory] = useState("Tous les articles")

  // État pour le nombre d'articles à afficher
  const [visiblePosts, setVisiblePosts] = useState(12)

  // Données des articles de blog en français sur les carrières et CV
  const posts = [
    // Nouveaux articles pour la catégorie CV
    {
      id: 50,
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2011&q=80",
      title: "3 Erreurs à Éviter Absolument sur Votre CV",
      author: "Thomas Petit",
      date: "22 août 2022",
      alt: "Personne corrigeant des erreurs sur un CV avec un stylo rouge, soulignant trois erreurs majeures",
      category: "CV",
    },
    {
      id: 51,
      image:
        "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      title: "7 Compétences Techniques à Mettre en Avant sur Votre CV",
      author: "Lucas Bernard",
      date: "18 août 2022",
      alt: "Personne travaillant sur un ordinateur portable, illustrant des compétences techniques valorisées par les recruteurs",
      category: "CV",
    },
    {
      id: 52,
      image:
        "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "4 Façons d'Adapter Votre CV à Chaque Offre d'Emploi",
      author: "Jean-Pierre Martin",
      date: "10 août 2022",
      alt: "Personne personnalisant son CV pour différentes offres d'emploi avec quatre versions différentes côte à côte",
      category: "CV",
    },

    // Nouveaux articles pour la catégorie Lettre de motivation
    {
      id: 53,
      image:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
      title: "Comment Rédiger une Excellente Lettre de Motivation",
      author: "Sophie Dubois",
      date: "25 août 2022",
      alt: "Personne rédigeant une lettre de motivation sur un bureau bien organisé avec un ordinateur portable",
      category: "Lettre de motivation",
    },
    {
      id: 54,
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "3 Erreurs Fatales dans une Lettre de Motivation",
      author: "Nicolas Martin",
      date: "22 août 2022",
      alt: "Document montrant une lettre de motivation avec trois erreurs majeures surlignées en rouge",
      category: "Lettre de motivation",
    },
    {
      id: 55,
      image:
        "https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80",
      title: "5 Phrases à Bannir de Votre Lettre de Motivation",
      author: "Camille Rousseau",
      date: "18 août 2022",
      alt: "Personne relisant une lettre de motivation et barrant certaines phrases clichées à éviter",
      category: "Lettre de motivation",
    },
    {
      id: 56,
      image:
        "https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "7 Exemples d'Accroches Percutantes pour Votre Lettre de Motivation",
      author: "Philippe Durand",
      date: "15 août 2022",
      alt: "Plusieurs exemples d'introductions de lettres de motivation affichés sur un écran d'ordinateur",
      category: "Lettre de motivation",
    },
    {
      id: 57,
      image:
        "https://images.unsplash.com/photo-1483213097419-365e22f0f258?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "4 Étapes pour Personnaliser Votre Lettre de Motivation",
      author: "Élisabeth Moreau",
      date: "10 août 2022",
      alt: "Personne suivant un processus en quatre étapes pour adapter sa lettre de motivation à une entreprise spécifique",
      category: "Lettre de motivation",
    },
    // Catégorie CV
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Comment Rédiger un CV Parfait en 2025",
      author: "Sophie Dubois",
      date: "20 août 2022",
      alt: "Bureau avec ordinateur portable, bloc-notes et tasse de café pour la rédaction d'un CV",
      category: "CV",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Comment Structurer Votre CV pour Maximiser vos Chances",
      author: "Sophie Dubois",
      date: "15 août 2022",
      alt: "CV bien structuré avec des sections clairement définies sur un bureau",
      category: "CV",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Comment Créer un Portfolio Professionnel Impressionnant",
      author: "Lucas Bernard",
      date: "20 août 2022",
      alt: "Designer travaillant sur un portfolio créatif sur ordinateur",
      category: "CV",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Les Mots-Clés Essentiels pour un CV Optimisé",
      author: "Marie Lefevre",
      date: "12 juillet 2022",
      alt: "Personne soulignant des mots-clés importants sur un CV imprimé",
      category: "CV",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "CV Vidéo: Comment Se Démarquer des Autres Candidats",
      author: "Thomas Petit",
      date: "5 juillet 2022",
      alt: "Personne se filmant pour créer un CV vidéo professionnel",
      category: "CV",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Les Erreurs Fatales à Éviter sur Votre CV",
      author: "Julien Martin",
      date: "28 juin 2022",
      alt: "Personne révisant un CV avec des marques rouges indiquant des erreurs",
      category: "CV",
    },

    // Catégorie Lettre de motivation
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Les Erreurs à Éviter dans Votre Lettre de Motivation",
      author: "Jean-Pierre Martin",
      date: "20 août 2022",
      alt: "Personne écrivant une lettre de motivation sur un bureau élégant",
      category: "Lettre de motivation",
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Comment Réussir sa Lettre de Motivation pour un Stage",
      author: "Julie Moreau",
      date: "10 août 2022",
      alt: "Étudiant rédigeant une lettre de motivation pour un stage",
      category: "Lettre de motivation",
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      title: "Structure Parfaite d'une Lettre de Motivation Efficace",
      author: "Alexandre Dubois",
      date: "2 juillet 2022",
      alt: "Document montrant la structure d'une lettre de motivation avec annotations",
      category: "Lettre de motivation",
    },
    {
      id: 10,
      image:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
      title: "Personnaliser sa Lettre de Motivation pour Chaque Entreprise",
      author: "Camille Rousseau",
      date: "15 juin 2022",
      alt: "Plusieurs versions d'une lettre de motivation adaptées à différentes entreprises",
      category: "Lettre de motivation",
    },
    {
      id: 11,
      image:
        "https://images.unsplash.com/photo-1586282391129-76a6df230234?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Lettre de Motivation pour une Reconversion Professionnelle",
      author: "Philippe Durand",
      date: "5 juin 2022",
      alt: "Personne rédigeant une lettre de motivation pour changer de carrière",
      category: "Lettre de motivation",
    },
    {
      id: 12,
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Comment Adapter sa Lettre de Motivation au Secteur Public",
      author: "Isabelle Laurent",
      date: "22 mai 2022",
      alt: "Personne travaillant sur une lettre de motivation pour un poste dans l'administration",
      category: "Lettre de motivation",
    },

    // Catégorie Entretien
    {
      id: 13,
      image:
        "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Préparer un Entretien d'Embauche: Guide Complet",
      author: "Élisabeth Moreau",
      date: "20 août 2022",
      alt: "Deux personnes lors d'un entretien d'embauche professionnel",
      category: "Entretien",
    },
    {
      id: 14,
      image:
        "https://images.unsplash.com/photo-1560439514-4e9645039924?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Techniques de Gestion du Stress avant un Entretien",
      author: "Marc Dupont",
      date: "8 août 2022",
      alt: "Personne pratiquant des exercices de respiration pour gérer le stress",
      category: "Entretien",
    },
    {
      id: 15,
      image:
        "https://images.unsplash.com/photo-1551836022-aadb801c60ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Les Questions les Plus Fréquentes en Entretien et Comment y Répondre",
      author: "Sophie Dubois",
      date: "25 juillet 2022",
      alt: "Personne préparant des réponses aux questions d'entretien courantes",
      category: "Entretien",
    },
    {
      id: 16,
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Comment Réussir un Entretien en Visioconférence",
      author: "Thomas Petit",
      date: "12 juillet 2022",
      alt: "Personne participant à un entretien d'embauche virtuel depuis son domicile",
      category: "Entretien",
    },
    {
      id: 17,
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      title: "L'Art de Poser les Bonnes Questions à votre Recruteur",
      author: "Julie Moreau",
      date: "1 juillet 2022",
      alt: "Candidat posant des questions pertinentes lors d'un entretien d'embauche",
      category: "Entretien",
    },
    {
      id: 18,
      image:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      title: "Comment Négocier son Salaire lors d'un Entretien d'Embauche",
      author: "Nicolas Martin",
      date: "15 juin 2022",
      alt: "Professionnel en costume discutant des conditions salariales lors d'un entretien",
      category: "Entretien",
    },

    // Catégorie Carrière
    {
      id: 19,
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Comment Négocier Votre Salaire avec Confiance",
      author: "Thomas Petit",
      date: "20 août 2022",
      alt: "Réunion d'affaires où des professionnels négocient autour d'une table",
      category: "Carrière",
    },
    {
      id: 20,
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Les Tendances du Marché de l'Emploi en France",
      author: "Camille Rousseau",
      date: "20 août 2022",
      alt: "Graphiques et analyses du marché de l'emploi sur un bureau",
      category: "Carrière",
    },
    {
      id: 21,
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      title: "Les Compétences les Plus Recherchées par les Recruteurs",
      author: "Nicolas Martin",
      date: "18 août 2022",
      alt: "Groupe de professionnels collaborant sur un projet en équipe",
      category: "Carrière",
    },
    {
      id: 22,
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Comment Planifier sa Carrière sur 5 Ans",
      author: "Élisabeth Moreau",
      date: "5 juillet 2022",
      alt: "Personne travaillant sur un plan de carrière avec des objectifs à long terme",
      category: "Carrière",
    },
    {
      id: 23,
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Les Avantages du Mentorat pour Accélérer sa Carrière",
      author: "Philippe Durand",
      date: "28 juin 2022",
      alt: "Mentor et mentoré discutant lors d'une session de conseil professionnel",
      category: "Carrière",
    },
    {
      id: 24,
      image:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Comment Devenir un Leader dans Votre Domaine",
      author: "Jean-Pierre Martin",
      date: "15 juin 2022",
      alt: "Personne dirigeant une réunion d'équipe dans un environnement professionnel",
      category: "Carrière",
    },

    // Catégorie Networking
    {
      id: 25,
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Développer Son Réseau Professionnel en 2025",
      author: "Marie Lefevre",
      date: "20 août 2022",
      alt: "Groupe de professionnels lors d'un événement de réseautage",
      category: "Networking",
    },
    {
      id: 26,
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      title: "Comment Utiliser LinkedIn pour Développer son Réseau",
      author: "Lucas Bernard",
      date: "10 juillet 2022",
      alt: "Personne utilisant LinkedIn sur son ordinateur pour développer son réseau professionnel",
      category: "Networking",
    },
    {
      id: 27,
      image:
        "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "L'Art de l'Elevator Pitch: Se Présenter en 30 Secondes",
      author: "Sophie Dubois",
      date: "28 juin 2022",
      alt: "Professionnels dans un ascenseur, symbolisant l'elevator pitch",
      category: "Networking",
    },
    {
      id: 28,
      image:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Comment Réussir dans les Événements de Networking",
      author: "Thomas Petit",
      date: "15 juin 2022",
      alt: "Salle remplie de professionnels lors d'un événement de réseautage",
      category: "Networking",
    },
    {
      id: 29,
      image:
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Networking pour Introvertis: Stratégies Efficaces",
      author: "Julie Moreau",
      date: "5 juin 2022",
      alt: "Personne introvertie participant à un petit groupe de discussion professionnelle",
      category: "Networking",
    },
    {
      id: 30,
      image:
        "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      title: "Comment Entretenir son Réseau Professionnel à Distance",
      author: "Nicolas Martin",
      date: "22 mai 2022",
      alt: "Personne participant à une réunion virtuelle de réseautage depuis son domicile",
      category: "Networking",
    },

    // Catégorie Formation
    {
      id: 31,
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Les Formations en Ligne pour Booster votre Carrière",
      author: "Antoine Lefèvre",
      date: "12 août 2022",
      alt: "Personne suivant une formation en ligne sur un ordinateur portable",
      category: "Formation",
    },
    {
      id: 32,
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Comment Financer sa Formation Professionnelle",
      author: "Camille Rousseau",
      date: "5 juillet 2022",
      alt: "Personne étudiant les options de financement pour une formation continue",
      category: "Formation",
    },
    {
      id: 33,
      image:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Les Certifications Professionnelles les Plus Valorisées",
      author: "Philippe Durand",
      date: "28 juin 2022",
      alt: "Certificats professionnels encadrés sur un mur de bureau",
      category: "Formation",
    },
    {
      id: 34,
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Comment Convaincre son Employeur de Financer une Formation",
      author: "Élisabeth Moreau",
      date: "15 juin 2022",
      alt: "Employé discutant avec son manager à propos d'une formation professionnelle",
      category: "Formation",
    },
    {
      id: 35,
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Apprendre une Nouvelle Langue pour sa Carrière",
      author: "Jean-Pierre Martin",
      date: "5 juin 2022",
      alt: "Personne étudiant une langue étrangère avec des livres et applications",
      category: "Formation",
    },
    {
      id: 36,
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      title: "Formation Continue: Comment Rester à Jour dans son Domaine",
      author: "Sophie Dubois",
      date: "22 mai 2022",
      alt: "Groupe de professionnels participant à un atelier de formation continue",
      category: "Formation",
    },

    // Catégorie Reconversion
    {
      id: 37,
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Reconversion Professionnelle: Par Où Commencer",
      author: "Philippe Durand",
      date: "20 août 2022",
      alt: "Personne contemplant de nouveaux horizons professionnels devant un paysage",
      category: "Reconversion",
    },
    {
      id: 38,
      image:
        "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      title: "Comment Changer de Secteur d'Activité avec Succès",
      author: "Isabelle Laurent",
      date: "5 août 2022",
      alt: "Personne explorant différentes options de carrière représentées par des chemins divergents",
      category: "Reconversion",
    },
    {
      id: 39,
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      title: "Les Métiers d'Avenir pour une Reconversion Réussie",
      author: "Marie Lefevre",
      date: "15 juillet 2022",
      alt: "Personne recherchant des informations sur les métiers d'avenir sur un ordinateur",
      category: "Reconversion",
    },
    {
      id: 40,
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Comment Valoriser ses Compétences Transférables",
      author: "Thomas Petit",
      date: "28 juin 2022",
      alt: "Personne identifiant ses compétences transférables sur un tableau",
      category: "Reconversion",
    },
    {
      id: 41,
      image:
        "https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Reconversion à 40 ans: Est-ce Trop Tard?",
      author: "Jean-Pierre Martin",
      date: "15 juin 2022",
      alt: "Professionnel d'âge mûr commençant une nouvelle carrière",
      category: "Reconversion",
    },
    {
      id: 42,
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Bilan de Compétences: Un Outil Essentiel pour la Reconversion",
      author: "Sophie Dubois",
      date: "5 juin 2022",
      alt: "Personne réalisant un bilan de compétences avec un conseiller professionnel",
      category: "Reconversion",
    },
    {
      id: 43,
      image:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Témoignages: Ils ont Réussi leur Reconversion Professionnelle",
      author: "Camille Rousseau",
      date: "22 mai 2022",
      alt: "Groupe de personnes partageant leurs expériences de reconversion réussie",
      category: "Reconversion",
    },

    // Catégorie Bien-être au travail
    {
      id: 44,
      image:
        "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2047&q=80",
      title: "Équilibre Vie Professionnelle et Personnelle: Conseils Pratiques",
      author: "Émilie Dupont",
      date: "20 août 2022",
      alt: "Personne travaillant dans un environnement détendu avec un bon équilibre travail-vie",
      category: "Bien-être au travail",
    },
    {
      id: 45,
      image:
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      title: "Comment Prévenir le Burn-out au Travail",
      author: "Marc Dupont",
      date: "10 juillet 2022",
      alt: "Personne pratiquant la méditation au bureau pour réduire le stress",
      category: "Bien-être au travail",
    },
    {
      id: 46,
      image:
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Créer un Environnement de Travail Positif",
      author: "Lucas Bernard",
      date: "28 juin 2022",
      alt: "Espace de travail lumineux et ergonomique favorisant le bien-être",
      category: "Bien-être au travail",
    },
    {
      id: 47,
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80",
      title: "Techniques de Relaxation Rapides pour le Bureau",
      author: "Julie Moreau",
      date: "15 juin 2022",
      alt: "Personne pratiquant des exercices de relaxation à son bureau",
      category: "Bien-être au travail",
    },
    {
      id: 48,
      image:
        "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Le Télétravail Sans Stress: Guide Complet",
      author: "Thomas Petit",
      date: "5 juin 2022",
      alt: "Personne travaillant efficacement depuis son domicile dans un espace bien organisé",
      category: "Bien-être au travail",
    },
    {
      id: 49,
      image:
        "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1985&q=80",
      title: "Comment Gérer les Conflits au Travail",
      author: "Philippe Durand",
      date: "22 mai 2022",
      alt: "Deux collègues résolvant un conflit professionnel de manière constructive",
      category: "Bien-être au travail",
    },
  ]

  // Filtrer les articles en fonction de la catégorie sélectionnée
  const filteredPosts =
    selectedCategory === "Tous les articles" ? posts : posts.filter((post) => post.category === selectedCategory)

  // Gérer le chargement de plus d'articles
  const handleLoadMore = () => {
    setVisiblePosts((prev) => prev + 12)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="py-4 text-center">
        <h1 className="text-2xl font-bold">Titre de la Page</h1>
        <div className="flex justify-center space-x-4 text-sm text-gray-500 mt-1">
          <Link href="#" className="hover:text-blue-500">
            Accueil
          </Link>
          <span>•</span>
          <Link href="#" className="hover:text-blue-500">
            Lien Un
          </Link>
        </div>
        <div className="border-t border-blue-100 mt-4"></div>
      </header>

      {/* Featured Post */}
      <div className="my-8 relative overflow-hidden rounded-lg">
        <div className="relative h-[300px] md:h-[400px]">
          <Image
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Personne travaillant sur un ordinateur portable avec un CV et une lettre de motivation"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">Carrière</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-3">
              L&apos;Impact de la Technologie sur la Recherche d&apos;Emploi: Comment S&apos;Adapter
            </h2>
            <div className="flex items-center">
              <div className="text-sm">
                <span className="font-medium">Sophie Dubois</span>
                <span className="mx-2">•</span>
                <span>20 août 2022</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres de catégories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {filteredPosts.slice(0, visiblePosts).map((post) => (
          <div
            key={post.id}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm h-full flex flex-col"
          >
            <div className="p-4 flex flex-col flex-grow">
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image src={post.image || "/placeholder.svg"} alt={post.alt} fill priority className="object-cover" />
              </div>
              <div className="mb-3">
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">{post.category}</span>
              </div>
              <h3 className="font-bold text-xl mb-4 line-clamp-2">
                <Link href="#" className="hover:text-blue-500">
                  {post.title}
                </Link>
              </h3>
              <div className="text-sm text-gray-500 mb-4">
                <span>{post.author}</span>
                <span className="mx-2">•</span>
                <span>{post.date}</span>
              </div>
              <div className="mt-auto">
                <Button asChild variant="outline" className="w-full">
                  <Link href="#">Lire</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {filteredPosts.length > visiblePosts && (
        <div className="flex justify-center mb-12">
          <Button variant="outline" className="text-gray-600 border-gray-300" onClick={handleLoadMore}>
            Voir Plus
          </Button>
        </div>
      )}
    </div>
  )
}

