import data from "../data/people.json";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import slugify from "@sindresorhus/slugify";

export default function Home() {
  const { people } = data;
  return (
    <>
      <Head>
        <title>HashiCorp</title>
      </Head>
      <ul className="grid">
        {people.map((person, index) => {
          const slug = slugify(person.name);
          return (
            <li key={index}>
              <Link href={`/person/${slug}`}>
                <a>
                  <motion.div
                    className="person-wrap"
                    layoutId={`avatar-${slug}`}
                  >
                    <Image
                      src={person.avatar}
                      width={400}
                      height={400}
                      alt={`${person.name} avatar`}
                    />
                  </motion.div>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
