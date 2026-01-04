import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";
import Image from "next/image";
import { ProjectIcon } from "./project-icons";

const redis = Redis.fromEnv();

export const revalidate = 60;
export default async function ProjectsPage() {
  const views = (
    await redis.mget<number[]>(
      ...allProjects.map((p) => ["pageviews", "projects", p.slug].join(":")),
    )
  ).reduce((acc, v, i) => {
    acc[allProjects[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  const featured = allProjects.find((project) => project.slug === "ato")!;
  const top2 = allProjects.find((project) => project.slug === "hive")!;
  const top3 = allProjects.find((project) => project.slug === "flip-it")!;
  const sorted = allProjects
    .filter((p) => p.published)
    .filter(
      (project) =>
        project.slug !== featured.slug &&
        project.slug !== top2.slug &&
        project.slug !== top3.slug,
    )
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="flex flex-col items-center gap-8 mx-auto lg:items-center lg:justify-between lg:flex-row max-w-4xl lg:mx-0">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
              Projects
            </h2>
            <p className="mt-4 text-zinc-400">
            The projects showcased below were built during my free time and reflect both experimentation and real-world product development.

<br></br>Some of these projects began as technical explorations - a way to try new technologies, ideas, or approaches. Others evolved far beyond that and became full-fledged products, <strong>now used by hundreds of active users and even paying customers</strong>. <br></br>For those mature products, parts of the codebase are naturally not open-source.

<br></br><br></br>Each project includes a short overview, a GitHub repository link (when applicable), and a live demonstration page (look for <strong>Demo</strong>).

If you’d like to explore more experiments, prototypes, and open-source work, you’re welcome to browse my GitHub repository as well.
            </p>
          </div>

          <div className="relative shrink-0 lg:translate-x-48">
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-zinc-200/20 via-zinc-200/5 to-transparent blur-xl"
              aria-hidden="true"
            />
            <div className="relative h-36 w-36 sm:h-40 sm:w-40 md:h-52 md:w-52 rounded-full overflow-hidden border border-zinc-700/60 bg-zinc-900/20 shadow-2xl shadow-black/40">
              <Image
                src="/img/general/projects.png"
                alt="Projects"
                fill
                priority
                sizes="(max-width: 640px) 144px, (max-width: 768px) 160px, 208px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
          <Card>
            <Link href={`/projects/${featured.slug}`}>
              <article className="relative w-full h-full p-4 md:p-8">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs text-zinc-100">
                    {featured.date ? (
                      <time dateTime={new Date(featured.date).toISOString()}>
                        {Intl.DateTimeFormat(undefined, {
                          dateStyle: "medium",
                        }).format(new Date(featured.date))}
                      </time>
                    ) : (
                      <span>SOON</span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-zinc-500">
                    <Eye className="w-4 h-4" />{" "}
                    {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                      views[featured.slug] ?? 0,
                    )}
                  </span>
                </div>

                <h2
                  id="featured-post"
                  className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
                >
                  <span className="inline-flex items-center gap-3">
                    <ProjectIcon
                      slug={featured.slug}
                      className="h-7 w-7 sm:h-8 sm:w-8"
                    />
                    <span>{featured.title}</span>
                  </span>
                </h2>
                <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                  {featured.description}
                </p>
                <div className="absolute bottom-4 md:bottom-8">
                  <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
                    Read more <span aria-hidden="true">&rarr;</span>
                  </p>
                </div>
              </article>
            </Link>
          </Card>

          <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
            {[top2, top3].map((project) => (
              <Card key={project.slug}>
                <Article project={project} views={views[project.slug] ?? 0} />
              </Card>
            ))}
          </div>
        </div>
        <div className="hidden w-full h-px md:block bg-zinc-800" />

        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 0)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 1)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 2)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
