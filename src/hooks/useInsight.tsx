import { useCallback, useEffect, useRef, useState } from "react";

import { buildAIPrompt } from "@/data/aiPrompt";
import { useSimulationStorage } from "@/hooks/useSimulationStorage";
import { getInsight, type InsightData } from "@/services/aiService";

export const useInsight = (id: string) => {
  const isRequestPending = useRef(false);
  const { getFormData, updateSimulation } = useSimulationStorage();

  const [insight, setInsight] = useState<InsightData | null>(() => {
    const simulation = getFormData(id);
    return simulation?.insight ?? null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsight = useCallback(
    async (simulationId: string) => {
      const simulation = getFormData(simulationId);

      if (!simulation) {
        setError("Simulação não encontrada.");
        return null;
      }

      if (simulation.insight) {
        setInsight(simulation.insight);
        return simulation.insight;
      }

      if (isRequestPending.current) {
        return null;
      }

      isRequestPending.current = true;
      setIsLoading(true);
      setError(null);

      try {
        const prompt = buildAIPrompt(simulation);
        const generated = await getInsight(prompt);

        setInsight(generated);

        updateSimulation(simulationId, {
          ...simulation,
          insight: generated,
        });

        return generated;
      } catch (error) {
        console.error("Erro ao gerar insight:", error);
        setError("Erro ao gerar o diagnóstico. Tente novamente.");
        return null;
      } finally {
        isRequestPending.current = false;
        setIsLoading(false);
      }
    },
    [getFormData, updateSimulation],
  );

  useEffect(() => {
    if (!id || insight || isLoading || isRequestPending.current || error) {
      return;
    }

    void fetchInsight(id);
  }, [id, insight, isLoading, error, fetchInsight]);

  return {
    insight,
    isLoading,
    error,
    fetchInsight,
  };
};
