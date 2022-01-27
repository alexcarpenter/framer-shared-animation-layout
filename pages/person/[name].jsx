import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import slugify from "@sindresorhus/slugify";
import data from "../../data/people.json";

export default function Person({ avatar, name, position }) {
  const slug = slugify(name);
  return (
    <>
      <Head>
        <title>{name} - HashiCorp</title>
      </Head>
      <Link href="/">
        <a className="person-overlay"></a>
      </Link>
      <article className="person">
        <div className="person-dialog">
          <motion.div className="person-wrap" layoutId={`avatar-${slug}`}>
            <Image
              src={avatar}
              width={400}
              height={400}
              alt={`${name} avatar`}
            />
            <h2>{name}</h2>
            <p>{position}</p>
          </motion.div>
        </div>
      </article>
    </>
  );
}

export async function getStaticPaths() {
  const { people } = data;
  return {
    paths: people.map((person) => {
      return {
        params: {
          name: slugify(person.name),
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { people } = data;
  const person = people.find(
    (person) => slugify(person.name) === context.params.name
  );
  return {
    props: {
      ...person,
    },
  };
}
