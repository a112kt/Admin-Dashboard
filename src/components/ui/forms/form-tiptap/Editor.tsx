'use client';
import React from 'react';

import ParentCard from '@/components/shared/ParentCard';
import TiptapEditor from './TiptapEditor';

const BCrumb = [
    {
        to: '/',
        title: "Dashboard",
    },
    {
        title: 'Tiptap Editor',
    },
];

const Editor = () => {

    return (

        <ParentCard title="Tiptap Editor">
            <TiptapEditor />
        </ParentCard>

    );
};

export default Editor;
