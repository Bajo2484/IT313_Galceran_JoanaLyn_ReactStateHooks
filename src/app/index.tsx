import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

type PracticeTrackerProps = {
  solved: number;
  onSolve: () => void;
  onReset: () => void;
};

function PracticeTracker({ solved, onSolve, onReset }: PracticeTrackerProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Practice Tracker</Text>

      <Text style={styles.counter}>Solved: {solved}</Text>

      {solved >= 5 && <Text style={styles.success}>Great job!</Text>}

      <Button title="Solve +1" onPress={onSolve} />

      <View style={styles.space} />

      <Button title="Reset" onPress={onReset} />
    </View>
  );
}

function useStopwatch(isRunning: boolean) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  return seconds;
}

type StopwatchProps = {
  seconds: number;
  isRunning: boolean;
};

function Stopwatch({ seconds, isRunning }: StopwatchProps) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime =
    `${String(minutes).padStart(2, "0")}:` +
    `${String(remainingSeconds).padStart(2, "0")}`;

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Lab Stopwatch</Text>

      <Text style={styles.timer}>{formattedTime}</Text>

      <Text style={styles.status}>{isRunning ? "Running..." : "Paused"}</Text>
    </View>
  );
}

function LabScreen() {
  const [solved, setSolved] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const seconds = useStopwatch(isRunning);

  const handleSolve = () => {
    setSolved((s) => s + 1);
  };

  const handleReset = () => {
    setSolved(0);
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lab Timer & Practice Tracker</Text>

      <PracticeTracker
        solved={solved}
        onSolve={handleSolve}
        onReset={handleReset}
      />

      <Stopwatch seconds={seconds} isRunning={isRunning} />

      <View style={styles.card}>
        <Text style={styles.heading}>Timer Controls</Text>

        <Button title="Start" onPress={handleStart} />

        <View style={styles.space} />

        <Button title="Stop" onPress={handleStop} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    gap: 15,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  card: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    gap: 12,
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  counter: {
    fontSize: 22,
    textAlign: "center",
  },

  timer: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },

  status: {
    fontSize: 18,
    textAlign: "center",
  },

  success: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  space: {
    height: 8,
  },
});

export default LabScreen;
