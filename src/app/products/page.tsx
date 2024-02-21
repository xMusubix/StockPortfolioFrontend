import Link from "next/link";

export const metadata = {
  title: "Products",
};

export default function Products() {
  return (
    <div>
      <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        Get started by editing&nbsp;
        <br />
        <Link href="/">Go to Home</Link>
      </p>
    </div>
  );
}
