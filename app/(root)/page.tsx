import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { dummyInterviews } from "@/constants";
import InterviewCard from "@/components/InterviewCard";
import {
  getCurrentUser,
  getInterviewByUserId,
  getLatestInterviews,
} from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();
  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewByUserId(user?.id!),
    await getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPassedInterviews = userInterviews?.length > 0;
  const hasUpcomingInterviews = latestInterviews?.length > 0;
  return (
    <>
      <section className={"card-cta"}>
        <div className={"flex flex-col gap-6 max-w-lg"}>
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className={"text-lg"}>
            Practice real interview questions & get instant feedback
          </p>
          <Button asChild className={"btn-primary max-sm:w-full"}>
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <Image
          className={"max-sm:hidden"}
          src={"/robot.png"}
          alt={"robot"}
          width={400}
          height={400}
        />
      </section>
      <section className={"flex flex-col gap-6 mt-8"}>
        <h2>Your Interviews</h2>
        <div className={"interviews-section"}>
          {hasPassedInterviews ? (
            userInterviews.map((interview) => (
              <InterviewCard key={interview.id} {...interview} />
            ))
          ) : (
            <p>You have not passed any interviews yet</p>
          )}
        </div>
      </section>
      <section className={"flex flex-col gap-6 mt-8"}>
        <h2>Take an Interview</h2>
        <div className={"interviews-section"}>
          {hasUpcomingInterviews ? (
            latestInterviews.map((interview) => (
              <InterviewCard key={interview.id} {...interview} />
            ))
          ) : (
            <p>There are no upcoming interviews available</p>
          )}
        </div>
      </section>
    </>
  );
};
export default Page;
