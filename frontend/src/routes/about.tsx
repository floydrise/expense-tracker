import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

export const Route = createFileRoute("/about")({
  component: About,
});

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", bounce: 0.5 },
  },
};

function About() {
  const listItems = [
    "Create account",
    "Add new expenses",
    "Track expenses",
    "Delete expenses",
  ];

  return (
    <div className="flex flex-col justify-center  items-center mt-10">
      <h1 className={"text-xl border-b"}>Simple expense tracker app</h1>
      <motion.ul
        className={"list-disc"}
        initial="hidden"
        animate="visible"
        variants={listVariants}
      >
        {listItems.map((item, index) => (
          <motion.li key={index} variants={itemVariants}>
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
