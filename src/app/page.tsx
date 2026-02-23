"use client";

import { AnimationGallery } from "@/components/AnimationGallery";
import { PageLayout } from "@/components/PageLayout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <PageLayout>
      <AnimationGallery />
    </PageLayout>
  );
};

export default Home;
