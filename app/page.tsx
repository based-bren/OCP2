import { getFrameMetadata } from "frog/next";
import type { Metadata } from "next";
import Image from "next/image";

import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const frameTags = await getFrameMetadata(
    `https://onchainpuppiesmintframe.vercel.app/`
  );
  return {
    other: frameTags,
  };
}

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1>Welcome to OnChain Puppies!</h1>
        <p className={styles.tagline}>
          Adopt your OnChain Puppy NFT today and join the pack!
        </p>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/onchain_puppies.gif"
          alt="OnChain Puppy"
          width={800}
          height={800}
          priority
          style={{ filter: "none" }}
        />
      </div>

      <div className={styles.description}>
        <p>
          Discover unique, adorable pups @base. Each OnChain Puppy
          is crafted with love, ready for adoption. Join our growing community
          of puppy lovers today!
        </p>
      </div>

      <div className={styles.cta}>
        <a
          href="https://linktr.ee/OnChainVibe"
          className={styles.linkButton}
          target="_blank"
          rel="noopener noreferrer"
        >
          Explore More on Our Linktree!
        </a>
      </div>
    </main>
  );
}
