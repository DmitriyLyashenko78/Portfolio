// src/shared/lib/contactsData.ts

export interface Contact {
    name: string;
    url: string;
    icon: string;
    label: string;
}

export const contacts: Contact[] = [
    {
        name: 'GitHub',
        url: 'https://github.com/DmitriyLyashenko78',
        icon: '/img/skills/github.svg',
        label: 'DmitriyLyashenko78',
    },
    {
        name: 'Telegram',
        url: 'https://t.me/DmitryLyashenko',
        icon: '/img/skills/telegram.svg',
        label: '@DmitryLyashenko',
    },
    {
        name: 'Email',
        url: 'mailto:sv-dm@yandex.ru',
        icon: '/img/skills/email.svg',
        label: 'sv-dm@yandex.ru',
    },
    {
        name: 'CodeWars',
        url: 'https://www.codewars.com/users/LyashenkoDmitriy',
        icon: '/img/skills/codewars.svg',
        label: 'LyashenkoDmitriy',
    },
];