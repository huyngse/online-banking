"use client";
import CountUp from "react-countup";

interface AnimatedCounterProps {
  amount: number;
}

function AnimatedCounter({ amount }: AnimatedCounterProps) {
  return (
    <CountUp end={amount} decimal="." separator="," prefix="$" decimals={2} />
  );
}

export default AnimatedCounter;
