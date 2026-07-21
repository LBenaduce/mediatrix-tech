import React from "react";

export function useRapidActivation({ activations = 5, windowMs = 4000, onActivate }) {
  const activationTimes = React.useRef([]);
  const onActivateRef = React.useRef(onActivate);

  React.useEffect(() => {
    onActivateRef.current = onActivate;
  }, [onActivate]);

  return React.useCallback(() => {
    const now = Date.now();
    const recentActivations = activationTimes.current.filter((time) => now - time <= windowMs);
    recentActivations.push(now);

    if (recentActivations.length >= activations) {
      activationTimes.current = [];
      onActivateRef.current?.();
      return;
    }

    activationTimes.current = recentActivations;
  }, [activations, windowMs]);
}
