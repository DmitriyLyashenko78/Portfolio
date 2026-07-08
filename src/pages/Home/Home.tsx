// src/pages/Home/Home.tsx
import { Header } from '@/widgets/Header/Header';
import { Hero } from '@/widgets/Hero/Hero';
import { ProjectGrid } from '@/widgets/ProjectGrid/ProjectGrid';
import { Skills } from '@/widgets/Skills/Skills';
import {Contacts} from "@/widgets/Contacts/Contacts.tsx";

export function Home() {
    return (
        <>
            <Header />
            <Hero />
            <ProjectGrid />
            <Skills />
            <Contacts />
        </>
    );
}