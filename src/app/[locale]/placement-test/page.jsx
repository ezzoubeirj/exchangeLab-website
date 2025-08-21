"use client";

import LanguageTest from '@/components/LanguageTest';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const formDataString = searchParams.get('formData');
  const formData = formDataString ? JSON.parse(formDataString) : null;

  console.log("Placement Test Page rendered with formData:", formData);
  return <LanguageTest formData={formData} />;
}